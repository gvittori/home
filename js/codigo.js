//let randClientId = Math.round(Math.random() * 2147483647);

let excelURL = "https://docs.google.com/spreadsheets/d/11mdkanRkRTlNKZEWooBsmKYzKnqFT9KOeRvxToFkRoE/edit#gid=0";

// Replace with your client ID from the developer console.
let CLIENT_ID = GAconfig.client_id;
// Set authorized scope.
let SCOPES = [
  'https://www.googleapis.com/auth/analytics',
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/cloud-platform.read-only',

];
// Replace with your view ID.
var VIEW_ID = '<REPLACE_WITH_VIEW_ID>';

// Query the API and print the results to the page.
function queryReports() {
  gapi.client.request({
    path: '/v4/reports:batchGet',
    root: 'https://analyticsreporting.googleapis.com/',
    method: 'POST',
    body: {
      reportRequests: [
        {
          viewId: VIEW_ID,
          dateRanges: [
            {
              startDate: '7daysAgo',
              endDate: 'today'
            }
          ],
          metrics: [
            {
              expression: 'ga:sessions'
            }
          ]
        }
      ]
    }
  }).then(displayResults, console.error.bind(console));
}

function displayResults(response) {
  var formattedJson = JSON.stringify(response.result, null, 2);
  document.getElementById('query-output').value = formattedJson;
  console.log(formattedJson);
}
