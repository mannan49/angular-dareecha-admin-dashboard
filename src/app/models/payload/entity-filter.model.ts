import { BaseFilter } from './base-filter.model';

export class EntityFilter extends BaseFilter {
  board?: string;
  boards?: string[];
  subject?: string;
  query?: string;
  type?: string;
  grade?: string;
  chapterIds?: string[];
  difficultyLevel?: string;
}
