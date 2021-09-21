import { ACTIVITY_TYPES, Subjects } from "../../types"

export interface INewActivityEvent {
  subject: Subjects.NewActivity
  data: {
    id: string
    userId: string
    type: ACTIVITY_TYPES
    actionKey: string
  }
}
