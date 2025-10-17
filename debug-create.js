import N8nClient from './n8n-client.js';
import { workflowTemplates } from './workflow-templates.js';

async function debugCreate() {
    const client = new N8nClient();
    const workflowData = workflowTemplates.scheduledFetch;

    console.log('🔍 Debugging workflow creation...');
    console.log('Workflow data:', JSON.stringify(workflowData, null, 2));

    try {
        const result = await client.createWorkflow(workflowData);
        console.log('📊 API Response:', JSON.stringify(result, null, 2));

        if (result.success) {
            console.log('✅ Workflow created successfully!');
            console.log('Response structure:', {
                success: result.success,
                workflow: result.workflow,
                id: result.id,
                hasData: !!result.workflow?.data,
                hasId: !!result.workflow?.id
            });
        } else {
            console.log('❌ Failed to create workflow');
            console.log('Error:', result.error);
        }
    } catch (error) {
        console.log('❌ Exception occurred:', error);
    }
}

debugCreate().catch(console.error);
