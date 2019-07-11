package org.xianwu.core.mvc.xstruts.validator;

import java.io.Serializable;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.commons.validator.Validator;
import org.apache.commons.validator.ValidatorException;
import org.apache.commons.validator.ValidatorResults;
import org.xianwu.core.mvc.xstruts.action.ActionErrors;
import org.xianwu.core.mvc.xstruts.action.ActionForm;
import org.xianwu.core.mvc.xstruts.action.ActionMapping;

/**
 * <p>
 * This class extends <strong>ActionForm</strong> and provides basic field
 * validation based on an XML file. The key passed into the validator is the
 * action element's 'name' attribute from the struts-config.xml which should
 * match the form element's name attribute in the validation.xml.
 * </p>
 * 
 * <ul>
 * 
 * <li>See <code>ValidatorPlugin</code> definition in struts-config.xml for
 * validation rules.</li>
 * 
 * </ul>
 * 
 * @version $Rev: 421119 $ $Date: 2005-05-07 12:11:38 -0400 (Sat, 07 May 2005) $
 * @see org.xianwu.core.mvc.xstruts.action.ActionForm
 * @since Struts 1.1
 */
@SuppressWarnings("serial")
public class ValidatorForm extends ActionForm implements Serializable {
	/**
	 * Commons Logging instance.
	 */
	private static Log log = LogFactory.getLog(ValidatorForm.class);

	/**
	 * The results returned from the validation performed by the
	 * <code>Validator</code>.
	 */
	protected ValidatorResults validatorResults = null;

	/**
	 * Used to indicate the current page of a multi-page form.
	 */
	protected int page = 0;

	/**
	 * Gets page.
	 * 
	 * @return page number
	 */
	public int getPage() {
		return page;
	}

	/**
	 * Sets page.
	 * 
	 * @param page
	 *            page number
	 */
	public void setPage(int page) {
		this.page = page;
	}

	/**
	 * Validate the properties that have been set from this HTTP request, and
	 * return an <code>ActionErrors</code> object that encapsulates any
	 * validation errors that have been found. If no errors are found, return
	 * <code>null</code> or an <code>ActionErrors</code> object with no recorded
	 * error messages.
	 * 
	 * @param mapping
	 *            The mapping used to select this instance
	 * @param request
	 *            The servlet request we are processing
	 * @return <code>ActionErrors</code> object that encapsulates any validation
	 *         errors
	 */
	public ActionErrors validate(ActionMapping mapping, HttpServletRequest request) {
		ServletContext application = getServlet().getServletContext();
		ActionErrors errors = new ActionErrors();

		String validationKey = getValidationKey(mapping, request);

		Validator validator = Resources.initValidator(validationKey, this, application, request, errors, page);

		try {
			validatorResults = validator.validate();
		} catch (ValidatorException e) {
			log.error(e.getMessage(), e);
		}

		return errors;
	}

	/**
	 * Returns the Validation key.
	 * 
	 * @param mapping
	 *            The mapping used to select this instance
	 * @param request
	 *            The servlet request we are processing
	 * @return validation key - the form element's name in this case
	 */
	public String getValidationKey(ActionMapping mapping, HttpServletRequest request) {
		return mapping.getAttribute();
	}

	/**
	 * Reset all properties to their default values.
	 * 
	 * @param mapping
	 *            The mapping used to select this instance
	 * @param request
	 *            The servlet request we are processing
	 */
	public void reset(ActionMapping mapping, HttpServletRequest request) {
		super.reset(mapping, request);
		page = 0;
		validatorResults = null;
	}

	/**
	 * Get results of the validation performed by the <code>Validator</code>.
	 * 
	 * @return results of the validation
	 */
	public ValidatorResults getValidatorResults() {
		return validatorResults;
	}

	/**
	 * Set results of the validation performed by the <code>Validator</code>.
	 * 
	 * @param validatorResults
	 *            results of validation
	 */
	public void setValidatorResults(ValidatorResults validatorResults) {
		this.validatorResults = validatorResults;
	}

	/**
	 * Returns a <code>Map</code> of values returned from any validation that
	 * returns a value other than <code>null</code> or <code>Boolean</code> with
	 * the key the full property path of the field.
	 * 
	 * @return <code>Map</code> of non-null values
	 */
	@SuppressWarnings("rawtypes")
	public Map getResultValueMap() {
		return ((validatorResults != null) ? validatorResults.getResultValueMap() : null);
	}
}
