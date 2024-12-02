<template>
  <div class="bg-slate-500 p-4 flex flex-col gap-3">
    <p class="text-slate-300">Номер вопроса: {{props.question.id}}</p>
    <h1 class="text-slate-100 text-2xl whitespace-pre-wrap">{{props.question.question}}</h1>
    <div>
      <template v-for="attachment in props.question.attachments">
        <img :src='"/static/attachments/" + attachment' alt="" srcset="" class="w-1/4">
      </template>
    </div>
    <div class="grid gap-1 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
      <template v-for="(answer, ind) in shuffled_answers">
        <div class="p-2 text-center w-full min-w-24 flex flex-col justify-center" @click="answer_f(ind)" :class="[getColor(ind), answered ? '' : 'hover:bg-slate-700 cursor-pointer']">
          <p class="text-slate-100" >{{answer}}</p>
        </div>
      </template>
    </div>
    <button v-if="!answered" @click="submitAnswer"  class="bg-slate-300 p-2">Submit</button>
    <button v-if="answered" @click="next" class="bg-slate-300 p-2">Next</button>
  </div>
</template>

<script lang="ts" setup>
import { type Question } from '~/stores/questions';

const emit = defineEmits<{
  (event: 'answered', is_correct: boolean): void;
}>();

const answer_text = ref('')
const answered = ref(false)
const is_correct = ref(false)

const shuffled_answers = ref<string[]>([])

function getColor(index: number){
  if (answered.value) {
    if (isCorrect(shuffled_answers.value[index])) {
      return "bg-green-600"
    } else {
      if(shuffled_answers.value[index] == answer_text.value){
        return "bg-red-600"
      }
      return "bg-slate-600"
    }
  } else {
    if (shuffled_answers.value[index] == answer_text.value) {
      return 'bg-slate-800'
    } else {
      return 'bg-slate-600'
    }
  }
}

function answer_f(index: number){
  if (answered.value) return
  answer_text.value = shuffled_answers.value[index]
  submitAnswer()
}

onMounted(() => {
  reload()
})

const props = defineProps<{
  question: Question
}>()

watch(props, () => {
  reload()
})

function isCorrect(answer: string) {
  return props.question.candidates?.indexOf(answer) == props.question.answer
}

function submitAnswer() {
  answered.value = true
  is_correct.value = isCorrect(answer_text.value)
}
function next(){
  emit('answered', is_correct.value)
  reload()
}

function reload(){
  const new_arr = props.question.candidates?.slice()
  shuffled_answers.value = shuffleArray(new_arr as string[])
  answered.value = false
  answer_text.value = ''
  is_correct.value = false
}
</script>

<style></style>