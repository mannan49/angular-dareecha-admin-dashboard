import { BaseEntity } from './base-entity.model';

export class RefreshToken extends BaseEntity {
  token: string;
  userId: string;
  expiresAt: Date;
  createdByIp: string;
  isRevoked: boolean;
  revokedAt: Date;
  replacedByToken: string;
}
