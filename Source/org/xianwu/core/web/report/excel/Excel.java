package org.xianwu.core.web.report.excel;

import java.io.*;
import java.util.UUID;
import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

public class Excel {
	
	private String path;// 文件路径
	private String tableName;
	private String[] tableCols;
	private Workbook workbook;// 工作薄集合

	public Excel(String path, String tableName, String[] tableCols)
			throws BiffException, IOException {
		this.tableName = tableName;
		this.tableCols = tableCols;
		this.setPath(path);
		this.setWorkbook(Workbook.getWorkbook(new java.io.File(path)));
	}

	/**
	 * 获取工作薄数量
	 * 
	 * @return 工作薄数量
	 */
	public int getNumberOfSheets(Workbook book) {
		return book == null ? 0 : book.getNumberOfSheets();
	}

	/**
	 * 获取工作薄总行数
	 * 
	 * @param sheet
	 *            工作薄
	 * @return 工作薄总行数
	 */
	public int getRows(Sheet sheet) {
		return sheet == null ? 0 : sheet.getRows();
	}

	/**
	 * 获取最大列数
	 * 
	 * @param sheet
	 *            工作薄
	 * @return 总行数最大列数
	 */
	public int getColumns(Sheet sheet) {
		return sheet == null ? 0 : sheet.getColumns();
	}

	/**
	 * 获取每行单元格数组
	 * 
	 * @param sheet
	 *            工作薄
	 * @param row
	 *            行数
	 * @return 每行单元格数组
	 */
	public Cell[] getRows(Sheet sheet, int row) {
		return sheet == null || sheet.getRows() < row ? null : sheet
				.getRow(row);
	}

	/**
	 * 获取每行单元格数组
	 * 
	 * @param sheet
	 *            工作薄
	 * @param endrow
	 *            结束行
	 * @param endCol
	 *            结束列
	 * @return 每行单元格数组
	 */
	public Cell[][] getCells(Sheet sheet, int endrow, int endcol) {
		return getCells(sheet, 0, endrow, 0, endcol);
	}

	/**
	 * 获取每行单元格数组
	 * 
	 * @param sheet
	 *            工作薄
	 * @param startrow
	 *            行数
	 * @param endrow
	 *            结束行
	 * @param startcol
	 *            开始列
	 * @param endCol
	 *            结束列
	 * @return 每行单元格数组
	 */
	public Cell[][] getCells(Sheet sheet, int startrow, int endrow,
			int startcol, int endcol) {
		Cell[][] cellArray = new Cell[endrow - startrow][endcol - startcol];
		int maxRow = this.getRows(sheet);
		int maxCos = this.getColumns(sheet);
		for (int i = startrow; i < endrow && i < maxRow; i++) {

			for (int j = startcol; j < endcol && j < maxCos; j++) {

				cellArray[i - startrow][j - startcol] = sheet.getCell(j, i);
			}

		}
		return cellArray;
	}

	/**
	 * 得到行的值
	 * 
	 * @param sheet
	 * @param col
	 * @param startrow
	 * @param endrow
	 * @return
	 */
	public Cell[] getColCells(Sheet sheet, int col, int startrow, int endrow) {
		Cell[] cellArray = new Cell[endrow - startrow];
		int maxRow = this.getRows(sheet);
		int maxCos = this.getColumns(sheet);
		if (col <= 0 || col > maxCos || startrow > maxRow || endrow < startrow) {
			return null;
		}
		if (startrow < 0) {
			startrow = 0;
		}
		for (int i = startrow; i < endrow && i < maxRow; i++) {
			cellArray[i - startrow] = sheet.getCell(col, i);
		}
		return cellArray;
	}

	/**
	 * 得到列的值
	 * 
	 * @param sheet
	 * @param row
	 * @param startcol
	 * @param endcol
	 * @return
	 */
	public Cell[] getRowCells(Sheet sheet, int row, int startcol, int endcol) {
		Cell[] cellArray = new Cell[endcol - startcol];
		int maxRow = this.getRows(sheet);
		int maxCos = this.getColumns(sheet);
		if (row <= 0 || row > maxRow || startcol > maxCos || endcol < startcol) {
			return null;
		}
		if (startcol < 0) {
			startcol = 0;
		}
		for (int i = startcol; i < startcol && i < maxCos; i++) {
			cellArray[i - startcol] = sheet.getCell(i, row);
		}
		return cellArray;
	}

	/**
	 * 生成随机ID
	 * 
	 * @return
	 */
	public static String getStrRandomId() {
		String uuid = UUID.randomUUID().toString().replace("-", "");
		return uuid;
	}

	/**
	 * 组装SQL语句(扩展导入数据库额外增加字段的情况)
	 * 
	 * @param sheet
	 *            工作薄
	 * @param startrow
	 *            开始行
	 * @param endrow
	 *            结束行
	 * @param startcol
	 *            开始列
	 * @param endcol
	 *            结束列
	 * @return SQL语句数组
	 */
	public Object[] constrctCellsSql(Sheet sheet, int startrow, int endrow,
			int startcol, int endcol, String payTime) {
		Cell[][] cellArray = getCells(sheet, startrow, endrow, startcol, endcol);
		java.util.ArrayList<String> list = new java.util.ArrayList<String>();
		StringBuffer bf = new StringBuffer("INSERT INTO " + tableName + "(ID,");
		for (int i = 0; tableCols != null && i < tableCols.length; i++) {
			if (i != tableCols.length - 1)
				bf.append(tableCols[i]).append(",");
			else
				bf.append(tableCols[i]).append("");

		}
		bf.append(",PAY_TIME) VALUES ");
		for (int i = 0; i < cellArray.length; i++) {
			// 在第一列前加个随机数列
			StringBuffer sqlBuffer = new StringBuffer();
			sqlBuffer.append(bf.toString() + "('" + getStrRandomId() + "',");
			Cell[] cell = cellArray[i];
			if (tableCols != null && cell != null
					&& tableCols.length != cell.length)
				continue;
			for (int j = 0; j < cell.length; j++) {
				String tmp = "";
				if (cell[j] != null && cell[j].getContents() != null) {
					tmp = (String) cell[j].getContents();
				}
				if (j != cell.length - 1)
					sqlBuffer.append("'").append(tmp).append("',");
				else
					sqlBuffer.append("'").append(tmp).append("'");
			}
			// 增加时间字段
			sqlBuffer.append(",").append(
					"to_date('" + payTime + "','YYYY-MM-DD HH24:MI:SS')");
			sqlBuffer.append(")");
			list.add(sqlBuffer.toString());
			System.out.println(sqlBuffer.toString());
		}
		System.out.println(list);
		return list.toArray();
	}

	/**
	 * 获取Excel文件路径
	 * 
	 * @return Excel文件路径
	 */
	public String getPath() {
		return this.path;
	}

	/**
	 * 设置Excel文件路径
	 * 
	 * @param path
	 *            Excel文件路径
	 */
	public void setPath(String path) {
		this.path = path;
	}

	/**
	 * 获取工作薄集合
	 */
	public Workbook getWorkbook() {
		return this.workbook;
	}

	/**
	 * 设置工作薄集合
	 * 
	 * @param workbook
	 *            工作薄集合
	 */
	public void setWorkbook(Workbook workbook) {
		this.workbook = workbook;
	}

	/**
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		try {
			File fileWrite = new File("c:/testWrite.xls");
			fileWrite.createNewFile();
			OutputStream os = new FileOutputStream(fileWrite);
			// Excel.write(os);
			os.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
