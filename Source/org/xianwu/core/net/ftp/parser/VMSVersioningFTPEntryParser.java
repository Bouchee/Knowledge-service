package org.xianwu.core.net.ftp.parser;

import java.util.HashMap;
import java.util.List;
import java.util.ListIterator;

import org.apache.oro.text.regex.MalformedPatternException;
import org.apache.oro.text.regex.MatchResult;
import org.apache.oro.text.regex.Pattern;
import org.apache.oro.text.regex.Perl5Compiler;
import org.apache.oro.text.regex.Perl5Matcher;
import org.xianwu.core.net.ftp.FTPClientConfig;

/**
 * Special implementation VMSFTPEntryParser with versioning turned on. This
 * parser removes all duplicates and only leaves the version with the highest
 * version number for each filename.
 * 
 * This is a sample of VMS LIST output
 * 
 * "1-JUN.LIS;1              9/9           2-JUN-1998 07:32:04  [GROUP,OWNER]    (RWED,RWED,RWED,RE)"
 * ,
 * "1-JUN.LIS;2              9/9           2-JUN-1998 07:32:04  [GROUP,OWNER]    (RWED,RWED,RWED,RE)"
 * ,
 * "DATA.DIR;1               1/9           2-JUN-1998 07:32:04  [GROUP,OWNER]    (RWED,RWED,RWED,RE)"
 * ,
 * <P>
 * 
 * @author <a href="Winston.Ojeda@qg.com">Winston Ojeda</a>
 * @author <a href="sestegra@free.fr">Stephane ESTE-GRACIAS</a>
 * @version $Id: VMSVersioningFTPEntryParser.java 155429 2005-02-26 13:13:04Z
 *          dirkv $
 * 
 * @see org.apache.commons.net.ftp.FTPFileEntryParser FTPFileEntryParser (for
 *      usage instructions)
 */
public class VMSVersioningFTPEntryParser extends VMSFTPEntryParser {

	private Perl5Matcher _preparse_matcher_;
	private Pattern _preparse_pattern_;
	private static final String PRE_PARSE_REGEX = "(.*);([0-9]+)\\s*.*";

	/**
	 * Constructor for a VMSFTPEntryParser object. Sets the versioning member to
	 * the supplied value.
	 * 
	 * @exception IllegalArgumentException
	 *                Thrown if the regular expression is unparseable. Should
	 *                not be seen under normal conditions. It it is seen, this
	 *                is a sign that <code>REGEX</code> is not a valid regular
	 *                expression.
	 */
	public VMSVersioningFTPEntryParser() {
		this(null);
	}

	/**
	 * This constructor allows the creation of a VMSVersioningFTPEntryParser
	 * object with something other than the default configuration.
	 * 
	 * @param config
	 *            The {@link FTPClientConfig configuration} object used to
	 *            configure this parser.
	 * @exception IllegalArgumentException
	 *                Thrown if the regular expression is unparseable. Should
	 *                not be seen under normal conditions. It it is seen, this
	 *                is a sign that <code>REGEX</code> is not a valid regular
	 *                expression.
	 * @since 1.4
	 */
	public VMSVersioningFTPEntryParser(FTPClientConfig config) {
		super();
		configure(config);
		try {
			_preparse_matcher_ = new Perl5Matcher();
			_preparse_pattern_ = new Perl5Compiler().compile(PRE_PARSE_REGEX);
		} catch (MalformedPatternException e) {
			throw new IllegalArgumentException("Unparseable regex supplied:  " + PRE_PARSE_REGEX);
		}

	}

	private class NameVersion {
		@SuppressWarnings("unused")
		String name;
		int versionNumber;

		NameVersion(String name, String vers) {
			this.name = name;
			this.versionNumber = Integer.parseInt(vers);
		}
	}

	/**
	 * Implement hook provided for those implementers (such as
	 * VMSVersioningFTPEntryParser, and possibly others) which return multiple
	 * files with the same name to remove the duplicates ..
	 * 
	 * @param original
	 *            Original list
	 * 
	 * @return Original list purged of duplicates
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List preParse(List original) {
		original = super.preParse(original);
		HashMap existingEntries = new HashMap();
		ListIterator iter = original.listIterator();
		while (iter.hasNext()) {
			String entry = ((String) iter.next()).trim();
			MatchResult result = null;
			if (_preparse_matcher_.matches(entry, _preparse_pattern_)) {
				result = _preparse_matcher_.getMatch();
				String name = result.group(1);
				String version = result.group(2);
				NameVersion nv = new NameVersion(name, version);
				NameVersion existing = (NameVersion) existingEntries.get(name);
				if (null != existing) {
					if (nv.versionNumber < existing.versionNumber) {
						iter.remove(); // removal removes from original list.
						continue;
					}
				}
				existingEntries.put(name, nv);
			}

		}
		// we've now removed all entries less than with less than the largest
		// version number for each name that were listed after the largest.
		// we now must remove those with smaller than the largest version number
		// for each name that were found before the largest
		while (iter.hasPrevious()) {
			String entry = ((String) iter.previous()).trim();
			MatchResult result = null;
			if (_preparse_matcher_.matches(entry, _preparse_pattern_)) {
				result = _preparse_matcher_.getMatch();
				String name = result.group(1);
				String version = result.group(2);
				NameVersion nv = new NameVersion(name, version);
				NameVersion existing = (NameVersion) existingEntries.get(name);
				if (null != existing) {
					if (nv.versionNumber < existing.versionNumber) {
						iter.remove(); // removal removes from original list.
					}
				}
			}

		}
		return original;
	}

	protected boolean isVersioning() {
		return true;
	}

}

/*
 * Emacs configuration Local variables: ** mode: java ** c-basic-offset: 4 **
 * indent-tabs-mode: nil ** End: **
 */
