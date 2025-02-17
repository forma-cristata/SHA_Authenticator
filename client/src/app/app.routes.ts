import { Routes } from '@angular/router';
import { RegistrationViewComponent } from './registration-view/registration-view.component';
import {ClassChoiceViewComponent} from './class-choice-view/class-choice-view.component';
import {AssignmentChoiceViewComponent} from './assignment-choice-view/assignment-choice-view.component';
import {ShaValidationViewComponent} from './sha-validation-view/sha-validation-view.component';
import {ProfileViewComponent} from './profile-view/profile-view.component';
import {LoadingIconComponent} from './loading-icon/loading-icon.component';

export const routes: Routes = [
  {path: '', component: RegistrationViewComponent},
  {path: 'classes', component: ClassChoiceViewComponent},
  {path: 'assignments', component: AssignmentChoiceViewComponent},
  {path: 'sha-validation', component: ShaValidationViewComponent},
  {path: 'profile', component: ProfileViewComponent},
];
