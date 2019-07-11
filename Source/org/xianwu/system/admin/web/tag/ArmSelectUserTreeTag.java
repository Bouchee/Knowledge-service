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
import org.xianwu.system.admin.web.tag.vo.UserVo;

/**
 * ArmSelectUserTreeTag标签
 * @author XianwuFu
 * @since 2013-01-01
 */
public class ArmSelectUserTreeTag extends TagSupport {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 8912675574189836127L;
	private static Log log = LogFactory.getLog(ArmSelectUserTreeTag.class);
	
	/**
	 * 标签开始
	 */
	@SuppressWarnings({ "unchecked", "static-access", "rawtypes" })
	public int doStartTag() throws JspException{
		Dao g4Dao = (Dao)SpringBeanLoader.getSpringBean("g4Dao");
		HttpServletRequest request = (HttpServletRequest)this.pageContext.getRequest();
		String deptid = request.getParameter("deptid");
		String roletype = request.getParameter("roletype");
		Dto deptDto = new BaseDto();
		deptDto.put("deptid", deptid);
		List deptList = g4Dao.queryForList("ArmTagSupport.queryDeptsForRoleGrant", deptDto);
		List userList = new ArrayList();
		Dto userDto = new BaseDto();
		//角色类型和用户类型代码是对应的
		userDto.put("usertype", roletype);
		if (roletype.equals("1")) {
			//注册用户
			//userDto.put("usertype4", "4");
		}
		for(int i = 0; i < deptList.size(); i++){
			DeptVo deptVo = (DeptVo)deptList.get(i);
			if(deptVo.getDeptid().equals(deptid)){
				deptVo.setIsroot("true");
			}
			userDto.put("deptid", deptVo.getDeptid());
			List tempList = g4Dao.queryForList("ArmTagSupport.queryUsersForRoleGrant", userDto);
			userList.addAll(tempList);
		}
		Dto grantDto = new BaseDto();
		grantDto.put("roleid", request.getParameter("roleid"));
		List grantList = g4Dao.queryForList("ArmTagSupport.queryGrantedUsersByRoleId", grantDto);
		for(int i = 0; i < userList.size(); i++){
			UserVo userVo = (UserVo)userList.get(i);
			String usertypeString = WebUtils.getCodeDesc("USERTYPE", userVo.getUsertype(), request);
			String usernameString = userVo.getUsername();
			usernameString += "[" + userVo.getAccount() + ", " + usertypeString + "]"; 
			userVo.setUsername(usernameString);
			if(checkGrant(grantList, userVo.getUserid())){
				userVo.setChecked("true");
			}
		}
        Dto dto = new BaseDto();
        dto.put("deptList", deptList);
        dto.put("userList", userList);
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
	 * @param pUserid
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	private boolean checkGrant(List grantList, String pUserid){
		Boolean result = new Boolean(false);
		for(int i = 0; i < grantList.size(); i++){
			Dto dto = (BaseDto)grantList.get(i);
			if(pUserid.equals(dto.getAsString("userid"))){
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
