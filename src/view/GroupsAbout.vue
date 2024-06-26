<template>
  <section class="w-full" v-if="this.group.status !== 'completed'">
    <div class="group_title">
      <h1 class="text-2xl">Guruh: {{ title }}</h1>
      <h1 class="text-xl">
        Guruhning statusi:
        {{ group.status == "continues" ? "Aktiv" : "Guruh aktiv emas" }}
      </h1>
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
    <div class="group_info mt-5 h-[550px] overflow-y-scroll overflow-x-hidden">
      <table
        class="w-full table-auto text-center mx-auto border border-[#33333390] mt-10"
      >
        <thead class="">
          <tr class="bg-[#333] text-white border border-[#33333390]">
            <th class="">#</th>
            <th class="">Ism-sharifi</th>
            <th v-for="day in studiedDays" :key="day">
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody class="mt-4">
          <tr
            v-for="(student, index) in group.students"
            :key="student.id"
            class="hover:bg-[#f4dfd17c]"
          >
            <td>{{ index + 1 }}</td>
            <td class="py-4">{{ student.fullname }}</td>
            <td class="group relative" v-for="day in studiedDays" :key="day">
              <div
                class="group-hover:flex transition-all delay-100 group-hover:transition-all group-hover:delay-100 gap-2 absolute top-[-30px] z-10 bg-white left-[-20px] hidden text-white rounded-md"
              >
                <button
                  class="bg-green-500 text-xl py-1 px-2 rounded-md"
                  @click="handlePostAttendance(student.id, true, day)"
                >
                  <i class="bx bxs-check-circle"></i>
                </button>
                <button
                  class="bg-red-500 text-xl py-1 px-2 rounded-md"
                  @click="handlePostAttendance(student.id, false, day)"
                >
                  <i class="bx bxs-x-circle"></i>
                </button>
              </div>
              <button
                class="shadow-lg p-1 px-2 rounded-md border-2 border-white"
                v-if="isAttended(student.id, day) || isAbsent(student.id, day)"
                :class="{
                  'text-green-500': isAttended(student.id, day),
                  'text-red-500': isAbsent(student.id, day),
                }"
              >
                <i
                  v-if="isAttended(student.id, day)"
                  class="bx bxs-check-circle text-xl"
                ></i>
                <i v-else class="bx bxs-x-circle text-xl"></i>
              </button>
              <button
                class="shadow-lg p-2 px-4 rounded-md border-2 border-white"
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
      attendanceDate: [], // Initialize as an empty array
      gettedMonth: "",
      selectedDates: "",
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
      fetch(`https://api.django-admin.uz/api/groups/${this.takedGroup.id}/`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          this.group = data;
          console.log("About Group: ", this.group);
        });
    },
    getGroups() {
      fetch("https://api.django-admin.uz/api/groups/all/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          this.groupRender = data;
          this.selectedGroup();
          this.getGroup();
        });
    },
    getAttendances() {
      fetch("https://api.django-admin.uz/api/attendances/all/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((response) => {
          this.attendanceDate = Array.isArray(response.data) ? response.data : [];
          // console.log('Attendaces: ',this.attendanceDate)
        });
    },
    getDaysInMonthArray() {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const nextMonth = new Date(
        currentDate.getFullYear(),
        currentMonth + 1,
        0
      );
      const daysInMonth = nextMonth.getDate();
      this.daysInMonth = [];
      for (let i = 1; i <= daysInMonth; i++) {
        this.daysInMonth.push(i);
      }
    },
    async postStartStatus() {
      try {
        const response = await fetch(
          "https://api.django-admin.uz/api/groups/start/",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-type": "application/json",
            },
            body: JSON.stringify({ group_id: this.group.id }),
          }
        );
        if (response.ok) {
          alert("Guruhning statusi muvaffaqiyatli o'zgardi!");
          this.getGroup();
        } else {
          console.error("Failed to update group status");
        }
      } catch (error) {
        console.error("Error updating group status:", error);
      }
    },
    async postCompleteStatus() {
      try {
        let confirm = window.confirm("Anniq tugadimi?");
        if (confirm) {
          const response = await fetch(
            "https://api.django-admin.uz/api/groups/complete/",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${this.token}`,
                "Content-type": "application/json",
              },
              body: JSON.stringify({ group_id: this.group.id }),
            }
          );
          if (response.ok) {
            alert("Guruhning statusi muvaffaqiyatli o'zgardi!");
            this.getGroup();
          } else {
            console.error("Failed to update group status");
          }
        } else {
          alert("Tugamadi.");
        }
      } catch (error) {
        console.error("Error updating group status:", error);
      }
    },
    async handlePostAttendance(id, attended, day) {
      try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const date = new Date(currentDate.getFullYear(), currentMonth, day);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

        const response = await fetch(
          `https://api.django-admin.uz/api/attendances/create/`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              student: id,
              attended: attended,
              date: formattedDate,
            }),
          }
        );
        if (response.ok) {
          // Update the local attendance data
          this.updateLocalAttendance(id, attended, formattedDate);
        } else {
          console.error("Failed to post attendance");
        }
      } catch (error) {
        console.error("Error posting attendance:", error);
      }
    },
    updateLocalAttendance(id, attended, date) {
      const existingRecord = this.attendanceDate.find(
        (entry) => entry.student === id && entry.date === date
      );
      if (existingRecord) {
        existingRecord.attended = attended;
      } else {
        this.attendanceDate.push({
          student: id,
          attended: attended,
          date: date,
        });
      }
    },
    isAttended(studentId, day) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const formattedDate = `${currentDate.getFullYear()}-${(currentMonth + 1)
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      const attendance = this.attendanceDate.find(
        (entry) => entry.student === studentId && entry.date === formattedDate
      );
      return attendance ? attendance.attended : false;
    },

    isAbsent(studentId, day) {
      return !this.isAttended(studentId, day);
    },
  },
  computed: {
    studiedDays() {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentMonth + 1,
        0
      ).getDate();

      const workingDays = [];
      const studyDay = this.group.study_day;

      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(currentDate.getFullYear(), currentMonth, i);
        const dayOfWeek = date.getDay();

        if (
          dayOfWeek !== 0 && // Exclude Sundays
          (studyDay === "barcha_kun" || // Include all days except Sundays
            (studyDay === "toq" && dayOfWeek % 2 !== 0) || // Odd days for "toq"
            (studyDay === "juft" && dayOfWeek % 2 === 0)) // Even days for "juft"
        ) {
          workingDays.push(i);
        }
      }

      return workingDays;
    },
  },

  mounted() {
    if (this.group.status !== "completed") {
      this.getGroups();
      this.getDaysInMonthArray();
    }
    this.getAttendances();
  },
};
</script>

<style scoped>
/* Ваш существующий CSS */
</style>
