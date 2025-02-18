export default function ParseSHAs(username, className, assignment, forkedRepositories, shaToCheck) {
    let shas = [];
    let wrongAssFeedback = "This assignment belongs to a different assignment: ";
    let shaNotFoundFeedback = "This SHA does not belong to any assignment";
    let validSHAFeedback = "This SHA is valid for this assignment";

    for(let i = 0; i < forkedRepositories.length; i++) {
        if(forkedRepositories[i].username === username && forkedRepositories[i].className === className && forkedRepositories[i].assignmentName === assignment){
            shas = [...forkedRepositories[i].sHAs];
        }
    }

    console.log(shas);


    /*CONDITIONS*/

    // If shaToCheck does not match specific assignment
    if(!shas.includes(shaToCheck))
    {
        let allSHAs = [];
        let allAssignmentNames = [];

        for(let i = 0; i < forkedRepositories.length; i++)
        {
            allSHAs = allSHAs.push(forkedRepositories[i].sHAs);
            allAssignmentNames.push(forkedRepositories[i].assignmentName);
        }
        // If shaToCheck matches any other assignments
        if(allSHAs.includes(shaToCheck))
        {
            // Notify user that shaToCheck belongs to ${this} other assignment
            return `${wrongAssFeedback} ${allAssignmentNames[allSHAs.indexOf(shaToCheck)]}`;
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
        // Notify that the SHA is valid for this assignment
        return validSHAFeedback;
    }
}
