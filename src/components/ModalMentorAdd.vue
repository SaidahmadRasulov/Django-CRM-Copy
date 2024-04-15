<template lang="">
  <div class="w-full pt-[6rem] relative">
    <MentorAdd />
    <i
      class="bx bx-x text-white text-[3rem] absolute top-0 right-0 hover:cursor-pointer"
      @click="handleCloseModalAdd"
    ></i>
  </div>
</template>
<script>
import MentorAdd from "./MentorAdd.vue";
export default {
  data() {
    return {
      storedModalValue: JSON.parse(localStorage.getItem("mentor_add_modal")),
    };
  },
  methods: {
    handleCloseModalAdd() {
      this.storedModalValue = false;
      localStorage.setItem(
        "mentor_add_modal",
        JSON.stringify(this.storedModalValue)
      );
      window.location.reload();
    },
  },
  components: {
    MentorAdd,
  },
};
</script>
<style lang=""></style>
