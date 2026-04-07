/**
 * Pings the N8N indexing webhook to notify about article URL changes.
 * Payload format: { articleUrl, actionType }
 * Runs fire-and-forget so it doesn't block the API response.
 */
export async function pingIndexing(slug: string, actionType: 'URL_UPDATED' | 'URL_DELETED') {
  const url = process.env.N8N_PING_INDEXING_URL;
  if (!url) return;

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        articleUrl: `https://www.sekolahwfa.com/mading/${slug}`,
        actionType,
      }),
    });
  } catch (error) {
    // Don't throw — indexing ping is best-effort and should never break the API flow
    console.error('[pingIndexing] Failed to ping n8n:', error);
  }
}
