package com.liaoyuan.web.entity;

import lombok.Data;
import org.apache.commons.lang.StringUtils;

import java.io.Serializable;

/**
 * Created by zj on 2017/3/28 0028
 */
@Data
public class DiaoyunBean implements Serializable {
    private int id;
    public void setId(String id) {
        if(StringUtils.isBlank(id)){
            this.id = 0;
        }else{
            this.id =  Integer.parseInt(id);
        }
    }

    private int rid; //收货单位id
    public void setRid(String rid) {
        if(StringUtils.isBlank(rid)){
            this.rid = 0;
        }else{
            this.rid =  Integer.parseInt(rid);
        }
    }
    private String wagonNo;

    private double tonnage;
    public void setTonnage(String tonnage) {
        if(StringUtils.isBlank(tonnage)){
            this.tonnage = 0;
        }else{
            this.tonnage =  Double.parseDouble(tonnage);
        }
    }


    private String wellsName;
    private String coalName;

    private String siteName;

    private String createtime;

    private int status;
    public void setStatus(String status) {
        if(StringUtils.isBlank(status)){
            this.status = 0;
        }else{
            this.status =  Integer.parseInt(status);
        }
    }

    private int dayId;
    public void setDayId(String dayId) {
        if(StringUtils.isBlank(dayId)){
            this.dayId = 0;
        }else{
            this.dayId =  Integer.parseInt(dayId);
        }
    }

}
