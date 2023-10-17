import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  studentForm!: FormGroup;
  studentId!: any;

  constructor(
    private route: ActivatedRoute, 
    private stdService: StudentService, 
    private fb: FormBuilder,
    private toastrService : ToastService,
    private router : Router
    
    ) { }
 

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.studentId = +params['id'];
      console.log('Student ID:', this.studentId);

      // Initialize the form group here
      this.studentForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        dob: [''],
        gender: [''],
        address: ['']
      });


    


      // Fetch student data and then patch the values
      this.stdService.edit(this.studentId).subscribe(data => {

        const date = new Date(data.dob);
        const formattedDate = date.toISOString().split('T')[0]; // Extract the date portion

        console.log(formattedDate)

        console.log("student data: ", data);
        this.studentForm.patchValue({
          name: data.name,
          email: data.email,
          dob: formattedDate,
          gender: data.gender,
          address: data.address
        });
      });
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      // Get the form data
      const studentData = this.studentForm.value;
  
      // Add the id to the studentData object
      studentData.id = this.studentId;

      console.log(studentData);
  
      // Call your service to update the student data
      this.stdService.store(studentData).subscribe(response => {
        console.log('Student updated successfully:', response);
        this.toastrService.showSuccess('student data update successfully');
        this.router.navigate(['student/list']);
        
        // Optionally, you can navigate to a different page or handle the success accordingly
      }, error => {
        console.error('Error updating student:', error);
        // Handle the error, such as showing an error message to the user
      });
    }
  }
  
  
  




}
