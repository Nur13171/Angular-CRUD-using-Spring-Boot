import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
 
})
export class AddStudentComponent {
  studentForm : FormGroup;

  constructor( 
    private fb : FormBuilder, 
    private stdService : StudentService, 
    private toastService : ToastService,
    private router :Router
    ){
    this.studentForm = this.fb.group({
      name : ['',[Validators.required]],
      email: ['',[Validators.required]],
      dob : ['',[Validators.required]],
      gender : ['',[Validators.required]],
      address : ['',[Validators.required]]
    })
  }


  onSubmit() {
    if (this.studentForm.valid) {
      // Get the form values and send them to your API for storing the student data
      const formData = this.studentForm.value;
      this.stdService.store(formData).subscribe(
        (response) => {
          console.log('Student data stored successfully:', response);
          this.toastService.showSuccess('Student data stored successfully');
          // Navigate to the student list page
          this.router.navigate(['student/list']);
        },
        (error) => {
          console.error('Error storing student data:', error);
          // Handle the error here or display an error message to the user.
        }
      );
    }
  }
  

  checkToast(){  
      this.toastService.showSuccess('This is a success toast message.');
  }

  showAlert() {
    Swal.fire({
      title: 'Confirmation',
      text: 'Do you want to proceed?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes" - perform the desired action here
        Swal.fire('Success', 'You confirmed the action!', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked "No" or closed the dialog - handle accordingly
        Swal.fire('Cancelled', 'You canceled the action.', 'error');
      }
    });
  }
  


}
