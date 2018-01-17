<template>
    <div class="label-wrap level-list">
        <div class="words_list_header">
            <span>
                <form :action="url" method="post" >
                    <button class="export" type="submit" >导出会员信息</button>
                    <input type="hidden" name="ids" :value="multipleSelection" />
                </form>
            </span>
        </div>
        <el-row class="wrap-search">
            <div class="search-item">
                <div class="search-title">昵称:</div>
                <el-input style="width: 200px;" class=""   @keyup.enter.native="search"
                placeholder="请输入昵称"
                v-model="nicknameLike" ></el-input>
            </div>
            <div class="search-item">
                <div class="search-title">姓名</div>
                <el-input style="width: 200px;" class=""   @keyup.enter.native="search"
                placeholder="请输入姓名"
                v-model="trueNameLike" ></el-input>
            </div>
            <div class="search-item">
                <div class="search-title">手机号:</div>
                <el-input style="width: 200px;" class=""   @keyup.enter.native="search"
                placeholder="请输入手机号"
                v-model="mobileLike" ></el-input>
            </div>

            <el-button  class="search-btn" type="primary" @click="getUserList(1)">查询</el-button>
        </el-row>
        <el-table
            :data="tableData"
            v-loading="loading"
            @selection-change="handleSelectionChange" 
            border
            @sort-change="sort"
            style="width: 100%"
            >
            <el-table-column  fixed="left" type="selection"  min-width='100' align="center">   
            </el-table-column>
            <el-table-column
            label="昵称" min-width='100' align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.nickname?scope.row.nickname:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="姓名"  min-width='100' align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.trueName?scope.row.trueName:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="头像"  min-width='100' align="center">
            <template slot-scope="scope">
                <span><img class="avatar" :src="scope.row.imageUrl" alt=""></span>
            </template>
             </el-table-column>
            <el-table-column
            label="性别"  min-width='100' align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.sex?sexArr[scope.row.sex]:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="手机号"  min-width='100' align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.mobile?scope.row.mobile:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="生日"  min-width='100' align="center">
            <template slot-scope="scope">
                <span>{{scope.row.birthday?formDate(scope.row.birthday):'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="所在地" align="center" min-width='100'>
            <template slot-scope="scope">
                <span>{{ scope.row.province?scope.row.province:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="详细地址"  min-width='100' align="center">
            <template slot-scope="scope">
                <span >{{ scope.row.addressSend?scope.row.addressSend:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="吉分"  sortable='custom' min-width='100' align="center"  >
            <template slot-scope="scope">
                <span>{{ scope.row.points?scope.row.points:0 }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="绑定吉客猫账号" min-width='120' align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.glocalmeUserName?scope.row.glocalmeUserName:'--' }}</span>
            </template>
            </el-table-column>
            <el-table-column
                label="操作"
                fixed="right"
                min-width='100'
                 align="center"
                >
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="small"  class="btn-wrap"
                        @click="modalShow(scope.row)">增减吉分</el-button>
                </template>
            </el-table-column>
        </el-table>
            <el-pagination
            v-if="pageCount"
            layout="prev, pager, next"
            :current-page='pageIndex'
            :total="pageCount" @current-change="pageSizeChange">
            </el-pagination>
            <div class="confirm_dialog" >
                <el-dialog title="增减吉分" :visible.sync="dialogTableVisible">
                    <el-form :model="form">
                        <el-form-item label="*增减吉分:" :label-width="formLabelWidth">
                            <el-col :span="14">
                                <el-input placeholder="请输入正数" :maxlength='7' v-model="num" auto-complete="off"></el-input>
                                *正数增加，负数减少
                            </el-col>
                        </el-form-item>
                        <el-form-item label="备注:" :label-width="formLabelWidth">
                            <el-col :span="14">
                                <el-input placeholder="例如：线下活动" :maxlength='10' v-model="contentText" auto-complete="off"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <el-col class="foot" :span="14" :offset="11">
                        <el-button type="primary" @click="confirmBtn">确 定</el-button>
                        <el-button @click="dialogTableVisible = false">取 消</el-button>
                    </el-col>
                </el-dialog>
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
            formLabelWidth:'320px',
           
            form: {
                name: ''
            },
            titleModal:'新增标签',
            id:'',
            trueNameLike:'',
            mobileLike:'',
            loading:true,
            nicknameLike:'',
            sexArr:['未知','男','女'],
            pageIndex:1,
            pageCount: '',
            tableData: [],
            contentText:'',
            num:'',
            url:'',
            points:'',
            pointsLike:1,
            multipleSelection: [],
            userId:''
        }

    },
    created(){
        this.userId = this.$route.query.id;
    },
    mounted () {
        this.getUserList(1);
        let id = common.getCookie('sessionId');
        this.url = 'https://glocalme.icebartech.com/api/admin/weixinuser/weixinUserCoreList2Excel?sessionId='+id;
    },
    methods: {
        sort(d,f){
            this.pointsLike = this.pointsLike? 0 :1;
            this.getUserList(1);
            this.pageIndex = 1;
        },
        formDate(num){
            return common.dateFormate(num,'birth');
        },
        handleSelectionChange(val) {
            let Ids = [];
            val.forEach(function(item){ 
                Ids.push({id:item.id})
            })
            this.multipleSelection = Ids.length?JSON.stringify(Ids):[];
           
        },
        getUserList(pageIndex){
            this.pageIndex = pageIndex;
            this.loading = true;
            let url = CONSTANT.URL.USER.FINDUSERBYPAGE,
            param={
                trueNameLike:this.trueNameLike,
                nicknameLike:this.nicknameLike,
                mobileLike:this.mobileLike,
                pageIndex:pageIndex,
                pointsLike:this.pointsLike,
                pageSize:10,
                userId:this.userId?this.userId:''
            }
            common.requestAjax(url,param,(res)=>{
                if(res.status == 200){
                    this.loading = false;
                    let data = res.data;
                    this.tableData = data.bussData;
                    this.pageCount = data.pageCount*10;
                }
            })
        },
        // 分页
        pageSizeChange(val){
           this.pageIndex = val;
           this.getUserList(val);
        },
        modalShow(val){
           this.id = val.id;
           this.points = val.points
           this.title = '增减吉分';
            this.num = '';
            this.contentText='';
           this.dialogTableVisible = true;
        },
        confirmBtn(item){
            if(!this.num){
                 this.$message({
                    type: 'warning',
                    message: '增减吉分不能为空!'
                });
                return false;
            }
            if(isNaN(this.num)){
                this.$message({
                    type: 'warning',
                    message: '增减吉分必须为数字!'
                });
                return false;
            }
            let num = parseInt(this.num);
            if(num>=0){
                if(this.points+num>999999){
                    this.$message({
                        type: 'warning',
                        message: '吉分总数不能大于6位数!'
                    });
                    return;
                }
            }else{
                if(this.points+(num)<0){
                    this.$message({
                        type: 'warning',
                        message: '吉分总数不能小于0!'
                    });
                    return;
                }
            }

            let url = CONSTANT.URL.USER.CHANGEPOINT,
            param={
                points:this.num,
                userId:this.id,
                memo:this.contentText
            }
            common.requestAjax(url,param,(res)=>{
                if(res.status == 200){
                     this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    this.dialogTableVisible = false;
                    this.getUserList(1)
                }else{
                    this.$message({
                        type: 'warning',
                        message: res.msg
                    });
                }
            })
        }
    }
}
</script>
<style lang="scss" >
    .el-table td, .el-table th.is-leaf {
        text-align: center;
    }
    .avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .el-dialog__body{
        padding-bottom: 50px;
    }
    .level-list{
        .wrap-search{
            margin-bottom: 20px;
            .search-item{
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

            .el-input{
                margin-top: 20px;
            }
        }
        .input_modal {
            margin-top: 20px;
            margin-bottom: 30px;
            span {
                display: inline-block;
            }
            .el-input {
                display: inline-block;
                width: 20%;
            }
            .el-button {
                display: inline-block;
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
    }

    .el-table_1_column_2 {
        .cell {
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
        }
    }
    .foot{
        margin-bottom: 20px;
    }
    .add-btn{
        margin-bottom: 20px;    
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
    .pagination {
        text-align: center;
        width: 80%;
        margin-top: 60px;
    }
    .el-pagination{
        margin-left: 35%;
        margin-top: 50px;
    }
</style>
