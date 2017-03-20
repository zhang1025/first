package com.liaoyuan.web.entity;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class SessionUser implements Serializable {

	private static final long serialVersionUID = -3250660435051228657L;

	public static final String SESSION_ROOT_KEY = SessionUser.class.getName()+ ".liaoyuan.key";
	public static final String SESSION_USER = "liaoyuanUser";
	private UserBean bean;
	private Map<String,List<Permission>> menuMap;

	public UserBean getBean() {
		return bean;
	}

	public void setBean(UserBean bean) {
		this.bean = bean;
	}

	public Map<String, List<Permission>> getMenuMap() {
		return menuMap;
	}

	public void setMenuMap(Map<String, List<Permission>> menuMap) {
		this.menuMap = menuMap;
	}
}
