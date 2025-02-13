# AdShield: Advanced Fraud Prevention System

AdShield is a real-time fraud prevention system that detects click fraud and fake profiles using Fingerprint's visitor identification technology. The system monitors user behavior and flags suspicious activities like rapid clicking and multiple account creation attempts.

## Features

- Real-time click fraud detection
- Visitor identification using Fingerprint Pro
- Live activity monitoring dashboard
- WebSocket-based real-time updates
- Fraud pattern simulation for testing

## Technology Stack

- Frontend: React + TypeScript
- Backend: Express.js
- Real-time Updates: WebSocket
- Styling: Tailwind CSS + shadcn/ui
- Visitor Identification: Fingerprint Pro SDK

## Fingerprint Integration

The Fingerprint Pro integration is implemented in the following files:

1. Main Integration:
   - `client/src/lib/fingerprint.ts`: Contains the core Fingerprint configuration and visitor data collection logic

2. Usage in Components:
   - `client/src/pages/fraud-simulation.tsx`: Uses Fingerprint for visitor identification during fraud simulation
   - `client/src/pages/dashboard.tsx`: Displays visitor data collected through Fingerprint

## Project Structure

```
├── client/
│   └── src/
│       ├── components/      # React components
│       ├── lib/            # Utility functions and configurations
│       └── pages/          # Page components
├── server/
│   ├── routes.ts          # API routes and WebSocket setup
│   └── storage.ts         # In-memory data storage
└── shared/
    └── schema.ts          # Shared TypeScript types and schemas
```

## Setup & Running

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   - Required environment variables:
     - `FINGERPRINT_API_KEY`: Your Fingerprint Pro API key

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   This will start both the frontend and backend servers on port 5000.

4. **Access the Application**
   - Open your browser and navigate to `http://localhost:5000`
   - Click "Get Started" to access the dashboard
   - Use the "Simulate Fraud" button to test fraud detection

## Key Features Explained

1. **Visitor Tracking**
   - The system uses Fingerprint Pro to generate unique visitor IDs
   - Tracks browser details, OS, and IP address
   - Detects incognito mode usage

2. **Fraud Detection**
   - Monitors click patterns for suspicious activity
   - Flags multiple accounts from the same device
   - Assigns fraud risk scores to visitors

3. **Real-time Updates**
   - WebSocket connection provides instant updates
   - Live visitor count and activity monitoring
   - Immediate fraud alerts for suspicious behavior

## Development Guidelines

1. **Adding New Features**
   - Keep components in appropriate directories
   - Follow TypeScript type definitions in `shared/schema.ts`
   - Use WebSocket for real-time updates

2. **Styling**
   - Use Tailwind CSS utility classes
   - Follow shadcn/ui component patterns
   - Maintain the cyberpunk theme defined in `theme.json`

## Testing

1. **Fraud Detection Testing**
   - Navigate to the Simulation page
   - Click "Begin Detection" to generate test data
   - Monitor the dashboard for real-time updates

2. **Visitor Tracking Testing**
   - Open the application in different browsers
   - Check if unique visitor IDs are generated
   - Verify that visitor data appears in the dashboard

## Error Handling

The application includes comprehensive error handling:
- Network connection issues
- API timeouts
- Invalid API keys
- Fallback mechanisms for failed fingerprinting

## Production Deployment

For production deployment:
1. Build the application: `npm run build`
2. Set production environment variables
3. Start the production server: `npm start`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with detailed description

## License

This project is licensed under the MIT License.
