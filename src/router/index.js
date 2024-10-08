import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DeckCreationView from '@/views/DeckCreationView.vue'
import ReadyForRound1View from '@/views/ReadyForRound1View.vue'
import Round1View from '@/views/Round1View.vue'
import Round1RecapView from '@/views/Round1RecapView.vue'
import ReadyForRound2View from '@/views/ReadyForRound2View.vue'
import Round2View from '@/views/Round2View.vue'
import ReadyForRound3View from '@/views/ReadyForRound3View.vue'
import Round2RecapView from '@/views/Round2RecapView.vue'
import Round3View from '@/views/Round3View.vue'
import Round3RecapView from '@/views/Round3RecapView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/propose-tes-cartes',
      name: 'propose-tes-cartes',
      component: DeckCreationView
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
      path: '/cest-parti-pour-la-manche-2',
      name: 'cest-parti-pour-la-manche-2',
      component: ReadyForRound2View
    },
    {
      path: '/manche-2',
      name: 'manche-2',
      component: Round2View
    },
    {
      path: '/recap-manche-2',
      name: 'recap-manche-2',
      component: Round2RecapView
    },
    {
      path: '/cest-parti-pour-la-manche-3',
      name: 'cest-parti-pour-la-manche-3',
      component: ReadyForRound3View
    },
    {
      path: '/manche-3',
      name: 'manche-3',
      component: Round3View
    },
    {
      path: '/recap-manche-3',
      name: 'recap-manche-3',
      component: Round3RecapView
    }
  ]
})

export default router
