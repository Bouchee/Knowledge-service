package org.xianwu.core.web.taglib.html;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xianwu.core.util.Constants;
import org.xianwu.core.util.Utils;
import org.xianwu.core.web.util.WebUtils;

/**
 * Out标签<br>
 * 输出request,session,application作用域的变量值
 * @author XianwuFu
 * @since 2013-01-01
 */
public class OutTag extends TagSupport {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1384053960332895596L;
	private static Log log = LogFactory.getLog(OutTag.class);
	private String scope;
	private String key;
	
	/**
	 * 标签开始
	 */
	@SuppressWarnings("static-access")
	public int doStartTag() throws JspException{
		scope = Utils.isEmpty(scope) ? "request" : scope;
		HttpServletRequest request = (HttpServletRequest)pageContext.getRequest();
		String valueString = "";
		if(scope.equalsIgnoreCase("request")){
			valueString = (String)request.getAttribute(key);
		}else if(scope.equalsIgnoreCase("session")){
			valueString = (String)WebUtils.getSessionAttribute(request, key);
		}else if (scope.equalsIgnoreCase("application")) {
			valueString = (String)request.getSession().getServletContext().getAttribute(key);
		}
		try {
			pageContext.getOut().write(valueString);
		} catch (IOException e) {
			log.error(Constants.Exception_Head + e.getMessage());
			e.printStackTrace();
		}
		return super.SKIP_BODY;
	}
	
	/**
	 * 标签结束
	 */
	@SuppressWarnings("static-access")
	public int doEndTag() throws JspException{
		return super.EVAL_PAGE;
	}
	
	/**
	 * 释放资源
	 */
	public void release(){
		scope = null;
		key = null;
		super.release();
	}

	public void setScope(String scope) {
		this.scope = scope;
	}

	public void setKey(String key) {
		this.key = key;
	}
}
