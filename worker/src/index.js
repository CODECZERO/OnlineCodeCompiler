import { createClient } from "redis";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { exec } from "child_process";


const Configs = {
    python: {
        extension: '.py',
        command: 'python'
    },
    node: {
        extension: '.js',
        command: 'node'
    },
    c: {
        extension: '.c',
        command: 'gcc',
        execute: './a.out'
    },
    cpp: {
        extension: '.cpp',
        command: 'g++',
        execute: './a.out'
    }
};

const StartServer = async () => {
    const client = createClient();
    client.on('error', err => console.log(`Error connecting to Redis: ${err}`));
    await client.connect();
    console.log('Connected to Redis');


    while (true) {
        try {

            const data = await client.brPop("submission", 0);
            const { jobID, userID, language, code } = JSON.parse(data.element);


            if (!language || !code) {
                await client.publish('codeResult', JSON.stringify({
                    jobID,
                    userID,
                    error: "Language or code is not provided"
                }));
                continue;
            }

            const config = Configs[language];
            if (!config) {
                await client.publish('codeResult', JSON.stringify({
                    jobID,
                    userID,
                    error: "Unsupported language"
                }));
                continue;
            }

            const filename = uuidv4() + config.extension;
            const filePath = path.join('./public', filename);

            fs.writeFileSync(filePath, code);


            const compileCommand = config.execute ? `${config.command} ${filePath}` : `${config.command} ${filePath}`;
            exec(compileCommand, (compileError, stdout, stderr) => {
                if (compileError || stderr) {
                    client.publish('codeResult', JSON.stringify({
                        jobID,
                        userID,
                        error: compileError ? compileError.message : stderr
                    }));

                    fs.unlinkSync(filePath); // Clean up file
                    return;
                }

                if (config.execute) {
                    exec(config.execute, (runError, runStdout, runStderr) => {
                        client.publish('codeResult', JSON.stringify({
                            jobID,
                            userID,
                            output: runError ? runStderr : runStdout,
                            error: runError ? runError.message : null
                        }));
                        fs.unlinkSync(filePath); // Clean up file
                    });
                } else {
                    client.publish('codeResult', JSON.stringify({
                        jobID,
                        userID,
                        output: stdout,
                        error: null
                    }));
                    fs.unlinkSync(filePath); // Clean up file
                }
            });
        } catch (error) {
            console.error(`Unexpected error: ${error.message}`);
        }
    }
};

StartServer();