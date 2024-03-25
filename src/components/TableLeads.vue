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
          <th class="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          ref="trRef"
          v-if="leads.length > 0"
          v-for="(student, index) in leads"
          :key="student.id"
        >
          <td class="border px-4 py-2">{{ index + 1 }}</td>
          <td class="border px-4 py-2">{{ student.fullname }}</td>
          <td class="border px-4 py-2">{{ student.phone_number }}</td>
          <td class="border px-4 py-2">{{ student.parents }}</td>
          <td class="border px-4 py-2">{{ student.course_info.title }}</td>
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
                @click="handleAdd(student)"
              >
                <i class="bx bx-check"></i>
              </button>
            </div>
          </td>
        </tr>
        <tr v-else>
          <td colspan="6" class="border px-4 py-2 text-center">
            Ma'lumot yo'q
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
      console.log(this.toggleAdd);
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
        `http://django-admin.uz/api/lids/${id}/delete/`,
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
      fetch("http://django-admin.uz/api/lids/all/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((response) => {
          this.leads = response.data;
          console.log("Leads: ", this.leads);
          if (this.leads.length === 0) {
            this.$router.push("/lead-add");
          }
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
    if (this.leads.length < 0) {
      this.toggleAdd = true;
      localStorage.setItem("modal-add", JSON.stringify(this.toggleAdd));
    }
    this.toggleAdd = JSON.parse(localStorage.getItem("modal-add")) || false;
    this.toggleLead = JSON.parse(localStorage.getItem("modal-lead")) || false;
  },
  components: { ModalStudent, LeadAdd, ModalLead },
};
</script>

<style lang=""></style>
