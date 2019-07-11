package org.xianwu.system.common.dao.vo;

import java.sql.Timestamp;

import org.xianwu.core.metatype.BaseVo;

/**
 * 项目主页:社区主题回复VO
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class ReplyVo extends BaseVo {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6957218660406209683L;
	private Integer replyid;
	private Integer topicid;
	private String userid;
	private String username;
	private Timestamp replytime;
	private Integer floor;
	private String replycontent;
	private String replycontent2;

	public String getReplycontent2() {
		return replycontent2;
	}

	public void setReplycontent2(String replycontent2) {
		this.replycontent2 = replycontent2;
	}

	public Integer getReplyid() {
		return replyid;
	}

	public void setReplyid(Integer replyid) {
		this.replyid = replyid;
	}

	public Integer getTopicid() {
		return topicid;
	}

	public void setTopicid(Integer topicid) {
		this.topicid = topicid;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Timestamp getReplytime() {
		return replytime;
	}

	public void setReplytime(Timestamp replytime) {
		this.replytime = replytime;
	}

	public Integer getFloor() {
		return floor;
	}

	public void setFloor(Integer floor) {
		this.floor = floor;
	}

	public String getReplycontent() {
		return replycontent;
	}

	public void setReplycontent(String replycontent) {
		this.replycontent = replycontent;
	}

}
