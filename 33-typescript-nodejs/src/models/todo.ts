export interface Todo {
  readonly id: string
  readonly text: string
}

export type TodoId = string;
export const isTodoId = function (something: any): something is TodoId {
  return typeof something == "string"
}