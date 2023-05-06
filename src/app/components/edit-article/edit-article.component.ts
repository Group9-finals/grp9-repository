import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  updateForm: FormGroup;
  id: string;
  imageData: string;

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.updateForm = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      date: new FormControl(null),
      title: new FormControl(null),
      content: new FormControl(null),
      fileName: new FormControl(null),
      image: new FormControl(null),
    });

    this.id = this.route.snapshot.params['id'];
    this.profileService.getProfileById(this.id).subscribe(res => {
      this.updateForm.setValue({
        name: res['name'],
        email: res['email'],
        date: res['date'],
        title: res['title'],
        content: res['content'],
        fileName: null,
        image: null,
      });
    });
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.updateForm.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onUpdate() {

    this.profileService.updateProfile(
      this.id,
      this.updateForm.value.name,
      this.updateForm.value.email,
      this.updateForm.value.date,
      this.updateForm.value.title,
      this.updateForm.value.content,
      this.updateForm.value.fileName,
      this.updateForm.value.image
    );
    
  
    //this.imageData = null;
    this.router.navigate(['/view-article']);
  }
  

  onCancel() {
    this.router.navigate(['/view-article']);
  }
}
