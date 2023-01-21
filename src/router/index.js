import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AboutView from '../views/AboutView.vue'
import MyOrdersView from '../views/MyOrdersView.vue'
import OrderControlView from '../views/OrderControlView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import AdminProductEnterView from '../views/AdminProductEnterView.vue'
import AdminProductsView from '../views/AdminProductsView.vue'
import OrderView from '../views/OrderView.vue'
import AdminProductEdit from '../views/AdminProductEdit.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },

  {
    path: '/about',
    name: 'about',
    component: AboutView
  },

  {
    path: '/myorders',
    name: 'myorders',
    component: MyOrdersView
  },

  {
    path: '/ordercheck',
    name: 'ordercheck',
    component: OrderControlView
  },

  {
    path: '/productdetail/:slug',
    name: 'productdetail',
    component: ProductDetailView
  },

  {
    path: '/productenter',
    name: 'productenter',
    component: AdminProductEnterView
  },

  {
    path: '/productsview',
    name: 'productsview',
    component: AdminProductsView
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView
  },

  {
    path: '/productedit/:slug',
    name: 'productedit',
    component: AdminProductEdit
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
