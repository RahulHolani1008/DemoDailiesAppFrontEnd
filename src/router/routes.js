const routes = [{
    path: '/',
    component: () => import('pages/HomePage.vue'),
  },
  {
    path: '/Class/ViewDetails',
    component: () => import('pages/ViewDetails.vue'),
    props: true,
    name: "ViewDetails"
  },
  {
    path: '/Teacher/AddClass',
    component: () => import('pages/AddNewClass.vue'),
    name: "AddNewClass"
  },
  // Always leave this as last one
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
]

export default routes
