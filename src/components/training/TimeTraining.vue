<template>
  <h1 style="font-size: 100px">{{ dictionary.dictionary_name }}</h1>
  <label class="form-label">Interval speed</label>
  <input type="range" class="form-range" :min="minIntervalSpeed" :max="maxIntervalSpeed" v-model="intervalSpeed">
  <button @click="startTrain">Start</button>
  <button @click="stopTrain">Stop</button>
  <br>
  <br>
  <br>
  <h1 v-if="randomWord">{{ randomWord.word_eng }}</h1>


</template>

<script>
import { mapGetters } from "vuex"
import { dictionary_api } from "@/api/dictionary_api"

export default {
  name: "TimeTraining",
  data() {
    return {
      dictionary: null,
      randomWord: null,
      isLoading: true,
      intervalId: null,
      intervalSpeed: 1,
      minIntervalSpeed: 1,
      maxIntervalSpeed: 10,
    }
  },
  computed: {
    ...mapGetters({
      userData: "auth/getUser",
      userToken: "auth/getToken"
    })
  },
  watch: {
    intervalSpeed(newInterval, oldInterval) {
      clearInterval(this.intervalId)
      this.intervalId = setInterval(() => this.getRandomWord(), this.maxIntervalSpeed * 1000 - this.intervalSpeed * 1000)
    }
  },
  async created() {
    await this.initData()

    this.$watch(
      async () => this.$route.params.id,
      async (toParams, previousParams) => {
        await this.initData()
      }
    )
  },
  methods: {
    async initData() {
      try {
        const response = await dictionary_api.getDictionary(
          this.userToken,
          this.$route.params.id
        )
        this.dictionary = await response.data
        this.isLoading = false
      } catch (e) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    getRandomWord() {
      let randomIndex = Math.floor(Math.random() * this.dictionary.words.length)
      this.randomWord = this.dictionary.words[randomIndex]
    },
    startTrain() {
      this.intervalId = setInterval(() => this.getRandomWord(), this.maxIntervalSpeed * 1000 - this.intervalSpeed * 1000)
    },
    stopTrain() {
      clearInterval(this.intervalId)
    }
  }
}
</script>

<style scoped>

</style>