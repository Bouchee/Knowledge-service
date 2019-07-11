package org.xianwu.core.id.prefix;

import org.xianwu.core.id.CreatePrefixException;
import org.xianwu.core.id.PrefixGenerator;

/**
 * DefaultPrefixGenerator
 * 此代码源于开源项目E3
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see PrefixGenerator
 */
public class DefaultPrefixGenerator implements PrefixGenerator {

	/**
	 * 前缀值
	 */
	private String prefix = "";

	/**
	 * 是否附带日期
	 */
	private boolean withDate = false;
	/**
	 * 日期格式
	 */
	private String pattern = "yyyyMMdd";

	public String create() throws CreatePrefixException {
		StringBuffer sb = new StringBuffer();
		sb.append(prefix);
		if (this.withDate) {
			sb.append(getFormatedDate());
		}
		return sb.toString();
	}

	private String getFormatedDate() {
		java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat(
				this.pattern);
		java.util.Date now = new java.util.Date();
		return sdf.format(now);
	}

	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public boolean isWithDate() {
		return withDate;
	}

	public void setWithDate(boolean withDate) {
		this.withDate = withDate;
	}

	public String getPattern() {
		return pattern;
	}

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

}
