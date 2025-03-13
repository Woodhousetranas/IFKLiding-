// script.js
document.addEventListener('DOMContentLoaded', function () {
    function getPrice(id) {
      return parseFloat(document.getElementById(id).textContent.trim());
    }
    function nameTryckExtraCost(nameFieldId) {
      const val = document.getElementById(nameFieldId).value.trim();
      return (val !== '') ? 100 : 0;
    }
    function getSelectedArticle(selectId) {
      const sel = document.getElementById(selectId);
      if (!sel) return '(Inget)';
      const idx = sel.selectedIndex;
      if (idx === -1) return '(Ingen)';
      return sel.options[idx].getAttribute('data-article') || '(Ingen)';
    }
    function calculateTotal() {
      let tshirtPrice1 = getPrice('tshirt_pris1');
      let tshirtQty1 = parseInt(document.getElementById('tshirt_qty1').value) || 0;
      let tshirtNamn1 = nameTryckExtraCost('tshirt_namntryck1');
  
      let tshirtPrice2 = getPrice('tshirt_pris2');
      let tshirtQty2 = parseInt(document.getElementById('tshirt_qty2').value) || 0;
      let tshirtNamn2 = nameTryckExtraCost('tshirt_namntryck2');
  
      let shortsPrice1 = getPrice('shorts_pris1');
      let shortsQty1 = parseInt(document.getElementById('shorts_qty1').value) || 0;
  
      let shortsPrice2 = getPrice('shorts_pris2');
      let shortsQty2 = parseInt(document.getElementById('shorts_qty2').value) || 0;
  
      let overallPrice1 = getPrice('overall_pris1');
      let overallQty1 = parseInt(document.getElementById('overall_qty1').value) || 0;
      let overallNamn1 = nameTryckExtraCost('overall_namntryck1');
  
      let overallPrice2 = getPrice('overall_pris2');
      let overallQty2 = parseInt(document.getElementById('overall_qty2').value) || 0;
      let overallNamn2 = nameTryckExtraCost('overall_namntryck2');
  
      let total = 
        (tshirtPrice1 * tshirtQty1 + tshirtNamn1 * tshirtQty1) +
        (tshirtPrice2 * tshirtQty2 + tshirtNamn2 * tshirtQty2) +
        (shortsPrice1 * shortsQty1) +
        (shortsPrice2 * shortsQty2) +
        (overallPrice1 * overallQty1 + overallNamn1 * overallQty1) +
        (overallPrice2 * overallQty2 + overallNamn2 * overallQty2);
  
      document.getElementById('totalDisplay').textContent = `Totalt: ${total} kr`;
      return total;
    }
    function updatePreview() {
      let preview = document.getElementById('livePreview');
      let total = calculateTotal();
  
      let tshirtSize1 = document.getElementById('tshirt_size1').value || '(Ingen)';
      let tshirtArt1 = getSelectedArticle('tshirt_size1');
      let tshirtQty1 = document.getElementById('tshirt_qty1').value || '0';
      let tshirtNtryck1 = document.getElementById('tshirt_namntryck1').value.trim();
  
      let htmlPreview = `
        <h4>Förhandsvisning</h4>
        <table>
          <tr>
            <th>Produkt</th>
            <th>Artikelnr</th>
            <th>Storlek</th>
            <th>Antal</th>
            <th>Namntryck</th>
          </tr>
          <tr>
            <td>T-shirt #1</td>
            <td>${tshirtArt1}</td>
            <td>${tshirtSize1}</td>
            <td>${tshirtQty1}</td>
            <td>${tshirtNtryck1 ? tshirtNtryck1 : 'Inget'}</td>
          </tr>
        </table>
        <p><strong>Totalt just nu:</strong> ${total} kr</p>
      `;
      preview.innerHTML = htmlPreview;
    }
    function buildSummary() {
      let total = calculateTotal();
  
      let kundNamn = document.getElementById('namn').value;
      let kundAdress = document.getElementById('adress').value;
      let kundMobil = document.getElementById('mobilnummer').value;
      let kundMejl = document.getElementById('mejl').value;
  
      let tshirtSize1 = document.getElementById('tshirt_size1').value || '(Ingen)';
      let tshirtArt1 = getSelectedArticle('tshirt_size1');
      let tshirtQty1 = document.getElementById('tshirt_qty1').value || '0';
      let tshirtNtryck1 = document.getElementById('tshirt_namntryck1').value.trim();
  
      let htmlSummary = `
        <h2>Kunduppgifter</h2>
        <p>
          <strong>Namn:</strong> ${kundNamn}<br/>
          <strong>Adress:</strong> ${kundAdress}<br/>
          <strong>Mobil:</strong> ${kundMobil}<br/>
          <strong>Mejl:</strong> ${kundMejl}
        </p>
        <table border="1" cellpadding="5" style="border-collapse:collapse;">
          <tr>
            <th>Produkt</th>
            <th>Artikelnr</th>
            <th>Storlek</th>
            <th>Antal</th>
            <th>Namntryck</th>
          </tr>
          <tr>
            <td>T-shirt #1</td>
            <td>${tshirtArt1}</td>
            <td>${tshirtSize1}</td>
            <td>${tshirtQty1}</td>
            <td>${tshirtNtryck1 ? tshirtNtryck1 : 'Inget'}</td>
          </tr>
        </table>
        <p><strong>Totalt beräknat pris:</strong> ${total} kr<br/>
        <em>Fraktkostnad tillkommer</em></p>
      `;
      document.getElementById('order_summary').value = htmlSummary;
      document.getElementById('replyToField').value = kundMejl;
    }
    function showThankYou() {
      let overlay = document.getElementById('thankYouOverlay');
      overlay.style.display = 'flex';
      overlay.focus();
    }
    function closeOverlay() {
      document.getElementById('thankYouOverlay').style.display = 'none';
    }
    // Koppla event-listeners för inputs
    const fieldsToWatch = [
      'tshirt_qty1','tshirt_qty2','tshirt_namntryck1','tshirt_namntryck2',
      'shorts_qty1','shorts_qty2',
      'overall_qty1','overall_qty2','overall_namntryck1','overall_namntryck2'
    ];
    fieldsToWatch.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          calculateTotal();
          updatePreview();
        });
      }
    });
    // Koppla submit-event
    document.getElementById('orderForm').addEventListener('submit', function(e) {
      e.preventDefault();
      buildSummary();
      showThankYou();
      // Om du vill skicka formuläret vidare via AJAX eller fortsätta med vanlig submit kan du lägga till detta här.
    });
    // Stäng-overlay knappen
    document.getElementById('closeOverlay').addEventListener('click', closeOverlay);
    document.addEventListener('keydown', function(e) {
      if (e.key === "Escape") {
        closeOverlay();
      }
    });
    // Initiera total och preview vid laddning
    calculateTotal();
    updatePreview();
  });
  