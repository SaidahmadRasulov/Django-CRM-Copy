<template>
  <div class="flex justify-between" v-if="visibility">
    <LayoutNavbar />
    <div class="vertical_line w-1 h-[100vh] bg-blue"></div>
    <section class="w-4/5 bg-slate-300 p-4 h-[100vh]">
      <RouterView :data="data" />
    </section>
  </div>
  <SignIn v-else />
</template>

<script>
import LayoutNavbar from "./components/layout/LayoutNavbar.vue";
import { RouterView, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import SignIn from "./view/SignIn.vue";

export default {
  data() {
    return {
      data: [],
      visibility: false,
      mentors: [
        {
          id: 1,
          name: "Madaminov Izzatulloh",
          teacher: "Front-End",
          value: "dev",
          groups: [],
          address: "Toshkent Shahar",
          phone: "+998-90-142-71-41",
        },
        {
          id: 2,
          name: "Rasulov Saidahmad",
          teacher: "Front-End",
          value: "py",
          groups: [],
          address: "Toshkent Shahar",
          phone: "+998-90-142-71-41",
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
    visibility: {
      handler(newValue) {
        localStorage.setItem("visibility", JSON.stringify(newValue));
      },
      deep: true,
    },
  },
  mounted() {
    const logged = JSON.parse(localStorage.getItem("login"));
    const router = useRouter();
    if (logged) {
      this.visibility = true;
      localStorage.setItem("visibility", JSON.stringify(this.visibility));
    } else {
      this.visibility = false;
      localStorage.setItem("visibility", JSON.stringify(this.visibility));
      router.push("/signin");
    }

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
  setup() {
    onMounted(async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing. User may not be logged in.");
        return;
      }

      try {
        const response = await fetch(
          "http://django-admin.uz/api/attendances/all/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
            credentials: "include",
          }
        );
        console.log(response)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const content = await response.json();
        console.log(content);
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    });
  },
  components: { LayoutNavbar, RouterView, SignIn },
};
</script>
