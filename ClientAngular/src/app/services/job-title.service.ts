import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobTitle } from '../models/job-title';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobTitleService {
  private url = "job/title";

  constructor(private http: HttpClient) { }

  public getJobTitle(): Observable<JobTitle[]> {
    return this.http.get<JobTitle[]>(`${environment.apiUrl}/${this.url}`);
  }

  public updateTitle(title: JobTitle): Observable<JobTitle[]> {
    return this.http.patch<JobTitle[]>(`${environment.apiUrl}/${this.url}/${title.idtitle}`,
      title);
  }

  public createTitle(title: JobTitle): Observable<JobTitle[]> {
    return this.http.post<JobTitle[]>(`${environment.apiUrl}/${this.url}`,
      title);
  }

  public deleteTitle(title:JobTitle): Observable<JobTitle[]> {
    return this.http.delete<JobTitle[]>(`${environment.apiUrl}/${this.url}/${title.idtitle}`);
  }
}
