<template>
    <div class="ad_editor">
        <div class="words_header">
            <span class="txt">轮播广告</span>
            <el-button type="primary" @click="handleBack">返回</el-button>
            <div class="clear"></div>
        </div>
        <div class="">
            <el-button type="primary" @click="handleAddBanner" style="margin-top: 20px">新增banner</el-button>
            <span style="color: #fd202d;font-size: 14px;">图片建议尺寸：750像素*370像素</span>
        </div>
        <div class="">
            <el-table
              :data="tableData"
               border
                v-loading="loading"
              style="width: 100%;margin-top: 20px"
            >
                  <el-table-column
                    prop="fileUrl"
                    label="文件名"
                     min-width='100' align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="操作"
                     min-width='100' align="center">
                      <template slot-scope="scope">
                            <el-button @click="handleSelect(scope.$index)" type="text" size="small" style="background: #4db3ff;color: #fff;padding: 7px 14px;">
                                选择banner
                            </el-button>
                      </template>
                  </el-table-column>
                  <el-table-column
                    label="URL地址"
                    align="center"
                  >
                    <template slot-scope="scope">
                        <el-input v-model="tableData[scope.$index].url" placeholder="请输入URL地址"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="操作"
                    align="center" fixed="right">
                      <template slot-scope="scope">
                          <el-button @click="handleDelete(scope.$index)" type="text" size="small" style="background: #fd202d;color: #fff;padding: 7px 14px;">删除</el-button>
                      </template>
                  </el-table-column>
            </el-table>

            <el-upload
                class="avatar-uploader"
                ref="upload"
                :show-file-list="false"
                :multiple="false"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
                :action="upLoadUrl"
                style="display:none;">
                <el-button size="small" type="primary" id="imgInput" element-loading-text="插入中,请稍候">选择banner</el-button>
            </el-upload>

        </div>

        <div class="btns">
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button @click="handleClear">重置</el-button>
        </div>
    </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js');
let common = require("../../common.js");

export default {
    data() {
        return {
            url: "",
            imageUrl: "",
            uploadIdx: {
                index: null
            },
            upLoadUrl:'',
            index:0,
            loading:true,
            fileList:[],
            tableData: [],
            bannerInfor:[],
            id: location.href.split("adEditor/") ? location.href.split("adEditor/")[1] : null
        }
    },
    mounted() {
        let id = common.getCookie('sessionId');
        this.upLoadUrl = `${CONSTANT.URL.SYS.UPLOADFILE}?sessionId=${id}`;
        this.adEditorFunc()
    },
    methods: {
        adEditorFunc() {
            this.loading = true;
            let url = CONSTANT.URL.PLATFORM.GETADVICEBANNER;
            common.requestAjax(url, {}, res => {
                if (res.status == 200) {
                     this.loading = false;
                    let data = res.data;
                    this.tableData = data.bussData;
                }
            })
        },
        handleBack() {
            this.$router.go(-1);
        },
        beforeAvatarUpload(file) {
            return true;
        },
        handleAvatarSuccess(res, file, fileList) {
            if (res.status == 200) {
                console.log(this.index,this.tableData,'ffffff')
                let data = res.data.bussData,
                    table=this.tableData[this.index],
                   fileItem = {
                    fileUrl:data.fileUrl,
                    id:table.id,
                    type:table.type,
                    url:table.url
                };

                this.tableData.splice(this.index,1,fileItem);
                
            }
        },
        handleAddBanner() {
            let bannerItem = {
                fileName: "__",
                url: ""
            }
            this.tableData.push(bannerItem)
        },
        handleDelete(index) {
            this.tableData.splice(index, 1)
        },
        handleSave() {
            let url = CONSTANT.URL.PLATFORM.SAVEBANNER,
                arr = [],
                state = false;
                console.log(this.tableData)
                this.tableData.map((item)=>{
                    if(!item.fileUrl){
                       state = true;
                    }
                    arr.push({
                        fileUrl:item.fileUrl,
                        url:item.url,
                        type:'activity',
                        id:item.id?item.id:''
                    })
                })
                if(state){
                    this.$message({           
                        message: '广告图片不能为空！',           
                        type: 'warning'         
                    });
                    return;
                }
                let params = {
                    imgJson: JSON.stringify(arr)
                }
            common.requestAjax(url, params, res => {
                if(res.status == 200) {
                    this.$message.success(res.msg)
                }
            })
        },
        handleClear() {
            this.tableData=[]
            this.$message.success("重置成功");
        },
        handleSelect(index) {
            this.index = index;
            let fileInput = document.getElementById('imgInput')
            fileInput.click() // 加一个触发事件
        }
    }
}
</script>

<style lang="scss" scoped>
    .ad_editor {
        .words_header {
            line-height: 2;
            border-bottom: 1px solid #d0d0d0;
            padding-bottom: 15px;
            span.txt {
                font-size: 18px;
            }
            .clear {
                clear: both;
            }
            .el-button {
                float: right;
            }
        }
        .btns {
            text-align: center;
            margin-top: 40px;
        }
        .el-upload-list.el-upload-list--text {
            // display: none;
        }
    }
</style>
