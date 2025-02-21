"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteClassesToFile = WriteClassesToFile;
exports.ParseClasses = ParseClasses;
exports.ClassesGHRequest = ClassesGHRequest;
exports.ClassesCacheRequest = ClassesCacheRequest;
const fs_1 = __importDefault(require("fs"));
const ghToken = (JSON.parse(fs_1.default.readFileSync("app.config.json", 'utf8'))).gitHubAccessToken;
const getOctokit = async () => {
    const { Octokit } = await Promise.resolve().then(() => __importStar(require('octokit')));
    return new Octokit();
};
// Your existing code using octokit
function main() {
    // Testing goes here
}
async function ClassesCacheRequest() {
    const path = `../database/classes.json`;
    let cachedClasses = [];
    try {
        const data = await fs_1.default.readFileSync(path, 'utf8');
        console.log(data);
        cachedClasses = JSON.parse(data);
        console.log("Here are your file contents:");
        console.log(cachedClasses);
        return ParseClassNames(cachedClasses);
    }
    catch (err) {
        //console.error('An error occurred while reading the file:', err);
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
async function ClassesGHRequest() {
    const octokit = await getOctokit();
    try {
        let data = (await octokit.request('GET /classrooms', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })).data;
        return ParseClasses(data);
    }
    catch (error) {
        console.log(error);
    }
}
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
        fs_1.default.writeFileSync(path, JSON.stringify(classes));
        console.log('File written successfully.');
    }
    catch (err) {
        console.error('An error occurred while writing the file:', err);
    }
}
