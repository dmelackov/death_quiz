<template>
  <div class="w-screen min-h-screen flex p-4 bg-slate-900 ">
    <div class="w-full max-w-full">
      <p class="text-slate-100">Correct: {{correct_count}}</p>
      <p class="text-slate-100">Incorrect: {{incorrect_count}}</p>
      <component v-bind:is="myComponent" :question="currentQuestion" @answered="answered"></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CategoryQuestionForm from '~/components/CategoryQuestionForm.vue';
import MultipleSelectQuestionForm from '~/components/MultipleSelectQuestionForm.vue';
import OrderQuestionForm from '~/components/OrderQuestionForm.vue';
import SelectQuestionForm from '~/components/SelectQuestionForm.vue';
import TextQuestionForm from '~/components/TextQuestionForm.vue';
import { useMyQuestionsStore, type Question } from '~/stores/questions';

const currentQuestion: Ref<Question | null> = ref(null)
const questionsStore = useMyQuestionsStore()
const settingsStore = useMySettingsStore()

const correct_count = ref(0)
const incorrect_count = ref(0)

const question_forms: { [id: string]: Component } = {
  "text": TextQuestionForm,
  "select": SelectQuestionForm,
  "multiple-select": MultipleSelectQuestionForm,
  "order": OrderQuestionForm,
  "category": CategoryQuestionForm
}

onMounted(() => {
  loadNextQuestion()
})

const myComponent: Component = computed(() => {
  if (currentQuestion.value == null) {
    return null
  }
  return question_forms[currentQuestion.value.type]
})

function answered(is_correct: boolean) {
  if (is_correct) {
    correct_count.value += 1
  } else {
    incorrect_count.value += 1
  }
  loadNextQuestion()
}

function loadNextQuestion() {
  const question = questionsStore.getNextRandomQuestion()
  if (!settingsStore.question_types.includes(question.type)) return loadNextQuestion()
  currentQuestion.value = question
}

</script>

<style></style>