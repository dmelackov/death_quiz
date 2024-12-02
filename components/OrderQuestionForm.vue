<template>
  <div class="bg-slate-500 p-4 w-max flex flex-col gap-3" @keypress="enter">
    <h1 class="text-slate-100 text-2xl">{{props.question.question}}</h1>
    <div>
      <template v-for="attachment in props.question.attachments">
        <img :src='"/static/attachments/" + attachment' alt="" srcset="" class="w-1/4">
      </template>
    </div>
    <div class="flex gap-4 justify-between">
      <input type="text" v-model="answer_text" :disabled="answered" class="bg-slate-300 p-2 flex-grow">

    </div>
    <button v-if="!answered" @click="submitAnswer"  class="bg-slate-300 p-2">Submit</button>
    <button v-if="answered" @click="next" class="bg-slate-300 p-2">Next</button>
    <p v-if="answered" :class="is_correct ? 'text-green-500' : 'text-red-500'">Answer: {{props.question.answer}}</p>
    <div v-if="answered">
      <template v-for="answer in props.question.answer">
        <p :class="is_correct ? 'text-green-500' : 'text-red-500'">Answer: {{answer}}</p>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type MultiSelectQuestion, type Question } from '~/stores/questions';

const emit = defineEmits<{
  (event: 'answered', is_correct: boolean): void;
}>();

const answer_text = ref('')
const answered = ref(false)
const is_correct = ref(false)

const props = defineProps<{
  question: MultiSelectQuestion
}>()

function submitAnswer() {
  answered.value = true
  is_correct.value = props.question.answer.toString().toLowerCase() === answer_text.value.toString().toLowerCase()
}

function enter(event: KeyboardEvent) {
  if(event.key !== 'Enter') return
  if(answered.value){
    next()
  } else {
    submitAnswer()
  }
}

function next(){
  emit('answered', is_correct.value)
  answered.value = false
  answer_text.value = ''
  is_correct.value = false
}

function reload(){
  answered.value = false
  answer_text.value = ''
  is_correct.value = false
}

</script>

<style></style>