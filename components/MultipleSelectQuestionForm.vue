<template>
  <div class="bg-slate-500 p-4 flex flex-col gap-3">
    <p class="text-slate-300">Номер вопроса: {{props.question.id}}</p>
    <h1 class="text-slate-100 text-2xl">{{props.question.question}}</h1>
    <div>
      <template v-for="attachment in props.question.attachments">
        <img :src='"/static/attachments/" + attachment' alt="" srcset="" class="w-1/4">
      </template>
    </div>
    <div class="flex gap-1 justify-between flex-col">
      <template v-for="(answer, ind) in shuffled_answers">
        <div class="flex gap-2 flex-row">
          <input type="checkbox" v-model="answers[ind]" :value="answer" :inputId="'r'+ind" :disabled="answered"/>
          <label :for="'r'+ind" :class="answered ? (isCorrect(answer) ? 'text-green-500' : 'text-red-500') : 'text-slate-100'">{{answer}}</label>
        </div>
      </template>
    </div>  
    <button v-if="!answered" @click="submitAnswer"  class="bg-slate-300 p-2">Submit</button>
    <button v-if="answered" @click="next" class="bg-slate-300 p-2">Next</button>
  </div>
</template>

<script lang="ts" setup>
import { type MultiSelectQuestion, type Question } from '~/stores/questions';

const emit = defineEmits<{
  (event: 'answered', is_correct: boolean): void;
}>();

const answers: Ref<boolean[]> = ref([])
const answered = ref(false)
const is_correct = ref(false)

const shuffled_answers = ref<string[]>([])

function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

onMounted(() => {
  reload()
})


function reload(){
  let new_arr = props.question.candidates.slice()
  shuffled_answers.value = shuffle(new_arr)
  answers.value = new Array(shuffled_answers.value.length).fill(false)
  answered.value = false
  is_correct.value = false
  console.log("reload")
}

const props = defineProps<{
  question: MultiSelectQuestion
}>()

watch(props, () => {
  reload()
})

function isCorrect(answer: string) {
  return props.question.answer.includes(props.question.candidates?.indexOf(answer) )
}

function submitAnswer() {
  answered.value = true
  let total_correct = true;
  for (let i = 0; i < shuffled_answers.value.length; i++) {
    if (isCorrect(shuffled_answers.value[i]) != answers.value[i]) {
      total_correct = false
      break
    }
  }
  is_correct.value = total_correct
}

function next(){
  emit('answered', is_correct.value)
  reload()
}
</script>

<style></style>