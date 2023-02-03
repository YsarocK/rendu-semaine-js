<template>
  <div>
    <h1>Nombre de e dans chaque titre de post</h1>
    <p>Formulaire de saisie</p>
    <form @submit="handleSubmit">
      <label for="post">Nombre de post(s): </label>
      <input type="text" id="post" class="post" v-model="postsNumber" />
      <input type="submit" value="Calculer" class="submitPost" />
    </form>
    <div>
      <p class="message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import type { Post } from "../types/post";

const props = defineProps<{
  posts: Post[];
}>();

const message: Ref<string> = ref("");
const postsNumber: Ref<number> = ref(2);

const handleSubmit = (e: Event) => {
  e.preventDefault();
  let res: number = 0;
  props.posts.slice(0, postsNumber.value).forEach((post) => {
    const title = post.title;
    const eNumber = title.split("e").length - 1;
    res += eNumber;
  });
  message.value = `
    Il y a ${res} e dans les ${postsNumber.value} premiers titres de post.
    La valeur moyenne est de ${res / postsNumber.value}
  `;
};
</script>
