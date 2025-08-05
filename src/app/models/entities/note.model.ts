import { Annotation } from '../shared/annotation.model';
import { Attachment } from '../shared/attachment.model';
import { BaseEntity } from './base-entity.model';

export class Note extends BaseEntity {
  title: string;
  description: string;
  grade: string;
  subject: string;
  chapter: string;
  topic: string;
  type: string;
  board: string;
  file: Attachment;
  coverImage: Attachment;
  uploadedBy: string;
  annotations: Annotation[];
}
