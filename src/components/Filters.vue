<template>
  <nav class="navbar">
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <span>In</span>
          <button
            class="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Stories <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <button @click="store.filterByType('story')" class="dropdown-item">
              Stories
            </button>
            <div class="dropdown-divider"></div>
            <button @click="store.filterByType('jobs')" class="dropdown-item">
              Jobs
            </button>
          </div>
        </li>

        <li class="nav-item dropdown">
          <span>by</span>
          <button
            class="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Date <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <button @click="store.filterBy('score')" class="dropdown-item">
              Popularity
            </button>
            <div class="dropdown-divider"></div>
            <button @click="store.filterBy('time')" class="dropdown-item">
              Date
            </button>
          </div>
        </li>

        <li class="nav-item dropdown">
          <span>for</span>
          <button
            class="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Time <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <button @click="store.filterByTime('24')" class="dropdown-item">
              Last 24h
            </button>
            <div class="dropdown-divider"></div>
            <button @click="store.filterByTime('week')" class="dropdown-item">
              Last week
            </button>
            <div class="dropdown-divider"></div>
            <button @click="store.filterByTime('month')" class="dropdown-item">
              Last month
            </button>
            <div class="dropdown-divider"></div>
            <button @click="store.filterByTime('year')" class="dropdown-item">
              Last year
            </button>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { inject } from "vue";
export default {
  inject: ["global"],
  setup() {
    const store = inject("global");

    return {
      store,
    };
  },
};
</script>

<style scoped>
.navbar {
  margin: 0;
  display: flex;
  flex-wrap: flex;
  align-items: center;
}
.collapse {
  width: 100%;
  padding: 0;
}
ul {
  width: 100%;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
}
li {
  padding: 0 10px;
}
span {
  color: grey;
  font-size: 11px;
}
.nav-link {
  text-decoration: none;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #ee8022;
  color: white;
  margin-left: 17px;
}
.dropdown-item {
  border: none;
  outline: none;
  background-color: white;
}
</style>