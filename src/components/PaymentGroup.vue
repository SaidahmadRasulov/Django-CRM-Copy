<template>
  <div>
    <h1
      class="text-2xl"
      v-if="group && group.course_info && group.course_info.title"
    >
      Gruppaning Nomi: {{ group.course_info.title }} {{ title }}
    </h1>
    <div v-if="this.group.students_count > 0">
      <h1>Qaysi oyga to'lov:</h1>
      <ol class="flex items-center gap-4">
        <li v-for="(month, index) in getMonthsList()" :key="index">
          {{ index + 1 }}-{{ month }}
        </li>
      </ol>
    </div>
    <div
      class="h-[600px] overflow-y-scroll"
      v-if="this.group.students_count > 0"
    >
      <table class="w-5/6 table-fixed mx-auto text-center mt-10">
        <thead>
          <tr
            class="bg-[#333] text-[14px] border border-[#33333390] text-white"
          >
            <th class="px-4 py-2">№</th>
            <th class="px-4 py-2">Ism-sharifi</th>
            <th class="px-4 py-2">
              <div class="flex gap-6">
                <p>Oyni tanglang</p>
                <select
                  v-model="payment_month"
                  class="w-1/3 rounded-md text-black outline-none"
                  @change="console.log(payment_month.toString())"
                  aria-placeholder="oyni tanglan"
                >
                  <option v-for="item in looping" :value="item">
                    {{ item }}
                  </option>
                </select>
              </div>
            </th>
            <th class="px-4 py-2">Amal</th>
            <th class="px-4 py-2">Balans</th>
          </tr>
        </thead>
        <tbody>
          <tr
            ref="trRef"
            v-for="(student, index) in this.group.students"
            :key="student.id"
            class="text-[14px]"
          >
            <td class="border px-2 py-2">{{ index + 1 }}</td>
            <td class="border px-4 py-2">{{ student.fullname }}</td>
            <td class="border" v-if="!student.grant">
              <input
                type="text"
                v-model="student.amount"
                class="w-full p-2 outline-none bg-transparent"
                placeholder="Summani kiriting"
              />
            </td>
            <td class="border" v-else>-</td>
            <td class="border">
              <button
                class="px-4 py-2 bg-green-700 text-white rounded-md mr-4"
                @click="handlePayment(student)"
              >
                To'lash
              </button>
              <button
                class="px-4 py-2 bg-green-700 text-white rounded-md"
                @click="handlePostGrant(student)"
              >
                Grant
              </button>
            </td>
            <td class="border" v-if="!student.grant">
              {{ student.balance }}
            </td>
            <td class="border" v-else>Grant</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="w-1/2 h-1/2 mx-auto">
      <img class="w-full h-full" src="../assets/no-data.png" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      token: localStorage.getItem("token"),
      all_groups: [],
      group: {},
      selected_group: {},
      payment: "",
      payment_month: "",
      currentMonth: "",
    };
  },
  methods: {
    filterGroups() {
      this.all_groups = this.all_groups.filter((item) => {
        if (item.title == this.title) {
          this.selected_group = item;
          console.log("Taked Group: ", this.selected_group);
        }
      });
    },
    getGroup() {
      fetch(`http://django-admin.uz/api/groups/${this.selected_group.id}/`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          this.group = data;
          console.log("Group:", this.group);
        });
    },
    getGroups() {
      fetch(`http://django-admin.uz/api/groups/all/`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((response) => {
          this.all_groups = response.data;
          this.filterGroups();
          this.getGroup();
          console.log("All Groups: ", this.all_groups);
        });
    },
    async handlePayment(student) {
      if (!student.amount || isNaN(parseFloat(student.amount))) {
        alert("Iltimos to'gri ma'lumot kiriting");
        return;
      }
      const paymentData = {
        student: student.id,
        amount: parseFloat(student.amount),
      };

      try {
        const response = await fetch(
          `http://django-admin.uz/api/payments/create/`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
          }
        );

        if (!response.ok) {
          throw new Error("To'lov yuborishda xatolik yuz berdi!");
        }
        alert("To'lov muvaffaqiyatli amalga oshirildi!");
        window.location.reload();
      } catch (error) {
        alert("To'lov yuborishda xatolik yuz berdi");
      }
    },
    async handlePostGrant(student) {
      const postData = {
        student: student.id,
        grant: true,
      };
      try {
        const response = await fetch(
          `http://django-admin.uz/api/customer/students/${student.id}/update/`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-type": "application/json",
            },
            body: JSON.stringify(postData),
          }
        )
          .then((response) => response.json())
          .then(() => {
            alert("O'quvchining statusi o'zgardi");
            window.location.reload();
          });
      } catch (error) {
        alert(error);
      }
    },
    getMonthsList() {
      const months = [];
      const startMonth = new Date(this.group.added_date).getMonth();
      const continuity = this.group.continuity;
      const monthNames = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ];
      for (let i = 0; i < continuity; i++) {
        const monthIndex = (startMonth + i) % 12;
        months.push(monthNames[monthIndex]);
      }
      return months;
    },
  },
  mounted() {
    let taked_title = this.$route.params.title;
    if (taked_title !== "") {
      this.title = taked_title;
    }
    const currentDate = new Date();
    const options = { month: "long" };
    const monthString = currentDate.toLocaleDateString("en-US", options);
    this.currentMonth = monthString;
    console.log(monthString);
    this.getGroups();
    console.log(this.group.continuity);
  },
  computed: {
    looping() {
      const options = [];
      for (let i = 0; i < this.group.continuity; i++) {
        options.push(i + 1);
      }
      return options;
    },
  },
};
</script>
<style lang=""></style>
