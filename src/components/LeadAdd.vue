<template>
  <div
    class="w-full backdrop-brightness-50 h-[100vh] absolute top-0 left-0 transition-all delay-150"
    v-if="toggleAdd"
  >
    <i
      class="bx bx-x text-[2.5rem] absolute right-[2%] top-2 cursor-pointer text-white"
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
          class="p-2 px-5 rounded-md outline-none border border-[#33333390]"
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
          class="p-2 px-5 rounded-md outline-none w-full mt-3 border border-[#33333390]"
          v-model="phone_number"
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
          class=" border border-[#3333339] p-2 mt-3 outline-none rounded-md"
        ></input>
      </div>
      <div class="flex justify-between gap-4">
        <div class="course_box flex flex-col gap-2 w-1/2">
          <label for="course" class="text-xl">Kurs</label>
          <select
            id="course"
            class="p-2 px-5 rounded-md outline-none cursor-pointer border border-[#33333390]"
            v-model="courseSelect"
          >
            <option v-for="item in courses" :value="item">
              {{ item.title }}
            </option>
          </select>
        </div>
        <div class="comment_box flex flex-col w-1/2">
          <label for="comment" class="text-xl"
            >Qoshimcha ma'lumot</label
          >
          <input
            type="text"
            class="p-2 px-5 rounded-md outline-none w-full mt-2 border border-[#33333390]"
            v-model="comment_input"
          />
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
      toggleAdd: localStorage.getItem("modal-add"),
      courses: [],
      courseSelect: "",
      token: localStorage.getItem("token"),
      groupSelect: "",
      fullname: "",
      parents: "",
      phone_number: "",
      comment_input: "",
    };
  },
  methods: {
    handleCancelAdd() {
      this.toggleAdd = false;
      console.log(this.toggleAdd);
      localStorage.setItem("modal-add", JSON.stringify(this.toggleAdd));
      window.location.reload();
    },
    async handleAdd() {
      const new_student = {
        fullname: this.fullname,
        parents: this.parents,
        phone_number: this.phone_number,
        course: this.courseSelect.id,
        group: this.groupSelect.id,
        comment: this.comment_input,
      };

      if (
        this.fullname !== "" &&
        this.parents !== "" &&
        this.phone_number !== "" &&
        this.courseSelect !== "" &&
        this.comment_input !== ""
      ) {
        try {
          const response = await fetch(
            `http://django-admin.uz/api/lids/create/`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${this.token}`,
                "Content-type": "application/json",
              },
              body: JSON.stringify(new_student),
            }
          );
          alert("Lead qo'shildi!");
          this.fullname = "";
          this.parents = "";
          this.phone_number = "";
          this.courseSelect = "";
          this.comment_input = "";
        } catch (error) {
          console.error("Error:", error);
        }
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
    this.getGroups();
    this.getCourse();
    this.getModalChanges();
  },
};
</script>
