import { fetchWithAuth } from "../lib/api.js";
import { getJwtToken } from "../lib/auth.js";
import dotenv from 'dotenv';
dotenv.config();

async function testAuth() {
  try {
    console.log('Testing JWT authentication...');

    // Test token retrieval
    console.log('Getting JWT token...');
    const token = await getJwtToken();
    console.log('✅ Successfully retrieved token');

    // Test API request
    console.log('Fetching posts with token...');
    const data = await fetchWithAuth('pages?slug=contact&_embed');
    console.log('✅ Successfully fetched data:');
    console.log(`Retrieved contact data:`, data);

    return { success: true };
  } catch (error) {
    console.error('❌ Authentication test failed:', error);
    return { success: false, error: error.message };
  }
}

testAuth()
  .then(result => {
    console.log('Test completed:', result);
    process.exit(result.success ? 0 : 1);
  })
  .catch(error => {
    console.error('Test failed with error:', error);
    process.exit(1);
  });