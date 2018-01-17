<template>
    <div class="label-wrap">
        <div class="words_list_header">
            <span>
                <form :action="url" method="post" >
                    <button class="export" type="submit" >导出中奖信息</button>
                    <input type="hidden" name="ids" :value="multipleSelection" />
                </form>
            </span>
        </div>
        <el-row class="wrap-search">
            <div class="search-item">
                <div class="search-title">抽奖用户:</div>
                <el-input style="width: 200px;" class=""
                placeholder="请输入抽奖用户"
                v-model="trueName" ></el-input>
            </div>
            <div class="search-item">
                <div class="search-title">状态:</div>
                <el-select style="width: 200px;" v-model="status" placeholder="请选择" >
                    <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-item">
                <div class="search-title">奖品类型:</div>
                <el-select style="width: 200px;" v-model="giftType" placeholder="请选择" >
                    <el-option
                    v-for="item in giftList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-button @click="search" class="search-btn" type="primary">查询</el-button>
        </el-row>
        <el-table
            border
            :data="tableData"
            v-loading="loading"
            @selection-change="handleSelectionChange" 
            >
            <el-table-column  fixed="left" type="selection"  min-width='100' align="center">   
            </el-table-column>
            <el-table-column
            label="抽奖人姓名"  align="center" >
            <template slot-scope="scope">
                <span @click="linkToWeb(scope.row.userId)"  style="margin-left: 10px;color:#20a0ff;cursor:pointer">{{ scope.row.trueName?scope.row.trueName:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="抽奖人昵称"  align="center" >
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
            label="手机号"  align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.mobile?scope.row.mobile:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="抽奖时间" align="center" >
            <template slot-scope="scope">
                <span>{{ scope.row.gmtCreated?formDate(scope.row.gmtCreated):'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="抽奖结果" align="center" >
            <template slot-scope="scope">
                <span>{{ scope.row.giftName?scope.row.giftName:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="奖品类型" align="center">
            <template slot-scope="scope">
                <span v-if="scope.row.giftName != '谢谢参与'">{{ scope.row.giftType | formatGiftType}}</span>
                <span v-else>--</span>
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
            label="状态"  align="center" >
            <template slot-scope="scope">
                <span v-if="scope.row.giftName != '谢谢参与'">{{ scope.row.status | formatStatus}}</span>
                <span v-else>--</span>
            </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button 
                        type="primary"
                        size="small" class="btn-wrap"
                        v-if="scope.row.status == '15402'&&scope.row.giftName != '谢谢参与'"
                        @click="send(scope.row.id)">发放</el-button>                
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
             :current-page='pageIndex'
            v-if="pageCount"
            layout="prev, pager, next"
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
            dialogTableVisible:false,
            trueName:'',
            giftType:'',
            giftList:[
                {value:'',label:'全部'},
                {value:'1000005',label:'实物奖品'},
                {value:'1000006',label:'虚拟奖品'},
                {value:'1000007',label:'吉分'}
            ],
            status:'',
            loading:true,
            statusList:[
                {value:'',label:'全部'},
                {value:'15401',label:'已发放'},
                {value:'15402',label:'未发放'},
            ],
            pageIndex:1,
            sexArr:['未知','男','女'],
            pageCount: null,
            tableData: [],
            url:'',
            multipleSelection:[]
        }
    },
    mounted(){
        this.getlotteryList();
        let id = common.getCookie('sessionId');
        this.url = 'https://glocalme.icebartech.com/api/admin/gift/giftExchangeList2Excel?sessionId='+id;
    },
     methods: {
        getlotteryList(){
            this.loading = true;
            let url = CONSTANT.URL.GIFT.FINDGIFTEXCHANGEBYPAGE,
            param={
                trueName:this.trueName,
                giftType:this.giftType,
                status:this.status,
                pageIndex:this.pageIndex,
                pageSize:10
            };

            common.requestAjax(url,param,(res)=>{
                this.loading = false;
                let data = res.data;
                this.tableData = data.bussData;
                this.pageCount = data.pageCount*10;
            })
        },
        linkToWeb(val){
            this.$router.push({ path: '/', query: { id:val }})
        },
        handleSelectionChange(val) {
            let Ids = [];
            val.forEach(function(item){ 
                Ids.push({id:item.id})
            })
           this.multipleSelection = Ids.length?JSON.stringify(Ids):[];
        },
        search(e){
            this.pageIndex = 1;
            this.getlotteryList();
        },
        formDate(num){
            return common.dateFormate(num);
        },
        send(id){
            this.$confirm('确定发放该奖品?', '提示', {           
                confirmButtonText: '确定',           
                cancelButtonText: '取消',           
                type: 'warning'         
            }).then(() => {           
               let  url = CONSTANT.URL.GIFT.CHANGEGIFTSTATUS,
                    param = {id:id}
                common.requestAjax(url,param,(res)=>{
                    if(res.status == 200){
                        this.$message({
                            type: 'success',
                            message:'发放该奖品成功!'
                        });
                        this.getlotteryList();
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
            this.getlotteryList();
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
        formatGiftType(value){
            var types = [];
            types['1000005'] = '实物奖品';
            types['1000006'] = '虚拟奖品';
            types['1000007'] = '吉分';
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
    }
    .words_list_header{
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
            margin-top: 20px;
            float: left;
            margin-right: 20px;
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
            float: left;
            margin-top: 20px;
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
        margin-bottom: 20px;
    }
</style>
