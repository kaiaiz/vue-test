import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Info from '@/components/info'
import Login from '@/components/login'
import addUser from '@/components/addUser'
import editUser from '@/components/editUser'
Vue.use(Router)
var router=new Router({
    routes: [
        {
            path: '/users',
            name: 'HelloWorld',
            component: HelloWorld,
            children:[
                {
                    path:'info',
                    component:Info
                },
                {
                    path:'addUser',
                    component:addUser
                },
                {
                    path:'editUser',
                    component:editUser
                }
            ]
        },
        {
            path:'/users/login',
            component:Login
        }
    ]
});
router.beforeEach(function (to,from,next) {
    if(to.path=='/users/login'){
        next();
    }else{
      if(sessionStorage.getItem('login')){
          next();
      }else{
          next('/users/login')
      }
    }
})
export default router
