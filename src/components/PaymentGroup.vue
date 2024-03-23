<template>
  <div>
    <h1
      class="text-2xl"
      v-if="group && group.course_info && group.course_info.title"
    >
      Gruppaning Nomi: {{ group.course_info.title }} {{ title }}
    </h1>
    <h1>Qaysi oyga tolov: {{ currentMonth }}</h1>
    <table
      class="w-2/3 table-fixed mx-auto text-center border border-blue mt-10"
    >
      <thead>
        <tr class="border bg-blue border-blue">
          <th class="px-4 py-2">#</th>
          <th class="px-4 py-2">Ism-sharifi</th>
          <th class="px-4 py-2 text-black">
            <select v-model="payment_month" class="w-full">
              <option v-for="item in looping">{{ item }}</option>
            </select>
          </th>
          <th class="px-4 py-2">Amal</th>
          <th class="px-4 py-2">Summa</th>
        </tr>
      </thead>
      <tbody>
        <tr
          ref="trRef"
          v-for="(student, index) in this.group.students"
          :key="student.id"
        >
          <td class="border px-2 py-2">{{ index + 1 }}</td>
          <td class="border px-4 py-2">{{ student.fullname }}</td>
          <td class="border">
            <input
              type="number"
              v-model="payment"
              class="w-full p-2 outline-none bg-transparent"
            />
          </td>
          <td class="border">
            <button class="px-4 py-2 bg-green-700 text-white rounded-md">
              To'lash
            </button>
          </td>
          <td class="border">
            {{ student.balance }}
          </td>
        </tr>
        <!-- <tr v-else>
          <td colspan="7" class="border px-4 py-2 text-center">
            Ma'lumot yo'q
          </td>
        </tr> -->
      </tbody>
    </table>
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
      for (let i = 0; i < this.group.continuity; i++) {
        console.log("Count")
      }
    },
  },
};
</script>
<style lang=""></style>
