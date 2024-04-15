<template>
  <section class="">
    <h1 class="text-2xl mb-4">O'quvchi qo'shish</h1>
    <div class="flex flex-col lg:flex-row">
      <div class="lg:w-full">
        <RegistForm />
      </div>
      <div class="lg:w-full">
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
