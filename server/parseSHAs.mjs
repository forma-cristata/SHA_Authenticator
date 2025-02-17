export default function ParseSHAs(username, className, assignment, forkedRepositories) {
    let shas = [];

    for(let i = 0; i < forkedRepositories.length; i++) {
        if(forkedRepositories[i].username === username && forkedRepositories[i].className === className && forkedRepositories[i].assignmentName === assignment){
            shas = [...forkedRepositories[i].sHAs];
        }
    }

    console.log(shas);
    return shas;
}
