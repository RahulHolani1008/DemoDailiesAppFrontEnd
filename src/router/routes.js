
const routes = [
  {
    path: '/',
    component: () => import('pages/HomePage.vue'),
  },
  {
    path: '/Class/ViewDetails',
    component: () => import('pages/ViewDetails.vue'),
    props: true,
    name: "ViewDetails"
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
]

export default routes
