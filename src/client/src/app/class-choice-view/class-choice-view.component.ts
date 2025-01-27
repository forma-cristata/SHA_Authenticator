import { Component } from '@angular/core';
import { Octokit } from '@octokit/rest';

@Component({
  selector: 'app-class-choice-view',
  imports: [],
  standalone: true,
  templateUrl: './class-choice-view.component.html',
  styleUrl: './class-choice-view.component.css'
})
export class ClassChoiceViewComponent {

  public octokit = new Octokit({
    auth: ''
  });

  async ngOnInit() {
    // GET CLASSES //
    let data;
    try {
      let response = await this.octokit.request('GET /classrooms', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        }
      });
      data = response.data;
      console.log("Classes Object:", data); // Array of class objects
      this.getClassArray(data);
    } catch (error) {
      console.error(error);
    }


  }

  getClassArray(data : any) {
    let possibleClassesIds = [];
    let possibleClassesNames = []
    for(let i = 0; i < data.length; i++) {
      possibleClassesIds.push(data[i].id);
      possibleClassesNames.push(data[i].name);
    }

    console.log("Class IDs:",possibleClassesIds.toString());
    console.log("Class Names:",possibleClassesNames.toString());
    for(let i = 0; i < possibleClassesIds.length; i++) {
      this.getAssignments(possibleClassesIds[i]);
    }
  }

  async getAssignments(classId: any) {
    let data;
    try {
      let response = await this.octokit.request(`GET /classrooms/${classId}/assignments`, {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        }
      });
      data = response.data;
      console.log(`Assignments for class ${classId}`, data); // Array of assignment objects`
      this.getAssignmentsArray(data);
    } catch (error) {
      console.error(error);
    }
  }

  getAssignmentsArray(data: any){

    let assignmentIds = [];
    let assignmentNames = [];
    for(let i = 0; i < data.length; i++) {
      assignmentIds.push(data[i].id);
      assignmentNames.push(data[i].name);
    }

    console.log("Assignment IDs", assignmentIds.toString());
    console.log("Assignment Names", assignmentNames.toString());
    for(let i = 0; i < assignmentIds.length; i++) {
      this.getAcceptedAssignments(assignmentIds[i]);
    }
  }

  async getAcceptedAssignments(assignmentId: any) {
    let data;
    try {
      let response = await this.octokit.request(`GET /assignments/${assignmentId}/accepted_assignments`, {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        }
      });
      data = response.data;
      console.log(`Array of accepted assignment objects for assignment ${assignmentId}:`, data); // Array of accepted assignment objects
      this.finalInformation(data);
    } catch (error) {
      console.error(error);
    }
  }

  finalInformation(data: any) {
    for (let i = 0; i < data.length; i++) {
      console.log(`Accepted Assignment Username: ${data[i].students[0].login}`); // TODO may be multiple students
      console.log(`Accepted Assignment Repository Name: ${data[i].repository.full_name}`)
      this.getSHAArrayPerAssignment(data[i].repository.full_name)
      // TODO: from this point, create an array of objects for every accepted assignment that is accepted by the saved username.
    }
  }

  async getSHAArrayPerAssignment(repo: any) {
    let data;
    try {
      let response = await this.octokit.request(`GET /repos/${repo}/commits`, {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        }
      });
      data = response.data;
      console.log(`Array of SHAs for ${repo}:`, data); // Array of accepted assignment objects
    } catch (error) {
      console.error(error);
    }
  }

  // Student inputs their username

  // Get classrooms from github rest api
  // For each classroom
    // Get assignments from github rest api
    // For each assignment
      // Get accepted assignments from github rest api
      // For each accepted assignment
        // if the username = students.login:
          // Add it to the list of assignments for this student on the server

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
            // Student inputs SHA
            // Then get their SHAs from the repository you put together and validate from github rest api
}
