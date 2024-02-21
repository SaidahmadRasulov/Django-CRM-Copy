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
      class="form_content w-1/2 mt-20 mx-auto bg-blue shadow-lg p-4 rounded-md"
    >
      <div class="mb-6 flex flex-col">
        <label for="name" class="mb-3 text-xl text-white">Ism-sharifi</label>
        <input
          type="text"
          name="fullname"
          id="name"
          class="p-2 px-5 rounded-md outline-none"
          v-model="name"
          autocomplete="false"
        />
      </div>
      <div class="mb-6">
        <label for="phone" class="text-xl text-white">Telefon raqami</label>
        <input
          type="number"
          name="phone"
          id="phone"
          class="p-2 px-5 rounded-md outline-none w-full mt-3"
          v-model="phoneNumber"
          autocomplete="false"
        />
      </div>
      <div class="mb-6 flex flex-col">
        <label for="parent" class="text-xl text-white"
          >Ota-onasining ism-sharifi va tel raqami</label
        >
        <textarea
          id="parent"
          v-model="parent"
          class="resize-none h-20 p-2 mt-3 outline-none rounded-md"
        ></textarea>
      </div>
      <div class="flex items-center justify-between">
        <div class="group_box flex flex-col gap-2 w-1/3">
          <label for="group" class="text-xl text-white">Guruhlar</label>
          <select
            id="group"
            class="px-2 py-1 rounded-md outline-none cursor-pointer"
            @change="handleChangeGroup"
            v-model="groupSelect"
          >
            <option :value="item.title" v-for="item in filteredGroups">
              {{ item.title }}
            </option>
          </select>
        </div>
        <div class="course_box flex flex-col gap-2 w-1/2">
          <label for="course" class="text-xl text-white">Kurs</label>
          <select
            id="course"
            class="px-2 py-1 rounded-md outline-none cursor-pointer"
            v-model="courseSelect"
            @change="handleChange"
          >
            <option v-for="item in courses" :value="item.val">
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
      courseSelect: "dev",
      editObj: {},
      filteredGroups: [],
      groupSelect: "",
      name: "",
      parent: "",
      phoneNumber: "",
    };
  },
  mounted() {
    const storedModal = JSON.parse(localStorage.getItem("modal"));
    if (storedModal !== null) {
      this.toggleEdit = storedModal;
    } else {
      this.toggleEdit = false;
      localStorage.setItem("modal", JSON.stringify(this.toggleEdit));
    }
    const storedCourses = JSON.parse(localStorage.getItem("courses"));
    if (storedCourses) {
      this.courseSelect = storedCourses;
    }
    const storedEditObj = JSON.parse(localStorage.getItem("editObj"));
    if (storedEditObj !== null) {
      this.editObj = storedEditObj;
      this.name = this.editObj.name;
      this.phoneNumber = this.editObj.phoneNumber;
      this.parent = this.editObj.parents;
      this.groupSelect = this.editObj.group;
    }
    const storedGroups = JSON.parse(localStorage.getItem("groups"));
    if (storedGroups) {
      this.filteredGroups = storedCourses;
    }
  },

  methods: {
    handleCancelEdit() {
      this.toggleEdit = !this.toggleEdit;
      console.log(this.toggleEdit);
      localStorage.setItem("modal", JSON.stringify(this.toggleEdit));
    },
  },
};
</script>
<style lang=""></style>
