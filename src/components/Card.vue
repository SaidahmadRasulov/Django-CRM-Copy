<template>
  <div class="card w-full bg-white rounded-md">
    <div class="card_header">
      <img src="../assets/cartImage.jpg" class="rounded-t-md" />
    </div>
    <div class="card_body p-4">
      <h1 class="text-2xl">Guruh Raqami: {{ item.title }}</h1>
      <h2>O'quvchilar Soni: {{ item.students.length }}</h2>
    </div>
    <div class="card_footer p-4 text-end">
      <RouterLink :to="`/groups/${item.title}`">
        <button
          class="py-2 px-4 bg-green-700 rounded-md border border-green-700 hover:bg-transparent text-white hover:text-green-700 transition-all delay-75"
        >
          Guruhni ko'rish
        </button>
      </RouterLink>
    </div>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: { RouterLink },
};
</script>
<style lang=""></style>
