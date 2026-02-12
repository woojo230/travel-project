import * as Sentry from '@sentry/nestjs';

Sentry.init({
  dsn: 'https://e46fd728bfe2ecbb04f88aed6e95ceba@o4510873010569216.ingest.us.sentry.io/4510873013059584',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
