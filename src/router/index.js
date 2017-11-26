import Vue from 'vue';
import Router from 'vue-router';
import goods from '../components/goods/goods.vue';
import ratings from '../components/ratings/ratings.vue';
import seller from '../components/seller/seller.vue';

Vue.use(Router);

const routes = [
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller} 
];

const router = new Router({
  routes: routes,
  linkActiveClass:'active'
});
export default router;

router.push('/goods');//由1.0的.go=>2.0d的.push