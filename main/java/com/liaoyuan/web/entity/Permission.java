package com.liaoyuan.web.entity;

import lombok.Data;

import java.io.Serializable;

/**
 * Created by zj
 * 权限 url信息bean
 */
@Data
public class Permission implements Serializable {

    private static final long serialVersionUID = 3859995182287471035L;
    private Integer permissionId;
    private String resourceUrl;
    private String resourceName;
    private String menuName;

}
