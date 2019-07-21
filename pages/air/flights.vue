<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsSizer :data="cacheFlightDate" @changeFlight='changeFlight' />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item, index) in dataList" :key="index" :data="item" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside/>
      </div>
    </el-row>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[ 5, 10, 20, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsSizer from "@/components/air/flightsSizer.vue";
import FlightsAside from "@/components/air/flightsAside.vue";

export default {
  components: {
    FlightsItem,
    FlightsListHead,
    FlightsSizer,
    FlightsAside
  },
  computed: {
    dataList() {
      return this.flightData.flights.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  },
  data() {
    return {
        // 航班总数据
      flightData: {
        flights: [],
        info: {},
        options: {}
      },
      // 用于缓存大数据，一旦赋值之后不能被修改
      cacheFlightDate: {
        flights: [],
        info: {},
        options: {}
      }, 
      //   dataList: [], // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
      total: 0,
      pageSize: 5,
      currentPage: 1
    };
  },
  watch:{
    // 侦听器和导航守卫都能实现当前页面跳转
    // $route(){
    //   this.getFlightDate();
    // }
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    next();
    this.getFlightDate();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      //   this.setDataList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //   this.setDataList();
    },
    // 传递给子组件的事件，带回的参数替换掉flights
    changeFlight(arr) {
        this.total = arr.length;
        this.currentPage = 1;
      this.flightData.flights = arr;
    },
    // 获取机票列表数据
    getFlightDate() {
        this.currentPage = 1;
      this.$axios({
        url: "/airs",
        params: this.$route.query // 来自URL的5个参数
      }).then(res => {
        console.log(res);
        this.flightData = res.data;
        this.cacheFlightDate = { ...res.data };
        //   this.setDataList();
        this.total = this.flightData.flights.length;
      });
    }
    // setDataList() {
    //   this.dataList = this.flightData.flights.slice(
    //     (this.currentPage - 1) * this.pageSize,
    //     this.currentPage * this.pageSize
    //   );
    // }
  },
  mounted() {
      this.getFlightDate();
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>