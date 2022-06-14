<template>
  <h1 class="mt-3">Dictionaries list</h1>
  <div>
    <form>
      <div class="mb-3">
        <label class="form-label">Dictionary name</label>
        <input type="text" class="form-control" />
      </div>
      <button type="button" class="btn btn-primary">Add new</button>
    </form>
  </div>
  <div class="mt-3">
    <div v-for="dict in dictionariesList" :key="dict.id">
      {{ dict.id }} {{ dict.dictionary_name }} {{ dict.get_words_count }}
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/common/Spinner"
export default {
  name: "DictionariesList",
  components: { Spinner },
  data() {
    return {
      dictionariesList: [
        {
          id: 1,
          dictionary_name: "test1",
          get_words_count: 0,
          date_created: "2022-06-14T22:03:35.344676+03:00",
        },
        {
          id: 2,
          dictionary_name: "test2",
          get_words_count: 0,
          date_created: "2022-06-14T22:03:38.451397+03:00",
        },
      ],
      isLoading: true,
    }
  },
  methods: {
    addNewDictionaryHandler() {},
    deleteDictionaryHandler() {},
    updateDictionaryHandler() {},
  },
}
</script>

<style scoped></style>
