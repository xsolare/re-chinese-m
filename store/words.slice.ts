import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import { ICurrentWord, IWord, IWordSetting, WordsState } from "#types/store";
// import { ApiStatus } from "#types";
import { ICurrentWord, IWord, IWordSetting, WordsState } from "../types/store/words.types";
import { ApiStatus } from "../types/index";

//* State
const initialState: WordsState = {
  loadStatus: ApiStatus.NONE,

  words: [],
  submitedWords: [],
  currentWord: {} as ICurrentWord,
  settings: {} as IWordSetting,

  isPinyi: false,
  isAnswered: false,

  errors: [],
};

//* Slice
//* ////////////////////////////////////////////////////////////////////////
const wordsSlice = createSlice({
  name: "words",
  initialState,

  reducers: {
    validateAnswer: (state, { payload }: PayloadAction<IWord>) => {
      const isCorrect: boolean = !payload ? false : state.currentWord.word.id === payload.id;

      state.submitedWords.push({
        typeQuestion: state.currentWord.typeQuestion,
        word: state.currentWord.word,
        answer: payload,
        correct: isCorrect,
      });

      // useProgressTaskStore().submitTask(this.currentWord.word.id, isCorrect);
    },
    nextWord: (state) => {
      state.isAnswered = false;
      state.isPinyi = false;

      //? Need reword
      const usedWords = !state.submitedWords.length
        ? []
        : state.settings.re
        ? state.submitedWords.filter((x) => x.correct).map((x) => x.word)
        : state.submitedWords.map((x) => x.word);

      const unCompletedWords = state.words.filter((x) => usedWords.find((y) => y.id === x.id)?.id === undefined) as IWord[];

      const words: IWord[] = state.settings.random ? unCompletedWords.filter((x) => x.id !== state.currentWord.word.id) : unCompletedWords;

      const index = words.map((x) => x.id).indexOf(state.currentWord.word.id);

      state.currentWord = {
        typeQuestion: state.settings.typesQuestion[Math.floor(Math.random() * (state.settings.typesQuestion.length - 1))],
        word: state.settings.random
          ? words[Math.floor(Math.random() * (words.length - 1))]
          : index === words.length - 1
          ? words[0]
          : words[index + 1],
      };
      //? Need reword ^
    },
  },
});

export const {} = wordsSlice.actions;
export default wordsSlice;
