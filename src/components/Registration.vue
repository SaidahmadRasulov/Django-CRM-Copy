<template>
  <section>
    <h1 class="text-2xl">O'quvchi qo'shish</h1>
    <div class="container mt-[2rem] flex gap-4">
      <RegistForm :data="data" />
      <div class="w-1/4">
        <GroupAdd />
      </div>
      <div class="w-1/4">
        <MentorAdd />
      </div>
    </div>
  </section>
</template>

<script>
import MentorAdd from "./MentorAdd.vue";
import GroupAdd from "./GroupAdd.vue";
import RegistForm from "./RegistForm.vue";

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  
  components: { MentorAdd, GroupAdd, RegistForm },
};
</script>

<style></style>
