<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form :model="airForm" class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="airForm.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="airForm.destCity "
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="airForm.departDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      airForm: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      }
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$confirm("网页版暂不支持往返功能,请下载手机客户端", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      }
    },
    querySearch(value) {
      return new Promise((resolve, reject) => {
        if (!value) {
          resolve([]);
          return;
        }
        this.$axios({
          url: "/airs/city",
          params: {
            name: value
          }
        }).then(res => {
          // console.log(res.data.data, "/air/city");
          const { data } = res.data;

          // 给数组中的对象添加value
          const arr = data.map(v => {
            v.value = v.name.replace("市", "");
            return v;
          });
          resolve(arr);
        });
      });
    },

    // 出发城市输入值发生改变的时候触发
    // value: 输入框的值
    // cb： 回调函数，这个回调函数是必须要要调用，
    // cb函数必须要接收一个数组，数组中每一项必须是对象, 对象中必须要有value属性
    // 这里async await 的用法相当于下面.then
    async queryDepartSearch(value, cb) {
      const res = await this.querySearch(value);
        if(res.length > 0){
          this.airForm.departCity = res[0].value;
          this.airForm.departCode = res[0].sort;
        }
        cb(res);
      },

      // if (!value) {
      //   cb([]);
      //   return;
      // }
      // this.$axios({
      //   url: "/airs/city",
      //   params: {
      //     name: value
      //   }
      // }).then(res => {
      //   console.log(res.data.data, "/air/city");
      //   const { data } = res.data;

      //   // 给数组中的对象添加value
      //   const arr = data.map(v => {
      //     v.value = v.name.replace("市", "");
      //     return v;
      //   });
      //   // 默认选中第一行
      //   this.airForm.departCity = arr[0].value;
      //   this.airForm.departCode = arr[0].sort;
      //   cb(arr);
      // });
    

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
           this.querySearch(value).then(res => {
        if(res.length > 0){
          this.airForm.destCity = res[0].value;
          this.airForm.destCode = res[0].sort;
        }
        cb(res);
      })
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      // console.log(this.airForm)
      this.airForm.departCode = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.airForm.destCode = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      this.airForm.departDate = moment(value).format("YYYY-MM-DD");
      // console.log(this.airForm);
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.airForm;
      this.airForm.departCity = destCity;
      this.airForm.departCode = destCode;
      this.airForm.destCity = departCity;
      this.airForm.destCode = departCode;
    },

    // 提交表单时触发
    handleSubmit() {
      const rules = {
        departCity: {
          value: this.airForm.departCity,
          message: "请选择出发城市"
        },
        departCode: {
          value: this.airForm.departCode,
          message: "请选择出发城市"
        },
        destCity: {
          value: this.airForm.destCity,
          message: "请选择目标城市"
        },
        destCode: {
          value: this.airForm.destCode,
          message: "请选择目标城市"
        },
        departDate: {
          value: this.airForm.departDate,
          message: "请选择出发时间"
        }
      }
      // 表单验证结果
      let valid = true;

      Object.keys(rules).forEach(v => {
        if (!valid) return;
        if (!rules[v].value) {
          valid = false;
          this.$confirm(rules[v].message, "提示", {
            confirmButtonText: false,
            showCancelButton: "确定",
            type: "warning"
          });
          return;
        }
      });

      // 跳转
      if (valid) {
        this.$router.push({
          path: "/air/flights",
          query: this.airForm
        });
      }
    }
  },
  mounted() {}
}
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>