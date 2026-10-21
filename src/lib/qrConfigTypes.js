// A card's QR always opens its public page (/c/<cardId>). The page lists the
// links defined here, so owners can edit them without reprinting the QR.

export const MAX_QR_LINKS = 12;

const URL_PLACEHOLDER = "https://";

export const QR_LINK_TYPES = {
  whatsapp: {
    label: "WhatsApp",
    group: "contact",
    input: "phone",
    placeholder: "8801XXXXXXXXX",
    hint: "Number with country code, digits only.",
  },
  phone: {
    label: "Phone",
    group: "contact",
    input: "phone",
    placeholder: "8801XXXXXXXXX",
    hint: "Opens the dialer on the visitor's phone.",
  },
  email: {
    label: "Email",
    group: "contact",
    input: "email",
    placeholder: "name@example.com",
  },
  address: {
    label: "Address / Maps",
    group: "contact",
    input: "text",
    placeholder: "Street, City",
    hint: "Opens the address in Maps.",
  },
  website: {
    label: "Website",
    group: "web",
    input: "url",
    placeholder: "https://example.com",
  },
  facebook: {
    label: "Facebook",
    group: "social",
    input: "url",
    placeholder: "https://facebook.com/yourpage",
  },
  instagram: {
    label: "Instagram",
    group: "social",
    input: "url",
    placeholder: "https://instagram.com/yourname",
  },
  linkedin: {
    label: "LinkedIn",
    group: "social",
    input: "url",
    placeholder: "https://linkedin.com/in/yourname",
  },
  youtube: {
    label: "YouTube",
    group: "social",
    input: "url",
    placeholder: "https://youtube.com/@yourchannel",
  },
  x: {
    label: "X (Twitter)",
    group: "social",
    input: "url",
    placeholder: "https://x.com/yourname",
  },
  tiktok: {
    label: "TikTok",
    group: "social",
    input: "url",
    placeholder: "https://tiktok.com/@yourname",
  },
  telegram: {
    label: "Telegram",
    group: "social",
    input: "url",
    placeholder: "https://t.me/yourname",
  },
  github: {
    label: "GitHub",
    group: "social",
    input: "url",
    placeholder: "https://github.com/yourname",
  },
  custom: {
    label: "Other link",
    group: "web",
    input: "url",
    placeholder: "https://example.com/portfolio",
    hint: "Any link with your own button name, e.g. Portfolio or Menu.",
    needsLabel: true,
  },
};

export const QR_LINK_GROUPS = [
  { key: "social", label: "Social" },
  { key: "contact", label: "Contact" },
  { key: "web", label: "Web" },
];

const LABEL_MAX = 30;
const ADDRESS_MAX = 100;
const URL_MAX = 500;

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

// "facebook.com/x" -> "https://facebook.com/x". Only http(s) is ever accepted.
export function normalizeUrl(value) {
  const v = clean(value);
  if (!v || v === URL_PLACEHOLDER) return "";
  if (/^https?:\/\//i.test(v)) return v;
  if (/^[a-z][a-z0-9+.-]*:/i.test(v) && !/^[^\s/]+:\d+/.test(v)) return v; // javascript:, data: ... stay invalid
  return `https://${v}`;
}

function isValidUrl(value) {
  if (value.length > URL_MAX || /\s/.test(value)) return false;
  try {
    const u = new URL(value);
    return (u.protocol === "http:" || u.protocol === "https:") && u.hostname.includes(".");
  } catch {
    return false;
  }
}

// "+880 1700-000000" -> "8801700000000"
function phoneDigits(value) {
  return clean(value).replace(/[\s\-().]/g, "").replace(/^\+/, "");
}

// Returns the cleaned value for storage, or "" when empty.
function normalizeValue(type, value) {
  const def = QR_LINK_TYPES[type];
  if (!def) return "";
  switch (def.input) {
    case "phone":
      return phoneDigits(value);
    case "url":
      return normalizeUrl(value);
    default:
      return clean(value);
  }
}

// Error message for one link, or "" when valid.
export function validateQrLink(link) {
  const def = QR_LINK_TYPES[link?.type];
  if (!def) return "Unknown link type.";

  if (def.needsLabel) {
    const label = clean(link.label);
    if (!label) return "Give this link a name.";
    if (label.length > LABEL_MAX) return `Name is max ${LABEL_MAX} characters.`;
  }

  const value = normalizeValue(link.type, link.value);
  if (!value) return `Enter ${def.label.toLowerCase()} details.`;

  switch (def.input) {
    case "phone":
      return /^\d{6,15}$/.test(value) ? "" : "Digits only, 6-15 numbers.";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email.";
    case "url":
      return isValidUrl(value) ? "" : "Enter a valid link, e.g. https://example.com";
    default:
      return value.length <= ADDRESS_MAX ? "" : `Max ${ADDRESS_MAX} characters.`;
  }
}

// Storage shape. Only call on links that passed validateQrLink.
export function cleanQrLink(link) {
  const def = QR_LINK_TYPES[link.type];
  return {
    type: link.type,
    label: def.needsLabel ? clean(link.label) : "",
    value: normalizeValue(link.type, link.value),
  };
}

// First error across a list, or "". Index is returned so the UI can point at the row.
export function validateQrLinks(links) {
  if (!Array.isArray(links)) return { index: -1, error: "Links must be a list." };
  if (links.length > MAX_QR_LINKS) {
    return { index: -1, error: `You can add up to ${MAX_QR_LINKS} links.` };
  }
  for (let i = 0; i < links.length; i += 1) {
    const error = validateQrLink(links[i]);
    if (error) return { index: i, error };
  }
  return { index: -1, error: "" };
}

const LEGACY_TYPE_MAP = {
  whatsapp: "whatsapp",
  phone: "phone",
  email: "email",
  address: "address",
  link: "website",
};

// Reads any stored qrConfig: new { links: [] } or legacy { type, value }.
// Invalid entries are dropped so a bad record can never render an unsafe href.
export function normalizeQrConfig(raw) {
  let links = [];
  if (Array.isArray(raw?.links)) {
    links = raw.links;
  } else if (raw?.type && LEGACY_TYPE_MAP[raw.type]) {
    links = [{ type: LEGACY_TYPE_MAP[raw.type], value: raw.value }];
  }

  return {
    links: links
      .filter((l) => l && !validateQrLink(l))
      .slice(0, MAX_QR_LINKS)
      .map(cleanQrLink),
  };
}

export function getLinkTitle(link) {
  const def = QR_LINK_TYPES[link.type];
  return def?.needsLabel ? link.label : def?.label || "Link";
}

// What the visitor sees under the title (kept short; the button itself is the action).
export function getLinkSubtitle(link) {
  switch (QR_LINK_TYPES[link.type]?.input) {
    case "url":
      return link.value.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, "");
    case "phone":
      return `+${link.value}`;
    default:
      return link.value;
  }
}

export function getLinkHref(link) {
  switch (link.type) {
    case "whatsapp":
      return `https://wa.me/${link.value}`;
    case "phone":
      return `tel:+${link.value}`;
    case "email":
      return `mailto:${link.value}`;
    case "address":
      return `https://maps.google.com/?q=${encodeURIComponent(link.value)}`;
    default:
      return link.value;
  }
}
