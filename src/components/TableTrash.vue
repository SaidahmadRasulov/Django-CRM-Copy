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
        <Card :item="item" :key="item.id" :path="this.path" />
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
      path: "payment",
      token: localStorage.getItem("token"),
    };
  },
  mounted() {
    this.getGroups();
  },
  methods: {
    async getGroups() {
      const response = await fetch("http://django-admin.uz/api/groups/all/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((response) => {
          this.groupsRender = response.data;
          console.log(this.groupsRender);
          // Call the filter method after data is fetched
          this.handleFilterGroups();
        });
    },
    handleFilterGroups() {
      this.filteredGroups = this.groupsRender.filter((item) => {
        if (this.groupsSelect == "all") {
          return true; // Return all items
        } else {
          return item.course_info.val == this.groupsSelect;
        }
      });
    },
  },
  components: { Card },
};
</script>

<style lang=""></style>
