/**
 * Created by 菅双鹤 on 2019/07/25.
 */
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
		searchItemsNum: 0, // 搜索到数据的条数
		pageNum: 0, // 总页数
		searchCondition: {  // 分页属性
			page: '1'
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
			dataList: [] // 列表数据
		},
		meltTt: { // 融头条
			dataList: [] // 列表数据
		},
		activity: { // 活动
			dataList: [] // 列表数据
		},
	}
  },
  my: {
	MyList:{
		header:[],
		Collection:[]
	}  
  }
};
export default state;
