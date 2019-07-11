package org.xianwu.core.net.util;

import java.io.Serializable;
import java.util.Enumeration;
import java.util.EventListener;
import java.util.Vector;

/**
 * @author Daniel F. Savarese
 */

@SuppressWarnings("serial")
public class ListenerList implements Serializable {
	@SuppressWarnings("rawtypes")
	private Vector __listeners;

	@SuppressWarnings("rawtypes")
	public ListenerList() {
		__listeners = new Vector();
	}

	@SuppressWarnings("unchecked")
	public synchronized void addListener(EventListener listener) {
		__listeners.addElement(listener);
	}

	public synchronized void removeListener(EventListener listener) {
		__listeners.removeElement(listener);
	}

	@SuppressWarnings("rawtypes")
	public synchronized Enumeration getListeners() {
		return ((Vector) __listeners.clone()).elements();
	}

	public int getListenerCount() {
		return __listeners.size();
	}

}
