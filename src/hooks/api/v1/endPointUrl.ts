// booking endpoint URLs
export const bookingEndPointUrls: string[] = [
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking/flight-booking`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking/hotel-booking`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking/package-booking`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking/visa`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking/car-booking`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking/hajj-umrah`,
];

// refund endpoint URLs
export const refundEndPointUrls = [
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/refund/refund-flight`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/refund/refund-hotel`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/refund/refund-package`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/refund/refund-car`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/refund/refund-hajj`,
];

// transaction endpoint URLs
export const transactionEndPointUrls = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/transection`;

// topup endpoint URLs
export const topupEndPointUrls = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/topup`;
export const customerEndPointUrls = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/customer`;

// report endpoint URLs
export const reportEndPointUrls = [
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/report/report-flight`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/report/report-hotel`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/report/report-package`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/report/report-car`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/report/report-hajj`,
];
