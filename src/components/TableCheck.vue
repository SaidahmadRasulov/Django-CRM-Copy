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
        <option v-for="item in this.courses" :value="item.val">
          {{ item.title }}
        </option>
      </select>
    </div>
    <div
      class="flex gap-4 flex-wrap h-[600px] p-4 overflow-y-scroll"
      v-if="this.groupsRender.length > 0"
    >
      <div class="card_content flex w-1/5" v-for="item in filteredGroups">
        <Card :item="item" :key="item.id" :path="this.path" />
      </div>
    </div>
    <div v-else>
      <img
        src="../assets/no-data.png"
        class="h-[70vh] mx-auto object-cover"
        alt=""
      />
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
      path: "groups",
      token: localStorage.getItem("token"),
      courses: [],
    };
  },
  mounted() {
    this.getGroups();
    this.getCourse();
  },
  methods: {
    async getGroups() {
      const response = await fetch("https://api.django-admin.uz/api/groups/all/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          this.groupsRender = data;
          console.log(this.groupsRender);
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
    getCourse() {
      fetch("https://api.django-admin.uz/api/courses/all/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          this.courses = data;
        });
    },
  },
  components: { Card },
};
</script>

<style lang=""></style>
