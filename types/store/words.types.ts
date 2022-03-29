import { ApiStatus } from "..";

//* State
export interface WordsState {
  loadStatus: ApiStatus;

  settings: IWordSetting;
  words: IWord[];
  submitedWords: ISubmitedWord[];
  currentWord: ICurrentWord;

  isPinyi: boolean;
  isAnswered: boolean;

  errors: [];
}

//* Interfaces
export interface IWordSetting {
  typesQuestion: TypesQuestion[];
  re: true;
  random: false;
}

export interface IWord {
  id: number;
  original: string;
  pinyin: string;
  translate: string;
  hsk: number;
  type: string;
}

export interface ICurrentWord {
  typeQuestion: TypesQuestion;
  word: IWord;
}

export interface ISubmitedWord {
  typeQuestion: TypesQuestion;
  word: IWord;
  answer?: IWord;
  correct: boolean;
}

export const typesQuestion = [0, 1, 2];
export type TypesQuestion = typeof typesQuestion[number];
