package com.liaoyuan.web.utils;

/**
 * Created by zj on 2017/3/21 0021
 */
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import freemarker.cache.FileTemplateLoader;
import freemarker.cache.TemplateLoader;
import freemarker.template.Configuration;
import freemarker.template.Template;

public class CreateWordT {

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
            TemplateLoader templateLoader  = new FileTemplateLoader(fir);
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

