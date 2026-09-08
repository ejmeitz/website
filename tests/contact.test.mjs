import test from 'node:test';
import assert from 'node:assert/strict';
import { formEndpoint, sendContact } from '../src/lib/contact.mjs';

test('missing or invalid configuration cannot create a submission endpoint', () => {
  for (const id of [undefined, '', 'https://example.org', 'name@example.org', '../test', 'a b']) assert.equal(formEndpoint(id), null);
  assert.equal(formEndpoint('abcdefgh'), 'https://formspree.io/f/abcdefgh');
});
test('successful submission posts the message with JSON response negotiation', async () => {
  const data = new FormData(); data.set('message', 'Testing the transport, not sending a real message.');
  const result = await sendContact(formEndpoint('abcdefgh'), data, async (endpoint, options) => {
    assert.equal(endpoint, 'https://formspree.io/f/abcdefgh');
    assert.equal(options.method, 'POST'); assert.equal(options.body, data);
    assert.equal(options.headers.Accept, 'application/json');
    return { ok: true, status: 200 };
  });
  assert.equal(result, true);
});
test('rate limits and server errors cannot report success', async () => {
  for (const status of [400, 422, 429, 500]) await assert.rejects(sendContact(formEndpoint('abcdefgh'), new FormData(), async () => ({ok:false,status})), /try again|too many/);
});
test('network failure and timeout preserve failure state', async () => {
  await assert.rejects(sendContact(formEndpoint('abcdefgh'), new FormData(), async()=>{throw new TypeError('Failed to fetch');}), /Failed to fetch/);
  await assert.rejects(sendContact(formEndpoint('abcdefgh'), new FormData(), async()=>{throw new DOMException('Aborted','AbortError');}), /could not be confirmed/);
});
test('invalid endpoints never receive form data', async () => {
  let called=false;
  await assert.rejects(sendContact('https://example.org', new FormData(),async()=>{called=true;return {ok:true};}), /unavailable/);
  assert.equal(called,false);
});
