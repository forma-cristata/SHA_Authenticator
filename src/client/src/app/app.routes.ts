import { Routes } from '@angular/router';
import { RegistrationViewComponent } from './registration-view/registration-view.component';
import {ClassChoiceViewComponent} from './class-choice-view/class-choice-view.component';

export const routes: Routes = [
  {path: '', component: RegistrationViewComponent},
  {path: 'classes', component: ClassChoiceViewComponent}
];
