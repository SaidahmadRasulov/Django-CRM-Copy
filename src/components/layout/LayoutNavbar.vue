<template>
  <header class="w-[150px] header_layout shadow-xl shadow-[#3333335f]">
    <div class="navbar">
      <nav class="navbar_nav">
        <ul class="nav_group text-lg flex flex-col gap-2">
          <li
            class="nav_item group"
            :class="{ 'text-[#333] bg-orange-50': $route.path === '/' }"
          >
            <RouterLink
              to="/"
              class="flex flex-col items-center gap-2 transition-colors delay-75 p-2"
            >
              <i class="bx bx-download text-[28px]"></i>
              <h3 class="text-[10px]">Registratsiya</h3>
            </RouterLink>
          </li>
          <li
            class="nav_item group"
            :class="{ 'text-[#333] bg-orange-50': $route.path === '/leads' }"
          >
            <RouterLink
              to="/leads"
              class="flex flex-col items-center gap-2 transition-colors delay-75 "
            >
              <i class="bx bxs-id-card text-[28px]"></i>
              <h3 class="text-[10px]">Lidlar</h3>
            </RouterLink>
          </li>
          <li
            class="nav_item group"
            :class="{ 'text-[#333] bg-orange-50': $route.path === '/students' }"
          >
            <RouterLink
              to="/students"
              class="flex flex-col items-center gap-2 transition-colors delay-75 "
            >
              <i class="bx bx-list-ul text-[28px]"></i>
              <h3 class="text-[10px]">O'quvchilar ro'yxati</h3>
            </RouterLink>
          </li>
          <li
            class="nav_item group"
            :class="{ 'text-[#333] bg-orange-50': $route.path === '/groups' }"
          >
            <RouterLink
              to="/groups"
              class="flex flex-col items-center gap-2 transition-colors delay-75 "
            >
              <i class="bx bx-add-to-queue text-[28px]"></i>
              <h3 class="text-[10px]">Guruhlar Yo'qlamasi</h3>
            </RouterLink>
          </li>
          <li
            class="nav_item group"
            :class="{ 'text-[#333] bg-orange-50': $route.path === '/payments' }"
          >
            <RouterLink
              to="/payments"
              class="flex flex-col items-center gap-2 transition-colors delay-75 "
            >
              <i class="bx bx-money text-[28px]"></i>
              <h3 class="text-[10px]">To'lovlar</h3>
            </RouterLink>
          </li>
          <li
            class="nav_item group"
            :class="{
              'text-[#333] bg-orange-50': $route.path === '/completed',
            }"
          >
            <RouterLink
              to="/completed"
              class="flex flex-col items-center gap-2 transition-colors delay-75 "
            >
              <i class="bx bx-check-square text-[28px]"></i>
              <h3 class="text-[10px]">Bitirganlar</h3>
            </RouterLink>
          </li>
          <li
            class="nav_item group"
            :class="{ 'text-[#333] bg-orange-50': $route.path === '/mentors' }"
          >
            <RouterLink
              to="/mentors"
              class="flex flex-col items-center gap-2 transition-colors delay-75 "
            >
              <i class="bx bx-user-circle text-[28px]"></i>
              <h3 class="text-[10px]">Mentorlar</h3>
            </RouterLink>
          </li>
          <li
            class="nav_item group"
            :class="{ 'text-[#333] bg-orange-50': $route.path === '/trash' }"
          >
            <RouterLink
              to="/trash"
              class="flex flex-col items-center gap-2 transition-colors delay-75 "
            >
              <i class="bx bx-trash-alt text-[28px]"></i>
              <h3 class="text-[10px]">O'chirilganlar</h3>
            </RouterLink>
          </li>
          <li
            class="nav_item group text-[#333] "
          >
            <div
              @click="handleLogout"
              class="flex flex-col items-center gap-2 transition-colors delay-75 hover:cursor-pointer"
            >
              <i class="bx bx-log-out text-[28px]"></i>
              <h3 class="text-[10px]">Log-out</h3>
            </div>
          </li>
          <li class="nav_item group text-right"></li>
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
