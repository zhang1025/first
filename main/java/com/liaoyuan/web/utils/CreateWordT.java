package com.liaoyuan.web.utils;

/**
 * Created by zj on 2017/3/21 0021
 * 具体参考一下地址
 * http://blog.csdn.net/u012246342/article/details/51698187
 */

import com.deepoove.poi.XWPFTemplate;
import com.deepoove.poi.render.RenderAPI;
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

    /**
     * 使用freemarker 生成word文档  数据动态填充
     */
    public static void printInfo(ContractBean bean, String filePath, String fileName) {
        if (null == bean) {
            return;
        }
        Map<String, Object> cont = new HashMap<>();// 存储数据
        cont.put("receiveName", bean.getReceiveName());
        cont.put("numNo", bean.getNumNo());
        cont.put("orderCount", bean.getOrderCount());
        cont.put("coal", bean.getName());
        cont.put("wells", bean.getWells());
        cont.put("price", bean.getUnitPrice());
        cont.put("total", bean.getUnitPrice() * bean.getOrderCount());
        cont.put("fee", Integer.parseInt(bean.getForkliftFee()) == 1 ? "包括" : "不包括");
        cont.put("coalMoney", "");//煤卡费
        try {
            //模板的路径 不包含文件名称
            File fir = new File(filePath);
            String tempName = "hetong1.xml";

            //生成文件的路径及文件名。
            File outFile = new File(filePath +fileName);
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

    /**
     * 使用poi-tl生成word文档  动态数据填充
     */
    public static void createWordInfo(final ContractBean bean, String filePath, String outFilePath) {
        if (null == bean) {
            return;
        }
        //read template
        XWPFTemplate doc = XWPFTemplate.create(filePath);
        //render
        RenderAPI.render(doc, new HashMap<String, Object>() {{
            put("receiveName", bean.getReceiveName());
            put("numNo", bean.getNumNo());
            put("orderCount", bean.getOrderCount());
            put("name", bean.getName());
            put("price", bean.getUnitPrice());
            put("count", bean.getUnitPrice() * bean.getOrderCount());
            put("forkliftFee", Integer.parseInt(bean.getForkliftFee()) == 1 ? "包括" : "不包括");
            put("usePerson", bean.getUsePerson());
        }});
        try {
            FileOutputStream out = new FileOutputStream(outFilePath);
            doc.write(out);
            out.close();
        }catch (Exception e){
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

