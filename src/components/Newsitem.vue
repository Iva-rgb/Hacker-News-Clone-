<template>
  <div class="card">
    <div class="card-header" :id="`heading${index}`">
      <div class="meta">
        <p class="news-item-title">
          <a :href="item.data.url">{{ item.data.title }} </a>
          <span class="url">{{ host(item.data.url) }}</span>
        </p>
        <p class="news-item-details">
          {{ item.data.score }} points by {{ item.data.by }}
          {{ mapTime(item.data.time) }} ago |
          {{ item.data.descendants }} comments
        </p>
      </div>

      <button
        class="btn btn-info raised"
        data-toggle="collapse"
        aria-expanded="false"
        :data-target="`#collapse${index}`"
        :aria-controls="`collapse${index}`"
        @click="fetchComment"
      >
        <i class="fa fa-comments"></i>
      </button>
    </div>

    <div
      :id="`collapse${index}`"
      class="collapse"
      :aria-labelledby="`heading${index}`"
      data-parent="#accordionExample"
    ></div>
  </div>
  <div v-if="flag">
    <div class="card-body">
      <comments :data="item.data.kids" />
    </div>
  </div>
</template>

<script>
import { inject, ref } from "vue";
import { mapTime } from "../helpers/mapTime";
import { host } from "../helpers/extractHost";

export default {
  inject: ["global"],
  props: ["item", "index", "kids"],
  setup() {
    // eslint-disable-next-line no-unused-vars
    const store = inject("global");
    let flag = ref(false);

    const fetchComment = () => {
      if (flag.value) flag.value = false;
      else flag.value = true;
    };

    return {
      mapTime,
      fetchComment,
      flag,
      host,
      store,
    };
  },
};
</script>

<style>
.card-header {
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px inset rgb(204, 204, 204);
}
.meta {
  text-align: left;
}
.news-item-title::before {
  counter-increment: news;
  content: counter(news) ". ";
  color: #828282;
}
.news-item-title a {
  text-decoration: none;
  color: initial;
}
.news-item-title .domain {
  color: #828282;
}
.news-item {
  font-size: 0.9em;
}
.news-item-details {
  margin-left: 2em;
  font-size: 0.7em;
  color: #828282;
}
.url {
  font-size: 0.8em;
  color: #828282;
  padding-left: 10px;
}
.btn-info.raised {
  box-shadow: 0 3px 0 0 #0099cc;
}
.btn-info.raised:active,
.btn-info.raised.active {
  background: #33a6cc;
  box-shadow: none;
  margin-bottom: -3px;
  margin-top: 3px;
}
.btn:focus {
  outline: none;
  border: 0;
}
.card-body {
  padding: 15px 0 15px 0;
}
.accordion {
  font-size: 1em;
  text-align: left;
}
</style>