import { BaseEntity } from './base-entity.model';
import { Annotation } from '../shared/annotation.model';
import { Attachment } from '../shared/attachment.model';
import { Reference } from '@models/shared/reference.model';

export class Note extends BaseEntity {
  Title: string;
  Description: string;
  Grade: string;
  Subject: string;
  Chapter: string;
  Medium: string;
  Topic: string;
  Type: string;
  Board: string;
  File: Attachment;
  CoverImage: Attachment;
  UploadedBy: Reference;
  Annotations: Annotation[];
}
