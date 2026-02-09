// lib/client.js
// HTTP client for PREA API communication

class PREAClient {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
  }

  async post(endpoint, data = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`PREA API ${response.status}: ${errorBody}`);
      }

      return await response.json();
    } catch (error) {
      if (error.message.startsWith('PREA API')) throw error;
      throw new Error(`PREA SDK: Failed to reach PREA — ${error.message}`);
    }
  }

  async get(endpoint) {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        }
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`PREA API ${response.status}: ${errorBody}`);
      }

      return await response.json();
    } catch (error) {
      if (error.message.startsWith('PREA API')) throw error;
      throw new Error(`PREA SDK: Failed to reach PREA — ${error.message}`);
    }
  }
}

module.exports = PREAClient;
