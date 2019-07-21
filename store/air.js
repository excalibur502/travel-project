export const state = () => {
    return {
      infoData: {
        insurances: [],
        seat_infos: {},
        // arr_time:'',
        // dep_time:''
      },
      allPrice: 0,
      users:null
    };
}

export const mutations ={
    // 设置机票信息
    setInfoData(state,data){
        state.infoData = data;
    },
    // 设置总价格
    setAllPrice(state,price){
        state.allPrice = price;
    },
    setUsers(state,users){
        state.users = users
    }
}