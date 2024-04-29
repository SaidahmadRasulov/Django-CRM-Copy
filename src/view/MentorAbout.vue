<template>
  <div>
    <h1 class="text-2xl">Mentor Guruhlari</h1>
    <div class="mt-6">
      <h1 class="text-2xl">Mentor: {{ teacher.fullname }}</h1>
      <h1 class="text-xl my-2">Guruhlari:</h1>
    </div>
    <div
      class="overflow-y-scroll w-full h-[70vh] flex-wrap flex gap-4"
      v-if="teacher.groups.length > 0"
    >
      <div v-for="group in teacher.groups">
        <div class="group_card rounded-md bg-white h-[350px] w-full pb-3">
          <div class="group_card_header w-full text-center">
            <i class="bx bx-user text-[100px]"></i>
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
              <span>{{
                group.status == "continues"
                  ? "Davom etyabti"
                  : group.status == "completed"
                  ? "Yakunlangan"
                  : "O'chirilgan"
              }}</span>
            </h1>
          </div>
          <div class="group_card_footer mt-[1.2rem] text-end px-4">
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
    <div class="w-1/2 mx-auto" v-else>
      <img src="../assets/no-data.png" alt="">
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
      fetch("https://django-admin.uz/api/customer/mentors/all/", {
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
        `https://django-admin.uz/api/customer/mentors/${this.selectedMentor.id}/`,
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
