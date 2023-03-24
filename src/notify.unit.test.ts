import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals';

import { withInputs } from './__tests__/with-inputs';

const postWebhook = {
  postNotification: jest.fn(),
};

jest.mock('./lib/post-webhook', () => postWebhook);

// eslint-disable-next-line import/first
import { run } from './notify';

const write = process.stdout.write.bind(process.stdout);

beforeEach(() => {
  // @ts-ignore - stub out write, as @actions/core will pollute console output
  process.stdout.write = jest.fn();
});
afterEach(() => {
  process.stdout.write = write;
});

describe('notify', () => {
  test('creates notifications conforming to expected interface', async () => {
    withInputs({
      title: 'hello from the action',
      recipients: 'exampleuser1',
    });

    await run();

    expect(postWebhook.postNotification).toHaveBeenCalledWith({
      model: 'custom_notification',
      category: 'Funky',
      title: 'hello from the action',
      recipients: ['exampleuser1'],
    });
  });

  test('can send notification to multiple recipients', async () => {
    withInputs({
      title: 'hello from the action',
      recipients: 'exampleuser1, exampleuser2',
    });

    await run();

    expect(postWebhook.postNotification).toHaveBeenCalledWith({
      model: 'custom_notification',
      category: 'Funky',
      title: 'hello from the action',
      recipients: ['exampleuser1', 'exampleuser2'],
    });
  });
});
