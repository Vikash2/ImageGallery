import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  imageDetailList: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) {}

  getImageDetails() {
    this.imageDetailList = this.firebase.list('imageDetails');
  }
  insertImageDetails(imageDetails) {
    this.imageDetailList.push(imageDetails);
  }
}
