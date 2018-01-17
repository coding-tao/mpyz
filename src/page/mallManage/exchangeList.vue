<template>
    <div class="label-wrap">
        <div class="words_list_header">
            <span>
                <form :action="url" method="post" >
                    <button class="export" type="submit" >导出兑换信息</button>
                    <input type="hidden" name="ids" :value="multipleSelection" />
                </form>
            </span>
        </div>
        <el-row class="wrap-search">
            <div class="search-item">
                <div class="search-title">商品名称:</div>
                <el-input style="width: 200px;" class=""   @keyup.enter.native="search"
                placeholder="请输入商品名称"
                v-model="goodsNameLike" ></el-input>
            </div>
            <div class="search-item">
                <div class="search-title">状态:</div>
                <el-select style="width: 200px;" v-model="status" placeholder="请选择" @change="getExchangeList(1)">
                    <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-item">
                <div class="search-title">商品类型:</div>
                <el-select style="width: 200px;" v-model="goodsType" placeholder="请选择" @change="getExchangeList(1)">
                    <el-option
                    v-for="item in goodsList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-button  class="search-btn" type="primary" @click="getExchangeList(1)">查询</el-button>
        </el-row>
        <el-table
             border
              @selection-change="handleSelectionChange" 
            v-loading="loading"
            :data="tableData"
            >
            <el-table-column align="center"  fixed="left" type="selection">   
            </el-table-column>
            <el-table-column
            label="兑换人姓名" align="center" >
            <template slot-scope="scope">
                <span @click="linkToWeb(scope.row.userId)"  style="margin-left: 10px;color:#20a0ff;cursor:pointer">{{ scope.row.trueName?scope.row.trueName:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="兑换人昵称"  align="center" >
            <template slot-scope="scope">
                <span>{{ scope.row.nickName?scope.row.nickName:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="性别"  align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.sex?sexArr[scope.row.sex]:'--' }}</span>
                </template>
            </el-table-column>
            <el-table-column
            label="手机号" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.mobile?scope.row.mobile:'--' }}</span>
                </template>
            </el-table-column>
            <el-table-column
            label="商品名称" align="center" >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.goodsName?scope.row.goodsName:'--' }}</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="imageUrl"
            label="商品图片"align="center">
                <template slot-scope="scope">
                    <img  v-if="scope.row.imageUrl" :src="scope.row.imageUrl" alt="">
                </template>
            </el-table-column>
            <el-table-column
            label="商品类型" align="center" >
            <template slot-scope="scope">
                <span>{{ scope.row.goodsType | formatGoodType}}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="兑换时间" align="center" >
            <template slot-scope="scope">
                <span>{{ scope.row.exchangeTime?formDate(scope.row.exchangeTime):'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="所在地" align="center" >
            <template slot-scope="scope">
                <span>{{ scope.row.location?scope.row.location:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="详细地址" align="center" >
            <template slot-scope="scope">
                <span>{{ scope.row.address?scope.row.address:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="绑定吉客猫账号" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.userNameInGM?scope.row.userNameInGM:'--' }}</span>
                </template>
            </el-table-column>
            <el-table-column
            label="状态" align="center" >
            <template slot-scope="scope">
                <span>{{ scope.row.status | formatStatus}}</span>
            </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="small" class="btn-wrap"
                        v-if='scope.row.status == "15402"'
                        @click="send(scope.row.id)">发放</el-button> 
                                 
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
            v-if="pageCount"
            layout="prev, pager, next"
             :current-page='pageIndex'
            :total="pageCount" @current-change="pageSizeChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js'),
    common = require('../../common.js');
export default {
    data() {
        return {
            goodsNameLike:'',
            goodsType:'',
            goodsList:[
                {value:'',label:'全部'},
                {value:'15301',label:'实物商品'},
                {value:'15302',label:'虚拟商品'}
            ],
            status:'',
            statusList:[
                {value:'',label:'全部'},
                {value:'15401',label:'已发放'},
                {value:'15402',label:'未发放'},
            ],
            pageIndex:1,
            sexArr:['未知','男','女'],
            loading:true,
            pageCount: '',
            tableData: [],   
            url:'',
            multipleSelection:[]
        }
    },
    mounted(){
        this.getExchangeList(1);
        let id = common.getCookie('sessionId');
        this.url = 'https://glocalme.icebartech.com/api/admin/goods/goodsExchangeList2Excel?sessionId='+id;
    },
    methods: {
        linkToWeb(val){
            this.$router.push({ path: '/', query: { id:val }})
        },
        getExchangeList(pageIndex){
            this.pageIndex = pageIndex;
            this.loading = true;
            let url = CONSTANT.URL.GOOD.FINDEXCHANGE,
            param={
                goodsNameLike:this.goodsNameLike,
                goodsType:this.goodsType,
                status:this.status,
                pageIndex:pageIndex,
                pageSize:10
            };

            common.requestAjax(url,param,(res)=>{
                this.loading = false;
                let data = res.data;
                this.tableData = data.bussData;
                this.pageCount = data.pageCount*10;
            })
        },
        search(e){
            if(e.keyCode == 13){
                this.getExchangeList(1);
                this.pageIndex = 1;
            }
        },
        formDate(num){
            return common.dateFormate(num);
        },
        handleSelectionChange(val) {
            let Ids = [];
            val.forEach(function(item){ 
                Ids.push({id:item.id})
            })
            this.multipleSelection = Ids.length?JSON.stringify(Ids):[];
        },
        send(id){
            this.$confirm('确定发放该商品?', '提示', {           
                confirmButtonText: '确定',           
                cancelButtonText: '取消',           
                type: 'warning'         
            }).then(() => {           
               let  url = CONSTANT.URL.GOOD.CHANGEGOODSTATUS,
                    param = {id:id}
                common.requestAjax(url,param,(res)=>{
                    if(res.status == 200){
                        this.$message({
                            type: 'success',
                            message:'发放该商品成功!'
                        });
                        this.getExchangeList(1);
                    }
                    else{
                        this.$message({
                          type: 'warning',
                          message: res.msg
                        }); 
                    }

                })      
            }).catch(() => {           
                this.$message({             
                    type: 'info',             
                    message: '已取消发放!'           
                });                   
            });    
        },
        pageSizeChange(val){
            this.pageIndex = val;
            this.getExchangeList(val);
        }
    },
    filters:{
        formatStatus(value){
            var status = [];
            status['15401'] = '已发放';
            status['15402'] = '未发放';
            if(value){
                return status[value];
            }
            else{ return '--'};
        },
        formatGoodType(value){
            var types = [];
            types['15301'] = '实物商品';
            types['15302'] = '虚拟商品';
            if(value){
                return types[value];
            }
            else{ return '--'};
        },
        
    }
    
}
</script>
<style lang="scss" scoped>
    .el-table td, .el-table th.is-leaf {
        text-align: center;
    }
    .el-input__inner{
        width: 200px;
    }
    .cell {
            text-align: left;
            span{
                margin-left: 0px;
            }
        }
    .cell {
        text-align: center;
        img {
            width: 60px;
            padding-top: 10px;
            padding-bottom: 10px;
        }
    }
    .words_list_header{
        padding-bottom: 15px;
        border-bottom: 1px solid #d0d0d0;
    }
    .isAuditing{
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background-color: #ff4949;
        color: #fff;
        border-radius: 50%;
        display: inline-block;
    }

    .entryNumber{
        color: #50bfff;
        cursor: pointer;
    }

    .questionNumber{
        color: #50bfff;
        cursor: pointer;
    }

    .avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-top: 10px;
    }
    .wrap-search{
        margin-bottom: 20px;
        .search-item{
            float: left;
            margin-right: 20px;
             margin-top: 20px;
        }
        button{
            float: left;
            margin-top: 20px;
        }
        .search-title{
            display: inline;
            width: 100px;
            height: 36px;
            line-height: 36px;
            text-align: right;
            margin-bottom: 20px;
            margin-right: 10px;
        }
        button{
            margin-left: 20px;
        }
    }

    .pagination {
        text-align: center;
        width: 80%;
        margin-top: 60px;
    }
    .foot{
        padding-bottom: 30px;
    }
    .exchangeName{
        color: #50bfff;
        cursor: pointer;
    }
    .btn-wrap{
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .export{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        padding: 8px 10px;
        background: #fff;
        border-radius: 4px;
        border: 1px solid #c4c4c4;
        color: #fff;
        background-color: #20a0ff;
        border-color: #20a0ff;
    }
</style>
