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
  // 第一个参数默认是state
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
// 第一个参数默认是store对象
export const actions = {
         login({ commit }, data) {
           // 登录接口
           return this.$axios({
             url: "/accounts/login",
             method: "POST",
             data
           }).then(res => {
             // console.log(res,'loginres')
             if (res.status === 200) {
               commit("setUserInfo", res.data);
             }
             return res;
           });
         },
         register({ commit }, data) {
           return this.$axios({
             url: "/accounts/register",
             method: "POST",
             data
           })
             .then(res => {
               console.log(res, "res");
               if (res.status === 200) {
                 commit("setUserInfo", res.data);
                 this.$router.back();
               }
               return res;
             })
             .catch(err => {
               console.log(err, "err");
             });
         },
         sendCode(store,phoneNumber) {
                 return this.$axios({
                   url: "/captchas",
                   method: "POST",
                   data: {
                     tel: phoneNumber
                   }
                 })
                   .then(res => {
                     console.log(res);
                     if (res.status === 200) {
                       const {code} = res.data;
                       return code;
                     }
                   })
                   .catch(err => {
                     return err;
                   });
         }
       };
