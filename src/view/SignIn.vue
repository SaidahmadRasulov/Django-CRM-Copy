<template>
  <div class="w-full h-[90vh] mx-auto flex items-center justify-center">
    <form @submit.prevent="submit" class="w-1/3 flex flex-col gap-4">
      <label for="" class="text-xl">Login</label>
      <input
        class="p-4 border border-[#33333390] rounded-md outline-none"
        type="text"
        placeholder="username"
        v-model="data.username"
      />
      <label for="" class="text-xl">Parol</label>
      <input
        class="p-4 border border-[#33333390] rounded-md outline-none"
        type="password"
        placeholder="password"
        v-model="data.password"
      />
      <button
        type="submit"
        class="py-2 px-4 rounded-md w-1/3 mx-auto text-white text-md bg-green-500"
      >
        Log In
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
