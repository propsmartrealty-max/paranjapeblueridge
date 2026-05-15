/**
 * ============================================================
 * SOVEREIGN EMAIL WEBHOOK — Google Apps Script
 * ============================================================
 * 
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Create a new project named "Blue Ridge Lead Webhook"
 * 3. Paste the code below (everything inside the SCRIPT block)
 * 4. Click Deploy → New Deployment
 * 5. Type: Web App
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. Deploy and copy the URL
 * 9. Set the URL in .env.local as NEXT_PUBLIC_WEBHOOK_URL
 *
 * ============================================================
 * START OF GOOGLE APPS SCRIPT CODE — Copy from here:
 * ============================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    var recipientEmail = "propsmartrealty@gmail.com";
    var subject = "💎 NEW LEAD: " + (data.name || "Unknown") + " — " + (data.bhk || "N/A") + " — " + (data.budget || "N/A");
    
    var htmlBody = '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a1628;color:#e8e4dc;padding:40px;border-radius:20px">'
      + '<div style="border-bottom:2px solid #d4a853;padding-bottom:20px;margin-bottom:30px">'
      + '<h1 style="color:#d4a853;margin:0;font-size:24px">🏗 Paranjape Blue Ridge</h1>'
      + '<p style="color:#999;margin:5px 0 0;font-size:12px">Sovereign Lead Intelligence Pipeline</p>'
      + '</div>'
      + '<table style="width:100%;border-collapse:collapse">'
      + '<tr><td style="padding:12px;color:#d4a853;font-weight:bold;border-bottom:1px solid #1a2a44">Name</td>'
      + '<td style="padding:12px;color:#e8e4dc;border-bottom:1px solid #1a2a44">' + (data.name || "N/A") + '</td></tr>'
      + '<tr><td style="padding:12px;color:#d4a853;font-weight:bold;border-bottom:1px solid #1a2a44">Phone</td>'
      + '<td style="padding:12px;color:#e8e4dc;border-bottom:1px solid #1a2a44"><a href="tel:' + (data.phone || "") + '" style="color:#4fc3f7">' + (data.phone || "N/A") + '</a></td></tr>'
      + '<tr><td style="padding:12px;color:#d4a853;font-weight:bold;border-bottom:1px solid #1a2a44">Email</td>'
      + '<td style="padding:12px;color:#e8e4dc;border-bottom:1px solid #1a2a44"><a href="mailto:' + (data.email || "") + '" style="color:#4fc3f7">' + (data.email || "N/A") + '</a></td></tr>'
      + '<tr><td style="padding:12px;color:#d4a853;font-weight:bold;border-bottom:1px solid #1a2a44">Configuration</td>'
      + '<td style="padding:12px;color:#e8e4dc;border-bottom:1px solid #1a2a44">' + (data.bhk || "N/A") + '</td></tr>'
      + '<tr><td style="padding:12px;color:#d4a853;font-weight:bold;border-bottom:1px solid #1a2a44">Budget</td>'
      + '<td style="padding:12px;color:#e8e4dc;border-bottom:1px solid #1a2a44">' + (data.budget || "N/A") + '</td></tr>'
      + '<tr><td style="padding:12px;color:#d4a853;font-weight:bold;border-bottom:1px solid #1a2a44">Intent</td>'
      + '<td style="padding:12px;color:#e8e4dc;border-bottom:1px solid #1a2a44">' + (data.intent || "N/A") + '</td></tr>'
      + '<tr><td style="padding:12px;color:#d4a853;font-weight:bold;border-bottom:1px solid #1a2a44">Source Page</td>'
      + '<td style="padding:12px;color:#e8e4dc;border-bottom:1px solid #1a2a44">' + (data.source || "Direct") + '</td></tr>'
      + '<tr><td style="padding:12px;color:#d4a853;font-weight:bold">Timestamp</td>'
      + '<td style="padding:12px;color:#e8e4dc">' + new Date().toLocaleString("en-IN", {timeZone: "Asia/Kolkata"}) + ' IST</td></tr>'
      + '</table>'
      + '<div style="margin-top:30px;padding:20px;background:#0d1f3c;border-radius:12px;border-left:4px solid #d4a853">'
      + '<p style="margin:0;color:#d4a853;font-size:11px;text-transform:uppercase;letter-spacing:2px">Action Required</p>'
      + '<p style="margin:8px 0 0;color:#e8e4dc;font-size:14px">Contact within 60 minutes for maximum conversion.</p>'
      + '</div>'
      + '</div>';
    
    MailApp.sendEmail({
      to: recipientEmail,
      subject: subject,
      htmlBody: htmlBody,
      name: "Blue Ridge Lead Intelligence"
    });
    
    // Log to spreadsheet for audit trail
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      if (!ss) {
        ss = SpreadsheetApp.create("Blue Ridge Leads Ledger");
      }
      var sheet = ss.getSheetByName("Leads") || ss.insertSheet("Leads");
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Timestamp", "Name", "Phone", "Email", "BHK", "Budget", "Intent", "Source"]);
      }
      sheet.appendRow([
        new Date(),
        data.name || "",
        data.phone || "",
        data.email || "",
        data.bhk || "",
        data.budget || "",
        data.intent || "",
        data.source || ""
      ]);
    } catch(logErr) {
      // Spreadsheet logging is optional, don't fail the request
    }
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Lead dispatched successfully" })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch(err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "active", service: "Blue Ridge Lead Webhook", version: "1.0" })
  ).setMimeType(ContentService.MimeType.JSON);
}

 * ============================================================
 * END OF GOOGLE APPS SCRIPT CODE
 * ============================================================
 */

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SOVEREIGN EMAIL WEBHOOK — Setup Guide
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Open https://script.google.com
2. Create new project → "Blue Ridge Lead Webhook"
3. Paste the Apps Script code from this file
4. Deploy → New Deployment → Web App
5. Execute as: Me | Access: Anyone  
6. Copy the deployment URL
7. Add to .env.local:
   NEXT_PUBLIC_WEBHOOK_URL=<your-deployment-url>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
