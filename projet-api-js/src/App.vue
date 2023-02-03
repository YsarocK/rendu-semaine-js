<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import PostsForm from "./components/PostsForm.vue";
import type { Post } from "./types/post";

const posts: Ref<Post[]> = ref([]);

onMounted(async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  posts.value = await res.json();
});
</script>

<template>
  <div>
    <PostsForm v-if="posts.length > 0" :posts="posts" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
