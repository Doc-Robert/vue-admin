<template>
  <div class="app-container">
    <!-- 筛查者基本信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="frontClass">筛查者基本信息</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-descriptions class="margin-top" title="" :column="4">
        <el-descriptions-item label="筛查编号">kooriookami</el-descriptions-item>
        <el-descriptions-item label="申请人">18100000000</el-descriptions-item>
        <el-descriptions-item label="年龄">苏州市</el-descriptions-item>
        <el-descriptions-item label="手机号码">
          <!-- <el-tag size="small">学校</el-tag> -->
          12312312225
        </el-descriptions-item>
        <el-descriptions-item label="申请日期">2042年23月90日</el-descriptions-item>
        <el-descriptions-item label="身份证号">2273362277083662X</el-descriptions-item>
        <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
        <el-descriptions-item label="筛查状态"> 
          <el-tag size="small">未出结果</el-tag>
          </el-descriptions-item>
        <el-descriptions-item label="筛查金额">58.8</el-descriptions-item>
        <el-descriptions-item label="条形码">xxxxx</el-descriptions-item>
        <el-descriptions-item label="所属项目">《基于互联网自取样宫颈癌筛查-管理模式的构建与应用》——邮寄样本（广州、深圳、顺德居住的居民）</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 检测报告 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="frontClass">检测报告</span>  
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <el-descriptions title="" :column="1">
        <el-descriptions-item label="筛查结果" label-class-name="my-label">
          <el-tag size="small">未出结果</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="筛查结果说明" label-class-name="my-label">18100000000</el-descriptions-item>
        <el-descriptions-item label="医生建议" label-class-name="my-label">苏州市</el-descriptions-item>
        <el-descriptions-item label="细胞结果" label-class-name="my-label">
          xxxxx
        </el-descriptions-item>
        <el-descriptions-item label="病理结果" label-class-name="my-label">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
        <el-descriptions-item label="病理总结果" label-class-name="my-label">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
      </el-descriptions>
    </el-card>


    <!-- 取样器清单 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="frontClass">筛查取样器清单</span>  
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column label="取样器名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="市场价">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="采购价" >
          <template slot-scope="scope">
            <span>{{ scope.row.purchasePrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template slot-scope="scope">
            <span>{{ scope.row.num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="金额">
          <template slot-scope="scope">
            <span>{{ scope.row.amountMoney }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import selectInfoApi from '@/api/selectInfo'
export default {
  data() {
    return {
      tableData: [{
        purchasePrice: '￥60.00', //采购价
        price:'￥58.80', // 市场价
        num:1,
        name: '阴道宫颈细胞取样刷',
        amountMoney: '￥58.80'
      },]
    }
  },
  created(){
    //获取路由里的id值
    const id = this.$route.params.id
    //调用方法，根据id查询筛查详情
     this.getSelectInfoDetails(id)
  },
  methods: {
    //获取筛查
    getSelectInfoDetails(id){
      selectInfoApi.getSelectInfoDetailsById(id)
    },
  },
}
</script>

<style>

.el-descriptions-item__label{
  font-weight:bold;
}
.frontClass{
  font-weight:bold;
}
.el-card{
  margin:20px 0;
}
.el-descriptions-item__container{
  margin:10px 0;
}
/* .el-descriptions-row{
  margin:10px 0;
} */
.my-label{
  /* margin:20px 0; */
  width: 150px;
}
</style>