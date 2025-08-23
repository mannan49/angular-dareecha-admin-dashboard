import { Chapter } from "@models/entities/chapter.model";

export class ChapterAggregatedResponse extends Chapter {
  mcqCount: number;
}