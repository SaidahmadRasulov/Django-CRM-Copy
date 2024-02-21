<template>
  <div>
    <Registration :data="data" />
  </div>
</template>
<script>
import Registration from "../components/Registration.vue";

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  components: { Registration },
};
</script>
<style lang=""></style>
