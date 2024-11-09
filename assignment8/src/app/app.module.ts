import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusinessSearchComponent } from './business-search/business-search.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BookingsComponent } from './bookings/bookings.component';
import { routingComponents } from './app-routing.module';
import { ShowBusinessesComponent } from './show-businesses/show-businesses.component';

@NgModule({
  declarations: [
    AppComponent,
    BusinessSearchComponent,
    NavbarComponent,
    BookingsComponent,
    routingComponents,
    ShowBusinessesComponent,
  ],
  imports: [
    MatAutocompleteModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    GoogleMapsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
