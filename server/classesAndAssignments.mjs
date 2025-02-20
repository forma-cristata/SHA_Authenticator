import {Octokit} from "octokit";
import fs from "fs";
export {ParseClasses, ClassesGHRequest, ClassesCacheRequest, octokit};

const octokit = new Octokit({
    auth: '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'
});

function ParseClasses(data) {
    let classes = [];
    let classNames = [];
    for(let i = 0; i < data.length; i++)
    {
        classNames.push(data[i].name);

        classes.push(data[i].name);
        classes.push(data[i].id.toString());
    }
    WriteClassesToFile(classes);

    return classNames;
}

function WriteClassesToFile(classes){
    const path = `./classes.json`;

    try {
        fs.writeFileSync(path, JSON.stringify(classes));
        console.log('File written successfully.');
    } catch (err) {
        console.error('An error occurred while writing the file:', err);
    }
}






async function ClassesGHRequest() {
    try {
        let data = (await octokit.request('GET /classrooms', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })).data;
        return ParseClasses(data);

    } catch (error) {
        console.log(error);
    }
}

async function ClassesCacheRequest()
{
    const path = `./classes.json`;
    let cachedClasses = [];

    try {
        const data = await fs.readFileSync(path, 'utf8');
        console.log(data);

        cachedClasses = JSON.parse(data);

        console.log("Here are your file contents:");
        console.log(cachedClasses)

        return ParseClassNames(cachedClasses);
    } catch (err) {
        //console.error('An error occurred while reading the file:', err);

        return await ClassesGHRequest();
    }
}

function ParseClassNames(data){
    let cNames = [];
    for(let i = 0; i < data.length; i = i+2)
    {
        cNames.push(data[i]);
    }
    return cNames;
}
// SERVER 1 MAKES CALLS IF SERVER 2 HASN'T POLLED
// SERVER 2 POLLS CLASSES AND ASSIGNMENTS ONCE A DAY AT 12:01 AM


