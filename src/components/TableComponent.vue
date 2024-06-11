<template>
  <section class="mt-3 w-full mx-auto h-[600px]">
    <div class="select_box text-end">
      <select
        id="select"
        class="mb-4 p-2 outline-none rounded-md"
        v-model="tableSelect"
      >
        <option value="all">Hammasi</option>
        <option :value="item.val" v-for="item in this.courses">{{ item.title }}</option>
      </select>
    </div>
    <div class="overflow-y-scroll h-full" v-if="filteredStudents.length > 0">
      <table
        class="w-full table-fixed text-center mx-auto border border-[#33333390]"
      >
        <thead>
          <tr
            class="text-[12px] bg-[#333] text-white border border-[#33333390]"
          >
            <th class="px-4 py-2">#</th>
            <th class="px-4 py-2">Ism-sharifi</th>
            <th class="px-4 py-2">Tel raqam</th>
            <th class="px-4 py-2">Ota-ona</th>
            <th class="px-4 py-2">Kurs</th>
            <th class="px-4 py-2">Guruh</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in filteredStudents" :key="student.id">
            <td class="border px-4 py-2">{{ index + 1 }}</td>
            <td class="border px-4 py-2">{{ student.fullname }}</td>
            <td class="border px-4 py-2">{{ student.phone_number }}</td>
            <td class="border px-4 py-2">{{ student.parents }}</td>
            <td class="border px-4 py-2">{{ student.course_info.title }}</td>
            <td class="border px-4 py-2">{{ student.group_info.title }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <table
      class="w-full table-fixed text-center mx-auto border-[#33333390]"
      v-else
    >
      <tbody>
        <img
          class="h-[70vh] mx-auto object-center object-cover"
          src="../assets/no-data.png"
          alt=""
        />
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
      courses: []
    };
  },
  methods: {
    getDeletedStudents() {
      fetch("https://django-admin.uz/api/customer/deleted/students/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((response) => {
          this.students = response.data;
          console.log(this.students);
        })
        .catch((error) => {
          console.error("Error fetching deleted students:", error);
        });
    },
    getCourse() {
      fetch("https://django-admin.uz/api/courses/all/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          this.courses = data;
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
    this.getCourse()
  },
};
</script>
