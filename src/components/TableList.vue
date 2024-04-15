<template>
  <section class="mt-3 w-full mx-auto h-[600px] overflow-y-scroll">
    <div class="select_box text-end">
      <select
        id="select"
        class="mb-4 p-2 outline-none rounded-md mr-2 border border-[#33333390]"
        v-model="tableSelect"
      >
        <option value="all">Hammasi</option>
        <option value="dev">Dasturlash</option>
        <option value="des">Grafik Dizayn</option>
        <option value="py">Python</option>
      </select>
    </div>
    <table
      v-if="filteredStudents.length > 0"
      class="w-full table-fixed text-center mx-auto border border-[#33333390]"
    >
      <thead>
        <tr class="border bg-[#333] text-[14px] text-white border-[#33333390]">
          <th class="px-4 py-2">№</th>
          <th class="px-4 py-2">Ism-sharifi</th>
          <th class="px-4 py-2">Tel raqam</th>
          <th class="px-4 py-2">Ota-ona</th>
          <th class="px-4 py-2">Kurs</th>
          <th class="px-4 py-2">Guruh</th>
          <th class="px-4 py-2">Qachon Kelgan</th>
          <th class="px-4 py-2">Qayerdan Kelgan</th>
          <th class="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          ref="trRef"
          v-for="(student, index) in filteredStudents"
          :key="student.id"
          :class="{ 'text-stone-500': student.deleted === true }"
          class="hover:bg-[#f4dfd17c]"
        >
          <td class="border border-[#33333363] px-2 py-1">{{ index + 1 }}</td>
          <td class="border border-[#33333363] px-2 py-1">
            {{ student.fullname }}
          </td>
          <td class="border border-[#33333363] px-2 py-1">
            {{ student.phone_number }}
          </td>
          <td class="border border-[#33333363] px-2 py-1">
            {{ student.parents }}
          </td>
          <td class="border border-[#33333363] px-2 py-1">
            {{ student.course_info.title }}
          </td>
          <td class="border border-[#33333363] px-2 py-1">
            {{ student.group_info.title }}
          </td>
          <td class="border border-[#33333363] px-2 py-1">
            {{ student.added_date }}
          </td>
          <td class="border border-[#33333363] px-2 py-1">
            {{ student.coming }}
          </td>
          <td class="border border-[#33333363] px-2 py-1">
            <div class="flex items-center justify-center gap-1">
              <button
                class="py-1 px-2 text-lg rounded-lg hover:bg-transparent hover:text-blue text-white"
                @click="handleEdit(student)"
              >
                <i class="bx bx-pencil text-blue"></i>
              </button>
              <button
                class="py-1 px-2 text-lg rounded-lg hover:bg-transparent text-red-600"
                @click="handleDelete(student.id)"
              >
                <i class="bx bx-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table v-else class="w-full table-fixed text-center mx-auto">
      <tbody>
        <tr>
          <td colspan="9">
            <img
              class="h-[70vh] mx-auto object-center object-cover"
              src="../assets/no-data.png"
              alt=""
            />
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
          console.log(this.students)
        });
    },
    handleEdit(obj) {
      this.toggleShow = true;
      localStorage.setItem("modal", JSON.stringify(this.toggleShow));
      this.editObj = obj;
      localStorage.setItem("edit_obj", JSON.stringify(this.editObj));
      window.location.reload();
    },
    async handleDelete(id) {
      let confirm = window.confirm("O'chirilishiga rozimisz?");
      if (confirm) {
        const response = await fetch(
          `http://django-admin.uz/api/customer/students/${id}/delete/`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-type": "application/json",
            },
          }
        );
        if (response.ok) {
          window.location.reload();
        }
      } else {
        alert("O'chirilish amalga oshirilmadi.");
      }
    },
  },
  mounted() {
    this.getStudents();
    this.toggleShow = JSON.parse(localStorage.getItem("modal")) || false; // Set default value if no value found in localStorage
  },
  watch: {
    toggleShow: function (newToggleShow) {
      localStorage.setItem("modal", JSON.stringify(newToggleShow));
    },
  },
  computed: {
    filteredStudents() {
      if (this.tableSelect === "all") {
        return this.students;
      } else {
        return this.students.filter(
          (student) => student.course_info.val === this.tableSelect
        );
      }
    },
  },
  components: { ModalForm },
};
</script>

<style lang=""></style>
