import { BaseFilter } from './base-filter.model';

export class McqFilter extends BaseFilter {
  subject?: string;
  difficultyLevel?: string;
}
