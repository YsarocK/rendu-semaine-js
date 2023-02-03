<template>
  <div>
    <h1>Utilisateurs</h1>
    <div class="users">
      <div
        class="users__card"
        v-for="user in users"
        :class="selected === user.id && 'selected'"
        @click="selected = user.id"
      >
        <p>{{ user.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from "vue";
import type { User } from "../types/user";

const selected: Ref<number | null> = ref(0);

const props = defineProps<{
  users: User[];
}>();

watch(
  () => selected.value,
  (value) => {
    if (value) {
      emit("select", value);
    }
  }
);

const emit = defineEmits(["select"]);
</script>

<style scoped lang="scss">
.users {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  &__card {
    cursor: pointer;
    position: relative;

    &::before {
      display: none;
      content: "👉";
      height: fit-content;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      right: 102%;
    }

    &.selected {
      &::before {
        display: block;
      }
    }
  }
}
</style>
