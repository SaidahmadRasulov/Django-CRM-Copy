<template>
  <div>
    <h1 class="text-2xl">Mentor Guruhlari</h1>
    <div class="mt-6">
      <h1 class="text-2xl">Mentor: {{ teacher.name }}</h1>
      <h1 class="text-xl my-2">Guruhlari:</h1>
    </div>
    <div class="overflow-y-scroll h-[75vh] flex justify-around">
      <div class="group_card rounded-md bg-white w-1/4" v-for="group in teacher.groups">
        <div class="group_card_header w-full">
          <img src="../assets/cartImage.jpg" class="w-full" alt="" />
        </div>
        <div class="group_card_body p-4">
          <h1 class="text-xl">Guruh raqami: {{ group.title }}</h1>
          <h1 class="text-xl my-2">
            O'quvchilar soni: {{ group.students.length }}
          </h1>
          <h1 class="text-xl">O'qish kunlari: {{ group.studyDay }}</h1>
        </div>
        <div class="group_card_footer text-end mt-4 px-4">
          <RouterLink :to="`/groups/${group.title}`">
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
      teacher: {},
      teachers: [],
      name: this.$route.params.name,
    };
  },
  mounted() {
    const storedTeachers = JSON.parse(localStorage.getItem("teachers"));
    if (storedTeachers) {
      this.teachers = storedTeachers;
      this.teachers = this.teachers.filter((item) => {
        if (item.name == this.name) {
          this.teacher = item;
          console.log(this.teacher);
        }
      });
    }
  },
};
</script>
<style lang=""></style>
