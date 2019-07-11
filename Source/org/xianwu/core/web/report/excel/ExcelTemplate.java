package org.xianwu.core.web.report.excel;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xianwu.core.util.Constants;
import org.xianwu.core.util.Utils;

/**
 * 导出Excel的模板对象
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class ExcelTemplate {

	private Log log = LogFactory.getLog(ExcelTemplate.class);

	@SuppressWarnings("rawtypes")
	private List staticObject = null;
	@SuppressWarnings("rawtypes")
	private List parameterObjct = null;
	@SuppressWarnings("rawtypes")
	private List fieldObjct = null;
	@SuppressWarnings("rawtypes")
	private List variableObject = null;
	private String templatePath = null;

	public ExcelTemplate(String pTemplatePath) {
		templatePath = pTemplatePath;
	}
	
	public ExcelTemplate() {
	}
	
	/**
	 * 解析Excel模板
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void parse(HttpServletRequest request) {
		staticObject = new ArrayList();
		parameterObjct = new ArrayList();
		fieldObjct = new ArrayList();
		variableObject = new ArrayList();
		if(Utils.isEmpty(templatePath)){
			log.error(Constants.Exception_Head + "Excel模板路径不能为空!");
		}
		//templatePath = request.getSession().getServletContext().getRealPath(templatePath);
        InputStream is = request.getSession().getServletContext().getResourceAsStream(templatePath); 
		if(Utils.isEmpty(is)){
			log.error(Constants.Exception_Head + "未找到模板文件,请确认模板路径是否正确[" + templatePath + "]");
		}
		Workbook workbook = null;
		try {
			workbook = Workbook.getWorkbook(is);
		} catch (Exception e) {
			e.printStackTrace();
		}
		Sheet sheet = workbook.getSheet(0);
		if (Utils.isNotEmpty(sheet)) {
			int rows = sheet.getRows();
			for (int k = 0; k < rows; k++) {
				Cell[] cells = sheet.getRow(k);
				for (int j = 0; j < cells.length; j++) {
					String cellContent = cells[j].getContents().trim();
					if (!Utils.isEmpty(cellContent)) {
						if (cellContent.indexOf("$P") != -1 || cellContent.indexOf("$p") != -1) {
							parameterObjct.add(cells[j]);
						} else if (cellContent.indexOf("$F") != -1 || cellContent.indexOf("$f") != -1) {
							fieldObjct.add(cells[j]);
						} else if(cellContent.indexOf("$V") != -1 || cellContent.indexOf("$v") != -1) {
							variableObject.add(cells[j]);
						}else {
							staticObject.add(cells[j]);
						}
					}
				}
			}
		} else {
			log.error("模板工作表对象不能为空!");
		}
	}

	/**
	 * 增加一个静态文本对象
	 */
	@SuppressWarnings("unchecked")
	public void addStaticObject(Cell cell) {
		staticObject.add(cell);
	}

	/**
	 * 增加一个参数对象
	 */
	@SuppressWarnings("unchecked")
	public void addParameterObjct(Cell cell) {
		parameterObjct.add(cell);
	}

	/**
	 * 增加一个字段对象
	 */
	@SuppressWarnings("unchecked")
	public void addFieldObjct(Cell cell) {
		fieldObjct.add(cell);
	}

	@SuppressWarnings("rawtypes")
	public List getStaticObject() {
		return staticObject;
	}

	@SuppressWarnings("rawtypes")
	public List getParameterObjct() {
		return parameterObjct;
	}

	@SuppressWarnings("rawtypes")
	public List getFieldObjct() {
		return fieldObjct;
	}

	public String getTemplatePath() {
		return templatePath;
	}

	public void setTemplatePath(String templatePath) {
		this.templatePath = templatePath;
	}

	@SuppressWarnings("rawtypes")
	public List getVariableObject() {
		return variableObject;
	}

}
