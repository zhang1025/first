package com.liaoyuan.web.utils;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.liaoyuan.web.entity.BaseQueryBean;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * json串 解析工具类
 * Created by machaozhe on 2016-05-24
 */
@Slf4j
public class JsonParserUtil {
	/**
	 *  构造方法
	 */
	private JsonParserUtil(){
	}
	private static ObjectMapper mapper = new ObjectMapper();
	static {
		mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS,true);//支持解析结束符号
		mapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES,true);//支持解析单引号
		//设置忽略 当json串中有的参数 而在相对应解析的bean的中没有此属性
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);
	}


	/**
	 * 把json转换成bean
	 *
	 * @param json  json串
	 * @param clazz 泛型bean或者数组
	 */
	public static <T> T fromJsontoBean(String json, Class<T> clazz) {
		if (StringUtils.isBlank(json)) {
			return null;
		}
		try {
			return mapper.readValue(json, clazz);
		} catch (IOException e) {
			log.error("method 'fromJsonToBean' of com.ledo.bi.web.utils.JsonParserUtil has error!\n" + e.getMessage());
			return null;
		}
	}

	/**
	 *  返回一个对象列表
	 * @param json  json串
	 * @param clazz 泛型bean
     */
	public static <T> List<T> fromJsonToList(String json, Class<T> clazz) {

		try {
			return mapper.readValue(json,mapper.getTypeFactory().constructParametricType(List.class,clazz));
		} catch (IOException e) {
			log.error("method 'fromJsonToList' of com.ledo.bi.web.utils.JsonParserUtil has error!\n" + e.getMessage());
			return null;
		}
	}

    /**
     * 返回Map对象
     * @param json json串
     * @param clazz 泛型bean
     */
    public static <T> Map<String,T> fromJsonToMap(String json, Class<T> clazz) {

        try {
            return mapper.readValue(json, new TypeReference<Map<String, T>>() {});
        } catch (IOException e) {
            log.error("method 'fromJsonToMap' of com.ledo.bi.utils.JsonParserUtil has error!\n" + e.getMessage());
			return null;
        }
    }

	/**
	 *  将DataTables中的参数json串转为Map输出
	 * @param json  json串
     */
	public static Map<String, Object> fromJsonToMap(String json) {

		JSONArray jsonArray = JSONArray.fromObject(json);
		Map<String, Object> map = new LinkedHashMap<>();
		for (Object object : jsonArray) {
			JSONObject jsonObject = JSONObject.fromObject(object);
			map.put(jsonObject.getString("name"), jsonObject.getString("value"));
		}
		return map;
	}

	/**
	 *  转成json格式
	 * @param obj bean对象
     */
    public static String fromObjectToJson(Object obj) {
        if (null == obj) {
            return null;
        }
        try {
            return mapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            log.error("method 'fromObjectToJson' of com.ledo.bi.utils.JsonParserUtil has error!\n" + e.getMessage());
			return null;
        }
    }
	/**
	 * 获取基础查询的BaseQuerybean
	 * @param jsonStr json串
	 * @param game  游戏简称
	 */
	public static BaseQueryBean getBaseBeanFromJson(String jsonStr, String game){
		BaseQueryBean bean = new BaseQueryBean();
		try {
			bean = mapper.readValue(jsonStr,BaseQueryBean.class);
			bean.setGame(game);
			return bean;
		} catch (IOException e) {
			return null;
		}
	}

	/**
	 * Map转化为BaseQuerybean，特殊处理单字母开头的3个分页变量
	 */
	public static BaseQueryBean getBaseBeanFromMap(Map<String, Object> params){
		BaseQueryBean bean = new BaseQueryBean();
		try {
			int iDisplayLength = Integer.parseInt(params.get("iDisplayLength")+"");
			int iDisplayStart = Integer.parseInt(params.get("iDisplayStart")+"");
			int iRecordsTotal = Integer.parseInt(params.get("iRecordsTotal")+"");
			BeanUtils.populate(bean, params);
			bean.setIDisplayLength(iDisplayLength);
			bean.setIDisplayStart(iDisplayStart);
			bean.setIRecordsTotal(iRecordsTotal);
			return bean;
		} catch (Exception e) {
			return null;
		}
	}

}
