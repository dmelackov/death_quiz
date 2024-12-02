import { defineStore } from 'pinia'

export const useMySettingsStore = defineStore({
  id: 'mySettingsStore',
  state: () => ({
    question_types: ["category"]
   }),
  actions: {}
})
