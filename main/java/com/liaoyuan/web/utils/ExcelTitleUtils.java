package com.liaoyuan.web.utils;


import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.RegionUtil;
import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCell;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ExcelTitleUtils {

    /**
     * 导出excel主方法
     * @param columnnames
     * @param datas
     * @param filename
     * @param response
     * @throws IOException
     */
    public static void exportExcel(List<String> columnnames,
                                   List<List<Object>> datas, String filename,
                                   HttpServletResponse response,
                                   Map<String,String> map) throws IOException {
        if (!filename.endsWith(".xls")) {
            filename += ".xls";
        }
        response.setContentType("application/vnd.ms-excel");
        response.setHeader("content-disposition", "attachment;filename="
                + filename);
        response.setBufferSize(5000);
        OutputStream out = response.getOutputStream();
        getExcelWorkbook(columnnames, datas,map).write(out);
        out.flush();
        out.close();
    }

    /**
     * 30000条记录分一个sheet页，最多支持100000条记录
     * @param columnnames
     * @param datas
     * @return
     */
    public static Workbook getExcelWorkbook(List<String> columnnames,
                                            List<List<Object>> datas,
                                            Map<String,String> map) {
        Workbook workbook = null;
        try {
            workbook = new HSSFWorkbook();
            Map<String, CellStyle> wbStyles = getCellStyles(workbook);
            if (datas != null && datas.size() > 0) {
                int perNum = 30000;
                int len = datas.size();
                if (len > 100000) {
                    len = 100000;
                }
                int sheetNum = len / perNum + 1;
                for (int i = 0; i < sheetNum; i++) {
                    int startNo = perNum * i;
                    int endNo = perNum * (i + 1);
                    if (endNo > len) {
                        endNo = len;
                    }
                    generalSheet(workbook, wbStyles, "sheet" + i, startNo,
                            endNo, columnnames, datas,map);
                }

            } else {
                generalSheet(workbook, wbStyles, "sheet", 0, 0, columnnames,
                        datas,map);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return workbook;
    }

    /**
     * 生成sheet页
     * @param workbook
     * @param wbStyles
     * @param sheetName
     * @param start
     * @param end
     * @param columnnames
     * @param datas
     */
    public static void generalSheet(Workbook workbook,
                                    Map<String, CellStyle> wbStyles, String sheetName, int start,
                                    int end, List<String> columnnames,
                                    List<List<Object>> datas,Map<String,String> map) {
        Sheet sheet = workbook.createSheet(sheetName);
        // 设置列宽
        int col = 0;int colSize = 1;
        if (columnnames != null) {
            for (String columnname : columnnames) {
                sheet.setColumnWidth((short) col++, 5000);
            }
            colSize = columnnames.size();
        }
        if(null != map && map.get("title")!=null){
            sheet.addMergedRegion(new CellRangeAddress(0,1,0,colSize-1));
            Row row11 = sheet.createRow(0);
            Cell cell = row11.createCell(0);
            cell.setCellValue(map.get("title"));
            cell.setCellStyle(wbStyles.get("title"));
        }
        if(null != map && map.get("date")!=null){
            sheet.addMergedRegion(new CellRangeAddress(2,2,0,colSize-1));
            Row row22 = sheet.createRow(2);
            Cell cell2 = row22.createCell(0);
            cell2.setCellValue(map.get("date"));
            cell2.setCellStyle(wbStyles.get("normal"));
        }
        if (end > start) {
            // 创建第一行标题
            Row row = sheet.createRow((short) 3);
            col = 0;
            for (String columnname : columnnames) {
                createCell(row, (short) col++,
                        wbStyles.get("header"), XSSFCell.CELL_TYPE_STRING,
                        columnname);
            }
            int lineNum = 4;
            for (int i = start; i < end; i++) {
                List<Object> rowDatas = datas.get(i);
                Row rowl = sheet.createRow((short) (lineNum++));
                col = 0;
                for (Object data : rowDatas) {
                    if(data instanceof Number){
                        createCell(rowl, (short) col++,
                                wbStyles.get("normal"), XSSFCell.CELL_TYPE_NUMERIC,
                                data);
                    }else{
                        createCell(rowl, (short) col++,
                                wbStyles.get("normal"), XSSFCell.CELL_TYPE_STRING,
                                data);
                    }
                }
            }
        }
    }
    /**
     *
     * @param workbook
     * @return
     */
    public static Map<String, CellStyle> getCellStyles(Workbook workbook) {
        Map<String, CellStyle> styles = new HashMap<>();
        DataFormat df = workbook.createDataFormat();

        //header style
        CellStyle style;
        Font headerFont = workbook.createFont();
        headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        headerFont.setFontName("微软雅黑");
        headerFont.setFontHeightInPoints((short)11);
//		headerFont.setColor(HSSFColor.RED.index);
        headerFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);//加粗
        style = createBorderedStyle(workbook);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        style.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(headerFont);
        styles.put("title", style);


        style = createBorderedStyle(workbook);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        style.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(headerFont);
        styles.put("header", style);

        //normal data
        style = createBorderedStyle(workbook);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        style.setWrapText(true);
        styles.put("normal", style);

        //error data
        Font errorFont = workbook.createFont();
        errorFont.setColor(IndexedColors.RED.getIndex());
        style = createBorderedStyle(workbook);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setWrapText(true);
        style.setFont(errorFont);
        styles.put("error", style);

        //green data
        Font greenFont = workbook.createFont();
        greenFont.setColor(IndexedColors.GREEN.getIndex());
        style = createBorderedStyle(workbook);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setWrapText(true);
        style.setFont(greenFont);
        styles.put("green", style);

        //date style
        style = createBorderedStyle(workbook);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setWrapText(true);
        style.setDataFormat(df.getFormat("yyyy-MM-dd"));
        styles.put("date", style);

        //date style
        style = createBorderedStyle(workbook);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setWrapText(true);
        style.setDataFormat(df.getFormat(DateUtils.YYYYMMDDHM));
        styles.put("date_2", style);

        //error date style
        style = createBorderedStyle(workbook);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setWrapText(true);
        style.setDataFormat(df.getFormat(DateUtils.YYYYMMDDHM));
        style.setFont(errorFont);
        styles.put("error_date_2", style);

        //number
        style = createBorderedStyle(workbook);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(true);
        style.setDataFormat(df.getFormat("###,###0"));
        styles.put("number", style);

        //number
        style = createBorderedStyle(workbook);
        style.setAlignment(CellStyle.ALIGN_RIGHT);
        style.setWrapText(true);
        style.setDataFormat(df.getFormat("###,###0.0"));
        styles.put("number_2", style);

        return styles;
    }

    public static  void createCell(Row row, int column, CellStyle style, int cellType, Object value) {
        Cell cell = row.createCell((short)column);
        if(style != null) {
            cell.setCellStyle(style);
        }
        switch (cellType) {
            case Cell.CELL_TYPE_BLANK:
                break;

            case Cell.CELL_TYPE_STRING:
                if(value != null) {
                    cell.setCellValue(value.toString());
                }
                break;

            case Cell.CELL_TYPE_NUMERIC:
                cell.setCellType(cellType);
                if(value != null) {
                    String temp = String.valueOf(value);
                    cell.setCellValue(temp.contains(".")?Double.parseDouble(temp):Integer.parseInt(temp));
                }
                break;

            default:
                break;
        }
    }

    private static CellStyle createBorderedStyle(Workbook wb){
        CellStyle style = wb.createCellStyle();
        style.setBorderRight(CellStyle.BORDER_THIN);
        style.setRightBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderBottom(CellStyle.BORDER_THIN);
        style.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderLeft(CellStyle.BORDER_THIN);
        style.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderTop(CellStyle.BORDER_THIN);
        style.setTopBorderColor(IndexedColors.BLACK.getIndex());
        return style;
    }
}
