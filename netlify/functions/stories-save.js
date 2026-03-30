const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod === 'DELETE') {
    try {
      const { id } = JSON.parse(event.body);
      const store = getStore('stories');
      await store.delete(String(id));
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    } catch (err) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
    }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const story = JSON.parse(event.body);

    // Validate required fields
    if (!story.text) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'text is required' }) };
    }

    // Assign id if not present
    if (!story.id) story.id = Date.now();

    const store = getStore('stories');
    await store.setJSON(String(story.id), story);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, id: story.id }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
