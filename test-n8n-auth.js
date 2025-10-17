import axios from 'axios';
import fs from 'fs';

async function testN8nAuth() {
    const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    const baseUrl = config.n8n.baseUrl;
    const apiKey = config.n8n.apiKey;

    console.log('🔐 Testing n8n-specific authentication...');

    // Test 1: X-N8N-API-KEY header (from the error message)
    console.log('\n1. Testing X-N8N-API-KEY header...');
    try {
        const client1 = axios.create({
            baseURL: baseUrl,
            headers: {
                'X-N8N-API-KEY': apiKey,
                'Content-Type': 'application/json'
            }
        });
        const response1 = await client1.get('/api/v1/workflows');
        console.log('✅ X-N8N-API-KEY works:', response1.status);
        console.log('Workflows found:', response1.data?.length || 0);
        if (response1.data) {
            console.log('Workflow details:', response1.data);
        }
    } catch (error) {
        console.log('❌ X-N8N-API-KEY failed:', error.response?.status, error.message);
        if (error.response?.data) {
            console.log('Response data:', error.response.data);
        }
    }

    // Test 2: Try with basic auth + X-N8N-API-KEY
    console.log('\n2. Testing basic auth + X-N8N-API-KEY...');
    try {
        const client2 = axios.create({
            baseURL: baseUrl,
            auth: {
                username: config.n8n.username,
                password: config.n8n.password
            },
            headers: {
                'X-N8N-API-KEY': apiKey,
                'Content-Type': 'application/json'
            }
        });
        const response2 = await client2.get('/api/v1/workflows');
        console.log('✅ Basic auth + X-N8N-API-KEY works:', response2.status);
    } catch (error) {
        console.log('❌ Basic auth + X-N8N-API-KEY failed:', error.response?.status, error.message);
    }
}

testN8nAuth().catch(console.error);
