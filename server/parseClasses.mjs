export default function ParseClasses(username, forkedRepositories) {
    let classes = [];
    for(let i = 0; i < forkedRepositories.length; i++){
        if(forkedRepositories[i].username === username)
        {
            classes.push(forkedRepositories[i].className);
        }

    }
    return classes;
}

