<template>
  <div>
    <div class="user" v-if="user">
      <div class="user__header">
        <h1>{{ user.name }}</h1>
        <p class="user__mail">{{ user.email }}</p>
      </div>
      <h2 v-if="userPosts && userPosts.length">
        Posts ({{ userPosts.length }})
      </h2>
      <div class="user__posts" v-if="userPosts && userPosts.length">
        <div class="user__posts__card" v-for="(post, index) in userPosts">
          <p>{{ post.title }}</p>
          <p class="post-comments" v-if="userPostsComments">
            Commentaires : {{ userPostsComments[index].length }}
          </p>
        </div>
      </div>
      <h2>Commentaires moyens : {{ averageCommentsNumber }}</h2>
      <h2 v-if="userTodos">Taches ({{ userTodos.length }})</h2>
      <div v-if="userTodos">
        <p>
          Taches en cours :
          {{ userTodos.filter((todo) => todo.completed === false).length }}
        </p>
        <p>
          Taches terminées :
          {{ userTodos.filter((todo) => todo.completed === true).length }}
        </p>
      </div>
      <h2>User le plus proche</h2>
      <div v-if="closestUser" class="user__closest">
        <p>{{ closestUser.user }}</p>
        -
        <p>{{ closestUser.distance }}</p>
      </div>
      <h2>10 mots les plus utilisés</h2>
      <div v-for="word in top10Words">
        <p>{{ word[0] }}</p>
      </div>
    </div>
    <h1 v-else>Aucun utilisateur séléctionné</h1>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from "vue";
import type { User } from "../types/user";
import type { Post } from "../types/post";

const props = defineProps<{
  userId: number | null;
  users: User[];
}>();

const user: Ref<User | null> = ref(null);

const userPosts: Ref<Post[] | null> = ref(null);

const userPostsComments: Ref<any[] | null> = ref(null);
const averageCommentsNumber = ref(0);

const userTodos: Ref<any[] | null> = ref(null);

const closestUser: Ref<{ user: string; distance: number } | null> = ref(null);
const top10Words: Ref<any[] | null> = ref(null);

watch(
  () => props.userId,
  (value) => {
    if (value) {
      retrieveUser(value);
    }
  }
);

const retrieveUser = async (userId: number) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  user.value = await res.json();

  Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`).then(
      (res) => (res.ok && res.json()) || Promise.reject(res)
    ),
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`).then(
      (res) => (res.ok && res.json()) || Promise.reject(res)
    ),
  ]).then((data) => {
    userPosts.value = data[0];
    const commentsURIs: string[] = [];
    data[0].forEach((element) => {
      commentsURIs.push(
        `https://jsonplaceholder.typicode.com/posts/${element.id}/comments`
      );
    });
    Promise.all(
      commentsURIs.map((uri) => fetch(uri).then((res) => res.json()))
    ).then((data) => {
      averageCommentsNumber.value =
        data.reduce((partialSum, a) => partialSum + a.length, 0) /
        commentsURIs.length;
      userPostsComments.value = data;
    });

    userTodos.value = data[1];

    getClosestUser();
    getMostUsedWords();
  });
};

const getClosestUser = () => {
  const closest = {
    user: "",
    distance: 0,
  };
  for (const el of props.users) {
    if (!user.value) return;
    let y = Number(user.value.address.geo.lat) - Number(el.address.geo.lat);
    let x = Number(user.value.address.geo.lng) - Number(el.address.geo.lng);

    const distance = Math.sqrt(x * x + y * y);
    if (distance > closest.distance) {
      closest.user = el.name;
      closest.distance = distance;
    }
  }
  closestUser.value = closest;
};

const getMostUsedWords = () => {
  if (userPosts.value === null) return;
  const text = userPosts.value
    .map((post) => post.title)
    .join(" ")
    .toLowerCase();
  const words = text.split(" ");
  const wordCounts = {};

  for (const word of words) {
    if (wordCounts[word]) {
      wordCounts[word] += 1;
    } else {
      wordCounts[word] = 1;
    }
  }

  const entries = Object.entries(wordCounts);
  entries.sort((a: any, b: any) => b[1] - a[1]);

  top10Words.value = entries.slice(0, 10);
};
</script>

<style scoped lang="scss">
.user {
  background-color: #353535;
  padding: 1rem 1.5rem;
  margin-top: 2rem;

  h1 {
    margin-top: 0;
  }

  h2 {
    margin-top: 4rem;
  }

  &__header {
    gap: 1rem;

    p {
      margin-top: -1.5rem;
      opacity: 0.6;
    }
  }

  &__posts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    &__card {
      display: flex;
      flex-direction: column;
      gap: 0;

      p {
        margin: 0;
      }

      .post-comments {
        font-size: 0.8rem;
        opacity: 0.7;
      }
    }
  }

  &__closest {
    display: flex;
    gap: 1rem;

    p {
      margin: 0;
    }
  }
}
</style>
