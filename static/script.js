document.getElementById('diagnosis-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const symptoms = document.getElementById('symptoms').value;
  const resultsDiv = document.getElementById('diagnosis-results');
  resultsDiv.innerHTML = 'Loading...';
  
  try {
    const response = await fetch('/diagnose', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `symptoms=${encodeURIComponent(symptoms)}`
    });
    const data = await response.json();
    if (data.error) {
      resultsDiv.innerHTML = '<p class="error">' + data.error + '</p>';
    } else {
      let html = '<h3>Diagnosis Results:</h3>';
      data.results.forEach(function(result) {
        html += `<div class="result">
                  <p><strong>Rank ${result.rank}:</strong> ${result.disease}</p>
                  <p><strong>Confidence:</strong> ${result.confidence}</p>`;
        if (result.description) {
          html += `<p><strong>Description:</strong> ${result.description}</p>`;
        }
        if (result.precautions) {
          html += `<p><strong>Precautions:</strong> ${result.precautions.join(', ')}</p>`;
        }
        html += `</div>`;
      });
      resultsDiv.innerHTML = html;
    }
  } catch (error) {
    resultsDiv.innerHTML = '<p class="error">Error: ' + error.message + '</p>';
  }
});

document.getElementById('chatbot-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const prompt = document.getElementById('prompt').value;
  const responseDiv = document.getElementById('chatbot-response');
  responseDiv.innerHTML = 'Loading...';
  
  try {
    const response = await fetch('/chatbot', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `prompt=${encodeURIComponent(prompt)}`
    });
    const data = await response.json();
    responseDiv.innerHTML = `<p>${data.response}</p>`;
  } catch (error) {
    responseDiv.innerHTML = '<p class="error">Error: ' + error.message + '</p>';
  }
});