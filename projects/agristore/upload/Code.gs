function doPost(e) {
  try {
    var SHEET_ID = '1YcwfYih0rUUqspsTMxjrdlMS5M1Fi5xBNIaLtFCoPBQ';
    var ss = SpreadsheetApp.openById(SHEET_ID);
    
    var payload = {};
    if (e.postData && e.postData.type === 'application/json') {
      payload = JSON.parse(e.postData.contents || '{}');
    } else {
      payload = e.parameter || {};
    }

    // --- UPLOAD IMAGE ACTION (server-side Postimages upload) ---
    if (payload.action === 'UPLOAD_IMAGE') {
      var imageBase64 = payload.imageBase64;
      var fileName = payload.fileName || 'product-' + Date.now() + '.jpg';
      
      // Upload to Postimages via server-to-server call
      var imageUrl = uploadToPostimages(imageBase64, fileName);
      
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        imageUrl: imageUrl
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // --- NEW ROUTING LOGIC FOR PRODUCTS ---
    if (payload.action === 'PRODUCT_UPLOAD') {
      var productSheet = ss.getSheetByName('Sheet1');
      // Column order: id, name, category, quantity, unit, available, new, image, notes, price
      var productRow = [
        payload.id || '',
        payload.name || '',
        payload.category || '',
        payload.quantity || '',
        payload.unit || '',
        payload.available || '',
        payload.new || '',
        payload.image || '', // The Postimages URL
        payload.notes || '',
        payload.price || ''
      ];
      productSheet.appendRow(productRow);
      
      return ContentService.createTextOutput(JSON.stringify({status:'ok', target:'Sheet1'}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // --- EXISTING LOGS LOGIC ---
    var sheetName = 'Logs';
    var sh = ss.getSheetByName(sheetName);
    if (!sh) {
      sh = ss.insertSheet(sheetName);
      sh.appendRow(['timestamp','type','item','seller','name','quantity','page','referrer','userAgent','note']);
    }

    var row = [
      payload.ts || new Date().toISOString(),
      payload.type || '',
      payload.item || '',
      payload.seller || '',
      payload.name || '',
      payload.quantity || '',
      payload.page || '',
      payload.referrer || '',
      payload.ua || payload.userAgent || '',
      payload.note || ''
    ];
    sh.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({status:'ok', target:'Logs'}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({status:'error', message: err.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}





function doGet(e) {
  try {
    var SHEET_ID = '1YcwfYih0rUUqspsTMxjrdlMS5M1Fi5xBNIaLtFCoPBQ';
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheetName = 'Logs';
    var sh = ss.getSheetByName(sheetName);
    if (!sh) {
      sh = ss.insertSheet(sheetName);
      sh.appendRow(['timestamp','type','item','seller','name','quantity','page','referrer','userAgent','note']);
    }

    var p = e.parameter || {};
    var row = [
      p.ts || new Date().toISOString(),
      p.type || '',
      p.item || '',
      p.seller || '',
      p.name || '',
      p.quantity || '',
      p.page || '',
      p.referrer || '',
      p.ua || p.userAgent || '',
      p.note || ''
    ];
    sh.appendRow(row);
    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error');
  }
}

function uploadToPostimages(imageBase64, fileName) {
  var apiKey = '6181062a57cf3321d1ba8b237509fb4b';
  var session = Utilities.getUuid();
  
  try {
    // Decode Base64 to bytes
    var imageBytes = Utilities.base64Decode(imageBase64);
    
    // Create form data payload
    var payload = {
      upload: imageBytes,
      key: apiKey,
      upload_session: session,
      numfiles: '1',
      gallery: '',
      adult: '0'
    };
    
    var options = {
      method: 'post',
      payload: payload,
      muteHttpExceptions: true
    };
    
    var response = UrlFetchApp.fetch('https://api.postimage.org/1/upload?output=json', options);
    var result = JSON.parse(response.getContentText());
    
    return result.direct || result.url || null;
  } catch (error) {
    Logger.log('Postimages upload error: ' + error);
    return null;
  }
}

