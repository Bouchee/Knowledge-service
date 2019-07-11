package org.xianwu.core.web.image;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import org.xianwu.core.mvc.xstruts.upload.FormFile;
import org.xianwu.core.util.Utils;

public class UploadImage {

	public UploadImage() {
	}

	public static String upload(HttpServletRequest request, FormFile theFile, String filepath){
		if (Utils.isEmpty(theFile.getFileName())) {
			return null;
		}
		String savePath = request.getSession().getServletContext().getRealPath("/") + filepath;
		File file = new File(savePath);
		if (!file.exists()) {
			file.mkdir();
		}

		String fileName = theFile.getFileName();
		String ext = getExtension(fileName).toLowerCase();
		File fileToCreate = new File(savePath, fileName);
		if (fileToCreate.exists()) {
			fileName = getFileName(fileName) + "_" + Utils.getCurrentTime("yyyy-MM-dd_HH-mm-ss") + ext;
			fileToCreate = new File(savePath, fileName);
		}
		FileOutputStream os;
		try {
			os = new FileOutputStream(fileToCreate);
			os.write(theFile.getFileData());
			os.write(theFile.getFileData());
			os.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}

		return filepath + fileName;
	}

	public static String upload(HttpServletRequest request, FormFile theFile, String filepath, int maxWidth, int maxHeight){
		if (Utils.isEmpty(theFile.getFileName())) {
			return null;
		}
		String savePath = request.getSession().getServletContext().getRealPath("/") + filepath;
		File file = new File(savePath);
		if (!file.exists()) {
			file.mkdir();
		}

		String fileName = theFile.getFileName();
		String ext = getExtension(fileName).toLowerCase();
		File fileToCreate = new File(savePath, fileName);
		if (fileToCreate.exists()) {
			fileName = getFileName(fileName) + "_" + Utils.getCurrentTime("yyyy-MM-dd_HH-mm-ss") + ext;
			fileToCreate = new File(savePath, fileName);
		}

		int type = ImageUtils.IMAGE_UNKNOWN; // 未指定的文件类型
		if (ext.equals(".pjpeg") || ext.equals(".jpeg") || ext.equals(".jpg")) {
			type = ImageUtils.IMAGE_JPEG;
		} else if (ext.equals(".bmp")) {
			type = ImageUtils.IMAGE_BMP;
		} else if (ext.equals(".gif")) {
			type = ImageUtils.IMAGE_PNG;
		}

		if (ext.equals(".pjpeg") || ext.equals(".jpeg") || ext.equals(".jpg") || ext.equals(".bmp") || ext.equals(".gif") || ext.equals(".png")) {
			BufferedImage bi = null;
			try {
				bi = ImageUtils.resizeImage(ImageIO.read(theFile.getInputStream()), type, maxWidth, maxHeight);
			} catch (FileNotFoundException e) {
				e.printStackTrace();
				return null;
			} catch (IOException e) {
				e.printStackTrace();
				return null;
			}
			if (!ImageUtils.saveImage(bi, fileToCreate.toString(), type)) {
				return null;
			}
		} else {
			FileOutputStream os;
			try {
				os = new FileOutputStream(fileToCreate);
				os.write(theFile.getFileData());
				os.flush();
				os.close();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
				return null;
			} catch (IOException e) {
				e.printStackTrace();
				return null;
			}
		}

		return filepath + fileName;
	}

	public static String upload(HttpServletRequest request, FormFile theFile, String filepath, int resizeflag) {
		if (resizeflag == 0) {
			return upload(request, theFile, filepath);
		} else {
			int maxWidth = 0;
			int maxHeight = 0;
			if (resizeflag == 8) {
				maxWidth = 800;
				maxHeight = 500;
			} else if (resizeflag == 4) {
				maxWidth = 400;
				maxHeight = 246;
			} else if (resizeflag == 2) {
				maxWidth = 200;
				maxHeight = 120;
			} else if (resizeflag == 1) {
				maxWidth = 100;
				maxHeight = 60;
			} else if (resizeflag == 5) {
				maxWidth = 50;
				maxHeight = 30;
			} else {
				maxWidth = 80;
				maxHeight = 50;
			}
			return upload(request, theFile, filepath, maxWidth, maxHeight);
		}
	}

	private static String getExtension(String s) {
		char split = '.';
		int i = s.lastIndexOf(split);
		int leg = s.length();
		return (i > 0 ? (i + 1) == leg ? "" : s.substring(i, leg) : "");
	}

	private static String getFileName(String s) {
		char split = '.';
		int i = s.lastIndexOf(split);
		int leg = s.length();
		return (i > 0 ? (i + 1) == leg ? "" : s.substring(0, i) : "");
	}

}
