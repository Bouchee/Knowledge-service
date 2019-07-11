package org.xianwu.core.orm.xibatis.common.util;

import java.util.*;

/**
 * Implementation of PaginatedList backed by an ArrayList
 * 
 * @deprecated All paginated list features have been deprecated
 */
public class PaginatedArrayList implements PaginatedList {

	@SuppressWarnings("rawtypes")
	private static final ArrayList EMPTY_LIST = new ArrayList(0);

	@SuppressWarnings("rawtypes")
	private List list;
	@SuppressWarnings("rawtypes")
	private List page;
	private int pageSize;
	private int index;

	/**
	 * @param pageSize
	 */
	@SuppressWarnings("rawtypes")
	public PaginatedArrayList(int pageSize) {
		this.pageSize = pageSize;
		this.index = 0;
		this.list = new ArrayList();
		repaginate();
	}

	/**
	 * Constructor to set the initial size and the page size
	 * 
	 * @param initialCapacity
	 *            - the initial size
	 * @param pageSize
	 *            - the page size
	 */
	@SuppressWarnings("rawtypes")
	public PaginatedArrayList(int initialCapacity, int pageSize) {
		this.pageSize = pageSize;
		this.index = 0;
		this.list = new ArrayList(initialCapacity);
		repaginate();
	}

	/**
	 * Constructor to create an instance using an existing collection
	 * 
	 * @param c
	 *            - the collection to build the instance with
	 * @param pageSize
	 *            - the page size
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public PaginatedArrayList(Collection c, int pageSize) {
		this.pageSize = pageSize;
		this.index = 0;
		this.list = new ArrayList(c);
		repaginate();
	}

	private void repaginate() {
		if (list.isEmpty()) {
			page = EMPTY_LIST;
		} else {
			int start = index * pageSize;
			int end = start + pageSize - 1;
			if (end >= list.size()) {
				end = list.size() - 1;
			}
			if (start >= list.size()) {
				index = 0;
				repaginate();
			} else if (start < 0) {
				index = list.size() / pageSize;
				if (list.size() % pageSize == 0) {
					index--;
				}
				repaginate();
			} else {
				page = list.subList(start, end + 1);
			}
		}
	}

	/* List accessors (uses page) */

	public int size() {
		return page.size();
	}

	public boolean isEmpty() {
		return page.isEmpty();
	}

	public boolean contains(Object o) {
		return page.contains(o);
	}

	@SuppressWarnings("rawtypes")
	public Iterator iterator() {
		return page.iterator();
	}

	public Object[] toArray() {
		return page.toArray();
	}

	@SuppressWarnings("unchecked")
	public Object[] toArray(Object a[]) {
		return page.toArray(a);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public boolean containsAll(Collection c) {
		return page.containsAll(c);
	}

	public Object get(int index) {
		return page.get(index);
	}

	public int indexOf(Object o) {
		return page.indexOf(o);
	}

	public int lastIndexOf(Object o) {
		return page.lastIndexOf(o);
	}

	@SuppressWarnings("rawtypes")
	public ListIterator listIterator() {
		return page.listIterator();
	}

	@SuppressWarnings("rawtypes")
	public ListIterator listIterator(int index) {
		return page.listIterator(index);
	}

	@SuppressWarnings("rawtypes")
	public List subList(int fromIndex, int toIndex) {
		return page.subList(fromIndex, toIndex);
	}

	/* List mutators (uses master list) */

	@SuppressWarnings("unchecked")
	public boolean add(Object o) {
		boolean b = list.add(o);
		repaginate();
		return b;
	}

	public boolean remove(Object o) {
		boolean b = list.remove(o);
		repaginate();
		return b;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public boolean addAll(Collection c) {
		boolean b = list.addAll(c);
		repaginate();
		return b;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public boolean addAll(int index, Collection c) {
		boolean b = list.addAll(index, c);
		repaginate();
		return b;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public boolean removeAll(Collection c) {
		boolean b = list.removeAll(c);
		repaginate();
		return b;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public boolean retainAll(Collection c) {
		boolean b = list.retainAll(c);
		repaginate();
		return b;
	}

	public void clear() {
		list.clear();
		repaginate();
	}

	@SuppressWarnings("unchecked")
	public Object set(int index, Object element) {
		Object o = list.set(index, element);
		repaginate();
		return o;
	}

	@SuppressWarnings("unchecked")
	public void add(int index, Object element) {
		list.add(index, element);
		repaginate();
	}

	public Object remove(int index) {
		Object o = list.remove(index);
		repaginate();
		return o;
	}

	/* Paginated List methods */

	public int getPageSize() {
		return pageSize;
	}

	public boolean isFirstPage() {
		return index == 0;
	}

	public boolean isMiddlePage() {
		return !(isFirstPage() || isLastPage());
	}

	public boolean isLastPage() {
		return list.size() - ((index + 1) * pageSize) < 1;
	}

	public boolean isNextPageAvailable() {
		return !isLastPage();
	}

	public boolean isPreviousPageAvailable() {
		return !isFirstPage();
	}

	public boolean nextPage() {
		if (isNextPageAvailable()) {
			index++;
			repaginate();
			return true;
		} else {
			return false;
		}
	}

	public boolean previousPage() {
		if (isPreviousPageAvailable()) {
			index--;
			repaginate();
			return true;
		} else {
			return false;
		}
	}

	public void gotoPage(int pageNumber) {
		index = pageNumber;
		repaginate();
	}

	public int getPageIndex() {
		return index;
	}

}
