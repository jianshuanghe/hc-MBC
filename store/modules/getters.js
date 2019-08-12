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
	//news 消息数据
	GET_NEWS: state =>state.news,
	//my 我的
	GET_MY:state=>state.my,
	// imgData 附件
	IMGDATA: state => state.imgData
};
export default getters;
