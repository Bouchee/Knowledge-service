package org.xianwu.core.mvc.xstruts.config;

import java.io.Serializable;

import java.util.Enumeration;
import java.util.Properties;

/**
 * <p>
 * A abstract base class for all config classes. Provide basic support for
 * arbitrary properties
 * </p>
 * 
 * @since Struts 1.3
 */
public abstract class BaseConfig implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3071648298603741269L;

	/**
	 * Indicates if configuration of this component been completed. 
	 * protected to private and use methods provided by extenders?
	 */
	protected boolean configured = false;

	/**
	 * A map of arbitrary properties configured for this component.
	 * 
	 * @since Struts 1.3
	 */
	private Properties properties = new Properties();

	/**
	 * Freeze the configuration of this action.
	 */
	public void freeze() {
		configured = true;
	}

	/**
	 * Throw <code>IllegalStateException</code> if configuration is frozen.
	 * 
	 * @throws IllegalStateException
	 *             if configuration is frozen
	 */
	public void throwIfConfigured() {
		if (configured) {
			throw new IllegalStateException("Configuration is frozen");
		}
	}

	/**
	 * <p>
	 * Set an arbitary key/value pair which can be retrieved by this config
	 * class. This facility should eliminate many use cases for subclassing
	 * <code>*Config</code> classes by providing a mechanism to pass any amount
	 * of arbitrary configuration information into an config class.
	 * <p />
	 * This method must not be called after configuration is complete, or an
	 * <code>IllegalStateException</code> will be thrown.
	 * </p>
	 * 
	 * <p>
	 * <b>Example</b> <code><pre>
	 * &lt;action path="/example" type="com.example.MyAction"&gt;
	 *    &lt;set-property key="foo" property="bar" /&gt;
	 * &lt;/action&gt;
	 * </pre></code>
	 * </p>
	 * 
	 * @param key
	 *            the key by which this value will be retrieved
	 * @param value
	 *            the value to store with the supplied key
	 * @throws IllegalStateException
	 *             if this module configuration has been frozen
	 * @since Struts 1.3
	 */
	public void setProperty(String key, String value) {
		throwIfConfigured();
		properties.setProperty(key, value);
	}

	/**
	 * Return the property-value for the specified key, if any; otherwise return
	 * <code>null</code>.
	 * 
	 * @param key
	 *            a key specified in the <code>struts-config</code> file
	 * @return the value stored with the supplied key
	 * @since Struts 1.3
	 */
	public String getProperty(String key) {
		return properties.getProperty(key);
	}

	/**
	 * <p>
	 * Return the entire set of properties configured for this object. At this
	 * time, this only needs to be exposed to support inheritance, so choosing a
	 * conservative access modifier ("protected").
	 * </p>
	 * 
	 * @return set of properties configured for this object
	 */
	protected Properties getProperties() {
		return this.properties;
	}

	/**
	 * Set the entire set of properties configured for this object. At this
	 * time, this only needs to be exposed to support inheritance, so choosing a
	 * conservative access modifier ("protected").
	 */
	protected void setProperties(Properties properties) {
		this.properties = properties;
	}

	/**
	 * <p>
	 * Compare the properties of this config with that of the given and copy
	 * those that are not present. This method is used by subclasses that
	 * support configuration inheritance.
	 * </p>
	 * 
	 * @param baseConfig
	 *            The config object to copy properties from.
	 */
	@SuppressWarnings("rawtypes")
	protected void inheritProperties(BaseConfig baseConfig) {
		throwIfConfigured();

		// Inherit forward properties
		Properties baseProperties = baseConfig.getProperties();
		Enumeration keys = baseProperties.propertyNames();

		while (keys.hasMoreElements()) {
			String key = (String) keys.nextElement();

			// Check if we have this property before copying it
			String value = this.getProperty(key);

			if (value == null) {
				value = baseProperties.getProperty(key);
				setProperty(key, value);
			}
		}
	}

	/**
	 * <p>
	 * Return a copy of the properties held by this object.
	 * </p>
	 */
	@SuppressWarnings("rawtypes")
	protected Properties copyProperties() {
		Properties copy = new Properties();

		Enumeration keys = properties.propertyNames();

		while (keys.hasMoreElements()) {
			String key = (String) keys.nextElement();

			copy.setProperty(key, properties.getProperty(key));
		}

		return copy;
	}
}
