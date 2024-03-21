<template>
  <div class="mentor_card w-2/3 flex gap-10 mb-10 mt-10">
    <div class="mentor_card_header w-1/4">
      <img class="w-full" src="../assets/cartImage.jpg" alt="" />
    </div>
    <div class="mentor_card_body">
      <h1 class="text-2xl mb-2">{{ teacher.fullname }}</h1>
      <h2 class="text-xl mb-2">Telefon raqam: {{ teacher.phone_number }}</h2>
      <h2 class="text-xl mb-2">Tugulgan kuni: {{ teacher.birthday }}</h2>
      <h2 class="text-xl">Yashash Manzili: {{ teacher.location }}</h2>
      <h2 class="text-xl mb-2">Guruhlar soni: {{ teacher.group_count }}</h2>
      <RouterLink :to="`/mentors/${teacher.id}`">
        <button
          class="py-1 mt-4 px-4 rounded-md bg-blue hover:bg-transparent hover:text-blue text-lg text-white transition-all delay-75 border border-blue"
        >
          Ko'rish
        </button>
      </RouterLink>
    </div>
  </div>
</template>
<script>
import {RouterLink} from 'vue-router'

export default {
  props: {
    teacher: {
      type: Object,
      required: true,
    },
  },
  components: { RouterLink },
};
</script>
<style lang=""></style>
