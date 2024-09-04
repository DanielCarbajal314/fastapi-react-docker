export const TEST_URL =  process.env.TEST_URL ?? 'http://localhost:3005';
export const IS_CONTAINER =  !TEST_URL.includes("localhost");