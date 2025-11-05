const { parsePhoneNumberFromString } = require("libphonenumber-js");

/**
 * Normalize Ethiopian phone numbers into local format (09xxxxxxx)
 *
 * Accepts:
 *  - +251912345678
 *  - 0912345678
 *  - 912345678
 *  - 09--- or +2517---
 *
 * Returns:
 *  - 09xxxxxxx
 */
function normalizePhoneNumber(phoneNumber) {
  if (!phoneNumber) return null;

  let cleaned = phoneNumber.toString().trim();

  // Remove spaces, dashes, parentheses
  cleaned = cleaned.replace(/[\s\-\(\)]/g, "");

  try {
    // Try to parse as Ethiopian number
    const parsed = parsePhoneNumberFromString(cleaned, "ET");

    if (parsed && parsed.isValid()) {
      // Convert to local format: +2519xxxxxxx → 09xxxxxxx
      const nationalNumber = parsed.nationalNumber;

      // Make sure it starts with 0
      return nationalNumber.startsWith("0")
        ? nationalNumber
        : "0" + nationalNumber;
    }

    // Manual fallback
    if (/^\+251\d{9}$/.test(cleaned)) {
      return "0" + cleaned.substring(4);
    }

    if (/^251\d{9}$/.test(cleaned)) {
      return "0" + cleaned.substring(3);
    }

    if (/^9\d{8}$/.test(cleaned)) {
      return "0" + cleaned;
    }

    if (/^0\d{9}$/.test(cleaned)) {
      return cleaned;
    }

    return null;
  } catch (error) {
    console.error("Error normalizing phone number:", error.message);
    return null;
  }
}

module.exports = { normalizePhoneNumber };
