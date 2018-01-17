<template>
  <div id="app">
      <menulist></menulist>
  </div>
</template>


<script>
export default {
  name: 'app',
    data () {
    return {}
  },
  components: {
    'menulist': () => import('./page/common/Menu-common')
  },
  methods:{
  }
}
</script>

<style  lang="scss">
html{
  height: 100%;
}
.el-upload__input{
    display: none!important;
}
body{
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

table{
      border-collapse: inherit!important;
}

.el-button.link{
  padding: 0px!important;
  span{
    display: inline-block;
    a{
      text-decoration: none;
      display: inline-block;
      padding:9px 15px;
    }
  }
}

#app{
  height: 100%;
}

a{
  text-decoration: none;
}

.wrap{
  margin: 20px;
}
</style>
