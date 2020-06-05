import { ImageService } from './../../shared/image.service';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;

  fromTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    category: new FormControl(''),
    imageUrl: new FormControl('', Validators.required),
  });

  constructor(
    private storage: AngularFireStorage,
    private service: ImageService
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/image.png';
      this.selectedImage = null;
    }
  }
  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.fromTemplate.valid) {
      // getting file path
      var filePath = `${formValue.category}/${this.selectedImage.name
        .split('.')
        .slice(0, -1)
        .join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      //uploading the file in the firebase
      this.storage
        .upload(filePath, this.selectedImage)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              formValue['imageUrl'] = url;
              this.service.insertImageDetails(formValue);
              alert('Image Uploaded');
              this.resetForm();
            });
          })
        )
        .subscribe();
    }
  }
  get formControls() {
    return this.fromTemplate['controls'];
  }
  resetForm() {
    this.fromTemplate.reset();
    // after resetting the form we have to set default values in form.
    this.fromTemplate.setValue({
      caption: '',
      imageUrl: '',
      category: 'Animal',
    });
    this.imgSrc = '/assets/upload.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }
}
