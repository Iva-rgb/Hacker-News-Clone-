<template>
  <div class="linksContainer">
    <ul class="">
      <li class="">
        <router-link class="link" to="/">All </router-link>
      </li>
      <li class="">
        <router-link class="link" to="/beststories">Hot</router-link>
      </li>
      <li class="">
        <router-link class="link" to="/showstories">Show HN</router-link>
      </li>
      <li class="">
        <router-link class="link" to="/askstories"> Ask HN </router-link>
      </li>
      <li class="">
        <router-link class="link" to="/jobstories"> Jobs </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => {
    return { name: "Links" };
  },
  setup() {},
};
</script>

<style scoped>
.linksContainer {
  padding-top: 10px;
  text-align: center;
}
ul {
  padding: 0 100px;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: #f1f0ee;
  border: 1px solid rgb(204, 204, 204);
}
li {
  list-style: none;
  background-color: #f1f0ee;
  padding: 10px 20px;
}
.link {
  font-size: 16px;
  text-decoration: none;
  color: grey;
}
li:hover {
  background-color: #fff;
}
</style>