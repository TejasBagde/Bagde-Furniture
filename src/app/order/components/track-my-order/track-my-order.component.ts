import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-track-my-order',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './track-my-order.component.html',
  styleUrl: './track-my-order.component.css',
})
export class TrackMyOrderComponent {
  currentStep: number = 1;
  totalSteps: number = 5; // Total number of steps in the wizard

  // You can store the form data here if needed
  formData: any = {
    step1Data: '',
    step2Data: '',
    step3Data: '',
  };

  goToNextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isStepActive(step: number): boolean {
    return this.currentStep === step;
  }

  submitWizard() {
    console.log('Form Data:', this.formData);
    alert('Wizard Completed!');
  }
}
