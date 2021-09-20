import { ACTIVITY_TYPES, Subjects } from "../.."

export interface INewActivityEvent {
  subject: Subjects.NewActivity
  data: {
    id: string
    userId: string
    type: ACTIVITY_TYPES
  }
}
