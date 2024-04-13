<template>
  <div>
    <h1 class="text-2xl">Mentorlar Bo'limi</h1>
    <div class="flex gap-2 items-center">
      <div class="mentor_cards h-[85vh] overflow-y-scroll mt-10 w-2/3">
        <MentorCard v-for="teacher in mentors" :teacher="teacher" />
      </div>
      <div class="mentor_add w-1/3">
        <MentorAdd />
      </div>
    </div>
  </div>
</template>
<script>
import MentorAdd from "../components/MentorAdd.vue";
import MentorCard from "../components/MentorCard.vue";

export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      mentors: [],
    };
  },
  methods: {
    getMentors() {
      fetch("http://django-admin.uz/api/customer/mentors/all/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          this.mentors = data;
          console.log(this.mentors);
        });
    },
  },
  mounted() {
    this.getMentors();
  },
  components: { MentorCard, MentorAdd },
};
</script>
<style lang=""></style>
