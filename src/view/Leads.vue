<template>
  <div class="lids_title relative">
    <h2 class="text-xl">Lidlar</h2>
  </div>
  <div class="lids_content">
    <TableLeads />
  </div>
</template>

<script>
import TableLeads from "../components/TableLeads.vue";
export default {
  data() {
    return {
      toggleAdd: false,
      toggleLead: false,
    };
  },
  components: {
    TableLeads,
  },
  watch: {
    toggleAdd(newToggleVal) {
      localStorage.setItem("modal-add", JSON.stringify(newToggleVal));
    },
    toggleLead(newToggleLead) {
      localStorage.setItem("modal-lead", JSON.stringify(newToggleLead));
    },
  },
  mounted() {
    const savedToggleAdd = localStorage.getItem("modal-add");
    if (savedToggleAdd !== null) {
      this.toggleAdd = JSON.parse(savedToggleAdd);
    }
    const savedToggleLead = localStorage.getItem("modal-lead");
    if (savedToggleAdd !== null) {
      this.toggleLead = JSON.parse(savedToggleLead);
    }
  },
};
</script>

<style lang=""></style>
