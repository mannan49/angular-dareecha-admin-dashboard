import { Reference } from "@models/shared/reference.model";
import { McqOptionForm } from "./mcq-option-form.model";
import { Annotation } from "@models/shared/annotation.model";

export class McqForm {
    statement: string;
    options: McqOptionForm[];
    correctOptionId: string;
    grade: string;
    subject: string;
    chapter: Reference;
    difficultyLevel: string;
    attachments: File[];
    notes?: Annotation[];
}