<template>
  <div class="w-1/3 mx-auto mt-10">
    <h1>Login</h1>
    <form @submit.prevent="submit" class="flex flex-col gap-4">
      <input
        class="p-4"
        type="text"
        placeholder="username"
        v-model="data.username"
      />
      <input
        class="p-4"
        type="password"
        placeholder="password"
        v-model="data.password"
      />
      <button
        type="submit"
        class="py-2 px-4 rounded-sm text-white text-md bg-green-500"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      storedVisibility: null,
    };
  },
  mounted() {
    let visibility = JSON.parse(localStorage.getItem("visibility"));
    this.storedVisibility = visibility;
  },
  setup() {
    const data = reactive({
      username: "",
      password: "",
    });

    const login = ref(false);

    const router = useRouter();

    const submit = async () => {
      try {
        const response = await fetch("http://django-admin.uz/api/token/", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        });
        const response_data = await response.json();

        localStorage.setItem('refresh-token', response_data.refresh)
        localStorage.setItem("token", response_data.access);

        login.value = true;
        localStorage.setItem("login", JSON.stringify(login.value));

        console.log(response_data.access);
        await router.push("/");
        await window.location.reload();
      } catch (error) {
        console.error("An error occurred during login:", error);
      }
    };

    return {
      data,
      submit,
      login,
    };
  },
};
</script>
