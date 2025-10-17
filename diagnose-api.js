import axios from 'axios';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const baseUrl = config.n8n.baseUrl;
const apiKey = config.n8n.apiKey;

console.log('🔍 Diagnosing n8n API endpoints...');
console.log(`Base URL: ${baseUrl}`);

// Test various possible API endpoints
const endpoints = [
    '/health',
    '/api/v1/health',
    '/rest/health',
    '/webhook/test',
    '/api/v1/webhook/test',
    '/rest/webhook/test',
    '/workflows',
    '/api/v1/workflows',
    '/rest/workflows'
];

async function testEndpoint(endpoint) {
    try {
        const client = axios.create({
            baseURL: baseUrl,
            headers: {
                'X-N8N-API-KEY': apiKey,
                'Content-Type': 'application/json'
            }
        });

        const response = await client.get(endpoint);

        console.log(`\n📊 Testing: ${endpoint}`);
        console.log(`Status: ${response.status}`);

        // Check if response is JSON or HTML
        const contentType = response.headers['content-type'] || '';
        if (contentType.includes('application/json')) {
            console.log('✅ JSON response detected');
            console.log('Response sample:', JSON.stringify(response.data).substring(0, 200) + '...');
        } else if (contentType.includes('text/html')) {
            console.log('⚠️  HTML response detected (likely UI page)');
            console.log('Response starts with:', response.data.substring(0, 100) + '...');
        } else {
            console.log('❓ Unknown content type:', contentType);
        }

        return { endpoint, status: response.status, contentType, isJson: contentType.includes('application/json') };
    } catch (error) {
        console.log(`\n📊 Testing: ${endpoint}`);
        console.log(`❌ Error: ${error.message}`);
        if (error.response) {
            console.log(`Status: ${error.response.status}`);
        }
        return { endpoint, error: error.message, status: error.response?.status };
    }
}

async function diagnose() {
    console.log('\n🎯 Testing API endpoints...');

    const results = [];
    for (const endpoint of endpoints) {
        const result = await testEndpoint(endpoint);
        results.push(result);
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n📋 Summary:');
    const workingEndpoints = results.filter(r => r.isJson);
    if (workingEndpoints.length > 0) {
        console.log('✅ Working JSON endpoints:');
        workingEndpoints.forEach(r => console.log(`   - ${r.endpoint}`));
    } else {
        console.log('❌ No JSON endpoints found. The n8n REST API might be disabled or using different endpoints.');
        console.log('   Check n8n configuration for REST API settings.');
    }
}

diagnose().catch(console.error);
