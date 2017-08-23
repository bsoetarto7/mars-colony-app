import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job';
import { ColonistService } from '../../services/colonist';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [JobService, ColonistService]
})
export class RegisterComponent implements OnInit {
  
  public jobs:any[];
  
  public registerForm = new FormGroup({
    fullName: new FormControl(),
    age: new FormControl()
  });

  constructor(private jobService:JobService, private colonistService: ColonistService) { }

  async ngOnInit() {
    this.jobs = await this.jobService.getJobs();

    const fakeColonist = {
      name: 'Hello there',
      age: '25',
      job_id: '2'
    };
    const newColonist = await this.colonistService.registerColonist(fakeColonist);
  }

}
