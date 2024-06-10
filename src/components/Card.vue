<template>
  <div class="card p-1 w-full h-[360px] shadow-md bg-white rounded-md">
    <div class="card_header text-center">
      <i class='bx bx-group text-[100px]'></i>
    </div>
    <div class="card_body p-4">
      <h1 class="text-lg h-[60px]">Guruh Raqami: {{ item.title }}</h1>
      <h2>O'quvchilar Soni: {{ item.students_count }}</h2>
      <h2>O'qish kunlari: {{ item.study_day }}</h2>
      <h2>Qachon o'chilgan: {{ item.added_date }}</h2>
      <h2>
        O'qish vaqtlari: {{ getFormattedTime(item.lesson_start_time) }} -
        {{ getFormattedTime(item.lesson_end_time) }}
      </h2>
    </div>
    <div class="card_footer text-[12px] p-2 text-end flex items-center justify-between">
      <button
        class="py-2 px-2 bg-red-700 rounded-md border border-red-700 hover:bg-transparent text-white  hover:text-red-700 transition-all delay-75"
        @click="handleDelete(item.id)"
      >
        Guruhni o'chirish
      </button>
      <RouterLink :to="`/${this.path}/${item.title}`">
        <button
          class="py-2 px-2 bg-green-700 rounded-md border border-green-700 hover:bg-transparent  text-white hover:text-green-700 transition-all delay-75"
        >
          Guruhni ko'rish
        </button>
      </RouterLink>
    </div>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      token: localStorage.getItem("token"),
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  methods: {
    async handleDelete(id) {
      let confirm = window.confirm("O'chirishga ro'zimisz?");
      if (confirm) {
        const response = await fetch(
          `https://django-admin.uz/api/groups/${id}/delete/`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-type": "application/json",
            },
            body: JSON.stringify(id),
          }
        ).then(() => {
          window.location.reload();
        });
      } else {
        alert("O'chirilish bekor qilindi!");
      }
    },
    getFormattedTime(time) {
      if (!time) return "";
      const [hours, minutes, _] = time.split(":");
      return `${hours}:${minutes}`;
    },
  },

  components: { RouterLink },
};
</script>
<style lang=""></style>
