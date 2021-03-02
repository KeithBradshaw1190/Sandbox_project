<template>
  <div class="header">
<div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
      <header class="masthead mb-auto">
        <div class="inner">
          <h3 class="masthead-brand">Menu</h3>
          <nav class="nav nav-masthead justify-content-center">
          <router-link class="nav-link" :to="{name:'AddBook'}">Add a Book</router-link>

          <router-link class="nav-link" :to="{name:'AllBooks'}">View all Books</router-link>

          <!-- <a class="nav-link" href="#">All Books</a> -->
          </nav>
        </div>
      </header>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #000000;
}
</style>
