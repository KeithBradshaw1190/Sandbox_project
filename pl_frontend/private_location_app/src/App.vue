<template>
  <div id="app">
    <Header />

<router-view/>
  </div>
</template>

<script>
//import AddBook from './components/AddBook.vue'
import Header from './components/Header.vue'
//import AllBooks from './components/AllBooks.vue'



export default {
  name: 'App',
  components: {
    Header,

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
