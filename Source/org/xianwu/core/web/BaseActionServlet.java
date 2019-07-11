package org.xianwu.core.web;

import javax.servlet.ServletException;

import org.xianwu.core.mvc.xstruts.action.ActionServlet;

/**
 * ActionServlet基类
 * @author XianwuFu
 * @since 2013-01-01
 * @see ActionServlet
 */
public class BaseActionServlet extends ActionServlet{
	/**
	 * 
	 */
	private static final long serialVersionUID = -7190831441749453949L;

	public BaseActionServlet(){}
	
	/**
     * @param 
     * @return void
	 */
	public void init() throws ServletException{
		super.init();
	}
}
