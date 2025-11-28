import { BaseEntity } from './base-entity.model';
import { Reference } from '@models/shared/reference.model';
import { McqOption } from '@models/shared/mcq-option.model';
import { Annotation } from '@models/shared/annotation.model';
import { Attachment } from '@models/shared/attachment.model';
import { ScopedReference } from '@models/shared/scoped-reference.model';

export class Mcq extends BaseEntity {
  Statement: string;
  Options: McqOption[];
  CorrectOption: Reference;
  Grade: string;
  Subject: string;
  Boards: string[];
  Chapters: ScopedReference[];
  DifficultyLevel: string;
  Attachments: Attachment[];
  UploadedBy: Reference;
  Notes: Annotation[];
  IsActive: boolean;
}
