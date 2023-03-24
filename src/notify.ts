import * as core from '@actions/core';

import { compact } from './lib/compact';
import { CustomNotification, postNotification } from './lib/post-webhook';

const parseRecipientsExternalIds = (input: string): string[] => {
  return input.split(',').map((x) => x.trim());
};

export async function run(): Promise<void> {
  try {
    const recipients = parseRecipientsExternalIds(core.getInput('recipients', { required: true }));

    core.debug(`Send notification...`);

    let category = 'Funky';
    const inputCategory = core.getInput('category');
    if (!!inputCategory && ['Funky', 'Info', 'Warning', 'Critical'].includes(inputCategory)) {
      category = inputCategory;
    }

    const webhookResponse = await postNotification(
      compact<CustomNotification>({
        model: 'custom_notification',
        title: core.getInput('title', { required: true }),
        content: core.getInput('content'),
        recipients: recipients,
        action_url: core.getInput('action-url'),
        topic: core.getInput('topic'),
        category: category,
        icon_url: core.getInput('icon-url'),
      }),
    );

    core.setOutput('notification', webhookResponse);
    core.info(JSON.stringify(webhookResponse, null, 2));
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

if (process.env.NODE_ENV !== 'test') {
  run();
}
