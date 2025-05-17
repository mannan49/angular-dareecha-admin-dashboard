import { Address } from './address.model';
import { SignupOtp } from './signup-otp.model';
import { ForgotPasswordOtp } from './forgot-password-otp.model';

export class User {
  userId: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  verified: boolean = false;
  RFIDCardNumber: string;
  address: Address;
  RFIDCardStatus: string;
  fcmToken: string;
  signupOtp: SignupOtp;
  forgotPasswordOtp: ForgotPasswordOtp;
  travelHistory: any;
  paymentInformation?: any;
}
