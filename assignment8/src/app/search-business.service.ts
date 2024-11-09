// Comment for git push
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class SearchBusinessService {

  constructor(private http:HttpClient) {}

  private api_loc = 'Your_API';
  // api location api
  private api_google = 'Your_API';
  // google maps api

  public getSearchBusinesses(keyword: string, distance:string,category:string,lat:Number,lon:Number): Observable<any> {
    return this.http.get(`http://localhost:8081/get_search?keyword=${keyword}&distance=${distance}&category=${category}&lat=${lat}&lon=${lon}`);
    // return this.http.get(`https://angbackend-421302.wl.r.appspot.com/get_search?keyword=${keyword}&distance=${distance}&category=${category}&lat=${lat}&lon=${lon}`);
  }

  public getBusinessDetails(id:string): Observable<any> {
    return this.http.get(`http://localhost:8081/get_business?id=${id}`);
    // return this.http.get(`https://angbackend-421302.wl.r.appspot.com/get_business?id=${id}`);
  }

  public getAutocompleteFromAPI(keyword:string, lat:Number, lon:Number): Observable<any> {
    return this.http.get(`http://localhost:8081/get_autocomplete?word=${keyword}&lat=${lat}&lon=${lon}`);
    // return this.http.get(`https://angbackend-421302.wl.r.appspot.com/get_autocomplete?word=${keyword}&lat=${lat}&lon=${lon}`);
  }

  public IPInfo(): Observable<any> {
    return this.http.get(`https://ipinfo.io/json?token=${this.api_loc}`);
  }

  public getGoogleAPI(loc:string): Observable<any> {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${this.api_google}`;
    return this.http.get(url);
  }

  public getReviews(id:string): Observable<any> {
    return this.http.get(`http://localhost:8081/get_reviews?id=${id}`);
    // return this.http.get(`https://angbackend-421302.wl.r.appspot.com/get_reviews?id=${id}`);
  }

}
