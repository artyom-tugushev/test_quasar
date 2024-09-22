// import { RouteRecordRaw } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Blog',
    component: () => import('pages/BlogPage.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('pages/AboutPage.vue'),
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: () => import('pages/PostPage.vue'),
  },
];

export default routes;
