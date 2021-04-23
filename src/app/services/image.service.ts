import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl = environment.baseUrl;

  // http options used for making API calls
  private httpOptions: any;

  constructor(private _http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  getLesions(region: string): Observable<Object> {
    return this._http.get(this.baseUrl + '/api/lesion/get-lesions/' + region);
  }

  uploadImage(formData: FormData): Observable<Object> {
    return this._http.post(this.baseUrl + '/api/image/upload-auto/', formData);
  }

  getImages(): Observable<Object> {
    //return this._http.get(this.baseUrl + '/api/image/get-images/');
    return this._http.get(this.baseUrl + '/api/image/get-images-by-region/');
  }

  getImage(imageName: string): Observable<Object> {
    return this._http.get(this.baseUrl + '/api/image/get-image/' + imageName, {responseType: 'blob'})
  }
}
