package com.liaoyuan.web.utils;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.RegionUtil;
import org.apache.poi.xssf.usermodel.XSSFCell;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class ExcelUtils {
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
			HttpServletResponse response) throws IOException {
		if (!filename.endsWith(".xls")) {
			filename += ".xls";
		}
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("content-disposition", "attachment;filename="
				+ filename);
		response.setBufferSize(5000);
		OutputStream out = response.getOutputStream();
		getExcelWorkbook(columnnames, datas).write(out);
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
			List<List<Object>> datas) {
		Workbook workbook = null;
		try {
			workbook = new HSSFWorkbook();
			Map<String, CellStyle> wbStyles = ExcelUtils.getCellStyles(workbook);
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
							endNo, columnnames, datas);
				}

			} else {
				generalSheet(workbook, wbStyles, "sheet", 0, 0, columnnames,
						datas);
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
			int end, List<String> columnnames, List<List<Object>> datas) {
		Sheet sheet = workbook.createSheet(sheetName);
		// 设置列宽
		int col = 0;
		if (columnnames != null) {
			for (String columnname : columnnames) {
				sheet.setColumnWidth((short) col++, 5000);
			}
		}
		if (end > start) {
			// 创建第一行标题
			Row row = sheet.createRow((short) 0);
			col = 0;
			for (String columnname : columnnames) {
				ExcelUtils.createCell(row, (short) col++,
						wbStyles.get("header"), XSSFCell.CELL_TYPE_STRING,
						columnname);
			}
			int lineNum = 1;
			for (int i = start; i < end; i++) {
				List<Object> rowDatas = datas.get(i);
				Row rowl = sheet.createRow((short) (lineNum++));
				col = 0;
				for (Object data : rowDatas) {
                    if(data instanceof Number){
                        ExcelUtils.createCell(rowl, (short) col++,
                                wbStyles.get("normal"), XSSFCell.CELL_TYPE_NUMERIC,
                                data);
                    }else{
                        ExcelUtils.createCell(rowl, (short) col++,
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
		Map<String, CellStyle> styles = new HashMap<String, CellStyle>();
		DataFormat df = workbook.createDataFormat();

		//header style
		CellStyle style;
		Font headerFont = workbook.createFont();
        headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style = createBorderedStyle(workbook);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);
        style.setFont(headerFont);
        styles.put("header", style);

        //normal data
        style = createBorderedStyle(workbook);
        style.setAlignment(CellStyle.ALIGN_CENTER);
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
    
    /*
	 * 导出等级流失，时长流失
	 */
    public static void createLostInfoFile(String type,String firstDate,String secondeDate,List<Map<String,Object>> data, String name,HttpServletResponse response) {
        
        Workbook wb = new HSSFWorkbook();
        Sheet sheet = wb.createSheet();
        OutputStream out = null;
        try {
	        if(data!=null){
	        	sheet.setColumnWidth((short)0, (short)(4000));
	        	for(int i=0;i<data.size();i++){
	        		Map<String,Object> map = data.get(i);
	        		insertRow(type,firstDate,secondeDate,wb,sheet,map,6*i+1); 
	        	}
	        }
	        response.setContentType("application/vnd.ms-excel");
			response.setHeader("content-disposition", "attachment;filename="
					+ name);
			response.setBufferSize(5000);
			out = response.getOutputStream();
            wb.write(out);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("生成excel出错！");
        } finally {
            if (out != null) {
                try {
                	out.flush();
                	out.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }
    
    public static void insertRow(String type,String firstDate,String secondeDate,Workbook wb,Sheet sheet,Map<String,Object> data,int startRowNum){
		Font sourceFont = wb.createFont();
        sourceFont.setColor(HSSFColor.BLACK.index);
        String title = (String)data.get("title");
        int maxLevel = (int)data.get("maxLevel");
        double[]  firstData = (double[])data.get("firstData");
        double[]  secondData = (double[])data.get("secondData");
        CellRangeAddress region = new CellRangeAddress(startRowNum,startRowNum,0,maxLevel);
	    sheet.addMergedRegion(region) ;//合并单元格
        Row titleRow  = sheet.getRow(startRowNum);
        if(titleRow==null){
        	titleRow = sheet.createRow(startRowNum);
        }
        Row levelRow = sheet.createRow(startRowNum+1);
        Row firstDataRow = sheet.createRow(startRowNum+2);
        Row secondDataRow = sheet.createRow(startRowNum+3);
        //标题样式
        CellStyle titleStyle = wb.createCellStyle();
        titleStyle.setAlignment(CellStyle.ALIGN_CENTER);
	    Font titleFont = wb.createFont();
	    titleFont.setFontName("微软雅黑");
	    titleFont.setFontHeightInPoints((short)11);
	    titleFont.setColor(HSSFColor.RED.index);
	    titleFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);//加粗
	    titleStyle.setFont(titleFont);
	    
	    //正文样式
	    CellStyle normalStyle = wb.createCellStyle();
	    normalStyle.setAlignment(CellStyle.ALIGN_CENTER);
	    normalStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
	    normalStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
	    normalStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
	    normalStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
	    normalStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("0.00%"));
	    Font normalFont = wb.createFont();
	    normalFont.setFontName("微软雅黑");
	    normalFont.setFontHeightInPoints((short)9);
	    normalFont.setColor(HSSFColor.BLACK.index);
	    normalStyle.setFont(normalFont);
        //填充数据值
	    
	    Cell titleCell = titleRow.getCell(0);
	    if(titleCell==null){
	    	titleCell = titleRow.createCell(0);
	    }
	    titleCell.setCellValue(title);
	    titleCell.setCellStyle(titleStyle);
	    
	    
	    RegionUtil.setBorderLeft(HSSFCellStyle.BORDER_THIN, region, sheet, wb);
	    RegionUtil.setBorderRight(HSSFCellStyle.BORDER_THIN, region, sheet, wb);
	    RegionUtil.setBorderTop(HSSFCellStyle.BORDER_THIN, region, sheet, wb);
	    RegionUtil.setBorderBottom(HSSFCellStyle.BORDER_THIN, region, sheet, wb);
	    
	    String[] timesDesc = {"(0-5)min","[5-30)min","[30-60)min","[60-120)min","[120-180)min","[180-∞)min"};
	    Cell dateCell = levelRow.createCell(0);
	    dateCell.setCellValue("日期");
	    dateCell.setCellStyle(normalStyle);
    	for(int i=0;i<maxLevel;i++){
    		Cell cell = levelRow.createCell(i+1);
    		if(type.equals("level"))
    			cell.setCellValue((i+1)+"级");
    		else
    			cell.setCellValue(timesDesc[i]);
    		cell.setCellStyle(normalStyle);
    	}
    	
    	Cell firstDateCell = firstDataRow.createCell(0);
    	firstDateCell.setCellValue(firstDate);
    	firstDateCell.setCellStyle(normalStyle);
    	for(int i=0;i<maxLevel;i++){
    		Cell cell = firstDataRow.createCell(i+1);
    		cell.setCellValue(firstData[i]/100);
    		cell.setCellStyle(normalStyle);
    	}
    	Cell secondDateCell = secondDataRow.createCell(0);
    	secondDateCell.setCellValue(secondeDate);
    	secondDateCell.setCellStyle(normalStyle);
    	for(int i=0;i<maxLevel;i++){
    		Cell cell = secondDataRow.createCell(i+1);
    		cell.setCellValue(secondData[i]/100);
    		cell.setCellStyle(normalStyle);
    	}
    }

	/**
	 * 下载模板
	 * 		add by machaozhe 2016-11-28
	 * @param columnnames
	 * @param filename
	 * @param response
	 * @throws IOException
	 */
	public static void exportTemplate(List<String> columnnames,String filename, HttpServletResponse response)throws IOException{

		if (!filename.endsWith(".xls")) {
			filename += ".xls";
		}
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("content-disposition", "attachment;filename="
				+ filename);
		response.setBufferSize(5000);
		OutputStream out = response.getOutputStream();
		writeHeader(columnnames).write(out);
		out.flush();
		out.close();
	}

	/**
	 * 写入下载模板的header
	 * 		add by machaozhe 2016-11-28
	 * @param columNames
	 * @return
	 */
	private static Workbook writeHeader(List<String> columNames){
		Workbook workbook = new HSSFWorkbook();
		Map<String, CellStyle> wbStyles = ExcelUtils.getCellStyles(workbook);
		Sheet sheet = workbook.createSheet("sheet");

		if (columNames != null) {
			int col = 0;
			Row row = sheet.createRow((short) 0);
			for (String columName : columNames) {
				sheet.setColumnWidth((short) col, 20000);
				ExcelUtils.createCell(row, (short) col, wbStyles.get("header"), XSSFCell.CELL_TYPE_STRING, columName);
				col++;
			}
		}

		return workbook;
	}
}
