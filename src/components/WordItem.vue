<template>
  <div class="d-flex flex-row my-3">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" v-model="wordItem.checked_val">
    </div>
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
  methods:{
    // changeHandler(e, word_id) {
    //   this.$emit("addInCheckedArray", word_id, e.target.checked)
    // }
  }
}
</script>

<style scoped>

</style>