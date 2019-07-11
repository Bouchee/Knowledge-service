package org.xianwu.core.web.report.excel;

import java.io.File;
import java.io.IOException;

import org.xianwu.core.util.Utils;

import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.VerticalAlignment;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

public class ExcelExport {
	
	public ExcelExport(){
	}
	
	public String createTemplate(String useraccount, String filepath, String headername, String headerid, String reportTitle) throws IOException, RowsExceededException, WriteException{
		String[] hna = headername.split(",");
		String[] hid = headerid.split(",");

		String webpath = "/etmp/file/temp/";
		String filename = useraccount + "-" + Utils.getCurrentTime("yyyy-MM-dd-hh-mm-ss")  + ".xls";
		String filefullpath = filepath + webpath + filename;
		File file =new File(filefullpath);
		
		if (!file.exists()  && !file.isDirectory()) {
		    file.getParentFile().mkdirs();    
		}
		//OutputStream os=new FileOutputStream(file);
		//File file = new File("C:\\a.xls");
		WritableWorkbook wbook = Workbook.createWorkbook(file); // 建立excel文件 //
																// 标题
		WritableSheet wsheet = wbook.createSheet(reportTitle, 0); // sheet名称
		// 设置excel标题
		WritableFont wfont = new WritableFont(WritableFont.createFont("微软雅黑"));
		WritableCellFormat wcfFC = new WritableCellFormat(wfont);
		wcfFC.setAlignment(Alignment.CENTRE);
		wcfFC.setVerticalAlignment(VerticalAlignment.CENTRE);
		Label label = new Label(0, 0, reportTitle, wcfFC); // put the title in
		
		Label label1, label2;
		wsheet.addCell(label);
		wsheet.mergeCells(0, 0, hna.length - 1, 0);
		
		//wcfFC.setAlignment(Alignment.LEFT);
		for (int i = 0; i < hna.length; i++) {
			label1 = new Label(i, 1, hna[i], wcfFC);
			label2 = new Label(i, 2, "$F{" + hid[i] + "}", wcfFC);
			wsheet.addCell(label1);
			wsheet.addCell(label2);
		}
		wbook.write();

		//CellView cellView = new CellView();
		//cellView.setAutosize(true); // 设置自动大小
		//wsheet.setColumnView(1, cellView);// 根据内容自动设置列宽

		wbook.close();
		return webpath + filename;
	}
}
