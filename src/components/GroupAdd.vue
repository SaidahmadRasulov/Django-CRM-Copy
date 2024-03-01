<template>
  <div>
    <div class="form_add bg-blue p-4 rounded-md shadow-lg">
      <h2 class="text-xl text-white">Guruh qo'shish</h2>
      <div class="mb-6">
        <input
          type="text"
          v-model="group_add"
          placeholder="Guruh nomini kiriting"
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
          <option value="dev">Dasturlash</option>
          <option value="des">Grafik Dizayn</option>
          <option value="py">Python</option>
        </select>
      </div>
      <div class="mb-6">
        <label for="select" class="text-xl text-white">O'qish Kunlari</label>
        <select
          id="select"
          class="w-full my-2 p-2 outline-none rounded-md"
          v-model="study_select"
        >
          <option :value="day.title" v-for="day in this.study_days">
            {{ day.title }}
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
      storedGroups: [],
      storedLoad: null,
      course_select: "",
      study_select: "",
      study_days: [
        {
          id: 1,
          title: "Dushanba, Chorshanba, Juma",
        },
        {
          id: 2,
          title: "Seyshanba, Payshanba, Shanba",
        },
      ],
    };
  },
  methods: {
    handleGroupAdd() {
      let new_group = {
        id: parseInt(Date.now().toString().slice(1, 5)),
        title: this.group_add,
        cat: this.course_select,
        students: [],
        studyDay: this.study_select,
      };
      if (
        new_group.title !== "" &&
        new_group.cat !== "" &&
        new_group.studyDay !== ""
      ) {
        this.storedGroups.push(new_group);
        this.storedLoad = true;
        localStorage.setItem("loaded", JSON.stringify(this.storedLoad));
        localStorage.setItem("groups", JSON.stringify(this.storedGroups));
        console.log(this.storedGroups);
        alert("Guruh muvafaqiyatli koshildi");
        (this.course_select = ""),
          (this.group_add = ""),
          (this.study_days = "");
      } else {
        alert("Iltimos barcha ma'lumotlarni kiriting");
      }
    },
  },
  mounted() {
    const getedGroups = JSON.parse(localStorage.getItem("groups"));
    if (getedGroups) {
      this.storedGroups = getedGroups;
      console.log(this.storedGroups);
    } else if (this.handleGroupAdd()) {
      console.log("changed");
    }
    const loadedPage = JSON.parse(localStorage.getItem("loaded"));
    if (loadedPage) {
      this.storedLoad = loadedPage;
    }
  },
};
</script>
<style lang=""></style>
