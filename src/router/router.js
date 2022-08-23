import { createRouter, createWebHistory } from "vue-router"

import DictionariesList from "@/components/DictionariesList"
import WordsList from "@/components/WordsList"
import LoginView from "@/components/auth/LoginView"
import RegistrationView from "@/components/auth/RegistrationView"
import NotFound from "@/components/common/NotFound"
import TimeTraining from "@/components/training/TimeTraining"
import SpellingTraining from "@/components/training/SpellingTraining"


const routes = [
  { path: "/", name: "main", redirect: "/dictionaries" },
  { path: "/dictionaries", name: "dictionaries", component: DictionariesList },
  { path: "/dictionaries/:id/time-training", name: "dictionaries_time_training", component: TimeTraining },
  { path: "/dictionaries/:id/spelling-training", name: "dictionaries_spelling_training", component: SpellingTraining },
  { path: "/words", name: "words", component: WordsList },
  { path: "/login", name: "login", component: LoginView },
  { path: "/registration", name: "registration", component: RegistrationView },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
})

const isAuthenticated = true

router.beforeEach(async (to, from) => {
  console.log("before router")
  if (
    // make sure the user is authenticated
    !isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.name !== "login"
  ) {
    // redirect the user to the login page
    return { name: "login" }
  }
})

export default router
