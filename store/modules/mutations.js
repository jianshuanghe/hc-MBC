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
  setAreaData (state, info) {
    console.log(info, 'setAreaData');
    state.areaData = info;
  },
  setHome (state, info) {
    console.log(info, 'setHome');
    state.home.tabItems = info;
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
  setLookProjectDataList (state, info) {
    console.log(info, 'setLookProjectDataList');
    state.home.homeModules.lookProject.dataList = info;
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
