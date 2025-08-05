import { Reference } from '@models/shared/reference.model';
import { Attachment } from '@models/shared/attachment.model';
import { BaseEntity } from './base-entity.model';

export class Chapter extends BaseEntity {
  board: string;
  grade: string;
  subject: string;
  name: string;
  index: number;
  author: Reference;
  Media: Attachment;
}
