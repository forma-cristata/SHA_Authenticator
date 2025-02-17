export default function ParseAssignmentsInGivenClass(username, chosenClass, forkedRepositories) {
    let assignments = [];
    for(let i = 0; i < forkedRepositories.length; i++){
        if(forkedRepositories[i].className === chosenClass && forkedRepositories[i].username === username){
            assignments.push(forkedRepositories[i].assignmentName);
        }
    }
    console.log(assignments);
    return assignments;

}