<template>
  <nav class="navbar navbar-light bg-light justify-content-between">
    <div class="logoDiv">
      <a class="navbar-brand" href="#">
        <span
          class="iconify"
          data-icon="fa-hacker-news"
          data-inline="false"
        ></span>
      </a>
      <p style="margin: 0">
        Search <br />
        Hacker News
      </p>
    </div>

    <div class="input-group col-md-8">
      <a
        class="clearSearch"
        @click="store.clearSearch"
        v-if="store.getIsSearched()"
        >Clear search</a
      >
      <form @submit.prevent="searchSubmit" autocomplete="off">
        <input
          v-model="searchQuery"
          class="form-control py-2"
          type="search"
          placeholder="Search.."
          id="example-search-input"
        />
        <button class="btn searchButton btn-outline-secondary" type="submit">
          <i class="fa fa-search"></i>
        </button>
      </form>
    </div>
  </nav>
</template>

<script>
import { inject, ref } from "vue";

export default {
  inject: ["global"],
  setup() {
    const store = inject("global");
    let searchQuery = ref("");

    const searchSubmit = () => {
      store.setSearchQuery(searchQuery.value);
      store.searchSubmit();
      searchQuery.value = "";
    };

    return {
      store,
      searchQuery,
      searchSubmit,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

.navbar {
  margin: 0px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.logoDiv {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-align: left;
  font-size: 22px;
  margin-right: auto;
}
.navbar-brand {
  padding: 0;
  width: 54px;
  height: 54px;
  margin-right: 10px;
}
.iconify {
  width: 54px;
  height: 54px;
  color: #ee8022;
}
.logoDiv p {
  color: grey;
  font-family: "Lato";
}
.clearSearch {
  cursor: pointer;
  text-decoration: none;
}
.form-control:focus {
  z-index: -1;
  box-shadow: 0 0 3px #ee8022;
}
.searchButton {
  background-color: #ee8022;
  color: white;
  position: absolute;
  z-index: 2;
  right: 0.5px;
  border-radius: 2px;
}
.searchButton:focus {
  outline: none;
  top: 1px;
}
</style>