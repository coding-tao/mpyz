<template>
    <el-col :style="{height:heightLength+'px'}"  class="el-left-menu" :span="3">
        <el-menu  :default-active="active"  background-color="#324157" unique-opened text-color="#bfcbd9"  class="el-menu-vertical-demo" router theme="dark">
            <el-submenu v-for="item in routeList" :key="item.path" :index="item.path">
                <template slot="title">
                    <!-- <i :class="item.icon"></i> -->
                    {{item.name}}
                    </template>
                <el-menu-item-group :key="list.path" v-for="list in item.itemList">
                    <el-menu-item :index="list.path">{{list.name}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </el-col>
</template>

<script>
var routerList = require('./router-leftBar.js');
export default {
  data () {
    return {
        active:'',
        scroll:'',
        routeList:routerList.default.routerList,
        heightLength:''
    }
  },
  mounted(){
       window.addEventListener('scroll', ()=>{
           let scrollHeight = document.body.scrollHeight;
             this.heightLength =scrollHeight-80
       })
  },
  created(){
      this.activePath();
      this.heightLength = document.body.scrollHeight ;
  },
  watch:{

  },
  methods:{
    activePath(){
        this.active = this.$router.currentRoute.path
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
    .el-left-menu{
      height:1000px;
      position: fixed;
      left: 0;
      width: 206px;
    }
    .el-menu-vertical-demo{
      height: 100%;
    }

    .el-menu-item{
        min-width:auto!important;
    }
    .el-menu-item-group__title{
        padding-top: 0px!important;
    }
    .el-menu-item{
        a{
            display: block;
            color: #bfcbd9;
        }
        &.is-active{
            a{
              color: #20a0ff;
            }
        }
    }
</style>
