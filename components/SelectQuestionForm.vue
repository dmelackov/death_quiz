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
          <input type="radio" v-model="answer_text" :value="answer" :inputId="'r'+ind" :disabled="answered"/>
          <label :for="'r'+ind" :class="answered ? (isCorrect(answer) ? 'text-green-500' : 'text-red-500') : 'text-slate-100'" >{{answer}}</label>
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
  shuffled_answers.value = shuffle(new_arr as string[])
  answered.value = false
  answer_text.value = ''
  is_correct.value = false
}
</script>

<style></style>