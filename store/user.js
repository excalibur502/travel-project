// nuxt已经把store（vuex）关联到应用，只需要维护各个模块，
// 每个模块下面通常需要暴露三个属性
// 用户管理

// state: 存数据
export const state = () => ({
  // 采用接口返回的数据结构
  userInfo: {
    token: "",
    user: {}
  }
});
// mutations：同步设置修改state的数据
export const mutations = {
  // 设置用户的数据
  setUserInfo(state, data) {
    state.userInfo = data;
  },
//   清除用户数据
  clearUserInfo(state) {
    state.userInfo = {
      token: "",
      user: {}
    }
  }
}
// actions: 异步设置修改state的数据
export const actions = {
    login({commit},data) {
        // 登录接口
        this.$axios({
            url:'/accounts/login',
                  method:'POST',
                  data
              }).then(res => {
                  // console.log(res,'loginres')
                if(res.status === 200){
                    commit('setUserInfo',res.data);
                }else {
                    this.message.warning('用户名或密码不正确')
                }
        })
    },
//     register({commit},data) {
//       this.axios({
//         url: "/accounts/register",
//         method:'POST',
//         data
//       }).then(res => {
//         console.log(res)
//         if(res.status === 200) {
//         }
//       })
//     }
};
