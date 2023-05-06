import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

import { Profile } from "../models/Profile";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private profiles: Profile[] = [];
  private profiles$ = new Subject<Profile[]>();
  readonly url = "http://localhost:3000/api/profiles";
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  getProfiles() {
    this.http
      .get<{ profiles: Profile[] }>(this.url)
      .pipe(
        map((profileData) => {
          return profileData.profiles;
        })
      )
      .subscribe((profiles) => {
        this.profiles = profiles;
        this.profiles$.next(this.profiles);
      });
  }

  getProfileById(id: any): Observable<any> {
    const API_URL = `${this.url}/read-profile/${id}`;
    const headers = new HttpHeaders();
    return this.http.get(API_URL, { headers }).pipe(
      map((res: any) => {
        const { imagePath, fileName, ...profile } = res; // destructuring to remove imagePath and fileName from the response
        return profile;
      })
    );
  }

  
  
  updateProfile(id: string, name: string, email: string, date: string, title: string, content: string, fileName:string|null, image:File|null): void {
    const Data = new FormData();
    Data.append("name", name);
    Data.append("email", email);
    Data.append("date", date);
    Data.append("title", title);
    Data.append("content", content);
    if (image) {
      Data.append("image", image, image.name);
    }

    const httpHeaders = new HttpHeaders();
    
    const options = {
        headers: httpHeaders,
        body: Data
    };

    this.http.put<{ profile: Profile }>(`${this.url}/update-profile/${id}?_=${new Date().getTime()}`, Data, options)
.subscribe(
        (profileData) => {
            const profile: Profile = {
                _id: profileData?.profile?._id,
                name: name,
                email: email,
                date: date,
                title: title,
                content: content,
                fileName: fileName || this.profiles.find(p => p._id === id)?.fileName,
                imagePath: image ? 'http://localhost:3000/images/' + image.name : this.profiles.find(p => p._id === id)?.imagePath,
            };
            // Find the index of the updated profile in the profiles array and replace it with the updated profile
            const index = this.profiles.findIndex(p => p._id === id);
            this.profiles[index] = profile;
            this.profiles$.next(this.profiles);
        },
        (error) => {
            console.log(error.error);
        }
    );
}
  
deleteProfile(id: string) {
  this.http.delete(`${this.url}/delete-profile/${id}`)
    .subscribe(() => {
      const updatedProfiles = this.profiles.filter(profile => profile._id !== id);
      this.profiles = updatedProfiles;
      this.profiles$.next(this.profiles.slice());
    });
}
  


  getProfilesStream() {
    return this.profiles$.asObservable();
  }

  addProfile(name: string, email: string, date: string, title: string, content: string, fileName:string, image: File): void {

    const profileData = new FormData();
    profileData.append("name", name);
    profileData.append("email", email);
    profileData.append("date", date);
    profileData.append("title", title);
    profileData.append("content", content);
    profileData.append("fileName", fileName);
    profileData.append("image", image, fileName);
    console.log('Data passed into profileData:', profileData);

    this.http
      .post<{ profile: Profile }>(this.url, profileData)
      .subscribe((profileData) => {
        const profile: Profile = {
          _id: profileData.profile._id,
          name: name,
          email: email,
          date:date,
          title: title,
          content: content,
          fileName: fileName,
          imagePath: profileData.profile.imagePath,
        };
        this.profiles.push(profile);
        this.profiles$.next(this.profiles);
      });
  }
}