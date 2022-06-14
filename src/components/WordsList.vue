<template>
  <h1 class="mt-3">Words list</h1>
  <div>
    <form>
      <div class="mb-3">
        <label class="form-label">Word rus</label>
        <input type="text" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Word eng</label>
        <input type="text" class="form-control" />
      </div>
      <div class="mb-3">
        <select class="form-select" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <button type="button" class="btn btn-primary">Add new</button>
    </form>
  </div>
  <div class="mt-3">
    <div v-for="word in wordsList" :key="word.id">
      {{ word.id }} {{ word.word_rus }} {{ word.word_eng }}
      {{ word.dictionary }}
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/common/Spinner"

export default {
  name: "WordsList",
  components: { Spinner },
  data() {
    return {
      wordsList: [
        {
          id: 1,
          dictionary: 1,
          word_rus: "test",
          word_eng: "test",
        },
        {
          id: 2,
          dictionary: 1,
          word_rus: "test2",
          word_eng: "test2",
        },
      ],
      isLoading: true,
    }
  },
  methods: {
    addNewWordHandler() {},
    deleteWordHandler() {},
    updateWordHandler() {},
  },
}
</script>

<style scoped></style>
