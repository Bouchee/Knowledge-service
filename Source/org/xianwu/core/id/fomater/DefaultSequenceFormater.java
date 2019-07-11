package org.xianwu.core.id.fomater;

import java.text.DecimalFormat;

import org.xianwu.core.id.FormatSequenceExcepiton;
import org.xianwu.core.id.SequenceFormater;

/**
 * DefaultSequenceFormater
 * 此代码源于开源项目E3
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see SequenceFormater
 */
public class DefaultSequenceFormater implements SequenceFormater {

	private String pattern;

	public String format(long pSequence) throws FormatSequenceExcepiton {
		DecimalFormat df = new DecimalFormat(pattern);
		return df.format(pSequence);
	}

	public String getPattern() {
		return pattern;
	}

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

}
