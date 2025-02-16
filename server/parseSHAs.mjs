export default function ParseSHAs(repoName, forkedRepositories) {
    let shas = [];

    for(let i = 0; i < forkedRepositories.length; i++) {
        if(forkedRepositories[i].repositoryName === repoName){
            shas.push(forkedRepositories[i].sHAs);
        }
    }
    return shas;
}
