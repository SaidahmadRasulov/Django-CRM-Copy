<template>
  <div
    class="w-full backdrop-brightness-50 h-[100vh] absolute top-0 left-0 transition-all delay-150"
    v-if="toggleLead"
  >
    <i
      class="bx bx-x text-white text-[2.5rem] absolute right-[2%] top-2 cursor-pointer"
      @click="handleCancelAdd"
    ></i>

    <div
      class="form_content w-1/2 mt-20 mx-auto bg-white shadow-lg p-4 rounded-md"
    >
      <div class="mb-6 flex flex-col">
        <label for="name" class="mb-3 text-xl">Ism-sharifi</label>
        <input
          type="text"
          name="fullname"
          id="name"
          class="p-2 px-5 rounded-md outline-none border border-[#3333339]"
          v-model="fullname"
          autocomplete="false"
        />
      </div>
      <div class="mb-6">
        <label for="phone" class="text-xl">Telefon raqami</label>
        <input
          type="number"
          name="phone"
          id="phone"
          class="p-2 px-5 rounded-md outline-none w-full mt-3 border border-[#3333339]"
          v-model="phone_number"
          autocomplete="false"
        />
      </div>
      <div class="mb-6">
        <label for="phone" class="text-xl">Qayerdan kelgan</label>
        <input
          type="text"
          name="coming"
          class="p-2 px-5 rounded-md outline-none w-full mt-3 border border-[#3333339]"
          v-model="coming_place"
          autocomplete="false"
        />
      </div>
      <div class="mb-6 flex flex-col">
        <label for="parent" class="text-xl"
          >Ota-onasining ism-sharifi va tel raqami</label
        >
        <input
          id="parent"
          v-model="parents"
          class="p-2 mt-3 outline-none rounded-md border border-[#3333339]"
        />
      </div>
      <div class="flex items-center gap-4 justify-between">
        <div class="group_box flex flex-col gap-2 w-1/3">
          <label for="group" class="text-xl">Guruhlar</label>
          <select
            id="group"
            class="px-2 py-1 rounded-md outline-none cursor-pointer border border-[#3333339]"
            v-model="groupSelect"
          >
            <option :value="item" v-for="item in groups">
              {{ item.title }}
            </option>
          </select>
        </div>
        <div class="coming_box flex flex-col gap-2 w-1/3">
          <label for="coming" class="text-xl">Qachon kelgan</label>
          <input
            type="date"
            class="px-2 py-1 rounded-md outline-none cursor-pointer border border-[#3333339]"
            v-model="coming_date"
          />
        </div>
        <div class="course_box flex flex-col gap-2 w-1/3">
          <label for="course" class="text-xl">Kurs</label>
          <select
            id="course"
            class="px-2 py-1 rounded-md outline-none cursor-pointer border border-[#3333339]"
            v-model="courseSelect"
          >
            <option v-for="item in courses" :value="item">
              {{ item.title }}
            </option>
          </select>
        </div>
      </div>
      <div class="text-end mt-4">
        <button
          @click="handleAdd"
          class="mx-4 bg-green-700 text-white rounded-md p-2 px-4 hover:bg-white border border-green-700 hover:text-green-700 transition-all delay-75 mt-4"
        >
          Qo'shish
        </button>
      </div>
    </div>
  </div>
  <div v-else class="absolute -top-full transition-all delay-150"></div>
</template>
<script>
export default {
  data() {
    return {
      toggleLead: localStorage.getItem("modal-lead"),
      courses: [],
      courseSelect: "",
      token: localStorage.getItem("token"),
      groupSelect: "",
      fullname: "",
      parents: "",
      phone_number: "",
      storedLead: {},
      groups: [],
      coming_date: "",
      coming_place: "",
    };
  },
  methods: {
    handleCancelAdd() {
      this.toggleLead = false;
      console.log(this.toggleLead);
      localStorage.setItem("modal-lead", JSON.stringify(this.toggleLead));
      window.location.reload();
    },
    async handleAdd() {
      const new_student = {
        fullname: this.fullname,
        parents: this.parents,
        phone_number: this.phone_number,
        course: this.courseSelect.id,
        group: this.groupSelect.id,
        added_date: this.coming_date,
        coming: this.coming_place,
      };

      if (
        this.fullname !== "" &&
        this.parents !== "" &&
        this.phone_number !== "" &&
        this.courseSelect !== "" &&
        this.groupSelect !== "" &&
        this.coming_date !== "" &&
        this.coming_place !== ""
      ) {
        try {
          const response = await fetch(
            `https://api.django-admin.uz/api/customer/students/create/`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${this.token}`,
                "Content-type": "application/json",
              },
              body: JSON.stringify(new_student),
            }
          );
          alert("Lead o'quvchilar qatoriga qo'shildi!");
          this.fullname = "";
          this.parents = "";
          this.phone_number = "";
          this.courseSelect = "";
          this.groupSelect = "";
          this.coming_date = "";
          this.coming_place = "";
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        console.error("Please fill all required fields");
      }
    },
    getGroups() {
      fetch("https://api.django-admin.uz/api/groups/all/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          this.groups = data;
          console.log("Modal Groups:", this.groups);
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
          this.courses = data.slice(0, 3);
          console.log(this.courses);
        });
    },
    getModalChanges() {
      const storedModal = JSON.parse(localStorage.getItem("modal"));
      if (storedModal !== null) {
        this.toggleEdit = storedModal;
        // window.location.reload();
        localStorage.setItem("modal", JSON.stringify(this.toggleEdit));
      } else {
        this.toggleEdit = false;
        localStorage.setItem("modal", JSON.stringify(this.toggleEdit));
      }
    },
    getObject() {
      const savedLead = JSON.parse(localStorage.getItem("adding-lead"));
      if (savedLead !== null) {
        this.editing_obj = savedLead;
        this.fullname = savedLead.fullname;
        this.phone_number = savedLead.phone_number;
        this.parents = savedLead.parents;
        this.courseSelect = savedLead.course_info.val;
      }
    },
  },
  mounted() {
    this.getGroups();
    this.getCourse();
    this.getModalChanges();
    this.getObject();
  },
};
</script>
