package org.xianwu.core.mvc.xstruts.util;

import java.io.Serializable;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xianwu.core.mvc.xstruts.config.MessageResourcesConfig;

/**
 * Factory for <code>MessageResources</code> instances. The general usage
 * pattern for this class is:
 * 
 * <ul>
 * 
 * <li>Call <code>MessageResourcesFactory().createFactory()</code> to retrieve a
 * <code>MessageResourcesFactory</code> instance.</li>
 * <li>Set properties as required to configure this factory instance to create
 * <code>MessageResources</code> instances with desired characteristics.</li>
 * 
 * <li>Call the <code>createResources()</code> method of the factory to retrieve
 * a newly instantiated <code>MessageResources</code> instance.</li>
 * 
 * </ul>
 * 
 * @version $Rev: 421119 $ $Date: 2005-08-29 23:57:50 -0400 (Mon, 29 Aug 2005) $
 */
@SuppressWarnings("serial")
public abstract class MessageResourcesFactory implements Serializable {
	// ------------------------------------------------------ Static Properties

	/**
	 * The Java class to be used for <code>MessageResourcesFactory</code>
	 * instances.
	 */
	@SuppressWarnings("rawtypes")
	protected static transient Class clazz = null;

	/**
	 * Commons Logging instance.
	 */
	private static Log LOG = LogFactory.getLog(MessageResourcesFactory.class);

	/**
	 * The fully qualified class name to be used for
	 * <code>MessageResourcesFactory</code> instances.
	 */
	protected static String factoryClass = "org.xianwu.core.mvc.xstruts.util.PropertyMessageResourcesFactory";

	// ---------------------------------------------------- Instance Properties

	/**
	 * Configuration information for Message Resources.
	 */
	protected MessageResourcesConfig config;

	/**
	 * The "return null" property value to which newly created MessageResourcess
	 * should be initialized.
	 */
	protected boolean returnNull = true;

	/**
	 * Set the configuration information for Message Resources.
	 * 
	 * @since Struts 1.2.8
	 */
	public MessageResourcesConfig getConfig() {
		return config;
	}

	/**
	 * Return the configuration information for Message Resources.
	 * 
	 * @since Struts 1.2.8
	 */
	public void setConfig(MessageResourcesConfig config) {
		this.config = config;
	}

	/**
	 * Get default value of the "returnNull" property used to initialize newly
	 * created MessageResourcess.
	 * 
	 * @return default value of the "returnNull" property newly created
	 *         MessageResourcess are initialized to.
	 */
	public boolean getReturnNull() {
		return (this.returnNull);
	}

	/**
	 * Set the default value of the "returnNull" property newly created
	 * MessageResourcess are initialized to.
	 * 
	 * @param returnNull
	 *            default value of the "returnNull" MessageResourcess are
	 *            initialized to.
	 */
	public void setReturnNull(boolean returnNull) {
		this.returnNull = returnNull;
	}

	// --------------------------------------------------------- Public Methods

	/**
	 * Create and return a newly instansiated <code>MessageResources</code>.
	 * This method must be implemented by concrete subclasses.
	 * 
	 * @param config
	 *            Configuration parameter(s) for the requested bundle
	 */
	public abstract MessageResources createResources(String config);

	/**
	 * The fully qualified class name that is used for
	 * <code>MessageResourcesFactory</code> instances.
	 * 
	 * @return class name that is used for <code>MessageResourcesFactory</code>
	 *         instances
	 */
	public static String getFactoryClass() {
		return (MessageResourcesFactory.factoryClass);
	}

	/**
	 * Set the fully qualified class name that is used for
	 * <code>MessageResourcesFactory</code> instances.
	 * 
	 * @param factoryClass
	 *            name that is used for <code>MessageResourcesFactory</code>
	 *            instances
	 */
	public static void setFactoryClass(String factoryClass) {
		MessageResourcesFactory.factoryClass = factoryClass;
		MessageResourcesFactory.clazz = null;
	}

	// --------------------------------------------------------- Static Methods

	/**
	 * Create and return a <code>MessageResourcesFactory</code> instance of the
	 * appropriate class, which can be used to create customized
	 * <code>MessageResources</code> instances. If no such factory can be
	 * created, return <code>null</code> instead.
	 */
	public static MessageResourcesFactory createFactory() {
		// Construct a new instance of the specified factory class
		try {
			if (clazz == null) {
				clazz = RequestUtils.applicationClass(factoryClass);
			}

			MessageResourcesFactory factory = (MessageResourcesFactory) clazz.newInstance();

			return (factory);
		} catch (Throwable t) {
			LOG.error("MessageResourcesFactory.createFactory", t);

			return (null);
		}
	}
}
