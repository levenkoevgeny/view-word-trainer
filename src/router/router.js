import { createRouter, createWebHistory } from "vue-router"

import DictionariesList from "@/components/DictionariesList"
import DictionaryListHome from "@/components/DictionaryListHome"
import WordsList from "@/components/WordsList"
import WordListHome from "@/components/WordListHome"
import LoginView from "@/components/auth/LoginView"
import RegistrationView from "@/components/auth/RegistrationView"
import NotFound from "@/components/common/NotFound"
import TimeTraining from "@/components/training/TimeTraining"
import SpellingTraining from "@/components/training/SpellingTraining"
import store from "@/store"

const routes = [
  { path: "/", name: "root", redirect: "/home", meta: { requiresAuth: true } },
  { path: "/home", name: "home", component: DictionaryListHome, meta: { requiresAuth: true } },
  { path: "/dictionaries", name: "dictionaries", component: DictionariesList,
    children: [
      {
        path: '',
        name: "dictionary_words_home",
        component: WordListHome,
      },
      {
        path: ':id',
        name: "dictionary_words",
        component: WordsList,
      },
    ],


    meta: { requiresAuth: true },

  },
  { path: "/dictionaries/:id/time-training", name: "dictionaries_time_training", component: TimeTraining, meta: { requiresAuth: true } },
  { path: "/dictionaries/:id/spelling-training", name: "dictionaries_spelling_training", component: SpellingTraining, meta: { requiresAuth: true } },
  // { path: "/words", name: "words", component: WordsList, meta: { requiresAuth: true } },
  { path: "/login", name: "login", component: LoginView },
  { path: "/registration", name: "registration", component: RegistrationView },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
})

router.beforeEach(async (to, from) => {
  await store.dispatch("auth/actionCheckLoggedIn")
  const isLoggedIn = store.getters["auth/getIsLoggedIn"]

  if (to.meta.requiresAuth && !isLoggedIn) {
    return {
      path: "/login",
      query: { redirect: to.fullPath },
    }
  }
})

export default router
