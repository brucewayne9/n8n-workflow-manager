import N8nClient from './n8n-client.js';

async function testConnection() {
    console.log('🔌 Testing connection to n8n instance...');

    const client = new N8nClient();

    try {
        // Test health endpoint
        console.log('📊 Testing health endpoint...');
        const healthResult = await client.testConnection();

        if (healthResult.success) {
            console.log('✅ Connection successful!');
            console.log('Health Status:', healthResult.data);

            // Test getting workflows
            console.log('📋 Testing workflow retrieval...');
            const workflowsResult = await client.getWorkflows();

            if (workflowsResult.success) {
                console.log(`✅ Found ${workflowsResult.workflows} existing workflows`);
                console.log('Workflow data type:', typeof workflowsResult.workflows);
                console.log('Workflow data:', workflowsResult.workflows);

                // Handle different response formats
                if (Array.isArray(workflowsResult.workflows)) {
                    if (workflowsResult.workflows.length > 0) {
                        console.log('Existing workflows:');
                        workflowsResult.workflows.forEach(wf => {
                            console.log(`  - ${wf.name} (ID: ${wf.id}, Active: ${wf.active})`);
                        });
                    }
                } else if (typeof workflowsResult.workflows === 'number') {
                    console.log(`Found ${workflowsResult.workflows} workflows (count only)`);
                } else {
                    console.log('Unexpected workflow data format:', workflowsResult.workflows);
                }
            } else {
                console.log('❌ Failed to retrieve workflows:', workflowsResult.error);
            }

        } else {
            console.log('❌ Connection failed:', healthResult.error);
            console.log('Status:', healthResult.status);
        }

    } catch (error) {
        console.log('❌ Unexpected error:', error.message);
    }
}

// Run the test
testConnection().catch(console.error);
