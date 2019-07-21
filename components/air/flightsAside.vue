<template>
  <div class="flight-aside">
    <div class="statement">
      <div class="aside_head">
        <div class="aside_icon">
          <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
          <span>航协认证</span>
        </div>
        <div class="aside_icon">
          <i class="iconfont iconbaozheng" style="color:green;"></i>
          <span>出行保证</span>
        </div>
        <div class="aside_icon">
          <i class="iconfont icondianhua" style="color:#409EFF;"></i>
          <span>7x24</span>
        </div>
      </div>
      <div class="aside_phone">
          免费客服电话：4006345678转2
      </div>
    </div>
    <div class="history">
        <h4>
            历史查询
        </h4>
        <div class="aside_content">
            <nuxt-link :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`"  v-for="(item,index) in airs" :key="index">
                <div class="history_item">
                    <div class="air_info">
                        <div>{{item.departCity}} - {{item.destCity}}</div> 
                        <p>{{item.departDate}}</p>
                    </div>
                    <span>选择</span>
                </div>
            </nuxt-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
      return {
        airs:[]
      }
    },
    mounted(){
      this.airs = JSON.parse(localStorage.getItem('airs') || []);
      if(this.airs.length > 5){
        this.airs.length = 5;
      }
      console.log(this.airs,'flightsAside')
    }
};
</script>

<style <style lang="less" scoped>
.flight-aside {
  .statement {
      border: 1px #ddd solid;
    .aside_head {
      display: flex;
      justify-content: space-between;
          margin:10px 20px;
      .aside_icon {
          text-align: center;
        i {
          display: block;
          font-size: 40px;
          margin-bottom: 5px;
        }
        span {
          display: block;
          font-size: 12px;
          
        }
      }
    }
    .aside_phone{
        font-size: 14px;
        background: #f6f6f6;
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
    }
  }
  .history{
      border: 1px #ddd solid;
      margin-top: 10px;
      padding:10px;
      h4{
        //   margin:10px;
          border-bottom: 1px solid #ddd;
          font-weight: normal;
          padding-bottom: 10px;
      }
      .aside_content{
          .history_item{
              display: flex;
              justify-content: space-between;
              margin: 10px 0 20px;
              position: relative;
              .air_info{
                  color: #000;
                  div{
                      font-size: 14px;
                      margin-bottom: 5px;
                  }
                  p{
                      font-size: 10px;
                  }
              }
              span{
                  position: absolute;
                  top: 12px;
                  right:0;
                  display: block;
                  font-size: 14px;
                  background: #ffa500;
                  color: #fff;
                  border-radius: 5px;
                  height: 20px;
                  padding: 0 10px;
              }
              &:hover{
                  
              }
          }
      }
  }
}
</style>
