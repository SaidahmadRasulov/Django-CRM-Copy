<template>
  <div>
    <div class="select_box text-end">
      <div class="flex items-center gap-4 justify-end">
        <select
          id="select"
          class="mb-4 p-2 outline-none rounded-md"
          v-model="tableSelect"
        >
          <option value="all">Hammasi</option>
          <option value="dev">Dasturlash</option>
          <option value="des">Grafik Dizayn</option>
          <option value="py">Python</option>
        </select>
      </div>
    </div>
    <table class="w-full table-fixed text-center mx-auto border border-blue">
      <thead>
        <tr class="border bg-blue text-white border-blue">
          <th class="px-4 py-2">#</th>
          <th class="px-4 py-2">Ism-sharifi</th>
          <th class="px-4 py-2">Tel raqam</th>
          <th class="px-4 py-2">Ota-ona</th>
          <th class="px-4 py-2">Kurs</th>
          <th class="px-4 py-2">Guruh</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="filteredStudents.length > 0"
          v-for="(student, index) in filteredStudents"
          :key="student.id"
        >
          <td class="border px-4 py-2">{{ index + 1 }}</td>
          <td class="border px-4 py-2">{{ student.fullname }}</td>
          <td class="border px-4 py-2">{{ student.phone_number }}</td>
          <td class="border px-4 py-2">{{ student.parents }}</td>
          <td class="border px-4 py-2">{{ student.course_info.title }}</td>
          <td class="border px-4 py-2">{{ student.group_info?.title }}</td>
        </tr>
        <tr v-else>
          <td colspan="6" class="border px-4 py-2 text-center">
            Ma'lumot yo'q
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      completedStudents: [],
      tableSelect: "all",
      token: localStorage.getItem("token"),
      groups: [],
      groupSelect: ''
    };
  },
  methods: {
    getCompleted() {
      fetch("http://django-admin.uz/api/customer/completed/students/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((response) => {
          this.completedStudents = response.data;
          console.log("Students: ", this.completedStudents);
        });
    },
    getGroups() {
      fetch("http://django-admin.uz/api/courses/all/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          this.courses = data;
          console.log("Groups: ", this.groups);
        });
    },
  },
  mounted() {
    const storedCompleteStudents = JSON.parse(
      localStorage.getItem("completedStudents")
    );
    if (storedCompleteStudents) {
      this.completedStudents = storedCompleteStudents;
    }
    this.getCompleted();
    this.getGroups();
  },
  computed: {
    filteredStudents() {
      if (this.tableSelect === "all") {
        return this.completedStudents;
      } else {
        return this.completedStudents.filter(
          (student) => student.course_info.val == this.tableSelect
        );
      }
    },
  },
};
</script>
<style lang=""></style>
