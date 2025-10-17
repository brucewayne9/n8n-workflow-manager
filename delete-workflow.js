import N8nClient from './n8n-client.js';

async function deleteWorkflow(workflowId) {
    try {
        const client = new N8nClient();

        console.log(`🗑️ Attempting to delete workflow: ${workflowId}`);

        const result = await client.deleteWorkflow(workflowId);

        if (result.success) {
            console.log(`✅ Workflow ${workflowId} deleted successfully!`);
        } else {
            console.log('❌ Failed to delete workflow:');
            console.log(`   Error: ${result.error}`);
            console.log(`   Status: ${result.status}`);
        }

    } catch (error) {
        console.log('❌ Error deleting workflow:', error.message);
    }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const workflowId = process.argv[2];

    if (!workflowId) {
        console.log('Usage: node delete-workflow.js <workflow-id>');
        console.log('Example: node delete-workflow.js MPXufJJlYAGg4XJx');
        process.exit(1);
    }

    deleteWorkflow(workflowId).catch(console.error);
}

export default deleteWorkflow;
