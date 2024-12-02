import { defineStore } from 'pinia'
import type { QuestionType } from './questions'

export const useMySettingsStore = defineStore({
  id: 'mySettingsStore',
  state: () => ({
    question_types: {
      "text": true,
      "select": true,
      "multiple-select": true,
      "order": true,
      "category": true
    },
    repeat: false,
    questions_bin: <boolean[]>[]
   }),
  actions: {},
  persist: true
})
