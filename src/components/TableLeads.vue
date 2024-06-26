<template>
  <section class="mt-3 w-full mx-auto h-[600px]">
    <div class="select_box text-end">
      <button
        class="bg-green-500 py-2 px-4 text-white rounded-md mr-4"
        @click="handleAddLead"
      >
        Lead Qo'shish
      </button>
      <select
        id="select"
        class="mb-4 p-2 outline-none rounded-md"
        v-model="tableSelect"
      >
      <option value="all">Hammasi</option>
        <option :value="item.val" v-for="item in this.courses">
          {{ item.title }}
        </option>
      </select>
    </div>
    <table
      class="w-full table-fixed text-center mx-auto border border-[#33333390]"
      v-if="leads.length > 0"
    >
      <thead>
        <tr class="border bg-[#333] text-[14px] text-white border-[#33333390]">
          <th class="px-4 py-2">#</th>
          <th class="px-4 py-2">Ism-sharifi</th>
          <th class="px-4 py-2">Tel raqam</th>
          <th class="px-4 py-2">Ota-ona</th>
          <th class="px-4 py-2">Kurs</th>
          <th class="px-4 py-2">Qoshimcha ma'lumot</th>
          <th class="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr ref="trRef" v-for="(student, index) in filteredLeads" :key="student.id">
          <td class="border px-4 py-2">{{ index + 1 }}</td>
          <td class="border px-4 py-2">{{ student.fullname }}</td>
          <td class="border px-4 py-2">{{ student.phone_number }}</td>
          <td class="border px-4 py-2">{{ student.parents }}</td>
          <td class="border px-4 py-2">{{ student.course_info.title }}</td>
          <td class="border px-4 py-2">{{ student.comment }}</td>
          <td class="border px-4 py-2">
            <div class="flex items-center justify-center gap-1">
              <button
                class="py-1 px-2 text-lg rounded-lg hover:cursor-pointer"
                @click="handleEdit(student)"
              >
                <i class="bx bx-pencil text-blue"></i>
              </button>
              <button
                class="py-1 px-2 text-lg rounded-lg hover:cursor-pointer"
                @click="handleDelete(student.id)"
              >
                <i class="bx bx-trash text-red-600"></i>
              </button>
              <button
                class="py-1 px-2 text-lg rounded-lg hover:cursor-pointer"
                @click="handleAdd(student)"
              >
                <i class="bx bx-check text-green-600"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="w-full table-fixed text-center mx-auto" v-else>
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
    <div v-if="toggleEditLead">
      <ModalStudent />
    </div>
    <div v-if="this.toggleAdd">
      <LeadAdd />
    </div>
    <div v-if="this.toggleLead">
      <ModalLead />
    </div>
  </section>
</template>

<script>
import LeadAdd from "./LeadAdd.vue";
import ModalLead from "./ModalLead.vue";
import ModalStudent from "./ModalStudent.vue";

export default {
  data() {
    return {
      leads: [],
      token: localStorage.getItem("token"),
      tableSelect: "all",
      trashArray: [],
      courses: [],
      toggleEditLead: localStorage.getItem("modal-edit"),
      toggleAdd: localStorage.getItem("modal-add"),
      toggleLead: localStorage.getItem("modal-lead"),
      editObj: {},
      lead: {},
    };
  },
  methods: {
    handleAddLead() {
      this.toggleAdd = true;
      localStorage.setItem("modal-add", JSON.stringify(this.toggleAdd));
    },
    handleAdd(obj) {
      this.lead = obj;
      localStorage.setItem("adding-lead", JSON.stringify(this.lead));
      this.toggleLead = true;
      localStorage.setItem("modal-lead", JSON.stringify(this.toggleLead));
    },
    handleEdit(obj) {
      this.editObj = obj;
      localStorage.setItem("edit_obj", JSON.stringify(this.editObj));
      this.toggleEditLead = true;
      localStorage.setItem("modal-edit", JSON.stringify(this.toggleEditLead));
      window.location.reload();
    },
    async handleDelete(id) {
      const response = await fetch(
        `https://api.django-admin.uz/api/lids/${id}/delete/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify(id),
        }
      ).then(() => {
        alert("Lead o'chirildi!");
        window.location.reload();
      });
    },
    getLeads() {
      fetch("https://api.django-admin.uz/api/lids/all/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          this.leads = data;
        });
    },
    getCourse() {
      fetch("https://api.django-admin.uz/api/courses/all/", {
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
  watch: {
    toggleAdd: function (newToggleAdd) {
      localStorage.setItem("modal-add", JSON.stringify(newToggleAdd));
    },
    toggleLead: function (newToggleLead) {
      localStorage.setItem("modal-lead", JSON.stringify(newToggleLead));
    },
    toggleEditLead: function (newToggleLeadEdit) {
      localStorage.setItem("modal-edit", JSON.stringify(newToggleLeadEdit));
    },
  },
  mounted() {
    this.getLeads();
    this.getCourse();
    if (this.leads.length < 0) {
      this.toggleAdd = true;
      localStorage.setItem("modal-add", JSON.stringify(this.toggleAdd));
    }
    this.toggleAdd = JSON.parse(localStorage.getItem("modal-add")) || false;
    this.toggleLead = JSON.parse(localStorage.getItem("modal-lead")) || false;
  },
  computed: {
    filteredLeads() {
      if(this.tableSelect == 'all') {
        return this.leads
      } else {
        return this.leads.filter((item) => item.course_info.val == this.tableSelect)
      }
    }
  },
  components: { ModalStudent, LeadAdd, ModalLead },
};
</script>

<style lang=""></style>
