import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedReservationsService {
  private datadata = new BehaviorSubject([]);
  sharedMessage = this.datadata.asObservable();

  constructor() { }

  updateData(list: any) {
    this.datadata.next(list);
  }
}
