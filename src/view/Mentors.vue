<template>
  <div>
    <h1 class="text-2xl">Mentorlar Bo'limi</h1>
    <div class="mentor_cards h-[85vh] overflow-y-scroll mt-10">
      <MentorCard v-for="teacher in mentors" :teacher="teacher" />
    </div>
  </div>
</template>
<script>
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
  components: { MentorCard },
};
</script>
<style lang=""></style>
