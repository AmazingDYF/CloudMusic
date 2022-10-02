import { createRouter, createWebHashHistory } from 'vue-router'
import MyHome from '../views/HomeView.vue'
import MyDetail from '../views/DetailView.vue'
import MySearchResult from '../views/SearchResultView.vue'
import MyPlayListDetail from '../views/playListDetail.vue'
import MySquare from '../views/SquarleView.vue'
import MyRank from '../views/RankListView.vue'
import MySingerClass from '../views/SingerClass.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/playListDetail' },
        { path: '/home', component: MyHome },
        { path: '/detail', component: MyDetail },
        { path: '/searchResult/:keyword', component: MySearchResult, props: true, name: 'sea' },
        { path: '/playListDetail/:id', component: MyPlayListDetail, props: true, name: 'pld' },
        { path: '/squareList', component: MySquare },
        { path: '/rank', component: MyRank },
        { path: '/singerClass', component: MySingerClass }
    ]
})

export default router