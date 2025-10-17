import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const n8nApi = axios.create({
    baseURL: `${config.n8n.baseUrl}/api/v1`,
    headers: {
        'X-N8N-API-KEY': config.n8n.apiKey,
        'Content-Type': 'application/json'
    }
});

async function getWorkflowDetails(workflowId) {
    try {
        console.log(`📋 Fetching details for workflow ID: ${workflowId}...`);

        const response = await n8nApi.get(`/workflows/${workflowId}`);
        const workflow = response.data;

        console.log('✅ Workflow details retrieved successfully!');
        console.log('');
        console.log('📋 RAW WORKFLOW DATA:');
        console.log('====================');
        console.log(JSON.stringify(workflow, null, 2));
        console.log('');

        // Check if workflow data is properly structured
        if (!workflow || typeof workflow !== 'object') {
            console.log('⚠️ Workflow data structure is unexpected');
            return workflow;
        }

        // Display basic workflow information
        console.log('📊 WORKFLOW DETAILS:');
        console.log('====================');
        console.log(`Name: ${workflow.name || 'undefined'}`);
        console.log(`ID: ${workflow.id || 'undefined'}`);
        console.log(`Active: ${workflow.active ? '✅' : '❌'}`);
        console.log(`Created: ${workflow.createdAt || 'undefined'}`);
        console.log(`Updated: ${workflow.updatedAt || 'undefined'}`);
        console.log(`Trigger Count: ${workflow.triggerCount || 0}`);

        console.log('');
        console.log('🔗 TRIGGER NODE:');
        console.log('================');

        // Find the trigger node - handle undefined nodes
        if (workflow.nodes && typeof workflow.nodes === 'object') {
            const triggerNode = Object.values(workflow.nodes).find(node =>
                node && node.type && (
                    node.type.includes('Trigger') ||
                    node.type.includes('Webhook') ||
                    node.type.includes('Cron') ||
                    node.type.includes('Schedule')
                )
            );

            if (triggerNode) {
                console.log(`Type: ${triggerNode.type}`);
                console.log(`Name: ${triggerNode.name}`);
                if (triggerNode.parameters) {
                    console.log('Parameters:', JSON.stringify(triggerNode.parameters, null, 2));
                }
            } else {
                console.log('No trigger node found');
            }

            console.log('');
            console.log('🔄 WORKFLOW NODES:');
            console.log('==================');

            // Display all nodes with their types
            Object.values(workflow.nodes).forEach((node, index) => {
                if (node) {
                    console.log(`${index + 1}. ${node.name || 'unnamed'} (${node.type || 'unknown'})`);
                    if (node.parameters) {
                        const paramSummary = Object.keys(node.parameters)
                            .filter(key => node.parameters[key] && !Array.isArray(node.parameters[key]) && typeof node.parameters[key] !== 'object')
                            .slice(0, 3)
                            .map(key => `${key}: ${node.parameters[key]}`)
                            .join(', ');
                        if (paramSummary) {
                            console.log(`   Parameters: ${paramSummary}`);
                        }
                    }
                }
            });

            console.log('');
            console.log('🔗 CONNECTIONS:');
            console.log('===============');

            // Display node connections
            if (workflow.connections && typeof workflow.connections === 'object') {
                Object.values(workflow.connections).forEach((connection, sourceIndex) => {
                    if (connection && typeof connection === 'object') {
                        Object.values(connection).forEach((targets, outputIndex) => {
                            if (Array.isArray(targets)) {
                                targets.forEach(target => {
                                    if (target && target.node !== undefined) {
                                        console.log(`Node ${sourceIndex + 1} → Node ${target.node + 1} (Output ${outputIndex})`);
                                    }
                                });
                            }
                        });
                    }
                });
            }

            console.log('');
            console.log('📋 WORKFLOW DESCRIPTION:');
            console.log('========================');
            if (workflow.tags && workflow.tags.length > 0) {
                console.log(`Tags: ${workflow.tags.join(', ')}`);
            }

            // Try to extract description from nodes or parameters
            const descriptionNode = Object.values(workflow.nodes).find(node =>
                node && node.type && (
                    node.type.includes('Code') ||
                    node.type.includes('Function') ||
                    (node.name && node.name.toLowerCase().includes('description'))
                )
            );

            if (descriptionNode && descriptionNode.parameters) {
                const description = descriptionNode.parameters.jsCode ||
                    descriptionNode.parameters.functionCode ||
                    descriptionNode.parameters.description;
                if (description) {
                    console.log('Description:', description.substring(0, 200) + (description.length > 200 ? '...' : ''));
                }
            }
        } else {
            console.log('⚠️ No nodes found in workflow data');
        }

        return workflow;

    } catch (error) {
        console.error('❌ Error fetching workflow details:');
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error(`Message: ${error.response.data?.message || error.response.statusText}`);
            if (error.response.data) {
                console.error('Response data:', JSON.stringify(error.response.data, null, 2));
            }
        } else {
            console.error(error.message);
        }
        process.exit(1);
    }
}

// Get workflow ID from command line arguments
const workflowId = process.argv[2];
if (!workflowId) {
    console.error('❌ Please provide a workflow ID as an argument');
    console.log('Usage: node get-workflow-details.js <workflow-id>');
    process.exit(1);
}

getWorkflowDetails(workflowId);
