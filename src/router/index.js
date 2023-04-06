import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store/index";

Vue.use(VueRouter)

const Home = () => import("@/views/Home");
const Login = () => import("@/views/Login");

const UserInfo = () => import("@/views/user/UserInfo");
const Messages = () => import("@/views/user/Messages");
const UpdateUserInfo = () => import("@/views/user/UpdateUserInfo");
const ShowTeam = () => import("@/views/user/ShowTeam");

const Entry = () => import("@/views/calculate/Entry");
const Calculate = () => import("@/views/calculate/Index");

const History = () => import("@/views/history/Index");
const Result = () => import("@/views/history/Result");
const Report = () => import("@/views/history/Report");

const routes = [
  {
    path: "/",
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: "userInfo",
        name: "userInfo",
        component: UserInfo
      },
      {
        path: "messages",
        name: "messages",
        component: Messages
      },
      {
        path: "entry",
        name: "entry",
        component: Entry
      },
      {
        path: "calculate",
        name: "calculate",
        component: Calculate
      },
      {
        path: "history",
        name: "history",
        component: History
      }
    ],
    beforeEnter(to, from, next){
      if(store.state.user.isLogin){
        if(to.path !== "/home/userInfo"){
          next({path: "/home/userInfo"})
        }else{
          next()
        }
      }else{
        next({
          path: "/login"
        })
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/updateUserInfo',
    name: 'updateUserInfo',
    component: UpdateUserInfo,
  },
  {
    path: '/showTeam',
    name: 'showTeam',
    component: ShowTeam
  },
  {
    path: '/result',
    name: 'result',
    component: Result
  },
  {
    path: '/report',
    name: 'report',
    component: Report
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
