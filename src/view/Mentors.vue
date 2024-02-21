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
      mentors: [],
    };
  },
  mounted() {
    const storedMentors = JSON.parse(localStorage.getItem("teachers"));
    if (storedMentors) {
      this.mentors = storedMentors;
    }
  },
  components: { MentorCard },
};
</script>
<style lang=""></style>
