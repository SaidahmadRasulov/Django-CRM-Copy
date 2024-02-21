<template>
  <section class="mt-3 w-4/5 mx-auto h-[600px]">
    <div class="select_box text-end">
      <select
        id="select"
        class="mb-4 p-2 outline-none rounded-md"
        v-model="tableSelect"
      >
        <option value="all">Hammasi</option>
        <option value="dev">Dasturlash</option>
        <option value="des">Grafik Dizayn</option>
        <option value="py">Python</option>
      </select>
    </div>
    <table class="w-full table-fixed text-center mx-auto border border-blue">
      <thead>
        <tr class="border bg-blue text-white border-blue">
          <th class="px-4 py-2">#</th>
          <th class="px-4 py-2">Ism-sharifi</th>
          <th class="px-4 py-2">Tel raqam</th>
          <th class="px-4 py-2">Ota-ona</th>
          <th class="px-4 py-2">Kurs</th>
          <th class="px-4 py-2">Guruh</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="filteredStudents.length > 0"
          v-for="(student, index) in filteredStudents"
          :key="student.id"
        >
          <td class="border px-4 py-2">{{ index + 1 }}</td>
          <td class="border px-4 py-2">{{ student.name }}</td>
          <td class="border px-4 py-2">{{ student.phoneNumber }}</td>
          <td class="border px-4 py-2">{{ student.parents }}</td>
          <td class="border px-4 py-2">{{ student.course }}</td>
          <td class="border px-4 py-2">{{ student.group }}</td>
        </tr>
        <tr v-else>
          <td colspan="6" class="border px-4 py-2 text-center">
            Ma'lumot yo'q
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      students: [],
      tableSelect: "all",
    };
  },
  mounted() {
    const storedData = JSON.parse(localStorage.getItem("trashArray"));
    if (storedData) {
      this.students = storedData;
    }
  },
  computed: {
    filteredStudents() {
      if (this.tableSelect === "all") {
        return this.students;
      } else {
        return this.students.filter(
          (student) => student.course === this.tableSelect
        );
      }
    },
  },
};
</script>

<style lang=""></style>
