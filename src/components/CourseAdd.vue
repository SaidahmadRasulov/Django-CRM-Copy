<template>
  <div class="w-2/3">
    <form action="#">
      <div class="mb-3">
        <label class="text-lg" for="course_title">Kurs qo'shish</label>
        <input
          type="text"
          id="course_title"
          class="w-full border border-[#33333390] py-2 px-4 outline-none mt-2 rounded-md placeholder:text-sm"
          placeholder="Kursni nomini kiriting"
          v-model="course_title"
        />
        <div class="text-end">
          <button
            @click="handleAdd"
            class="bg-green-700 text-white rounded-md p-2 px-4 hover:bg-white border border-green-700 hover:text-green-700 transition-all delay-75 mt-4"
          >
            Qo'shish
          </button>
        </div>
      </div>
      <div class="mb-3">
        <div class="flex flex-col">
          <label class="text-lg" for="course_title">Kurs o'chirish</label>
          <select
            id=""
            class="w-full border border-[#33333390] py-2 px-4 outline-none mt-2 rounded-md placeholder:text-sm"
            v-model="course_delete_val"
          >
            <option :value="item" v-for="item in this.courses">
              {{ item.title }}
            </option>
          </select>
        </div>
        <div class="text-end">
          <button
            @click="handleDelete"
            class="bg-red-700 text-white rounded-md p-2 px-4 hover:bg-white border border-red-700 hover:text-red-700 transition-all delay-75 mt-4"
          >
            O'chirish
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      course_title: "",
      token: localStorage.getItem("token"),
      course_delete_val: "",
      courses: [],
    };
  },
  methods: {
    async handleAdd() {
      let new_course = {
        
        title: this.course_title,
        val: this.course_title.slice(0, 3).toLowerCase(),
      };
      try {
        if (this.course_title !== "") {
          const response = await fetch(
            `https://api.django-admin.uz/api/courses/create/`,
            {
              method: "POST",
              headers: {
                Authentication: `Bearer ${this.token}`,
                "Content-type": "application/json",
              },
              body: JSON.stringify(new_course),
            }
          );
          console.log(response.json());
        } else {
          alert("Ma'lumotni kiriting!");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async handleDelete() {
      try {
        let confirm = window.confirm("O'chirishga ro'zimisz?");
        if (confirm) {
          const response = await fetch(
            `https://api.django-admin.uz/api/courses/${this.course_delete_val.id}/delete/`,
            {
              method: "DELETE",
              headers: {
                Authentication: `Bearer ${this.token}`,
                "Content-type": "application/json",
              },
            }
          );
        }
      } catch (error) {
        console.log(error);
      }
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
          this.courses = data;
        });
    },
  },
  mounted() {
    this.getCourse();
  },
};
</script>
<style lang=""></style>
