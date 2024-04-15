<template>
  <div
    class="mentor_card w-1/4 h-[370px] p-4 bg-white shadow-md rounded-md mb-10"
  >
    <div class="mentor_card_header w-full text-center mb-4">
      <i class="bx bx-user text-[100px]"></i>
    </div>
    <div class="mentor_card_body">
      <h1 class="text-xl mb-2">{{ teacher.fullname }}</h1>
      <h2 class="mb-2">Telefon raqam: {{ teacher.phone_number }}</h2>
      <h2 class="mb-2">Tugulgan kuni: {{ teacher.birthday }}</h2>
      <h2 class="mb-2">Yashash Manzili: {{ teacher.location }}</h2>
      <h2 class="mb-2">Guruhlar soni: {{ teacher.group_count }}</h2>
    </div>
    <div class="text-end">
      <button
        class="p-2 rounded-md bg-red-600 hover:bg-transparent hover:text-red-600 text-[1rem] text-white transition-all delay-75 border border-red-600 mr-4"
        @click="handleDeleteMentor(teacher.id)"
      >
        O'chirish
      </button>
      <RouterLink :to="`/mentors/${teacher.id}`">
        <button
          class="p-2 rounded-md bg-blue hover:bg-transparent hover:text-blue text-[1rem] text-white transition-all delay-75 border border-blue"
        >
          Ko'rish
        </button>
      </RouterLink>
    </div>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";

export default {
  props: {
    teacher: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    async handleDeleteMentor(id) {
  let confirmation = window.confirm("Ushbu mentorni o'chirishga ro'zimisz?");
  if (confirmation) {
    try {
      const response = await fetch(
        `http://django-admin.uz/api/customer/mentors/${id}/delete/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify(id),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // No need to parse response as JSON since it's empty for DELETE requests

      // Reload the page after successful deletion
      window.location.reload();
    } catch (error) {
      console.error("Error deleting mentor:", error);
      // Handle error, display error message to the user, etc.
    }
  }
},

  },
  components: { RouterLink },
};
</script>
<style lang=""></style>
