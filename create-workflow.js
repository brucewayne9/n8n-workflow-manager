import N8nClient from './n8n-client.js';
import { workflowTemplates, createCustomWorkflow } from './workflow-templates.js';

class WorkflowManager {
    constructor() {
        this.client = new N8nClient();
    }

    // Deploy a template workflow
    async deployTemplate(templateName, customName = null) {
        if (!workflowTemplates[templateName]) {
            throw new Error(`Template '${templateName}' not found. Available templates: ${Object.keys(workflowTemplates).join(', ')}`);
        }

        const template = workflowTemplates[templateName];
        const workflowData = {
            ...template,
            name: customName || template.name
        };

        console.log(`🚀 Deploying workflow: ${workflowData.name}`);

        const result = await this.client.createWorkflow(workflowData);

        if (result.success) {
            const workflowId = result.id || result.workflow?.id;
            console.log(`✅ Workflow created successfully!`);
            console.log(`   ID: ${workflowId}`);
            console.log(`   Name: ${workflowData.name}`);

            // Optionally activate the workflow
            if (workflowId) {
                const activationResult = await this.client.activateWorkflow(workflowId);
                if (activationResult.success) {
                    console.log(`   Status: Activated`);
                } else {
                    console.log(`   Status: Created (not activated)`);
                }
            }

            return result;
        } else {
            console.log(`❌ Failed to create workflow: ${result.error}`);
            return result;
        }
    }

    // Deploy a custom workflow
    async deployCustomWorkflow(workflowData) {
        console.log(`🚀 Deploying custom workflow: ${workflowData.name}`);

        const result = await this.client.createWorkflow(workflowData);

        if (result.success) {
            const workflowId = result.id || result.workflow?.id;
            console.log(`✅ Custom workflow created successfully!`);
            console.log(`   ID: ${workflowId}`);
            console.log(`   Name: ${workflowData.name}`);
            return result;
        } else {
            console.log(`❌ Failed to create custom workflow: ${result.error}`);
            return result;
        }
    }

    // List available templates
    listTemplates() {
        console.log('📋 Available workflow templates:');
        Object.keys(workflowTemplates).forEach(key => {
            const template = workflowTemplates[key];
            console.log(`   • ${key}: ${template.name}`);
        });
    }
}

// Command line interface
async function main() {
    const args = process.argv.slice(2);
    const manager = new WorkflowManager();

    if (args.length === 0) {
        console.log('Usage:');
        console.log('  npm run create-workflow -- list                    - List available templates');
        console.log('  npm run create-workflow -- deploy <template>       - Deploy a template workflow');
        console.log('  npm run create-workflow -- deploy <template> <name> - Deploy with custom name');
        console.log('');
        console.log('Examples:');
        console.log('  npm run create-workflow -- deploy webhookTrigger');
        console.log('  npm run create-workflow -- deploy scheduledFetch "My Data Fetcher"');
        return;
    }

    const command = args[0];

    switch (command) {
        case 'list':
            manager.listTemplates();
            break;

        case 'deploy':
            if (args.length < 2) {
                console.log('❌ Please specify a template name');
                return;
            }

            const templateName = args[1];
            const customName = args[2] || null;

            await manager.deployTemplate(templateName, customName);
            break;

        default:
            console.log(`❌ Unknown command: ${command}`);
            console.log('Use "list" or "deploy"');
            break;
    }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}

export default WorkflowManager;
