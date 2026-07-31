export const QR_CONFIG_TYPES = {
  vcard: {
    label: "Contact Card",
    description: "Scan saves your contact info directly to their phone.",
    valuePlaceholder: null,
  },
  whatsapp: {
    label: "WhatsApp",
    description: "Scan opens a page to chat with you on WhatsApp.",
    valuePlaceholder: "8801XXXXXXXXX",
  },
  link: {
    label: "Website / Link",
    description: "Scan opens a page linking to any URL you choose.",
    valuePlaceholder: "https://example.com",
  },
  phone: {
    label: "Phone Call",
    description: "Scan opens a page to call your number.",
    valuePlaceholder: "8801XXXXXXXXX",
  },
  email: {
    label: "Email",
    description: "Scan opens a page to email you.",
    valuePlaceholder: "name@example.com",
  },
  address: {
    label: "Address / Maps",
    description: "Scan opens a page linking to your location on Maps.",
    valuePlaceholder: "Street, City",
  },
};

export function validateQrConfigValue(type, value) {
  const trimmed = (value || "").trim();
  switch (type) {
    case "vcard":
      return "";
    case "whatsapp":
    case "phone":
      return /^\d{6,15}$/.test(trimmed) ? "" : "Digits only, 6-15 numbers.";
    case "link":
      return /^https?:\/\/[^\s]+\.[^\s]+$/.test(trimmed)
        ? ""
        : "Enter a valid URL (http:// or https://).";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
        ? ""
        : "Enter a valid email.";
    case "address":
      return trimmed.length > 0 && trimmed.length <= 100
        ? ""
        : "Enter address (max 100 characters).";
    default:
      return "Unknown QR config type.";
  }
}
