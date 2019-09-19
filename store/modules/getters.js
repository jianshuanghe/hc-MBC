/**
 * Created by 菅双鹤 on 2019/07/25.
 */
const getters = {
	// 获取Loading
	LOADING: state => state.loading,
	// 空状态
	EMPTY: state => state.empty,
	// 认证提示组件
	AUTH: state => state.auth,
	// 判断用户点击行为变化
	USERACTIVE: state => state.userActive,
	// 判断用户是否登陆
	LANDREGIST: state => state.landRegist,
	// 申请组件
	ENTRUSSHOW: state => state.entrust.entrustShow,
	ENTRUST: state => state.entrust,
	// home 主页数据
	GET_HOME: state => state.home,
	//find 发现数据
	GET_FIND: state =>state.find,
	// 活动申请组件
	ENTRUSTSINGUPSHOW: state =>state.find.entrustSignUp.entrustShow,
	ENTRUSTSINGUP: state =>state.find.entrustSignUp,
	// publish 发布
	GET_PUBLISH: state =>state.publish,
	//news 消息数据
	GET_NEWS: state =>state.news,
	//my 我的
	GET_MY:state=>state.my,
	// imgData 附件
	IMGDATA: state => state.imgData,
	// 全国地址省市区
	AREADATA: state => state.areaData,
	// 领域
	FIELDDATA: state => state.fieldData,
	// 融资阶段
	LEVELDATA: state => state.levelData,
	// seekCapitaltitleIndex 找投资的title
	SEEKCAPITALTITLE: state => state.home.seekCapital.titleIndex,
	// multipleScreen 找投资---- 展示筛选和综合组件
	MULTIPLESCREEN: state => state.home.multipleScreen,
	// investorSearch 找投资的----投资人参数
	INVESTORSEARCH: state => state.home.investorSearch,
	INVESTORSEARCHTYPE: state => state.home.investorSearch.sortType,
	// investInsSearch 找投资的----投资项目的参数
	INVERSTINSSEARCH: state => state.home.investInsSearch,
	INVERSTINSSEARCHTYPE: state => state.home.investInsSearch.sortType,
	LOOKPROJECTSEARCH: state => state.home.homeModules.lookProject.search,
	LOOKPROJECTSEARCHTYPE: state => state.home.homeModules.lookProject.search.sortType,
	// 我的 履历编辑
	LVLI: state => state.my.MyList.Lvli,
};
export default getters;
