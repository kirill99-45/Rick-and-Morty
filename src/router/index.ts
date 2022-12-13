import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import {
  HomePage, EpisodesPage, EpisodePage, CharactersPage, CharacterPage, LocationsPage, LocationPage
} from './../pages/index';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/episodes',
    name: 'episodes',
    component: EpisodesPage,
  },
  {
    path: '/episodes/:id',
    name: 'selected episode',
    component: EpisodePage,
  },
  {
    path: '/characters',
    name: 'characters',
    component: CharactersPage,
  },  
  {
    path: '/characters/:id',
    name: 'selected character',
    component: CharacterPage,
  },
  {
    path: '/locations',
    name: 'locations',
    component: LocationsPage,
  },
  {
    path: '/locations/:id',
    name: 'selected location',
    component: LocationPage,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
