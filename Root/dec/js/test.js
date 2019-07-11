var LAB_TEST = 1;
var IS_COMPANY = Number('LAB_TEST');
var STATIC_DIR = 'http://115.com/static';

var SERVER_TIME = Number('1378996439') * 1000;
var GIFT_OPEN_KEY = 1;
var IS_OOF_COMPANY = Number('1');
var IS_ONLINE = false;
var NEWUPLOAD = 1;
var PAGE_NEW_UP_KEY = 1;
var APPLICATION = "115.com";

var LINSHIBL = "";
// 加载目录数据
var SCREEN_PARAM = {
	width	: window.screen.width - 380,
	height	: window.screen.height - 130
};
SCREEN_PARAM.page_count = Math.floor(SCREEN_PARAM.width / 134) * (Math.floor(SCREEN_PARAM.height / 165) + 1);
var nnStr = navigator.platform.toString().toLowerCase();
if ($.inArray(nnStr, ["iphone"]) != -1) {
	SCREEN_PARAM.page_count = 15;
}
var PAGE_PATHS = {
	MY			: "http://my.115.com",
	MY_OS		: "http://my.115.com",
	PASSPORT_N	: 'http://passport.115.com',
	PASSPORT	: "http://passport.115.com",
	WAN			: "http://wan.115.com",
	Q			: "http://q.115.com",
	MSG			: "http://msg.115.com",
	U			: "http://115.com",
	VIP			: "http://vip.115.com",
	HOME		: "http://home.115.com",
	UAPI		: "http://web.api.115.com",
	APP			: "http://open.115.com",
	UNION		: "http://union.115.com",
	PAY			: "http://pay.115.com",
	WENKU		: "http://wenku.115.com",
	PET			: "http://pet.115.com",
	STATIC		: 'http://static.115.com',
	APS			: 'http://aps.115.com'
};

// 加载配置数据
var UPLOAD_CONFIG = {
	"1"		: {
		"aid"				: 1,
		"upload_url"		: "http:\/\/v8up.u.115.com\/upload",
		"upload_type_limit"	: "*",
		"upload_size_limit"	: 123480309760
	},
	"2"		: {
		"aid"				: 2,
		"upload_url"		: "http:\/\/v8up.u.115.com\/upload",
		"upload_type_limit"	: ["doc", "docx", "xls", "pdf", "ppt", "wps", "dps", "et", "mdb", "reg", "txt", "wri", "rtf", "lrc", "sub", "srt", "ass", "ssa", "idx", "jar", "umd", "xlsx", ".xlsm",
				"xltx", "xltm", "xlam", "xlsb", "odt", "pptx", "ods", "odp", "chm", "pot", "pps", "ppsx", "html", "htm", "vsd", "cad"],
		"upload_size_limit"	: 123480309760
	},
	"3"		: {
		"aid"				: 3,
		"upload_url"		: "http:\/\/v8up.u.115.com\/upload",
		"upload_type_limit"	: ["gif", "jpg", "png", "jpeg", "bmp", "tif"],
		"upload_size_limit"	: 123480309760,
		"upload_num_limit"	: 200
	},
	"4"		: {
		"aid"				: 4,
		"upload_url"		: "http:\/\/v8up.u.115.com\/upload",
		"upload_type_limit"	: ["mp3", "wma", "wav", "midi", "flac", "ram", "ra", "mid", "aac", "m4a", "ape", "au", "ogg", "aif", "aiff", "snd", "voc", "mpa", "lrc", "cda", "vqf", "wvx", "wmx", "m3u",
				"m3u8", "ttbl", "ttpl", "tta", "tak", "mpc", "mp+", "mp3pro", "mpa", "mp1", "mp2", "mp3", "mac", "xm", "umx", "stm", "s3m", "mtm", "mod", "it", "far", "mid", "rmi", "fla", "dts",
				"dtswav", "cue", "awb", "iso", "amr", "caf", "aiff", "amr", "3gp"],
		"upload_size_limit"	: 123480309760,
		"upload_num_limit"	: 200
	},
	"5"		: {
		"aid"			: 5,
		"upload_url"	: "http:\/\/v8up.u.115.com\/upload"
	},
	"6"		: {
		"aid"			: 6,
		"upload_url"	: "http:\/\/v8up.u.115.com\/upload"
	},
	"9"		: {
		"aid"				: 9,
		"upload_url"		: "http:\/\/v8up.u.115.com\/upload",
		"upload_type_limit"	: ["asf", "avi", "wm", "wmp", "wmv", "ram", "rm", "rmvb", "rp", "rpm", "rt", "smi", "smil", "m1v", "m2p", "m2t", "m2ts", "m2v", "mp2v", "mpe", "mpeg", "mpg", "mpv2",
				"pss", "pva", "tp", "tpr", "ts", "m4b", "m4p", "m4v", "mp4", "mpeg4", "3g2", "3gp", "3gp2", "3gpp", "mov", "qt", "f4v", "flv", "hlv", "swf", "ifo", "vob", "amv", "bik", "csf", "divx",
				"evo", "ivm", "mkv", "mod", "mts", "ogm", "pmp", "scm", "tod", "vp6", "webm", "xlmv", "asx", "cue", "pls", "qpl", "dat", "dvix", "dv", "cpk", "fli", "flc"],
		"upload_size_limit"	: 123480309760,
		"upload_num_limit"	: 200
	},
	"12"	: {
		"aid"				: 12,
		"upload_url"		: "http:\/\/v8up.u.115.com\/upload",
		"upload_type_limit"	: "*",
		"upload_size_limit"	: 16106127360,
		"upload_num_limit"	: 0
	}
};
var UPLOAD_CONFIG_H5 = {
	"cross"			: "http:\/\/upload.115.com\/cross.php",
	"url"			: "http:\/\/upload.115.com\/upload?debugs=1&userid=4111583&ets=1379169239&appid=n&sig=BC50C3AD7C8A63E2F722B3E91759575CD14AA9F0",
	"size_limit"	: 1073741824
};

var USER_COOKIE = '%01%06PWSZ%02%0C%12r%0EG%0FZ%13%0Bt%1D%23Q%1Ct%07%40%0B%26G%20VD%01q%10%0E%24C%23U%14tt%12%01Z%0C%00ZGW%5E%13%1CPT%5D%12G%25%05%08%02%08T%1DVX%0C%5CWQ%06%0E%0E%03%0D%5B%0ER%0C%08%03%02%03Q%0F%07%0AQ%05Q%5BU%5B%04%01%00%03%05UWW%00%05%04%02V%09U%04WUQ%0AY';
var USER_COOKIE_LB = 'JTAxJTA2UFdTWiUwMiUwQyUxMnIlMEVHJTBGWiUxMyUwQnQlMUQlMjNRJTFDdCUwNyU0MCUwQiUyNkclMjBWRCUwMXElMTAlMEUlMjRDJTIzVSUxNHR0JTEyJTAxWiUwQyUwMFpHVyU1RSUxMyUxQ1BUJTVEJTEyRyUyNSUwNSUwOCUwMiUwOFQlMURWWCUwQyU1Q1dRJTA2JTBFJTBFJTAzJTBEJTVCJTBFUiUwQyUwOCUwMyUwMiUwM1ElMEYlMDclMEFRJTA1USU1QlUlNUIlMDQlMDElMDAlMDMlMDVVV1clMDAlMDUlMDQlMDJWJTA5VSUwNFdVUSUwQVk=';

var USER_ID = '4111583';
var IS_MY_BOSS = (USER_ID == '101628' || USER_ID == '101679' || USER_ID == '30003' || USER_ID == '6132563' || USER_ID == '5413562' || USER_ID == '70000' || USER_ID == '12580' || USER_ID == '2435066');

var USER_NAME = '星夜回缘';
var USER_FACE = {
	S	: 'http://face.my.115.com/01/gzu9f_s.png?1378996439',
	M	: 'http://face.my.115.com/01/gzu9f_m.png?1378996439',
	L	: 'http://face.my.115.com/01/gzu9f_l.png?1378996439'
};
// 用户权限
var USER_PERMISSION = {
	is_vip				: Number('0'),
	is_vip_exp			: Number('0'),
	// is_vip_exp:0,
	is_vip_exp_limit	: Number("0"),
	share_dir			: '49|',
	lock_dir			: Number(''),
	lock_file			: Number('')
}
// 加载空间数据
var SPACE_DATA = eval('({"1":{"size_total_extend":0,"size_total_vip":0,"upload_size_limit":"1073741824","size_used":196389571789,"size_total_base":202113307735.22,"size_auto_incr":42047132759.223,"size_total":202113307735.22,"size_remain":5723735946.223,"size_used_percent":97.168055874024},"4":{"size_used":0,"size_total":202113307735.22}})');
var PAGE_VIP_URL = 'http://vip.115.com/vip';
var PAGE_VIP_SPACE_URL = 'http://vip.115.com/space';

var CONFIG_PHOTO_TEST = true;
var PAGE_HELP_KEYS = {};
var PAGE_UPLOAD_OCX_VERSION = {
	WIN		: "v1.7.1.2",
	MAC		: "v1.7.1.2",
	UNIX	: "v1.5.7.0"
};

var PAGE_KITE_OPEN_KEY = 1;

var PAGE_IS_API_PLUG = Number('');
var PAGE_DOMAIN_ROOT = '115.com';

var OPEN_VIEWER_KEY = true; // 新版预览开关

var MIN_PLAY_ICON;

var JS_EVENTS = {
	CLICK		: 'click',
	TOUCHSTART	: 'touchstart',
	TOUCHMOVE	: 'touchmove'
}

var IS_IPAD = false;
if (navigator.platform.toString().toLowerCase() == "ipad") {
	JS_EVENTS.CLICK = "touchend";
	IS_IPAD = true;
}

var USER_SETTING = {
	"asc_file"			: "1",
	"order_file"		: "user_ptime",
	"view_file"			: "view_large",
	"language"			: "",
	"page_num"			: "",
	"isp_download"		: "",
	"isp_upload"		: "1",
	"play_count"		: "1",
	"show_ad"			: "",
	"ssl_download"		: "",
	"kc_open"			: "1",
	"user_edit_info"	: "",
	"mobile"			: "",
	"mobile_set"		: ""
};

var VIEWER_VERSION = '1.0.7';
