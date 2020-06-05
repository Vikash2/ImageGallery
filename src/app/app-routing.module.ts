import { ImageComponent } from './images/image/image.component';
import { ImagesComponent } from './images/images.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImagesListComponent } from './images/images-list/images-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'image/upload', pathMatch: 'full' },
  {
    path: 'image',
    component: ImagesComponent,
    children: [
      { path: 'upload', component: ImageComponent },
      { path: 'list', component: ImagesListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
