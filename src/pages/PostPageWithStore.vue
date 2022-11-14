<template>
    <div> 
        
        <!-- <h1>{{$store.state.isAuth ? 'Пользователь авторизован' : 'Авторизуйтесь, чтобы использовать сервис'}}</h1>
        <h1>{{$store.getters.doubleLikes}}</h1>
        <div>
            <my-button @click="$store.commit('incrementLikes')">Лайк</my-button>
            <my-button @click="$store.commit('decrementLikes')">Дизлайк</my-button>
        </div> -->

        <h1>Страница с постами</h1>
        <my-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск..."
        v-focus 
        />
        <div class="app__btns">
        <my-button 
          @click="showDialog"
        >
        Создать пост
        </my-button>
        <my-select
            :model-value="selectedSort"
            @update:model-value="setSelectedSort"
            :options="sortOptions"
        />
        </div>
        <!-- <my-button @click="fetchPosts">Получить посты</my-button> -->
        <my-dialog v-model:show="dialogVisible">  
         <post-form
         @create="createPost"
         />
        </my-dialog>
    
      <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
       />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!-- <div class="page__wrapper">
        <div 
        v-for="pageNumber in totalPages" 
        :key="pageNumber" 
        class="page"
        :class="{
            'current-page': page === pageNumber
        }"
        @click="changePage(pageNumber)"
        >
        {{ pageNumber }}
        </div>
    </div> -->
    </div>
    </template>
    
    <script>
    import PostForm from "@/components/PostForm.vue"
    import PostList from "@/components/PostList.vue"
    import MyButton from "@/components/UI/MyButton.vue"
    // import axios from "axios"
    import MySelect from "@/components/UI/MySelect.vue"
    import MyInput from "@/components/UI/MyInput.vue"
    import {mapState, mapGetters, mapActions, mapMutations} from "vuex"
    
    
    export default {
        components: {
           PostList,  PostForm, MyButton, MySelect
        },
    
        data() {
            return {
                // posts: [],
                dialogVisible: false,
                // isPostsLoading: false,
                // selectedSort: '',
                // searchQuery: '',
                // page: 1,
                // limit:10,
                // totalPages: 0,
                // sortOptions: [
                //     {value: 'title', name: 'По названию'},
                //     {value: 'body', name: 'По содержимому'},
                // ]
            }
        },
    
        methods: {
            ...mapMutations({
                setPage: 'post/setPage',
                setSearchQuery: 'post/setSearchQuery',
                setSelectedSort: 'post/setSelectedSort'
            }),
            ...mapActions ({
                loadMorePosts: 'post/loadMorePosts',
                fetchPosts: 'post/fetchPosts'
            }),
            createPost(post) {
                this.posts.push(post);
                this.dialogVisible = false;
            },
            removePost(post) {
                this.posts = this.posts.filter(p => p.id !== post.id)
            },
            showDialog() {
                this.dialogVisible = 'true';
            },
            // changePage(pageNumber) {
            //     this.page = pageNumber;
            //     this.fetchPosts()
            // },
            // async fetchPosts() {
            //     try {
            //         this.isPostsLoading = true;
            //         const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            //             params: {
            //                 _page: this.page,
            //                 _limit: this.limit
            //             }
            //         });
            //         this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
            //         this.posts = response.data;
            //     } catch (e) {
            //         alert('Ошибка!');
            //     } finally {
            //         this.isPostsLoading = false;
            //     }
            // },
    
            // async loadMorePosts() {
            //     try {
            //         this.page+=1;
            //         const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            //             params: {
            //                 _page: this.page,
            //                 _limit: this.limit
            //             }
            //         });
            //         this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
            //         this.posts = [...this.posts, ...response.data];
            //     } catch (e) {
            //         alert('Ошибка!');
            //     }
            // }
        },
        mounted() {
            this.fetchPosts();
            // const options = {
            // // root: document.querySelector('#scrollArea'),
            // rootMargin: '0px',
            // threshold: 1.0
            // }
            // const callback = (entries, observer) => {
            //   if (entries[0].isIntersecting && this.page < this.totalPages) {
            //     this.loadMorePosts()
            //   }
            // };
            // const observer = new IntersectionObserver(callback, options);
            // observer.observe(this.$refs.observer);
        },
    
        computed: {
            ...mapState({
                posts: state => state.post.posts,
                isPostsLoading: state => state.post.isPostsLoading,
                selectedSort: state => state.post.selectedSort,
                searchQuery: state => state.post.searchQuery,
                page: state => state.post.page,
                limit: state => state.post.limit,
                totalPages: state => state.post.totalPages,
                sortOptions: state => state.post.sortOptions 
            }),
            ...mapGetters({
                sortedPosts: 'post/sortedPosts',
                sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
            })

            // sortedPosts() {
            //     return [...this.posts].sort((post1, post2) => {
            //         return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
            //     })
            // },
    
            // sortedAndSearchedPosts() {
            //     return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
            // }
        },
    
        watch: {
            // page() {
            //     this.fetchPosts()
            // }
        }    
    }
    
    </script>
    
    <style>   
    .app__btns {
        display: flex;
        justify-content: space-between;
        margin: 15px 0;
    }
    
    .page__wrapper {
        display: flex;
        margin-top: 15px;
    }
    
    .page {
        border: 1px solid black;
        padding: 10px;
    }
    
    .current-page {
        border: 3px solid teal;
        background: rgb(0, 240, 240);
    }
    
    .observer{
        height: 30px;
    }
    </style>