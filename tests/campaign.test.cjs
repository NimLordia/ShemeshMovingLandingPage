'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'campaign.js'), 'utf8');
const measurementId = 'G-DCFPN7JWW8';

function link(href, dataset = {}) {
  const listeners = new Map();
  return {
    href,
    dataset,
    addEventListener(type, listener) {
      const callbacks = listeners.get(type) || [];
      callbacks.push(listener);
      listeners.set(type, callbacks);
    },
    click() {
      const event = {
        defaultPrevented: false,
        preventDefault() { this.defaultPrevented = true; }
      };
      for (const listener of listeners.get('click') || []) listener(event);
      return event;
    }
  };
}

function runCampaign({ service = 'small', hostname = 'www.shemesh-moving.co.il' } = {}) {
  const pagePath = service === 'apartment' ? '/apartments.html' : '/';
  const pageUrl = hostname ? `https://${hostname}${pagePath}` : 'file:///preview/index.html';
  const href = `${pageUrl}?utm_source=google&utm_medium=cpc&utm_campaign=test&gclid=test-click-id`;
  const location = Object.freeze({ hostname, href, search: new URL(href).search });
  const contacts = ['header', 'artwork', 'footer'].map((placement) =>
    link('https://wa.me/972508804928', { contact: 'whatsapp', placement }));
  const navigation = [link('#home'), link('#faq')];
  const scripts = [];
  const window = {
    location,
    history: {
      replaceState() { assert.fail('Campaign script must not replace the URL.'); },
      pushState() { assert.fail('Campaign script must not change navigation.'); }
    }
  };
  const document = {
    body: { dataset: { page: service } },
    referrer: 'https://www.google.com/',
    head: { appendChild(script) { scripts.push(script); } },
    createElement(tag) {
      assert.equal(tag, 'script');
      return {};
    },
    querySelectorAll(selector) {
      assert.equal(selector, '[data-contact="whatsapp"]');
      return contacts;
    }
  };
  vm.runInNewContext(source, { window, document });
  const calls = () => JSON.parse(JSON.stringify(Array.from(window.dataLayer || [], (args) => Array.from(args))));
  return { window, document, contacts, navigation, scripts, href, calls };
}

test('each campaign keeps its own attribution and one automatic page view', () => {
  for (const service of ['small', 'apartment']) {
    const page = runCampaign({ service });
    const calls = page.calls();
    assert.equal(calls.length, 2);
    assert.equal(calls[0][0], 'js');
    assert.deepEqual(calls[1], ['config', measurementId, {
      content_group: service,
      service_type: service,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    }]);
    assert.deepEqual(page.scripts, [{
      async: true,
      src: `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    }]);
    assert.equal(page.window.location.href, page.href);
    assert.equal(page.document.referrer, 'https://www.google.com/');
  }
});

test('every contact click sends one event with campaign and placement, without message data', () => {
  for (const service of ['small', 'apartment']) {
    const page = runCampaign({ service });
    for (const contact of page.contacts) {
      const callCount = page.calls().length;
      assert.equal(contact.click().defaultPrevented, false);
      assert.equal(page.calls().length, callCount + 1);
      assert.deepEqual(page.calls().at(-1), ['event', 'contact_click', {
        send_to: measurementId,
        contact_method: 'whatsapp',
        contact_placement: contact.dataset.placement,
        service_type: service
      }]);
    }
  }
});

test('both campaign pages prepare identical useful WhatsApp messages', () => {
  const small = runCampaign();
  const apartment = runCampaign({ service: 'apartment' });
  const destination = small.contacts[0].href;
  assert.ok([...small.contacts, ...apartment.contacts].every((contact) => contact.href === destination));
  const url = new URL(destination);
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/972508804928');
  const message = url.searchParams.get('text');
  assert.match(message, /מספר חדרים \(אם רלוונטי\): /);
  for (const field of ['מה צריך להעביר', 'מיקום האיסוף', 'יעד ההובלה', 'תאריך רצוי', 'קומה ומעלית באיסוף', 'קומה ומעלית ביעד', 'צורך בפירוק והרכבה']) {
    assert.ok(message.includes(field), `Quote message should include ${field}`);
  }
  assert.doesNotMatch(message, /הגעתי דרך|1–3|utm_|gclid/);
});

test('analytics loads only on the exact production hostname allowlist', () => {
  for (const hostname of ['shemesh-moving.co.il', 'www.shemesh-moving.co.il', 'shemeshmovingaddcampaign.netlify.app']) {
    assert.equal(runCampaign({ hostname }).scripts.length, 1, hostname);
  }
  for (const hostname of ['localhost', '127.0.0.1', 'deploy-preview-4--shemeshmovingaddcampaign.netlify.app', 'www.shemesh-moving.co.il.example.com', '']) {
    const page = runCampaign({ hostname });
    assert.equal(page.scripts.length, 0, hostname);
    page.contacts.forEach((contact) => {
      assert.equal(contact.click().defaultPrevented, false);
      assert.equal(new URL(contact.href).origin, 'https://wa.me');
    });
    assert.deepEqual(page.calls(), []);
  }
});

test('Home and FAQ navigation stays untouched and sends no contact events', () => {
  const page = runCampaign();
  const before = page.calls();
  page.navigation.forEach((anchor) => assert.equal(anchor.click().defaultPrevented, false));
  assert.deepEqual(page.navigation.map((anchor) => anchor.href), ['#home', '#faq']);
  assert.deepEqual(page.calls(), before);
  assert.equal(page.window.location.href, page.href);
});
