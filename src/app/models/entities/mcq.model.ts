import { BaseEntity } from './base-entity.model';
import { Reference } from '@models/shared/reference.model';
import { McqOption } from '@models/shared/mcq-option.model';
import { Annotation } from '@models/shared/annotation.model';
import { Attachment } from '@models/shared/attachment.model';
import { ScopedReference } from '@models/shared/scoped-reference.model';

export class Mcq extends BaseEntity {
  statement: string;
  options: McqOption[];
  correctOption: Reference;
  grade: string;
  subject: string;
  boards: string[];
  chapters: ScopedReference[];
  difficultyLevel: string;
  attachments: Attachment[];
  uploadedBy: Reference;
  notes: Annotation[];
  isActive: boolean;
}
