<template>
  <div class="app-container">
    <div class="filter-container">
      <template>
        <el-date-picker
          class="filter-item"
          v-model="listQuery.dateSelect"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <el-select v-model="listQuery.result" placeholder="结果查询" clearable style="width: 150px;" class="filter-item">
          <el-option v-for="item in resultOptions" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <el-select v-model="listQuery.status" placeholder="状态查询" clearable class="filter-item" style="width: 150px;">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <!-- @keyup.enter.native="handleFilter"  v-model="listQuery.title"-->
        <el-input placeholder="请输入搜索内容"  style="width: 200px;" class="filter-item" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilterSearch">查询</el-button>
        <!-- <div class="export"> -->
          <el-button v-waves :loading="downloadLoading" style="margin-left:10px" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出excel</el-button>
        <!-- </div> -->
      </template>
    </div>
      <!-- <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @sort-change="sortChange"> -->
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      >
      <el-table-column label="序号" align="center" width="70px" type="index">
      </el-table-column>
      <el-table-column label="编号" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请日期" align="center" min-width="160px">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" width="90px">
        <template slot-scope="scope">
            <span>{{ scope.row.name}}</span>
          <!-- <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.title }}</span>
          <el-tag>{{ scope.row.name | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="70px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" class-name="status-col" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
          <!-- <el-tag :type="scope.row.phone | statusFilter">{{ scope.row.status }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="身份证号" class-name="status-col" width="220" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
          <!-- <el-tag :type="scope.row.phone | statusFilter">{{ scope.row.status }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="筛查结果" class-name="status-col" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.result === null ? '未出结果' : scope.row.result === "0" ?'阳性':'阴性' }}</span>
          <!-- <el-tag :type="scope.row.phone | statusFilter">{{ scope.row.status }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="筛查状态" class-name="status-col" width="250" align="center" >
        <template slot-scope="scope" >
          <el-select placeholder="选择状态" :value="getStatus(scope.row.status)" @change="updateStatus($event,scope.row.id)">
            <el-option 
              v-for="item in statusOptions"
              :key="item.value" 
              :label="item.label"
              :value="item.value">  
            </el-option>
          </el-select>
        </template>
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="操作" align="center" width="500" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <router-link :to="'/selectInfo/listInfo/details/'+scope.row.id"> -->
            <el-button type="info" size="mini" @click="selectInfoDetails(scope.row.id)">详情</el-button>
          <!-- </router-link>   -->
          <el-button size="mini" type="success" @click="Test">
            输入筛查结果
          </el-button>
          <el-button size="mini" type="primary" @click="Test()">
            打印条形码
          </el-button>
          <el-button size="mini" type="warning" @click="Test()">
            打印地址
          </el-button>
          <el-button size="mini" type="danger" @click="Test()">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
<!-- current-page:当前页，@current-change:切换下一页的方法 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="changeInfoList"
    />
  </div>
</template>

<script>
import selectInfoApi from '@/api/selectInfo'
import waves from '@/directive/waves' // Waves directive
export default {
    directives: { waves }, //注册
    data() {
      return {
        tableKey: 0,
        listLoading: true, //页面是否正在加载
        downloadLoading: false, //导出加载
        list:null, //数据列表
        // value: '' ,//选框中已被选中的值
        // 选项数据
        // 状态筛选选项
        statusOptions: [{ 
            value: '0',
            label:'未受理',
          },{
            value: '1',
            label:'已受理',
          },{
            value: '2',
            label:'材料已寄出',
          },{
            value: '3',
            label:'检测中',
          },{
            value: '4',
            label:'检测结果已发布',
          },],
        //结果筛选选项
        resultOptions:[
          {value:'0',label:'阳性'},
          {value:'1',label:'阴性'},
          {value:null,label:'未出结果'}
        ],
        //分页对象
        current: 1 , //当前页
        limit: 12, //每页显示的记录数
        total: 0, //总记录数
        //搜索对象
        listQuery: {
          dateSelect: undefined,
          result: undefined,
          status: undefined,
        },


      }
    },
    //页面渲染前调用
    created() {
      this.getInfoList()
    },
    //计算属性
    // computed: {
    // },
    //监听
    // watch :{
    //   listLoading(){
    //     document.body.scrollTop = 0
    //     document.documentElement.scrollTop = 0
    //   }
    // },
    //调用方法
    methods:{
      //获取list数据
      getInfoList(page = 1){
        this.current = page
         const params = {page:page}
        selectInfoApi.getSelectInfoList(params).then(response =>{
          console.log(response);
          this.list = response.data.page.content
          console.log("收到数据：",this.list);
          this.total = response.data.page.totalElements
          console.log("Total:",this.total);
        })
        this.listLoading = false
      },
      //分页点击
      changeInfoList(page){
        this.listLoading = true
        setTimeout(()=>{
          this.getInfoList(page)
        },500)
      },
      //修改状态
      updateStatus(event,id){
        const updateParams = {id:id, status:event}
        selectInfoApi.updateItemByStatus(updateParams).then(response =>{
          console.log("修改后的结果集",response);
          this.getInfoList()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      },
      //状态转换
      getStatus(status){
        let statusVal = '';
        switch(status){
          case "0":
            //这里是值对应的处理
            console.log("chong进来了");
            statusVal = "未受理"
            break
          case "1":
            statusVal = "已受理"
            break
          case "2":
            statusVal = "材料已寄出"
            break
          case "3":
            statusVal = "检测中"
            break
          case "4":
            statusVal = "检测结果已发布"
            break
          default:
            //这里是没有找到对应的值处理
            statusVal = "未查到对应数据"
            break
        }
        return statusVal; 
      },
      //导出方法
      handleDownload(){
        this.listLoading = true
        console.log("导出excel");
      },
      //搜索方法
      handleFilterSearch(){
        console.log("搜索某东西");
      },
      //页面详情 切换跳转
      selectInfoDetails(id){
        this.$router.push('/selectInfo/listInfo/details/'+id)
      },
      Test(){
        console.log("click a button!");
      }

    },
}
</script>

<style scoped>
.filter-container {
  padding-bottom: 10px;
  display: flex;

}
.filter-item {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 10px;
  margin-right: 20px;
}
.export{
  width: 100%;
}
.el-button+.el-button {
  margin-left: 10px;
}
</style>        