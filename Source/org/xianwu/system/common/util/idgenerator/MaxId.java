package org.xianwu.system.common.util.idgenerator;

import org.xianwu.core.id.generator.DefaultIDGenerator;

/**
 * ID生成器 静态类解决多线程并发访问生成ID的问题
 * 此类第一次实例化会执行所有的static代码块，如果想按需加载这些ID生成器，则应该一个ID写一个静态类就可以
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class MaxId extends IdHelper{
	/**
	* 机夹刀具刀片ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_milling_blade_clampid = null;

	static {
			IdGenerator idGenerator_milling_blade_clampid = new IdGenerator();
			idGenerator_milling_blade_clampid.setFieldname("MILLING_BLADE_CLAMPID");
			defaultIDGenerator_milling_blade_clampid = idGenerator_milling_blade_clampid.getDefaultIDGenerator();
		}

	/**
	* 返回机夹刀具刀片最大ID
	*
	* @return
	*/
	public static String getMilling_blade_clampID() {
		return defaultIDGenerator_milling_blade_clampid.create();
	}
	
	/**
	* 浅孔钻刀片ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_hd_blade_poledrillingid = null;

	static {
			IdGenerator idGenerator_hd_blade_poledrillingid = new IdGenerator();
			idGenerator_hd_blade_poledrillingid.setFieldname("HD_BLADE_POLEDRILLINGID");
			defaultIDGenerator_hd_blade_poledrillingid = idGenerator_hd_blade_poledrillingid.getDefaultIDGenerator();
		}

	/**
	* 返回浅孔钻刀片刀片最大ID
	*
	* @return
	*/
	public static String getHd_blade_poledrillingID() {
		return defaultIDGenerator_hd_blade_poledrillingid.create();
	}
	
	/**
	* 机夹刀具刀体ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_milling_toolholder_clampid = null;

	static {
			IdGenerator idGenerator_milling_toolholder_clampid = new IdGenerator();
			idGenerator_milling_toolholder_clampid.setFieldname("MILLING_TOOLHOLDER_CLAMPID");
			defaultIDGenerator_milling_toolholder_clampid = idGenerator_milling_toolholder_clampid.getDefaultIDGenerator();
		}

	/**
	* 返回机夹刀具刀体最大ID
	*
	* @return
	*/
	public static String getMilling_toolholder_clampID() {
		return defaultIDGenerator_milling_toolholder_clampid.create();
	}
	
	
	/**
	* 整体刀具ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_milling_integralid = null;

	static {
			IdGenerator idGenerator_milling_integralid = new IdGenerator();
			idGenerator_milling_integralid.setFieldname("MILLING_INTEGRALID");
			defaultIDGenerator_milling_integralid = idGenerator_milling_integralid.getDefaultIDGenerator();
		}

	/**
	* 返回整体刀具最大ID
	*
	* @return
	*/
	public static String getMilling_integralID() {
		return defaultIDGenerator_milling_integralid.create();
	}
	
	/**
	* 加工方法ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_promethodid = null;

	static {
			IdGenerator idGenerator_promethodid = new IdGenerator();
			idGenerator_promethodid.setFieldname("PROMETHODID");
			defaultIDGenerator_promethodid = idGenerator_promethodid.getDefaultIDGenerator();
		}

	/**
	* 返回加工方法最大ID
	*
	* @return
	*/
	public static String getPromethodID() {
		return defaultIDGenerator_promethodid.create();
	}

	/**
	* 品牌ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_brandid = null;

	static {
			IdGenerator idGenerator_brandid = new IdGenerator();
			idGenerator_brandid.setFieldname("BRANDID");
			defaultIDGenerator_brandid = idGenerator_brandid.getDefaultIDGenerator();
		}

	/**
	* 返回品牌最大ID
	*
	* @return
	*/
	public static String getBrandID() {
		return defaultIDGenerator_brandid.create();
	}

	/**
	* 刀片ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_bladeid = null;

	static {
			IdGenerator idGenerator_bladeid = new IdGenerator();
			idGenerator_bladeid.setFieldname("BLADEID");
			defaultIDGenerator_bladeid = idGenerator_bladeid.getDefaultIDGenerator();
		}

	/**
	* 返回刀片最大ID
	*
	* @return
	*/
	public static String getBladeID() {
		return defaultIDGenerator_bladeid.create();
	}

	/**
	* 切削参数ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_ctparameterid = null;

	static {
			IdGenerator idGenerator_ctparameterid = new IdGenerator();
			idGenerator_ctparameterid.setFieldname("CTPARAMETERID");
			defaultIDGenerator_ctparameterid = idGenerator_ctparameterid.getDefaultIDGenerator();
		}

	/**
	* 返回切削参数最大ID
	*
	* @return
	*/
	public static String getCtparameterID() {
		return defaultIDGenerator_ctparameterid.create();
	}

	/**
	* 刀体ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_toolholderid = null;

	static {
			IdGenerator idGenerator_toolholderid = new IdGenerator();
			idGenerator_toolholderid.setFieldname("TOOLHOLDERID");
			defaultIDGenerator_toolholderid = idGenerator_toolholderid.getDefaultIDGenerator();
		}

	/**
	* 返回刀体最大ID
	*
	* @return
	*/
	public static String getToolholderID() {
		return defaultIDGenerator_toolholderid.create();
	}

	/**
	* 加工精度类型编号ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_accuracyid = null;

	static {
			IdGenerator idGenerator_accuracyid = new IdGenerator();
			idGenerator_accuracyid.setFieldname("ACCURACYID");
			defaultIDGenerator_accuracyid = idGenerator_accuracyid.getDefaultIDGenerator();
		}

	/**
	* 返回加工精度类型编号最大ID
	*
	* @return
	*/
	public static String getAccuracyID() {
		return defaultIDGenerator_accuracyid.create();
	}

	/**
	* 刀片材质ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_bladematerialid = null;

	static {
			IdGenerator idGenerator_bladematerialid = new IdGenerator();
			idGenerator_bladematerialid.setFieldname("BLADEMATERIALID");													  
			defaultIDGenerator_bladematerialid = idGenerator_bladematerialid.getDefaultIDGenerator();
		}

	/**
	* 返回刀片材质最大ID
	*
	* @return
	*/
	public static String getBladematerialID() {
		return defaultIDGenerator_bladematerialid.create();
	}

	/**
	* 槽型编号ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_grooveid = null;

	static {
			IdGenerator idGenerator_grooveid = new IdGenerator();
			idGenerator_grooveid.setFieldname("GROOVEID");
			defaultIDGenerator_grooveid = idGenerator_grooveid.getDefaultIDGenerator();
		}

	/**
	* 返回槽型编号最大ID
	*
	* @return
	*/
	public static String getGrooveID() {
		return defaultIDGenerator_grooveid.create();
	}

	/**
	* 工件材料ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_workpiecematerialid = null;

	static {
			IdGenerator idGenerator_workpiecematerialid = new IdGenerator();
			idGenerator_workpiecematerialid.setFieldname("WORKPIECEMATERIALID");
			defaultIDGenerator_workpiecematerialid = idGenerator_workpiecematerialid.getDefaultIDGenerator();
		}

	/**
	* 返回工件材料最大ID
	*
	* @return
	*/
	public static String getWorkpiecematerialID() {
		return defaultIDGenerator_workpiecematerialid.create();
	}

	/**
	* 切削液种类ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_categoryid = null;

	static {
			IdGenerator idGenerator_categoryid = new IdGenerator();
			idGenerator_categoryid.setFieldname("CATEGORYID");
			defaultIDGenerator_categoryid = idGenerator_categoryid.getDefaultIDGenerator();
		}

	/**
	* 返回切削液种类最大ID
	*
	* @return
	*/
	public static String getCategoryID() {
		return defaultIDGenerator_categoryid.create();
	}

	/**
	* 机床ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_machinetoolid = null;

	static {
			IdGenerator idGenerator_machinetoolid = new IdGenerator();
			idGenerator_machinetoolid.setFieldname("MACHINETOOLID");
			defaultIDGenerator_machinetoolid = idGenerator_machinetoolid.getDefaultIDGenerator();
		}

	/**
	* 返回机床最大ID
	*
	* @return
	*/
	public static String getMachinetoolID() {
		return defaultIDGenerator_machinetoolid.create();
	}

	/**
	* 机床接口ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_mtinterfaceid = null;

	static {
			IdGenerator idGenerator_mtinterfaceid = new IdGenerator();
			idGenerator_mtinterfaceid.setFieldname("MTINTERFACEID");
			defaultIDGenerator_mtinterfaceid = idGenerator_mtinterfaceid.getDefaultIDGenerator();
		}

	/**
	* 返回机床接口最大ID
	*
	* @return
	*/
	public static String getMtinterfaceID() {
		return defaultIDGenerator_mtinterfaceid.create();
	}

	/**
	* 机床性能卡ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_mtperformanceid = null;

	static {
			IdGenerator idGenerator_mtperformanceid = new IdGenerator();
			idGenerator_mtperformanceid.setFieldname("MTPERFORMANCEID");
			defaultIDGenerator_mtperformanceid = idGenerator_mtperformanceid.getDefaultIDGenerator();
		}

	/**
	* 返回机床性能卡最大ID
	*
	* @return
	*/
	public static String getMtperformanceID() {
		return defaultIDGenerator_mtperformanceid.create();
	}

	/**
	* 螺纹刀片ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_threadbladeid = null;

	static {
			IdGenerator idGenerator_threadbladeid = new IdGenerator();
			idGenerator_threadbladeid.setFieldname("THREADBLADEID");
			defaultIDGenerator_threadbladeid = idGenerator_threadbladeid.getDefaultIDGenerator();
		}

	/**
	* 返回螺纹刀片最大ID
	*
	* @return
	*/
	public static String getThreadbladeID() {
		return defaultIDGenerator_threadbladeid.create();
	}
	
	/**
	* 螺纹刀体ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_threadtoolholderid = null;

	static {
			IdGenerator idGenerator_threadtoolholderid = new IdGenerator();
			idGenerator_threadtoolholderid.setFieldname("THREADTOOLHOLDERID");
			defaultIDGenerator_threadtoolholderid = idGenerator_threadtoolholderid.getDefaultIDGenerator();
		}

	/**
	* 返回螺纹刀体最大ID
	*
	* @return
	*/
	public static String getThreadtoolholderID() {
		return defaultIDGenerator_threadtoolholderid.create();
	}
	
	/**
	* 螺纹刀片材质ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_threadbladematerialid = null;

	static {
			IdGenerator idGenerator_threadbladematerialid = new IdGenerator();
			idGenerator_threadbladematerialid.setFieldname("THREADBLADEMATERIALID");
			defaultIDGenerator_threadbladematerialid = idGenerator_threadbladematerialid.getDefaultIDGenerator();
		}

	/**
	* 返回螺纹刀片材质最大ID
	*
	* @return
	*/
	public static String getThreadbladematerialID() {
		return defaultIDGenerator_threadbladematerialid.create();
	}
	
	/**
	* 切断切槽刀片ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_cutbladeid = null;

	static {
			IdGenerator idGenerator_cutbladeid = new IdGenerator();
			idGenerator_cutbladeid.setFieldname("CUTBLADEID");
			defaultIDGenerator_cutbladeid = idGenerator_cutbladeid.getDefaultIDGenerator();
		}

	/**
	* 返回切断切槽刀片最大ID
	*
	* @return
	*/
	public static String getCutbladeID() {
		return defaultIDGenerator_cutbladeid.create();
	}
	
	/**
	* 切断切槽刀体ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_cuttoolholderid = null;

	static {
			IdGenerator idGenerator_cuttoolholderid = new IdGenerator();
			idGenerator_cuttoolholderid.setFieldname("CUTTOOLHOLDERID");
			defaultIDGenerator_cuttoolholderid = idGenerator_cuttoolholderid.getDefaultIDGenerator();
		}

	/**
	* 返回切断切槽刀体最大ID
	*
	* @return
	*/
	public static String getCuttoolholderID() {
		return defaultIDGenerator_cuttoolholderid.create();
	}
	
	/**
	* 切断切槽刀片材质ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_cutbladematerialid = null;

	static {
			IdGenerator idGenerator_cutbladematerialid = new IdGenerator();
			idGenerator_cutbladematerialid.setFieldname("CUTBLADEMATERIALID");
			defaultIDGenerator_cutbladematerialid = idGenerator_cutbladematerialid.getDefaultIDGenerator();
		}

	/**
	* 返回切断切槽刀片材质最大ID
	*
	* @return
	*/
	public static String getCutbladematerialID() {
		return defaultIDGenerator_cutbladematerialid.create();
	}
	
	/**
	* 切断切槽刀片槽型编号ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_cutgrooveid = null;

	static {
			IdGenerator idGenerator_cutgrooveid = new IdGenerator();
			idGenerator_cutgrooveid.setFieldname("CUTGROOVEID");
			defaultIDGenerator_cutgrooveid = idGenerator_cutgrooveid.getDefaultIDGenerator();
		}

	/**
	* 返回切断切槽刀片槽型编号最大ID
	*
	* @return
	*/
	public static String getCutgrooveID() {
		return defaultIDGenerator_cutgrooveid.create();
	}
	
	/**
	 * 系统软件ID
	 */
	private static DefaultIDGenerator defaultIDGenerator_softwareid = null;

	static {
		IdGenerator idGenerator_softwareid = new IdGenerator();
		idGenerator_softwareid.setFieldname("SOFTWAREID");
		defaultIDGenerator_softwareid = idGenerator_softwareid.getDefaultIDGenerator();
	}

	/**
	* 返回系统软件ID
	*
	* @return
	*/
	public static String getSoftwareID() {
		return defaultIDGenerator_softwareid.create();
	}

	/**
	 * 齿轮ID
	 */
	private static DefaultIDGenerator defaultIDGenerator_gearid = null;

	static {
		IdGenerator idGenerator_gearid = new IdGenerator();
		idGenerator_gearid.setFieldname("GEARID");
		defaultIDGenerator_gearid = idGenerator_gearid.getDefaultIDGenerator();
	}

	/**
	* 返回齿轮ID
	*
	* @return
	*/
	public static String getGearID() {
		return defaultIDGenerator_gearid.create();
	}

	/**
	 * 镗削刀体ID
	 */
	private static DefaultIDGenerator defaultIDGenerator_hd_toolholder_boringid = null;

	static {
		IdGenerator idGenerator_hd_toolholder_boringid = new IdGenerator();
		idGenerator_hd_toolholder_boringid.setFieldname("HD_TOOLHOLDER_BORINGID");
		defaultIDGenerator_hd_toolholder_boringid = idGenerator_hd_toolholder_boringid.getDefaultIDGenerator();
	}

	/**
	* 返回镗削刀体ID
	*
	* @return
	*/
	public static String getHd_toolholder_boringID() {
		return defaultIDGenerator_hd_toolholder_boringid.create();
	}

	/**
	 * 镗削刀片ID
	 */
	private static DefaultIDGenerator defaultIDGenerator_hd_blade_boringid = null;

	static {
		IdGenerator idGenerator_hd_blade_boringid = new IdGenerator();
		idGenerator_hd_blade_boringid.setFieldname("HD_BLADE_BORINGID");
		defaultIDGenerator_hd_blade_boringid = idGenerator_hd_blade_boringid.getDefaultIDGenerator();
	}

	/**
	* 返回镗削刀片ID
	*
	* @return
	*/
	public static String getHd_blade_boringID() {
		return defaultIDGenerator_hd_blade_boringid.create();
	}
	/**
	 * 镗削模块ID
	 */
	private static DefaultIDGenerator defaultIDGenerator_hd_toolholder_boring_moduleid = null;

	static {
		IdGenerator idGenerator_hd_toolholder_boring_moduleid = new IdGenerator();
		idGenerator_hd_toolholder_boring_moduleid.setFieldname("HD_TOOLHOLDER_BORING_MODULEID");
		defaultIDGenerator_hd_toolholder_boring_moduleid = idGenerator_hd_toolholder_boring_moduleid.getDefaultIDGenerator();
	}

	/**
	* 返回镗削模块ID
	*
	* @return
	*/
	public static String getHd_toolholder_boring_moduleID() {
		return defaultIDGenerator_hd_toolholder_boring_moduleid.create();
	}
	
	/**
	 * 孔加工ID
	 */
	private static DefaultIDGenerator defaultIDGenerator_hd_holedrillingid = null;

	static {
		IdGenerator idGenerator_hd_holedrillingid = new IdGenerator();
		idGenerator_hd_holedrillingid.setFieldname("HD_HOLEDRILLINGID");
		defaultIDGenerator_hd_holedrillingid = idGenerator_hd_holedrillingid.getDefaultIDGenerator();
	}
	
	/**
	* 返回孔加工ID
	*
	* @return
	*/
	public static String getHd_holedrillingID() {
		return defaultIDGenerator_hd_holedrillingid.create();
	}
	
	/**
	* 整体式铰刀ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_hd_toolholder_reaming_integralid = null;

	static {
			IdGenerator idGenerator_hd_toolholder_reaming_integralid = new IdGenerator();
			idGenerator_hd_toolholder_reaming_integralid.setFieldname("HD_TOOLHOLDER_REAMING_INTEGRALID");
			defaultIDGenerator_hd_toolholder_reaming_integralid = idGenerator_hd_toolholder_reaming_integralid.getDefaultIDGenerator();
		}

	/**
	* 返回整体式铰刀最大ID
	*
	* @return
	*/
	public static String getHd_toolholder_reaming_integralID() {
		return defaultIDGenerator_hd_toolholder_reaming_integralid.create();
	}
	
	
	/**
	* 机夹式铰刀刀体ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_hd_toolholder_reaming_clampid = null;

	static {
			IdGenerator idGenerator_hd_toolholder_reaming_clampid = new IdGenerator();
			idGenerator_hd_toolholder_reaming_clampid.setFieldname("HD_TOOLHOLDER_REAMING_CLAMPID");
			defaultIDGenerator_hd_toolholder_reaming_clampid = idGenerator_hd_toolholder_reaming_clampid.getDefaultIDGenerator();
		}

	/**
	* 返回机夹式铰刀刀体最大ID
	*
	* @return
	*/
	public static String getHd_toolholder_reaming_clampID() {
		return defaultIDGenerator_hd_toolholder_reaming_clampid.create();
	}
	
	/**
	* 机夹式铰刀模块ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_hd_module_reaming_clampid = null;

	static {
			IdGenerator idGenerator_hd_module_reaming_clampid = new IdGenerator();
			idGenerator_hd_module_reaming_clampid.setFieldname("HD_MODULE_REAMING_CLAMPID");
			defaultIDGenerator_hd_module_reaming_clampid = idGenerator_hd_module_reaming_clampid.getDefaultIDGenerator();
		}

	/**
	* 返回机夹刀具刀片最大ID
	*
	* @return
	*/
	public static String getHd_module_reaming_clampID() {
		return defaultIDGenerator_hd_module_reaming_clampid.create();
	}
	
	/**
	 * 复合钻刀体ID
	 */
	private static DefaultIDGenerator defaultIDGenerator_hd_toolholder_combineddrillingid = null;

	static {
		IdGenerator idGenerator_hd_toolholder_combineddrillingid = new IdGenerator();
		idGenerator_hd_toolholder_combineddrillingid.setFieldname("HD_TOOLHOLDER_COMBINEDDRILLINGID");
		defaultIDGenerator_hd_toolholder_combineddrillingid = idGenerator_hd_toolholder_combineddrillingid.getDefaultIDGenerator();
	}
	
		/**
	* 返回复合钻刀体ID
	*
	* @return
	*/
	public static String getHd_toolholder_combineddrillingID() {
		return defaultIDGenerator_hd_toolholder_combineddrillingid.create();
	}
	
	/**
	* 丝锥模块ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_hd_toolholder_tapping_integralid = null;

	static {
			IdGenerator idGenerator_hd_toolholder_tapping_integralid = new IdGenerator();
			idGenerator_hd_toolholder_tapping_integralid.setFieldname("HD_TOOLHOLDER_TAPPINGID");
			defaultIDGenerator_hd_toolholder_tapping_integralid = idGenerator_hd_toolholder_tapping_integralid.getDefaultIDGenerator();
		}

	/**
	* 返回丝锥最大ID
	*
	* @return
	*/
	public static String getHd_toolholder_tappingID() {
		return defaultIDGenerator_hd_toolholder_tapping_integralid.create();
	}
	
	
	/**
	* 中心钻模块ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_hd_centredrilling_integralid = null;

	static {
			IdGenerator idGenerator_hd_centredrilling_integralid = new IdGenerator();
			idGenerator_hd_centredrilling_integralid.setFieldname("HD_CENTREDRILLINGID");
			defaultIDGenerator_hd_centredrilling_integralid = idGenerator_hd_centredrilling_integralid.getDefaultIDGenerator();
		}

	/**
	* 返回中心钻最大ID
	*
	* @return
	*/
	public static String getHd_centredrillingID() {
		return defaultIDGenerator_hd_centredrilling_integralid.create();
	}
	/**
	 * 复合钻刀片ID
	 */
	private static DefaultIDGenerator defaultIDGenerator_hd_blade_combineddrillingid = null;

	static {
		IdGenerator idGenerator_hd_blade_combineddrillingid = new IdGenerator();
		idGenerator_hd_blade_combineddrillingid.setFieldname("HD_BLADE_COMBINEDDRILLINGID");
		defaultIDGenerator_hd_blade_combineddrillingid = idGenerator_hd_blade_combineddrillingid.getDefaultIDGenerator();
	}

	/**
	* 返回复合钻刀片ID
	*
	* @return
	*/
	public static String getHd_blade_combineddrillingID() {
		return defaultIDGenerator_hd_blade_combineddrillingid.create();
	}
	
	/**
	 * 复合钻中心钻ID
	 */
	private static DefaultIDGenerator defaultIDGenerator_hd_blade_combined_centredrillingid = null;

	static {
		IdGenerator idGenerator_defaultIDGenerator_hd_blade_combined_centredrillingid = new IdGenerator();
		idGenerator_defaultIDGenerator_hd_blade_combined_centredrillingid.setFieldname("HD_BLADE_COMBINED_CENTREDRILLINGID");
		defaultIDGenerator_hd_blade_combined_centredrillingid = idGenerator_defaultIDGenerator_hd_blade_combined_centredrillingid.getDefaultIDGenerator();
	}

	/**
	* 返回复合钻中心钻ID
	*
	* @return
	*/
	public static String getHd_blade_combined_centredrillingID() {
		return defaultIDGenerator_hd_blade_combined_centredrillingid.create();
	}
	
	/**
	 * 复合钻钻杆ID
	 */
	private static DefaultIDGenerator defaultIDGenerator_hd_cutterbar_combineddrillingid = null;

	static {
		IdGenerator idGenerator_defaultIDGenerator_hd_cutterbar_combineddrillingid = new IdGenerator();
		idGenerator_defaultIDGenerator_hd_cutterbar_combineddrillingid.setFieldname("HD_CUTTERBAR_COMBINEDDRILLINGID");
		defaultIDGenerator_hd_cutterbar_combineddrillingid = idGenerator_defaultIDGenerator_hd_cutterbar_combineddrillingid.getDefaultIDGenerator();
	}

	/**
	* 返回复合钻钻杆ID
	*
	* @return
	*/
	public static String getHd_cutterbar_combineddrillingID() {
		return defaultIDGenerator_hd_cutterbar_combineddrillingid.create();
	}
	
	/**
	* 麻花钻刀体ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_hd_toolholder_holedrilling_integralid = null;

	static {
			IdGenerator idGenerator_hd_toolholder_holedrilling_integralid = new IdGenerator();
			idGenerator_hd_toolholder_holedrilling_integralid.setFieldname("HD_TOOLHOLDER_HOLEDRILLING_INTEGRALID");
			defaultIDGenerator_hd_toolholder_holedrilling_integralid = idGenerator_hd_toolholder_holedrilling_integralid.getDefaultIDGenerator();
		}

	/**
	* 返回麻花钻刀体最大ID
	*
	* @return
	*/
	public static String getHd_toolholder_holedrilling_integralID() {
		return defaultIDGenerator_hd_toolholder_holedrilling_integralid.create();
	}
	
	/**
	* 浅孔钻刀体ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_hd_toolholder_poledrilling_integralid = null;

	static {
			IdGenerator idGenerator_hd_toolholder_poledrilling_integralid = new IdGenerator();
			idGenerator_hd_toolholder_poledrilling_integralid.setFieldname("HD_TOOLHOLDER_POLEDRILLINGID");
			defaultIDGenerator_hd_toolholder_poledrilling_integralid = idGenerator_hd_toolholder_poledrilling_integralid.getDefaultIDGenerator();
		}

	/**
	* 返回浅孔钻刀体最大ID
	*
	* @return
	*/
	public static String getHd_toolholder_poledrillingID() {
		return defaultIDGenerator_hd_toolholder_poledrilling_integralid.create();
	}
	
	/**
	* 单刀片机夹钻刀体刀体ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_hd_toolholder_singledrilling_clampid = null;

	static {
			IdGenerator idGenerator_hd_toolholder_singledrilling_clampid = new IdGenerator();
			idGenerator_hd_toolholder_singledrilling_clampid.setFieldname("HD_TOOLHOLDER_SINGLEDRILLING_CLAMPID");
			defaultIDGenerator_hd_toolholder_singledrilling_clampid = idGenerator_hd_toolholder_singledrilling_clampid.getDefaultIDGenerator();
		}

	/**
	* 返回单刀片机夹钻刀体最大ID
	*
	* @return
	*/
	public static String getHd_toolholder_singledrilling_clampID() {
		return defaultIDGenerator_hd_toolholder_singledrilling_clampid.create();
	}
	/**
	* 单刀片机夹钻刀体刀片ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_hd_blade_singledrilling_clampid = null;

	static {
			IdGenerator idGenerator_hd_blade_singledrilling_clampid = new IdGenerator();
			idGenerator_hd_blade_singledrilling_clampid.setFieldname("HD_BLADE_SINGLEDRILLING_CLAMPID");
			defaultIDGenerator_hd_blade_singledrilling_clampid = idGenerator_hd_blade_singledrilling_clampid.getDefaultIDGenerator();
		}

	/**
	* 返回单刀片机夹钻刀片最大ID
	*
	* @return
	*/
	public static String getHd_blade_singledrilling_clampID() {
		return defaultIDGenerator_hd_blade_singledrilling_clampid.create();
	}
	
	/**
	* 套式扩孔钻刀体ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_hd_toolholder_coredrilling_shellid = null;

	static {
			IdGenerator idGenerator_hd_toolholder_coredrilling_shellid = new IdGenerator();
			idGenerator_hd_toolholder_coredrilling_shellid.setFieldname("HD_TOOLHOLDER_COREDRILLING_SHELLID");
			defaultIDGenerator_hd_toolholder_coredrilling_shellid = idGenerator_hd_toolholder_coredrilling_shellid.getDefaultIDGenerator();
		}

	/**
	* 返回套式扩孔钻刀体最大ID
	*
	* @return
	*/
	public static String getHd_toolholder_coredrilling_shellID() {
		return defaultIDGenerator_hd_toolholder_coredrilling_shellid.create();
	}
	
	/**
	* 套式扩孔钻模块ID
	*/
	private static DefaultIDGenerator defaultIDGenerator_hd_module_coredrilling_shellid = null;

	static {
			IdGenerator idGenerator_hd_module_coredrilling_shellid = new IdGenerator();
			idGenerator_hd_module_coredrilling_shellid.setFieldname("HD_MODULE_COREDRILLING_SHELLID");
			defaultIDGenerator_hd_module_coredrilling_shellid = idGenerator_hd_module_coredrilling_shellid.getDefaultIDGenerator();
		}

	/**
	* 返回套式扩孔钻模块最大ID
	*
	* @return
	*/
	public static String getHd_module_coredrilling_shellID() {
		return defaultIDGenerator_hd_module_coredrilling_shellid.create();
	}
	
}
