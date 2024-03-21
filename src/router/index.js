import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/Home.vue";
import StudentsCheking from "../view/StudentsCheking.vue";
import Students from "../view/Students.vue";
import Payments from "../view/Payments.vue";
import PaymentGroup from "../components/PaymentGroup.vue";
import CompletedPage from "../view/CompletedPage.vue";
import GroupsAbout from "../view/GroupsAbout.vue";
import Mentors from "../view/Mentors.vue";
import MentorAbout from "../view/MentorAbout.vue";
import Leads from "../view/Leads.vue";
import SignIn from "../view/SignIn.vue";

const router = createRouter({
  history: createWebHistory(),
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
      name: "paymentsAbout",
      path: "/payments/:title",
      component: PaymentGroup,
    },
    {
      name: "students",
      path: "/students",
      component: Students,
    },
    {
      name: "completed",
      path: "/completed",
      component: CompletedPage,
    },
    {
      name: "groupsAbout",
      path: "/groups/:title",
      component: GroupsAbout,
    },
    {
      name: "mentors",
      path: "/mentors",
      component: Mentors,
    },
    {
      name: "mentorsAbout",
      path: "/mentors/:id",
      component: MentorAbout,
    },
    {
      name: "Leads",
      path: "/leads",
      component: Leads,
    },
    {
      name: "SignIn",
      path: "/signin",
      component: SignIn,
    },
  ],
});

export default router;
