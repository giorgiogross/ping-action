import fetch from 'node-fetch';

export interface CustomNotification extends Record<string, unknown> {
  model: 'custom_notification';
  title: string;
  content?: string;
  recipients: string[];
  action_url?: string;
  topic?: string;
  category?: string;
  icon_url?: string;
}

export async function postNotification(n: CustomNotification): Promise<any> {
  const response = await fetch('https://ping-webhooks.onrender.com/webhook', {
    method: 'post',
    body: JSON.stringify(n),
    headers: { 'Content-Type': 'application/json' },
  });
  return await response.json();
}
