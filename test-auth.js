import axios from 'axios';
import fs from 'fs';

async function testAuthentication() {
    const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    const baseUrl = config.n8n.baseUrl;
    const apiKey = config.n8n.apiKey;

    console.log('🔐 Testing authentication methods...');

    // Test 1: Bearer token (current method)
    console.log('\n1. Testing Bearer token authentication...');
    try {
        const client1 = axios.create({
            baseURL: baseUrl,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        const response1 = await client1.get('/api/v1/workflows');
        console.log('✅ Bearer token works:', response1.status);
    } catch (error) {
        console.log('❌ Bearer token failed:', error.response?.status, error.message);
    }

    // Test 2: X-API-KEY header
    console.log('\n2. Testing X-API-KEY header...');
    try {
        const client2 = axios.create({
            baseURL: baseUrl,
            headers: {
                'X-API-KEY': apiKey,
                'Content-Type': 'application/json'
            }
        });
        const response2 = await client2.get('/api/v1/workflows');
        console.log('✅ X-API-KEY works:', response2.status);
    } catch (error) {
        console.log('❌ X-API-KEY failed:', error.response?.status, error.message);
    }

    // Test 3: Query parameter
    console.log('\n3. Testing query parameter authentication...');
    try {
        const client3 = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response3 = await client3.get(`/api/v1/workflows?api_key=${apiKey}`);
        console.log('✅ Query parameter works:', response3.status);
    } catch (error) {
        console.log('❌ Query parameter failed:', error.response?.status, error.message);
    }

    // Test 4: Check if API is enabled by trying to access without any auth
    console.log('\n4. Testing without authentication...');
    try {
        const client4 = axios.create({
            baseURL: baseUrl
        });
        const response4 = await client4.get('/api/v1/workflows');
        console.log('✅ No auth works (API might be public):', response4.status);
    } catch (error) {
        console.log('❌ No auth failed (expected):', error.response?.status, error.message);
    }
}

testAuthentication().catch(console.error);
