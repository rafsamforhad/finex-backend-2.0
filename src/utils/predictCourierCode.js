const predictCourierCode = (trackingNumber) => {
  // Define the tracking number patterns for different couriers
  const patterns = {
    fedex: /^(?=.*\d)[0-9]{12,20}$/, // FedEx: 12 to 20 digits
    ups: /^(1Z[0-9A-Z]{16})$/, // UPS: Starts with "1Z" followed by 16 alphanumeric characters
    dhl: /^[0-9]{10}$/, // DHL: Exactly 10 digits
    aramex: /^[0-9]{10,12}$/, // Aramex: 10 to 12 digits
    smsa: /^(?=.*\d)[0-9]{10}$/, // SMSA: Typically 10 digits
    ocs: /^[0-9]{13}$/, // OCS: 13 digits
    usps: /^[0-9]{20,22}$/, // USPS: 20 to 22 digits
    dpd: /^[0-9]{14}$/, // DPD: 14 digits
    sf_express: /^[A-Z]{2}[0-9]{9}SF$/, // SF Express: 2 letters, 9 digits, 'SF'
    dhl_express: /^[0-9]{10,11}$/, // DHL Express: 10 to 11 digits
    dtdc: /^[A-Z0-9]{9,12}$/, // DTDC: 9 to 12 alphanumeric characters
  };

  // Check each pattern against the tracking number
  for (const [courier, pattern] of Object.entries(patterns)) {
    if (pattern.test(trackingNumber)) {
      return courier; // Return the matched courier code
    }
  }

  return "Unknown courier"; // Return if no match is found
};

module.exports = predictCourierCode;
