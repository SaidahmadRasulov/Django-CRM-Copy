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
          :class="{ 'text-stone-500': student.deleted === true}"
        >
          <td class="border px-4 py-2">{{ index + 1 }}</td>
          <td class="border px-4 py-2">{{ student.name }}</td>
          <td class="border px-4 py-2">{{ student.phoneNumber }}</td>
          <td class="border px-4 py-2">{{ student.parents }}</td>
          <td class="border px-4 py-2">{{ student.course }}</td>
          <td class="border px-4 py-2">{{ student.group }}</td>
          <td class="border px-4 py-2">
            <div class="flex items-center justify-center gap-1">
              <button
                class="py-1 px-2 bg-blue text-lg rounded-lg hover:bg-transparent border border-blue hover:text-blue text-white"
                @click="handleStartEdit(student)"
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
  </section>
</template>

<script>
import ModalForm from "./ModalForm.vue";

export default {
  data() {
    return {
      students: [],
      tableSelect: "all",
      trashArray: [],
      toggleShow: false,
      completedStudents: [],
      editObj: {},
    };
  },
  mounted() {
    const storedData = JSON.parse(localStorage.getItem("students"));
    const storedModal = JSON.parse(localStorage.getItem("modal"));
    const storedCompletedStudent = JSON.parse(
      localStorage.getItem("completedStudents")
    );
    if (storedCompletedStudent) {
      this.completedStudents = storedCompletedStudent;
    }
    if (storedData) {
      this.students = storedData;
    }
    if (storedModal !== null) {
      this.toggleShow = storedModal;
    }
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
  methods: {
    handleDelete(id) {
      let confirmation = window.confirm("Shuni o'chirishga rozimisz?");
      if (confirmation) {
        const geteditem = this.students.filter((item) => item.id == id);
        geteditem[0].deleted = true;
        localStorage.setItem("students", JSON.stringify(this.students));
      }
    },

    handleStartEdit(item) {
      this.toggleShow = !this.toggleShow;
      localStorage.setItem("modal", JSON.stringify(this.toggleShow));
      if (this.toggleShow) {
        this.editObj = item;
        localStorage.setItem("editObj", JSON.stringify(this.editObj));
      }
    },
    handleComplete(obj) {
      let confirm = window.confirm("Bitirganligini tasdiqlang");
      if (confirm) {
        this.students = this.students.filter((item) => {
          if (item.id == obj.id) {
            this.completedStudents.push(obj);
            localStorage.setItem(
              "completedStudents",
              JSON.stringify(this.completedStudents)
            );
          } else {
            return item;
          }
        });
      }
      localStorage.setItem("students", JSON.stringify(this.students));
    },
  },
  components: { ModalForm },
};
</script>

<style lang=""></style>
