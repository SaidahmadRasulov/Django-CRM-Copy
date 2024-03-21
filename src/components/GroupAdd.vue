<template>
  <div>
    <div class="form_add bg-blue p-4 rounded-md shadow-lg">
      <h2 class="text-xl text-white mb-6">Guruh qo'shish</h2>
      <div class="mb-6">
        <label for="group_title" class="text-white text-xl"
          >Guruh nomini kiriting</label
        >
        <input
          type="text"
          id="group_title"
          v-model="group_add"
          class="w-full py-2 px-4 outline-none mt-4 rounded-md"
        />
      </div>
      <div class="mb-6">
        <label for="select" class="text-xl text-white">Kursni Tanlang</label>
        <select
          id="select"
          class="w-full my-2 p-2 outline-none rounded-md"
          v-model="course_select"
        >
          <option :value="item" v-for="item in this.storedCourses">
            {{ item.title }}
          </option>
        </select>
      </div>
      <div class="mb-2">
        <label for="select" class="text-xl text-white">O'qish Kunlari</label>
        <select
          id="select"
          class="w-full my-2 p-2 outline-none rounded-md"
          v-model="study_select"
        >
          <option :value="day.val" v-for="day in this.study_days">
            {{ day.title }}
          </option>
        </select>
      </div>
      <div class="mb-6">
        <label for="select" class="text-xl text-white">Mentor</label>
        <select
          id="select"
          class="w-full my-2 p-2 outline-none rounded-md"
          v-model="mentor_select"
        >
          <option :value="mentor" v-for="mentor in this.mentors">
            {{ mentor.fullname }}
          </option>
        </select>
      </div>
      <div class="mt-4 text-end">
        <button
          class="py-2 px-4 bg-green-700 text-white rounded-md hover:bg-white border border-green-700 hover:text-green-700 transition-all delay-75"
          @click="handleGroupAdd"
        >
          Qo'shish
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      group_add: "",
      token: localStorage.getItem("token"),
      storedCourses: [],
      course_select: {},
      mentors: [],
      mentor_select: "",
      study_select: "",
      study_days: [
        {
          id: 1,
          title: "Dushanba, Chorshanba, Juma",
          val: 'juft'
        },
        {
          id: 2,
          title: "Seyshanba, Payshanba, Shanba",
          val: 'toq'
        },
      ],
    };
  },
  methods: {
    async handleGroupAdd() {
      const token = localStorage.getItem("token");
      let new_group = {
        id: parseInt(Date.now().toString().slice(1, 5)),
        title: this.group_add,
        course: this.course_select.id,
        students: [],
        studyDay: this.study_select,
        val: this.course_select.val,
        mentor: this.mentor_select.id,
        mentor_info: this.mentor_select,
      };
      if (
        new_group.title !== "" &&
        new_group.course !== "" &&
        new_group.studyDay !== ""
      ) {
        try {
          const response = await fetch(
            "http://django-admin.uz/api/groups/create/",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
              },
              body: JSON.stringify(new_group),
            }
          );
          alert("Guruh muvafaqiyatli koshildi");
          window.location.reload()
          this.course_select = "";
          this.group_add = "";
          this.study_days = "";
          this.mentor_select = "";
          console.log("Response !!", response.json());
        } catch (error) {
          console.error("Network error:", error);
          alert("Network Error: Failed to create group");
        }
      } else {
        alert("Iltimos barcha ma'lumotlarni kiriting");
      }
    },
    getCourses() {
      fetch("http://django-admin.uz/api/courses/all/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          this.storedCourses = data;
          this.storedCourses = this.storedCourses.slice(0, 3);
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
        .then((response) => {
          this.mentors = response;
          console.log(this.mentors);
        });
    },
  },
  mounted() {
    this.getCourses();
    this.getMentors();
  },
};
</script>
<style lang=""></style>
