import { createStore } from 'vuex'
// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            keyword: '',
            audio: null,
            currentTime: "",
            totalTime: "",
            rate: 0,
            showShare: false,
            status: false,
            show: false,
            moreShow: false,
            moreInfo: null,
            circulate: 1, //循环状态 1、按列表循环 2、随机播放 3、单曲循环
            currentSong: {
                id: 1413863166,
                name: "想去海边",
                singer: "夏日入侵企画",
                cover: 'https://p2.music.126.net/sLWN-iePq4ESOMPER0IWgQ==/109951164602081973.jpg',
                url: 'http://m801.music.126.net/20220929152110/dcc8f331ef805b597ab1f4aa2dcd2888/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096442961/0219/71c6/d867/eca80101c2239842e0929e3c06e8ca8e.mp3',
                state: true,
            },
            playList: [{
                    id: 1413863166,
                    name: "想去海边",
                    singer: "夏日入侵企画",
                    cover: 'https://p2.music.126.net/sLWN-iePq4ESOMPER0IWgQ==/109951164602081973.jpg',
                    url: 'http://m801.music.126.net/20220929152110/dcc8f331ef805b597ab1f4aa2dcd2888/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096442961/0219/71c6/d867/eca80101c2239842e0929e3c06e8ca8e.mp3',
                    state: true,
                },

            ], //播放列表
        }
    },
    mutations: {
        setKeyword(state, value) {
            state.keyword = value
        },
        setCurrentTime(state, value) {
            state.currentTime = value
        },
        setTotalTime(state, value) {
            state.totalTime = value
        },
        setRate(state, value) {
            state.rate = value
        },
        setStatus(state, value) {
            state.status = value
        },
        setAudio(state, value) {
            state.audio = value
        },
        setShow(state, value) {
            state.show = value
        },
        setCirculate(state, value) {
            state.circulate = value
        },
        setPlayList(state, value) {
            state.playList = value
        },
        setShowShare(state, value) {
            state.showShare = value
        },
        setCurrentSong(state, value) {
            state.currentSong = value
        },
        setMoreShow(state, value) {
            state.moreShow = value
        },
        setMoreInfo(state, value) {
            state.moreInfo = value
        },

    },
    actions: {

    }
})

export default store