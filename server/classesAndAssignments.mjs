import {Octokit} from "octokit";
import fs from "fs";
export {WriteClassesToFile, ParseClasses, ClassesGHRequest, ClassesCacheRequest, octokit};

const ghToken = JSON.parse(fs.readFileSync('../app.config.json', 'utf8')).gitHubAccessToken;
const octokit = new Octokit({
    auth: ghToken
});

function ParseClasses(data) {
    let classes = [];
    let classNames = [];
    for (let i = 0; i < data.length; i++) {
        classNames.push(data[i].name);
        classes.push(data[i].name);
        classes.push(data[i].id.toString());
    }
    WriteClassesToFile(classes);
    return classNames;
}

function WriteClassesToFile(classes) {
    const path = `../database/classes.json`;
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

async function ClassesCacheRequest() {
    const path = `../database/classes.json`;
    let cachedClasses = [];
    try {
        const data = await fs.readFileSync(path, 'utf8');
        cachedClasses = JSON.parse(data);
        return ParseClassNames(cachedClasses);
    } catch (err) {
        return await ClassesGHRequest();
    }
}

function ParseClassNames(data) {
    let cNames = [];
    for (let i = 0; i < data.length; i = i + 2) {
        cNames.push(data[i]);
    }
    return cNames;
}