import {organization} from "./assignmentsAndClasses.mjs";
import {octokit} from "./classesAndAssignments.mjs";
export {shaGHRequest, generateFeedback};

function titleEncoding(sTitle)
{
    return sTitle.replace(/ /g, "-").toLowerCase();
}


async function shaGHRequest(assignment, username) {
    let data = (await octokit.request(`GET /repos/${organization}/${titleEncoding(assignment)}-${username}/commits`, {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })).data;

    let shas = [];

    for(let i = 0; i < data.length; i++)
    {
        shas.push(data[i].sha);
    }

    return shas;
}

function generateFeedback(validSHAs, shaToCheck)
{
    let valid = validSHAs.includes(shaToCheck);
    return valid? "VCommit ID is Valid for this Assignment" : "ICommit ID is Invalid for this Assignment";
}

