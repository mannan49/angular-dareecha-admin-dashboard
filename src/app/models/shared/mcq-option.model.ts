import { Attachment } from './attachment.model';

export class McqOption {
  mcqId: string;
  text: string;
  media: Attachment;
  removeExistingMedia?: boolean;
}
