package org.xianwu.core.id.storer;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xianwu.core.id.SequenceStorer;
import org.xianwu.core.id.StoreSequenceException;

/**
 * MemorySequenceStorer
 * 此代码源于开源项目E3
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see SequenceStorer
 */
public class MemorySequenceStorer implements SequenceStorer {

	private final Log logger = LogFactory.getLog(MemorySequenceStorer.class);

	@SuppressWarnings("rawtypes")
	private Map cache = new HashMap();

	public void init() {
	}

	public long load(String sequenceID) throws StoreSequenceException {
		if (logger.isDebugEnabled()) {
			logger.debug("获取序号值,序号ID:" + sequenceID);
		}
		if (cache.containsKey(sequenceID) == false) {
			updateMaxValueByFieldName(0, sequenceID);
		}
		Long result = (Long) cache.get(sequenceID);
		return result.longValue();
	}

	@SuppressWarnings("unchecked")
	public void updateMaxValueByFieldName(long sequence, String sequenceID)
			throws StoreSequenceException {
		if (logger.isDebugEnabled()) {
			logger.debug("保存序号,序号ID:[" + sequenceID + "]序号值:" + sequence);
		}
		cache.put(sequenceID, new Long(sequence));
	}

}
