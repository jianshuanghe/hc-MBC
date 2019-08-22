/**
 * Created by 菅双鹤 on 2019/07/25.
 */
let UserData = {}; // 用户信息
let landRegistLG = {}; // 读取缓存的用户信息
let params = {
	modelId: 0, // 0 代表投资人ID  1代表投资机构ID 2代表项目ID
	projectName: '', // 委托项目
	userId:'', // 申请人ID
	applyeType: 0 ,// 创业者联系投资人 1创业者联系投资机构
	phone: '', // 电话
	name: '', // 姓名
	serverId: '', // 服务ID
	time: '', // 提交成功时间
};
if (uni.getStorageSync('UserData')) {
	UserData = JSON.parse(uni.getStorageSync('UserData')); // 读取缓存的用户信息
	params.phone = UserData.userPhone;
	params.name = UserData.userName;
}
if (uni.getStorageSync('landRegist')) {
	landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
	params.userId = landRegistLG.user.id;
}
const state = {
  loading: { // loading
    loadingShow: false,
    loadingText: '请稍等...',
  },
  empty: { // 空状态
    emptyShow: false,
    emptyText: '当前没有数据！',
  },
  areaData: { // 地区
	area: [], // 全国省市区
	province: [], // 全国省
	provinceAndCity: [] // 全国省市
  },
  fieldData: {}, // 领域
  levelData: {}, // 融资阶段
  entrust:{
		entrustShow: false, // 默认不显示
		type: 0, // 0代表服务申请， 1项目委托
		success: false, // 是否申请成功
		params: params
  },
  home: { // 主页
	tabItems: 1,
	HomeList:{
		titleIndex: 1, // 切换的title
		finance: {
			loadingText: '加载更多...',
			search: { // 搜索
				pageNum: 0, // 总页数
				searchCondition: {  // 分页属性
					page: '1'
				}
			},
			listData: '' // 主页在融项目列表数据
		},
		invest: {
			loadingText: '加载更多...',
			search: { // 搜索
				pageNum: 0, // 总页数
				searchCondition: {  // 分页属性
					page: '1'
				}
			},
			listData: '' // 主页投资机构列表数据
		}
	},
	HomeSearch: { // 主页搜索
		searchText: '', // 搜索内容
		isSearch: false, // 判断用户时候处于搜索状态
		clickItemsIndex: 1, // 判断用户所处的位置，默认时综合
		project: { // 项目
			listNum: 0, // 总数居
			loadingText: '查看更多',
			search: { // 搜索
				pageNum: 0, // 总页数
				searchCondition: {  // 分页属性
					page: '1'
				}
			},
			listData: '' // 列表数据
		},
		investor: { // 投资人
			listNum: 0, // 总数居
			loadingText: '查看更多',
			search: { // 搜索
				pageNum: 0, // 总页数
				searchCondition: {  // 分页属性
					page: '1'
				}
			},
			listData: '' // 列表数据
		},
		investen: { // 投资机构
			listNum: 0, // 总数居
			loadingText: '查看更多',
			search: { // 搜索
				pageNum: 0, // 总页数
				searchCondition: {  // 分页属性
					page: '1'
				}
			},
			listData: '' // 列表数据
		},
		active: { // 资讯
			listNum: 0, // 总数居
			loadingText: '查看更多',
			search: { // 搜索
				pageNum: 0, // 总页数
				searchCondition: {  // 分页属性
					page: '1'
				}
			},
			listData: '' // 列表数据
		},
		searchData: [], // search数据
		searchHistoryData: [] // 搜索历史数据
	},
	seekCapital: { // 找投资
		titleIndex: 1, // 切换的title
		invest: { // 投资人
			loadingText: '加载更多...',
			search: { // 搜索
				pageNum: 0, // 总页数
				searchCondition: {  // 分页属性
					page: '1'
				}
			},
			listData: '' // 列表数据
		},
		investInstitution: { // 投资机构
			loadingText: '加载更多...',
			search: { // 搜索
				pageNum: 0, // 总页数
				searchCondition: {  // 分页属性
					page: '1'
				}
			},
			listData: '' // 列表数据
		}
	},
	investorSearch: { // 筛选结果 --- 投资人参数
		sortType: 'ID', // 排序 ID 综合 INFO_COUNT 最热 CREATE_TIME 最新
		area: '', //  省份codelist
		leves: '', //  轮数idlist
		fields: '' // 领域 idlist
	},
	investInsSearch: { // 筛选结果 --- 投资项目参数
		sortType: 'ID', // 排序 ID 综合 INFO_COUNT 最热 CREATE_TIME 最新
		area: '', //  省份codelist
		leves: '', //  轮数idlist
		fields: '' // 领域 idlist
	},
	multipleScreen: { // 找投资中的筛选模块
		screenShow: false, // 展示组件，默认为false不展示
		multipleShow: false,// 展示组件，默认为false不展示
	},
	homeModules: { // 四大模块 服务/项目/活动/融头条
		lookServices: { // 服务
			dataList: [] // 列表数据
		},
		lookProject: { // 项目
			list: { // 找项目
				loadingText: '加载更多...',
				search: { // 搜索
					pageNum: 0, // 总页数
					searchCondition: {  // 分页属性
						page: '1'
					}
				},
				listData: '' // 列表数据
			},
			search: { // 筛选结果 
				order: '1', //0 时间排序 1 综合排序 2热度
				area: '', //  省份codelist
				leves: '', //  轮数idlist
				fields: '' // 领域 idlist
			},
		},
		meltTt: { // 融头条
			dataList: [] // 列表数据
		},
		activity: { // 活动
			dataList: [] // 列表数据
		},
	}
  },
  find: { // 发现
	tabItems: 1, // 发现顶部tab切换  
	meltTt: { // 融头条
		loadingText: '加载更多...',
		search: { // 搜索
			pageNum: 0, // 总页数
			searchCondition: {  // 分页属性
				page: '1'
			}
		},
		listData: '' // 列表数据
	},
	active: { // 活动
		loadingText: '加载更多...',
		search: { // 搜索
			pageNum: 0, // 总页数
			searchCondition: {  // 分页属性
				page: '1'
			}
		},
		listData: '' // 列表数据
	},
	information: { // 资讯
		loadingText: '加载更多...',
		search: { // 搜索
			pageNum: 0, // 总页数
			searchCondition: {  // 分页属性
				page: '1'
			}
		},
		listData: '' // 列表数据
	}
  },
  publish: { // 发布
	titleIndex: 1, // 切换的title
	scanLandSuccess: false, // 判断是否扫码登录成功
	isUpLoadFile: {
		isSuccess: false, // 默认没有确认上传
		content:{} // 确认上传之后返回的数据
	},
	publishParams: {
		userId: 0, //用户ID
		projName: "项目名称1", //项目名称
		projSlogan: "项目口号", //项目口号
		fieldCode: "32", //领域Code
		pcode: "110000", //省市
		ccode: "110100",
		projLogo: "y7UHY2LAQnNHKGGhcjjc2BUIwHWAqRwb3tTX5BFOfSNVAo0bA2HVU8PUgaQKLchqUHo9ra.png", //项目logo
		compName: "公司名称111", //公司名称
		compUrl: "www.baidu.com", //公司官网
		encloToken: "6034c60d-7553-4679-80c7-6145890fd8fb" //token
	}
  },
  my: {
	MyList:{
		header:[],
		Collection:[],
		Authentication:[],
		Lvli:[],
		Time:[],
		Company:[]
	}  
  }
};
export default state;
