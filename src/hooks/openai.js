const OpenAI = require('openai-api');

// Load your key from an environment variable or secret management service
// (do not include your key directly in your code)
const OPENAI_API_KEY ="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";

export const openai = new OpenAI(OPENAI_API_KEY);
