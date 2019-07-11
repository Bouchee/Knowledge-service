package org.xianwu.core.net.telnet;

/***
 * Implements the telnet terminal type option RFC 1091.
 * <p>
 * 
 * @author Bruno D'Avanzo
 ***/
public class TerminalTypeOptionHandler extends TelnetOptionHandler {
	/***
	 * Terminal type
	 ***/
	private String termType = null;

	/***
	 * Terminal type option
	 ***/
	protected static final int TERMINAL_TYPE = 24;

	/***
	 * Send (for subnegotiation)
	 ***/
	protected static final int TERMINAL_TYPE_SEND = 1;

	/***
	 * Is (for subnegotiation)
	 ***/
	protected static final int TERMINAL_TYPE_IS = 0;

	/***
	 * Constructor for the TerminalTypeOptionHandler. Allows defining desired
	 * initial setting for local/remote activation of this option and behaviour
	 * in case a local/remote activation request for this option is received.
	 * <p>
	 * 
	 * @param termtype
	 *            - terminal type that will be negotiated.
	 * @param initlocal
	 *            - if set to true, a WILL is sent upon connection.
	 * @param initremote
	 *            - if set to true, a DO is sent upon connection.
	 * @param acceptlocal
	 *            - if set to true, any DO request is accepted.
	 * @param acceptremote
	 *            - if set to true, any WILL request is accepted.
	 ***/
	public TerminalTypeOptionHandler(String termtype, boolean initlocal, boolean initremote, boolean acceptlocal,
			boolean acceptremote) {
		super(TelnetOption.TERMINAL_TYPE, initlocal, initremote, acceptlocal, acceptremote);
		termType = termtype;
	}

	/***
	 * Constructor for the TerminalTypeOptionHandler. Initial and accept
	 * behaviour flags are set to false
	 * <p>
	 * 
	 * @param termtype
	 *            - terminal type that will be negotiated.
	 ***/
	public TerminalTypeOptionHandler(String termtype) {
		super(TelnetOption.TERMINAL_TYPE, false, false, false, false);
		termType = termtype;
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
	 * @return terminal type information
	 ***/
	public int[] answerSubnegotiation(int suboptionData[], int suboptionLength) {
		if ((suboptionData != null) && (suboptionLength > 1) && (termType != null)) {
			if ((suboptionData[0] == TERMINAL_TYPE) && (suboptionData[1] == TERMINAL_TYPE_SEND)) {
				int response[] = new int[termType.length() + 2];

				response[0] = TERMINAL_TYPE;
				response[1] = TERMINAL_TYPE_IS;

				for (int ii = 0; ii < termType.length(); ii++) {
					response[ii + 2] = (int) termType.charAt(ii);
				}

				return response;
			}
		}
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
