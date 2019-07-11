package org.xianwu.core.net.telnet;

/***
 * Implements the telnet echo option RFC 857.
 * <p>
 * 
 * @author Bruno D'Avanzo
 ***/
public class EchoOptionHandler extends TelnetOptionHandler {
	/***
	 * Constructor for the EchoOptionHandler. Allows defining desired initial
	 * setting for local/remote activation of this option and behaviour in case
	 * a local/remote activation request for this option is received.
	 * <p>
	 * 
	 * @param initlocal
	 *            - if set to true, a WILL is sent upon connection.
	 * @param initremote
	 *            - if set to true, a DO is sent upon connection.
	 * @param acceptlocal
	 *            - if set to true, any DO request is accepted.
	 * @param acceptremote
	 *            - if set to true, any WILL request is accepted.
	 ***/
	public EchoOptionHandler(boolean initlocal, boolean initremote, boolean acceptlocal, boolean acceptremote) {
		super(TelnetOption.ECHO, initlocal, initremote, acceptlocal, acceptremote);
	}

	/***
	 * Constructor for the EchoOptionHandler. Initial and accept behaviour flags
	 * are set to false
	 ***/
	public EchoOptionHandler() {
		super(TelnetOption.ECHO, false, false, false, false);
	}

	/***
	 * Implements the abstract method of TelnetOptionHandler.
	 * <p>
	 * 
	 * @param suboptionData
	 *            - the sequence received, whithout IAC SB & IAC SE
	 * @param suboptionLength
	 *            - the length of data in suboption_data
	 *            <p>
	 * @return always null (no response to subnegotiation)
	 ***/
	public int[] answerSubnegotiation(int suboptionData[], int suboptionLength) {
		return null;
	}

	/***
	 * Implements the abstract method of TelnetOptionHandler.
	 * <p>
	 * 
	 * @return always null (no response to subnegotiation)
	 ***/
	public int[] startSubnegotiationLocal() {
		return null;
	}

	/***
	 * Implements the abstract method of TelnetOptionHandler.
	 * <p>
	 * 
	 * @return always null (no response to subnegotiation)
	 ***/
	public int[] startSubnegotiationRemote() {
		return null;
	}
}
