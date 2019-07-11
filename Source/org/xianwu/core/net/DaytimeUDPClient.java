package org.xianwu.core.net;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.InetAddress;

/***
 * The DaytimeUDPClient class is a UDP implementation of a client for the
 * Daytime protocol described in RFC 867. To use the class, merely open a local
 * datagram socket with {@link org.apache.commons.net.DatagramSocketClient#open
 * open } and call {@link #getTime getTime } to retrieve the daytime string,
 * then call {@link org.apache.commons.net.DatagramSocketClient#close close } to
 * close the connection properly. Unlike
 * {@link org.apache.commons.net.DaytimeTCPClient}, successive calls to
 * {@link #getTime getTime } are permitted without re-establishing a connection.
 * That is because UDP is a connectionless protocol and the Daytime protocol is
 * stateless.
 * <p>
 * <p>
 * 
 * @author Daniel F. Savarese
 * @see DaytimeTCPClient
 ***/

public final class DaytimeUDPClient extends DatagramSocketClient {
	/*** The default daytime port. It is set to 13 according to RFC 867. ***/
	public static final int DEFAULT_PORT = 13;

	private byte[] __dummyData = new byte[1];
	// Received dates should be less than 256 bytes
	private byte[] __timeData = new byte[256];

	/***
	 * Retrieves the time string from the specified server and port and returns
	 * it.
	 * <p>
	 * 
	 * @param host
	 *            The address of the server.
	 * @param port
	 *            The port of the service.
	 * @return The time string.
	 * @exception IOException
	 *                If an error occurs while retrieving the time.
	 ***/
	public String getTime(InetAddress host, int port) throws IOException {
		DatagramPacket sendPacket, receivePacket;

		sendPacket = new DatagramPacket(__dummyData, __dummyData.length, host, port);
		receivePacket = new DatagramPacket(__timeData, __timeData.length);

		_socket_.send(sendPacket);
		_socket_.receive(receivePacket);

		return new String(receivePacket.getData(), 0, receivePacket.getLength());
	}

	/*** Same as <code>getTime(host, DaytimeUDPClient.DEFAULT_PORT);</code> ***/
	public String getTime(InetAddress host) throws IOException {
		return getTime(host, DEFAULT_PORT);
	}

}
