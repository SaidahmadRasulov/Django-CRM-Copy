<template>
  <div class="w-2/3 h-[500px] form_add rounded-md">
    <div class="mb-2 flex flex-col">
      <label for="group_title" class="text-lg">Guruhni qo'shish</label>
      <input
        placeholder="Guruh nomini kiriting"
        type="text"
        id="group_title"
        v-model="group_add"
        class="w-full border border-[#33333390] py-2 px-4 outline-none mt-2 rounded-md placeholder:text-sm"
      />
    </div>
    <div class="mb-2 flex flex-col">
      <label for="select" class="text-lg mb-2">Kursni tanlang</label>
      <select
        id="select"
        class="w-full border border-[#33333390] p-2 outline-none rounded-md"
        v-model="course_select"
      >
        <option :value="item" v-for="item in this.storedCourses">
          {{ item.title }}
        </option>
      </select>
    </div>
    <div class="mb-2 text-lg flex flex-col">
      <label for="continue">O'qish davomiyligi</label>
      <input
        type="number"
        placeholder="Raqam kiriting"
        id="continue"
        v-model="group_continue"
        class="w-full border border-[#33333390] py-2 px-4 outline-none mt-2 rounded-md text-sm placeholder:text-sm"
      />
    </div>
    <div class="mb-2 flex flex-col">
      <label for="select" class="text-[18px]">O'qish kunlari</label>
      <select
        id="select"
        class="w-full border border-[#33333390] my-2 p-2 outline-none rounded-md"
        v-model="study_select"
      >
        <option :value="day.val" v-for="day in this.study_days">
          {{ day.title }}
        </option>
      </select>
    </div>
    <div class="mb-2">
      <h1 class="text-lg mb-2">O'qish vaqti</h1>
      <div class="flex gap-8 justify-between">
        <!-- <label for="start" class="text-lg mr-2"
              >Boshlanish</label
            > -->
        <input
          type="time"
          class="w-full border border-[#33333390] my-2 p-2 outline-none rounded-md"
          id="start"
          v-model="start_time"
        />
        <!-- <label for="start" class="text-lg mr-2 ">Tugashi</label> -->
        <input
          type="time"
          id="start"
          class="w-full border border-[#33333390] my-2 p-2 outline-none rounded-md"
          v-model="end_time"
        />
      </div>
    </div>
    <div class="flex gap-4 w-full">
      <div class="mb-4 w-1/2">
        <h1 class="mb-2 text-lg">Qachon ochilgan</h1>
        <input type="date" class="p-2 outline-none rounded-md w-full border border-[#33333390]" v-model="date_add" />
      </div>
      <div class="mb-4 w-1/2">
        <label for="select" class="text-lg">Mentor</label>
        <select
          id="select"
          class="w-full my-2 p-2 outline-none rounded-md border border-[#33333390]"
          v-model="mentor_select"
        >
          <option :value="mentor" v-for="mentor in this.mentors">
            {{ mentor.fullname }}
          </option>
        </select>
      </div>
    </div>
    <div class="text-end">
      <button
        class="py-2 px-4 bg-green-700 text-white rounded-md hover:bg-white border border-green-700 hover:text-green-700 transition-all delay-75"
        @click="handleGroupAdd"
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
      group_add: "",
      group_continue: "",
      token: localStorage.getItem("token"),
      storedCourses: [],
      course_select: {},
      mentors: [],
      mentor_select: "",
      study_select: "",
      start_time: "",
      end_time: "",
      study_days: [
        {
          id: 1,
          title: "Dushanba, Chorshanba, Juma",
          val: "toq",
        },
        {
          id: 2,
          title: "Seyshanba, Payshanba, Shanba",
          val: "juft",
        },
      ],
      date_add: "",
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
        study_day: this.study_select,
        val: this.course_select.val,
        mentor: this.mentor_select.id,
        mentor_info: this.mentor_select,
        continuity: this.group_continue,
        lesson_start_time: this.start_time,
        lesson_end_time: this.end_time,
        added_date: this.date_add,
      };
      if (
        new_group.title !== "" &&
        new_group.course !== "" &&
        new_group.study_day !== "" &&
        new_group.continuity !== "" &&
        new_group.lesson_start_time !== "" &&
        new_group.lesson_end_time !== "" &&
        new_group.added_date !== ""
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
          alert("Guruh muvaffaqiyatli qo'shildi");
          window.location.reload();
          this.course_select = "";
          this.group_add = "";
          this.study_days = "";
          this.mentor_select = "";
          this.start_time = "";
          this.end_time = "";
          this.added_date = "";
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
