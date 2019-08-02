/**
 * Created by 菅双�on 2019/07/25.
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
  setFinanceListData (state, info) {
    console.log(info, 'setFinanceListData');
    state.home.HomeList.finance.listData = info;
  }
};
export default mutations;
