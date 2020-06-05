import { ImageService } from './../../shared/image.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.css'],
})
export class ImagesListComponent implements OnInit {
  constructor(private servic: ImageService) {}
  imageList: any[];
  rowIndexArray: any[];
  ngOnInit(): void {
    this.servic.imageDetailList.snapshotChanges().subscribe((list) => {
      this.imageList = list.map((item) => {
        return item.payload.val();
      });
      this.rowIndexArray = Array.from(
        Array(Math.ceil(this.imageList.length + 1 / 3)).keys()
      );
    });
  }
}
