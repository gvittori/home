// Set authorized scope.
function gapiInit() {
  gapi.client.init({
    apiKey: GAconfig.apiKey,
    discoveryDocs: [],
    clientId: GAconfig.client_id,
    scope: GAconfig.scopes
  })
}

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
              startDate: '30daysAgo',
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
