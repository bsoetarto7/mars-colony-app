import { Routes } from '@angular/router';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { ReportComponent } from './components/report/report.component';
import { RegisterComponent } from './components/register/register.component';
import { EncountersComponent } from './components/encounters/encounters.component';
import { BlogComponent } from './components/blog/blog.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CanActivateViaAuthGuard } from './guard/authguard';

export const AppRoutes: Routes = [
  { path: '', component: WelcomeComponent, data : { state:'welcome' } },
  { path: 'register', component: RegisterComponent, data : { state:'register' } },
  { path: 'encounters', component: EncountersComponent, canActivate: [CanActivateViaAuthGuard], data : { state:'encounters' } },
  { path: 'report', component: ReportComponent, canActivate: [CanActivateViaAuthGuard], data : { state:'report' } },
  { path: 'blog', component: BlogComponent, data : { state:'blog' } },
  { path: '**', component: NotfoundComponent, data : { state:'notfound' } }
]