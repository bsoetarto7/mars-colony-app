import { Component, OnInit } from '@angular/core';
import { EncounterService } from '../../services/encounters';
import { Report } from '../../models/report';


@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.scss'],
  providers:[EncounterService]
})
export class EncountersComponent implements OnInit {
  
  encounters: Report[];
  showLoading = false;

  constructor(private encounterService: EncounterService) { }

  async ngOnInit() {
    console.log(this.encounters);
    this.showLoading = true;
    this.encounters = await this.encounterService.getEncounters();
    console.log(this.encounters);
    this.showLoading = false;
  }

}
