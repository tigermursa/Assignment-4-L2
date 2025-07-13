export type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

interface book {
  title: string;
  isbn: number;
}

export interface IBorrow {
  book: book;
  totalQuantity: number;
  dueDate: Date;
}
