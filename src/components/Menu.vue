<template>
    <ul class="menu">
        <router-link v-for="(item,key) in Menu" :to="item.url" :key="key" tag="li" active-class="active" exact>{{item.title}}</router-link>
    </ul>
</template>

<script>
    export default {
        name: 'Menu1',
        data() {
            return {
                Menu:[]
            }
        },
        created(){
            var that=this;
            fetch('/menu').then(function (e) {
                return e.json();
            }).then(function (e) {
                that.Menu=e;
            })
        }
    }
</script>

<style scoped>
    .menu{
        width: 100%;
        height: 44px;
        background: #ccc;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .menu>li{
        height: 100%;
        box-sizing: border-box;
        padding: 0 50px;
        line-height: 44px;
    }
    .active{
        background: #fff;
    }
</style>