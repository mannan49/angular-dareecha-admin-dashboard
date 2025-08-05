import { Annotation } from '@models/shared/annotation.model';
import { Attachment } from '@models/shared/attachment.model';
import { McqOption } from '@models/shared/mcq-option.model';
import { Reference } from '@models/shared/reference.model';
import { BaseEntity } from './base-entity.model';

export class Mcq extends BaseEntity {
  statement: string;
  options: McqOption[];
  correctOption: Reference;
  grade: string;
  subject: string;
  chapter: Reference;
  difficultyLevel: string;
  attachments: Attachment[];
  UploadedBy: Reference;
  Notes: Annotation[];
  IsActive: boolean;
}
