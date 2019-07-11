package org.xianwu.core.web.report.jasper.applet;

import javax.swing.JButton;
import javax.swing.JOptionPane;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.view.JRViewer;

/**
 * JRViewerSimple
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class JRViewerSimple extends JRViewer {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3254581335044204925L;
	protected JButton btnPlus = new javax.swing.JButton();

	public JRViewerSimple(JasperPrint jrPrint) throws JRException {
		super(jrPrint);

		tlbToolBar.remove(btnSave);
		tlbToolBar.remove(btnReload);

		btnPlus = new javax.swing.JButton();
		btnPlus.setToolTipText("关于");
		btnPlus.setIcon(new javax.swing.ImageIcon(getClass().getResource(
				"/org/xianwu/core/web/report/jasper/applet/image/about.gif")));
		btnPlus.setMargin(new java.awt.Insets(2, 2, 2, 2));
		btnPlus.setMaximumSize(new java.awt.Dimension(23, 23));
		btnPlus.setMinimumSize(new java.awt.Dimension(23, 23));
		btnPlus.setPreferredSize(new java.awt.Dimension(23, 23));
		btnPlus.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(java.awt.event.ActionEvent evt) {
				btnPlusActionPerformed(evt);
			}
		});
		tlbToolBar.add(btnPlus, 0);
	}

	protected void btnPlusActionPerformed(java.awt.event.ActionEvent evt) {
		JOptionPane.showMessageDialog(this, "报表由星夜回缘(bluefuxianwu@hotmail.com)制作,感谢您的使用!");
	}

}
