import { Component } from '@angular/core';

@Component({
  selector: 'app-class-choice-view',
  imports: [],
  standalone: true,
  templateUrl: './class-choice-view.component.html',
  styleUrl: './class-choice-view.component.css'
})
export class ClassChoiceViewComponent {
  // Get classrooms
  // For each classroom
    // Get assignments
    // For each assignment
      // Get accepted assignments
      // For each accepted assignment
        // if the username = students.login:
          // Add it to the list of assignments for this student

  // for each assignment in the list:
    // Get the class (IT231 for example)
    // Translate the class to the class name (IT231 -> Web Development)

  // For each class:
    // Get the class name
    // Present as a choice on this page.

  // When a class is clicked:
    // Reroute to the assignments page for that class
    // Show all assignments for that class
    // If user clicks on one they have not accepted, let them know
    // if they click on one they HAVE accepted
        // Reroute to the SHA validation page
        // Then get their SHAs from the repository you put together
}
