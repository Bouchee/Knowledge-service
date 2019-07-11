package org.xianwu.core.resource.loader;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

/**
 * BufferResponseWrapper
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class BufferResponseWrapper extends HttpServletResponseWrapper {

	private SimpleServletOutputStream wrappedOut;

	public BufferResponseWrapper(HttpServletResponse response) {
		super(response);
		wrappedOut = new SimpleServletOutputStream();
	}

	public ServletOutputStream getOutputStream() throws IOException {
		return wrappedOut;
	}

	private PrintWriter wrappedWriter;

	public PrintWriter getWriter() throws IOException {
		if (wrappedWriter == null) {
			String encoding = getCharacterEncoding();
			if (encoding != null) {
				wrappedWriter = new PrintWriter(new OutputStreamWriter(getOutputStream(), encoding));
			} else {
				wrappedWriter = new PrintWriter(new OutputStreamWriter(getOutputStream()));
			}
		}

		return wrappedWriter;
	}

	public byte[] getDatas() {
		return wrappedOut.getDatas();
	}

	public void flushBuffer() throws IOException {
		flush();
	}

	public void flush() throws IOException {
		if (wrappedWriter != null) {
			wrappedWriter.flush();
		}
		wrappedOut.flush();
	}
}
