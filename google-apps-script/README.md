# Google Apps Script & Google Sheets Backend Integration Guide

This directory contains the Google Apps Script backend code (`Code.gs`) that powers the dynamic Google Sheets contact form database for **Narala Pawan's Personal Portfolio**.

---

## 📊 Features
1. **Public Form Submission Receiver (`doPost`)**: Accepts incoming contact form submissions from the portfolio frontend and appends them to Google Sheets as new rows.
2. **Restricted Admin Endpoint (`doGet`)**: Provides authentication key verification to safely return submitted messages to authorized administrators while blocking unauthorized access.
3. **Automatic Unique ID & Timestamping**: Ensures every submission record has a traceable ID and timestamp.

---

## 🛠️ Step-by-Step Setup Guide

Follow these 10 steps to connect your portfolio contact form to your own Google Sheet:

1. **Create Google Sheet**:
   Open [Google Sheets](https://sheets.google.com) and create a blank spreadsheet titled `Portfolio Contact Submissions`.

2. **Configure Sheet Headers**:
   In row 1 of the spreadsheet, add the following header columns:
   `A1: ID | B1: Name | C1: Email | D1: Subject | E1: Message | F1: Timestamp`

3. **Open Apps Script Editor**:
   In your Google Sheet, click on the top menu: **Extensions ➔ Apps Script**.

4. **Add Code**:
   Copy the contents of `google-apps-script/Code.gs` and paste it into the Apps Script code editor (replace any default code).

5. **Save Script**:
   Click the 💾 **Save** icon or press `Ctrl + S`.

6. **Deploy Web App**:
   Click the **Deploy** button at the top right ➔ **New deployment**.

7. **Configure Deployment Settings**:
   - **Select type**: Click the gear icon and choose **Web app**.
   - **Description**: `Portfolio Backend API`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone` *(Required so visitors on GitHub Pages can post messages)*.

8. **Authorize Permissions**:
   Click **Deploy**, click **Authorize access**, select your Google account, click **Advanced ➔ Go to Portfolio Contact Submissions (unsafe)**, and click **Allow**.

9. **Copy Web App URL**:
   Copy the generated **Web App URL** (e.g., `https://script.google.com/macros/s/.../exec`).

10. **Link to Portfolio Frontend**:
    Open `js/app.js` in your portfolio code and set the `GOOGLE_APPS_SCRIPT_URL` variable:
    ```javascript
    const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec';
    ```

---

## 🧪 Testing the Integration

1. Open your published portfolio website.
2. Submit a test response in the contact form.
3. Open your Google Sheet — the new submission row will appear instantly!
