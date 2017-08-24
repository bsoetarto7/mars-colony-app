import { Component, OnInit } from '@angular/core';
import { AlienService } from '../../services/alien';
import { Alien } from '../../models/alien';
import { EncounterService } from '../../services/encounters';
import { ColonistService } from '../../services/colonist';
import { NewReport } from '../../models/report';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers:[AlienService,EncounterService]
})
export class ReportComponent implements OnInit {

  aliens:Alien[];

  public reportForm = new FormGroup({
    alienAction: new FormControl('',[Validators.required, Validators.maxLength(140), Validators.minLength(2)]),
    alien_type: new FormControl('',[Validators.required])
  });

  constructor(
    private alienService: AlienService, 
    private encounterService: EncounterService, 
    private colonistService:ColonistService,
    private router:Router) {
    }

  async ngOnInit() {
    
    this.aliens = await this.alienService.getAliens();
  }

  async registeringReport(){
    const today = new Date();
    let dd = today.getDate().toString();
    let mm = String(today.getMonth()+1); 
    if( parseInt(dd) < 10 ){
        dd = '0' + dd;
    } 
    if( parseInt(mm) < 10 ){
        mm = '0' + mm;
    } 
    var yyyy = today.getFullYear();
    
    const newReport: NewReport = {
      atype : this.reportForm.get('alien_type').value.toString(),
      date : `${yyyy}-${mm}-${dd}`,
      action : this.reportForm.get('alienAction').value.toString(),
      colonist_id : this.colonistService.getRegisteredColonist().job.id.toString()
    }
    const report = await this.encounterService.newEncounters(newReport);
    this.router.navigate(['encounters']);
  }

}
