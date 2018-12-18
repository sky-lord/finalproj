const home = Vue.component('home', {
  data: function () {
    return {
      siteTitle: 'Comics and Movies!!!',
    }
  },
  template: `<div class="title"><h1>{{siteTitle}}</h1></div>`,
  methods: {
    
  }
});

const comicSearch = Vue.component('comic-search', {
  data: function () {
    return {
    searchTerm: '',
    comicList: [],
    limit: 50,
    results: '',
    description: ''
    }
  },
  template: `
  <div id="main">
    <center><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
     <input class="mdl-textfield__input" type="text" id="sample3" v-model="searchTerm">
      <label class="mdl-textfield__label" for="sample3">search comic name</label>
    </div>
  </form>
    <button v-on:click="getComics()" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab"><i class="material-icons">search</i></button></center>
    
    <div v-for="comic in comicList">
      <div class="polaroid">
      <img v-if="comic.image.small_url" v-bind:src="comic.image.small_url" style="width:100%">
      <div class="container">
      <div v-html="comic.description"></div>
    </div>
  </div>
    </div>
  </center>
  </div>
  `,
  methods:{
    getComics(){
      fetch(`https://comicvine.gamespot.com/api/volumes/?api_key=836a5cedc12661e32bcdfb494600d917138be931&format=json&sort=name:asc&filter=name:${this.searchTerm}`)
      .then(data=> data.json() )
      .then(comics=> {
        this.comicList = comics.results;
        console.log();
      });
    }
  }
});

const movieSearch = Vue.component('movie-search', {
  data: function () {
    return {
    searchTerm: '',
    movieList: [],
    limit: 50,
    results: '',
    description: ''
    }
  },
  template: `
  <div id="main">
    <center><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
     <input class="mdl-textfield__input" type="text" id="sample3" v-model="searchTerm">
      <label class="mdl-textfield__label" for="sample3">search movie name</label>
    </div>
  </form>
    <button v-on:click="getMovies()" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab"><i class="material-icons">search</i></button></center>
    
    <div v-for="movie in movieList">
      <div class="polaroid">
      <img v-bind:src="'http://image.tmdb.org/t/p/w185/' + movie.poster_path" style="width:100%">
      <div class="container">
      <div v-html="movie.overview"></div>
    </div>
  </div>
    </div>
  </center>
  </div>
  `,
  methods:{
    getMovies(){
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=aba442bf0028b2c7957a6f762cf916c1&language=en-US&query=${this.searchTerm}`)
      .then(data=> data.json() )
      .then(movies=> {
        this.movieList = movies.results;
        console.log(this.movieList);
      });
    }
  }
});

const routes = [
{path:'/', component: home},
{path:'/comics', component: comicSearch},
{path:'/movies', component: movieSearch}
];

const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.component('sidebar', {
  data: function () {
    return {
      sideBarTitle: 'this is a sidebar'
    }
  },
  template: `<div class="container"><h1 v-click:on="">{{sideBarTitle}}</h1><div class="sidebar">This is a sidebar</div></div>`,
  methods: {
    //
  }
});

const tunesApp = new Vue({
  router,
  el:'#tunesApp',
  data:{

    },
  methods:{
    
  }
});