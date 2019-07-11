package org.xianwu.core.web.report.excel;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.xianwu.core.json.JsonHelper;
import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.mvc.xstruts.upload.FormFile;
import org.xianwu.core.util.Utils;
import org.xianwu.core.web.util.WebUtils;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

public class ExcelImport {

	public ExcelImport() {
	}

	public Dto importExcel(HttpServletRequest request, String nameAndId, FormFile theExcelFile) {
		return importExcel(request, nameAndId, theExcelFile, null, null, null, 2, -1);
	}
	
	public Dto importExcel(HttpServletRequest request, String nameAndId, FormFile theExcelFile, Dto nullFlag) {
		return importExcel(request, nameAndId, theExcelFile, nullFlag, null, null, 2, -1);
	}

	public Dto importExcel(HttpServletRequest request, String nameAndId, FormFile theExcelFile, Dto nullFlag, Dto codeFlag) {
		return importExcel(request, nameAndId, theExcelFile, nullFlag, codeFlag, null, 2, -1);
	}
	
	public Dto importExcel(HttpServletRequest request, String nameAndId, FormFile theExcelFile, int startRow) {
		return importExcel(request, nameAndId, theExcelFile, null, null, null, startRow, -1);
	}
	
	public Dto importExcel(HttpServletRequest request, String nameAndId, FormFile theExcelFile, Dto nullFlag, int startRow) {
		return importExcel(request, nameAndId, theExcelFile, nullFlag, null, null, startRow, -1);
	}

	public Dto importExcel(HttpServletRequest request, String nameAndId, FormFile theExcelFile, Dto nullFlag, Dto codeFlag, int startRow) {
		return importExcel(request, nameAndId, theExcelFile, nullFlag, codeFlag, null, startRow, -1);
	}
	
	public Dto importExcel(HttpServletRequest request, String nameAndId, FormFile theExcelFile, String sheetName) {
		return importExcel(request, nameAndId, theExcelFile, null, null, sheetName, 2, -1);
	}
	
	public Dto importExcel(HttpServletRequest request, String nameAndId, FormFile theExcelFile, Dto nullFlag, String sheetName) {
		return importExcel(request, nameAndId, theExcelFile, nullFlag, null, sheetName, 2, -1);
	}

	public Dto importExcel(HttpServletRequest request, String nameAndId, FormFile theExcelFile, Dto nullFlag, Dto codeFlag, String sheetName) {
		return importExcel(request, nameAndId, theExcelFile, nullFlag, codeFlag, sheetName, 2, -1);
	}
	
	public Dto importExcel(HttpServletRequest request, String nameAndId, FormFile theExcelFile, Dto nullFlag, int startRow, String sheetName) {
		return importExcel(request, nameAndId, theExcelFile, nullFlag, null, sheetName, startRow, -1);
	}

	@SuppressWarnings("unchecked")
	public Dto importExcel(HttpServletRequest request, String nameAndId, FormFile theExcelFile, Dto nullFlag, Dto codeFlag, String sheetName, int startRow, int endRow) {
		// public Dto importExcel(String nameAndId, FormFile theExcelFile, Dto
		// nullFlag, HttpServletRequest request, String sheetName, int startRow,
		// boolean uploadFileFlag, String filePath) {
		if (Utils.isEmpty(theExcelFile)) {
			return null;
		}

		Dto outDto = new BaseDto();
		String[] fielddata = nameAndId.split("-dec-");

		String fieldcnname = fielddata[0];
		String fieldenid = fielddata[1];

		String[] fcn = fieldcnname.replace(" ", "").split("\\,");
		String[] fei = fieldenid.replace(" ", "").split("\\,");

		int startrow = 1;
		if (startRow > 0) {
			startrow = startRow; // 从第三行开始导入数据
		} else {
			startrow = 1; // 如果复制为0，那么
		}

		Workbook workbook = null;
		try {
			workbook = Workbook.getWorkbook(theExcelFile.getInputStream());
		} catch (BiffException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		Sheet sheet = null;
		if (Utils.isNotEmpty(sheetName)) {
			/*sheet = workbook.getSheet(0);*/
			sheet = workbook.getSheet(sheetName);
		} else {
			sheet = workbook.getSheet(0); // 如果没有给定使用第几个Sheet表，则默认使用第一个表。
		}

		if (Utils.isEmpty(sheet)) {
			try {
				sheet = workbook.getSheet(0);
			} catch (IndexOutOfBoundsException e) {
				e.printStackTrace();
			}
		}

		int rows = sheet.getRows(); // 得到行数
		// int cols = sheet.getColumns(); // 得到列数

		int leftrow;
		if (endRow == -1) {
			leftrow = 0; // 最后0行不导入;
		} else {
			leftrow = rows - endRow;
		}

		// 表明第一行是标题,表头从第二行开始;
		/*
		 * if (Utils.isEmpty(sheet.getCell(1, 0).getContents()) &&
		 * Utils.isNotEmpty(sheet.getCell(0, 0).getContents())){ startrow = 2;
		 * // 从第二行开始导入数据 }
		 */

		// int booknumber = workbook.getNumberOfSheets();// 工作表的数量;
		// log.debug("工作表数量: " + booknumber);

		/*
		 * if (booknumber > 1) { //outDto.put("msg",
		 * "您的Excel文件有多个工作表,系统无法判定,为了数据安全,系统将不导入任何工作表!"); //return outDto; }
		 * else if (booknumber < 1) { outDto.put("msg", "您的Excel文件没有工作表,请检查!");
		 * return outDto; }
		 */
		Cell[] cells = sheet.getRow(0); // 表头在第一行
		String ce = null;

		/*
		 * if (cols != cells.length) { outDto.put("msg",
		 * "检测到工作表的表头与数据列数不相等,请人工确认!"); return outDto; } if (fcn.length <
		 * cells.length) { outDto.put("msg", "您要导入的工作表中的某列在数据库没有与之对应的列!");
		 * return outDto; }
		 */

		StringBuffer metaData = new StringBuffer(100);
		StringBuffer metaData2 = new StringBuffer(100);
		for (int i = 0; i < cells.length; i++) {
			for (int j = 0; j < fcn.length; j++) {
				ce = cells[i].getContents().toLowerCase();
				if (ce.equalsIgnoreCase(fcn[j]) || ce.equalsIgnoreCase(fei[j])) {
					metaData.append(fei[j] + ",");
					metaData2.append(i + ",");
				}
			}
		}

		String[] arrMeta = metaData.toString().trim().split(",");
		String[] arrMeta2 = metaData2.toString().trim().split(",");
		
		String tmp = "";
		String key = null;
		String tmpdata = null;
		// String time1, time2;
		List<Dto> list = new ArrayList<Dto>();
		// List list2 = new ArrayList();
		// Dto dto2;

		String msg = "";
		boolean checkNullFlag = Utils.isNotEmpty(nullFlag);
		boolean checkCodeFlag = Utils.isNotEmpty(codeFlag);
		int jj;
		
		for (int i = startrow - 1; i <  rows - leftrow; i++) {//
			cells = sheet.getRow(i);
			Dto rowDto = new BaseDto();
			for (int j = 0; j < arrMeta.length; j++) {
				jj = Integer.parseInt(arrMeta2[j]);
				
				key = arrMeta[j];
				try {
					tmp = cells[jj].getContents();
				} catch (Exception e) {
					tmp = "";
				}

				// 校验值是否为#N/A
				if (tmp.equalsIgnoreCase("ERROR 42") || tmp.equalsIgnoreCase("#N/A")) {// What the FUCK!
					// msg += Utils.getExcelLetterFromIndex(jj) + (i + 1) + " - 有误置空 : #N/A\r\n";
					tmp = null;
				}

				if (Utils.isNotEmpty(tmp)) {
					// 进行code表匹配；
					if (checkCodeFlag){
						Object ccf = codeFlag.getAsBoolean(key);
						if (Utils.isNotEmpty(ccf) && ccf.equals(true)) {
							tmpdata = WebUtils.getCodeByFiledAndCodedesc(key, tmp, request);
							if (Utils.isEmpty(tmpdata) || tmpdata.equalsIgnoreCase("null")) {
								msg += Utils.getExcelLetterFromIndex(jj) + (i + 1) + " - 无法匹配 : " + tmp + "\r\n";
							} else {
								tmp = tmpdata;
							}
						}
					}
					
					// 日期转换
					if (tmp.matches("\\d{1,2}[-/]\\d{1,2}[-/]\\d{4}")) {
						tmp = tmp.replaceFirst("(\\d{1,2})[-/](\\d{1,2})[-/](\\d{4})", "$3-$1-$2");
					}

					// 身份证检查
					/*
					 * if (key.equalsIgnoreCase("idno")) { if
					 * (Utils.isEmpty(tmp)) {// 说明身份证为空 time1 =
					 * Long.toString(System.nanoTime()); Random random = new
					 * Random(); if (time1.length() == 15) { tmp = time1 +
					 * "000"; } else if (time1.length() == 14) { tmp = time1 +
					 * random.nextInt(10) + "000"; } else if (time1.length() ==
					 * 13) { tmp = time1 + (random.nextInt(90) + 10) + "000"; }
					 * else if (time1.length() >= 13) { time2 =
					 * Utils.getCurrentTime("yyyyMMddHHmmss"); tmp =
					 * time1.substring(6, 12) + time2.substring(0, 8) +
					 * time1.substring(12, 13) + "000"; } else { tmp =
					 * (random.nextInt(900000) + 100000) +
					 * Utils.getCurrentTime("yyyyMMddHHmmss").substring(0, 8) +
					 * random.nextInt(10) + "000"; } idnofl = true;
					 * 
					 * } else {// 身份证不为空,要判定是不是已经存在 for (int k = 0; k <
					 * listdb.size(); k++) { dto2 = (BaseDto) listdb.get(k); if
					 * (tmp.equalsIgnoreCase(dto2.getAsString("idno")))
					 * {//说明身份证号码相等 list2.add(k + 3); idnofl = false; break; } }
					 * 
					 * } }
					 */

					// 文件上传
					/*
					 * if (uploadFileFlag){ if(tmp.matches("\\w:[/\\].*")){
					 * //inDto.put("figure", ""); UploadImage.upload(request,
					 * aForm.getFigure(), filePath, 0); }else{
					 * 
					 * } }
					 */
				} else {
					// nullFlag必填项
					if (checkNullFlag) {
						Object an = nullFlag.getAsBoolean(key);
						if (Utils.isNotEmpty(an) && an.equals(true)) {
							msg += Utils.getExcelLetterFromIndex(jj) + (i + 1) + " - 不能为空\r\n";
						}
					}
				}

				rowDto.put(key, tmp);
			}
			list.add(rowDto);
		}

		workbook.close();
		                                                                      
		if (Utils.isEmpty(msg)){                                           
			outDto.put("issuccess", true);
			outDto.put("data", list);
		}else{
			outDto.put("issuccess", false);
			outDto.put("msg", msg);
		}
		
		// outDto.put("idnocheck", list2);
		return outDto;
	}

	public Dto initializeExcel(FormFile theExcelFile) {
		if (Utils.isEmpty(theExcelFile)) {
			return null;
		}

		Workbook workbook = null;
		try {
			workbook = Workbook.getWorkbook(theExcelFile.getInputStream());
		} catch (BiffException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		List<Dto> sheetNameList = new ArrayList<Dto>();
		String[] sheetNames = workbook.getSheetNames();

		Sheet sheet;
		for (int i = 0; i < sheetNames.length; i++) {
			Dto sheetNamesDto = new BaseDto();
			sheet = workbook.getSheet(i);
			if (sheet.getRows() > 1){
				sheetNamesDto.put("text", (i + 1) + " - " + sheetNames[i] + " - 行/列：" + sheet.getRows() + "/" + sheet.getColumns());
				sheetNameList.add(i, sheetNamesDto);
			}
		}
		String jsonString = JsonHelper.encodeObject2Json(sheetNameList);//
		// String jsonString = JsonHelper.encodeList2PageJson(sheetNameList, sheetNameList.size(), null);

		workbook.close();
		// int cols = sheet.getColumns(); // 得到列数
		Dto dtos = new BaseDto();
		
		if (jsonString.equals("[]")) {
			dtos.put("success", false);
			dtos.put("msg", "Excel没有包含数据的Sheet，你想要干嘛 ^_^");
		} else {
			dtos.put("success", true);
			dtos.put("sheetname", jsonString);
		}
		
		return dtos;
	}
}
