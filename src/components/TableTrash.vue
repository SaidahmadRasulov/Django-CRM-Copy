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
        <option v-for="item in courses" :key="item.val" :value="item.val">
          {{ item.title }}
        </option>
      </select>
    </div>
    <div
      class="flex gap-4 flex-wrap h-[600px] p-4 overflow-y-scroll"
      v-if="filteredGroups.length > 0"
    >
      <div class="card_content flex w-1/5" v-for="item in filteredGroups" :key="item.id">
        <Card :item="item" :path="path" />
      </div>
    </div>
    <div v-else>
      <img src="../assets/no-data.png" class="mx-auto h-[70vh]" alt="No data available" />
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
      path: "payments",
      token: localStorage.getItem("token"),
      courses: [],
    };
  },
  mounted() {
    this.getGroups();
    this.getCourses();
  },
  methods: {
    async getGroups() {
      try {
        const response = await fetch("https://api.django-admin.uz/api/groups/all/", {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        this.groupsRender = data;
        this.handleFilterGroups();
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    },
    async getCourses() {
      try {
        const response = await fetch("https://api.django-admin.uz/api/courses/all/", {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-type": "application/json",
          },
        });
        const data = await response.json();
        this.courses = data;
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    },
    handleFilterGroups() {
      if (this.groupsSelect === "all") {
        this.filteredGroups = this.groupsRender;
      } else {
        this.filteredGroups = this.groupsRender.filter(
          (item) => item.course_info.val === this.groupsSelect
        );
      }
    },
  },
  components: { Card },
};
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
