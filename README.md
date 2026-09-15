# שמש הובלות — two campaign landing pages

Hebrew RTL static pages built from the original company poster and favicon.

## Campaign destinations

- `index.html`: small moves and individual items.
- `apartments.html`: one-, two-, and three-room apartment moves.

Both use `styles.css`, `campaign.js`, `shemesh-original.jpg`, and `favicon.png`. The original brand assets are unchanged. Hebrew Heebo font files are self-hosted, with their license in `OFL-Heebo.txt`. Each page has distinct search metadata, service copy, FAQ content, and WhatsApp messages. There are discreet links between the two pages.

Pickup and destination are both within Haifa and the Krayot. Disassembly/reassembly is available as part of moving, not as a standalone handyman service. The pages contain no invented reviews, guarantees, insurance claims, or fixed price promises.

## Analytics

Both pages use Google Analytics 4 measurement ID `G-DCFPN7JWW8`, configured once per page in `campaign.js`. The Google tag loads only on `shemeshmovingaddcampaign.netlify.app`, excluding localhost and Netlify deploy previews. If the public domain changes, update that hostname check before deploying.

The tag sends an automatic `page_view` and assigns `content_group` and `service_type` as `small` or `apartment`. Standard page URLs, query parameters and referrers are preserved for traffic attribution. Avoid putting personal information in campaign URLs.

Every contact link sends a custom `contact_click` event via `gtag`, with `contact_method: whatsapp`, `contact_placement`, and `service_type`. Count this event when reporting WhatsApp clicks. Enhanced measurement may also record a generic outbound `click`; do not add those counts to `contact_click` or create another event of the same name from them.

Contact clicks represent intent, not sent WhatsApp messages, qualified inquiries, quotes, or booked jobs. Record actual outcomes separately. Quote messages are prepared locally, and visitors complete and send them in WhatsApp. The custom event contains no message text or customer details. There is no lead database. Contact links also work without JavaScript or when analytics is blocked.

The Google tag can use analytics cookies. Google signals and advertising personalization signals are disabled in the tag configuration. Both pages include a Hebrew notice explaining analytics use and linking to Google's data-use information. This implementation does not include a consent-management platform.

### Reports and verification

- Use **Realtime** to check recent visits and `contact_click` events after deployment. Browser blockers can prevent collection.
- Use **Pages and screens**, with **Page path and screen class**, for visits to each URL. The built-in **Content group** dimension combines the small-move page's `/` and `/index.html` addresses under `small`.
- To use `contact_placement` or `service_type` as dimensions in standard reports, register each under **Admin → Custom definitions** as an event-scoped custom dimension with the matching event parameter.
- Reporting and GA4 account settings must be verified in the owner's Analytics account; the website code does not create custom dimensions or mark key events automatically.
- No Google Ads conversion tag, Tag Manager container, or Meta Pixel is installed.

All contact links open WhatsApp, including the displayed contact number in the header and footer. The mobile bar has one full-width WhatsApp button. Telephone auto-detection is disabled; there are no phone-call links.

## Hosting

Serve this directory with any static server. Publish the two HTML pages, stylesheet, script, original poster, PNG favicon, three Heebo font files, and font license to a hosting provider suitable for commercial sites. Use the selected final domain in campaign URLs. The source can stay on GitHub independently of hosting.

Production pages:

- Small moves: https://shemeshmovingaddcampaign.netlify.app/
- Apartments: https://shemeshmovingaddcampaign.netlify.app/apartments.html

Netlify publishes the repository root with no build command or environment variables. The public Analytics measurement ID is included in `campaign.js`; it is not a secret. The original GitHub Pages site remains unchanged.
