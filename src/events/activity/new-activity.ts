import { INewActivityEvent } from "../user/new-activity"
import { Publisher } from "../../services/base-publisher"
import { Subjects } from "../../types"

export class NewActivityPublisher extends Publisher<INewActivityEvent> {
  subject: Subjects.NewActivity = Subjects.NewActivity
}
