export const mockIfscData = {
  ifsc: 'HDFC0CAGSBK',
  bank: 'HDFC Bank',
  branch: 'CAGSBK',
  address: '123 Main St, Near Railway Station',
  contact: '1234567890',
  city: 'Mumbai',
  district: 'Mumbai',
  state: 'Maharashtra',
  updatedAt: new Date(),
};

export const mockRazorpayResponse = {
  IFSC: 'HDFC0CAGSBK',
  BANK: 'HDFC Bank',
  BRANCH: 'CAGSBK',
  ADDRESS: '123 Main St, Near Railway Station',
  CONTACT: '1234567890',
  CITY: 'Mumbai',
  DISTRICT: 'Mumbai',
  STATE: 'Maharashtra',
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

