/**
 * Created by 菅双鹤 on 2019/07/25.
 */
const getters = {
	// 获取Loading
	LOADING: state => state.loading,
	// 空状态
	EMPTY: state => state.empty,
	// home 主页数据
	GET_HOME: state => state.home,
	// imgData 附件
	IMGDATA: state => state.imgData,
	// 全国地址省市区
	AREADATA: state => state.areaData,
	// seekCapitaltitleIndex 找投资的title
	SEEKCAPITALTITLE: state => state.home.seekCapital.titleIndex,
	// multipleScreen 找投资---- 展示筛选和综合组件
	MULTIPLESCREEN: state => state.home.multipleScreen,
	// investorSearch 找投资的----投资人参数
	INVESTORSEARCH: state => state.home.investorSearch,
	// investInsSearch 找投资的----投资项目的参数
	INVERSTINSSEARCH: state => state.home.investInsSearch,
};
export default getters;
