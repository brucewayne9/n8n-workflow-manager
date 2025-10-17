import N8nClient from './n8n-client.js';

async function listWorkflows() {
    try {
        const client = new N8nClient();

        console.log('📋 Fetching workflows from n8n instance...\n');

        const result = await client.getWorkflows();

        if (result.success) {
            const workflows = result.workflows || [];

            if (workflows.length === 0) {
                console.log('No workflows found in the n8n instance.');
                return;
            }

            console.log(`📊 Found ${workflows.length} workflow(s):\n`);

            workflows.forEach((workflow, index) => {
                console.log(`${index + 1}. ${workflow.name}`);
                console.log(`   ID: ${workflow.id}`);
                console.log(`   Active: ${workflow.active ? '✅' : '❌'}`);
                console.log(`   Created: ${workflow.createdAt}`);
                console.log(`   Updated: ${workflow.updatedAt}`);
                console.log(`   Trigger Count: ${workflow.triggerCount}`);
                console.log('');
            });

        } else {
            console.log('❌ Failed to fetch workflows:');
            console.log(`   Error: ${result.error}`);
            console.log(`   Status: ${result.status}`);
        }

    } catch (error) {
        console.log('❌ Error listing workflows:', error.message);
    }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    listWorkflows().catch(console.error);
}

export default listWorkflows;
