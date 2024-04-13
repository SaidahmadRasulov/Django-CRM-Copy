<template>
  <section>
    <h1 class="text-2xl">O'quvchi qo'shish</h1>
    <div class="container mt-[2rem] flex gap-4">
      <RegistForm />
      <div class="w-2/4">
        <GroupAdd />
      </div>
    </div>
  </section>
</template>

<script>
import MentorAdd from "./MentorAdd.vue";
import GroupAdd from "./GroupAdd.vue";
import RegistForm from "./RegistForm.vue";

export default {
  
  components: { MentorAdd, GroupAdd, RegistForm },
};
</script>

<style></style>
