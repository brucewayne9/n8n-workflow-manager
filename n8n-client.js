import axios from 'axios';
import fs from 'fs';

class N8nClient {
    constructor(configPath = './config.json') {
        this.config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        this.baseUrl = this.config.n8n.baseUrl;
        this.apiKey = this.config.n8n.apiKey;

        // Create axios instance with default headers
        this.client = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'X-N8N-API-KEY': this.apiKey,
                'Content-Type': 'application/json'
            }
        });
    }

    // Test connection to n8n instance
    async testConnection() {
        try {
            const response = await this.client.get('/api/v1/workflows');
            return {
                success: true,
                status: response.status,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                status: error.response?.status
            };
        }
    }

    // Get all workflows
    async getWorkflows() {
        try {
            const response = await this.client.get('/api/v1/workflows');
            return {
                success: true,
                workflows: response.data.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                status: error.response?.status
            };
        }
    }

    // Create a new workflow
    async createWorkflow(workflowData) {
        try {
            const response = await this.client.post('/api/v1/workflows', workflowData);
            console.log('📊 Raw API response:', JSON.stringify(response.data, null, 2));

            // Handle different response structures
            if (response.data && response.data.data) {
                return {
                    success: true,
                    workflow: response.data.data,
                    id: response.data.data.id
                };
            } else if (response.data && response.data.id) {
                return {
                    success: true,
                    workflow: response.data,
                    id: response.data.id
                };
            } else {
                return {
                    success: true,
                    workflow: response.data,
                    id: response.data?.id || 'unknown'
                };
            }
        } catch (error) {
            return {
                success: false,
                error: error.message,
                status: error.response?.status
            };
        }
    }

    // Update an existing workflow
    async updateWorkflow(workflowId, workflowData) {
        try {
            const response = await this.client.patch(`/api/v1/workflows/${workflowId}`, workflowData);
            return {
                success: true,
                workflow: response.data.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Activate a workflow
    async activateWorkflow(workflowId) {
        try {
            const response = await this.client.post(`/api/v1/workflows/${workflowId}/activate`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Deactivate a workflow
    async deactivateWorkflow(workflowId) {
        try {
            const response = await this.client.post(`/api/v1/workflows/${workflowId}/deactivate`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Delete a workflow
    async deleteWorkflow(workflowId) {
        try {
            const response = await this.client.delete(`/api/v1/workflows/${workflowId}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

export default N8nClient;
