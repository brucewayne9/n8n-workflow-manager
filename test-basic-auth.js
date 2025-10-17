import axios from 'axios';
import fs from 'fs';

async function testBasicAuth() {
    const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    const baseUrl = config.n8n.baseUrl;
    const username = config.n8n.username;
    const password = config.n8n.password;

    console.log('🔐 Testing basic authentication...');

    try {
        const client = axios.create({
            baseURL: baseUrl,
            auth: {
                username: username,
                password: password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const response = await client.get('/api/v1/workflows');
        console.log('✅ Basic authentication works:', response.status);
        console.log('Workflows found:', response.data?.length || 0);

    } catch (error) {
        console.log('❌ Basic authentication failed:', error.response?.status, error.message);
        if (error.response?.data) {
            console.log('Response data:', error.response.data);
        }
    }
}

testBasicAuth().catch(console.error);
