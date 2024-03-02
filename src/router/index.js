import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TeamView from '@/views/TeamView.vue'
import ReadyForRound1View from '@/views/ReadyForRound1View.vue'
import Round1View from '@/views/Round1View.vue'
import Round1RecapView from '@/views/Round1RecapView.vue'
import Round2View from '@/views/Round2View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/equipes',
      name: 'equipe',
      component: TeamView
    },
    {
      path: '/cest-parti-pour-la-manche-1',
      name: 'cest-parti-pour-la-manche-1',
      component: ReadyForRound1View
    },
    {
      path: '/manche-1',
      name: 'manche-1',
      component: Round1View
    },
    {
      path: '/recap-manche-1',
      name: 'recap-manche-1',
      component: Round1RecapView
    },
    {
      path: '/manche-2',
      name: 'manche-2',
      component: Round2View
    },
  ]
})

export default router
