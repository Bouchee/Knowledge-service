package org.xianwu.core.mvc.xstruts.action;

import java.io.Serializable;
import java.util.HashMap;

import org.apache.commons.beanutils.DynaBean;
import org.apache.commons.beanutils.DynaClass;
import org.apache.commons.beanutils.DynaProperty;
import org.xianwu.core.mvc.xstruts.config.FormBeanConfig;
import org.xianwu.core.mvc.xstruts.config.FormPropertyConfig;
import org.xianwu.core.mvc.xstruts.util.RequestUtils;

/**
 * <p>
 * Implementation of <code>DynaClass</code> for <code>DynaActionForm</code>
 * classes that allow developers to define ActionForms without having to
 * individually code all of the classes. <strong>NOTE</strong> - This class is
 * only used in the internal implementation of dynamic action form beans.
 * Application developers never need to consult this documentation.
 * </p>
 * 
 * @version $Rev: 421119 $ $Date: 2006-01-17 07:26:20 -0500 (Tue, 17 Jan 2006) $
 * @since Struts 1.1
 */
public class DynaActionFormClass implements DynaClass, Serializable {
	// ----------------------------------------------------- Instance Variables

	/**
	 * 
	 */
	private static final long serialVersionUID = 8104892906475108966L;

	/**
	 * <p>
	 * The <code>DynaActionForm</code> implementation <code>Class</code> which
	 * we will use to create new bean instances.
	 * </p>
	 */
	@SuppressWarnings("rawtypes")
	protected transient Class beanClass = null;

	/**
	 * <p>
	 * The form bean configuration information for this class.
	 * </p>
	 */
	protected FormBeanConfig config = null;

	/**
	 * <p>
	 * The "dynamic class name" for this <code>DynaClass</code>.
	 * </p>
	 */
	protected String name = null;

	/**
	 * <p>
	 * The set of dynamic properties that are part of this DynaClass.
	 * </p>
	 */
	protected DynaProperty[] properties = null;

	/**
	 * <p>
	 * The set of dynamic properties that are part of this
	 * <code>DynaClass</code>, keyed by the property name. Individual descriptor
	 * instances will be the same instances as those in the
	 * <code>properties</code> list.
	 */
	@SuppressWarnings("rawtypes")
	protected HashMap propertiesMap = new HashMap();

	// ----------------------------------------------------------- Constructors

	/**
	 * <p>
	 * Construct a new <code>DynaActionFormClass</code> for the specified form
	 * bean configuration. This constructor is private;
	 * <code>DynaActionFormClass</code> instances will be created as needed via
	 * calls to the static <code>createDynaActionFormClass()</code> method.
	 * </p>
	 * 
	 * @param config
	 *            The FormBeanConfig instance describing the properties of the
	 *            bean to be created
	 * @throws IllegalArgumentException
	 *             if the bean implementation class specified in the
	 *             configuration is not DynaActionForm (or a subclass of
	 *             DynaActionForm)
	 */
	public DynaActionFormClass(FormBeanConfig config) {
		introspect(config);
	}

	// ------------------------------------------------------ DynaClass Methods

	/**
	 * <p>
	 * Return the name of this <code>DynaClass</code> (analogous to the
	 * <code>getName()</code> method of <code>java.lang.Class</code>, which
	 * allows the same <code>DynaClass</code> implementation class to support
	 * different dynamic classes, with different sets of properties.
	 * 
	 * @return The name of this <code>DynaClass</code>.
	 */
	public String getName() {
		return (this.name);
	}

	/**
	 * <p>
	 * Return a property descriptor for the specified property, if it exists;
	 * otherwise, return <code>null</code>.
	 * </p>
	 * 
	 * @param name
	 *            Name of the dynamic property for which a descriptor is
	 *            requested
	 * @return A property descriptor for the specified property.
	 * @throws IllegalArgumentException
	 *             if no property name is specified
	 */
	public DynaProperty getDynaProperty(String name) {
		if (name == null) {
			throw new IllegalArgumentException("No property name specified");
		}

		return ((DynaProperty) propertiesMap.get(name));
	}

	/**
	 * <p>
	 * Return an array of <code>DynaProperty</code>s for the properties
	 * currently defined in this <code>DynaClass</code>. If no properties are
	 * defined, a zero-length array will be returned.
	 * </p>
	 * 
	 * @return An array of property instances for this class.
	 */
	public DynaProperty[] getDynaProperties() {
		return (properties);

		// :
		// getBeanInfo instead, which returns property descriptors
		// and a bunch of other stuff?
	}

	/**
	 * <p>
	 * Instantiate and return a new {@link DynaActionForm} instance, associated
	 * with this <code>DynaActionFormClass</code>. The properties of the
	 * returned {@link DynaActionForm} will have been initialized to the default
	 * values specified in the form bean configuration information.
	 * </p>
	 * 
	 * @return A new {@link DynaActionForm} instance.
	 * @throws IllegalAccessException
	 *             if the Class or the appropriate constructor is not accessible
	 * @throws InstantiationException
	 *             if this Class represents an abstract class, an array class, a
	 *             primitive type, or void; or if instantiation fails for some
	 *             other reason
	 */
	public DynaBean newInstance() throws IllegalAccessException, InstantiationException {
		DynaActionForm dynaBean = (DynaActionForm) getBeanClass().newInstance();

		dynaBean.setDynaActionFormClass(this);

		FormPropertyConfig[] props = config.findFormPropertyConfigs();

		for (int i = 0; i < props.length; i++) {
			dynaBean.set(props[i].getName(), props[i].initial());
		}

		return (dynaBean);
	}

	// --------------------------------------------------------- Public Methods

	/**
	 * <p>
	 * Render a <code>String</code> representation of this object.
	 * </p>
	 * 
	 * @return The string representation of this instance.
	 */
	public String toString() {
		StringBuffer sb = new StringBuffer("DynaActionFormBean[name=");

		sb.append(name);

		DynaProperty[] props = getDynaProperties();

		if (props == null) {
			props = new DynaProperty[0];
		}

		for (int i = 0; i < props.length; i++) {
			sb.append(',');
			sb.append(props[i].getName());
			sb.append('/');
			sb.append(props[i].getType());
		}

		sb.append("]");

		return (sb.toString());
	}

	// --------------------------------------------------------- Static Methods

	/**
	 * Return the <code>DynaActionFormClass</code> instance for the specified
	 * form bean configuration instance.
	 * 
	 * @param config
	 *            The config for which the class should be created.
	 * @return The instance for the specified form bean config.
	 */
	public static DynaActionFormClass createDynaActionFormClass(FormBeanConfig config) {
		return config.getDynaActionFormClass();
	}

	// ------------------------------------------------------ Protected Methods

	/**
	 * <p>
	 * Return the implementation class we are using to construct new instances,
	 * re-introspecting our {@link FormBeanConfig} if necessary (that is, after
	 * being deserialized, since <code>beanClass</code> is marked transient).
	 * </p>
	 * 
	 * @return The implementation class used to construct new instances.
	 */
	@SuppressWarnings("rawtypes")
	protected Class getBeanClass() {
		if (beanClass == null) {
			introspect(config);
		}

		return (beanClass);
	}

	/**
	 * <p>
	 * Introspect our form bean configuration to identify the supported
	 * properties.
	 * </p>
	 * 
	 * @param config
	 *            The FormBeanConfig instance describing the properties of the
	 *            bean to be created
	 * @throws IllegalArgumentException
	 *             if the bean implementation class specified in the
	 *             configuration is not DynaActionForm (or a subclass of
	 *             DynaActionForm)
	 */
	@SuppressWarnings("unchecked")
	protected void introspect(FormBeanConfig config) {
		this.config = config;

		// Validate the ActionFormBean implementation class
		try {
			beanClass = RequestUtils.applicationClass(config.getType());
		} catch (Throwable t) {
			throw new IllegalArgumentException("Cannot instantiate ActionFormBean class '" + config.getType() + "': "
					+ t);
		}

		if (!DynaActionForm.class.isAssignableFrom(beanClass)) {
			throw new IllegalArgumentException("Class '" + config.getType() + "' is not a subclass of "
					+ "'org.xianwu.core.mvc.xstruts.action.DynaActionForm'");
		}

		// Set the name we will know ourselves by from the form bean name
		this.name = config.getName();

		// Look up the property descriptors for this bean class
		FormPropertyConfig[] descriptors = config.findFormPropertyConfigs();

		if (descriptors == null) {
			descriptors = new FormPropertyConfig[0];
		}

		// Create corresponding dynamic property definitions
		properties = new DynaProperty[descriptors.length];

		for (int i = 0; i < descriptors.length; i++) {
			properties[i] = new DynaProperty(descriptors[i].getName(), descriptors[i].getTypeClass());
			propertiesMap.put(properties[i].getName(), properties[i]);
		}
	}

	// -------------------------------------------------------- Private Methods
}
