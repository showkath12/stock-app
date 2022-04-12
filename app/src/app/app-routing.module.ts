import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashoardComponent } from './dashoard/dashoard.component';
import { SentimentDetailsComponent } from './sentiment-details/sentiment-details.component';

const routes: Routes = [
  {
    path:'',
    component: DashoardComponent
  },
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
