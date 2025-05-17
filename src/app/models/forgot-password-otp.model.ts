export class ForgotPasswordOtp {
  otp: string;
  expired: boolean;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  secret_key: string;
}
