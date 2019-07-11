package org.xianwu.core.metatype.impl;

import java.util.Iterator;

import org.xianwu.core.exception.NullAbleException;
import org.xianwu.core.metatype.PKey;

/**
 * 非空数据传输对象(DateTransferObject)<br>
 * 建议对于****ByKey的数据操作的方法中的数据传递或者其他需要进行参数非空性校验的数据操作方法都使用此对象来传输参数<br>
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
@SuppressWarnings("serial")
public class BasePKey extends BaseDto implements PKey {

	/**
	 * 对非空数据传输对象进行键值非空性校验
	 * 
	 * @throws Exception
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	public void validateNullAble() {
		if (isEmpty()) {
			try {
				throw new NullAbleException(this.getClass());
			} catch (NullAbleException e) {
				e.printStackTrace();
				//System.exit(1);
			}
		} else {
			Iterator keyIterator = keySet().iterator();
			while (keyIterator.hasNext()) {
				String key = (String) keyIterator.next();
				String value = getAsString(key);
				if (value == null || value.equals("")) {
					try {
						throw new NullAbleException(key);
					} catch (NullAbleException e) {
						e.printStackTrace();
						//System.exit(1);
					}
				}
			}
		}
	}
}
