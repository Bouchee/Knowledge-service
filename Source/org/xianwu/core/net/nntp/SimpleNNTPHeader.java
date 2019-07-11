package org.xianwu.core.net.nntp;

/***
 * This class is used to construct the bare minimum acceptable header for most
 * news readers. To construct more complicated headers you should refer to RFC
 * 822. When the Java Mail API is finalized, you will be able to use it to
 * compose fully compliant Internet text messages.
 * <p>
 * The main purpose of the class is to faciliatate the article posting process,
 * by relieving the programmer from having to explicitly format an article
 * header. For example:
 * 
 * <pre>
 * writer = client.postArticle();
 * if (writer == null) // failure
 * 	return false;
 * header = new SimpleNNTPHeader(&quot;foobar@foo.com&quot;, &quot;Just testing&quot;);
 * header.addNewsgroup(&quot;alt.test&quot;);
 * header.addHeaderField(&quot;Organization&quot;, &quot;Foobar, Inc.&quot;);
 * writer.write(header.toString());
 * writer.write(&quot;This is just a test&quot;);
 * writer.close();
 * if (!client.completePendingCommand()) // failure
 * 	return false;
 * </pre>
 * <p>
 * <p>
 * 
 * @author Daniel F. Savarese
 * @see NNTPClient
 ***/

public class SimpleNNTPHeader {
	private String __subject, __from;
	private StringBuffer __newsgroups;
	private StringBuffer __headerFields;
	private int __newsgroupCount;

	/***
	 * Creates a new SimpleNNTPHeader instance initialized with the given from
	 * and subject header field values.
	 * <p>
	 * 
	 * @param from
	 *            The value of the <code>From:</code> header field. This should
	 *            be the article poster's email address.
	 * @param subject
	 *            The value of the <code>Subject:</code> header field. This
	 *            should be the subject of the article.
	 ***/
	public SimpleNNTPHeader(String from, String subject) {
		__from = from;
		__subject = subject;
		__newsgroups = new StringBuffer();
		__headerFields = new StringBuffer();
		__newsgroupCount = 0;
	}

	/***
	 * Adds a newsgroup to the article <code>Newsgroups:</code> field.
	 * <p>
	 * 
	 * @param newsgroup
	 *            The newsgroup to add to the article's newsgroup distribution
	 *            list.
	 ***/
	public void addNewsgroup(String newsgroup) {
		if (__newsgroupCount++ > 0)
			__newsgroups.append(',');
		__newsgroups.append(newsgroup);
	}

	/***
	 * Adds an arbitrary header field with the given value to the article
	 * header. These headers will be written after the From, Newsgroups, and
	 * Subject fields when the SimpleNNTPHeader is convertered to a string. An
	 * example use would be:
	 * 
	 * <pre>
	 * header.addHeaderField(&quot;Organization&quot;, &quot;Foobar, Inc.&quot;);
	 * </pre>
	 * <p>
	 * 
	 * @param headerField
	 *            The header field to add, not including the colon.
	 * @param value
	 *            The value of the added header field.
	 ***/
	public void addHeaderField(String headerField, String value) {
		__headerFields.append(headerField);
		__headerFields.append(": ");
		__headerFields.append(value);
		__headerFields.append('\n');
	}

	/***
	 * Returns the address used in the <code> From: </code> header field.
	 * <p>
	 * 
	 * @return The from address.
	 ***/
	public String getFromAddress() {
		return __from;
	}

	/***
	 * Returns the subject used in the <code> Subject: </code> header field.
	 * <p>
	 * 
	 * @return The subject.
	 ***/
	public String getSubject() {
		return __subject;
	}

	/***
	 * Returns the contents of the <code> Newsgroups: </code> header field.
	 * <p>
	 * 
	 * @return The comma-separated list of newsgroups to which the article is
	 *         being posted.
	 ***/
	public String getNewsgroups() {
		return __newsgroups.toString();
	}

	/***
	 * Converts the SimpleNNTPHeader to a properly formatted header in the form
	 * of a String, including the blank line used to separate the header from
	 * the article body.
	 * <p>
	 * 
	 * @return The article header in the form of a String.
	 ***/
	public String toString() {
		StringBuffer header = new StringBuffer();

		header.append("From: ");
		header.append(__from);
		header.append("\nNewsgroups: ");
		header.append(__newsgroups.toString());
		header.append("\nSubject: ");
		header.append(__subject);
		header.append('\n');
		if (__headerFields.length() > 0)
			header.append(__headerFields.toString());
		header.append('\n');

		return header.toString();
	}
}
