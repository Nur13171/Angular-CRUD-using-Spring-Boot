import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:9001/api/student'; 

  constructor(private _http: HttpClient) { 

  }


  index = () => {
    return this._http.get<any>(`${this.apiUrl}/index`).pipe(map(res => {
        return res;
      }));
    }


store(studentData: any) {
  return this._http.post(`${this.apiUrl}/store`, studentData);
}

edit = (studentId: number) => {
  return this._http.get<any>(`${this.apiUrl}/edit/${studentId}`).pipe(map(res => {
    return res;
  }));
}

delete = (studentId: number) => {
  return this._http.delete(`${this.apiUrl}/delete/${studentId}`);
}
}
