
<template>
  <div class="user-create">
    <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
      <main role="main" class="inner cover">
        <h1 class="cover-heading">
          Favourite books <br />
          <button
            class="btn btn-sm btn-dark mt-4 mb-4"
            v-if="allBooks != null"
            @click="downloadBooks()"
          >
            Download book list
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-download"
              viewBox="0 0 16 16"
            >
              <path
                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
              />
              <path
                d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
              />
            </svg>
          </button>
        </h1>

        <div class="container">
          <div class="row text-center" v-if="allBooks != null">
            <!-- Book -->
            <div
              class="col-xl-4 col-sm-6 mb-5"
              v-for="book in allBooks"
              v-bind:key="book.id"
            >
              <div class="bg-white rounded shadow py-4 px-5">
                <img
                  v-bind:src="book.imgUrl"
                  alt=""
                  width="200"
                  class="img-fluidmb-3 img-thumbnail shadow-sm mb-3"
                />
                <h5 class="mb-0">{{ book.bookName }}</h5>
                <span class="small text-uppercase text-muted"
                  >{{ book.rating }} Out of 5 Rating</span
                >

                <ul class="social mb-0 list-inline mt-3">
                  <li
                    class="list-inline-item"
                    @change="showSaveChangeButton(book._id)"
                  >
                    {{ book.shortDescription }}
                  </li>
                </ul>
                <br />
                <small>{{ book.likes }} Likes</small>
                <!-- Like Button -->
                <button class="btn m-1" v-on:click="likeBook(book._id)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-heart m-0"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                    ></path>
                  </svg>
                  Like
                </button>
                <!-- Like Button -->
                <br />

                <div class="col-12">
                  <button class="btn m-1 btn-sm" @click="deleteBook(book._id)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-x-square"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                      />
                      <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <!-- End -->
          </div>

          <div class="text-center mt-4" v-if="allBooks == null">
            <p class="lead">No Books added yet!</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AllBooks",
  data() {
    return {
      allBooks: null,
      changeExist: false,
      changeId: null,
    };
  },
  created() {
    this.getBooks();
  },
  methods: {
    getBooks() {
      console.log("Getting books");
      axios
        .get("http://localhost:3003/api/books/noDownload")
        .then((response) => {
          if (response.status == 200) {
            this.message = "Books Retrieved Successfully";
            console.log(
              "Books Retrieved Successfully: " + JSON.stringify(response.data)
            );
            this.allBooks = response.data;
          }
        })
        .catch((e) => {
          console.log("Error Retrieving Books: " + JSON.stringify(e));
          this.allBooks = null;
        });
    },
    likeBook(id) {
      console.log(id);
      console.log("Liking book " + id);
      axios
        .post("http://localhost:3003/api/book-update/likes", {
          bookId: id,
        })
        .then((response) => {
          if (response.status == 200) {
            this.getBooks();
          }
        })
        .catch((e) => {
          console.log("Error Retrieving Books: " + JSON.stringify(e));
        });
    },
    showSaveChangeButton(id) {
      this.changeExist = true;
      this.changeId = id;
    },
    saveChanges() {
      this.changeExist = false;
    },
    deleteBook(id) {
      axios
        .delete(`http://localhost:3003/api/book/${id}`)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            this.allBooks = response.data;
          }
        })
        .catch((e) => {
          console.log("Error Retrieving Books: " + JSON.stringify(e));
        });
    },
    downloadBooks() {
      console.log("Downloading books");

      axios
        .get("http://localhost:3003/api/books/download", {
          responseType: "arraybuffer",
        })
        .then((response) => {
          console.log(response);

          let blob = new Blob([response.data], { type: "application/json" });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "BookList.json";
          link.click();
        })
        .catch((e) => {
          console.log("Error downloading Books: " + JSON.stringify(e));
        });
    },
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
.btn-circle {
  width: 45px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  padding: 0;
  border-radius: 50%;
}

.btn-circle i {
  position: relative;
  top: -1px;
}

.btn-circle-sm {
  width: 35px;
  height: 35px;
  line-height: 35px;
  font-size: 0.9rem;
}

.btn-circle-lg {
  width: 55px;
  height: 55px;
  line-height: 55px;
  font-size: 1.1rem;
}

.btn-circle-xl {
  width: 70px;
  height: 70px;
  line-height: 70px;
  font-size: 1.3rem;
}
</style>
