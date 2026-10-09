# שמש הובלות — one original design, two campaign URLs

Hebrew RTL static pages restoring the original poster landing page from `shragtoolbot/shemesh-moving` commit `0ad6205`. The original poster, illustration, name, slogan, phone number, favicon, blurred backdrop, and WhatsApp hotspot are retained.

Website: [www.shemesh-moving.co.il](https://www.shemesh-moving.co.il/).

## Campaign destinations

- `index.html`: small moves and individual items.
- `apartments.html`: one-, two-, and three-room apartment moves.

Both pages look identical: the same poster, headline, navigation, FAQ, contact links, and WhatsApp message. Only the canonical URL and invisible `data-page` campaign identifier differ. The campaign destinations remain `/` (small moves) and `/apartments.html` (apartment moves); assign each campaign its respective URL. URL-based grouping identifies the landing-page variant; the actual advertising source still depends on the campaign's auto-tagging or UTM parameters.

The new headline is exactly **הובלות קטנות וגדולות באיזור חיפה**, placed in a slim strip above the full poster to preserve the illustration and keep the line readable on mobile. The original lettering is custom artwork embedded in the JPEG; no original font file is available. `shemesh-headline.png` is a close visual recreation of that lettering, not an exact recovered font. Its black background is blended away by CSS. The accessible H1 supplies the same phrase as real text. Ordinary navigation and body text use self-hosted Heebo, licensed in `OFL-Heebo.txt`.

Top navigation includes **דף הבית** and **שאלות ותשובות**. `navigation.js` opens one panel at a time while preserving the current campaign path and query parameters. Browser back/forward and direct FAQ fragments work. Without JavaScript, all sections remain available as a normal page. The FAQ has one WhatsApp contact button after all answers.

Pickup and destination must both be within the service area below. The FAQ states that disassembly/reassembly is available at an additional charge. The pages contain no invented reviews, guarantees, insurance claims, or fixed price promises.

## Service area

Updated on 2026-09-16 from the owner's instructions:

- Base: Haifa; Haifa and the Krayot are included.
- East: up to and including Kiryat Tivon.
- North: up to Acre (Akko), excluding Acre itself.
- South: up to and including Pardes Hanna.
- Include all Hof HaCarmel communities.
- Both pickup and destination must be inside this area; a job does not have to start or end in Haifa.

These boundaries apply to both service pages. Page copy and WhatsApp templates reflect them; website changes do not configure Google Ads or Meta location targeting.

## Analytics

Both pages use Google Analytics 4 measurement ID `G-DCFPN7JWW8`, configured once per page in `campaign.js`. The Google tag loads only on the exact hostnames `shemesh-moving.co.il`, `www.shemesh-moving.co.il`, and `shemeshmovingaddcampaign.netlify.app`, excluding localhost and Netlify deploy previews. If another public domain is added, update this hostname allowlist before deploying.

The tag sends an automatic `page_view` and assigns `content_group` and `service_type` as `small` or `apartment`. Standard page URLs, query parameters and referrers are preserved for traffic attribution. Avoid putting personal information in campaign URLs.

Every contact link sends a custom `contact_click` event via `gtag`, with `contact_method: whatsapp`, `contact_placement`, and `service_type`. Count this event when reporting WhatsApp clicks. Enhanced measurement may also record a generic outbound `click`; do not add those counts to `contact_click` or create another event of the same name from them.

Contact clicks represent intent, not sent WhatsApp messages, qualified inquiries, quotes, or booked jobs. Record actual outcomes separately. Both URLs prepare the same generic quote message locally, including optional room count; visitors complete and send it in WhatsApp. The custom event contains no message text or customer details. There is no lead database. Contact links also work without JavaScript or when analytics is blocked.

The Google tag can use analytics cookies. Google signals and advertising personalization signals are disabled in the tag configuration. Both pages include a Hebrew notice explaining analytics use and linking to Google's data-use information. This implementation does not include a consent-management platform.

### Reports and verification

Verified on 2026-10-06 in the owner's **Shemesh Moving** GA4 property: the owner's Realtime screenshot shows both landing-page titles, 9 `page_view` events, and 2 `contact_click` events. Event receipt is confirmed. The earlier empty reports were from the wrong Analytics stream/property. The owner subsequently confirmed `contact_click` was saved in the Key events tab with a filled star. The reviewed settings use no default monetary value, once-per-event counting, and the existing website code. These contact clicks do not establish that WhatsApp messages were sent. Receipt of a newly marked key event remains to be verified.

The owner's 2026-10-06 screenshots confirm the Google Ads account link and the conversion **Shemesh Moving (web) contact_click** were created successfully. The settings reviewed immediately before linking enabled auto-tagging and disabled personalized advertising and access to Analytics features from within Google Ads. The created conversion uses the existing `contact_click` key event, is categorized as **Contact**, and is **Secondary**. Its saved conversion counting and monetary-value settings remain to be reviewed. Google Ads attribution and campaign configuration have not yet been verified.

- Use **Realtime** to check recent visits and `contact_click` events after deployment. Browser blockers can prevent collection.
- Use **Pages and screens**, with **Page path and screen class**, for visits to each URL. The built-in **Content group** dimension combines the small-move page's `/` and `/index.html` addresses under `small`.
- To use `contact_placement` or `service_type` as dimensions in standard reports, register each under **Admin → Custom definitions** as an event-scoped custom dimension with the matching event parameter.
- Reporting and GA4 account settings must be verified in the owner's Analytics account; the website code does not create custom dimensions or mark key events automatically.
- No Google Ads conversion tag, Tag Manager container, or Meta Pixel is installed.

All contact links open WhatsApp: the original poster's phone-number hotspot and the single button at the end of the FAQ panel. Telephone auto-detection is disabled; there are no phone-call links. Panel navigation does not create another page-view event or change the campaign identifier.

## Hosting

Serve this directory with any static server. Publish the two HTML pages, `styles.css`, `campaign.js`, `navigation.js`, `shemesh-original.jpg`, `shemesh-headline.png`, PNG favicon, Heebo font files, and font license. Use the selected final domain in campaign URLs. The source can stay on GitHub independently of hosting.

Preferred final URLs, with `www.shemesh-moving.co.il` as primary:

- Small moves: https://www.shemesh-moving.co.il/
- Apartments: https://www.shemesh-moving.co.il/apartments.html

Both pages declare these URLs as their canonical addresses. Internal page and asset links are relative.

Domain setup status as of 2026-10-06: the owner has purchased `shemesh-moving.co.il`. Public DNS is verified: the apex A record points to `75.2.60.5`, and the `www` CNAME points to `shemeshmovingaddcampaign.netlify.app`. Both custom domains have valid HTTPS. Netlify's primary domain is `www.shemesh-moving.co.il`, and the apex redirects to it; this behavior is verified.

Previously verified production commit `9c4f418` introduced the expanded service area, custom-domain analytics allowlist, and `www` canonical URLs. Both public pages and event receipt in GA4 Realtime were verified at that revision. These settings are retained in the restoration. Domain redirects are managed in Netlify.

Existing Netlify production pages:

- Small moves: https://shemeshmovingaddcampaign.netlify.app/
- Apartments: https://shemeshmovingaddcampaign.netlify.app/apartments.html

Netlify automatic publishing from the `main` branch of `github.com/NimLordia/ShemeshMovingLandingPage` is confirmed enabled. It publishes the repository root with no build command or environment variables. The public Analytics measurement ID is included in `campaign.js`; it is not a secret. The original GitHub Pages site remains unchanged.

## Restoration verification — 8 October 2026

The original landing-page design is restored for publication through the existing `main`-branch Netlify workflow. Run `node --test tests/campaign.test.cjs` for tracking regression checks. Local browser checks cover identical campaign content, responsive layouts, panel navigation, history, direct fragment links, no-JavaScript fallback, preserved advertising query parameters, and isolated tracking calls without sending test events to production. The original poster is byte-for-byte unchanged. Screenshots from the two campaign URLs are pixel-identical at desktop, mobile, narrow mobile, and landscape sizes; the phone hotspot maintains a minimum 44px tap height.

## Custom headline asset

Final file: `shemesh-headline.png`. Created with the built-in image-generation tool using the unchanged `shemesh-original.jpg` as a lettering reference. The original poster file is never regenerated. Final generation prompt:

```text
Create a clean custom Hebrew lettering image. Reference image is the existing poster; use ONLY the style and exact shapes of its white custom Hebrew letters, especially הובלות and חזקים בעדינות. Do not include any poster illustration or phone number.
Render exact text on ONE horizontal line, reading right to left: "הובלות קטנות וגדולות באיזור חיפה".
Copy original heavy square Hebrew shapes, slab terminals, substantial stroke weight and slightly softened corners as faithfully as possible. Crisp solid WHITE letter silhouettes, every letter fully filled and smooth, no texture, grunge, scratches, outlines or stroke artifacts. Letter interiors should only have their legitimate Hebrew counters. Exact spelling באיזור. White text on perfectly flat pure BLACK #000000 background, no transparency. Only the one line of white Hebrew text. Wide landscape composition. Fit complete line in frame with minimal black margins; no clipping. No other text or objects.
```
