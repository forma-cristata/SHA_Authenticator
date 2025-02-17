import {Octokit} from "octokit";
export {getClasses};

const octokit = new Octokit({
    auth: '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'
});

let repositories = [];

async function getClasses() {
    try {
        let data = (await octokit.request('GET /classrooms', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })).data;

        /*console.log(data);*/
        repositories = [];


        await getClassArray(data);

        return repositories;

    } catch (error) {
        console.log(error);
    }
}

async function getClassArray(data) {
    let possibleClassIds = [];
    for (let i = 0; i < data.length; i++) {
        possibleClassIds.push(data[i].id);
    }

    for (let i = 0; i < possibleClassIds.length; i++) {
        await getAssignments(possibleClassIds[i]);
    }
}

async function getAssignments(classId) {
    try {
        let data = (await octokit.request(`GET /classrooms/${classId}/assignments`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })).data;

/*
        console.log(data);
*/

        await getAssignmentArray(data);

    } catch (error) {
        console.log(error);
    }
}

async function getAssignmentArray(data) {
    let possibleAssignmentIds = [];
    for (let i = 0; i < data.length; i++) {
        possibleAssignmentIds.push(data[i].id);
    }

    for (let i = 0; i < possibleAssignmentIds.length; i++) {
        await getAcceptedAssignment(possibleAssignmentIds[i]);
    }


}

async function getAcceptedAssignment(assignmentId) {
    try {
        let data = (await octokit.request(`GET /assignments/${assignmentId}/accepted_assignments`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })).data;

/*
        console.log(data);
*/
        for(let i = 0; i < data.length; i++) {
                await craftRepositoryObject(data[i]);
            }



    } catch (error) {
        console.log(error);
    }
}


async function craftRepositoryObject(data) {
    let repoName = data.repository.full_name.toString();
    let shaArray = await getSHAArrayPerAssignment(repoName);
    let object = {
        repositoryName: repoName,
        username: data.students[0].login.toString(),
        assignmentId: data.assignment.id,
        assignmentName: data.assignment.title.toString(),
        classId: data.assignment.classroom_id,
        className: data.assignment.classroom.name,
        sHAs: shaArray
    }

    repositories.push(object);

/*
    console.log(repositories);
*/

}


async function getSHAArrayPerAssignment(repoName) {
    try {
        let data = (await octokit.request(`GET /repos/${repoName}/commits`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })).data;

        let sHAArray = [];
        for (let i = 0; i < data.length; i++){
            sHAArray.push(data[i].sha.toString());
        }

        return sHAArray;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}