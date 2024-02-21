<template>
  <section>
    <div class="group_title">
      <h1 class="text-2xl">Guruh: {{ title }}</h1>
    </div>
    <div class="group_info mt-5 w-[200px]">
      <div v-for="item in groupRender" :key="item.id">
        <div v-if="item.title === title">
          <div class="flex gap-10 text-center">
            <h1>№</h1>
            <h1>ism</h1>
          </div>
          <div v-for="(student, index) in item.students" :key="student.id" class="flex gap-10">
            <h1>{{ index + 1 }}</h1>
            <h1>{{ student.name }}</h1>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      groupRender: [],
    };
  },
  mounted() {
    this.title = this.$route.params.title;
    const storedGroups = localStorage.getItem("groups");
    if (storedGroups) {
      this.groupRender = JSON.parse(storedGroups);
    }
  },
};
</script>

<style scoped></style>
