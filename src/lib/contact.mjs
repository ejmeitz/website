/** Form IDs are intentionally public; recipient addresses and secrets never belong here. */
export function formEndpoint(id) {
  return typeof id === 'string' && /^[a-zA-Z0-9]{6,32}$/.test(id) ? `https://formspree.io/f/${id}` : null;
}

export async function sendContact(endpoint, data, fetcher = fetch) {
  if (!/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]{6,32}$/.test(endpoint)) throw new Error('The contact form is unavailable. Please use LinkedIn.');
  const controller = new AbortController();
  const timeout = setTimeout(()=>controller.abort(), 20000);
  try {
    const response = await fetcher(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: controller.signal });
    if (!response.ok) throw new Error(response.status === 429 ? 'The form is receiving too many messages. Please try again later or contact me on LinkedIn.' : 'Your message could not be sent. Please try again or contact me on LinkedIn.');
    return true;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') throw new Error('The request timed out. Delivery could not be confirmed. Please try again later or use LinkedIn.');
    throw error;
  } finally { clearTimeout(timeout); }
}
