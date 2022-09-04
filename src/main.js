import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router/router"
import store from "@/store"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons"
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { faPause } from "@fortawesome/free-solid-svg-icons"

library.add(faPlusCircle)
library.add(faPlusSquare)
library.add(faEllipsisVertical)
library.add(faPlay)
library.add(faPause)

createApp(App)
  .use(router)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app")
