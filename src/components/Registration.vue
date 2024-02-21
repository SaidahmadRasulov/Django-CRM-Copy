<template>
  <section>
    <h1 class="text-2xl">O'quvchi qo'shish</h1>
    <div class="container mt-[2rem] flex gap-4">
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
          <div class="teacher_box flex flex-col gap-2 w-1/2">
            <label for="teacher" class="text-xl text-white">Mentor</label>
            <select
              id="teacher"
              class="px-2 py-1 rounded-md outline-none cursor-pointer"
              v-model="teacherSelect"
              @change="handleTeacherChange"
            >
              <option v-for="item in teachers" :value="item.value">
                {{ item.name }}
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
      <div class="w-1/4">
        <GroupAdd />
      </div>
      <div class="w-1/4">
        <MentorAdd />
      </div>
    </div>
  </section>
</template>

<script>
import MentorAdd from "./MentorAdd.vue";
import GroupAdd from "./GroupAdd.vue";

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      phoneNumber: "",
      courseSelect: "dev",
      groupSelect: "",
      teachers: [],
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
      initialGroups: [
        {
          id: 1,
          title: "200",
          cat: "dev",
          students: [],
          studyDay: "Dushanba, Chorshanba, Juma",
        },
        {
          id: 2,
          title: "201",
          cat: "des",
          students: [],
          studyDay: "Seyshanba, Payshanba, Shanba",
        },
        {
          id: 3,
          title: "202",
          cat: "dev",
          students: [],
          studyDay: "Dushanba, Chorshanba, Juma",
        },
        {
          id: 4,
          title: "203",
          cat: "des",
          students: [],
          studyDay: "Seyshanba, Payshanba, Shanba",
        },
        {
          id: 5,
          title: "205",
          cat: "py",
          students: [],
          studyDay: "Dushanba, Chorshanba, Juma",
        },
        {
          id: 6,
          title: "206",
          cat: "py",
          students: [],
          studyDay: "Seyshanba, Payshanba, Shanba",
        },
        {
          id: 7,
          title: "207",
          cat: "py",
          students: [],
          studyDay: "Dushanba, Chorshanba, Juma",
        },
      ],
      filteredGroups: [],
    };
  },
  methods: {
    handleAdd() {
      let newObj = {
        id: Date.now(),
        name: this.name,
        phoneNumber: this.phoneNumber,
        parents: this.parent,
        group: this.groupSelect,
        course: this.courseSelect,
        mentor: this.teacherSelect,
        deleted: false,
      };
      if (
        this.name !== "" &&
        this.phoneNumber !== "" &&
        this.parent !== "" &&
        this.groupSelect !== "" &&
        this.courseSelect !== "" &&
        this.teacherSelect !== ""
      ) {
        this.initialGroups.forEach((item) => {
          if (item.title == this.groupSelect) {
            this.teachers.forEach((teacher) => {
              if (teacher.value == this.teacherSelect) {
                teacher.groups.push(item);
              }
            });
            item.students.push(newObj);
          }
        });
        this.data.push(newObj);
        localStorage.setItem("students", JSON.stringify(this.data));
        localStorage.setItem("teachers", JSON.stringify(this.teachers));
        localStorage.setItem("groups", JSON.stringify(this.initialGroups));
        this.name = "";
        this.phoneNumber = "";
        this.parent = "";
        this.group = "";
        this.course = "";
      } else {
        alert("Iltimos, hammasini toldiring!");
      }
    },
    saveDataToLocalStorage() {
      localStorage.setItem("students", JSON.stringify(this.data));
      localStorage.setItem("groups", JSON.stringify(this.initialGroups));
    },
    handleChange() {
      localStorage.setItem("course-val", JSON.stringify(this.courseSelect));
      const filteredGroups = this.initialGroups.filter((item) => {
        return item.cat == this.courseSelect;
      });
      localStorage.setItem("filtered-groups", JSON.stringify(filteredGroups));
      this.filteredGroups = filteredGroups;
    },
    handleChangeGroup() {
      localStorage.setItem("group-select", JSON.stringify(this.groupSelect));
    },
    handleTeacherChange() {
      localStorage.setItem("teacher-val", JSON.stringify(this.teacherSelect));
    },
  },
  mounted() {
    const getedGroups = JSON.parse(localStorage.getItem("groups"));
    if (getedGroups) {
      this.initialGroups = getedGroups;
    }
    const filteredGroupsFromStorage = JSON.parse(
      localStorage.getItem("filtered-groups")
    );
    if (filteredGroupsFromStorage) {
      this.filteredGroups = filteredGroupsFromStorage;
    } else {
      localStorage.setItem(
        "filtered-groups",
        JSON.stringify(this.filteredGroups)
      );
    }
    const selectedCourseFromStorage = JSON.parse(
      localStorage.getItem("course-val")
    );
    if (selectedCourseFromStorage) {
      this.courseSelect = selectedCourseFromStorage;
    }
    const selectedGroup = JSON.parse(localStorage.getItem("group-select"));
    if (selectedGroup) {
      this.groupSelect = selectedGroup;
    }
    localStorage.setItem("courses", JSON.stringify(this.courses));
    const storedTeachers = JSON.parse(localStorage.getItem("teachers"));
    if (storedTeachers) {
      this.teachers = storedTeachers;
    }
    const storedTeacherValue = JSON.parse(localStorage.getItem("teacher-val"));
    if (storedTeacherValue) {
      this.teacherSelect = storedTeacherValue;
    }
  },
  components: { MentorAdd, GroupAdd },
};
</script>

<style></style>
