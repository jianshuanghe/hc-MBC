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
  setHome (state, info) {
    console.log(info, 'setHome');
    state.home.tabItems = info;
  },
  setHomeListTitleIndex (state, info) {
    console.log(info, 'setHomeListTitleIndex');
    state.home.HomeList.titleIndex = info;
  },
  setFinance (state, info) {
    console.log(info, 'setFinance');
    state.home.HomeList.finance = info;
  },
  setInvest (state, info) {
    console.log(info, 'setInvest');
    state.home.HomeList.invest = info;
  },
  // 我的=》用户信息
  setheader(state, info){
	  console.log(info,'setheader')
	  state.my.MyList.header=info
  },
};
export default mutations;
