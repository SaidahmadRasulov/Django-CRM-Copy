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
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      course_title: "",
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    async handleAdd() {
      let new_course = {
        id: Date.now(),
        title: this.course_title,
        val: this.course_title.slice(0, 3).toLowerCase(),
      };
      try {
        if (this.course_title !== "") {
          const response = await fetch(
            `https://django-admin.uz/api/courses/create/`,
            {
              method: "POST",
              headers: {
                Authentication: `Bearer ${this.token}`,
                "Content-type": "application/json",
              },
              body: JSON.stringify(new_course),
            }
          );
          console.log(response)
        } else {
          alert("Ma'lumotni kiriting!");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang=""></style>
