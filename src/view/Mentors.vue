<template>
  <div>
    <h1 class="text-xl">Mentorlar Bo'limi</h1>
    <div class="modal_add mt-2">
      <button
        class="py-2 px-4 text-white bg-green-600 rounded-md"
        @click="handleShowModal"
      >
        Mentor qo'shish
      </button>
    </div>
    <div v-if="mentors.length > 0">
      <div
        class="mentor_cards flex gap-10 flex-wrap h-[80vh] overflow-y-scroll mt-6 w-full"
      >
        <MentorCard v-for="teacher in mentors" :teacher="teacher" />
      </div>
      
    </div>
    <div  v-else>
      <img class="mx-auto h-[70vh] w-1/2" src="../assets/no-data.png" alt="" />
    </div>
    <div
        v-if="this.add_modal"
        class="absolute left-0 top-0 backdrop-brightness-50 w-full h-[100vh]"
      >
        <ModalMentorAdd />
      </div>
  </div>
</template>
<script>
import MentorAdd from "../components/MentorAdd.vue";
import MentorCard from "../components/MentorCard.vue";
import ModalMentorAdd from "../components/ModalMentorAdd.vue";

export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      mentors: [],
      add_modal: false,
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
    handleShowModal() {
      this.add_modal = true;
      localStorage.setItem("mentor_add_modal", JSON.stringify(this.add_modal));
    },
  },
  watch: {
    add_modal(newVal) {
      localStorage.setItem("mentor_add_modal", JSON.stringify(newVal));
    },
  },
  mounted() {
    this.getMentors();
    const storedValue = JSON.parse(localStorage.getItem("mentor_add_modal"));
    if (storedValue !== null) {
      this.add_modal = storedValue;
    }
  },
  components: { MentorCard, MentorAdd, ModalMentorAdd },
};
</script>
<style lang=""></style>
