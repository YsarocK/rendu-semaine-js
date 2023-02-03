<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import UsersList from "./components/UsersList.vue";
import UserInfo from "./components/UserInfo.vue";
import type { User } from "./types/user";

const users: Ref<User[]> = ref([]);
const selectedUser: Ref<number | null> = ref(null);

onMounted(async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  users.value = await res.json();
});
</script>

<template>
  <div>
    <UsersList
      v-if="users.length > 0"
      :users="users"
      @select="(id) => (selectedUser = id)"
    />
    <UserInfo :user-id="selectedUser" :users="users" />
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
