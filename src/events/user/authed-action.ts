import { ACTION_TYPES, Subjects } from "../../types"

export interface IAuthedActionEvent {
  subject: Subjects.AuthedAction
  data: {
    actionKey: string
    entities: { [key: string]: any }
    type: ACTION_TYPES
    user: {
      id: string
      username: string
      fullName?: string
      initials: string
    }
  }
}
