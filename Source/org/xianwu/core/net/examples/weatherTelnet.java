package org.xianwu.core.net.examples;

import java.io.IOException;

import org.xianwu.core.net.telnet.TelnetClient;

/***
 * This is an example of a trivial use of the TelnetClient class.
 * It connects to the weather server at the University of Michigan,
 * um-weather.sprl.umich.edu port 3000, and allows the user to interact
 * with the server via standard input.  You could use this example to
 * connect to any telnet server, but it is obviously not general purpose
 * because it reads from standard input a line at a time, making it
 * inconvenient for use with a remote interactive shell.  The TelnetClient
 * class used by itself is mostly intended for automating access to telnet
 * resources rather than interactive use.
 * <p>
 ***/

// This class requires the IOUtil support class!
public final class weatherTelnet
{

    public final static void main(String[] args)
    {
        TelnetClient telnet;

        telnet = new TelnetClient();

        try
        {
            telnet.connect("rainmaker.wunderground.com", 3000);
        }
        catch (IOException e)
        {
            e.printStackTrace();
            System.exit(1);
        }

        IOUtil.readWrite(telnet.getInputStream(), telnet.getOutputStream(),
                         System.in, System.out);

        try
        {
            telnet.disconnect();
        }
        catch (IOException e)
        {
            e.printStackTrace();
            System.exit(1);
        }

        System.exit(0);
    }

}


