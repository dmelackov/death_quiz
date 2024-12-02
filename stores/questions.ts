import { defineStore } from 'pinia'
import jsonData from "~/assets/questions.json";
export type Question = {
  id: number,
  type: string,
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

export const useMyQuestionsStore = defineStore('myQuestionsStore', {
  state: () => ({
    questions: jsonData
    // questions: [
    //   // {
    //   //   id: 1,
    //   //   type: "text",
    //   //   question: 'What is your favorite color?',
    //   //   attachments: ['red.png', 'green.png', 'blue.png'],
    //   //   answer: 'Blue'
    //   // },
    //   // {
    //   //   id: 2,
    //   //   type: "select",
    //   //   question: 'What is your favorite animal?',
    //   //   candidates: ['Cat', 'Dog', 'Mouse'],
    //   //   answer: 1
    //   // },
    //   // {
    //   //   id: 3,
    //   //   type: "multiple-select",
    //   //   question: 'What is your favorite fruit?',
    //   //   candidates: ['Apple', 'Banana', 'Orange'],
    //   //   answer: [1, 2]
    //   // },
    //   {
    //     id: 4,
    //     type: "order",
    //     question: 'Order by favorite food',
    //     answer: ['Burger', 'Pizza', 'Pasta']
    //   },
    //   // {
    //   //   id: 5,
    //   //   type: "category",
    //   //   question: 'What is your favorite movie?',
    //   //   categories: ["Action", "Comedy", "Drama"],
    //   //   candidates: ["Inception", "The Shawshank Redemption", "The Dark Knight"],
    //   //   answer: { 0: 0, 1: 1, 2: 2 }
    //   // }
    // ]
  }),
  actions: {
    getNextRandomQuestion(selected: number[]) {
      let select_range = []
      for (let i = 0; i < this.questions.length; i++) {
        if(selected.includes(i)) select_range.push(this.questions[i])
      }
      return select_range[Math.round(Math.random() * (select_range.length - 1))]
    },
  }
})
