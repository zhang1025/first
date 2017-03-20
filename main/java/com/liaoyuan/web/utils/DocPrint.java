package com.liaoyuan.web.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

import javax.print.*;
import javax.print.attribute.DocAttributeSet;
import javax.print.attribute.HashDocAttributeSet;
import javax.print.attribute.HashPrintRequestAttributeSet;
import javax.print.attribute.standard.MediaSizeName;
import javax.swing.JOptionPane;

/**
 * 打印
 */
public class DocPrint {
    public static void main(String[] args) {
        DocPrint dp = new DocPrint();
        dp.printFile();
    }

    public void printFile() {
        FileInputStream textStream = null;
        try {
            textStream = new FileInputStream(new File("C:\\1111.docx"));
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        if (textStream != null) // 当打印内容不为空时
        {
            // 指定打印输出格式
            DocFlavor flavor = DocFlavor.INPUT_STREAM.AUTOSENSE;//SERVICE_FORMATTED.PRINTABLE

            //构建打印请求属性集
            HashPrintRequestAttributeSet pras = new HashPrintRequestAttributeSet();
            //查找所有的可用的打印服务
            PrintService printServices[] = PrintServiceLookup.lookupPrintServices(flavor, pras);
            // 定位默认的打印服务
            PrintService printService = PrintServiceLookup.lookupDefaultPrintService();


            //定位默认的打印服务
            PrintService defaultService = PrintServiceLookup.lookupDefaultPrintService();

            // 不显示打印对话框，直接进行打印工作
            PrintService service = ServiceUI.printDialog(null, 200, 200, printServices,
                    defaultService, flavor, pras);
            if (service != null) {
                try {
                    // 创建打印作业
                    DocPrintJob job = printService.createPrintJob();
                    // 设置纸张大小,也可以新建MediaSize类来自定义大小
                    pras.add(MediaSizeName.ISO_A4);
                    DocAttributeSet das = new HashDocAttributeSet();
                    // 指定打印内容
                    Doc doc = new SimpleDoc(textStream, flavor, das);
                    job.print(doc, pras); // 进行每一页的具体打印操作
                } catch (PrintException pe) {
                    pe.printStackTrace();
                }
            }
        } else {
            // 如果打印内容为空时，提示用户打印将取消
            JOptionPane.showConfirmDialog(null,
                    "Sorry, Printer Job is Empty, Print Cancelled!",
                    "Empty", JOptionPane.DEFAULT_OPTION,
                    JOptionPane.WARNING_MESSAGE);
        }
    }
}