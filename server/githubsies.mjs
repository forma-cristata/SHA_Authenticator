import {Octokit} from "octokit";
export {getClasses};

const octokit = new Octokit({
    auth: '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'
});

/*TODO *****360***** CALLS FOR EVERY CALL IS ____---HORRIFYING---____. THERE'S GOT TO BE A WAY TO LIMIT THIS
*  60 m * 60 s * 1000 ms = 3600000 ms
*  5000 call-limit / 360 poll-interval = 13 calls / hour
*  3600000 ms / 13 calls = 276,923 ms between calls = 4.6 minutes // need to notify user of discrepancy in instructions
*
*
* */


let repositories = [];

async function getClasses() {
    try {
        let data = (await octokit.request('GET /classrooms', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })).data;

        /*console.log(data);*/
        let possibleClassIds = [];
        // TODO This logic may be flawed 02/18 - 10:16 pm
        for (let i = 0; i < data.length && !possibleClassIds.includes(data[i].id); i++) {
            possibleClassIds.push(data[i].id);
        }

        // TODO 3 x...return
        for (let i = 0; i < possibleClassIds.length; i++) {
            await getAssignments(possibleClassIds[i]);
        }
        return repositories;

    } catch (error) {
        console.log(error);
    }
}
// Server2 needs to be hosted and simply running the poll on the file
// Server1 can make NO CALLS TO GITHUB
// Total 5000 / hour
// 20 students
// 3 max classes
// 6 max assignments
// 1 max sha array

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
        //TODO 1 x return ... then returns
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
    // TODO 6 x ... return => then, returns
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
*/      // TODO 1 x return ... then returns
        for(let i = 0; i < data.length; i++) {
                await craftRepositoryObject(data[i]);
            }



    } catch (error) {
        console.log(error);
    }
}


async function craftRepositoryObject(data) {
    let repoName = data.repository.full_name.toString(); // githubsies.mjs:108......TODO optimization would occur here.
    // TODO we can craft the repo_name based on other things, limiting the number of calls to github
    // Then when user requests, we craft only their repository objects.
    // Classes and assignments can be polled very infrequently. These will not change fast enough to warrant constant updates
    // SHAs can be polled every 5 minutes without fucking up everything. This requires testing though.
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