'use strict';

// Contact intent, not a confirmed lead or booking. No analytics network calls.
window.dataLayer = window.dataLayer || [];
const serviceType = document.body.dataset.page === 'apartment' ? 'apartment' : 'small';
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
    window.dataLayer.push({
      event: 'contact_click',
      contact_method: 'whatsapp',
      contact_placement: link.dataset.placement,
      service_type: serviceType
    });
  });
});
