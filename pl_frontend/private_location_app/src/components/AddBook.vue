<template>
  <div class="user-create">
    <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
      <main role="main" class="inner cover">
        <h1 class="cover-heading">Add your favourite book</h1>
        <p class="lead">Add a book reccomendation to the list!</p>
        <div class="container py-5">
          <div class="row">
            <div class="col-lg-7 mx-auto">
              <div class="bg-white rounded-lg shadow-sm p-5">
                <div class="container">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      class="bi bi-book-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"
                      />
                    </svg>
                    <form role="form">
                      <div class="form-group">
                        <label for="username">Book Name</label>
                        <input
                          type="text"
                          name="bookName"
                          placeholder="Harry Potter and the Philosopher's Stone"
                          required
                          class="form-control"
                          v-model="bookName"
                        />
                      </div>
                      <div class="form-group">
                        <label for="description">Short description</label>
                        <div class="input-group">
                          <input
                            type="text"
                            name="description"
                            placeholder="Short Description"
                            class="form-control"
                            required
                            v-model="shortDescription"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="description">Book Image URL</label>
                        <div class="input-group">
                          <input
                            type="text"
                            name="Book Image URL"
                            placeholder="Book Image URL"
                            class="form-control"
                            required
                            v-model="imgUrl"
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-8">
                          <div class="form-group">
                            <label
                              ><span class="hidden-xs">Your Rating</span></label
                            >
                            <div class="input-group">
                              <select
                                id="inputState"
                                class="form-control"
                                type="number"
                                v-model.number="rating"
                              >
                                <option value="5" selected>5</option>
                                <option value="4">4</option>
                                <option value="3">3</option>
                                <option value="2">2</option>
                                <option value="1">1</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        class="subscribe btn btn-primary btn-block rounded-pill shadow-sm"
                        v-on:click="addBook()"
                      >
                        Add Book
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddBook",
  data() {
    return {
      bookName: "",
      shortDescription: "",
      rating: 5,
      bookExist: false,
      imgUrl: "",
      likes: 0,
      error: false,
      message: null,
    };
  },
  created() {},
  methods: {
    addBook() {
      if (
        this.bookName != "" &&
        this.shortDescription != "" &&
        this.imgUrl != ""
      ) {
        console.log("Adding books");
        axios
          .post("http://localhost:3003/api/book", {
            bookName: this.bookName,
            shortDescription: this.shortDescription,
            rating: this.rating,
            likes: this.likes,
            imgUrl: this.imgUrl,
          })
          .then((response) => {
            if (response.status == 200) {
              this.message = "Book Added Successfully";
              console.log(
                "Book Added successfully: " + JSON.stringify(response.data)
              );
              this.$toast(this.message);
            }
          })
          .catch((e) => {
            console.log(e)
          });
      }
      else{
      this.message = "Unable to add book, ensure no fields are empty & check if the server is running!";
       this.$toast.error(this.message);

      }
    },

    // checkBookExists() {
    //   axios({
    //     method: "get",
    //     url: "http://localhost:3003/api/books",
    //     params: {
    //       bookName: this.bookName,
    //     },
    //   })
    //     .then((response) => {
    //       console.log(response);
    //       if (response.bookExist) {
    //         this.error = true;
    //         this.bookExist=true
    //         this.errorMessage = "It looks like this book already exists, you can view it here: ";
    //       } else {
    //         this.error = false;
    //         this.errorMessage = null;
    //         this.bookExist=false

    //       }
    //     })
    //     .catch((e) => {
    //       this.bookExist = false;
    //       this.errorMessage = e.message;
    //     });
    // },
  },
};
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
  color: #42b983;
}
</style>
