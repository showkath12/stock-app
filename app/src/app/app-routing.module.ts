import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SentimentDetailsComponent } from './sentiment-details/sentiment-details.component';

const routes: Routes = [
  {
    path:'sentiment/:symbol',
    component: SentimentDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
