import Vue from 'vue'
import Router from 'vue-router'

import FrontPage from '@/components/FrontPage'
import DetailPage from '@/components/DetailPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FrontPage',
      component: FrontPage
    },
    {
      path: '/:userId',
      name: 'DetailPage',
      component: DetailPage
    }
  ]
})
