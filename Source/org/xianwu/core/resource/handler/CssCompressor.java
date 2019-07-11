package org.xianwu.core.resource.handler;

import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * CssCompressor
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class CssCompressor {

	private StringBuffer srcsb = new StringBuffer();

	public CssCompressor(Reader in) throws IOException {
		// Read the stream...
		int c;
		while ((c = in.read()) != -1) {
			srcsb.append((char) c);
		}
	}

	public void compress(Writer out, int linebreakpos) throws IOException {

		Pattern p;
		Matcher m;
		String css;
		StringBuffer sb;
		int startIndex, endIndex;

		// Remove all comment blocks...
		sb = new StringBuffer(srcsb.toString());
		while ((startIndex = sb.indexOf("/*")) >= 0) {
			endIndex = sb.indexOf("*/", startIndex + 2);
			if (endIndex >= startIndex + 2)
				sb.delete(startIndex, endIndex + 2);
		}

		css = sb.toString();

		// Normalize all whitespace strings to single spaces. Easier to work
		// with that way.
		css = css.replaceAll("\\s+", " ");

		// Remove the spaces before the things that should not have spaces
		// before them.
		// But, be careful not to turn "p :link {...}" into "p:link{...}"
		// Swap out any pseudo-class colons with the token, and then swap back.
		sb = new StringBuffer();
		p = Pattern.compile("(^|\\})(([^\\{:])+:)+([^\\{]*\\{)");
		m = p.matcher(css);
		while (m.find()) {
			String s = m.group();
			s = s.replaceAll(":", "___PSEUDOCLASSCOLON___");
			m.appendReplacement(sb, s);
		}
		m.appendTail(sb);
		css = sb.toString();
		css = css.replaceAll("\\s+([!{};:>+\\(\\)\\],])", "$1");
		css = css.replaceAll("___PSEUDOCLASSCOLON___", ":");

		// Remove the spaces after the things that should not have spaces after
		// them.
		css = css.replaceAll("([!{}:;>+\\(\\[,])\\s+", "$1");

		// Add the semicolon where it's missing.
		css = css.replaceAll("([^;\\}])}", "$1;}");

		// Replace 0(px,em,%) with 0.
		css = css.replaceAll("([\\s:])(0)(px|em|%|in|cm|mm|pc|pt|ex)", "$1$2");

		// Replace 0 0 0 0; with 0.
		css = css.replaceAll(":0 0 0 0;", ":0;");
		css = css.replaceAll(":0 0 0;", ":0;");
		css = css.replaceAll(":0 0;", ":0;");
		// Replace background-position:0; with background-position:0 0;
		css = css.replaceAll("background-position:0;", "background-position:0 0;");

		// Replace 0.6 to .6, but only when preceded by : or a white-space
		css = css.replaceAll("(:|\\s)0+\\.(\\d+)", "$1.$2");

		// Shorten colors from rgb(51,102,153) to #336699
		// This makes it more likely that it'll get further compressed in the
		// next step.
		p = Pattern.compile("rgb\\s*\\(\\s*([0-9,\\s]+)\\s*\\)");
		m = p.matcher(css);
		sb = new StringBuffer();
		while (m.find()) {
			String[] rgbcolors = m.group(1).split(",");
			StringBuffer hexcolor = new StringBuffer("#");
			for (int i = 0; i < rgbcolors.length; i++) {
				int val = Integer.parseInt(rgbcolors[i]);
				if (val < 16) {
					hexcolor.append("0");
				}
				hexcolor.append(Integer.toHexString(val));
			}
			m.appendReplacement(sb, hexcolor.toString());
		}
		m.appendTail(sb);
		css = sb.toString();

		// Shorten colors from #AABBCC to #ABC. Note that we want to make sure
		// the color is not preceded by either ", " or =. Indeed, the property
		// filter: chroma(color="#FFFFFF");
		// would become
		// filter: chroma(color="#FFF");
		// which makes the filter break in IE.
		p = Pattern
				.compile("([^\"'=\\s])(\\s*)#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])");
		m = p.matcher(css);
		sb = new StringBuffer();
		while (m.find()) {
			// Test for AABBCC pattern
			if (m.group(3).equalsIgnoreCase(m.group(4)) && m.group(5).equalsIgnoreCase(m.group(6))
					&& m.group(7).equalsIgnoreCase(m.group(8))) {
				m.appendReplacement(sb, m.group(1) + m.group(2) + "#" + m.group(3) + m.group(5) + m.group(7));
			} else {
				m.appendReplacement(sb, m.group());
			}
		}
		m.appendTail(sb);
		css = sb.toString();

		// Remove empty rules.
		css = css.replaceAll("[^\\}]+\\{;\\}", "");

		if (linebreakpos >= 0) {
			// Some source control tools don't like it when files containing
			// lines longer
			// than, say 8000 characters, are checked in. The linebreak option
			// is used in
			// that case to split long lines after a specific column.
			int i = 0;
			int linestartpos = 0;
			sb = new StringBuffer(css);
			while (i < sb.length()) {
				char c = sb.charAt(i++);
				if (c == '}' && i - linestartpos > linebreakpos) {
					sb.insert(i, '\n');
					linestartpos = i;
				}
			}

			css = sb.toString();
		}

		// Trim the final string (for any leading or trailing white spaces)
		css = css.trim();

		// Write the output...
		out.write(css);
	}
}
