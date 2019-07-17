<template>
  <div class="Sizer">
    <el-row type="flex" class="filters-top" align="middle" justify='space-between'>
      <el-col :span="8">
        <span>单程：{{data.info.departCity}} - {{data.info.destCity}} / {{data.info.departDate}}</span>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model='airport' placeholder="起飞机场">
          <el-option v-for="(item,index) in data.options.airport" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
          <el-select size="mini" v-model='flightTimes' placeholder="起飞时间">
          <el-option v-for="(item,index) in data.options.flightTimes" :key="index" :label='`${item.from}:00 - ${item.to}:00`' :value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
          <el-select size="mini" v-model='company' placeholder="航空公司">
          <el-option v-for="(item,index) in data.options.company" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
          <el-select size="mini" v-model='airSize' placeholder="机型">
          <el-option v-for="(item,index) in airSizeoptions" :key="index" :label="item.name" :value="item.size"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="revocation">
        筛选: <button>
                撤销
            </button>    
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            airport:'',
            flightTimes:'',
            company:'',
            airSize:'',
            airSizeoptions:[
                {name:'大',size:'L'},
                {name:'中',size:'M'},
                {name:'小',size:'S'},
            ]
        }
    },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  methods: {
        // 选择机场时候触发
        handleAirport(value){
            
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
            
        },

         // 选择航空公司时候触发
        handleCompany(value){
            
        },

         // 选择机型时候触发
        handleAirSize(value){
           
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            
        },
    }
};
</script>

<style scoped lang="less">
.Sizer{
    .filters-top{
        margin-bottom: 10px;
        /deep/ .el-select{
            margin-left: 10px;
        }
    }
    .revocation{
        margin-bottom: 20px;
        button{
            width: 50px;
            height: 25px; 
            font-size: 12px;
            color:#409eff;
            background: #ecf5ff; 
            border:1px solid #409eff;
            border-radius:25px;
            &:hover{
                background: #409eff;
                color:#fff;
            }
        }
    }
}
</style>
