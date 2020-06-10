import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/categories/edit',
        name: 'CategoriesEdit',
        component: () => import(/* webpackChunkName: "Categories" */ '../views/CategoriesEdit.vue')
      },
      {
        path: '/categories/edit/:id',
        props: true,
        name: 'CategoriesEdit',
        component: () => import(/* webpackChunkName: "Categories" */ '../views/CategoriesEdit.vue')
      },
      {
        path: '/categories/list',
        name: 'CategoriesList',
        component: () => import(/* webpackChunkName: "Categories" */ '../views/CategoriesList.vue')
      },
      {
        path: '/items/edit',
        name: 'ItemsEdit',
        component: () => import(/* webpackChunkName: "Items" */ '../views/ItemsEdit.vue')
      },
      {
        path: '/items/edit/:id',
        props: true,
        name: 'ItemsEdit',
        component: () => import(/* webpackChunkName: "Items" */ '../views/ItemsEdit.vue')
      },
      {
        path: '/items/list',
        name: 'ItemsList',
        component: () => import(/* webpackChunkName: "Items" */ '../views/ItemsList.vue')
      },

      {
        path: '/heroes/edit',
        name: 'HeroesEdit',
        component: () => import(/* webpackChunkName: "Items" */ '../views/HeroesEdit.vue')
      },
      {
        path: '/heroes/edit/:id',
        props: true,
        name: 'HeroesEdit',
        component: () => import(/* webpackChunkName: "Items" */ '../views/HeroesEdit.vue')
      },
      {
        path: '/heroes/list',
        name: 'HeroesList',
        component: () => import(/* webpackChunkName: "Items" */ '../views/HeroesList.vue')
      }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
