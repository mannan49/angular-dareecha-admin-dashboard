import { BaseFilter } from './base-filter.model';

export class NoteFilter extends BaseFilter {
  board?: string;
  subject?: string;
  type?: string;
}
