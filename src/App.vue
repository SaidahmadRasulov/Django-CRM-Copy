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
import { onMounted, ref, watchEffect, onUnmounted } from "vue";
import SignIn from "./view/SignIn.vue";

export default {
  setup() {
    const visibility = ref(false);
    const router = useRouter();

    onMounted(() => {
      const logged = JSON.parse(localStorage.getItem("login"));
      if (logged) {
        visibility.value = true;
        localStorage.setItem("visibility", JSON.stringify(visibility.value));
        const timer = setTimeout(() => {
          visibility.value = false;
          localStorage.setItem("visibility", JSON.stringify(visibility.value));
          router.push("/signin");
        }, 5 * 60 * 60 * 1000);

        onUnmounted(() => {
          clearTimeout(timer);
        });
      } else {
        visibility.value = false;
        localStorage.setItem("visibility", JSON.stringify(visibility.value));
        router.push("/signin");
      }
    });

    onMounted(async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing. User may not be logged in.");
        return;
      }
    });

    return { visibility };
  },
  components: { LayoutNavbar, RouterView, SignIn },
};
</script>
