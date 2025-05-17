import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PakistanCitiesConstants } from '@constants/pakistan-cities.constant';

@Component({
  selector: 'app-booking-form',
  standalone: false,
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent {
  bookingForm: FormGroup;
  pakistanCities = PakistanCitiesConstants;
  minimumDate = new Date()

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(){
    this.initializeBookingForm();
  }

  initializeBookingForm() {
    this.bookingForm = this.formBuilder.group({
      departureCity: [String.Empty, Validators.required],
      arrivalCity: [String.Empty, Validators.required],
      date: [String.Empty, Validators.required],
    })
  }

  onSubmitForm(){
    console.log("Form Data", this.bookingForm.value);
  }

}
