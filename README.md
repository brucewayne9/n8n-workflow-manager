# n8n Workflow Manager

A comprehensive Node.js tool for programmatically managing n8n workflows on remote instances. This tool provides a complete API client for creating, deploying, monitoring, and managing workflows through n8n's REST API.

## Features

- ✅ **Remote Workflow Management**: Connect to any n8n instance with API access
- 📋 **Template-Based Workflows**: Pre-built templates for common automation scenarios
- 🔧 **Custom Workflow Creation**: Build and deploy custom workflows programmatically
- 📊 **Workflow Monitoring**: List, view details, and manage existing workflows
- 🔐 **Secure Authentication**: Support for API key authentication
- 🚀 **Easy Deployment**: Simple commands to deploy workflows instantly
- 🛠️ **Diagnostic Tools**: Connection testing and API debugging capabilities
- 🔄 **Workflow Updates**: Modify existing workflows programmatically
- 🗑️ **Workflow Deletion**: Clean up workflows when no longer needed

## Quick Start

### 1. Installation

```bash
cd n8n-workflow-manager
npm install
```

### 2. Configuration

Edit `config.json` with your n8n instance details:

```json
{
  "n8n": {
    "baseUrl": "https://your-n8n-instance.com",
    "apiKey": "your-api-key-here"
  }
}
```

### 3. Test Connection

```bash
# Test basic connection
npm run test-connection

# Test authentication
npm run test-auth

# Test workflow creation capabilities
npm run test-workflow
```

### 4. Deploy a Workflow

```bash
# Deploy webhook processor
npm run create-workflow -- deploy webhookTrigger

# Deploy scheduled data fetcher
npm run create-workflow -- deploy scheduledFetch

# Deploy email notification system
npm run create-workflow -- deploy emailNotification
```

### 5. Manage Existing Workflows

```bash
# List all workflows
npm run list-workflows

# Get workflow details
npm run get-workflow -- workflow-id

# Delete a workflow
npm run delete-workflow -- workflow-id
```

## Available Templates

### Webhook Data Processor
- **Purpose**: Process incoming webhook data with webhook trigger
- **Features**: Webhook trigger, data processing, HTTP response node
- **Use Case**: API integrations, webhook handling, data processing pipelines
- **Template Name**: `webhookTrigger`

### Scheduled Data Fetcher
- **Purpose**: Fetch data from APIs on a schedule
- **Features**: Schedule trigger, HTTP requests, data processing nodes
- **Use Case**: Data aggregation, periodic API calls, scheduled tasks
- **Template Name**: `scheduledFetch`

### Email Notification System
- **Purpose**: Send automated email notifications based on triggers
- **Features**: Schedule trigger, email sending node, template customization
- **Use Case**: Alerts, reports, notifications, automated communications
- **Template Name**: `emailNotification`

### Custom Template Creation
You can easily create new templates by adding them to `workflow-templates.js`:

```javascript
const myCustomTemplate = {
  name: "My Custom Workflow",
  nodes: [
    // Define your nodes here
  ],
  connections: {
    // Define node connections
  }
};
```

## API Commands

### Create Workflow
```javascript
import { createWorkflow } from './n8n-client.js';
import { workflowTemplates } from './workflow-templates.js';

const result = await createWorkflow(workflowTemplates.webhookTrigger);
console.log('Workflow created:', result);
```

### List Workflows
```javascript
import { listWorkflows } from './n8n-client.js';

const workflows = await listWorkflows();
console.log('Available workflows:', workflows);
```

### Get Workflow Details
```javascript
import { getWorkflow } from './n8n-client.js';

const workflow = await getWorkflow('workflow-id');
console.log('Workflow details:', workflow);
```

### Update Workflow
```javascript
import { updateWorkflow } from './n8n-client.js';

const result = await updateWorkflow('workflow-id', { 
  name: 'Updated Workflow Name',
  active: true 
});
console.log('Workflow updated:', result);
```

### Delete Workflow
```javascript
import { deleteWorkflow } from './n8n-client.js';

await deleteWorkflow('workflow-id');
console.log('Workflow deleted successfully');
```

### Test Connection
```javascript
import { testConnection } from './n8n-client.js';

const connectionStatus = await testConnection();
console.log('Connection status:', connectionStatus);
```

## Custom Workflow Creation

Create custom workflows using the helper function:

```javascript
import { createCustomWorkflow } from './workflow-templates.js';

const customWorkflow = createCustomWorkflow(
  'My Custom Workflow',
  [
    {
      name: 'Start',
      type: 'n8n-nodes-base.start',
      parameters: {},
      typeVersion: 1,
      position: [250, 300]
    },
    // Add more nodes...
  ],
  {
    // Define connections between nodes
  },
  {
    // Custom settings
  }
);
```

## Troubleshooting

### Connection Issues
- Verify the base URL points to your n8n instance
- Ensure API key authentication is enabled in n8n
- Check that the REST API is accessible

### Workflow Creation Failures
- Validate workflow JSON structure
- Check node types and parameters
- Verify authentication credentials

### Common Error Messages
- **401 Unauthorized**: Invalid API key
- **404 Not Found**: Incorrect API endpoint
- **400 Bad Request**: Invalid workflow structure

## File Structure

```
n8n-workflow-manager/
├── config.json              # Configuration file
├── index.js                 # Main application entry point
├── n8n-client.js            # Core API client functionality
├── workflow-templates.js    # Pre-built workflow templates
├── create-workflow.js       # Workflow deployment script
├── list-workflows.js        # Workflow listing functionality
├── get-workflow-details.js  # Workflow details retrieval
├── delete-workflow.js       # Workflow deletion script
├── update-config.js         # Configuration management
├── test-connection.js       # Connection testing utility
├── test-auth.js             # Authentication testing
├── test-n8n-auth.js         # n8n-specific auth testing
├── test-basic-auth.js       # Basic auth testing
├── diagnose-api.js          # API diagnostic tools
├── debug-create.js          # Debug workflow creation
├── package.json             # Dependencies and scripts
├── .gitignore               # Git ignore rules
├── README.md                # This documentation file
└── TRANSFER_GUIDE.md        # GitHub transfer instructions
```

## Security Notes

- Store API keys securely in `config.json`
- Never commit configuration files with sensitive data
- Use HTTPS for production n8n instances
- Regularly rotate API keys

## Scripts Available

The package.json includes several useful scripts:

```bash
# Test scripts
npm run test-connection     # Test basic connectivity
npm run test-auth           # Test authentication
npm run test-n8n-auth       # Test n8n-specific auth
npm run test-basic-auth     # Test basic auth
npm run diagnose-api        # Run comprehensive API diagnostics

# Workflow management scripts
npm run create-workflow     # Deploy a workflow template
npm run list-workflows      # List all workflows
npm run get-workflow        # Get workflow details
npm run delete-workflow     # Delete a workflow
npm run debug-create        # Debug workflow creation process

# Development scripts
npm run update-config       # Update configuration file
```

## Troubleshooting Guide

### Common Issues and Solutions

**Connection Issues:**
- Verify n8n instance URL is correct and accessible
- Ensure REST API is enabled on your n8n instance
- Check firewall and network connectivity

**Authentication Failures:**
- Verify API key is correct and has proper permissions
- Check if API key authentication is enabled in n8n settings
- Ensure the API key has workflow management permissions

**Workflow Creation Errors:**
- Validate workflow JSON structure against n8n API requirements
- Check that all node types used are available in your n8n instance
- Verify node parameters are correctly formatted

**API Endpoint Issues:**
- Confirm your n8n version supports the API endpoints used
- Check n8n API documentation for version-specific differences

### Diagnostic Tools

Use the diagnostic scripts to identify issues:

```bash
# Run comprehensive diagnostics
npm run diagnose-api

# Test specific components
npm run test-connection
npm run test-auth
```

## Security Best Practices

- Store API keys securely in environment variables or secure config files
- Never commit configuration files with sensitive data to version control
- Use HTTPS for all production n8n instances
- Regularly rotate API keys and review access permissions
- Implement proper error handling and logging

## Contributing

This tool is designed to be extensible. You can:
- Add new workflow templates to `workflow-templates.js`
- Extend API functionality in `n8n-client.js`
- Create new utility scripts for specific use cases
- Improve error handling and diagnostics

## Support

For issues or feature requests:
1. Check the n8n API documentation for your version
2. Verify your n8n instance supports the REST API endpoints
3. Use the diagnostic tools to identify specific problems
4. Review error messages and API responses for clues

## License

This tool is provided as-is for managing n8n workflows programmatically. It's designed to work with n8n instances that have REST API access enabled.
