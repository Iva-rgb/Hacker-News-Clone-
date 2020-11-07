<template>
  <div class="container">
    <template v-if="comments.length != 0">
      <div class="commentWrap" v-for="comment in comments" :key="comment.id">
        <div class="commentBlock">
          <p v-html="comment.text"></p>
          <comments :data="comment.kids" />
          <a @click="store.renderDescendantComments">Show more</a>
        </div>
        <!-- <div v-if="store.getRenderComments">
          <template>
            <div class="commentReply"></div>
          </template>
        </div> -->
      </div>
    </template>
  </div>
</template>

<script>
import { inject, ref } from "vue";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

export default {
  props: ["data"],
  name: "Comments",
  setup(props) {
    const store = inject("global");
    let comments = ref([]);

    props.data.map((id) => {
      axios.get(`${BASE_URL}/v0/item/${id}.json`).then((res) => {
        comments.value.push(res.data);
      });
    });

    return {
      store,
      comments,
    };
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}
.commentWrap {
  margin-bottom: 10px;
  display: table;
  width: 100%;
  min-height: 5.3125rem;
}

.commentBlock {
  padding: 1rem;
  background-color: #fff;
  display: table-cell;
  vertical-align: top;
  border-radius: 0.1875rem;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
}
p {
  margin: 0;
}
a {
  padding-top: 20px;
  cursor: pointer;
}
.comment-block textarea {
  width: 100%;
  resize: none;
}
commentReply {
  margin-left: 2em;
}
</style>