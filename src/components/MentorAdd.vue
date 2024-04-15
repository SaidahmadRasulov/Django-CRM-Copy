<template>
  <div class="w-1/3 mx-auto">
    <div class="form_add bg-[#EFE7D8] p-4 h-full rounded-md shadow-lg">
      <label for="group" class="text-lg">Mentor qo'shish</label>
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
          placeholder="Location"
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
          @click="postMentor"
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
      storedCourses: [],
      token: localStorage.getItem("token"),
      fullname: "",
      phone_number: "",
      birthday: "",
      user_location: "",
      course_select: "",
    };
  },
  methods: {
    getCourse() {
      fetch("http://django-admin.uz/api/courses/all/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.storedCourses = data;
          this.storedCourses = this.storedCourses.slice(0, 3);
        });
    },
    async postMentor() {
      let new_mentor = {
        fullname: this.fullname,
        phone_number: this.phone_number,
        location: this.user_location,
        course: this.course_select.id,
        birthday: this.birthday,
      };
      if (
        new_mentor.fullname !== "" &&
        new_mentor.phone_number !== "" &&
        new_mentor.course !== "" &&
        new_mentor.location !== "" &&
        new_mentor.birthday !== ""
      ) {
        try {
          const response = await fetch(
            "http://django-admin.uz/api/customer/mentors/create/",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${this.token}`,
                "Content-type": "application/json",
              },
              body: JSON.stringify(new_mentor),
            }
          );
          alert("Mentor muvafaqiyatli koshildi");
          this.storedModalValue = false;
          this.fullname = "";
          this.phone_number = "";
          this.birthday = "";
          this.user_location = "";
          this.course_select = "";
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Iltimos barcha ma'lumotni kiriting!");
      }
    },
  },
  mounted() {
    this.getCourse();
  },
};
</script>
<style lang=""></style>
