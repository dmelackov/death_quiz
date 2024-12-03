import { defineStore } from 'pinia'
import jsonData from "~/assets/questions.json";

export type QuestionType = 'text' | 'select' | 'multiple-select' | 'order' | 'category'

export type Question = {
  id: number,
  type: QuestionType,
  question: string,
  candidates?: string | string[],
  categories?: string[],
  attachments?: string[],
  answer: string | number[] | string[] | number
}

export interface MultiSelectQuestion extends Question {
  answer: number[]
  candidates: string[]
  type: 'multiple-select'
}

export interface CategoryQuestion extends Question {
  answer: number[] 
  categories: string[]
  candidates: string[]
  type: 'category'
}

export interface OrderQuestion extends Question {
  answer: string[]
  type: 'order'
}

export const useMyQuestionsStore = defineStore('myQuestionsStore', {
  state: () => ({
    questions: jsonData
  }),
  actions: {
    getNextRandomQuestion(selected: number[], filters: { [key: string]: boolean }) {
      let select_range = []
      let ids = []
      for (let i = 0; i < this.questions.length; i++) {
        if(!filters[this.questions[i].type]) continue
        if(selected.includes(i)) {
          select_range.push(this.questions[i])
          ids.push(i)
        }
      }
      if (select_range.length == 0) return null
      let selected_id = ids[Math.round(Math.random() * (ids.length - 1))]
      return {q: select_range[ids.indexOf(selected_id)] as Question, i: selected_id}
    },
  }
})
