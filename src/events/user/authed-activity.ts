import { ACTIVITY_TYPES, Subjects } from "../.."

export interface IAuthedActivityEvent {
  subject: Subjects.AuthedActivity
  data: {
    id: string
    userId: string
    type: ACTIVITY_TYPES
    fullName: string
  }
}
