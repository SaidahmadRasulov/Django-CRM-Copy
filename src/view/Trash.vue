<template>
  <div class="delete_title mb-4 relative">
    <h1 class="text-2xl">O'chirilganlar ro'yxati</h1>
  </div>
  <div class="deleted_content">
    <TableComponent />
  </div>
</template>
<script>
import TableComponent from "../components/TableComponent.vue";

export default {
  components: {
    TableComponent,
  },
};
</script>
<style lang=""></style>
