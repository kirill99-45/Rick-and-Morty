import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { pages } from './../pages/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: pages.HomePage,
  },
  {
    path: '/episodes/',
    component: pages.EpisodesPage,
    // children: [
    //   {
    //     path: '/:id',
    //     component: pages.EpisodePage,
    //   }
    // ]
  },
  {
    path: '/episodes/:id',
    component: pages.EpisodePage,
  },
  {
    path: '/characters',
    component: pages.CharactersPage,
  },
  {
    path: '/locations',
    component: pages.LocationsPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
