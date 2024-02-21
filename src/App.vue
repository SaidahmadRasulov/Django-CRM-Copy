<template>
  <div class="flex justify-between">
    <LayoutNavbar />
    <div class="vertical_line w-1 h-[100vh] bg-blue"></div>
    <section class="w-4/5 bg-slate-300 p-4 h-[100vh]">
      <RouterView :data="data" />
    </section>
  </div>
</template>

<script>
import LayoutNavbar from "./components/layout/LayoutNavbar.vue";
import { RouterView } from "vue-router";

export default {
  data() {
    return {
      data: [],
      mentors: [
        {
          id: 1,
          name: "Madaminov Izzatulloh",
          teacher: "Front-End",
          value: "dev",
          groups: [],
          address: "Toshkent Shahar",
        },
        {
          id: 2,
          name: "Rasulov Saidahmad",
          teacher: "Front-End",
          value: "py",
          groups: [],
          address: "Toshkent Shahar",
        },
        {
          id: 3,
          name: "Abdulloh Ergashev",
          teacher: "Grafik Dizayn",
          value: "des",
          groups: [],
          address: "Toshkent Shahar",
        },
      ],
    };
  },
  watch: {
    data: {
      handler(newData) {
        localStorage.setItem("students", JSON.stringify(newData));
      },
      deep: true,
    },
  },
  mounted() {
    const storedData = localStorage.getItem("students");
    if (!storedData) {
      localStorage.setItem("students", JSON.stringify(this.data));
    } else {
      this.data = JSON.parse(storedData);
    }
    const storedMentors = JSON.parse(localStorage.getItem("teachers"));
    if (storedMentors) {
      this.mentors = storedMentors;
    } else {
      localStorage.setItem("teachers", JSON.stringify(this.mentors));
    }
  },
  components: { LayoutNavbar, RouterView },
};
</script>
