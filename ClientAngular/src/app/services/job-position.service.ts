import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { JobPosition } from '../models/job-position';

@Injectable({
  providedIn: 'root'
})
export class JobPositionService {
  private url = "job/position";

  constructor(private http: HttpClient) { }

  public getJobPosition(): Observable<JobPosition[]> {
    return this.http.get<JobPosition[]>(`${environment.apiUrl}/${this.url}`);
  }

  public updatePosition(position: JobPosition): Observable<JobPosition[]> {
    return this.http.patch<JobPosition[]>(`${environment.apiUrl}/${this.url}/${position.idposition}`,
      position);
  }

  public createPosition(position: JobPosition): Observable<JobPosition[]> {
    return this.http.post<JobPosition[]>(`${environment.apiUrl}/${this.url}`,
      position);
  }

  public deletePosition(position: JobPosition): Observable<JobPosition[]> {
    return this.http.delete<JobPosition[]>(`${environment.apiUrl}/${this.url}/${position.idposition}`);
  }
}
