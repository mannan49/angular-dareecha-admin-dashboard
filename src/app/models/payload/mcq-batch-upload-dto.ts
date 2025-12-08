import { McqItem } from '@models/shared/mcq-item.model';
import { ScopedReference } from '@models/shared/scoped-reference.model';

export class McqBatchUploadDto {
  Mcqs: McqItem[];
  Grade: string;
  Subject: string;
  DifficultyLevel: string;
  Boards: string[];
  Chapters: ScopedReference[];
}
