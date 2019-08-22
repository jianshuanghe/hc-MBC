/**
 * Created by 菅双��on 2019/07/25.
 */

const mutations = {
  setLoadingShow (state, info) {
    console.log(info, 'setLoadingShow');
    state.loading.loadingShow = info;
  },
  setEmptyShow (state, info) {
    console.log(info, 'setEmptyShow');
    state.empty.emptyShow = info;
  },
  setAreaData (state, info) { // 地区
    console.log(info, 'setAreaData');
    state.areaData = info;
  },
  setFieldData (state, info) { // 领域
    console.log(info, 'setFieldData');
    state.fieldData = info;
  },
  setLevelData (state, info) { // 融资阶段
    console.log(info, 'setLevelData');
    state.levelData = info;
  },
  setEnTrustShow (state, info) { // 控制展示申请组件
    console.log(info, 'setEnTrustShow');
    state.entrust.entrustShow = info;
  },
  setEntrustType (state, info) { // 申请类型。服务 和项目
    console.log(info, 'setEntrustType');
    state.entrust.type = info;
  },
  setEntrustSuccess (state, info) { // 申请成功与否
    console.log(info, 'setEntrustSuccess');
    state.entrust.success = info;
  },
  setEntrustParams (state, info) { // 申请参数
    console.log(info, 'setEntrustParams');
    state.entrust.params = info;
  },
  setHome (state, info) {
    console.log(info, 'setHome');
    state.home.tabItems = info;
  },
  setSearchText  (state, info) { // 搜索内容
    console.log(info, 'setSearchText');
    state.home.HomeSearch.searchText  = info;
  },
  setSeachProject (state, info) { // 搜索的项目模块
    console.log(info, 'setSeachProject');
    state.home.HomeSearch.project = info;
  },
  setSeachInvestor (state, info) { // 搜索的投资人模块
    console.log(info, 'setSeachInvestor');
    state.home.HomeSearch.investor = info;
  },
  setSeachInvesten (state, info) { // 搜索的投资机构模块
    console.log(info, 'setSeachInvesten');
    state.home.HomeSearch.investen = info;
  },
  setSeachActive (state, info) { // 搜索的资讯模块
    console.log(info, 'setSeachActive');
    state.home.HomeSearch.active = info;
  },
  setSearchItemsIndex (state, info) { // 判断用户所处的位置，默认时综合
    console.log(info, 'setSearchItemsIndex');
    state.home.HomeSearch.clickItemsIndex = info;
  },
  setIsSearch (state, info) { // 判断用户是否处在搜索状态
    console.log(info, 'setIsSearch');
    state.home.HomeSearch.isSearch = info;
  },
  setSearchHistoryData (state, info) { // 搜索历史数据
    console.log(info, 'setSearchHistoryData');
    state.home.HomeSearch.searchHistoryData = info;
  },
  setHomeListTitleIndex (state, info) { // 首页列表title
    console.log(info, 'setHomeListTitleIndex');
    state.home.HomeList.titleIndex = info;
  },
  setFinance (state, info) { // 在融列表
    console.log(info, 'setFinance');
    state.home.HomeList.finance = info;
  },
  setInvest (state, info) { // 头责任列表
    console.log(info, 'setInvest');
    state.home.HomeList.invest = info;
  },
  // 发现模块
  setFindTabItems (state, info) { // 头责任列表
    console.log(info, 'setFindTabItems');
    state.find.tabItems = info;
  },
   setMeltTt (state, info) { // 融头条
    console.log(info, 'setMeltTt');
    state.find.meltTt = info;
  },
   setActive (state, info) { // 活动
    console.log(info, 'setActive');
    state.find.active = info;
  },
   setInformation (state, info) { // 资讯
    console.log(info, 'setInformation');
    state.find.information = info;
  },
  // 发布模块
  setPublishTitleIndex (state, info) { // title切换
    console.log(info, 'setPublishTitleIndex');
    state.publish.titleIndex = info;
  },
  setScanLandSuccess (state, info) { // 判断是否扫码登录成功
    console.log(info, 'setScanLandSuccess');
    state.publish.scanLandSuccess = info;
  },
  setIsUploadFileSuccess (state, info) { //  默认没有确认上传
    console.log(info, 'setIsUploadFileSuccess');
    state.publish.isUpLoadFile.isSuccess = info;
  },
  setIsUploadFileContent (state, info) { //  确认上传之后返回的数据
    console.log(info, 'setIsUploadFileContent');
    state.publish.isUpLoadFile.content = info;
  },
  setPublishParams (state, info) { //  基本信息参数
    console.log(info, 'setPublishParams');
    state.publish.publishParams = info;
  },
  // 我的=》用户信息
  setheader(state, info){
	  console.log(info,'setheader')
	  state.my.MyList.header=info
  },
  //我的 认证详情
  setAuthentication(state, info){
	  console.log(info,'setAuthentication')
	  state.my.MyList.Authentication=info
  },
  //我的 用户更新个人资料
  setCollection(state, info){
	  console.log(info,'setCollection')
	  state.my.MyList.Collection=info
  },
  //我的 用户投资履历
  setLvli(state, info){
	  console.log(info,'setLvli')
	  state.my.MyList.Lvli=info
  },  
  //我的 公司信息
  setCompany(state, info){
	  console.log(info,'setCompany')
	  state.my.MyList.Company=info
  }, 
  setTime(state, info){
	  console.log(info,'setTime')
	  state.my.MyList.Time=info
  },
  setSeekCapitalTitleIndex (state, info) { // 找投资的title
    console.log(info, 'setHomeListTitleIndex');
    state.home.seekCapital.titleIndex = info;
  },
  setSeekInvest (state, info) { // 找投资人
    console.log(info, 'setSeekInvest');
    state.home.seekCapital.invest = info;
  },
  setSeekInvestInstitution (state, info) { // 找投资机构
    console.log(info, 'setSeekInvestInstitution');
    state.home.seekCapital.investInstitution = info;
  },
  setScreenShow (state, info) { // 找投资中的筛选模块--- 综合展示Show
    console.log(info, 'setScreenShow');
    state.home.multipleScreen.screenShow = info;
  },
  setMultipleShow (state, info) { // 找投资中的筛选模块--- 筛选展示Show
    console.log(info, 'setMultipleShow');
    state.home.multipleScreen.multipleShow = info;
  },
  setInvestorSearch (state, info) { // 找投资中的筛选模块--- InvestorSearch参数
    console.log(info, 'setInvestorSearch');
    state.home.investorSearch = info;
  },
  setInvestInsSearch (state, info) { // 找投资中的筛选模块--- InvestInsSearch参数
    console.log(info, 'setInvestInsSearch');
    state.home.investInsSearch = info;
  },
  setLookServicesDataList (state, info) {
    console.log(info, 'setLookServicesDataList');
    state.home.homeModules.lookServices.dataList = info;
  },
  setLookProjectDataList (state, info) { // 发现项目 接口返回数据以及刷新
    console.log(info, 'setLookProjectDataList');
    state.home.homeModules.lookProject.list = info;
  },
  setLookProjectDataSearch (state, info) { // 发现项目的筛选
    console.log(info, 'setLookProjectDataSearch');
    state.home.homeModules.lookProject.search = info;
  },
  setMeltTtDataList (state, info) {
    console.log(info, 'setMeltTtDataList');
    state.home.homeModules.meltTt.dataList = info;
  },
  setActivityDataList (state, info) {
    console.log(info, 'setActivityDataList');
    state.home.homeModules.activity.dataList = info;
  }
};
export default mutations;
