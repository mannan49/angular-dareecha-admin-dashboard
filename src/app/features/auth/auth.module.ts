import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { InputComponent } from "../../shared/components/input/input.component";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { ValidateControlDirective } from '@shared/directives/validate-control.directive';
import { OnlyNumberInputDirective } from '@shared/directives/only-number-input.directive';
import { ErrorMessageComponent } from "../../shared/components/error-message/error-message.component";


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    InputComponent,
    ButtonComponent,
    AuthRoutingModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
    OnlyNumberInputDirective,
    ValidateControlDirective,
]
})
export class AuthModule { }
