# Google Calendar booking setup (Apps Script method)

The booking flow checks your Google Calendar for availability (2 jobs per
3-hour window) and creates an event after a customer pays.

We use a small **Google Apps Script web app** bound to your calendar instead of
a service-account key. This avoids the "Service account key creation is disabled"
org policy (`iam.disableServiceAccountKeyCreation`) and needs no Google Cloud
Console at all. About 10 minutes, one-time.

You'll end up with two values in `onyx-site/.env.local`:

```
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
GOOGLE_APPS_SCRIPT_SECRET=some-long-random-string
```

---

## Part A — Create the script

1. Go to **https://script.google.com** (sign in with the Google account whose
   calendar should hold bookings) → **New project**.
2. Rename it `Onyx Booking` (top left).
3. Open **Project Settings** (gear icon) → set **Time zone** to
   **America/Los_Angeles**.
4. Back in the editor, delete any sample code and paste the entire script from
   **Part D** below.
5. At the top of the script, set `SECRET` to a long random string (make one up,
   e.g. 30+ characters). Remember it for Part C.
   - Leave `CALENDAR_ID` as `'primary'` to use your main calendar, or paste a
     specific calendar's ID.

## Part B — Deploy it as a web app

1. Click **Deploy → New deployment**.
2. Click the gear next to "Select type" → **Web app**.
3. Set **Execute as: Me**, and **Who has access: Anyone**.
   (Anyone can *reach* the URL, but every request must include your secret, so
   only your site can actually use it.)
4. **Deploy**. Approve the Google permission prompt the first time (it asks to
   manage your calendars — that's expected; click Advanced → Go to Onyx Booking
   if it warns the app is unverified, since it's your own script).
5. Copy the **Web app URL** (ends in `/exec`).

## Part C — Add the two values to `.env.local`

In `onyx-site/.env.local`:

```
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
GOOGLE_APPS_SCRIPT_SECRET=the-same-long-random-string-you-put-in-the-script
```

Then restart the dev server: `npm run dev`.

## Part D — The Apps Script (paste this whole thing)

```javascript
// Onyx booking calendar bridge. Deploy as Web app (Execute as: Me, Access: Anyone).
// Project Settings -> Time zone -> America/Los_Angeles.
const SECRET = 'PASTE_A_LONG_RANDOM_STRING';   // must match GOOGLE_APPS_SCRIPT_SECRET
const CALENDAR_ID = 'primary';                  // or a specific calendar id
const CAPACITY = 2;                             // jobs allowed per 3-hour window
const WINDOWS = [
  { label: '7:00 to 10:00 AM',  start: 7,  end: 10 },
  { label: '10:00 AM to 1:00 PM', start: 10, end: 13 },
  { label: '1:00 to 4:00 PM',   start: 13, end: 16 },
  { label: '4:00 to 7:00 PM',   start: 16, end: 19 },
];

// Visiting the /exec URL in a browser hits this — confirms the deploy is live.
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, service: 'onyx-calendar' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var out;
  try {
    var body = JSON.parse(e.postData.contents);
    if (body.secret !== SECRET) out = { error: 'unauthorized' };
    else if (body.action === 'availability') out = { windows: availability_(body.date) };
    else if (body.action === 'book') out = book_(body);
    else out = { error: 'unknown_action' };
  } catch (err) {
    out = { error: String(err) };
  }
  return ContentService.createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}

function cal_() {
  return CALENDAR_ID === 'primary'
    ? CalendarApp.getDefaultCalendar()
    : CalendarApp.getCalendarById(CALENDAR_ID);
}
function pad_(n) { return (n < 10 ? '0' : '') + n; }
function at_(date, h) { return new Date(date + 'T' + pad_(h) + ':00:00'); }

function availability_(date) {
  var c = cal_();
  return WINDOWS.map(function (w) {
    var evs = c.getEvents(at_(date, w.start), at_(date, w.end));
    var remaining = Math.max(0, CAPACITY - evs.length);
    return { label: w.label, available: remaining > 0, remaining: remaining };
  });
}

function book_(b) {
  var c = cal_();
  var w = WINDOWS.filter(function (x) { return x.label === b.window; })[0];
  if (!w || !b.date) return { ok: false, reason: 'invalid_window' };

  // Idempotent per Stripe session (so a /return refresh won't duplicate).
  if (b.sessionId) {
    var dayEvents = c.getEvents(at_(b.date, 0), at_(b.date, 23));
    for (var i = 0; i < dayEvents.length; i++) {
      if ((dayEvents[i].getDescription() || '').indexOf('session:' + b.sessionId) !== -1) {
        return { ok: true, eventId: dayEvents[i].getId() };
      }
    }
  }

  var evs = c.getEvents(at_(b.date, w.start), at_(b.date, w.end));
  if (evs.length >= CAPACITY) return { ok: false, reason: 'window_full' };

  var title = 'Onyx service: ' + (b.appliance || 'Appliance') + ' for ' + (b.name || 'customer');
  var desc = [
    'Appliance: ' + (b.appliance || ''),
    'Issue: ' + (b.issue || ''),
    'Name: ' + (b.name || ''),
    'Phone: ' + (b.phone || ''),
    'Email: ' + (b.email || ''),
    'Reference: ' + (b.ref || ''),
    'session:' + (b.sessionId || ''),
    '$95 diagnostic paid via Stripe.'
  ].join('\n');
  var loc = [b.address, b.city].filter(function (x) { return x; }).join(', ');

  var ev = c.createEvent(title, at_(b.date, w.start), at_(b.date, w.end), { description: desc, location: loc });
  return { ok: true, eventId: ev.getId() };
}
```

## Part E — Test

1. Go to **http://localhost:3000/book**, pick a date → each window shows
   **(2 left)**. Add 2 events to that calendar in a window, reload → it shows
   **(full)** and is unselectable.
2. Fill the form and pay (use Stripe **test** keys + card `4242 4242 4242 4242`).
   After payment an event *"Onyx service: … for …"* appears on your calendar.

## Notes

- **Re-deploying the script:** after editing the code, do **Deploy → Manage
  deployments → (edit) → Version: New version → Deploy** so the URL stays the same.
- **Counts every timed event** in a window toward the limit of 2. For a
  jobs-only count, make a dedicated calendar and set `CALENDAR_ID` to its ID.
- **Production (Vercel):** add `GOOGLE_APPS_SCRIPT_URL` + `GOOGLE_APPS_SCRIPT_SECRET`
  (and the Stripe keys) in the Vercel project settings.
- Until configured, the site treats all windows as open and skips event creation.
