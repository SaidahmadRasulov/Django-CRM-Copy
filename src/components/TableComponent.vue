<template>
  <section class="mt-3 w-full mx-auto h-[600px]">
    <div class="select_box text-end">
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
          :class="{ 'text-stone-500': student.deleted === true }"
        >
          <td class="border px-4 py-2">{{ index + 1 }}</td>
          <td class="border px-4 py-2">{{ student.fullname }}</td>
          <td class="border px-4 py-2">{{ student.phone_number }}</td>
          <td class="border px-4 py-2">{{ student.parents }}</td>
          <td class="border px-4 py-2">{{ student.course_info.title }}</td>
          <td class="border px-4 py-2">{{ student.group_info.title }}</td>
        </tr>
        <tr v-else>
          <td colspan="6" class="border px-4 py-2 text-center">
            Ma'lumot yo'q
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      students: [],
      token: localStorage.getItem("token"),
      tableSelect: "all",
    };
  },
  methods: {
    getDeletedStudents() {
      fetch("http://django-admin.uz/api/customer/deleted/students/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((response) => {
          this.students = response.data;
          console.log(this.students)
        })
        .catch((error) => {
          console.error("Error fetching deleted students:", error);
        });
    },
  },
  computed: {
    filteredStudents() {
      if (this.tableSelect === "all") {
        return this.students;
      } else {
        return this.students.filter((student) => {
          return student.course_info.val === this.tableSelect;
        });
      }
    },
  },
  mounted() {
    this.getDeletedStudents();
  },
};
</script>
