package org.xianwu.core.id.test;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xianwu.core.id.generator.DefaultIDGenerator;
import org.xianwu.core.id.sequence.DefaultSequenceGenerator;
import org.xianwu.core.id.sequence.TimeRollingSequenceGenerator;

/**
 * Hello
 * 此代码源于开源项目E3
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class Hello {
	private static final Log logger = LogFactory.getLog(Hello.class);

	public static void main(String[] args) {
		// //构造生成器
		// DefaultIDGenerator generator = new DefaultIDGenerator();
		//	
		// //前缀生成器，用于产生ID前缀
		// DefaultPrefixGenerator prefixGenerator = new
		// DefaultPrefixGenerator();
		// prefixGenerator.setWithDate(false);
		// generator.setPrefixGenerator(prefixGenerator);
		// prefixGenerator.setPrefix("E3_");
		//	
		// //序号生成器
		// DefaultSequenceGenerator sequenceGenerator =
		// TimeRollingSequenceGenerator.getYearRollingSequenceGenerator();
		// sequenceGenerator.setMinValue(0);
		// sequenceGenerator.setMaxValue(9999999);
		// sequenceGenerator.setCycle(true);
		// sequenceGenerator.setCache(100);
		// generator.setSequenceGenerator(sequenceGenerator);
		//	
		// //格式化序号
		// DefaultSequenceFormater sequenceFormater = new
		// DefaultSequenceFormater();
		// sequenceFormater.setPattern("0000000");
		// generator.setSequenceFormater(sequenceFormater);
		// System.out.println(generator.create());

		DefaultIDGenerator generator = new DefaultIDGenerator();
		DefaultSequenceGenerator sequenceGenerator = TimeRollingSequenceGenerator
				.getDayRollingSequenceGenerator();
		sequenceGenerator.setMinValue(1000000);
		sequenceGenerator.setMaxValue(9999999);
		generator.setSequenceGenerator(sequenceGenerator);
		System.out.println(generator.create());
		logger.debug("dddddddddddd");

		// net.jcreate.e3.commons.id.sequence.DefaultSequenceGenerator
		// sequenceGenerator =
		// new net.jcreate.e3.commons.id.sequence.DefaultSequenceGenerator();
		// sequenceGenerator.setMinValue(1000);
		// sequenceGenerator.setMaxValue(9999);
		// generator.setSequenceGenerator(sequenceGenerator);
		// for(int i = 0; i<100; i++ ){
		// System.out.println(generator.create());
		// }

		// while( true ){
		// System.out.println(sequenceGenerator.next());
		// try {
		// Thread.sleep(1000);
		// } catch (InterruptedException e) {
		// // 
		// e.printStackTrace();
		// }
		// }
	}

}
