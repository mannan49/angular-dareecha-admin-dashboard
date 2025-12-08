import { McqOption } from '@models/shared/mcq-option.model';

export class McqItem {
  Statement: string;
  Options: McqOption[];
  CorrectOption?: boolean;
}
