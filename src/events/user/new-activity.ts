import { ACTIVITY_TYPES, Subjects } from "../../types"

export interface INewActivityEvent {
  subject: Subjects.NewActivity
  data: {
    actionKey: string
    data: { [key: string]: any }
    id: string
    type: ACTIVITY_TYPES
    userId: string
  }
}
