export const mockIfscData = {
  ifsc: 'HDFC0CAGSBK',
  bank: 'HDFC Bank',
  bankCode: 'HDFC',
  branch: 'CAGSBK',
  centre: 'MUMBAI',
  district: 'Mumbai',
  state: 'Maharashtra',
  address: '123 Main St, Near Railway Station',
  contact: '1234567890',
  city: 'Mumbai',
  micr: '400240002',
  imps: true,
  upi: true,
  rtgs: true,
  neft: true,
  swift: 'HDFCINBB',
  iso3166: 'IN-MH',
  updatedAt: new Date(),
};

export const mockRazorpayResponse = {
  IFSC: 'HDFC0CAGSBK',
  BANK: 'HDFC Bank',
  BANKCODE: 'HDFC',
  BRANCH: 'CAGSBK',
  CENTRE: 'MUMBAI',
  DISTRICT: 'Mumbai',
  STATE: 'Maharashtra',
  ADDRESS: '123 Main St, Near Railway Station',
  CONTACT: '1234567890',
  CITY: 'Mumbai',
  MICR: '400240002',
  IMPS: true,
  UPI: true,
  RTGS: true,
  NEFT: true,
  SWIFT: 'HDFCINBB',
  ISO3166: 'IN-MH',
};

export const invalidIfscCodes = [
  'INVALID',
  'HDFC',
  'HDFC0CAGSBK123',
  '12345678901',
  'HDFC0CAGSB',
];

export const validIfscCodes = [
  'HDFC0CAGSBK',
  'SBIN0001234',
  'ICIC0000001',
  'AXIS0000001',
];

