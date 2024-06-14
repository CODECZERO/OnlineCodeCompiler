import { createClient } from "redis";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { exec } from "child_process";
import { error } from "console";
import {config} from "dotenv";
config()

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

const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const REDIS_PORT = process.env.REDIS_PORT || 6379;


const StartServer = async () => {
    const client = createClient({ url: `redis://${REDIS_HOST}:${REDIS_PORT}` }).on('error', err => console.log(`Error connecting to Redis: ${err}`));;
    await client.connect();
    console.log('Connected to Redis');


    while (true) {
        try {

            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });

            const data = await client.brPop("submission", 0);
            const { jobID, userID, language, code } = JSON.parse(data.element);


            if (!language || !code) {
                await client.publish(`${process.env.PUBNAME || 'response_'}`, JSON.stringify({
                    jobID,
                    userID,
                    error: 'Language or code is not provided'
                }));
                continue;
            }

            const config = Configs[language];
            if (!config) {
                await client.publish(`${process.env.PUBNAME || 'response_'}`, JSON.stringify({
                    jobID,
                    userID,
                    error: 'Unsupported language'
                }));
                continue;
            }

            const filename = uuidv4() + config.extension;
            const filePath = path.join('./public', filename);

            fs.writeFileSync(filePath, code);

            const compileCommand = config.execute ? `${config.command} ${filePath}` : `${config.command} ${filePath}`;

            exec(compileCommand, (compileError, stdout, stderr) => {
                if (compileError || stderr) {
                    client.publish(`${process.env.PUBNAME || 'response_'}`, JSON.stringify({
                        jobID,
                        userID,
                        error: compileError ? compileError.message : stderr
                    }));
                    fs.unlinkSync(filePath);
                    return;
                }
                if (config.execute) {
                    exec(config.execute, (runError, runStdout, runStderr) => {
                        if (runStdout) {
                            client.publish(`${process.env.PUBNAME || 'response_'}`, JSON.stringify({
                                jobID,
                                userID,
                                output: runStdout,
                            }));
                            fs.unlinkSync(filePath);
                            fs.unlinkSync("a.out");
                        }
                        else {
                            client.publish(`${process.env.PUBNAME || 'response_'}`, JSON.stringify({
                                jobID,
                                userID,
                                error: runError ? runError.message : null
                            }));
                            fs.unlinkSync(filePath);
                            fs.unlinkSync("a.out");

                        }
                    });
                } else {
                    const payload = JSON.stringify({
                        jobID,
                        userID,
                        output: stdout,
                        error: null
                    });

                    if (!payload) {
                        throw error("invalid payload");
                    }
                    client.publish('response_', payload);
                    fs.unlinkSync(filePath); // Clean up file
                }
            });

        } catch (error) {
            console.error(`Unexpected error: ${error.message}`);
        }
    }
};

StartServer();
