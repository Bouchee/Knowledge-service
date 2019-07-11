package org.xianwu.core.orm.xibatis.sqlmap.engine.mapping.result;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

/**
 * Not really sure what this is...it is not used internally
 */
@SuppressWarnings("rawtypes")
public class XmlList implements List {

	private List list;

	/**
	 * Build a list from another list
	 * 
	 * @param list
	 *            - a base list
	 */
	public XmlList(List list) {
		this.list = list;
	}

	public int size() {
		return list.size();
	}

	public boolean isEmpty() {
		return list.isEmpty();
	}

	public boolean contains(Object o) {
		return list.contains(o);
	}

	public Iterator iterator() {
		return list.iterator();
	}

	public Object[] toArray() {
		return list.toArray();
	}

	@SuppressWarnings("unchecked")
	public Object[] toArray(Object a[]) {
		return list.toArray(a);
	}

	@SuppressWarnings("unchecked")
	public boolean add(Object o) {
		return list.add(o);
	}

	public boolean remove(Object o) {
		return list.remove(o);
	}

	@SuppressWarnings({ "unchecked" })
	public boolean containsAll(Collection c) {
		return list.containsAll(c);
	}

	@SuppressWarnings({ "unchecked" })
	public boolean addAll(Collection c) {
		return list.addAll(c);
	}

	@SuppressWarnings({ "unchecked" })
	public boolean addAll(int index, Collection c) {
		return list.addAll(index, c);
	}

	@SuppressWarnings({ "unchecked" })
	public boolean removeAll(Collection c) {
		return list.removeAll(c);
	}

	@SuppressWarnings({ "unchecked" })
	public boolean retainAll(Collection c) {
		return list.retainAll(c);
	}

	public void clear() {
		list.clear();
	}

	public Object get(int index) {
		return list.get(index);
	}

	@SuppressWarnings("unchecked")
	public Object set(int index, Object element) {
		return list.set(index, element);
	}

	@SuppressWarnings("unchecked")
	public void add(int index, Object element) {
		list.add(index, element);
	}

	public Object remove(int index) {
		return list.remove(index);
	}

	public int indexOf(Object o) {
		return list.indexOf(o);
	}

	public int lastIndexOf(Object o) {
		return list.lastIndexOf(o);
	}

	public ListIterator listIterator() {
		return list.listIterator();
	}

	public ListIterator listIterator(int index) {
		return list.listIterator(index);
	}

	public List subList(int fromIndex, int toIndex) {
		return list.subList(fromIndex, toIndex);
	}

	public String toString() {
		StringBuffer buffer = new StringBuffer();
		for (int i = 0, n = list.size(); i < n; i++) {
			buffer.append(list.get(i));
			buffer.append("\r\n");
		}
		return buffer.toString();
	}

}
