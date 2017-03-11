package com.liaoyuan.web.entity;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class SessionUser implements Serializable {

	private static final long serialVersionUID = -3250660435051228657L;

	public static final String SESSION_ROOT_KEY = SessionUser.class.getName()
			+ ".ledo.session.root.key";

	public static final String SESSION_CURRENT_GAME_SHORT = SessionUser.class
			.getName() + ".ledo.session.current.game.short";


	private String roleCode;

	//角色对应拥有的渠道权限
	private Map<String,List<String>> roleChannels;
	//角色对应需要限制访问的url
	private Map<String,List<String>> roleUrls;

	public Map<String, List<String>> getRoleUrls() {
		return roleUrls;
	}

	public void setRoleUrls(Map<String, List<String>> roleUrls) {
		this.roleUrls = roleUrls;
	}

	public Map<String, List<String>> getRoleChannels() {
		return roleChannels;
	}

	public void setRoleChannels(Map<String, List<String>> roleChannels) {
		this.roleChannels = roleChannels;
	}

	
	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}
}
