<template>
  <div class="d-flex flex-row my-3">
    <input type="text" class="form-control" v-model="wordItem.word_rus">
    <input type="text" class="form-control mx-2" v-model="wordItem.word_eng">
    <select class="form-select" aria-label="Default select example">
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "WordItem",
  props: {
    wordItem: { type: Object, required: true },
  },
}
</script>

<style scoped>

</style>