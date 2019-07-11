package org.xianwu.system.admin.service.impl;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.util.Utils;
import org.xianwu.system.admin.service.UserService;
import org.xianwu.system.common.util.SystemConstants;
import org.xianwu.system.common.util.idgenerator.IdHelper;

/**
 * 用户管理与授权业务实现类
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class UserServiceImpl extends BizServiceImpl implements UserService {

	/**
	 * 保存用户
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveUserItem(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("enabled", SystemConstants.ENABLED_Y);
		Integer temp = (Integer) g4Dao.queryForObject("User.checkAccount", pDto);
		if (temp.intValue() != 0) {
			outDto.put("msg", "登录账户" + outDto.getAsString("account") + "已被占用,请尝试其它帐户!");
			outDto.put("success", new Boolean(false));
			return outDto;
		}
		pDto.put("userid", IdHelper.getUserID());
		String password = pDto.getAsString("password");
		String mPasswor = Utils.encryptBasedDes(password);
		pDto.put("password", mPasswor);
		g4Dao.insert("User.saveUserItem", pDto);
		g4Dao.insert("User.saveTheme", pDto);
		outDto.put("msg", "用户数据新增成功");
		outDto.put("success", new Boolean(true));
		return outDto;
	}

	/**
	 * 删除用户
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteUserItems(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("userid", arrChecked[i]);
			g4Dao.update("User.updateEauserInUserManage", dto);
			g4Dao.delete("User.deleteEauserauthorizeInUserManage", dto);
			g4Dao.delete("User.deleteEausermenumapByUserid", dto);
			g4Dao.delete("User.deleteEausersubinfoByUserid", dto);
		}
		return null;
	}

	/**
	 * 修改用户
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto updateUserItem(Dto pDto) {
		String password = pDto.getAsString("password");
		if (password.equalsIgnoreCase("@@@@@@")) {
			pDto.remove("password");
		}else {
			String mPasswor = Utils.encryptBasedDes(password);
			pDto.put("password", mPasswor);
		}
		g4Dao.update("User.updateUserItem", pDto);
		if (!pDto.getAsString("deptid").equals(pDto.getAsString("deptid_old"))) {
			g4Dao.delete("User.deleteEauserauthorizeInUserManage", pDto);
			g4Dao.delete("User.deleteEausermenumapByUserId", pDto);
		}
		return null;
	}

	/**
	 * 保存人员角色关联信息
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveSelectedRole(Dto pDto) {
		g4Dao.delete("User.deleteEaUserAuthorizeByUserId", pDto);
		String[] roleids = pDto.getAsString("roleid").split(",");
		for (int i = 0; i < roleids.length; i++) {
			String roleid = roleids[i];
			if (Utils.isEmpty(roleid))
				continue;
			pDto.put("roleid", roleid);
			pDto.put("authorizeid", IdHelper.getAuthorizeid4User());
			g4Dao.insert("User.saveSelectedRole", pDto);
		}
		return null;
	}

	/**
	 * 保存人员菜单关联信息
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveSelectedMenu(Dto pDto) {
		g4Dao.delete("User.deleteEausermenumapByUserId", pDto);
		String[] menuids = pDto.getAsString("menuid").split(",");
		for (int i = 0; i < menuids.length; i++) {
			String menuid = menuids[i];
			if (Utils.isEmpty(menuid))
				continue;
			pDto.put("menuid", menuid);
			pDto.put("authorizeid", IdHelper.getAuthorizeid4Usermenumap());
			pDto.put("authorizelevel", SystemConstants.AUTHORIZELEVEL_ACCESS);
			g4Dao.insert("User.saveSelectedMenu", pDto);
		}
		return null;
	}

	/**
	 * 修改用户(提供首页修改使用)
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto updateUserItem4IndexPage(Dto pDto) {
		String password = pDto.getAsString("password");
		String mPasswor = Utils.encryptBasedDes(password);
		pDto.put("password", mPasswor);
		g4Dao.update("User.updateUserItem2", pDto);
		return null;
	}

}
