<template>
    <div class="label-wrap">
        <div class="words_list_header">
            <el-button v-if="listLength<8" class="link" type="primary">
                <router-link :to="{ name: 'prizeEdit'}">新增奖品</router-link>
            </el-button>
        </div>
        <el-table
            border
            v-loading="loading"
            :data="tableData"
            >
            <el-table-column
            label="奖品名称" min-width='100' align="center" >
            <template slot-scope="scope">
                <span>{{ scope.row.giftName?scope.row.giftName:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="coverImg"
            label="奖品图片" min-width='100' align="center">
                <template slot-scope="scope">
                    <img  v-if="scope.row.imageUrl" :src="scope.row.imageUrl" alt="">
                </template>
            </el-table-column>
            <el-table-column
            label="奖品类型" min-width='100' align="center" >
            <template slot-scope="scope">
                <span v-if="scope.row.giftName != '谢谢参与'">{{ scope.row.giftType | formatGoodType}}</span>
                <span v-else>--</span>
            </template>
            </el-table-column>
            <el-table-column
            label="奖品总数(件)" min-width='100' align="center" >
            <template slot-scope="scope">
                <span v-if="scope.row.giftName != '谢谢参与'">{{ scope.row.exchangeLimit?scope.row.exchangeLimit:'--' }}</span>
                <span v-else>--</span>
            </template>
            </el-table-column>
            <el-table-column
            label="中奖概率(%)" min-width='100' align="center" >
            <template slot-scope="scope">
                <span>{{ scope.row.percentage?scope.row.percentage:0 }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="剩余数(件)" min-width='100' align="center" >
            <template slot-scope="scope">
                <span  v-if="scope.row.giftName != '谢谢参与'">{{ scope.row.exchangeLimit!='--'?scope.row.exchangeLimit-scope.row.haveExchangeCount:'--' }}</span>
                <span v-else>--</span>
            </template>
            </el-table-column>
            <el-table-column label="操作" min-width="200" fixed="right" align="center">
                <template slot-scope="scope">
                   <el-button v-if="scope.$index<=listLength-1"  class="link" type="text" size="small" style="background: #4db3ff;color: #fff;">
                     <router-link :to="{ path: 'prizeEdit', query: {id: tableData[scope.$index].id} }" style="color: #fff;padding: 7px 14px;">编辑</router-link>
                   </el-button>
                   <el-button  v-if="scope.$index<=listLength-1&&scope.row.giftName != '谢谢参与'"  @click="handleDelete(tableData[scope.$index].id)" type="text" size="small" style="background: red;color: #fff;padding: 7px 14px;">删除</el-button>    
                    <el-button v-if="scope.$index!=0&&scope.$index<=listLength-1"  size="mini"  type="success" @click="pre(tableData[scope.$index].id,1)"><i class="el-icon-arrow-up"></i></el-button>
                    <el-button v-if="scope.$index<listLength-1"  size="mini"  type="success" @click="pre(tableData[scope.$index].id,2)"><i class="el-icon-arrow-down"></i></el-button>                
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js'),
    common = require('../../common.js');
export default {
    data() {
        return {
            pageIndex:1,
            dataObj:{
                giftName:'--',
                imageUrl:'--',
                giftType:'--',
                exchangeLimit:'--',
                percentage:'--',
                haveExchangeCount:'--'
            },
            tableData: [],
            loading:true,
            listLength:''
        }
    },
    mounted(){
        this.getGiftList();
    },
    methods: {
        getGiftList(){
            this.loading = true;
            let url = CONSTANT.URL.GIFT.FINDGIFTBYPAGE,
            param={
                pageIndex:this.pageIndex,
                pageSize:10
            };
            common.requestAjax(url,param,(res)=>{
                this.loading = false;
                let data = res.data,
                    list = data.bussData;
                this.listLength = list.length;
                let num = 8-this.listLength
                console.log(8-this.listLength)
                for (var i=0;i<num;i++){
                    console.log(122)
                    list.push(this.dataObj)
                }
                this.tableData = list;
            })
        },
        search(e){
            this.pageIndex = 1;
            if(e.keyCode == 13){
                this.getGiftList();
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
                let  url = CONSTANT.URL.GIFT.DELETEGIFTBYID,
                    param = {id:id}
                common.requestAjax(url,param,(res)=>{
                    if(res.status == 200){
                        this.$message({
                            type: 'success',
                            message:res.msg
                        });
                        this.getGiftList();
                    }else{
                        this.$message({             
                            type: 'info',             
                            message: res.msg      
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
            this.getGiftList();
        },
        pre(id,type){
            let direction = type==1?'up' :'down',
                url = CONSTANT.URL.GIFT.CHANGEGIFTORDER,
                param={
                    direction:direction,
                    id:id
                };
            common.requestAjax(url,param,(res)=>{
                if(res.status == 200){
                    this.getGiftList()
                }
            })
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
            types['1000005'] = '实物奖品';
            types['1000006'] = '虚拟奖品';
            types['1000007'] = '吉分'
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
        img {
            width: 100px;
            padding-top: 10px;
            padding-bottom: 10px;
        }
    }

    .wrap-search{
        margin-bottom: 20px;
        margin-top: 20px;
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

    .el-button {
        margin-bottom: 10px;
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
