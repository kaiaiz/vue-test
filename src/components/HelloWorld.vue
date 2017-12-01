<template>
  <div class="hello">
    <!--<el-carousel :interval="4000" type="card" height="300px">-->
      <!--<el-carousel-item v-for="item in 6" :key="item">-->
        <!--<h3>{{ item }}</h3>-->
      <!--</el-carousel-item>-->
    <!--</el-carousel>-->
    <el-container style="height: 100vh">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <aside1></aside1>
        </el-aside>
        <el-main>
          <transition name="fade" mode="out-in">
          <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import aside1 from '@/components/aside.vue'
export default {
  name: 'HelloWorld',
    components:{aside1},
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*.hello{*/
    /*margin-top: 10px;*/
  /*}*/
  /*.el-carousel__item h3 {*/
    /*color: #475669;*/
    /*font-size: 14px;*/
    /*opacity: 0.75;*/
    /*line-height: 200px;*/
    /*margin: 0;*/
  /*}*/

  /*.el-carousel__item:nth-child(2n) {*/
    /*background-color: #99a9bf;*/
  /*}*/

  /*.el-carousel__item:nth-child(2n+1) {*/
    /*background-color: #d3dce6;*/
  /*}*/
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
