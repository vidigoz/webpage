const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const store = getStore('stories');
    const { blobs } = await store.list();

    const stories = await Promise.all(
      blobs.map(async ({ key }) => {
        const data = await store.get(key, { type: 'json' });
        return data;
      })
    );

    // Sort by id descending (newest first)
    stories.sort((a, b) => b.id - a.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(stories),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
