import { ACTIVITY_TYPES, Subjects } from "../../types"

export interface IAuthedActivityEvent {
  subject: Subjects.AuthedActivity
  data: {
    actionKey: string
    data: { [key: string]: any }
    type: ACTIVITY_TYPES
    user: {
      id: string
      username: string
      fullName?: string
      initials: string
    }
  }
}
