<template>
  <div id="root">
    <div class="navbarContainer">
      <navbar />
      <links />
    </div>
    <div class="newsContainer">
      <filters />
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Links from "@/components/Links.vue";
import Filters from "@/components/Filters.vue";
import global from "./global.js";
import { useRouter } from "vue-router";

export default {
  provide: {
    global,
  },
  name: "App",
  data: () => {},
  setup() {
    const { route } = useRouter();
    return { route };
  },
  components: {
    Navbar,
    Links,
    Filters,
  },
};
</script>

<style>
html {
  width: 100%;
  min-width: 100%;
}
#app {
  font-family: Verdana, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#root {
  width: 80%;
  margin: 0px auto;
}
.navbarContainer {
  width: 78.5%;
  right: 10%;
  top: 0;
  padding-top: 10px;
  position: fixed;
  z-index: 2;
  background-color: white;
}
.newsContainer {
  margin: 15px;
  padding-top: 120px;
}
.links {
  padding: 0;
  height: 100%;
  background-color: #f1f0ee;
}
@media all and (max-width: 400px) and (min-width: 100px) {
  .newsContainer {
    padding-top: 310px;
  }
}
@media all and (max-width: 991px) and (min-width: 401px) {
  .newsContainer {
    padding-top: 155px;
  }
}
</style>

