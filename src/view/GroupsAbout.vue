<template>
  <section class="w-full" v-if="this.group.status !== 'completed'">
    <div class="group_title">
      <h1 class="text-2xl">Guruh: {{ title }}</h1>
      <h1 class="text-xl">Guruhning statusi: {{ group.status }}</h1>
      <div class="my-2 flex gap-4">
        <button
          @click="postStartStatus"
          class="py-2 px-6 bg-green-600 text-white rounded-md"
        >
          Start
        </button>
        <button
          @click="postCompleteStatus"
          class="py-2 px-6 bg-green-600 text-white rounded-md"
        >
          Complete
        </button>
      </div>
    </div>
    <div class="group_info mt-5">
      <table
        class="w-full table-fixed text-center mx-auto border border-blue mt-10"
      >
        <thead>
          <tr class="border bg-blue text-white border-blue">
            <th class="">#</th>
            <th class="">Ism-sharifi</th>
            <th v-for="day in studiedDays" :key="day">
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in group.students" :key="student.id">
            <td>{{ index + 1 }}</td>
            <td class="py-4">{{ student.fullname }}</td>
            <td class="group relative" v-for="day in studiedDays">
              <div
                class="group-hover:flex transition-all delay-100 group-hover:transition-all group-hover:delay-100 gap-2 absolute top-[-30px] z-10 bg-white left-[-10px] hidden text-white rounded-md"
              >
                <button
                  class="bg-green-500 text-xl py-2 px-4 rounded-md"
                  @click="handlePostTrue(student.id, true)"
                >
                  <i class="bx bxs-check-circle"></i>
                </button>
                <button
                  class="bg-red-500 text-xl py-2 px-4 rounded-md"
                  @click="handlePostfalse(student.id, false)"
                >
                  <i class="bx bxs-x-circle"></i>
                </button>
              </div>
              <button
                class="shadow-lg p-2 px-4 rounded-md border-2 border-white"
                v-if="student.attended != null"
              >
                <i
                  class="bx bxs-check-circle text-green-500"
                  v-if="student.attended"
                ></i>
                <i class="bx bxs-x-circle text-red-500 text-xl" v-else></i>
              </button>
              <button
                class="shadow-lg p-4 rounded-md border-2 border-white"
                v-else
              ></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <section class="w-full h-full flex items-center justify-center" v-else>
    <h1>Guruh o'qishni yakunlagan!</h1>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: this.$route.params.title,
      takedGroup: {},
      group: {},
      groupRender: [],
      token: localStorage.getItem("token"),
      daysInMonth: [],
      gettedMonth: "",
    };
  },
  methods: {
    selectedGroup() {
      this.groupRender = this.groupRender.filter((item) => {
        if (item.title == this.title) {
          this.takedGroup = item;
        }
      });
    },
    getGroup() {
      fetch(`http://django-admin.uz/api/groups/${this.takedGroup.id}/`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          this.group = data;
          console.log(this.group);
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
          this.groupRender = response.data;
          this.selectedGroup();
          this.getGroup();
        });
    },
    getDaysInMonthArray() {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      this.gettedMonth = currentMonth;
      const nextMonth = new Date(
        currentDate.getFullYear(),
        currentMonth + 1,
        0
      );
      const daysInMonth = nextMonth.getDate();

      this.daysInMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    },
    async postStartStatus() {
      try {
        const response = await fetch(
          "http://django-admin.uz/api/groups/start/",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-type": "application/json",
            },
            body: JSON.stringify({ group_id: this.group.id }),
          }
        ).then((response) => console.log(response));
        alert("Guruhning statusi muvofaqiyatli o'zgarildi!");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async postCompleteStatus() {
      try {
        const response = await fetch(
          "http://django-admin.uz/api/groups/complete/",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-type": "application/json",
            },
            body: JSON.stringify({ group_id: this.group.id }),
          }
        ).then((response) => console.log(response));
        alert("Guruhning statusi muvofaqiyatli o'zgarildi!");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async handlePostTrue(id) {
      try {
        const response = await fetch(
          `http://django-admin.uz/api/attendances/create/`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-type": "application/json",
            },
            body: JSON.stringify({ student: id, attended: true }),
          }
        ).then((response) => console.log(response.json()));
      } catch (error) {
        console.log(error);
      }
    },
    async handlePostfalse(id) {
      console.log(id);
    },
  },
  computed: {
    studiedDays() {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const workingDays = [];
      const firstWorkingDay = new Date(
        currentDate.getFullYear(),
        currentMonth,
        1
      );
      while (workingDays.length < 12) {
        if (firstWorkingDay.getDay() % 2 !== 0) {
          workingDays.push(firstWorkingDay.getDate());
        }
        firstWorkingDay.setDate(firstWorkingDay.getDate() + 1);
      }
      return workingDays;
    },
  },

  mounted() {
    if (this.group.status !== "completed") {
      this.getGroups();
      this.getDaysInMonthArray();
    }
    // this.getAttendance()
  },
};
</script>

<style scoped></style>
