import { createRouter, createWebHistory } from 'vue-router';
import BookView from '../views/BookView.vue';
import ChapterView from '../views/ChapterView.vue';
import HomeView from '../views/HomeView.vue';
import LibraryView from '../views/LibraryView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryView,
    },
    {
      path: '/book/:id',
      name: 'book',
      component: BookView,
      props: true
    },
    {
      path: '/chapter/:id',
      name: 'chapter',
      component: ChapterView,
      props: true
    }
  ]
});

export default router;
