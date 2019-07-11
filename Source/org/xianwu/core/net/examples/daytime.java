package org.xianwu.core.net.examples;

import java.io.IOException;
import java.net.InetAddress;

import org.xianwu.core.net.DaytimeTCPClient;
import org.xianwu.core.net.DaytimeUDPClient;

/***
 * This is an example program demonstrating how to use the DaytimeTCP
 * and DaytimeUDP classes.
 * This program connects to the default daytime service port of a
 * specified server, retrieves the daytime, and prints it to standard output.
 * The default is to use the TCP port.  Use the -udp flag to use the UDP
 * port.
 * <p>
 * Usage: daytime [-udp] <hostname>
 * <p>
 ***/
public final class daytime
{

    public static final void daytimeTCP(String host) throws IOException
    {
        DaytimeTCPClient client = new DaytimeTCPClient();

        // We want to timeout if a response takes longer than 60 seconds
        client.setDefaultTimeout(60000);
        client.connect(host);
        System.out.println(client.getTime().trim());
        client.disconnect();
    }

    public static final void daytimeUDP(String host) throws IOException
    {
        DaytimeUDPClient client = new DaytimeUDPClient();

        // We want to timeout if a response takes longer than 60 seconds
        client.setDefaultTimeout(60000);
        client.open();
        System.out.println(client.getTime(
                                          InetAddress.getByName(host)).trim());
        client.close();
    }


    public static final void main(String[] args)
    {

        if (args.length == 1)
        {
            try
            {
                daytimeTCP(args[0]);
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
                daytimeUDP(args[1]);
            }
            catch (IOException e)
            {
                e.printStackTrace();
                System.exit(1);
            }
        }
        else
        {
            System.err.println("Usage: daytime [-udp] <hostname>");
            System.exit(1);
        }

    }

}

