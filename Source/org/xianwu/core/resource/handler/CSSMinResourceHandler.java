package org.xianwu.core.resource.handler;

import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;
import java.io.StringWriter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xianwu.core.resource.HandleResourceException;
import org.xianwu.core.resource.HttpHolder;
import org.xianwu.core.resource.Resource;
import org.xianwu.core.resource.ResourceHandler;

/**
 * CSSMinResourceHandler
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class CSSMinResourceHandler implements ResourceHandler {
	
	private final Log logger = LogFactory.getLog( this.getClass() );
	private static final int LINEBREAK_AFTER_CHARACTERS = 8000;
	public void handle(Resource pResource) throws HandleResourceException {	
		String charset = pResource.getCharset();
		if ( charset == null ){
			charset = HttpHolder.getResponse().getCharacterEncoding();
		}
		logger.info("正在对资源:" + pResource.getUri() + "进行css min压缩...");
		try{
		  InputStreamReader isr = new InputStreamReader(new ByteArrayInputStream(pResource.getTreatedData()), charset);
		  CssCompressor cssc = new CssCompressor(isr);
		  StringWriter sw = new StringWriter();
		  cssc.compress(sw, LINEBREAK_AFTER_CHARACTERS);
		  sw.flush();
          sw.toString();
          sw.close();
          logger.info("css min资源:" + pResource.getUri() + "成功." );
		}catch (Exception ex){
			final String MSG = "css min资源:" + pResource.getUri() + "失败！"; 
			logger.warn(MSG ,ex);
			return; 
			
		}
		
	}

}
