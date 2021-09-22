import { ACTIVITY_TYPES, Subjects } from "../../types"

export interface INewActivityEvent {
  subject: Subjects.NewActivity
  data: {
    actionKey: string
    entities: { boardId: string; name?: string; [key: string]: any }
    type: ACTIVITY_TYPES
    userId: string
  }
}
