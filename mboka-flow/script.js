const nav = document.getElementById("nav");
const menuBtn = document.querySelector(".menu-btn");
menuBtn?.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

document.querySelectorAll(".map-pin").forEach(pin => {
  pin.addEventListener("click", () => {
    const state = pin.classList.contains("red") ? "🔴 Embouteillage important" :
                  pin.classList.contains("yellow") ? "🟡 Circulation ralentie" :
                  "🟢 Circulation fluide";
    document.getElementById("mapMessage").textContent = `${pin.dataset.place} : ${state}`;
  });
});

document.getElementById("locateBtn")?.addEventListener("click", () => {
  document.getElementById("mapMessage").textContent =
    "📍 Démo : position détectée. En production, cette fonction utilisera la géolocalisation du téléphone.";
});

document.getElementById("searchPlace")?.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const value = e.target.value.trim();
    document.getElementById("mapMessage").textContent =
      value ? `🔎 Recherche démo : ${value}` : "Entrez un quartier ou une avenue.";
  }
});

document.getElementById("incidentForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const type = document.getElementById("incidentType").value;
  const place = document.getElementById("incidentPlace").value.trim();
  const result = document.getElementById("incidentResult");
  result.hidden = false;
  result.textContent = `✓ Merci. Votre signalement « ${type} » à ${place} a été enregistré dans cette démo.`;
  e.target.reset();
});

document.getElementById("contactForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const subject = encodeURIComponent(`Mboka Flow — ${data.get("subject")}`);
  const body = encodeURIComponent(
    `Nom : ${data.get("name")}\nEmail : ${data.get("email")}\n\n${data.get("message")}`
  );
  window.location.href = `mailto:dabodanga2019@gmail.com?subject=${subject}&body=${body}`;
});

document.getElementById("year").textContent = new Date().getFullYear();


// Real Kinshasa basemap using Leaflet + OpenStreetMap.
// Traffic markers remain DEMO data until a live traffic API/backend is connected.
(function initKinshasaMap() {
  const mapEl = document.getElementById('kinshasaMap');
  if (!mapEl || typeof L === 'undefined') return;
  const map = L.map('kinshasaMap').setView([-4.325, 15.322], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
  }).addTo(map);
  const points = [
    ['Avenue du Port', [-4.3198, 15.3072], 'Embouteillage', '#dc2626'],
    ['Boulevard du 30 Juin', [-4.3138, 15.2895], 'Ralenti', '#f59e0b'],
    ['Route de Matadi', [-4.3780, 15.2580], 'Fluide', '#16a34a']
  ];
  points.forEach(([name, coords, status, color]) => {
    L.circleMarker(coords, { radius: 9, color: '#fff', weight: 2, fillColor: color, fillOpacity: .9 })
      .addTo(map).bindPopup(`<strong>${name}</strong><br>${status}<br><small>Donnée de démonstration</small>`);
  });
  const search = document.getElementById('searchPlace');
  if (search) search.addEventListener('keydown', async e => {
    if (e.key !== 'Enter') return;
    const q = search.value.trim(); if (!q) return;
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=cd&q=${encodeURIComponent(q + ', Kinshasa, Democratic Republic of the Congo')}`;
      const results = await (await fetch(url)).json();
      if (!results.length) { document.getElementById('mapMessage').textContent = 'Lieu non trouvé. Essayez Gombe, Limete, Matete ou Masina.'; return; }
      const r = results[0], coords = [Number(r.lat), Number(r.lon)];
      map.setView(coords, 15);
      L.marker(coords).addTo(map).bindPopup(r.display_name).openPopup();
      document.getElementById('mapMessage').textContent = `Lieu trouvé : ${r.display_name}`;
    } catch { document.getElementById('mapMessage').textContent = 'Recherche temporairement indisponible.'; }
  });
  const locate = document.getElementById('locateBtn');
  if (locate) locate.addEventListener('click', () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = [pos.coords.latitude, pos.coords.longitude];
      map.setView(coords, 15);
      L.marker(coords).addTo(map).bindPopup('Votre position').openPopup();
    }, () => { document.getElementById('mapMessage').textContent = 'Position non disponible. Autorisez la localisation dans votre navigateur si vous le souhaitez.'; });
  });
  setTimeout(() => map.invalidateSize(), 250);
})();
