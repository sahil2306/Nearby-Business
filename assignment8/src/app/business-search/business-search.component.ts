import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { SearchBusinessService } from '../search-business.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SharedReservationsService } from '../shared-reservations.service';

@Component({
  selector: 'app-business-search',
  templateUrl: './business-search.component.html',
  styleUrls: ['./business-search.component.css'],
  providers: [NgbCarouselConfig, NgbModal]
})
export class BusinessSearchComponent implements OnInit{

  businesses:any[]=[];
  details:any={};
  reviews:any[]=[];
  termList:any[]=[];
  complete=new FormControl();
  detect = false;
  f=new NgForm([],[]);
  isLoading = false;
  tableShow=false;
  cardShow=false;
  showModal: boolean=false;
  mapOptions:any;
  marker:any;
  showNavigationArrows:boolean = true;
  showNavigationIndicators = false;
  closeResult: string="";
  myReservations:any[]=[];
  content:any;
  checked:any;
  validEmail:boolean=false;

  email:any;
  emailTest:any;
  date:{} = {year:Number, month:Number}
  currdate:any = new Date();
  currhour = ''
  currsecond = ''
  bid:string='';
  noValue:boolean=false;

  constructor(private service:SearchBusinessService, config: NgbCarouselConfig, private sendReservations: SharedReservationsService) {
    config.interval = 1000;
		config.pauseOnHover = false;
    this.showNavigationArrows = true;
    this.showNavigationIndicators = false;
  }

  ngOnInit() {

    if(localStorage.getItem('reservations')!=undefined){
      const a = localStorage.getItem('reservations');
      let temp = JSON.parse(a || '[]');
      this.myReservations = temp;
    }

    //this.sendReservations.sharedMessage.subscribe(message => this.myReservations = message);
    this.f.resetForm();

    var lat:Number=0.0;
    var lon:Number=0.0;

    this.service.IPInfo().subscribe((data) => {
      lat = parseFloat(data['loc'].split(',')[0]);
      lon = parseFloat(data['loc'].split(',')[1]);
    });

    this.complete.valueChanges.subscribe(inp=>{
        // this.isLoading = true;
        this.completeInput(inp,lat,lon);
        //this.isLoading = false;
    });
  }

  searchForm(form: NgForm){
    // if (form.invalid) {
    //   return;
    // }
    console.log("Form --- ",form.value);
    //TODO : Call IP API, Google API to get lat and lon

    var lat:Number=0.0;
    var lon:Number=0.0;

    if(this.checked==true){
      this.service.IPInfo().subscribe((data) => {
        lat = parseFloat(data['loc'].split(',')[0]);
        lon = parseFloat(data['loc'].split(',')[1]);
        console.log(" Auto: ----",lat,lon);
        this.getData(this.complete.getRawValue(),form.value.distance,form.value.category,lat,lon);
      });

    }
    else{
      this.service.getGoogleAPI(form.value.location).subscribe((data) => {
        console.log(" Manual: ----",data);
        if(data['status']=="OK"){
          lat = data['results'][0]['geometry']['location']['lat'];
          lon = data['results'][0]['geometry']['location']['lng'];
          this.getData(this.complete.getRawValue(),form.value.distance,form.value.category,lat,lon);
        }
        else{
          this.noValue=true;
        }
      });

    }
    this.f = form;
    this.cardShow=false;
    this.tableShow=true;
  }

  public completeInput(word:string, lat:Number, lon:Number){

    if(word.length>2){
      this.isLoading = true;
      this.service.getAutocompleteFromAPI(word,lat,lon).subscribe((data) => {
          // console.log("Autocomplete --- ",data);
          this.termList=data;
          // console.log("TermList --- ",this.termList);
          this.isLoading = false;
        });
    }
    else{
      this.termList=[];
    }
  }

  public isPopulated(){
    return Object.keys(this.businesses).length>0;
  }

  public isChecked(){
    if(this.checked==true){
      (<HTMLInputElement> document.getElementById("loc")).disabled=true;
      (<HTMLInputElement> document.getElementById("loc")).value="";
    }
    else{
      (<HTMLInputElement> document.getElementById("loc")).disabled=false;
    }
  }

  public clear(){
    this.businesses=[];
    this.details=[];
    this.termList=[];
    this.complete.setValue('');
    this.detect = false;
    this.f.resetForm();
  }

  public back(){
    console.log("Back");
    this.tableShow=true;
    this.cardShow=false;
    this.details=[];
  }

  public businessDetails(event:any, id:string){
    console.log("Business ID --- ",id);
    this.bid = id;
    this.service.getBusinessDetails(id).subscribe((data) => {
        console.log("Business Details --- ",data);
        this.details = data;

        this.mapOptions = this.showMap(this.details['lat'],this.details['lon']);

        this.service.getReviews(id).subscribe((data) => {
          this.reviews = data;
        });

        this.cardShow=true;
        this.tableShow=false;
    });
  }

  public reserve(){

    // var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    // form.classList.add('was-validated');

    var curr:any = {};

    curr.email = this.email;
    curr.businessName = this.details.name;
    curr.date = this.currdate;
    curr.time = this.currhour +':'+  this.currsecond;
    curr.id=this.bid;

    //console.log(curr);
    //this.myReservations.push(curr);

    if(localStorage.getItem('reservations')!=undefined){
      const a = localStorage.getItem('reservations');
      let temp = JSON.parse(a || '[]');
      temp.push(curr);
      this.myReservations = temp;
      localStorage.setItem('reservations', JSON.stringify(temp));
      console.log("Reservations --- ",a);
    }
    else{
      let temp = [];
      temp.push(curr);
      this.myReservations = temp;
      localStorage.setItem('reservations', JSON.stringify(temp));
    }

    //this.sendReservations.updateData(this.myReservations);
    alert("Reservation created!");
  }

  public cancel(){
    // this.myReservations = this.myReservations.filter((item) => item.id !== this.bid);
    // this.sendReservations.updateData(this.myReservations);

    if(localStorage.getItem('reservations')!=undefined){
      const a = localStorage.getItem('reservations');
      let temp = JSON.parse(a || '[]');
      temp = temp.filter((item:any) => item.id !== this.bid);
      this.myReservations = temp;
      localStorage.setItem('reservations', JSON.stringify(temp));
      // console.log("Reservations --- ",a);
    }

  }

  detStatus(){
    return this.details.Status=="true";
  }

  public isAlreadyReserved(){
    for(var i=0;i<this.myReservations.length;i++){
      if(this.myReservations[i].id==this.bid){
        return true;
      }
    }
    return false;
  }

  public isNotAlreadyReserved(){
    return !(this.isAlreadyReserved());
  }

  public isDetailsPopulated(){
    return Object.keys(this.details).length>0;
  }
  public isReviewsPopulated(){
    return Object.keys(this.reviews).length>0;
  }

  public showMap(lats:number,lons:number){
    console.log("Show Map");
    var mapOptions: google.maps.MapOptions = {
      center: {lat: lats, lng: lons},
      zoom: 15
    };
    this.marker = {
      position: {lat: lats, lng: lons},
    }
    return mapOptions;
  }

  private getData(keyword:string,distance:string,category:string,lat:Number,lon:Number){
    console.log("Get Data --- ",keyword,distance,category,lat,lon);
    this.service.getSearchBusinesses(keyword,distance,category,lat,lon).subscribe((data) => {
      this.businesses = data;
      // TODO : Check if businesses is empty
      if(data['total']==0){
        //alert("No businesses found");
        this.noValue=true;
      }
      else{
        this.noValue=false;
      }
      console.log("Businesses --- ",data['businesses']);
      this.businesses = data['businesses'];

      this.businesses.forEach(ele => {
        ele['distance'] = (ele['distance']/1609.344).toFixed(2);
      });

    });
  }

  public isNoValue(){
    return this.noValue;
  }

  public validateEmail(email:any) {
    if(email!=''){
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      console.log(re.test(String(email).toLowerCase()))
      this.emailTest = re.test(String(email).toLowerCase())
      if (this.emailTest != true) {
        this.validEmail=true;
      }
      else {
        this.validEmail=false;
      }
    }
  }

  public isValidEmail(){
    return this.validEmail;
  }

}
