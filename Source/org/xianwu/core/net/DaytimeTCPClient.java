package org.xianwu.core.net;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/***
 * The DaytimeTCPClient class is a TCP implementation of a client for the
 * Daytime protocol described in RFC 867. To use the class, merely establish a
 * connection with {@link org.apache.commons.net.SocketClient#connect connect }
 * and call {@link #getTime getTime() } to retrieve the daytime string, then
 * call {@link org.apache.commons.net.SocketClient#disconnect disconnect } to
 * close the connection properly.
 * <p>
 * <p>
 * 
 * @author Daniel F. Savarese
 * @see DaytimeUDPClient
 ***/

public final class DaytimeTCPClient extends SocketClient {
	/*** The default daytime port. It is set to 13 according to RFC 867. ***/
	public static final int DEFAULT_PORT = 13;

	// Received dates will likely be less than 64 characters.
	// This is a temporary buffer used while receiving data.
	private char[] __buffer = new char[64];

	/***
	 * The default DaytimeTCPClient constructor. It merely sets the default port
	 * to <code> DEFAULT_PORT </code>.
	 ***/
	public DaytimeTCPClient() {
		setDefaultPort(DEFAULT_PORT);
	}

	/***
	 * Retrieves the time string from the server and returns it. The server will
	 * have closed the connection at this point, so you should call
	 * {@link org.apache.commons.net.SocketClient#disconnect disconnect } after
	 * calling this method. To retrieve another time, you must initiate another
	 * connection with {@link org.apache.commons.net.SocketClient#connect
	 * connect } before calling <code> getTime() </code> again.
	 * <p>
	 * 
	 * @return The time string retrieved from the server.
	 * @exception IOException
	 *                If an error occurs while fetching the time string.
	 ***/
	public String getTime() throws IOException {
		int read;
		StringBuffer result = new StringBuffer(__buffer.length);
		BufferedReader reader;

		reader = new BufferedReader(new InputStreamReader(_input_));

		while (true) {
			read = reader.read(__buffer, 0, __buffer.length);
			if (read <= 0)
				break;
			result.append(__buffer, 0, read);
		}

		return result.toString();
	}

}
