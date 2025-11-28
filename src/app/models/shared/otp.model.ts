export class Otp {
  Code: string;
  Expired: boolean;
  Verified: boolean;
  CreatedAt: Date;
  UpdatedAt: Date;
  ExpiresAt: Date;
  SecretKey: string;
}
