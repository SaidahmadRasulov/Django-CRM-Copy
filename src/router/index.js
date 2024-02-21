import { createRouter, createMemoryHistory } from "vue-router";
import Home from "../view/Home.vue";
import StudentsCheking from "../view/StudentsCheking.vue";
import Students from "../view/Students.vue";
import Payments from "../view/Payments.vue";
import CompletedPage from '../view/CompletedPage.vue'
import GroupsAbout from '../view/GroupsAbout.vue'
import Mentors from '../view/Mentors.vue'
import MentorAbout from '../view/MentorAbout.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      name: "home",
      path: "/",
      component: Home,
    },
    {
      name: "checking",
      path: "/groups",
      component: StudentsCheking,
    },
    {
      name: "payments",
      path: "/payments",
      component: Payments,
    },
    {
      name: "students",
      path: "/students",
      component: Students,
    },
    {
      name: "completed",
      path: "/completed",
      component: CompletedPage
    },
    {
      name: 'groupsAbout',
      path: '/groups/:title',
      component: GroupsAbout
    },
    {
      name: 'mentors',
      path: '/mentors',
      component: Mentors
    },
    {
      name: 'mentorsAbout',
      path: '/mentors/:name',
      component: MentorAbout
    }
  ],
});

export default router;
