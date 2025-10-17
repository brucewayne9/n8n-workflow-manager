# n8n Workflow Manager

A powerful Node.js tool for managing n8n workflows remotely. This tool allows you to create, deploy, and manage workflows on your n8n instance through the REST API.

## Features

- ✅ **Remote Workflow Management**: Connect to any n8n instance with API access
- 📋 **Template-Based Workflows**: Pre-built templates for common automation scenarios
- 🔧 **Custom Workflow Creation**: Build and deploy custom workflows programmatically
- 📊 **Workflow Monitoring**: List, view details, and manage existing workflows
- 🔐 **Secure Authentication**: Support for API key authentication
- 🚀 **Easy Deployment**: Simple commands to deploy workflows instantly

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
npm run test
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

## Available Templates

### Webhook Data Processor
- **Purpose**: Process incoming webhook data
- **Features**: Webhook trigger, data processing, HTTP response
- **Use Case**: API integrations, webhook handling

### Scheduled Data Fetcher
- **Purpose**: Fetch data from APIs on a schedule
- **Features**: Schedule trigger, HTTP requests, data processing
- **Use Case**: Data aggregation, periodic API calls

### Email Notification System
- **Purpose**: Send automated email notifications
- **Features**: Schedule trigger, email sending
- **Use Case**: Alerts, reports, notifications

## API Commands

### Create Workflow
```javascript
import { createWorkflow } from './n8n-client.js';
import { workflowTemplates } from './workflow-templates.js';

const result = await createWorkflow(workflowTemplates.webhookTrigger);
```

### List Workflows
```javascript
import { listWorkflows } from './n8n-client.js';

const workflows = await listWorkflows();
```

### Get Workflow Details
```javascript
import { getWorkflow } from './n8n-client.js';

const workflow = await getWorkflow('workflow-id');
```

### Update Workflow
```javascript
import { updateWorkflow } from './n8n-client.js';

const result = await updateWorkflow('workflow-id', { name: 'New Name' });
```

### Delete Workflow
```javascript
import { deleteWorkflow } from './n8n-client.js';

await deleteWorkflow('workflow-id');
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
├── index.js                 # Main application
├── n8n-client.js            # API client
├── workflow-templates.js    # Workflow templates
├── create-workflow.js       # Workflow deployment
├── package.json             # Dependencies
└── README.md                # This file
```

## Security Notes

- Store API keys securely in `config.json`
- Never commit configuration files with sensitive data
- Use HTTPS for production n8n instances
- Regularly rotate API keys

## Support

For issues or feature requests, check the n8n API documentation and ensure your instance supports the REST API endpoints used by this tool.

## License

This tool is provided as-is for managing n8n workflows programmatically.
