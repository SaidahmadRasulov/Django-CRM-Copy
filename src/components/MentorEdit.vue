<template>
  <div class="w-1/3 mx-auto">
    <div class="form_add bg-white p-4 h-full rounded-md shadow-lg">
      <label for="group" class="text-lg">Mentor o'zgartirish</label>
      <div class="mb-6">
        <input
          type="text"
          placeholder="Ism-sharifi"
          class="w-full py-2 px-4 outline-none mt-6 rounded-md border border-[#33333390]"
          v-model="fullname"
        />
      </div>
      <div class="mb-6">
        <input
          type="text"
          placeholder="Telefon raqami"
          class="w-full py-2 px-4 outline-none mt-4 rounded-md border border-[#33333390]"
          v-model="phone_number"
        />
      </div>
      <div class="mb-6">
        <input
          type="date"
          placeholder="Telefon raqami"
          class="w-full py-2 px-4 outline-none mt-4 rounded-md border border-[#33333390]"
          v-model="birthday"
        />
      </div>
      <div class="mb-6">
        <input
          type="text"
          placeholder="Yashash manzili"
          class="w-full py-2 px-4 outline-none mt-4 rounded-md border border-[#33333390]"
          v-model="user_location"
        />
      </div>
      <div class="mb-6">
        <label for="select" class="text-lg">Kurs</label>
        <select
          id="select"
          class="w-full my-2 p-2 outline-none rounded-md border border-[#33333390]"
          v-model="course_select"
        >
          <option :value="item" v-for="item in this.storedCourses">
            {{ item.title }}
          </option>
        </select>
      </div>
      <div class="mt-4 text-end">
        <button
          class="py-2 px-4 bg-green-700 text-white rounded-md hover:bg-white border border-green-700 hover:text-green-700 transition-all delay-75"
          @click="patchMentor"
        >
          O'zgartirish
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fullname: "",
      phone_number: "",
      birthday: "",
      user_location: "",
      course_select: "",
      storedCourses: [],
      editing_teacher: JSON.parse(localStorage.getItem("edit_teacher")),
      edited_teacher: {},
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    async patchMentor() {
      const editedData = {
        fullname: this.fullname,
        birthday: this.birthday,
        location: this.user_location,
        phone_number: this.phone_number,
        course: this.course_select.id,
      };

      if (
        this.fullname !== "" &&
        this.birthday !== "" &&
        this.phone_number !== "" &&
        this.courseSelect !== "" &&
        this.location !== ""
      ) {
        try {
          const response = await fetch(
            `https://django-admin.uz/api/customer/mentors/${this.edited_teacher.id}/update/`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${this.token}`,
                "Content-type": "application/json",
              },
              body: JSON.stringify(editedData),
            }
          ).then(() => {
            alert("Mentor o'zgarildi!");
            this.fullname = "";
            this.phone_number = "";
            this.location = "";
            this.courseSelect = "";
            this.birthday = "";
          });
        } catch (error) {
          console.error("Error:", error);
        }
        console.log(editedData);
      } else {
        console.error("Please fill all required fields");
      }
    },
    gettingDateTeacher() {
      if (this.editing_teacher !== null) {
        this.edited_teacher = this.editing_teacher;
        this.fullname = this.edited_teacher.fullname;
        this.phone_number = this.edited_teacher.phone_number;
        this.birthday = this.edited_teacher.birthday;
        this.user_location = this.edited_teacher.location;
        console.log(this.edited_teacher);
      }
    },
    getCourse() {
      fetch("https://django-admin.uz/api/courses/all/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include"
      })
        .then((response) => response.json())
        .then((data) => {
          this.storedCourses = data;
          console.log(this.storedCourses)
        });
    },
  },
  mounted() {
    this.gettingDateTeacher();
    this.getCourse()
  },
};
</script>
<style lang=""></style>
