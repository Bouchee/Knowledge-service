package org.xianwu.core.net;

import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;

/***
 * The DatagramSocketFactory interface provides a means for the programmer to
 * control the creation of datagram sockets and provide his own DatagramSocket
 * implementations for use by all classes derived from
 * {@link org.apache.commons.net.DatagramSocketClient} . This allows you to
 * provide your own DatagramSocket implementations and to perform security
 * checks or browser capability requests before creating a DatagramSocket.
 * <p>
 * <p>
 * 
 * @author Daniel F. Savarese
 ***/

public interface DatagramSocketFactory {

	/***
	 * Creates a DatagramSocket on the local host at the first available port.
	 * <p>
	 * 
	 * @exception SocketException
	 *                If the socket could not be created.
	 ***/
	public DatagramSocket createDatagramSocket() throws SocketException;

	/***
	 * Creates a DatagramSocket on the local host at a specified port.
	 * <p>
	 * 
	 * @param port
	 *            The port to use for the socket.
	 * @exception SocketException
	 *                If the socket could not be created.
	 ***/
	public DatagramSocket createDatagramSocket(int port) throws SocketException;

	/***
	 * Creates a DatagramSocket at the specified address on the local host at a
	 * specified port.
	 * <p>
	 * 
	 * @param port
	 *            The port to use for the socket.
	 * @param laddr
	 *            The local address to use.
	 * @exception SocketException
	 *                If the socket could not be created.
	 ***/
	public DatagramSocket createDatagramSocket(int port, InetAddress laddr) throws SocketException;
}
