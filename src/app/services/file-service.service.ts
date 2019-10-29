import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor(private http: HttpClient) {
  }

  public getHousingFileData(): Observable<any>{
    return this.http.get('./assets/housing.json')
    .pipe(
      catchError(this.handleError('getHeaderData', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
