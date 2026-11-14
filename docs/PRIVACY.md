# Privacy

BeyondSignal records `page_view`, `activity_started`, and `activity_completed` events only. Each record may include the UTC time, page or activity ID, coarse device category, an optional campaign/referring domain, and a random browser-session ID.

The application does not store raw IP addresses, full query strings, complete user-agent strings, precise geography, browser fingerprints, passwords, or activity answer text. Anonymous analytics cannot identify a visitor, organization, or observatory.

Analytics retention is configured through `ANALYTICS_RETENTION_DAYS`; the deployment operator is responsible for running the corresponding retention job. The initial release does not publish a guestbook. A contact method and applicable child-privacy review must be completed before public deployment.
