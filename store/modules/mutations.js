/**
 * Created by 菅双鹤 on 2019/07/25.
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
};
export default mutations;
