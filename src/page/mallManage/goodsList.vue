<template>
    <div class="label-wrap good-list">
        <div class="words_list_header">
            <el-button  class="link" type="primary">
                <router-link :to="{ name: 'goodEdit', params: {}}">新增商品</router-link>
            </el-button>
        </div>
        <el-row class="wrap-search">
            <div class="search-item">
                <div class="search-title">商品名称:</div>
                <el-input style="width: 200px;" class=""
                placeholder="请输入商品名称"
                v-model="goodsNameLike" ></el-input>
            </div>
             <div class="search-item">
                <div class="search-title">商品类型:</div>
                <el-select style="width: 200px;" v-model="goodsType" placeholder="请选择">
                    <el-option
                    v-for="item in goodsList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
             </div>
            <el-button  class="search-btn" type="primary" @click="getGoodList(1)">查询</el-button>
        </el-row>
        <el-table
             border
            v-loading="loading"
            :data="tableData"
            >
            <el-table-column
            label="商品名称" min-width='100' align="center" >
            <template slot-scope="scope">
                <span  style="margin-left: 10px">{{ scope.row.goodsName?scope.row.goodsName:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="coverImg"
            label="商品图片" min-width='100' align="center">
                <template slot-scope="scope">
                    <div class="pic"><img  v-if="scope.row.imageUrl" :src="scope.row.imageUrl" alt=""></div>
                </template>
            </el-table-column>
            <el-table-column
            label="商品类型" min-width='100' align="center" >
            <template slot-scope="scope">
                <span>{{ scope.row.goodsType | formatGoodType }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="所需吉分" min-width='100' align="center" >
            <template slot-scope="scope">
                <span>{{ scope.row.points?scope.row.points:0 }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="总数(件)" min-width='100' align="center" >
            <template slot-scope="scope">
                <span>{{ scope.row.exchangeLimit?scope.row.exchangeLimit:0 }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="已兑换数(件)" min-width='100' align="center" >
            <template slot-scope="scope">
                <span>{{ scope.row.haveExchangeCount?scope.row.haveExchangeCount:0 }}</span>
            </template>
            </el-table-column>
            <el-table-column label="操作" min-width='100' fixed="right" align="center">
                <template slot-scope="scope">
                   <el-button  class="link" type="text" size="small" style="background: #4db3ff;color: #fff;padding: 7px 9px;">
                     <router-link :to="{ path: 'goodEdit', query: {id: tableData[scope.$index].id} }" style="color: #fff;padding: 7px 14px;">编辑</router-link>
                   </el-button>
                   <el-button @click="handleDelete(tableData[scope.$index].id)" type="text" size="small" style="background: red;color: #fff;padding: 7px 14px;">删除</el-button>    
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
                {value:'15302',label:'虚拟商品'},
            ],
            pageIndex:1,
            pageCount: null,
            tableData: [],
            loading:true
        }
    },
    mounted(){
        this.getGoodList(1);
    },
    methods: {
        getGoodList(pageIndex){
            this.pageIndex = pageIndex;
            this.loading = true;
            let url = CONSTANT.URL.GOOD.FINDGOODSPAGE,
            param={
                goodsNameLike:this.goodsNameLike,
                goodsType:this.goodsType,
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
                this.getGoodList(1);
                this.pageIndex = 1;
            }
        },
        formDate(num){
            return common.dateFormate(num);
        },
        handleDelete(id){
            this.$confirm('确定删除?', '提示', {           
                confirmButtonText: '确定',           
                cancelButtonText: '取消',           
                type: 'warning'         
            }).then(() => {           
                let  url = CONSTANT.URL.GOOD.DELETEGOODS,
                    param = {id:id}
                common.requestAjax(url,param,(res)=>{
                    if(res.status == 200){
                        this.$message({
                            type: 'success',
                            message:res.msg
                        });
                        this.getGoodList(1);
                    }else{
                        this.$message({           
                            message: res.msg,           
                            type: 'warning'         
                        });
                    }
                }) 
   
            }).catch(() => {           
                this.$message({             
                    type: 'info',             
                    message: '已取消删除'           
                });                   
            });    
        },
        pageSizeChange(val){
            this.pageIndex = val;
            this.getGoodList(val);
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
    .words_list_header {
        padding-bottom: 15px;
        border-bottom: 1px solid #d0d0d0;
        .el-button {
            a {
                color: #fff;
            }
        }
    }

    .cell {
        text-align: center;
        .pic{
            // width: 100px;
            height: 60px;
            overflow: hidden;
            margin: 10px 0px;
            img {
                width: 100px;
                height: auto;
                
            }
        }
        
    }
    .good-list{
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
</style>
