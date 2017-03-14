package com.liaoyuan.web.controller.base;


import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * BaseController
 *
 **/

@Slf4j
@Controller
public class BaseController {


    /**
	 * 将DataTables中的参数json串转为Map输出
	 * 
	 * @param dtjson
	 * @return
	 */
	protected Map<String, Object> jsonToMap(String dtjson) {

		JSONArray jsonArray = JSONArray.fromObject(dtjson);
		Map<String, Object> map = new LinkedHashMap<>();
		for (Object object : jsonArray) {
			JSONObject jsonObject = JSONObject.fromObject(object);
			map.put(jsonObject.getString("name"), jsonObject.getString("value"));
		}
		return map;
	}
    
	/**
	 * 分页返回输出
	 * @param response
	 * @param record_count
	 * @param list
	 */
    protected void printDataTables(HttpServletResponse response,
			Integer record_count, List list) {
		StringBuilder data = new StringBuilder("{");
		data.append("\"iTotalRecords\" : " + record_count + ",");
		data.append("\"iTotalDisplayRecords\" : " + record_count + ",");
		data.append("\"aaData\" : ");
		data.append(JSONArray.fromObject(list).toString());
		data.append("}");
		printToJson(response, data.toString());
	}
    
    protected void printToJson(HttpServletResponse response, String jsonStr) {
		try {
			response.setCharacterEncoding("UTF-8");
			response.setContentType("text/json");
			response.setDateHeader("Expires", 0);
			PrintWriter out = response.getWriter();
			out.println(jsonStr);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
