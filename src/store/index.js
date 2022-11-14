import { createStore } from "vuex";
// import PostPageWithStore from "@/pages/PostPageWithStore";
import { postModule } from "@/store/postModule";

export default createStore({
    state: {
        isAuth: false,
    },
    modules: {
    post: postModule
    }
})
    // Учебный пример с лайками
    // state: {
    //     likes: 2,
    //     isAuth: false, 
    // },
    // getters: {
    //     doubleLikes(state) {
    //         return state.likes * 2
    //     }
    // },
    // mutations: {
    //     incrementLikes(state) {
    //         state.likes +=1
    //     },
    //     decrementLikes(state) {
    //         state.likes -=1
    //     }
    // },
    // actions: {

    // },
    // modules: {

    // }
// })