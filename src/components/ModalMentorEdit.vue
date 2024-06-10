<template>
  <div class="w-full pt-[6rem] relative">
    <MentorEdit />
    <i
      class="bx bx-x text-white text-[3rem] absolute top-0 right-0 hover:cursor-pointer"
      @click="handleCloseModalEdit"
    ></i>
  </div>
</template>
<script>
import MentorEdit from "./MentorEdit.vue";

export default {
  data() {
    return {
      storedEditModalValue: JSON.parse(
        localStorage.getItem("mentor_edit_modal")
      ),
    };
  },
  components: {
    MentorEdit,
  },
  methods: {
    handleCloseModalEdit() {
        this.storedEditModalValue = false;
        localStorage.setItem('mentor_edit_modal', JSON.stringify(this.storedEditModalValue))
        window.location.reload()
    },
  },
};
</script>
<style lang=""></style>
