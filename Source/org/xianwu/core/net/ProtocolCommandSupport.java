package org.xianwu.core.net;

import java.io.Serializable;
import java.util.Enumeration;

import org.xianwu.core.net.util.ListenerList;

/***
 * ProtocolCommandSupport is a convenience class for managing a list of
 * ProtocolCommandListeners and firing ProtocolCommandEvents. You can simply
 * delegate ProtocolCommandEvent firing and listener registering/unregistering
 * tasks to this class.
 * <p>
 * <p>
 * 
 * @see ProtocolCommandEvent
 * @see ProtocolCommandListener
 * @author Daniel F. Savarese
 ***/

@SuppressWarnings("serial")
public class ProtocolCommandSupport implements Serializable {
	private Object __source;
	private ListenerList __listeners;

	/***
	 * Creates a ProtocolCommandSupport instant using the indicated source as
	 * the source of fired ProtocolCommandEvents.
	 * <p>
	 * 
	 * @param source
	 *            The source to use for all generated ProtocolCommandEvents.
	 ***/
	public ProtocolCommandSupport(Object source) {
		__listeners = new ListenerList();
		__source = source;
	}

	/***
	 * Fires a ProtocolCommandEvent signalling the sending of a command to all
	 * registered listeners, invoking their
	 * {@link org.apache.commons.net.ProtocolCommandListener#protocolCommandSent
	 * protocolCommandSent() } methods.
	 * <p>
	 * 
	 * @param command
	 *            The string representation of the command type sent, not
	 *            including the arguments (e.g., "STAT" or "GET").
	 * @param message
	 *            The entire command string verbatim as sent to the server,
	 *            including all arguments.
	 ***/
	@SuppressWarnings("rawtypes")
	public void fireCommandSent(String command, String message) {
		Enumeration en;
		ProtocolCommandEvent event;
		ProtocolCommandListener listener;

		en = __listeners.getListeners();

		event = new ProtocolCommandEvent(__source, command, message);

		while (en.hasMoreElements()) {
			listener = (ProtocolCommandListener) en.nextElement();
			listener.protocolCommandSent(event);
		}
	}

	/***
	 * Fires a ProtocolCommandEvent signalling the reception of a command reply
	 * to all registered listeners, invoking their
	 * {@link org.apache.commons.net.ProtocolCommandListener#protocolReplyReceived
	 * protocolReplyReceived() } methods.
	 * <p>
	 * 
	 * @param replyCode
	 *            The integer code indicating the natureof the reply. This will
	 *            be the protocol integer value for protocols that use integer
	 *            reply codes, or the reply class constant corresponding to the
	 *            reply for protocols like POP3 that use strings like OK rather
	 *            than integer codes (i.e., POP3Repy.OK).
	 * @param message
	 *            The entire reply as received from the server.
	 ***/
	@SuppressWarnings("rawtypes")
	public void fireReplyReceived(int replyCode, String message) {
		Enumeration en;
		ProtocolCommandEvent event;
		ProtocolCommandListener listener;

		en = __listeners.getListeners();

		event = new ProtocolCommandEvent(__source, replyCode, message);

		while (en.hasMoreElements()) {
			listener = (ProtocolCommandListener) en.nextElement();
			listener.protocolReplyReceived(event);
		}
	}

	/***
	 * Adds a ProtocolCommandListener.
	 * <p>
	 * 
	 * @param listener
	 *            The ProtocolCommandListener to add.
	 ***/
	public void addProtocolCommandListener(ProtocolCommandListener listener) {
		__listeners.addListener(listener);
	}

	/***
	 * Removes a ProtocolCommandListener.
	 * <p>
	 * 
	 * @param listener
	 *            The ProtocolCommandListener to remove.
	 ***/
	public void removeProtocolCommandListener(ProtocolCommandListener listener) {
		__listeners.removeListener(listener);
	}

	/***
	 * Returns the number of ProtocolCommandListeners currently registered.
	 * <p>
	 * 
	 * @return The number of ProtocolCommandListeners currently registered.
	 ***/
	public int getListenerCount() {
		return __listeners.getListenerCount();
	}

}
