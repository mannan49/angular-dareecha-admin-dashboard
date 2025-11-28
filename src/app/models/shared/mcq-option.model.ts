import { Attachment } from './attachment.model';

export class McqOption {
  McqId: string;
  Text: string;
  Media: Attachment;
  RemoveExistingMedia?: boolean;
}
