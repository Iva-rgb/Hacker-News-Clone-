<template>
  <Suspense>
    <template #default>
      <div class="home">
        <div class="accordion" id="accordionExample">
          <newsitem
            v-for="(item, index) in store.getDisplayedResults()"
            :key="item.data.id"
            :item="item"
            :index="index"
            :kids="item.data.kids"
          />
        </div>
        <div>
          <p class="more" @click="store.loadMore">Show more..</p>
        </div>
      </div>
    </template>
    <template #fallback>
      <div>Loading..</div>
    </template>
  </Suspense>
</template>

<script>
import Newsitem from "./Newsitem.vue";
import { inject } from "vue";
import { useRouter } from "vue-router";

export default {
  inject: ["global"],
  data: () => {
    return { name: "RenderContainer" };
  },
  components: {
    Newsitem,
  },
  setup() {
    const store = inject("global");
    const route = useRouter();
    const type = route.currentRoute.value.fullPath.substring(1);

    if (type == "") store.fetchApi();
    else store.forOthers(type);

    return {
      store,
    };
  },
};
</script>

<style scoped>
.home {
  counter-reset: news;
  padding: 5px 0 0 20px;
}
.more {
  font-size: 14px;
  margin: 10px 0;
  cursor: pointer;
}
</style>