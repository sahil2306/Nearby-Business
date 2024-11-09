import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessSearchComponent } from './business-search/business-search.component';
import { BookingsComponent } from './bookings/bookings.component';

const routes: Routes = [
  { path: '', redirectTo:'/search', pathMatch:'full' },
  { path: 'search', component: BusinessSearchComponent},
  { path: 'bookings', component: BookingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [BusinessSearchComponent, BookingsComponent]
