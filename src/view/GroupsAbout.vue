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
          <div
            v-for="(student, index) in item.students"
            :key="student.id"
            class="flex gap-10"
          >
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
      title: this.$route.params.title,
      takedGroup: {},
      group: {},
      groupRender: [],
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    selectedGroup() {
      this.groupRender = this.groupRender.filter((item) => {
        if (item.title == this.title) {
          this.takedGroup = item;
          console.log(this.takedGroup);
        }
      });
    },
    getGroup() {
      fetch(`http://django-admin.uz/api/groups/${this.takedGroup.id}/`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((response) => console.log(response));
    },
    getGroups() {
      fetch("http://django-admin.uz/api/groups/all/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((response) => {
          this.groupRender = response.data;
          this.selectedGroup();
          console.log(this.groupRender);
          this.getGroup()
        });
    },
  },
  mounted() {
    this.getGroups();
  },
};
</script>

<style scoped></style>
