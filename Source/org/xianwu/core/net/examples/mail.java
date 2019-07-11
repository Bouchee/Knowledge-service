package org.xianwu.core.net.examples;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.Enumeration;
import java.util.Vector;

import org.xianwu.core.net.io.Util;
import org.xianwu.core.net.smtp.SMTPClient;
import org.xianwu.core.net.smtp.SMTPReply;
import org.xianwu.core.net.smtp.SimpleSMTPHeader;

/***
 * This is an example program using the SMTP package to send a message
 * to the specified recipients.  It prompts you for header information and
 * a filename containing the message.
 * <p>
 ***/

public final class mail
{

    @SuppressWarnings({ "rawtypes", "unchecked" })
	public final static void main(String[] args)
    {
        String sender, recipient, subject, filename, server, cc;
        Vector ccList = new Vector();
        BufferedReader stdin;
        FileReader fileReader = null;
        Writer writer;
        SimpleSMTPHeader header;
        SMTPClient client;
        Enumeration en;

        if (args.length < 1)
        {
            System.err.println("Usage: mail smtpserver");
            System.exit(1);
        }

        server = args[0];

        stdin = new BufferedReader(new InputStreamReader(System.in));

        try
        {
            System.out.print("From: ");
            System.out.flush();

            sender = stdin.readLine();

            System.out.print("To: ");
            System.out.flush();

            recipient = stdin.readLine();

            System.out.print("Subject: ");
            System.out.flush();

            subject = stdin.readLine();

            header = new SimpleSMTPHeader(sender, recipient, subject);


            while (true)
            {
                System.out.print("CC <enter one address per line, hit enter to end>: ");
                System.out.flush();

                // Of course you don't want to do this because readLine() may be null
                cc = stdin.readLine().trim();

                if (cc.length() == 0)
                    break;

                header.addCC(cc);
                ccList.addElement(cc);
            }

            System.out.print("Filename: ");
            System.out.flush();

            filename = stdin.readLine();

            try
            {
                fileReader = new FileReader(filename);
            }
            catch (FileNotFoundException e)
            {
                System.err.println("File not found. " + e.getMessage());
            }

            client = new SMTPClient();
            client.addProtocolCommandListener(new PrintCommandListener(
                                                  new PrintWriter(System.out)));

            client.connect(server);

            if (!SMTPReply.isPositiveCompletion(client.getReplyCode()))
            {
                client.disconnect();
                System.err.println("SMTP server refused connection.");
                System.exit(1);
            }

            client.login();

            client.setSender(sender);
            client.addRecipient(recipient);

            en = ccList.elements();

            while (en.hasMoreElements())
                client.addRecipient((String)en.nextElement());

            writer = client.sendMessageData();

            if (writer != null)
            {
                writer.write(header.toString());
                Util.copyReader(fileReader, writer);
                writer.close();
                client.completePendingCommand();
            }

            fileReader.close();

            client.logout();

            client.disconnect();
        }
        catch (IOException e)
        {
            e.printStackTrace();
            System.exit(1);
        }
    }
}


