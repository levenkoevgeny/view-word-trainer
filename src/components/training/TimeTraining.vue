<template>
  <h1 class="my-3" style="font-size: 60px" v-if="dictionary">{{ dictionary.dictionary_name }}</h1>
  <div class="d-flex justify-content-center">
    <p class="fs-2">Interval speed - <span class="ds-1 fw-bold">{{ intervalSpeed }}x</span></p>
  </div>
  <div class="d-flex flex-row align-items-center my-3">
    <span class="me-2 fs-3">{{ minIntervalSpeed }}x</span>
    <input type="range" class="form-range" :min="minIntervalSpeed" :max="maxIntervalSpeed" v-model="intervalSpeed">
    <span class="ms-2 fs-3">{{ maxIntervalSpeed }}x</span>
  </div>
  <button @click="startTrain" v-if="!isTrainRunning">Start</button>
  <button @click="stopTrain" v-if="isTrainRunning">Stop</button>
  <div class="my-5">
    <h1 v-if="randomWord" class="text-center" style="width: 100%; font-size: 70px;">{{ randomWord.word_rus }}</h1>
    <h1 v-if="randomWord" class="text-center alert alert-success" ref="answer" style="width: 100%; font-size: 40px; display: none">{{ randomWord.word_eng }}</h1>
  </div>
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
      maxIntervalSpeed: 5,
      isTrainRunning: false
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
      if (this.isTrainRunning) {
        clearInterval(this.intervalId)
        this.intervalId = setInterval(() => this.getRandomWord(),
        (this.maxIntervalSpeed + 1) * 1000 - this.intervalSpeed * 1000)
      }
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
      this.isTrainRunning = true
      clearInterval(this.intervalId)
      this.intervalId = setInterval(() => this.getRandomWord(), (this.maxIntervalSpeed + 2) * 1000 - this.intervalSpeed * 1000)
    },
    stopTrain() {
      this.isTrainRunning = false
      clearInterval(this.intervalId)
    }
  }
}
</script>

<style scoped>

</style>