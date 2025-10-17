import N8nClient from './n8n-client.js';
import WorkflowManager from './create-workflow.js';
import { workflowTemplates } from './workflow-templates.js';

// Main application entry point
class N8nWorkflowManager {
    constructor() {
        this.client = new N8nClient();
        this.manager = new WorkflowManager();
    }

    // Interactive menu for workflow management
    async showMenu() {
        console.log('\n🎯 n8n Workflow Manager');
        console.log('=======================');
        console.log('1. Test Connection');
        console.log('2. List Existing Workflows');
        console.log('3. Deploy Template Workflow');
        console.log('4. List Available Templates');
        console.log('5. Exit');

        // For now, demonstrate the capabilities
        await this.demonstrateCapabilities();
    }

    // Demonstrate all capabilities
    async demonstrateCapabilities() {
        console.log('\n🧪 Demonstrating n8n Workflow Manager Capabilities...');

        // Test connection
        console.log('\n1. Testing connection to n8n instance...');
        const connectionResult = await this.client.testConnection();

        if (connectionResult.success) {
            console.log('✅ Connection successful!');
            console.log('   Health status:', connectionResult.data);
        } else {
            console.log('❌ Connection failed:', connectionResult.error);
            return;
        }

        // List existing workflows
        console.log('\n2. Checking existing workflows...');
        const workflowsResult = await this.client.getWorkflows();

        if (workflowsResult.success) {
            // Handle different response formats
            let workflows = workflowsResult.workflows;
            if (workflows && !Array.isArray(workflows)) {
                // If workflows is an object, try to extract the array
                workflows = Object.values(workflows).find(val => Array.isArray(val)) || [];
            }

            const workflowCount = workflows?.length || 0;
            console.log(`✅ Found ${workflowCount} existing workflows`);

            if (workflowCount > 0) {
                workflows.forEach((wf, index) => {
                    console.log(`   ${index + 1}. ${wf.name} (ID: ${wf.id}, Active: ${wf.active})`);
                });
            }
        } else {
            console.log('❌ Failed to retrieve workflows:', workflowsResult.error);
        }

        // Show available templates
        console.log('\n3. Available workflow templates:');
        Object.keys(workflowTemplates).forEach((key, index) => {
            const template = workflowTemplates[key];
            console.log(`   ${index + 1}. ${key}: ${template.name}`);
        });

        console.log('\n🎉 n8n Workflow Manager is ready!');
        console.log('\nTo deploy a workflow, use:');
        console.log('  npm run create-workflow -- deploy webhookTrigger');
        console.log('  npm run create-workflow -- deploy scheduledFetch');
        console.log('  npm run create-workflow -- deploy emailNotification');

        console.log('\nTo test connection: npm run test');
    }
}

// Run the application
async function main() {
    const app = new N8nWorkflowManager();
    await app.showMenu();
}

// Export for use in other modules
export default N8nWorkflowManager;

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}
