# Test Application Submission

This test utility generates and submits complete patient financing applications for testing the v2 endpoint.

## Features

- ✅ Generates all required form fields with realistic random data
- ✅ Creates unique emails with format: `peter+[MM]-[DD]-[aaa]@vypple.com`
- ✅ Sequential email counter (aaa, aab, aac...) resets daily
- ✅ Tracks submissions in CSV format (stored in localStorage)
- ✅ Actually submits to the v2 endpoint
- ✅ Callable from browser console or code

## Usage

### From Command Line (Node.js Script)

Run the test script directly from your terminal:

```bash
npm run test:submit
```

Or directly with Node:

```bash
node test/testApplicationSubmission.js
```

This script:
- Runs locally on your dev machine
- Uses ngrok URL for CORS (fetches from ngrok API)
- Writes results to `test/test-records.csv`
- Can be run repeatedly

### In Browser Console

1. Access your app via ngrok URL: `https://f208ec16b693.ngrok-free.app`
2. Open browser console (F12)
3. Call the function:
   ```javascript
   await window.testSubmitApplication();
   ```

### In Code

```typescript
import { testSubmitApplication } from './test/testApplicationSubmission';

// Submit a test application
const result = await testSubmitApplication();
console.log(result);
```

### Download CSV Records

To download all test records as CSV:

```javascript
window.downloadTestRecordsCSV();
```

## Email Format

Emails follow the pattern: `peter+[MM]-[DD]-[aaa]@vypple.com`

- `[MM]` = 2-digit month (01-12)
- `[DD]` = 2-digit day (01-31)
- `[aaa]` = 3 lowercase letters (aaa, aab, aac, ..., zzz)
- Sequential counter resets daily

Example: `peter+11-25-abc@vypple.com`

## CSV Tracking

The CSV file tracks:
- Name
- Email
- Submission Date/Time (ISO format)
- Success Status (Success/Failed)

Records are stored in browser localStorage and can be downloaded using `downloadTestRecordsCSV()`.

## Generated Fields

The function generates all required fields:

### Personal Information
- First name, middle name, last name
- Date of birth (18-80 years old)
- SSN (9 digits)
- Driver's license
- Sex, marital status
- Primary/secondary phone
- Email (unique format)
- Street address, city, state, ZIP
- Time at address, rent/own
- Previous address (optional)
- Emergency contact info

### Referral Information
- Referring practice
- Provider name
- Contact info
- Provider email
- Estimated treatment cost ($1,000 - $50,000)

### Employment & Income
- Current employer, address
- Job title
- Employment type
- Length of employment
- Monthly gross/net income
- Pay frequency
- Secondary income sources
- Household income
- Spouse employer/income (if married)

### Financial Overview
- Checking balance
- Savings balance
- Retirement accounts
- Investment accounts
- Mortgage/rent payment
- Credit score (or unknown)

### Treatment Context
- Considering treatment time
- Priority preference
- Treatment reason(s)
- Urgency scale (1-10)
- Ready to proceed

### Compliance & Signature
- All consent checkboxes (true)
- Signature data with PDF
- IP address, user agent
- Document hash

## CORS & Testing

**IMPORTANT**: The test function must be run from an allowed origin. The `apikey` header alone is not sufficient for security.

The test function will work from:
- ✅ **ngrok URL**: `https://f208ec16b693.ngrok-free.app` (currently running, forwarding to port 8080)
- ✅ **Previous ngrok URL**: `https://edebd0262cb9.ngrok-free.app` (also allowed)
- ✅ **Allowed domains**: lovable.app domains, mydentipay.com domains
- ❌ **localhost**: Will be blocked - you must use ngrok URL

**Note**: ngrok URLs change when restarted. If you restart ngrok, update the allowed origins in the v2 function.

The v2 function's CORS logic:
- **Requires** origin to be in the allowed list (ngrok, lovable.app, mydentipay.com)
- `apikey` header alone is not enough - origin must be allowed
- Only allows requests without origin if they have auth (edge function to edge function calls)

**To test from localhost:**
1. Make sure ngrok is running: `ngrok http 3000` (or your dev server port)
2. Access your app via the ngrok URL: `https://edebd0262cb9.ngrok-free.app`
3. Run the test function from that URL

## Notes

- All numeric fields are randomly generated within realistic ranges
- The function actually submits to the v2 endpoint
- Each submission is tracked in localStorage
- CSV can be downloaded at any time
- Sequential email counter prevents duplicates within the same day
- **CORS**: The function includes `apikey` header, so it works from localhost or any origin

