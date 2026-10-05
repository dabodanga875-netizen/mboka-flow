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
