/**
 * Google Apps Script Web App - Narala Pawan Portfolio Contact Backend
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.google.com) and create a new Spreadsheet named "Portfolio Contact Submissions".
 * 2. In row 1, create columns: ID | Name | Email | Subject | Message | Timestamp
 * 3. Go to Extensions -> Apps Script.
 * 4. Paste this complete Code.gs into the editor.
 * 5. Click Deploy -> New Deployment -> Select type: Web App.
 * 6. Set Description: "Portfolio Backend API".
 * 7. Set Execute as: "Me".
 * 8. Set Who has access: "Anyone".
 * 9. Click Deploy and copy the Web App URL.
 * 10. Paste the Web App URL into GOOGLE_APPS_SCRIPT_URL in js/app.js.
 */

// Handle incoming HTTP POST requests (Public Form Submissions)
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse incoming payload
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }

    // Input Validation
    const name = (data.name || '').trim();
    const email = (data.email || '').trim();
    const subject = (data.subject || '').trim();
    const message = (data.message || '').trim();

    if (!name || !email || !subject || !message) {
      return createJsonResponse({ status: 'error', message: 'Missing required fields' }, 400);
    }

    const id = data.id || ('submission-' + new Date().getTime());
    const timestamp = data.timestamp || new Date().toISOString();

    // Append row to Google Sheet
    sheet.appendRow([id, name, email, subject, message, timestamp]);

    return createJsonResponse({
      status: 'success',
      message: 'Contact form response written to Google Sheets successfully.',
      id: id
    }, 200);

  } catch (error) {
    return createJsonResponse({
      status: 'error',
      message: 'Spreadsheet write error: ' + error.toString()
    }, 500);
  }
}

// Handle incoming HTTP GET requests (Restricted Admin Data Retrieval)
function doGet(e) {
  try {
    // Basic Access Control Check (Requirement Section F & I)
    const authKey = e.parameter.auth;
    const ADMIN_SECRET = 'pawan_admin_secure_key_2026'; // Configure via ScriptProperties in production

    if (authKey !== ADMIN_SECRET) {
      return createJsonResponse({
        status: 'unauthorized',
        message: 'Access denied: Valid authentication key required to retrieve private contact responses.'
      }, 403);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const rows = sheet.getDataRange().getValues();
    
    // Convert sheet rows (excluding headers) to JSON array
    const responses = [];
    for (let i = 1; i < rows.length; i++) {
      responses.push({
        id: rows[i][0],
        name: rows[i][1],
        email: rows[i][2],
        subject: rows[i][3],
        message: rows[i][4],
        timestamp: rows[i][5]
      });
    }

    return createJsonResponse({
      status: 'success',
      count: responses.length,
      data: responses
    }, 200);

  } catch (error) {
    return createJsonResponse({
      status: 'error',
      message: 'Failed to retrieve responses: ' + error.toString()
    }, 500);
  }
}

// Helper to format JSON response with CORS headers
function createJsonResponse(dataObj, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(dataObj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
