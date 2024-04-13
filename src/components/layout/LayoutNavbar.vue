<template>
  <header class="w-1/5 bg-slate-300 h-fully">
    <div class="navbar">
      <div class="navbar_logo text-center p-4 bg-blue">
        <h1 class="text-2xl text-white">Django Academy LMS</h1>
      </div>
      <nav class="navbar_nav mt-[1rem]">
        <ul class="nav_group text-xl flex flex-col gap-2">
          <li
            class="nav_item group"
            :class="{ 'bg-blue text-white': $route.path === '/' }"
          >
            <RouterLink
              to="/"
              class="flex items-center gap-2 group-hover:text-white transition-colors delay-75 p-4"
            >
              <i class="bx bx-add-to-queue text-[28px]"></i>
              <h3>Registratsiya</h3>
            </RouterLink>
          </li>
          <li
            class="nav_item group"
            :class="{ 'bg-blue text-white': $route.path === '/students' }"
          >
            <RouterLink
              to="/students"
              class="flex items-center gap-2 group-hover:text-white transition-colors delay-75 p-4"
            >
              <i class="bx bx-list-ul text-[28px]"></i>
              <h3>O'quvchilar ro'yxati</h3>
            </RouterLink>
          </li>
          <li
            class="nav_item group"
            :class="{ 'bg-blue text-white': $route.path === '/groups' }"
          >
            <RouterLink
              to="/groups"
              class="flex items-center gap-2 group-hover:text-white transition-colors delay-75 p-4"
            >
              <i class="bx bx-add-to-queue text-[28px]"></i>
              <h3>Guruhlar Yo'qlamasi</h3>
            </RouterLink>
          </li>
          <li
            class="nav_item group"
            :class="{ 'bg-blue text-white': $route.path === '/payments' }"
          >
            <RouterLink
              to="/payments"
              class="flex items-center gap-2 group-hover:text-white transition-colors delay-75 p-4"
            >
              <i class="bx bx-money text-[28px]"></i>
              <h3>To'lovlar</h3>
            </RouterLink>
          </li>
          <li
            class="nav_item group"
            :class="{ 'bg-blue text-white': $route.path === '/completed' }"
          >
            <RouterLink
              to="/completed"
              class="flex items-center gap-2 group-hover:text-white transition-colors delay-75 p-4"
            >
              <i class="bx bx-check-square text-[28px]"></i>
              <h3>Bitirganlar</h3>
            </RouterLink>
          </li>
          <li
            class="nav_item group"
            :class="{ 'bg-blue text-white': $route.path === '/leads' }"
          >
            <RouterLink
              to="/leads"
              class="flex items-center gap-2 group-hover:text-white transition-colors delay-75 p-4"
            >
              <i class="bx bxs-id-card text-[28px]"></i>
              <h3>Lidlar</h3>
            </RouterLink>
          </li>
          <li
            class="nav_item group"
            :class="{ 'bg-blue text-white': $route.path === '/mentors' }"
          >
            <RouterLink
              to="/mentors"
              class="flex items-center gap-2 group-hover:text-white transition-colors delay-75 p-4"
            >
              <i class="bx bx-user-circle text-[28px]"></i>
              <h3>Mentorlar</h3>
            </RouterLink>
          </li>
          <li
            class="nav_item group"
            :class="{ 'bg-blue text-white': $route.path === '/trash' }"
          >
            <RouterLink
              to="/trash"
              class="flex items-center gap-2 group-hover:text-white transition-colors delay-75 p-4"
            >
              <i class="bx bx-trash-alt text-[28px]"></i>
              <h3>O'chirilganlar</h3>
            </RouterLink>
          </li>
          <li class="nav_item group">
            <button
              class="bg-blue rounded-md hover:bg-transparent border-blue border hover:text-blue p-2 ml-4 text-white"
              @click="handleLogout"
            >
              Qayta kirish
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script>
import { RouterLink } from "vue-router";
export default {
  components: { RouterLink },
  methods: {
    handleLogout() {
      let confirm = window.confirm("Dasturdan chiqishga ro'zimisz?");
      if (confirm) {
        window.localStorage.clear();
        window.location.reload();
      } else {
        alert("Dasturdan chiqish bekor qilindi.");
      }
    },
  },
};
</script>
<style lang=""></style>
