import { Component, OnInit } from '@angular/core';
import { AlienService } from '../../services/alien';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styles: [],
  providers:[AlienService]
})
export class EncountersComponent implements OnInit {

  constructor(alienService: AlienService) { }

  ngOnInit() {
  }

}
