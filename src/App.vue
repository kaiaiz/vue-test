<template>
  <div id="app">
    <!--<menu1></menu1>-->
    <router-view/>
  </div>
</template>

<script>
  import Menu1 from '@/components/Menu.vue'
export default {
  name: 'app',
    components:{Menu1}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
  a{
    text-decoration: none;
  }
  .fade-enter{
    opacity: 0;
  }
  .fade-leave-to{
    opacity: 0;
  }
  .fade-enter-active,.fade-leave-active{
    transition: all 0.5s ease;
  }
</style>
