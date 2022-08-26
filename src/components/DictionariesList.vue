<template>
  <div class="d-flex flex-row">
    <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style="width: 380px;">
      <a href="/" class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
        <span class="fs-5 fw-semibold">Dictionary list</span>
      </a>
      <div class="list-group list-group-flush border-bottom scrollarea">
        <template v-for="dict in dictionariesList" :key="dict.id">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                    aria-expanded="false">
              Train
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <button class="dropdown-item" @click="changeRoute(dict.id, 'dictionaries_time_training')">Time training</button>
              </li>
              <li>
                <button class="dropdown-item" @click="changeRoute(dict.id, 'dictionaries_spelling_training')">Spelling training
                </button>
              </li>
            </ul>
          </div>
          <button
            class="list-group-item list-group-item-action py-3 lh-tight" aria-current="true"
            @click="() => this.$router.push({ name: 'dictionary_words', params: { id: dict.id } })">
            <div class="d-flex w-100 align-items-center justify-content-between">
              <strong class="mb-1">{{ dict.dictionary_name }}</strong>
              <small class="text-muted">Wed</small>
            </div>
            <div class="col-10 mb-1 small">{{ dict.description }}</div>
          </button>
        </template>
      </div>
    </div>
    <div class="m-3">
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Spinner from "@/components/common/Spinner"
import WordItem from "@/components/WordItem"
import { dictionary_api } from "@/api/dictionary_api"
import WordsList from "@/components/WordsList"

export default {
  name: "DictionariesList",
  components: { WordsList, Spinner, WordItem },
  data() {
    return {
      dictionariesList: [],
      wordsList: [],
      isLoading: true,
      isError: false
    }
  },
  async created() {
    try {
      const response = await dictionary_api.getDictionaryList(
        this.userToken
      )
      this.dictionariesList = await response.data
    } catch (e) {
      this.isError = true
    } finally {
      this.isLoading = false
    }
  },
  methods: {
    addNewDictionaryHandler() {
    },
    deleteDictionaryHandler() {
    },
    updateDictionaryHandler() {
    },
    changeRoute(dictionaryId, viewName) {
      this.$router.push({
        name: viewName,
        params: { id: parseInt(dictionaryId) }
      })
    }
  },
  computed: {
    ...mapGetters({
      userData: "auth/getUser",
      userToken: "auth/getToken"
    }),
    sortedWords: function() {
      return this.wordsList.sort(function(a, b) {
        if (a.word_rus < b.word_rus) {
          return -1
        }
        if (a.word_rus > b.word_rus) {
          return 1
        }
        return 0
      })
    }
  }
}
</script>

<style scoped>

.bi {
  vertical-align: -.125em;
  pointer-events: none;
  fill: currentColor;
}

.nav-flush .nav-link {
  border-radius: 0;
}

.btn-toggle-nav a {
  display: inline-flex;
  padding: .1875rem .5rem;
  margin-top: .125rem;
  margin-left: 1.25rem;
  text-decoration: none;
}

.btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
  background-color: #d2f4ea;
}

.scrollarea {
  overflow-y: auto;
}

.fw-semibold {
  font-weight: 600;
}

.lh-tight {
  line-height: 1.25;
}
</style>
