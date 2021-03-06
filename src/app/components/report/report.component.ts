import { Component, OnInit } from '@angular/core';
import { AlienService } from '../../services/alien';
import { Alien } from '../../models/alien';
import { EncounterService } from '../../services/encounters';
import { ColonistService } from '../../services/colonist';
import { NewReport } from '../../models/report';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageTest } from '../../test/localstoragetest';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers:[AlienService,EncounterService]
})
export class ReportComponent implements OnInit {

  aliens:Alien[];
  showLoading = false;

  public reportForm = new FormGroup({
    alienAction: new FormControl('',[Validators.required, Validators.maxLength(140), Validators.minLength(2)]),
    alien_type: new FormControl('',[Validators.required])
  });

  constructor(
    private alienService: AlienService, 
    private encounterService: EncounterService, 
    private colonistService:ColonistService,
    private router:Router,
    private localStorageTest:LocalStorageTest) {
    }

  async ngOnInit() {
    this.aliens = await this.alienService.getAliens();
  }

  async registeringReport(){
    this.showLoading = true;
    const today = new Date();
    let dd = today.getDate().toString();
    let mm = String(today.getMonth()+1); 
    if( parseInt(dd) < 10 ){
        dd = '0' + dd;
    } 
    if( parseInt(mm) < 10 ){
        mm = '0' + mm;
    } 
    let yyyy = today.getFullYear();
    
    const colonist_id = this.localStorageTest.available() ? window.localStorage.getItem('colonist_id') : this.colonistService.getRegisteredColonist().id.toString();
    
    const newReport: NewReport = {
      atype : this.reportForm.get('alien_type').value.toString(),
      date : `${yyyy}-${mm}-${dd}`,
      action : this.reportForm.get('alienAction').value.toString(),
      colonist_id : colonist_id
    }
    const report = await this.encounterService.newEncounters(newReport);
    this.showLoading = false;
    this.router.navigate(['encounters']);
  }

}
