<template>
  <div class="form_content w-1/2 mx-auto bg-blue shadow-lg p-4 rounded-md">
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
    <div class="mb-6">
      <label for="phone" class="text-xl text-white">Qayerdan Kelgan</label>
      <input
        type="text"
        name="phone"
        id="phone"
        class="p-2 px-5 rounded-md outline-none w-full mt-3"
        v-model="coming"
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
    <div class="flex items-center gap-4 justify-between">
      <div class="group_box flex flex-col gap-2 w-1/3">
        <label for="group" class="text-xl text-white">Guruhlar</label>
        <select
          id="group"
          class="px-2 py-1 rounded-md outline-none cursor-pointer"
          v-model="groupSelect"
        >
          <option :value="item" v-for="item in groups">
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
        >
          <option v-for="item in courses" :value="item">
            {{ item.title }}
          </option>
        </select>
      </div>
      <div class="teacher_box flex flex-col gap-2 w-1/2">
        <label for="teacher" class="text-xl text-white">Mentor</label>
        <select
          id="teacher"
          class="px-2 py-1 rounded-md outline-none cursor-pointer"
          v-model="teacherSelect"
        >
          <option v-for="item in teachers" :value="item.value">
            {{ item.fullname }}
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
</template>
<script>
export default {
  data() {
    return {
      name: "",
      phoneNumber: "",
      coming: "",
      token: localStorage.getItem("token"),
      course: {},
      courseSelect: "",
      groupSelect: "",
      teachers: [],
      storedRequest: null,
      requestSent: false,
      teacherSelect: "",
      parent: "",
      courses: [
        {
          id: 1,
          title: "Dasturlash",
          val: "dev",
        },
        {
          id: 2,
          title: "Grafik Dizayn",
          val: "des",
        },
        {
          id: 3,
          title: "Python",
          val: "py",
        },
      ],
      groups: [],
    };
  },
  methods: {
    async handleAdd() {
      let newObj = {
        id: Date.now(),
        fullname: this.name,
        phone_number: this.phoneNumber,
        parents: this.parent,
        group: this.groupSelect.id,
        course: this.courseSelect.id,
        mentor: this.teacherSelect,
        deleted: false,
        coming: this.coming,
      };
      const response = await fetch(
        "http://django-admin.uz/api/customer/students/create/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify(newObj),
        }
      ).then((response) => response.json());
      if (
        this.name !== "" &&
        this.phone_number !== "" &&
        this.parent !== "" &&
        this.groupSelect !== "" &&
        this.courseSelect !== "" &&
        this.teacherSelect !== "" &&
        this.coming !== ""
      ) {
        this.groups.forEach((item) => {
          if (item.title == this.groupSelect) {
            this.teachers.forEach((teacher) => {
              if (teacher.value == this.teacherSelect) {
                teacher.groups.push(item);
              }
            });
            item.students.push(newObj);
            this.postStudent(item);
          }
        });
        this.name = "";
        this.phoneNumber = "";
        this.parent = "";
        this.groupSelect = "";
        this.courseSelect = "";
        this.teacherSelect = "";
        alert("O'quvchi muvofaqqiyatli qoshildi!");
      } else {
        alert("Iltimos, hammasini toldiring!");
      }
    },
    postCourse() {
      if (!this.storedRequest) {
        this.courses.forEach((course) => {
          fetch("http://django-admin.uz/api/courses/create/", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(course),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Course: ", data);
            })
            .catch((error) => {
              console.error(error);
            });
        });
        this.storedRequest = true;
        localStorage.setItem("request", JSON.stringify(this.storedRequest));
      }
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
          this.courses = data;
          this.courses = this.courses.slice(0, 3);
        });
    },
    getMentors() {
      fetch("http://django-admin.uz/api/customer/mentors/all/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          this.teachers = data;
          console.log(this.teachers);
        });
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
          console.log("Groups:", this.groups);
        });
    },
    postStudent(obj) {
      console.log(obj);
    },
  },
  mounted() {
    this.getCourse();
    this.getGroups();
    this.getMentors();
    const gettedRequest = JSON.parse(localStorage.getItem("request"));
    this.storedRequest = gettedRequest;
    if (!this.storedRequest) {
      this.postCourse();
    }
  },
};
</script>
<style lang=""></style>
