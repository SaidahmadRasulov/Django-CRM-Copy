<template>
  <div class="students_title mb-4 relative">
    <h1 class="text-xl">O'quvchilar ro'yxati</h1>
  </div>
  <div class="students_content">
    <TableList />
  </div>
</template>

<script>
import TableList from "../components/TableList.vue";
export default {
  components: {
    TableList,
  },
};
</script>

<style scoped>
</style>
