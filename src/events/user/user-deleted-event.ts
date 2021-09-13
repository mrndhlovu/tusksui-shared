import { Subjects } from "../../types"

export interface IUserDeletedEvent {
  subject: Subjects.UserDeleted
  data: {
    id: string
    email: string
    boardIds: string[]
  }
}
