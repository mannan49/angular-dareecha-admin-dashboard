import { Reference } from '@models/shared/reference.model';
import { McqOptionForm } from './mcq-option-form.model';
import { Annotation } from '@models/shared/annotation.model';

export class McqForm {
  Statement: string;
  Options: McqOptionForm[];
  CorrectOptionId: string;
  Grade: string;
  Subject: string;
  Chapter: Reference;
  DifficultyLevel: string;
  Attachments: File[];
  Notes?: Annotation[];
}
