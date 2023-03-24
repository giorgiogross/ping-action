# Send notifications from your GitHub workflows

Use this GitHub action to inform yourself or your team about activity in your repository through the Ping VSCode extension. Think of use cases like:

- sending your team a notification when an issue is labelled `critical`
- sending devops a notification when a deployment fails
- sending yourself a notification when a new pull request is opened
- sending the contributor a notification when their pull request is merged
- sending a Slack message to your announcements channel on a new release

## Usage

```yaml
name: 'Notify on Pulls'
on: pull_request

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Send PR Notification
        uses: giorgiogross/ping-action/notify@v0.0.1
        with:
          recipients: 'giorgiogross'
          title: 'Workflow Action'
          content: 'A new PR was created: ${{ github.event.number }}!'
          category: 'Info'
          icon-url: 'https://magicbell.gallerycdn.vsassets.io/extensions/magicbell/ping-code/0.0.8/1679072790319/Microsoft.VisualStudio.Services.Icons.Default'
```

## Inputs

The `notify` action accepts a number of options. The following options are required for all calls:

- **title** _String_

  The title of the notification.

- **recipients** _String_

  A comma (`,`) separated list of recipients, currently limited to email addresses.

The following options are optional:


- **content** _String_

  The content of the notification.

- **category** _String_
 
  The category of the notification. This can be used to group notifications together.

- **topic** _String_

  The topic of the notification. This can be used to thread notifications.

- **action-url** _String_

  The URL to which the notification will link to.

- **icon-url** _String_

  The URL to an icon displayed in Ping VSCode extension.
