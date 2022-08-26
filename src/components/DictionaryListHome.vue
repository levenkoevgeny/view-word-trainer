<template>
<main>
  <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">Album example</h1>
        <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
        <p>
          <a href="#" class="btn btn-primary my-2">Main call to action</a>
          <a href="#" class="btn btn-secondary my-2">Secondary action</a>
        </p>
      </div>
    </div>
  </section>
  <div class="my-3">
    <button @click="addNewDictionary" class="btn btn-primary my-2">Добавить словарь</button>
  </div>
  <div class="album py-5 bg-light">
    <div class="container">
      <h1 class="mb-3">Ваши словари</h1>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

        <div class="col" v-for="dict in dictionariesList" :key="dict.id">
          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            <div class="card-body">
              <h5>{{dict.dictionary_name}}</h5>
              <p class="card-text text-truncate" style="height: 20px" title="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div style="height: 10px;"></div>
              <small class="text-muted">{{dict.words.length}} слов</small>
              <div class="d-flex justify-content-between align-items-center mt-2">
                <div class="btn-group" style="width: 100%">
                  <button type="button"
                          class="btn btn-sm btn-outline-secondary" style="width: 50%"
                          @click="changeRoute(dict.id, 'dictionary_words')">Редакт.</button>
                  <div class="dropdown" style="width: 50%">
                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle text-wrap" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                            style="border-top-left-radius: 0px; border-bottom-left-radius: 0px;width: 100%">
                      Трен.
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><button class="dropdown-item" @click="changeRoute(dict.id, 'dictionaries_time_training')">Тренировка на скорость</button></li>
                      <li><button class="dropdown-item" @click="changeRoute(dict.id, 'dictionaries_spelling_training')">Тренировка правописания</button></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <h1 class="my-3">Общие словари</h1>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

        <div class="col" v-for="dict in dictionariesListCommon" :key="dict.id">
          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            <div class="card-body">
              <h5>{{dict.dictionary_name}}</h5>
              <p class="card-text text-truncate" style="height: 20px" title="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div style="height: 10px;"></div>
              <small class="text-muted">{{dict.words.length}} слов</small>
              <div class="d-flex justify-content-between align-items-center mt-2">
                <div class="btn-group" style="width: 100%">
                  <div class="dropdown" style="width: 100%">
                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle text-wrap" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                            style="border-top-left-radius: 0px; border-bottom-left-radius: 0px;width: 100%">
                      Тренировать
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><button class="dropdown-item" @click="changeRoute(dict.id, 'dictionaries_time_training')">Тренировка на скорость</button></li>
                      <li><button class="dropdown-item" @click="changeRoute(dict.id, 'dictionaries_spelling_training')">Тренировка правописания</button></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

    </div>
  </div>

</main>
</template>

<script>
import { mapGetters } from "vuex"
import Spinner from "@/components/common/Spinner"
import { dictionary_api } from "@/api/dictionary_api"

export default {
  name: "DictionaryListHome",
  components: { Spinner },
  data() {
    return {
      dictionariesList: [],
      dictionariesListCommon: [],
      dictionarySearchField: '',
      isLoading: true,
      isError: false
    }
  },
  async created() {
    try {
      const response = await dictionary_api.getDictionaryList(
        this.userToken, this.dictionarySearchField
      )
      this.dictionariesList = await response.data
    } catch (e) {
      this.isError = true
    } finally {
      this.isLoading = false
    }
    try {
      const responseCommon = await dictionary_api.getDictionaryListCommon(
        this.userToken
      )
      this.dictionariesListCommon = await responseCommon.data
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
  }
}
</script>

<style scoped>

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

</style>