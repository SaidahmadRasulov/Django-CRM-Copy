<template>
  <div>
    <h1>Group Name: {{ title }}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: this.$route.params.title,
      token: localStorage.getItem("token"),
      all_groups: [],
      group: {},
      selected_group: {},
    };
  },
  methods: {
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
          console.log("All Groups: ", this.all_groups);
        });
    },
  },
  mounted() {
    this.getGroups();
  },
};
</script>
<style lang=""></style>
