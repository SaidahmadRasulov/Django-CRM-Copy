<template>
  <div>
    <h1 class="text-2xl">Mentor Guruhlari</h1>
    <div class="mt-6">
      <h1 class="text-2xl">Mentor: {{ teacher.fullname }}</h1>
      <h1 class="text-xl my-2">Guruhlari:</h1>
    </div>
    <div class="overflow-y-scroll h-[70vh] flex justify-around gap-4 flex-wrap">
      <div
        class="group_card rounded-md bg-white w-[30%]"
        v-for="group in teacher.groups"
      >
        <div class="group_card_header w-full h-1/2">
          <img
            src="../assets/cartImage.jpg"
            class="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div class="group_card_body p-4">
          <h1 class="text-xl">Guruh raqami: {{ group.title }}</h1>
          <h1 class="text-xl my-2">
            O'quvchilar soni: {{ group.students_count }}
          </h1>
          <h1 class="text-xl">
            O'qish kunlari:
            <span class="capitalize">{{ group.study_day }}</span>
          </h1>
          <h1 class="text-xl">
            Guruhning Statusi:
            <span class="capitalize">{{ group.status }}</span>
          </h1>
        </div>
        <div class="group_card_footer text-end mt-[30px] px-4">
          <RouterLink
            :to="`/groups/${group.title}`"
            v-if="group.status !== 'completed'"
          >
            <button
              class="py-2 px-2 bg-blue rounded-md border border-blue hover:bg-transparent text-white hover:text-blue transition-all delay-75"
            >
              Guruhni ko'rish
            </button>
          </RouterLink>
          <RouterLink :to="`/completed`" v-else>
            <button
              class="py-2 px-2 bg-blue rounded-md border border-blue hover:bg-transparent text-white hover:text-blue transition-all delay-75"
            >
              Guruhni ko'rish
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedMentor: {},
      teachers: [],
      teacher: {},
      id: this.$route.params.id,
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    selectedTeacher() {
      this.teachers = this.teachers.filter((item) => {
        if (item.id == this.id) {
          this.selectedMentor = item;
        }
      });
    },
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
          this.teachers = data;
          this.selectedTeacher();
          this.getTeacher();
        });
    },
    getTeacher() {
      fetch(
        `http://django-admin.uz/api/customer/mentors/${this.selectedMentor.id}/`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.teacher = data;
          console.log("Teacher: ", data);
        });
    },
  },
  mounted() {
    this.getMentors();
  },
};
</script>
<style lang=""></style>
