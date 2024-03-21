<template>
  <div class="flex justify-between" v-if="visibility">
    <LayoutNavbar />
    <div class="vertical_line w-1 h-[100vh] bg-blue"></div>
    <section class="w-4/5 bg-slate-300 p-4 h-[100vh]">
      <RouterView />
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
      visibility: false,
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
  },
  setup() {
    onMounted(async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing. User may not be logged in.");
        return;
      }
    });
  },
  components: { LayoutNavbar, RouterView, SignIn },
};
</script>
