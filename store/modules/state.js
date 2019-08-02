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
  home: { // 主页
	tabItems: 1,
	HomeList:{
		finance: {
			search: { // 搜索
				searchText: '', // 搜索内容
				isSearch: false, // 判断用户时候处于搜索状态
				searchItemsNum: 0, // 搜索到数据的条数
				pageNum: 0, // 总页数
				searchCondition: {  // 分页属性
				},
				searchData: [], // search数据
				searchHistoryData: [] // 搜索历史数据
			},
			listData: '' // 主页在融项目列表数据
		},
		invest: {
			search: { // 搜索
				searchText: '', // 搜索内容
				isSearch: false, // 判断用户时候处于搜索状态
				searchItemsNum: 0, // 搜索到数据的条数
				pageNum: 0, // 总页数
				searchCondition: {  // 分页属性
				},
				searchData: [], // search数据
				searchHistoryData: [] // 搜索历史数据
			},
			listData: '' // 主页投资机构列表数据
		}
	}
  }
};
export default state;
