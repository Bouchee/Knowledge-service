package org.xianwu.core.mvc.xstruts;

import java.io.Serializable;

/**
 * Global manifest constants for the entire Struts Framework.
 * 
 * @version $Rev: 421119 $ $Date: 2005-06-18 20:27:26 -0400 (Sat, 18 Jun 2005) $
 */
@SuppressWarnings("serial")
public class Globals implements Serializable {
	// ----------------------------------------------------- Manifest Constants

	/**
	 * The context attributes key under which our <code>ActionServlet</code>
	 * instance will be stored.
	 * 
	 * @since Struts 1.1
	 */
	public static final String ACTION_SERVLET_KEY = "org.xianwu.core.mvc.xstruts.action.ACTION_SERVLET";

	/**
	 * The request attributes key under which a boolean <code>true</code> value
	 * should be stored if this request was cancelled.
	 * 
	 * @since Struts 1.1
	 */
	public static final String CANCEL_KEY = "org.xianwu.core.mvc.xstruts.action.CANCEL";

	/**
	 * <p>
	 * The base of the context attributes key under which our
	 * <code>ModuleConfig</code> data structure will be stored. This will be
	 * suffixed with the actual module prefix (including the leading "/"
	 * character) to form the actual attributes key.
	 * </p>
	 * 
	 * <p>
	 * For each request processed by the controller servlet, the
	 * <code>ModuleConfig</code> object for the module selected by the request
	 * URI currently being processed will also be exposed under this key as a
	 * request attribute.
	 * </p>
	 * 
	 * @since Struts 1.1
	 */
	public static final String MODULE_KEY = "org.xianwu.core.mvc.xstruts.action.MODULE";

	/**
	 * The ServletContext attribute under which we store the module prefixes
	 * String[].
	 * 
	 * @since Struts 1.2
	 */
	public static final String MODULE_PREFIXES_KEY = "org.xianwu.core.mvc.xstruts.globals.MODULE_PREFIXES";

	/**
	 * The request attribute under which we store the original URI of the
	 * request.
	 * 
	 * @since Struts 1.3
	 */
	public static final String ORIGINAL_URI_KEY = "org.xianwu.core.mvc.xstruts.globals.ORIGINAL_URI_KEY";

	/**
	 * The request attributes key under which your action should store an
	 * <code>org.xianwu.core.mvc.xstruts.action.ActionErrors</code> object, if
	 * you are using the corresponding custom tag library elements.
	 */
	public static final String ERROR_KEY = "org.xianwu.core.mvc.xstruts.action.ERROR";

	/**
	 * The request attributes key under which Struts custom tags might store a
	 * <code>Throwable</code> that caused them to report a JspException at
	 * runtime. This value can be used on an error page to provide more detailed
	 * information about what really went wrong.
	 */
	public static final String EXCEPTION_KEY = "org.xianwu.core.mvc.xstruts.action.EXCEPTION";

	/**
	 * The session attributes key under which the user's selected
	 * <code>java.util.Locale</code> is stored, if any. If no such attribute is
	 * found, the system default locale will be used when retrieving
	 * internationalized messages. If used, this attribute is typically set
	 * during user login processing.
	 */
	public static final String LOCALE_KEY = "org.xianwu.core.mvc.xstruts.action.LOCALE";

	/**
	 * The request attributes key under which our
	 * <code>org.xianwu.core.mvc.xstruts.ActionMapping</code> instance is
	 * passed.
	 */
	public static final String MAPPING_KEY = "org.xianwu.core.mvc.xstruts.action.mapping.instance";

	/**
	 * The request attributes key under which your action should store an
	 * <code>org.xianwu.core.mvc.xstruts.action.ActionMessages</code> object,
	 * if you are using the corresponding custom tag library elements.
	 * 
	 * @since Struts 1.1
	 */
	public static final String MESSAGE_KEY = "org.xianwu.core.mvc.xstruts.action.ACTION_MESSAGE";

	/**
	 * <p>
	 * The base of the context attributes key under which our module
	 * <code>MessageResources</code> will be stored. This will be suffixed with
	 * the actual module prefix (including the leading "/" character) to form
	 * the actual resources key.
	 * </p>
	 * 
	 * <p>
	 * For each request processed by the controller servlet, the
	 * <code>MessageResources</code> object for the module selected by the
	 * request URI currently being processed will also be exposed under this key
	 * as a request attribute.
	 * </p>
	 */
	public static final String MESSAGES_KEY = "org.xianwu.core.mvc.xstruts.action.MESSAGE";

	/**
	 * The request attributes key under which our multipart class is stored.
	 */
	public static final String MULTIPART_KEY = "org.xianwu.core.mvc.xstruts.action.mapping.multipartclass";

	/**
	 * <p>
	 * The base of the context attributes key under which an array of
	 * <code>PlugIn</code> instances will be stored. This will be suffixed with
	 * the actual module prefix (including the leading "/" character) to form
	 * the actual attributes key.
	 * </p>
	 * 
	 * @since Struts 1.1
	 */
	public static final String PLUG_INS_KEY = "org.xianwu.core.mvc.xstruts.action.PLUG_INS";

	/**
	 * <p>
	 * The base of the context attributes key under which our
	 * <code>RequestProcessor</code> instance will be stored. This will be
	 * suffixed with the actual module prefix (including the leading "/"
	 * character) to form the actual attributes key.
	 * </p>
	 * 
	 * @since Struts 1.1
	 */
	public static final String REQUEST_PROCESSOR_KEY = "org.xianwu.core.mvc.xstruts.action.REQUEST_PROCESSOR";

	/**
	 * The context attributes key under which we store the mapping defined for
	 * our controller serlet, which will be either a path-mapped pattern (
	 * <code>/action/*</code>) or an extension mapped pattern (<code>*.do</code>
	 * ).
	 */
	public static final String SERVLET_KEY = "org.xianwu.core.mvc.xstruts.action.SERVLET_MAPPING";

	/**
	 * The session attributes key under which our transaction token is stored,
	 * if it is used.
	 */
	public static final String TRANSACTION_TOKEN_KEY = "org.xianwu.core.mvc.xstruts.action.TOKEN";

	/**
	 * The page attributes key under which xhtml status is stored. This may be
	 * "true" or "false". When set to true, the html tags output xhtml.
	 * 
	 * @since Struts 1.1
	 */
	public static final String XHTML_KEY = "org.xianwu.core.mvc.xstruts.globals.XHTML";

	/**
	 * The name of the taglib package.
	 */
	public static final String TAGLIB_PACKAGE = "org.xianwu.core.mvc.xstruts.taglib.html";

	/**
	 * The property under which a Cancel button press is reported.
	 */
	public static final String CANCEL_PROPERTY = TAGLIB_PACKAGE + ".CANCEL";

	/**
	 * The property under which a Cancel button press is reported, if the Cancel
	 * button is rendered as an image.
	 */
	public static final String CANCEL_PROPERTY_X = TAGLIB_PACKAGE + ".CANCEL.x";

	/**
	 * The property under which a transaction token is reported.
	 */
	public static final String TOKEN_KEY = TAGLIB_PACKAGE + ".TOKEN";
}
