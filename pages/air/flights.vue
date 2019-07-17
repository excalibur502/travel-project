<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsSizer :data="flightData" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item, index) in dataList" :key="index" :data="item" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 2, 3, 10]"
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

export default {
  components: {
    FlightsItem,
    FlightsListHead,
    FlightsSizer
  },
  data() {
    return {
      flightData: {
        flights: [],
        info: {},
        options: {}
      }, // 航班总数据
      dataList: [], // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
      total: 0,
      pageSize: 3,
      currentPage: 1
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.setDataList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.setDataList();
    },
    setDataList() {
      this.dataList = this.flightData.flights.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query // 来自URL的5个参数
    }).then(res => {
      console.log(res);
      this.flightData = res.data;
      this.setDataList();
      this.total = this.flightData.flights.length;
    });
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