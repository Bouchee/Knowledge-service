package org.xianwu.core.net.examples;

import java.io.IOException;
import java.net.InetAddress;

import org.xianwu.core.net.TimeTCPClient;
import org.xianwu.core.net.TimeUDPClient;

/***
 * This is an example program demonstrating how to use the TimeTCPClient
 * and TimeUDPClient classes.  It's very similar to the simple Unix rdate
 * command.  This program connects to the default time service port of a
 * specified server, retrieves the time, and prints it to standard output.
 * The default is to use the TCP port.  Use the -udp flag to use the UDP
 * port.  You can test this program by using the NIST time server at
 * 132.163.135.130 (warning: the IP address may change).
 * <p>
 * Usage: rdate [-udp] <hostname>
 * <p>
 * <p>
 * @author Daniel F. Savarese
 ***/
public final class rdate
{

    public static final void timeTCP(String host) throws IOException
    {
        TimeTCPClient client = new TimeTCPClient();

        // We want to timeout if a response takes longer than 60 seconds
        client.setDefaultTimeout(60000);
        client.connect(host);
        System.out.println(client.getDate().toString());
        client.disconnect();
    }

    public static final void timeUDP(String host) throws IOException
    {
        TimeUDPClient client = new TimeUDPClient();

        // We want to timeout if a response takes longer than 60 seconds
        client.setDefaultTimeout(60000);
        client.open();
        System.out.println(client.getDate(InetAddress.getByName(host)).toString());
        client.close();
    }


    public static final void main(String[] args)
    {

        if (args.length == 1)
        {
            try
            {
                timeTCP(args[0]);
            }
            catch (IOException e)
            {
                e.printStackTrace();
                System.exit(1);
            }
        }
        else if (args.length == 2 && args[0].equals("-udp"))
        {
            try
            {
                timeUDP(args[1]);
            }
            catch (IOException e)
            {
                e.printStackTrace();
                System.exit(1);
            }
        }
        else
        {
            System.err.println("Usage: rdate [-udp] <hostname>");
            System.exit(1);
        }

    }

}

