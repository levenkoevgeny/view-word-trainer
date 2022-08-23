<template>
  <div class="d-flex flex-row">
    <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style="width: 380px;">
      <a href="/" class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
        <span class="fs-5 fw-semibold">Dictionary list</span>
      </a>
      <div class="list-group list-group-flush border-bottom scrollarea">
        <template v-for="dict in dictionariesList" :key="dict.id">
          <a href="#" class="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
            <div class="d-flex w-100 align-items-center justify-content-between">
              <strong class="mb-1">{{ dict.dictionary_name }}</strong>
              <small class="text-muted">Wed</small>
            </div>
            <div class="col-10 mb-1 small">{{ dict.description }}</div>
          </a>
        </template>
      </div>
    </div>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Train
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><button class="dropdown-item" @click="changeRoute(1, 'dictionaries_time_training')">Time training</button></li>
        <li><button class="dropdown-item" @click="changeRoute(1, 'dictionaries_spelling_training')">Spelling training</button></li>
      </ul>
    </div>
    <div class="m-3">
      <div>
        <form>
          <div class="mb-3">
            <label class="form-label">Rus word</label>
            <input type="text" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">English word</label>
            <input type="text" class="form-control">
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%">Add</button>
        </form>
      </div>
      <WordItem v-for="word in sortedWords"
                :key="word.id"
                :wordItem="word" />
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/common/Spinner"
import WordItem from "@/components/WordItem"

export default {
  name: "DictionariesList",
  components: { Spinner, WordItem },
  data() {
    return {
      dictionariesList: [
        {
          id: 1,
          dictionary_name: "test1",
          get_words_count: 0,
          description: "description 1",
          date_created: "2022-06-14T22:03:35.344676+03:00"
        },
        {
          id: 2,
          dictionary_name: "test2",
          get_words_count: 0,
          description: "description 2",
          date_created: "2022-06-14T22:03:38.451397+03:00"
        }
      ],
      wordsList: [
        {
          id: 1,
          word_rus: "rus2",
          word_eng: "eng1"
        },
        {
          id: 2,
          word_rus: "rus1",
          word_eng: "eng2"
        }
      ],
      isLoading: true
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
        params: { id: dictionaryId },
      })
    },
  },
  computed: {
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
