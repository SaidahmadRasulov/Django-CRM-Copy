<template>
  <div>
    <h1 class="text-xl">O'quvchilar yo'qlamasi</h1>
    <TableCheck />
  </div>
</template>
<script>
import TableCheck from "../components/TableCheck.vue";
import TableList from "../components/TableList.vue";
export default {
  components: {
    TableList,
    TableCheck,
  },
};
</script>