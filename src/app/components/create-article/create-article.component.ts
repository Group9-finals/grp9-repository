import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { Profile } from "../../models/Profile";
import { ProfileService } from "src/app/services/profile.service";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit{
  form: FormGroup;
  profile: Profile;
  imageData: string;

  constructor(private profileService: ProfileService, private router: Router,) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      date: new FormControl(null),
      title: new FormControl(null),
      content: new FormControl(null),
      fileName: new FormControl(null),
      image: new FormControl(null),
    });
  }
 
  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      alert('Please fill all required fields');
      return;
    }
    
    this.profileService.addProfile(
      this.form.value.name,
      this.form.value.email,
      this.form.value.date,
      this.form.value.title,
      this.form.value.content,
      this.form.value.fileName,
      this.form.value.image
    );
    
    this.router.navigate(['/view-article']);
    this.form.reset();
    this.imageData = null;
  }
  
}

