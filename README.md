# שמש הובלות — two campaign landing pages

Hebrew RTL static pages built from the original company poster and favicon.

## Campaign destinations

- `index.html`: small moves and individual items.
- `apartments.html`: one-, two-, and three-room apartment moves.

Both use `styles.css`, `campaign.js`, `shemesh-original.jpg`, and `favicon.png`. The original brand assets are unchanged. Hebrew Heebo font files are self-hosted, with their license in `OFL-Heebo.txt`. Each page has distinct search metadata, service copy, FAQ content, and WhatsApp messages. There are discreet links between the two pages.

Pickup and destination are both within Haifa and the Krayot. Disassembly/reassembly is available as part of moving, not as a standalone handyman service. The pages contain no invented reviews, guarantees, insurance claims, or fixed price promises.

## Measurement preparation

Clicking a contact link queues a `contact_click` event in `window.dataLayer`, with `contact_method`, `contact_placement`, and `service_type` (`small` or `apartment`). These are local event hooks only. Google Analytics, Google Ads, Tag Manager, and Meta Pixel are not installed; no analytics are transmitted.

Connect the real measurement account and an appropriate privacy/consent setup before measuring campaigns. Contact clicks represent intent, not sent WhatsApp messages, qualified inquiries, quotes, or booked jobs. Record actual outcomes separately. Normal advertising URL query parameters do not interfere with the page. No campaign parameters or personal information are copied into analytics events.

Quote messages are prepared locally. Visitors complete and send them in WhatsApp. The pages have no lead database, external scripts, cookies, or browser storage. Contact links also work without JavaScript, with shorter service-specific messages.

All contact links open WhatsApp, including the displayed contact number in the header and footer. The mobile bar has one full-width WhatsApp button. Telephone auto-detection is disabled; there are no phone-call links.

## Hosting

Serve this directory with any static server. Publish the two HTML pages, stylesheet, script, original poster, PNG favicon, three Heebo font files, and font license to a hosting provider suitable for commercial sites. Use the selected final domain in campaign URLs. The source can stay on GitHub independently of hosting.

No canonical domain or advertising account identifier has been guessed. This repository contains both pages ready for review and hosting; production deployment and analytics configuration are separate steps. The original public site remains unchanged.
