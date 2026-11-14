Pale Blue Dot — Project Specification

Project name: Pale Blue Dot

Tagline: A Living Archive of Humanity's Space Missions

Initial featured mission: Voyager 1

Project type: Educational space exploration, mission archive, and interactive learning platform

Primary audience: Children ages 6–8, families, educators, and space enthusiasts

Initial deployment: Existing Google Cloud VM

Initial persistence: File-based storage; no separate database server

Architecture goal: Reusable, extensible, secure, and inexpensive to operate



1\. Project Overview

Pale Blue Dot is an interactive educational platform that preserves the stories of spacecraft, explores their scientific discoveries, and helps people understand humanity's journey into space.

The first featured mission is Voyager 1, one of humanity's farthest-traveling spacecraft. Visitors will be able to explore its journey, learn about its discoveries, understand how it communicates with Earth, and discover the story of the Golden Record.

The platform will combine:

A mission archive containing structured spacecraft information.

Interactive educational activities.

A timeline of important mission milestones.

Spacecraft facts, images, and source references.

Anonymous visitor analytics.

A protected administrator dashboard.

An optional voluntary guestbook.

A reusable architecture that supports future missions.

Pale Blue Dot must be more than a static webpage. Its content model should make it straightforward to add Voyager 2, New Horizons, Pioneer, and other missions without redesigning the application.

1.1 Project goals

Make space exploration engaging and understandable for young learners.

Preserve mission histories, discoveries, and engineering stories.

Present accurate scientific information with traceable sources.

Provide interactive experiences that encourage exploration.

Measure aggregate visitor engagement while respecting privacy.

Support future contributions from educators, astronomy groups, and observatories.

Operate reliably on the existing Google Cloud VM without requiring a separate database service.

1.2 Non-goals for the first release

Building a real-time spacecraft telemetry service.

Reproducing NASA's full mission control or scientific data systems.

Collecting personally identifying visitor information automatically.

Creating user accounts or social networking features.

Building a complex content-management system.

Developing an advanced 3D spacecraft simulator.

Requiring paid AI APIs to display core educational content.

Claiming that Voyager 1 is abandoned or no longer communicating when that is not factually established.



2\. Product Identity and Branding

Product name

Pale Blue Dot

Primary tagline

A Living Archive of Humanity's Space Missions

Suggested homepage headline

Every mission has a story. Every signal reaches beyond.

Supporting description

Explore the spacecraft that changed our understanding of the universe. Discover their journeys, investigate their discoveries, and learn how humanity reaches into deep space.

Branding principles

Do not include an individual's name in the product name, logo, domain identity, or technical identifiers.

Use a professional but approachable visual identity.

Make the brand suitable for a long-lived public educational project.

Avoid implying official affiliation with NASA or another space agency.

Clearly credit official mission sources and image owners.

Use a consistent mission identifier, such as voyager-1, independently of the brand.

Suggested visual direction

Dark navy or black space background.

Stars, spacecraft illustrations, and subtle orbital or signal-line graphics.

Cyan, blue, and restrained gold accents.

Large, readable typography.

Clear contrast and accessible controls.

Minimal animation, with a reduced-motion option.

The visual identity should feel like a modern space exploration platform rather than a conventional school worksheet.



3\. Target Users and Experience

Primary audience: young learners

The first Voyager experience should work well for children approximately 6–8 years old.

Content should use:

Short paragraphs and simple vocabulary.

One main concept per screen.

Large buttons and touch-friendly controls.

Illustrations and timelines.

Encouraging feedback.

Optional read-aloud functionality.

Hints and retry options.

Short activities that can be completed independently.

Scientific terms such as interstellar space, radio signal, and Golden Record may be introduced, but should be explained in simple language.

Secondary audiences

Parents and families

Explore mission facts together.

Review learning activities.

Share the archive.

Educators

Use mission pages as educational resources.

Assign short activities.

Reference verified scientific sources.

Astronomy groups and observatories

Share educational resources.

Review aggregate engagement.

Suggest future missions or learning activities.

Core visitor journey

A visitor opens Pale Blue Dot.

The homepage introduces the platform.

The visitor selects Voyager 1.

The visitor explores the mission overview and timeline.

The visitor completes an activity or opens a discovery.

The application records a privacy-conscious visit event.

The visitor can optionally leave feedback or a guestbook entry.

Administrators can view aggregate usage through a protected dashboard.



4\. Functional Requirements

4.1 Homepage

The homepage must provide:

Pale Blue Dot branding and tagline.

A short introduction to the archive.

Featured mission cards.

A prominent Voyager 1 entry point.

Links to interactive learning activities.

A mission timeline preview.

A clear explanation of the educational purpose.

Attribution and privacy information.

The homepage must remain useful when additional missions are added.

4.2 Mission archive

Each mission should be represented as structured data rather than content hardcoded throughout the frontend.

A mission page should support:

Mission name and identifier.

Space agency or responsible organization.

Launch date.

Mission status, including the date on which status was last verified.

Mission purpose.

Spacecraft description.

Important instruments.

Major discoveries.

Timeline milestones.

Images and captions.

Educational facts.

Interactive activities.

Official references and citations.

Last-updated date.

Mission content must distinguish between confirmed facts, simplified educational explanations, and simulations.

4.3 Voyager 1 mission page

The initial Voyager 1 page should contain these sections:

Meet Voyager 1.

Why NASA sent Voyager.

Meet the spacecraft's major parts.

Launch and journey.

Jupiter and its moons.

Io and its volcanoes.

Saturn and Titan.

The family portrait of the Solar System.

The Pale Blue Dot.

The Golden Record.

Leaving the Sun's protective bubble.

Communicating across enormous distances.

Powering a spacecraft far from the Sun.

Mission status and continuing legacy.

What future explorers can learn from Voyager.

Use a clear date and source for time-sensitive claims. Mission status, operating instruments, power estimates, and communication delays must be verified before publication and periodically reviewed.

4.4 Mission timeline

Provide a chronological timeline with important milestones.

Initial milestones should include:

September 5, 1977 — Voyager 1 launches.

1979 — Voyager 1 encounters Jupiter.

1980 — Voyager 1 encounters Saturn.

February 14, 1990 — Voyager 1 takes the images used for the Solar System family portrait, including the Pale Blue Dot.

1990 — Voyager 1's cameras are turned off to conserve resources.

2012 — Voyager 1 enters interstellar space, according to NASA's mission determination.

For each timeline entry, include a short explanation, an optional image, and a source reference.

Dates and descriptions must be checked against official mission references before release.

4.5 Mission facts

Each mission should provide a collection of short facts.

Example Voyager 1 facts:

Voyager 1 was launched in 1977.

It explored Jupiter and Saturn.

Its observations helped scientists learn more about Jupiter's moons and Saturn's rings.

It carries a Golden Record intended to represent Earth and humanity.

Its Pale Blue Dot image shows Earth as a tiny point from a great distance.

Its communications take many hours to travel between Earth and the spacecraft.

Every factual claim should be associated with a reliable source in the mission data or content documentation.

4.6 Interactive learning activities

The first release should contain approximately 25 short activities. These can be delivered as reusable templates with mission-specific content rather than 25 independently implemented applications.

Initial activity list:

Meet Voyager 1

Meet the Parts

Blast Off

Where Did It Go?

Why Did NASA Send It?

Hello, Jupiter!

Io: The Moon with Volcanoes

Jupiter's Moon Family

Wow, Saturn!

Meet Titan

One Last Look at Home

The Pale Blue Dot

Why Did the Cameras Stop?

A Golden Message from Earth

Who Might Find Our Message?

Beyond the Sun's Bubble

How Do We Talk to Voyager?

How Long Does a Message Take?

How Does Voyager Get Power?

Is Voyager Still Working?

How Far Can Voyager Go?

Voyager's Amazing Discoveries

What Should We Save?

Make Your Voyager Memory Card

Voyager: Not Forgotten!

Each activity should define:

Unique activity identifier.

Title and short description.

Learning objective.

Instructions.

Content or question.

Available answers, when applicable.

Correct answer and explanation.

Hint.

Success message.

Retry behavior.

Optional illustration.

Scientific source references.

Use reusable activity types such as multiple choice, ordering, matching, timeline exploration, image discovery, and simple estimation.

Learning design requirements

No negative or discouraging feedback.

Allow children to retry.

Explain why an answer is correct.

Do not require registration.

Avoid time pressure.

Support keyboard and touch interaction.

Keep reading requirements appropriate for early elementary school.

4.7 Simulated radio communication

Provide an optional activity demonstrating how a message travels from Earth to Voyager 1 and back.

This is an educational simulation, not a live connection to NASA or Voyager.

Requirements:

Clearly label the experience as a simulation.

Allow a visitor to select or enter a simple sample message.

Show an Earth-to-spacecraft communication animation.

Illustrate the delay using a simplified, configurable value.

Explain that the actual one-way delay depends on the spacecraft's distance and changes over time.

Avoid claiming that the application transmits messages to the real spacecraft.

A roughly 24-hour one-way delay may be used as an illustrative value only after verification and with an explicit explanation that the real delay varies.

4.8 Learning progress

For the initial release, learning progress may be stored locally in the visitor's browser.

Track only what is necessary, such as:

Activities completed.

Optional completion percentage.

A simple indication of activities already explored.

Do not require an account.

Progress must not be treated as a verified identity or reliable cross-device profile. Visitors should be able to reset their local progress.

4.9 Optional guestbook

Provide a voluntary guestbook for visitors who want to leave a message.

Possible fields:

Display name or nickname.

Optional organization.

Optional country or broad region.

Message.

Consent to display the submission publicly.

Requirements:

Do not require real names.

Clearly label all fields that are optional.

Moderate entries before public display.

Validate and limit message length.

Apply rate limiting and abuse prevention.

Provide a way to remove inappropriate submissions.

Avoid soliciting personal information from children.

Do not automatically publish an organization's identity based on a visitor's IP address or inferred location.

The guestbook may be deferred until the core mission archive and analytics are stable.



5\. Visitor Analytics and Privacy

5.1 Purpose

Analytics should help administrators understand how the archive is being used.

The system should answer questions such as:

How many visits did the site receive?

Which pages were visited most often?

How has traffic changed over time?

Which broad geographic regions contributed visits, when reliable information is available?

Which referring websites or campaigns brought visitors?

Which educational activities were opened or completed?

5.2 Important identity limitation

A page visit does not reveal a person's verified identity or prove that a particular organization visited.

The system must not claim to identify individual visitors or specific observatories from anonymous traffic.

If an observatory or educational organization wants to be identified, it can voluntarily submit a guestbook entry or provide a separate contact form submission.

5.3 Analytics events

Use a small set of event types:

page\_view

activity\_started

activity\_completed

guestbook\_submitted

Only implement the events needed for the initial release.

An event may contain:

Event identifier.

UTC timestamp.

Event type.

Page path or resource identifier.

Optional referring domain.

Optional campaign identifier.

Coarse device category.

Short-lived random session identifier, if needed for session-level counting.

Do not collect:

Passwords.

Form contents unrelated to the analytics event.

Full query strings that may contain personal information.

Raw IP addresses in the analytics event store.

Browser fingerprinting attributes.

Precise location.

Sensitive personal attributes.

Avoid third-party analytics trackers unless a clear requirement and appropriate privacy review justify their use.

5.4 Geographic reporting

Geographic reporting is optional.

If implemented, it must use a privacy-conscious approach and show broad regions or countries rather than precise addresses.

Do not retain precise visitor coordinates.

Do not treat inferred geography as certain.

Show an unknown category when location is unavailable.

Document the source and limitations of geographic estimates.

Do not identify individual visitors or organizations from geographic data.

Review web-server, reverse-proxy, and infrastructure logs separately. Even if application analytics omit raw IP addresses, infrastructure logs may retain them.

Configure log retention and access controls according to the actual deployment environment.

5.5 Privacy notice

Publish a concise privacy notice describing:

Which events are collected.

Why they are collected.

How long records are retained.

Whether broad geography is estimated.

Whether a guestbook is available.

How a visitor can request removal of a voluntary submission.

How to contact the project administrator.

Review applicable privacy requirements before release, including children's privacy requirements such as COPPA when applicable.



6\. Administrator Dashboard

Provide a protected dashboard for project administrators.

Dashboard metrics

Total page views for a selected period.

Daily visit counts.

Most visited pages.

Most frequently opened activities.

Activity completion counts.

Referring domains.

Campaign performance, when campaign tags are used.

Broad geographic breakdown, if enabled.

Guestbook submissions awaiting moderation, if guestbook support is enabled.

Reporting requirements

Support a default date range and custom date filters.

Display the last update time.

Distinguish page views from unique sessions.

Explain that session counts are estimates, not verified people.

Handle missing or malformed analytics records gracefully.

Avoid displaying sensitive event-level data when aggregate results are sufficient.

Administrator authentication

Never expose the dashboard publicly without authentication.

Prefer an established authentication mechanism or identity-aware access control where practical.

Do not implement a custom password system unless necessary.

Do not store plaintext credentials.

Keep secrets outside source control.

Apply authorization checks on the server for every administrative endpoint.

Protect guestbook moderation endpoints separately from public read endpoints.



7\. Technical Architecture

7.1 Recommended stack

Layer

Technology

Frontend

React, TypeScript, Vite

Styling

CSS modules or an existing project styling system

Backend

Node.js, TypeScript, Express

Validation

Zod or an equivalent schema-validation library

Public content

JSON mission files

Analytics storage

Append-only JSON Lines files

Local learning progress

Browser local storage

Web server / proxy

Existing deployment infrastructure

Hosting

Existing Google Cloud VM

Testing

Vitest and suitable API integration tests

Deployment

Existing VM deployment process, automated where practical



Before introducing new infrastructure, inspect the existing VM, repository, runtime versions, proxy configuration, deployment process, and security controls.

If an established application stack already exists, reuse it when that is simpler and safe. Do not rebuild unrelated infrastructure solely to match this specification.

7.2 High-level architecture

Visitor Browser

&#x20;     |

&#x20;     v

HTTPS / Existing Reverse Proxy

&#x20;     |

&#x20;     v

Pale Blue Dot Web Application

&#x20;     |

&#x20;     +---- React Frontend

&#x20;     |

&#x20;     +---- Express API

&#x20;              |

&#x20;              +---- Mission JSON Files

&#x20;              |

&#x20;              +---- Analytics JSONL Files

&#x20;              |

&#x20;              +---- Optional Guestbook Files

&#x20;              |

&#x20;              +---- Protected Admin APIs



Private Persistent Storage

&#x20;     |

&#x20;     +---- Backups outside the application deployment directory

7.3 No separate database

The first release must not require a database server.

Use JSON files for curated mission content and JSON Lines files for append-only analytics.

File-based storage is appropriate for an initial, low-volume educational archive, provided the implementation handles concurrent writes, validation, backup, recovery, and retention correctly.

Do not assume that JSONL files will remain sufficient at every future scale. Define an abstraction around storage so a database can be introduced later without rewriting the entire application.

7.4 Suggested repository layout

beyonds​ignal/

├── README.md

├── PROJECT\_SPEC.md

├── package.json

├── .gitignore

├── .env.example

├── docs/

│   ├── ARCHITECTURE.md

│   ├── DATA\_MODEL.md

│   ├── PRIVACY.md

│   ├── DEPLOYMENT.md

│   ├── BACKUP\_RESTORE.md

│   └── CONTENT\_SOURCES.md

├── apps/

│   ├── web/

│   │   ├── src/

│   │   │   ├── components/

│   │   │   ├── pages/

│   │   │   ├── features/

│   │   │   ├── services/

│   │   │   └── styles/

│   │   └── tests/

│   └── api/

│       ├── src/

│       │   ├── routes/

│       │   ├── services/

│       │   ├── storage/

│       │   ├── validation/

│       │   ├── middleware/

│       │   └── config/

│       └── tests/

├── data/

│   └── missions/

│       └── voyager-1.json

└── scripts/

&#x20;   ├── validate-missions.ts

&#x20;   └── backup-data.sh

The repository's data/ directory contains version-controlled, curated content. It must not contain production visitor analytics, guestbook submissions, secrets, or backups.

Important: the directory name above is illustrative. The repository's production name should be beyonds​ignal without any personal name; remove the invisible formatting character if copying the example and use the normal spelling beyonds​ignal as beyonds​ignal only if your editor preserves it correctly. Prefer the simple repository name pale-blue-dot to avoid this issue.

7.5 Persistent server-side storage

Use a directory outside the public web root and outside the application release directory, for example:

/var/lib/pale-blue-dot/

├── analytics/

│   └── 2026-10-11.jsonl

├── guestbook/

│   └── submissions.jsonl

├── exports/

└── metadata/

Use the actual deployment date when naming daily analytics files; the example filename is illustrative.

Requirements:

Configure the storage path through environment variables.

Restrict directory and file permissions.

Ensure the application service account has only the permissions it needs.

Never serve the storage directory as static website content.

Keep persistent data intact across application deployments.

Back up data outside the VM.

Test restoration regularly.

7.6 Concurrent writes and integrity

The analytics writer must safely handle concurrent requests.

Use a serialized write queue or another appropriate append strategy to prevent interleaving and data corruption. Define behavior for disk-full conditions, permission failures, partial writes, and malformed existing records.

Do not silently report success when an event could not be persisted. For analytics, a deliberate best-effort policy may be acceptable, but failures must be observable through operational logs and documented.

Avoid keeping an unbounded in-memory queue.



8\. Data Model

8.1 Mission schema

A mission record should include fields similar to:

{

&#x20; "id": "voyager-1",

&#x20; "name": "Voyager 1",

&#x20; "category": "deep-space",

&#x20; "agency": "NASA",

&#x20; "launchDate": "1977-09-05",

&#x20; "summary": "A spacecraft that explored the outer planets and continued into interstellar space.",

&#x20; "status": {

&#x20;   "label": "Verify before publication",

&#x20;   "lastVerified": null,

&#x20;   "sourceIds": \[]

&#x20; },

&#x20; "timeline": \[],

&#x20; "facts": \[],

&#x20; "activities": \[],

&#x20; "images": \[],

&#x20; "sources": \[],

&#x20; "lastUpdated": null

}

This is an illustrative schema, not a complete, publication-ready record. Populate factual fields only after verifying them against reliable sources.

8.2 Timeline item

{

&#x20; "id": "jupiter-encounter",

&#x20; "date": "1979",

&#x20; "title": "Voyager 1 explores Jupiter",

&#x20; "description": "Voyager 1 sends back observations of Jupiter and its moons.",

&#x20; "imageId": null,

&#x20; "sourceIds": \[]

}

Use a year-only value when the exact day is unnecessary or has not been verified.

8.3 Fact item

{

&#x20; "id": "golden-record",

&#x20; "title": "A message from Earth",

&#x20; "text": "Voyager 1 carries a Golden Record containing sounds and images representing Earth.",

&#x20; "sourceIds": \[]

}

8.4 Source record

{

&#x20; "id": "nasa-voyager-mission",

&#x20; "title": "NASA Voyager Mission Overview",

&#x20; "publisher": "NASA",

&#x20; "url": "https://science.nasa.gov/mission/voyager/",

&#x20; "accessedDate": null

}

Verify URLs, page titles, and claims before publication. Store source identifiers on facts, timeline entries, and educational activities so information can be traced to its origin.

8.5 Analytics record

Each line in a JSONL file represents one independent JSON object.

Example:

{

&#x20; "eventId": "generated-random-id",

&#x20; "timestamp": "2026-10-11T18:00:00.000Z",

&#x20; "type": "page\_view",

&#x20; "path": "/missions/voyager-1",

&#x20; "referrerDomain": null,

&#x20; "campaign": null,

&#x20; "deviceCategory": "desktop",

&#x20; "sessionId": null

}

The example values are illustrative. Generate identifiers securely and use a short-lived, random session identifier only if session-level measurement is required.

Do not add raw IP addresses, full user-agent strings, precise location, or personal information to the event schema.

8.6 Data validation

Validate mission JSON against a defined schema.

Validate analytics events before persistence.

Reject unknown or malformed request fields where appropriate.

Enforce maximum string lengths and request sizes.

Validate guestbook entries before writing them.

Provide a script that checks mission files and source references before deployment.



9\. API Design

Use a versioned API prefix such as /api/v1.

Public endpoints

Method

Endpoint

Purpose

GET

/api/v1/health

Basic service health

GET

/api/v1/missions

List published missions

GET

/api/v1/missions/:id

Retrieve one mission

GET

/api/v1/missions/:id/facts

Retrieve mission facts

POST

/api/v1/analytics/events

Record an allowed analytics event

POST

/api/v1/guestbook

Optional guestbook submission



Only expose endpoints required by the active features.

Protected administrator endpoints

Method

Endpoint

Purpose

GET

/api/v1/admin/summary

Aggregate metrics

GET

/api/v1/admin/pages

Popular pages

GET

/api/v1/admin/activities

Activity engagement

GET

/api/v1/admin/referrers

Referring domains

GET

/api/v1/admin/geography

Optional broad geographic totals

GET

/api/v1/admin/guestbook

Optional moderation queue

POST

/api/v1/admin/guestbook/:id/moderate

Optional moderation action



Every administrator endpoint must enforce server-side authentication and authorization.

API requirements

Use HTTPS in production.

Validate all inputs.

Apply rate limiting to public write endpoints.

Set reasonable request-size limits.

Return consistent error responses.

Avoid returning filesystem paths, stack traces, secrets, or raw stored records unnecessarily.

Do not expose private storage files through static hosting.

Use structured operational logs that avoid sensitive content.



10\. Content Accuracy and Source Policy

Science accuracy is a core requirement.

Preferred source hierarchy

Official NASA mission pages.

NASA Jet Propulsion Laboratory mission resources.

Other relevant official space-agency publications.

Peer-reviewed scientific publications for technical details.

Reputable educational resources for age-appropriate explanations.

Content requirements

Associate factual claims with sources.

Record when time-sensitive facts were last checked.

Distinguish confirmed information from estimates.

Explain scientific uncertainty in accessible language.

Do not invent discoveries, mission status, communication statistics, or quotations.

Check image usage rights and provide required credits.

Recheck time-sensitive status before each major release.

Initial source collection

Begin with official resources such as:

NASA Voyager mission overview: https://science.nasa.gov/mission/voyager/

NASA Jet Propulsion Laboratory: https://www.jpl.nasa.gov/

NASA Solar System Exploration: https://science.nasa.gov/solar-system/

Locate the most specific official references for individual claims, including the Golden Record, Jupiter and Saturn encounters, the Pale Blue Dot, and Voyager's interstellar mission.

Do not treat a general homepage as proof of every detailed claim.



11\. User Interface and Accessibility

Design requirements

Responsive layout for desktop, tablet, and mobile.

Clear navigation between archive, mission details, timeline, and activities.

Consistent typography and spacing.

Readable text with adequate contrast.

Large interactive targets for children.

Visible keyboard focus.

Accessible labels for controls.

Alternative text for meaningful images.

Reduced-motion support.

No audio that plays automatically.

Optional read-aloud controls.

Performance requirements

Optimize images and serve appropriately sized assets.

Lazy-load nonessential images.

Avoid loading large libraries for simple activities.

Cache public mission content where appropriate.

Keep the initial page lightweight.

Ensure a temporary analytics failure does not prevent visitors from exploring mission content.

Error states

Provide understandable messages for:

A missing mission.

An unavailable activity.

A failed analytics request.

An unavailable image.

A failed administrator request.

The visitor-facing educational content should remain usable if analytics are unavailable.



12\. Security Requirements

Keep secrets and credentials outside source control.

Include .env.example without actual secrets.

Validate and sanitize external input.

Escape user-generated content when rendering.

Protect administrator endpoints.

Apply rate limits to write operations.

Prevent path traversal and arbitrary file access.

Avoid accepting arbitrary filesystem paths from requests.

Set suitable security headers.

Restrict CORS to approved origins when cross-origin requests are needed.

Use least-privilege service-account permissions.

Keep runtime dependencies updated.

Do not expose stack traces in production.

Do not collect unnecessary personal information.

Do not use analytics for covert visitor identification.

The health endpoint should reveal only minimal operational status.



13\. Deployment on the Existing Google Cloud VM

13.1 Initial environment inspection

Before implementing deployment changes, document:

Operating system and supported runtime.

Current application processes.

Existing web server or reverse proxy.

TLS certificate and domain configuration.

Firewall and network rules.

Service-account permissions.

Existing deployment scripts.

Current logging and monitoring.

Available persistent disk space.

Existing backup process.

Do not change unrelated services or firewall rules without a clear requirement.

13.2 Production deployment

The deployment should:

Build and test the frontend.

Build the backend.

Validate mission data.

Deploy versioned application artifacts.

Restart or reload the service using the existing process-management approach.

Check service health.

Verify the homepage and Voyager page.

Verify analytics persistence.

Verify administrator authentication.

Preserve all existing persistent data.

Use a non-root service account where practical.

13.3 Environment configuration

Provide documented configuration for:

Application environment.

API port.

Public base URL.

Persistent data directory.

Administrator authentication integration.

Allowed origins, if applicable.

Analytics retention.

Guestbook feature flag.

Logging level.

Never place production secrets in committed files.

13.4 Backups and recovery

Back up persistent mission-related operational data and guestbook submissions as appropriate.

Store backups separately from the VM.

Avoid including secrets unnecessarily.

Define a retention policy.

Test restoring data to a clean location.

Document recovery steps.

Verify that a deployment does not overwrite production analytics or submissions.

Mission content in Git can be restored through version control. Production-generated records require a separate backup plan.



14\. Testing Strategy

Unit tests

Test:

Mission schema validation.

Source-reference validation.

Analytics event validation.

JSONL serialization and parsing.

Daily file naming and UTC date handling.

Date-range filtering.

Aggregate metric calculations.

Input validation and sanitization.

Guestbook validation, if implemented.

API integration tests

Test:

Mission list and detail endpoints.

Missing mission responses.

Valid analytics event persistence.

Invalid event rejection.

Concurrent event submissions.

Administrator authorization.

Rate limiting.

Guestbook moderation permissions.

Storage failure behavior.

Frontend tests

Test:

Homepage navigation.

Mission detail rendering.

Timeline display.

Activity answer and retry flows.

Progress persistence and reset.

Accessible control labels.

Error and loading states.

End-to-end smoke tests

Before each production release, verify:

Homepage loads over HTTPS.

Voyager 1 page loads.

Timeline displays.

At least one activity can be completed.

A permitted analytics event is recorded.

The administrator dashboard is protected.

Aggregate metrics reflect test events.

Production storage remains outside the public web root.

The backup and restore procedure works.

Use test data or a staging environment so test events do not distort production reports.



15\. Operational Observability

Record useful operational events, including:

Application startup and shutdown.

Health-check results.

Storage failures.

Invalid mission data.

Failed backups.

Authentication failures at a suitably summarized level.

Unexpected API errors.

Do not log message contents, guestbook content, secrets, raw IP addresses, or unnecessary personal data.

Provide:

A health endpoint.

A storage-writability check suitable for administration.

A documented backup procedure.

A documented restore procedure.

A simple way to validate mission data.

Do not make the health endpoint disclose private filesystem locations or infrastructure secrets.



16\. Physical Presentation and QR Code

The online archive can be supported by a physical science presentation.

Suggested title

Voyager 1: A Journey Beyond Our Solar System

Three-panel board

Left panel — Meet Voyager

Voyager 1 spacecraft illustration.

Launch date.

Jupiter and Saturn encounters.

Io's volcanic activity.

Titan and Saturn's rings.

Center panel — The Journey

A clear mission timeline.

A Pale Blue Dot image with appropriate credit.

A short explanation of how far Voyager has traveled.

A flat printed or handmade spacecraft illustration.

Right panel — A Message into Space

The Golden Record.

How radio communication works.

Why communication takes so long.

A QR code linking to the Pale Blue Dot Voyager 1 experience.

A flat printed illustration or simple paper-and-foil model is sufficient. An elaborate 3D model is not a requirement.

QR code requirements

Generate the QR code only after the final HTTPS URL is confirmed.

Test it on multiple phones.

Ensure the destination works on mobile.

Keep the URL stable.

Print a readable short URL below the QR code as a fallback.

Avoid including tracking parameters that reveal personal information.



17\. Implementation Plan

Build the system in small, verifiable increments.

Phase 1 — Inspect and establish the foundation

Inspect the existing repository and VM.

Confirm runtime and deployment constraints.

Establish repository structure.

Create README.md, PROJECT\_SPEC.md, and .env.example.

Set up linting, type checking, and tests.

Create a minimal homepage.

Confirm local development and production build.

Exit criteria: the application builds, tests run, and the deployment approach is documented.

Phase 2 — Build the Voyager vertical slice

Define the mission schema.

Add a sourced Voyager 1 JSON record.

Implement mission list and detail APIs.

Implement the Voyager mission page.

Add a timeline and several verified facts.

Validate mission data automatically.

Exit criteria: a visitor can navigate from the homepage to a useful Voyager 1 page, and the mission data is validated.

Phase 3 — Implement file-based analytics

Define the analytics event schema.

Implement safe JSONL persistence.

Partition files by UTC date.

Add event validation and rate limiting.

Add operational error logging.

Implement basic aggregate calculations.

Exit criteria: permitted page-view events can be recorded, concurrent writes are tested, and no raw IP address is stored in application analytics.

Phase 4 — Add the protected dashboard

Integrate administrator authentication.

Add daily and total visit metrics.

Add popular-page reporting.

Add referring-domain reporting.

Add activity engagement reporting.

Test access control and date filtering.

Exit criteria: only authorized administrators can access analytics reports, and all displayed counts have documented definitions.

Phase 5 — Build reusable learning activities

Implement reusable activity components.

Add the first five activities.

Test answers, hints, retry behavior, and explanations.

Add local progress.

Add accessibility support.

Add the remaining activities incrementally.

Exit criteria: activities are usable by the target audience and share a consistent, data-driven implementation.

Phase 6 — Complete content and optional guestbook

Complete and verify the Voyager timeline.

Add image credits and source references.

Add the remaining learning activities.

Implement guestbook moderation only if time permits.

Review privacy and child-safety implications.

Exit criteria: all published content is source-checked, and optional user-generated content cannot be published without the intended moderation process.

Phase 7 — Production hardening

Configure HTTPS and service permissions.

Verify persistent storage and backups.

Test restore procedures.

Run end-to-end smoke tests.

Test mobile layouts.

Review accessibility and security.

Confirm that deployments preserve production data.

Exit criteria: the application can be deployed and recovered without losing persistent records.

Phase 8 — Public launch and presentation

Deploy the stable release.

Verify all public links.

Generate and test the QR code.

Prepare the physical presentation.

Explain the project's learning goals and data privacy.

Document future mission additions.

Exit criteria: the public site is stable, the QR code works, and the demonstration can be completed reliably.



18\. Acceptance Criteria for the First Release

The first release is complete when all of the following are true:

Pale Blue Dot has a responsive public homepage.

Voyager 1 has a sourced mission page.

The mission timeline displays correctly.

Mission content is stored separately from frontend code.

Mission data validation runs automatically.

At least five interactive learning activities work end to end.

Activities provide explanations and allow retries.

The application records permitted analytics events in JSONL files.

Analytics records contain no raw IP addresses.

The visitor dashboard is not publicly accessible.

Administrator APIs enforce authentication and authorization.

Analytics failure does not prevent educational content from loading.

Production data is stored outside the public web root.

Production data survives application deployment.

Backups are stored separately from the VM.

A restore test has been completed.

Scientific claims have traceable references.

Image credits and usage requirements are satisfied.

The privacy notice is published.

The deployed website works on mobile.

The QR code has been tested.

The project does not claim to be an official NASA product.



19\. Future Enhancements

Do not implement these before the core archive is stable.

Potential future work:

Voyager 2 and New Horizons mission archives.

Other historical and active spacecraft.

Additional activity templates.

Educator resource pages.

Curated observatory or astronomy-group contributions.

Optional mission-content review workflow.

Additional visualizations and educational timelines.

More detailed aggregate reporting.

A migration to a database if traffic, concurrency, or operational requirements justify it.

Verified live mission-status integrations, where a reliable official data source exists.

Future mission additions should primarily require new validated content files and reusable activity definitions, not new application architecture.



20\. Development Principles

Build the smallest complete vertical slice first. Do not build every feature before proving the storage and deployment design.

Keep the content data-driven. Mission pages should be generated from validated data.

Prefer simplicity. Do not add a database, message queue, orchestration platform, or paid AI service without a demonstrated need.

Protect production data. Deployment must never overwrite analytics or submissions.

Treat privacy as a product requirement. Do not attempt to identify anonymous visitors covertly.

Verify science. Every important factual claim should have a traceable source.

Design for future missions. Avoid Voyager-specific assumptions in shared components.

Make learning enjoyable. Activities should encourage curiosity, not test-taking anxiety.

Keep operational work documented. Someone else should be able to deploy, back up, and restore the application.

Preserve the educational purpose. The project should help people understand space exploration, not merely demonstrate technical complexity.



21\. GitHub Copilot Master Implementation Prompt

Use the following prompt when beginning implementation:

You are a senior full-stack engineer implementing Pale Blue Dot, a reusable educational space-mission archive.

Read PROJECT\_SPEC.md, README.md, and the architecture documents before changing code.

The first featured mission is Voyager 1. The application must be designed to support future spacecraft missions through validated, data-driven content rather than mission-specific hardcoding.

The recommended stack is React, TypeScript, Vite, Node.js, TypeScript, and Express. The application will run on an existing Google Cloud VM. Production persistence must initially use mission JSON files and append-only JSONL files; do not introduce a separate database server.

Begin by inspecting the repository, runtime environment, deployment process, and existing infrastructure. Reuse appropriate existing components and infrastructure. Do not replace unrelated systems.

Implement the system in small phases:

Foundation, project structure, linting, and tests.

Mission schema, sourced Voyager 1 content, and mission APIs.

Voyager 1 page and timeline.

Validated, privacy-conscious JSONL analytics.

Protected administrator dashboard.

Reusable educational activity framework.

Production hardening, backups, deployment, and documentation.

Before each phase, state the planned changes and acceptance criteria. After implementation, run the relevant tests, type checks, and build. Summarize what changed, what passed, and any remaining risks.

Requirements:

Keep persistent production data outside the public web root and application release directory.

Make concurrent analytics writes safe.

Never store raw IP addresses in application analytics.

Do not implement covert visitor identification.

Protect every administrator endpoint with server-side authorization.

Validate inputs and stored mission data.

Do not publish guestbook submissions automatically unless the intended moderation policy explicitly permits it.

Keep scientific claims traceable to reliable sources.

Make learning activities accessible and suitable for young children.

Ensure analytics failures do not break public educational pages.

Never commit credentials, secrets, production analytics, or guestbook submissions.

Preserve existing production data during deployment.

Document backup and restore procedures and test them.

Do not implement the entire project in one enormous change. First deliver a working vertical slice: homepage → Voyager 1 mission page → validated page-view event → JSONL persistence → protected aggregate dashboard → verified backup and restore procedure.

Do not claim that a feature is complete until its tests and acceptance criteria have been checked.



22\. First Engineering Milestone

The first milestone is intentionally small:

Homepage → Voyager 1 page → visit event → JSONL persistence → protected analytics summary → backup and restore verification.

This proves the essential architecture before investing time in all 25 activities, extensive visual design, or optional features.

Once this vertical slice works reliably on the existing VM, expand the educational experience incrementally.





