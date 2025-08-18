import { BaseEntity } from './base-entity.model';
import { Annotation } from '../shared/annotation.model';
import { Attachment } from '../shared/attachment.model';
import { Reference } from '@models/shared/reference.model';

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
  uploadedBy: Reference;
  annotations: Annotation[];
}
