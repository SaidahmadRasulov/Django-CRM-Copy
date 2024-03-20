<template>
  <section class="mt-3 w-4/5 mx-auto h-[600px]">
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
          <th class="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          ref="trRef"
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
          <td class="border px-4 py-2">
            <div class="flex items-center justify-center gap-1">
              <button
                class="py-1 px-2 bg-blue text-lg rounded-lg hover:bg-transparent border border-blue hover:text-blue text-white"
                @click="handleEdit(student)"
              >
                <i class="bx bx-pencil"></i>
              </button>
              <button
                class="py-1 px-2 bg-red-600 text-lg rounded-lg hover:bg-transparent border hover:text-red-600 border-red-600 text-white"
                @click="handleDelete(student.id)"
              >
                <i class="bx bx-trash"></i>
              </button>
              <button
                class="py-1 px-2 bg-green-600 text-lg rounded-lg hover:bg-transparent border hover:text-green-600 border-green-600 text-white"
                @click="handleComplete(student)"
              >
                <i class="bx bx-check"></i>
              </button>
            </div>
          </td>
        </tr>
        <tr v-else>
          <td colspan="7" class="border px-4 py-2 text-center">
            Ma'lumot yo'q
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="toggleShow">
      <ModalForm :item="editObj" />
    </div>
    <div v-else></div>
  </section>
</template>

<script>
import ModalForm from "./ModalForm.vue";

export default {
  data() {
    return {
      students: [],
      token: localStorage.getItem("token"),
      tableSelect: "all",
      trashArray: [],
      toggleShow: localStorage.getItem("modal"),
      completedStudents: [],
      editObj: {},
    };
  },
  methods: {
    getStudents() {
      fetch("http://django-admin.uz/api/customer/students/all/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((response) => {
          this.students = response.data;
          console.log("Students: ",this.students);
        });
    },
    handleEdit(obj) {
      this.toggleShow = true;
      localStorage.setItem("modal", JSON.stringify(this.toggleShow));
      this.editObj = obj;
      localStorage.setItem("edit_obj", JSON.stringify(this.editObj));
    },
  },
  mounted() {
    this.getStudents();
    console.log(this.toggleShow);
  },
  computed: {
    filteredStudents() {
      if (this.tableSelect === "all") {
        return this.students;
      } else {
        return this.students.filter(
          (student) => student.course === this.tableSelect
        );
      }
    },
  },
  components: { ModalForm },
};
</script>

<style lang=""></style>
