import { afterEach, beforeEach, jest, test } from '@jest/globals';

import { withInputs } from './__tests__/with-inputs';

const write = process.stdout.write.bind(process.stdout);

beforeEach(() => {
  // @ts-ignore - stub out write, as @actions/core will pollute console output
  process.stdout.write = jest.fn();
});
afterEach(() => {
  process.stdout.write = write;
});

test('can create notification', async () => {
  withInputs({
    title: 'GitHub CI Action',
    recipients: 'giorgiogross',
  });

  await import('./notify').then((x) => x.run());
});
