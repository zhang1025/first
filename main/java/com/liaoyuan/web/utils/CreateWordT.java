package com.liaoyuan.web.utils;

/**
 * Created by zj on 2017/3/21 0021
 * 具体参考一下地址
 * http://blog.csdn.net/u012246342/article/details/51698187
 */

import com.liaoyuan.web.entity.ContractBean;
import freemarker.cache.FileTemplateLoader;
import freemarker.cache.TemplateLoader;
import freemarker.template.Configuration;
import freemarker.template.Template;
import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class CreateWordT {

    //打印合同信息
    public static void printInfo(ContractBean bean, String filePath) {
        if (null == bean) {
            return;
        }
        Map<String, Object> cont = new HashMap<>();// 存储数据
        cont.put("receiveName", bean.getReceiveName());
        cont.put("numNo", bean.getNumNo());
        cont.put("orderCount", bean.getOrderCount());
        cont.put("name", bean.getName());
        cont.put("price", bean.getUnitPrice());
        cont.put("count", bean.getUnitPrice() * bean.getOrderCount());
        cont.put("forkliftFee", Integer.parseInt(bean.getForkliftFee()) == 1 ? "包括" : "不包括");
        cont.put("usePerson", bean.getUsePerson());
        try {
            //模板的路径 不包含文件名称
            File fir = new File(filePath);
            String tempName = "hetong.xml";

            //生成文件的路径及文件名。
            File outFile = new File(filePath + "/hetong.doc");
            Writer out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(outFile), "UTF-8"));
            // 使用FileTemplateLoader 指定模板路径
            TemplateLoader templateLoader = new FileTemplateLoader(fir);
            Configuration cfg = new Configuration();
            cfg.setTemplateLoader(templateLoader);
            Template t = cfg.getTemplate(tempName, "UTF-8");

            t.process(cont, out);
            out.flush();
            out.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public static void main(String[] args) {
        Map<String, Object> cont = new HashMap<>();// 存储数据
        cont.put("time", "2017-01-01");
        cont.put("name", "语文");
        cont.put("tn", "");
        try {
            //模板的路径 不包含文件名称
            File fir = new File("E:\\test");
            String tempName = "1111.xml";

            //生成文件的路径及文件名。
            File outFile = new File("E:\\test\\test.doc");
            Writer out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(outFile), "UTF-8"));
            // 使用FileTemplateLoader 指定模板路径
            TemplateLoader templateLoader = new FileTemplateLoader(fir);
            Configuration cfg = new Configuration();
            cfg.setTemplateLoader(templateLoader);
            Template t = cfg.getTemplate(tempName, "UTF-8");

            t.process(cont, out);
            out.flush();
            out.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}

