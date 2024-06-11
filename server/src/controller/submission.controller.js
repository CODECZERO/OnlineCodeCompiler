import { createClient } from 'redis';
import { v4 as uuidv4 } from 'uuid';

const Submission = async (req, res) => {
    const { language, code, userID } = req.body;

    if (!(language ||code ||userID)) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    const client = createClient();
    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect();

    const jobID = uuidv4();
    const payload = JSON.stringify({ jobID, userID, language, code });

    await client.lPush('submission', payload);
    
    client.subscribe('codeResult', (message) => {
        const result = JSON.parse(message);
        if (result.jobID && userID === jobID && userID) {
            res.json(result);
            client.unsubscribe('codeResult');
        }
    });

    res.json({ jobID, status: 'submitted' });
};

export default Submission;