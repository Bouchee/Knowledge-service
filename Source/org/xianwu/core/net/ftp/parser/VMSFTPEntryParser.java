package org.xianwu.core.net.ftp.parser;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.util.StringTokenizer;

import org.xianwu.core.net.ftp.FTPClientConfig;
import org.xianwu.core.net.ftp.FTPFile;
import org.xianwu.core.net.ftp.FTPListParseEngine;

/**
 * Implementation FTPFileEntryParser and FTPFileListParser for VMS Systems.
 * This is a sample of VMS LIST output
 *
 *  "1-JUN.LIS;1              9/9           2-JUN-1998 07:32:04  [GROUP,OWNER]    (RWED,RWED,RWED,RE)",
 *  "1-JUN.LIS;2              9/9           2-JUN-1998 07:32:04  [GROUP,OWNER]    (RWED,RWED,RWED,RE)",
 *  "DATA.DIR;1               1/9           2-JUN-1998 07:32:04  [GROUP,OWNER]    (RWED,RWED,RWED,RE)",
 * <P><B>
 * Note: VMSFTPEntryParser can only be instantiated through the
 * DefaultFTPParserFactory by classname.  It will not be chosen
 * by the autodetection scheme.
 * </B>
 * <P>
 *
 * @author  <a href="Winston.Ojeda@qg.com">Winston Ojeda</a>
 * @author <a href="mailto:scohen@apache.org">Steve Cohen</a>
 * @author <a href="sestegra@free.fr">Stephane ESTE-GRACIAS</a>
 * @version $Id: VMSFTPEntryParser.java 155429 2005-02-26 13:13:04Z dirkv $
 *
 * @see org.apache.commons.net.ftp.FTPFileEntryParser FTPFileEntryParser (for usage instructions)
 * @see org.apache.commons.net.ftp.parser.DefaultFTPFileEntryParserFactory
 */
public class VMSFTPEntryParser extends ConfigurableFTPFileEntryParserImpl
{

    private static final String DEFAULT_DATE_FORMAT 
		= "d-MMM-yyyy HH:mm:ss"; //9-NOV-2001 12:30:24

    /**
     * this is the regular expression used by this parser.
     */
    private static final String REGEX =
        "(.*;[0-9]+)\\s*"
        + "(\\d+)/\\d+\\s*"
        +"(\\S+)\\s+(\\S+)\\s+"
        + "\\[(([0-9$A-Za-z_]+)|([0-9$A-Za-z_]+),([0-9$a-zA-Z_]+))\\]?\\s*"
        + "\\([a-zA-Z]*,[a-zA-Z]*,[a-zA-Z]*,[a-zA-Z]*\\)";



    /**
     * Constructor for a VMSFTPEntryParser object.
     *
     * @exception IllegalArgumentException
     * Thrown if the regular expression is unparseable.  Should not be seen
     * under normal conditions.  It it is seen, this is a sign that
     * <code>REGEX</code> is  not a valid regular expression.
     */
    public VMSFTPEntryParser()
    {
        this(null);
    }

    /**
     * This constructor allows the creation of a VMSFTPEntryParser object with
     * something other than the default configuration.
     *
     * @param config The {@link FTPClientConfig configuration} object used to 
     * configure this parser.
     * @exception IllegalArgumentException
     * Thrown if the regular expression is unparseable.  Should not be seen
     * under normal conditions.  It it is seen, this is a sign that
     * <code>REGEX</code> is  not a valid regular expression.
     * @since 1.4
     */
    public VMSFTPEntryParser(FTPClientConfig config)
    {
        super(REGEX);
        configure(config);
    }



    /***
     * Parses an FTP server file listing and converts it into a usable format
     * in the form of an array of <code> FTPFile </code> instances.  If the
     * file list contains no files, <code> null </code> should be
     * returned, otherwise an array of <code> FTPFile </code> instances
     * representing the files in the directory is returned.
     * <p>
     * @param listStream The InputStream from which the file list should be
     *        read.
     * @return The list of file information contained in the given path.  null
     *     if the list could not be obtained or if there are no files in
     *     the directory.
     * @exception IOException  If an I/O error occurs reading the listStream.
     ***/
    @SuppressWarnings("deprecation")
	public FTPFile[] parseFileList(InputStream listStream) throws IOException {
        FTPListParseEngine engine = new FTPListParseEngine(this);
        engine.readServerList(listStream);
        return engine.getFiles();
    }



    /**
     * Parses a line of a VMS FTP server file listing and converts it into a
     * usable format in the form of an <code> FTPFile </code> instance.  If the
     * file listing line doesn't describe a file, <code> null </code> is
     * returned, otherwise a <code> FTPFile </code> instance representing the
     * files in the directory is returned.
     * <p>
     * @param entry A line of text from the file listing
     * @return An FTPFile instance corresponding to the supplied entry
     */
    public FTPFile parseFTPEntry(String entry)
    {
        //one block in VMS equals 512 bytes
        long longBlock = 512;

        if (matches(entry))
        {
            FTPFile f = new FTPFile();
            f.setRawListing(entry);
            String name = group(1);
            String size = group(2);
        	String datestr = group(3)+" "+group(4);
            String owner = group(5);
            try
            {
                f.setTimestamp(super.parseTimestamp(datestr));
            }
            catch (ParseException e)
            {
            	return null;  // this is a parsing failure too.
            }


            String grp;
            String user;
            StringTokenizer t = new StringTokenizer(owner, ",");
            switch (t.countTokens()) {
                case 1:
                    grp  = null;
                    user = t.nextToken();
                    break;
                case 2:
                    grp  = t.nextToken();
                    user = t.nextToken();
                    break;
                default:
                    grp  = null;
                    user = null;
            }

            if (name.lastIndexOf(".DIR") != -1)
            {
                f.setType(FTPFile.DIRECTORY_TYPE);
            }
            else
            {
                f.setType(FTPFile.FILE_TYPE);
            }
            //set FTPFile name
            //Check also for versions to be returned or not
            if (isVersioning())
            {
                f.setName(name);
            }
            else
            {
                name = name.substring(0, name.lastIndexOf(";"));
                f.setName(name);
            }
            //size is retreived in blocks and needs to be put in bytes
            //for us humans and added to the FTPFile array
            long sizeInBytes = Long.parseLong(size) * longBlock;
            f.setSize(sizeInBytes);

            f.setGroup(grp);
            f.setUser(user);
            //set group and owner
            //Since I don't need the persmissions on this file (RWED), I'll
            //leave that for further development. 'Cause it will be a bit
            //elaborate to do it right with VMSes World, Global and so forth.
            return f;
        }
        return null;
    }


    /**
     * Reads the next entry using the supplied BufferedReader object up to
     * whatever delemits one entry from the next.   This parser cannot use
     * the default implementation of simply calling BufferedReader.readLine(),
     * because one entry may span multiple lines.
     *
     * @param reader The BufferedReader object from which entries are to be
     * read.
     *
     * @return A string representing the next ftp entry or null if none found.
     * @exception IOException thrown on any IO Error reading from the reader.
     */
    public String readNextEntry(BufferedReader reader) throws IOException
    {
        String line = reader.readLine();
        StringBuffer entry = new StringBuffer();
        while (line != null)
        {
            if (line.startsWith("Directory") || line.startsWith("Total")) {
                line = reader.readLine();
                continue;
            }

            entry.append(line);
            if (line.trim().endsWith(")"))
            {
                break;
            }
            line = reader.readLine();
        }
        return (entry.length() == 0 ? null : entry.toString());
    }

    protected boolean isVersioning() {
        return false;
    }
    
    /**
     * Defines a default configuration to be used when this class is
     * instantiated without a {@link  FTPClientConfig  FTPClientConfig}
     * parameter being specified.
     * @return the default configuration for this parser.
     */
   protected FTPClientConfig getDefaultConfiguration() {
        return new FTPClientConfig(
                FTPClientConfig.SYST_VMS,
                DEFAULT_DATE_FORMAT,
                null, null, null, null);
    }


}

/* Emacs configuration
 * Local variables:        **
 * mode:             java  **
 * c-basic-offset:   4     **
 * indent-tabs-mode: nil   **
 * End:                    **
 */
