package org.xianwu.core.orm.xibatis.sqlmap.engine.mapping.sql.dynamic.elements;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.xianwu.core.orm.xibatis.sqlmap.engine.mapping.sql.SqlChild;

public class SqlTag implements SqlChild, DynamicParent {

	private String name;
	private SqlTagHandler handler;

	// general attributes
	private String prependAttr;
	private String propertyAttr;
	private String removeFirstPrepend;

	// conditional attributes
	private String comparePropertyAttr;
	private String compareValueAttr;

	// iterate attributes
	private String openAttr;
	private String closeAttr;
	private String conjunctionAttr;

	private SqlTag parent;
	@SuppressWarnings("rawtypes")
	private List children = new ArrayList();

	private boolean postParseRequired = false;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public SqlTagHandler getHandler() {
		return handler;
	}

	public void setHandler(SqlTagHandler handler) {
		this.handler = handler;
	}

	public boolean isPrependAvailable() {
		return prependAttr != null && prependAttr.length() > 0;
	}

	public boolean isCloseAvailable() {
		return closeAttr != null && closeAttr.length() > 0;
	}

	public boolean isOpenAvailable() {
		return openAttr != null && openAttr.length() > 0;
	}

	public boolean isConjunctionAvailable() {
		return conjunctionAttr != null && conjunctionAttr.length() > 0;
	}

	public String getPrependAttr() {
		return prependAttr;
	}

	public void setPrependAttr(String prependAttr) {
		this.prependAttr = prependAttr;
	}

	public String getPropertyAttr() {
		return propertyAttr;
	}

	public void setPropertyAttr(String propertyAttr) {
		this.propertyAttr = propertyAttr;
	}

	public String getComparePropertyAttr() {
		return comparePropertyAttr;
	}

	public void setComparePropertyAttr(String comparePropertyAttr) {
		this.comparePropertyAttr = comparePropertyAttr;
	}

	public String getCompareValueAttr() {
		return compareValueAttr;
	}

	public void setCompareValueAttr(String compareValueAttr) {
		this.compareValueAttr = compareValueAttr;
	}

	public String getOpenAttr() {
		return openAttr;
	}

	public void setOpenAttr(String openAttr) {
		this.openAttr = openAttr;
	}

	public String getCloseAttr() {
		return closeAttr;
	}

	public void setCloseAttr(String closeAttr) {
		this.closeAttr = closeAttr;
	}

	public String getConjunctionAttr() {
		return conjunctionAttr;
	}

	public void setConjunctionAttr(String conjunctionAttr) {
		this.conjunctionAttr = conjunctionAttr;
	}

	@SuppressWarnings("unchecked")
	public void addChild(SqlChild child) {
		if (child instanceof SqlTag) {
			((SqlTag) child).parent = this;
		}
		children.add(child);
	}

	@SuppressWarnings("rawtypes")
	public Iterator getChildren() {
		return children.iterator();
	}

	public SqlTag getParent() {
		return parent;
	}

	public String getRemoveFirstPrepend() {
		return removeFirstPrepend;
	}

	public void setRemoveFirstPrepend(String removeFirstPrepend) {
		this.removeFirstPrepend = removeFirstPrepend;
	}

	/**
	 * @return Returns the postParseRequired.
	 */
	public boolean isPostParseRequired() {
		return postParseRequired;
	}

	/**
	 * @param iterateAncestor
	 *            The postParseRequired to set.
	 */
	public void setPostParseRequired(boolean iterateAncestor) {
		this.postParseRequired = iterateAncestor;
	}
}
