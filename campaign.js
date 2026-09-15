'use strict';

const serviceType = document.body.dataset.page === 'apartment' ? 'apartment' : 'small';
const measurementId = 'G-DCFPN7JWW8';
// Keep local development and Netlify deploy previews out of production reports.
const analyticsEnabled = window.location.hostname === 'shemeshmovingaddcampaign.netlify.app';

if (analyticsEnabled) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  // One config call sends one automatic page_view. Keep URL/referrer defaults
  // so Google can attribute traffic using campaign parameters and referring sites.
  window.gtag('config', measurementId, {
    content_group: serviceType,
    service_type: serviceType,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
  const googleTag = document.createElement('script');
  googleTag.async = true;
  googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(googleTag);
}

const intro = serviceType === 'apartment'
  ? 'שלום שמש הובלות, הגעתי דרך עמוד הובלות הדירה ואשמח להצעת מחיר להובלת דירת 1–3 חדרים בתוך חיפה והקריות.'
  : 'שלום שמש הובלות, הגעתי דרך עמוד ההובלות הקטנות ואשמח להצעת מחיר לפריטים בודדים או להובלה קטנה בתוך חיפה והקריות.';
const fields = [
  ...(serviceType === 'apartment' ? ['מספר חדרים: '] : []),
  'מה צריך להעביר: ',
  'מיקום האיסוף: ',
  'יעד ההובלה: ',
  'תאריך רצוי: ',
  'קומה ומעלית באיסוף: ',
  'קומה ומעלית ביעד: ',
  'צורך בפירוק והרכבה כחלק מההובלה: '
];
const messageUrl = 'https://wa.me/972508804928?text=' + encodeURIComponent([intro, '', ...fields].join('\n'));

document.querySelectorAll('[data-contact="whatsapp"]').forEach((link) => {
  link.href = messageUrl;
  link.addEventListener('click', () => {
    if (!analyticsEnabled) return;
    // Contact intent only: opening WhatsApp does not confirm a sent message.
    window.gtag('event', 'contact_click', {
      send_to: measurementId,
      contact_method: 'whatsapp',
      contact_placement: link.dataset.placement,
      service_type: serviceType
    });
  });
});
