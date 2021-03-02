import Vue from 'vue'
import Router from 'vue-router'
import AddBook from '@/components/AddBook'
import AllBooks from '@/components/AllBooks'

let router = new Router({
  routes: [{
      path: '/',
      name: 'AddBook',
      component: AddBook
    },
    {
      path: '/allBooks',
      name: 'AllBooks',
      component: AllBooks,
    }
  ],
//   scrollBehavior: function (to) {
//     if (to.hash) {
//       return {
//         selector: to.hash
//       }
//     }
//   },
});
Vue.use(Router)

//Navigation Guards

// router.beforeEach((to, from, next) => {
//   //Check for auth guard
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     //Check if Not Logged into FB
//     if (!firebaseApp.auth().currentUser) {
//       next({
//         path: '/',
//         query: {
//           redirect: to.fullPath
//         }
//       });
//     } else {
//       //If logged in 
//       next();
//     }
//   } else if (to.matched.some(record => record.meta.requiresGuest)) {
//     //Check if  Logged into FB
//     if (firebaseApp.auth().currentUser) {
//       next({
//         path: '/',
//         query: {
//           redirect: to.fullPath
//         }
//       });
//     } else {
//       //If logged in 
//       next();
//     }
//   } else {
//     next();
//   }
// });
export default router;