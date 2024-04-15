<template>
  <div
    class="w-full backdrop-brightness-50 h-[100vh] absolute top-0 left-0 transition-all delay-150"
    v-if="toggleEdit"
  >
    <i
      class="bx bx-x text-white text-[2.5rem] absolute right-[2%] top-2 cursor-pointer"
      @click="handleCancelEdit"
    ></i>

    <div
      class="form_content w-1/2 mt-20 mx-auto bg-[#edd4c2] shadow-lg p-4 rounded-md"
    >
      <div class="mb-6 flex flex-col">
        <label for="name" class="mb-3 text-lg">Ism-sharifi</label>
        <input
          type="text"
          name="fullname"
          id="name"
          class="p-2 px-5 rounded-md outline-none border border-[#33333390]"
          v-model="fullname"
          autocomplete="false"
        />
      </div>
      <div class="mb-6">
        <label for="phone" class="text-lg">Telefon raqami</label>
        <input
          type="number"
          name="phone"
          id="phone"
          class="p-2 px-5 rounded-md outline-none w-full mt-3 border border-[#33333390]"
          v-model="phone_number"
          autocomplete="false"
        />
      </div>
      <div class="mb-6 flex flex-col">
        <label for="parent" class="text-xl "
          >Ota-onasining ism-sharifi va tel raqami</label
        >
        <textarea
          id="parent"
          v-model="parents"
          class="border border-[#33333390] p-2 mt-3 outline-none rounded-md"
        ></textarea>
      </div>
      <div class="flex gap-4 items-center justify-between">
        <div class="group_box flex flex-col gap-2 w-1/3">
          <label for="group" class="text-lg">Guruhlar</label>
          <select
            id="group"
            class="px-2 py-1 border border-[#33333390] rounded-md outline-none cursor-pointer"
            v-model="groupSelect"
          >
            <option :value="item" v-for="item in this.groups">
              {{ item.title }}
            </option>
          </select>
        </div>
        <div class="coming_box flex flex-col gap-2 w-1/2">
          <label for="coming_date" class="text-lg"
            >Qachon Kelgan</label
          >
          <input
            id="coming_date"
            type="date"
            class="px-2 py-1 rounded-md outline-none cursor-pointer border border-[#33333390]"
            v-model="coming_date"
          />
        </div>
        <div class="course_box flex flex-col gap-2 w-1/2">
          <label for="course" class="text-lg">Kurs</label>
          <select
            id="course"
            class="px-2 py-1 rounded-md outline-none cursor-pointer border border-[#33333390]"
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
          @click="handleEdit"
          class="mx-4 bg-green-700 text-white rounded-md p-2 px-4 hover:bg-white border border-green-700 hover:text-green-700 transition-all delay-75 mt-4"
        >
          O'zgartirish
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
      toggleEdit: false,
      courses: [],
      courseSelect: "",
      token: localStorage.getItem("token"),
      editedObj: {},
      editing_obj: {},
      groups: [],
      groupSelect: "",
      fullname: "",
      parents: "",
      phone_number: "",
      coming_date: "",
    };
  },
  methods: {
    handleCancelEdit() {
      this.toggleEdit = !this.toggleEdit;
      console.log(this.toggleEdit);
      localStorage.setItem("modal", JSON.stringify(this.toggleEdit));
      window.location.reload();
    },
    async handleEdit() {
      const editedData = {
        fullname: this.fullname,
        parents: this.parents,
        phone_number: this.phone_number,
        course: this.courseSelect.id,
        group: this.groupSelect.id,
        added_date: this.coming_date,
      };

      if (
        this.fullname !== "" &&
        this.parents !== "" &&
        this.phone_number !== "" &&
        this.courseSelect !== "" &&
        this.groupSelect !== ""
      ) {
        try {
          const response = await fetch(
            `http://django-admin.uz/api/customer/students/${this.editing_obj.id}/update/`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${this.token}`,
                "Content-type": "application/json",
              },
              body: JSON.stringify(editedData),
            }
          );

          if (response.ok) {
            alert("O'zgarish muvofaqiyatli bajarildi!");
          } else {
            console.error("Failed to update data:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
        console.log(editedData);
      } else {
        console.error("Please fill all required fields");
      }
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
          this.groups = response.data;
          console.log("Modal Groups:", this.groups);
        });
    },
    getCourse() {
      fetch("http://django-admin.uz/api/courses/all/", {
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
    getObject() {
      const storedEditObj = JSON.parse(localStorage.getItem("edit_obj"));
      if (storedEditObj !== null) {
        this.editing_obj = storedEditObj;
        this.fullname = storedEditObj.fullname;
        this.phone_number = storedEditObj.phone_number;
        this.parents = storedEditObj.parents;
        this.groupSelect = storedEditObj.group_info.title;
        this.courseSelect = storedEditObj.course_info.val;
        this.coming_date = storedEditObj.added_date
      }
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
  },
  mounted() {
    this.getObject();
    this.getGroups();
    this.getCourse();
    this.getModalChanges();
  },
};
</script>
