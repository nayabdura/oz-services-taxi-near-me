// Google Ads & GA4 / GTM Conversion Event Helper

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === "undefined") return;

  // Push to dataLayer for Google Tag Manager (GTM)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
    timestamp: new Date().toISOString(),
  });

  // Call gtag if initialized (GA4 & Google Ads)
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
};

export const trackPhoneCall = (phoneNumber: string, location: string) => {
  trackEvent("phone_call_click", {
    event_category: "Contact",
    event_label: phoneNumber,
    call_location: location,
    send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_ID,
  });
};

export const trackBookingSubmission = (bookingData: {
  pickup: string;
  dropoff: string;
  vehicleType?: string;
}) => {
  trackEvent("booking_submission", {
    event_category: "Conversion",
    event_label: "Taxi Booking",
    pickup_location: bookingData.pickup,
    dropoff_location: bookingData.dropoff,
    vehicle_type: bookingData.vehicleType || "Standard Sedan",
    send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_BOOKING_CONVERSION_ID,
  });
};

export const trackContactSubmission = (subject: string) => {
  trackEvent("contact_submission", {
    event_category: "Conversion",
    event_label: subject,
    send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_CONVERSION_ID,
  });
};
