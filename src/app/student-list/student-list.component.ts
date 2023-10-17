import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];

  constructor(private stdService: StudentService) { }

  ngOnInit() {
  this.index();
  }

  index() {
    this.stdService.index().subscribe(
      response => {
        this.students = response;
        console.log(response);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // delete(studentId: number) {
  //   this.stdService.delete(studentId).subscribe(
  //     response => {
  //       // Handle the response after successfully deleting the student
  //       console.log('Student deleted successfully:', response);
  //       // You might want to refresh the student list here, call this.index() again.
  //       this.index();
  //     },
  //     error => {
  //       console.error('Error deleting student:', error);
  //     }
  //   );
  // }


  delete(studentId: number) {
    Swal.fire({
      title: 'Delete Student',
      text: 'Are you sure you want to delete this student?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.stdService.delete(studentId).subscribe(
          (response) => {
            // Handle the response after successfully deleting the student
            console.log('Student deleted successfully:', response);
            // You might want to refresh the student list here, call this.index() again.
            this.index();
          },
          (error) => {
            console.error('Error deleting student:', error);
          }
        );
      }
    });
  }
  


}
