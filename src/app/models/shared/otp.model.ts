export class Otp {
  code: string;
  expired: boolean;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  secretKey: string;
}
