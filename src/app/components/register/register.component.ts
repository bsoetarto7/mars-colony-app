import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job';
import { Job } from '../../models/job';
import { ColonistService } from '../../services/colonist';
import { NewColonist } from '../../models/colonist';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [JobService]
})
export class RegisterComponent implements OnInit {
  
  jobs:Job[];
  showLoading = false;
  
  public registerForm = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.maxLength(100), Validators.minLength(2), this.noNumbers(/\d/)]),
    age: new FormControl('',[Validators.required, Validators.max(100), Validators.min(0)]),
    job_id: new FormControl('',[Validators.required])
  });

  constructor(private jobService:JobService, private colonistService: ColonistService, private router : Router) { }

  async ngOnInit() {
    this.jobs = await this.jobService.getJobs();
  }

  private noNumbers(validNameRegex): ValidatorFn{
    return (control):{ [key : string] : any } => {
      const forbiddenName = validNameRegex.test(control.value);
      return forbiddenName ? { 'ForbiddenName': { value: control.value }} : null;
    }
  }

  async registerColonist(){
    // const newColonist = await this.colonistService.registerColonist(this.registerForm.value);
    this.showLoading = true;
    const newColonist: NewColonist = {
      name: this.registerForm.get('name').value,
      age: this.registerForm.get('age').value,
      job_id: this.registerForm.get('job_id').value
    }
    const colonist = await this.colonistService.registerColonist(newColonist);
    this.showLoading = false;
    this.router.navigate(['encounters']);
  }

}
