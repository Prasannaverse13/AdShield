import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';

// Initialize the agent with your API key
export const fpPromise = FingerprintJS.load({
  apiKey: "eO5OnARFHQoPYX3a6LeM",
  region: "ap" // Asia Pacific region
});

export async function getVisitorData() {
  try {
    const fp = await fpPromise;
    const result = await fp.get({
      extendedResult: true, // Get extended data including browser, OS, and location
      timeout: 10000 // Set a reasonable timeout
    });

    // Log success for debugging
    console.log('Fingerprint identification successful:', result.visitorId);

    return {
      visitorId: result.visitorId,
      browserName: result.browserName,
      os: result.os,
      ipAddress: result.ip,
      incognito: result.incognito,
      timestamp: new Date().toISOString()
    };
  } catch (error: any) {
    // Generate a fallback visitor ID if Fingerprint fails
    const fallbackId = `fallback-${Math.random().toString(36).substring(2, 15)}`;
    console.error('Error getting visitor data:', error.message);

    // Return fallback data to ensure the app continues working
    return {
      visitorId: fallbackId,
      browserName: navigator.userAgent,
      os: navigator.platform,
      ipAddress: '127.0.0.1',
      incognito: false,
      timestamp: new Date().toISOString()
    };
  }
}
