import { Routes } from '@angular/router';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { ReportComponent } from './components/report/report.component';
import { RegisterComponent } from './components/register/register.component';
import { EncountersComponent } from './components/encounters/encounters.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ColonistService } from './services/colonist';

export const AppRoutes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'encounters', component: EncountersComponent, canActivate: [ColonistService]},
  { path: 'report', component: ReportComponent, canActivate: [ColonistService]},
  { path: '**', component: NotfoundComponent, canActivate: [ColonistService]}
]