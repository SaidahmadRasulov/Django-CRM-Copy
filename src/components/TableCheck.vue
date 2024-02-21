<template>
  <div class="container mx-auto">
    <div class="select_box my-1 text-end">
      <select
        v-model="groupsSelect"
        id="groups"
        class="p-2 outline-none rounded-md shadow-md"
        @change="handleFilterGroups"
      >
        <option value="all">Hammasi</option>
        <option value="dev">Dasturlash</option>
        <option value="des">Grafik Design</option>
        <option value="py">Python</option>
      </select>
    </div>
    <div
      class="flex items-center gap-4 justify-around flex-wrap h-[600px] p-4 overflow-y-scroll"
    >
      <div class="card_content flex w-1/4" v-for="item in filteredGroups">
        <Card :item="item" :key="item.id" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  data() {
    return {
      groupsSelect: "all",
      groupsRender: [],
      filteredGroups: [],
    };
  },
  mounted() {
    const getedData = JSON.parse(localStorage.getItem("groups"));
    if (getedData) {
      this.groupsRender = getedData;
      this.filteredGroups = getedData;
    }
  },
  methods: {
    handleFilterGroups() {
      if (this.groupsSelect === "all") {
        this.filteredGroups = this.groupsRender;
      } else {
        this.filteredGroups = this.groupsRender.filter(
          (item) => item.cat === this.groupsSelect
        );
      }
    },
  },
  components: { Card },
};
</script>

<style lang=""></style>
