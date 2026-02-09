async function analyzeInvestorFit() {
  const sector = document.getElementById("sector").value.trim();
  const country = document.getElementById("country").value.trim();
  const stage = document.getElementById("stage").value;
  const resultBox = document.getElementById("result");

  if (!sector || !country) {
    resultBox.innerHTML = `<p style="color:red;">Please enter sector and country.</p>`;
    return;
  }

  resultBox.innerHTML = `<p>Analyzing investor fit...</p>`;

  try {
    const response = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sector, country, stage })
    });

    const data = await response.json();

    if (data.error) {
      resultBox.innerHTML = `<p style="color:red;"> ${data.error}</p>`;
      return;
    }

  
    const lines = data.result.split("\n").filter(l => l.trim());

    let html = "";
    lines.forEach(line => {
      html += `
        <div class="investor-card">
          ${line.replace(/\*\*/g, "<b>").replace(/\*\*/g, "</b>")}
        </div>
      `;
    });

    resultBox.innerHTML = html;

  } catch (err) {
    resultBox.innerHTML = `<p style="color:red;"> Could not connect to AI server.</p>`;
  }
}
