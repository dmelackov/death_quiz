import { defineStore } from 'pinia'

export const useMySettingsStore = defineStore({
  id: 'mySettingsStore',
  state: () => ({
    question_types: {
      "text": true,
      "select": true,
      "multiple-select": true,
      "order": false,
      "category": true
    }
   }),
  actions: {}
})
