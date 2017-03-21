package com.liaoyuan.web.utils;

import javax.print.*;
import javax.print.attribute.DocAttributeSet;
import javax.print.attribute.HashDocAttributeSet;
import javax.print.attribute.HashPrintRequestAttributeSet;
import javax.print.attribute.PrintRequestAttributeSet;
import javax.print.attribute.standard.MediaSizeName;
import javax.swing.*;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

/**
 * Created by fewewfws on 2017/3/20 0020.
 */
public class DocPrint {
    public static void main(String[] args){
        DocPrint dp = new DocPrint();
//        dp.printFile();

        dp.printFileAction();
    }
    public void printFile(){
        FileInputStream textStream = null;
        try {
            textStream = new FileInputStream(new File("E:\\test.doc"));
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        if (textStream != null) // 当打印内容不为空时
        {
            // 指定打印输出格式
            DocFlavor flavor = DocFlavor.INPUT_STREAM.AUTOSENSE ;//SERVICE_FORMATTED.PRINTABLE

            //构建打印请求属性集
            HashPrintRequestAttributeSet pras = new HashPrintRequestAttributeSet();
            //pras.add(new Copies(3));//打印份数，3份
            //查找所有的可用的打印服务
            PrintService printServices[] = PrintServiceLookup.lookupPrintServices(flavor, pras);

            //定位默认的打印服务
            PrintService defaultService = PrintServiceLookup.lookupDefaultPrintService();

            // 显示打印对话框，进行打印工作
            PrintService service = ServiceUI.printDialog(null, 200, 200, printServices,
                    defaultService,flavor, pras);
            if(service!=null){
                try {
                    // 创建打印作业
                    DocPrintJob job = service.createPrintJob();
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

    /* 打印指定的文件 */
    private void printFileAction()
    {
        // 构造一个文件选择器，默认为当前目录
        JFileChooser fileChooser = new JFileChooser();
        int state = fileChooser.showOpenDialog(null);// 弹出文件选择对话框
        if (state == fileChooser.APPROVE_OPTION)// 如果用户选定了文件
        {
            File file = fileChooser.getSelectedFile();// 获取选择的文件
            // 构建打印请求属性集
            PrintRequestAttributeSet pras = new HashPrintRequestAttributeSet();
            // 设置打印格式，因为未确定文件类型，这里选择 AUTOSENSE
            DocFlavor flavor = DocFlavor.INPUT_STREAM.AUTOSENSE;
            // 查找所有的可用打印服务
            PrintService printService[] =
                    PrintServiceLookup.lookupPrintServices(flavor, pras);
            // 定位默认的打印服务
            PrintService defaultService = PrintServiceLookup.lookupDefaultPrintService();
            // 显示打印对话框
            PrintService service = ServiceUI.printDialog(null, 200, 200, printService
                    , defaultService, flavor, pras);
            if (service != null)
            {
                try
                {
                    DocPrintJob job = service.createPrintJob();// 创建打印作业
                    FileInputStream fis = new FileInputStream(file);// 构造待打印的文件流
                    DocAttributeSet das = new HashDocAttributeSet();
                    Doc doc = new SimpleDoc(fis, flavor, das);// 建立打印文件格式
                    job.print(doc, pras);// 进行文件的打印
                }
                catch(Exception e)
                {
                    e.printStackTrace();
                }
            }
        }
    }
}