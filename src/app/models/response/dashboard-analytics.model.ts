import { Select } from '@models/shared/select.model';
import { ClassSubjectMcq } from './class-subject-mcq.model';

export class DashboardAnalytics {
  Mcqs: number;
  Chapters: number;
  Textbooks: number;
  Notes: number;
  Users: number;
  Classes: string[];
  ClassWiseMcqs: Select[];
  SubjectWiseMcqs: Select[];
  ClassSubjectMcqs: ClassSubjectMcq[];
}
