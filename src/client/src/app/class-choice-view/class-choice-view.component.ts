import { Component } from '@angular/core';
import { Octokit } from '@octokit/rest';
import {Repository} from '../repository';

@Component({
  selector: 'app-class-choice-view',
  imports: [],
  standalone: true,
  templateUrl: './class-choice-view.component.html',
  styleUrl: './class-choice-view.component.css'
})
export class ClassChoiceViewComponent {
  public repositories: Repository[] = [];

  public octokit = new Octokit({
    auth: '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'
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
/*
      console.log("Classes Object:", data); // Array of class objects
*/
      this.getClassArray(data);
    } catch (error) {
      console.error(error);
    }
  }

  getClassArray(data: any) {
    let possibleClassesIds = [];
    for (let i = 0; i < data.length; i++) {
      possibleClassesIds.push(data[i].id);
    }
/*
    console.log("Class IDs:", possibleClassesIds.toString());
*/
    for (let i = 0; i < possibleClassesIds.length; i++) {
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
/*
      console.log(`Assignments for class ${classId}`, data); // Array of assignment objects`
*/
      this.getAssignmentsArray(data);
    }
    catch (error)
    {
      console.error(error);
    }
  }

  getAssignmentsArray(data: any) {
    let assignmentIds = [];
    for (let i = 0; i < data.length; i++) {
      assignmentIds.push(data[i].id);
    }
/*
    console.log("Assignment IDs", assignmentIds.toString());
*/
    for (let i = 0; i < assignmentIds.length; i++) {
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
/*
      console.log(`Array of accepted assignment objects for assignment ${assignmentId}:`, data); // Array of accepted assignment objects
*/
      for (let i = 0; i < data.length; i++) { // TODO get username from stored input from prior class and input here where it says "forma-cristata"
        if (data[i].students[0].login == "kcraycraft45") {
          this.craftRepositoryObject(data[i]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async craftRepositoryObject(data: any) {
    let repoName = data.repository.full_name.toString();
    let shaArray = await this.getSHAArrayPerAssignment(repoName);
    let object: Repository = {
      repositoryName: repoName,
      username: data.students[0].login.toString(),
      assignmentId: data.assignment.id,
      assignmentName: data.assignment.title.toString(),
      classId: data.assignment.classroom.id,
      className: data.assignment.classroom.name,
      sHAs: shaArray
    };
    this.repositories.push(object);
    console.log(this.repositories);
  }

  async getSHAArrayPerAssignment(repo: any): Promise<string[]> {
    let data;
    try {
      let response = await this.octokit.request(`GET /repos/${repo}/commits`, {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        }
      });
      data = response.data;
      let shaArray = [];
      for (let i = 0; i < data.length; i++) {
        shaArray.push(data[i].sha.toString());
      }
      return shaArray;
    }
    catch (error) {
      console.error(error);
      return [];
    }
  }
}
