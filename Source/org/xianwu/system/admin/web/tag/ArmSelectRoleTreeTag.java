package org.xianwu.system.admin.web.tag;
	
import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.SpringBeanLoader;
import org.xianwu.core.model.dao.Dao;
import org.xianwu.core.tplengine.DefaultTemplate;
import org.xianwu.core.tplengine.FileTemplate;
import org.xianwu.core.tplengine.TemplateEngine;
import org.xianwu.core.tplengine.TemplateEngineFactory;
import org.xianwu.core.tplengine.TemplateType;
import org.xianwu.core.util.Constants;
import org.xianwu.core.web.taglib.util.TagHelper;
import org.xianwu.core.web.util.WebUtils;
import org.xianwu.system.admin.web.tag.vo.DeptVo;
import org.xianwu.system.admin.web.tag.vo.RoleVo;

/**
 * ArmSelectRoleTreeTag标签
 * @author XianwuFu
 * @since 2013-01-01
 */
public class ArmSelectRoleTreeTag extends TagSupport {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 2804015722067829551L;
	private static Log log = LogFactory.getLog(ArmSelectRoleTreeTag.class);
	
	/**
	 * 标签开始
	 */
	@SuppressWarnings({ "unchecked", "rawtypes", "static-access" })
	public int doStartTag() throws JspException{
		Dao g4Dao = (Dao)SpringBeanLoader.getSpringBean("g4Dao");
		HttpServletRequest request = (HttpServletRequest)this.pageContext.getRequest();
		String deptid = request.getParameter("deptid");
		String usertype = request.getParameter("usertype");
		Dto deptDto = new BaseDto();
		deptDto.put("deptid", deptid);
		List deptList = g4Dao.queryForList("ArmTagSupport.queryDeptsForUserGrant", deptDto);
		List roleList = new ArrayList();
		Dto roleDto = new BaseDto();
		//角色类型和用户类型代码是对应的
		//经办员和注册人员属于业务经办角色
		if (usertype.equals("4")) {
			//usertype = "1";
		}
		roleDto.put("roletype", usertype);
		for(int i = 0; i < deptList.size(); i++){
			DeptVo deptVo = (DeptVo)deptList.get(i);
			if(deptVo.getDeptid().equals(deptid)){
				deptVo.setIsroot("true");
			}
			roleDto.put("deptid", deptVo.getDeptid());
			List tempList = g4Dao.queryForList("ArmTagSupport.queryRolesForUserGrant", roleDto);
			roleList.addAll(tempList);
		}
		Dto grantDto = new BaseDto();
		grantDto.put("userid", request.getParameter("userid"));
		List grantList = g4Dao.queryForList("ArmTagSupport.queryGrantedRolesByUserId", grantDto);
		for(int i = 0; i < roleList.size(); i++){
			RoleVo roleVo = (RoleVo)roleList.get(i);
			String roletypeString = WebUtils.getCodeDesc("ROLETYPE", roleVo.getRoletype(), request);
			String rolenameString = roleVo.getRolename();
			rolenameString += "[" + roletypeString + "]"; 
			roleVo.setRolename(rolenameString);
			if(checkGrant(grantList, roleVo.getRoleid())){
				roleVo.setChecked("true");
			}
		}
        Dto dto = new BaseDto();
        dto.put("deptList", deptList);
        dto.put("roleList", roleList);
        dto.put("deptid", deptid);
		TemplateEngine engine = TemplateEngineFactory.getTemplateEngine(TemplateType.VELOCITY);
		DefaultTemplate template = new FileTemplate();
		template.setTemplateResource(TagHelper.getTemplatePath(getClass().getName()));
		StringWriter writer = engine.mergeTemplate(template, dto);
		try {
			pageContext.getOut().write(writer.toString());
		} catch (IOException e) {
			log.error(Constants.Exception_Head + e.getMessage());
			e.printStackTrace();
		}
		return super.SKIP_BODY;
	}
	
	/**
	 * 检查授权
	 * @param grantList
	 * @param pRoleid
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	private boolean checkGrant(List grantList, String pRoleid){
		Boolean result = new Boolean(false);
		for(int i = 0; i < grantList.size(); i++){
			Dto dto = (BaseDto)grantList.get(i);
			if(pRoleid.equals(dto.getAsString("roleid"))){
				result = new Boolean(true);
			}
		}
		return result.booleanValue();
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
		super.release();
	}
}
