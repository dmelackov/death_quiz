<template>
  <div class="w-screen min-h-screen flex p-4 bg-slate-900 ">
    <div class="w-full max-w-full">
      <div class="flex justify-between">
        <div>
          <p class="text-slate-100">Correct: {{ correct_count }}</p>
          <p class="text-slate-100">Incorrect: {{ incorrect_count }}</p>
        </div>
        <button class="bg-slate-300 p-2" @click="dialog_visible = true">Settings</button>
      </div>


      <component v-bind:is="myComponent" :question="currentQuestion" @answered="answered"></component>
    </div>
    <Dialog v-model:visible="dialog_visible" modal header="Settings" :style="{ width: '25rem' }" pt:root="bg-slate-200 rounded p-4" pt:header="flex flex-row w-full justify-between" pt:headeraction="w-max h-max">
      <div>
        <input id="set1" type="checkbox" v-model="settingsStore.question_types['text']">
        <label for="set1">Type text</label>
      </div>
      <div>
        <input id="set2" type="checkbox" v-model="settingsStore.question_types['select']">
        <label for="set2">Type select</label>
      </div>
      <div>
        <input id="set3" type="checkbox" v-model="settingsStore.question_types['multiple-select']">
        <label for="set3">Type multi-select</label>
      </div>
      <div>
        <input id="set4" type="checkbox" v-model="settingsStore.question_types['order']">
        <label for="set4">Type order</label>
      </div>
      <div>
        <input id="set5" type="checkbox" v-model="settingsStore.question_types['category']">
        <label for="set5">Type category</label>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import CategoryQuestionForm from '~/components/CategoryQuestionForm.vue';
import MultipleSelectQuestionForm from '~/components/MultipleSelectQuestionForm.vue';
import OrderQuestionForm from '~/components/OrderQuestionForm.vue';
import SelectQuestionForm from '~/components/SelectQuestionForm.vue';
import TextQuestionForm from '~/components/TextQuestionForm.vue';
import { useMyQuestionsStore, type Question } from '~/stores/questions';
import { Dialog } from 'primevue';
const currentQuestion: Ref<Question | null> = ref(null)
const questionsStore = useMyQuestionsStore()
const settingsStore = useMySettingsStore()

const correct_count = ref(0)
const incorrect_count = ref(0)

const dialog_visible = ref(false)

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
  if (!settingsStore.question_types[question.type]) return loadNextQuestion()
  currentQuestion.value = question
}

</script>

<style></style>