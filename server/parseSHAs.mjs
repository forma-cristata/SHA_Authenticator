export default function ParseSHAs(username, className, assignment, forkedRepositories, shaToCheck) {
    let shas = [];


    let wrongAssFeedback = "ISHA belongs to ";
    let shaNotFoundFeedback = "ISHA not found";
    let validSHAFeedback = "VCommit ID is valid";
    let validButNotFirstSHAFeedback = "VNote • SHA is not the most recent commit";

    for(let i = 0; i < forkedRepositories.length; i++) {
        if(forkedRepositories[i].username === username && forkedRepositories[i].className === className && forkedRepositories[i].assignmentName === assignment){
            shas = [...forkedRepositories[i].sHAs];
        }
    }

    console.log(forkedRepositories);

    let allSHAs = [];
    let allAssignmentNames = [];
    for(let i = 0; i < forkedRepositories.length; i++)
    {
        if(forkedRepositories[i].username === username)
        {
            allSHAs = allSHAs.concat(forkedRepositories[i].sHAs);
            for(let j = 0; j < forkedRepositories[i].sHAs.length; j++)
            {
                allAssignmentNames.push(forkedRepositories[i].assignmentName);
            }
        }
    }

    /*CONDITIONS*/


    // If shaToCheck does not match specific assignment
    if(!shas.includes(shaToCheck))
    {


        console.log(allSHAs.join(' | '));
        console.log(allAssignmentNames.join(' | '));

        // If shaToCheck matches any other assignments
        if(allSHAs.includes(shaToCheck))
        {
            // Notify user that shaToCheck belongs to ${this} other assignment
            return `${wrongAssFeedback} ${className} • ${allAssignmentNames[allSHAs.indexOf(shaToCheck)]}`;
        }
        // If shaToCheck does not match any other assignments
        else
        {
            // Notify user that shaToCheck does not belong to any assignment
            return shaNotFoundFeedback;
        }
    }
    // If shaToCheck matches assignment in question
    else
    {
        console.log(`allSHAs: ${allSHAs.join("   ")}`);
        let thisAssignmentSHAs = []
        for(let x = 0; x < allSHAs.length; x++)
        {
            if(allAssignmentNames[x] === assignment)
            {
                thisAssignmentSHAs.push(allSHAs[x]);
            }
        }
        console.log(thisAssignmentSHAs.join(' | '));

        // Notify that the SHA is valid for this assignment but not the most recent commit
        if(shaToCheck !== thisAssignmentSHAs[0])
        {
            return validButNotFirstSHAFeedback;
        }
        // Notify that the SHA is valid for this assignment
        return validSHAFeedback;
    }
}
