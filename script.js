const speeds = [
  { category: "ԵՐԿՐԻ ՎՐԱ", kicker: "ԴԱՆԴԱՂ, ԲԱՅՑ ՀԱՍՏԱՏ", title: "Խխունջ", illustration: "🐌", value: "0.001", conversion: "մոտ 3.6 մ/ժ", fact: "Խխունջը շարժվում է դանդաղ, բայց իր փոքրիկ աշխարհում դա արդեն իսկական ճանապարհորդություն է։", speed: 0.001 },
  { category: "ԵՐԿՐԻ ՎՐԱ", kicker: "ՄԱՐԴՈՒ ՍՈՎՈՐԱԿԱՆ ՔԱՅԼԸ", title: "Քայլող մարդ", illustration: "🚶", value: "1.4", conversion: "մոտ 5 կմ/ժ", fact: "Հանգիստ քայլելիս մարդը մեկ վայրկյանում անցնում է մոտ մեկուկես մետր։", speed: 1.4 },
  { category: "ԵՐԿՐԻ ՎՐԱ", kicker: "ԱՇԽԱՐՀԻ ԱՄԵՆԱԱՐԱԳ ՑԱՄԱՔԱՅԻՆ ԿԵՆԴԱՆԻՆ", title: "Գեպարդ", illustration: "🐆", value: "30", conversion: "մոտ 108 կմ/ժ", fact: "Գեպարդը կարող է կարճ տարածության վրա արագացնել գրեթե նույնքան, որքան մեքենան։", speed: 30 },
  { category: "ԵՐԿՐԻ ՎՐԱ", kicker: "ԱՐԱԳ ՄԵՔԵՆԱՅԻ ՃԱՆԱՊԱՐՀԸ", title: "Սպորտային մեքենա", illustration: "🏎️", value: "90", conversion: "մոտ 324 կմ/ժ", fact: "Հզոր սպորտային մեքենան մայրուղու արագությունից մի քանի անգամ արագ է սլանում։", speed: 90 },
  { category: "ՄԹՆՈԼՈՐՏՈՒՄ", kicker: "ԲԱՐՁՐ ԹՌԻՉՔ", title: "Ուղևորատար ինքնաթիռ", illustration: "✈️", value: "250", conversion: "մոտ 900 կմ/ժ", fact: "Ինքնաթիռը հազարավոր մետր բարձրության վրա մեկ ժամում անցնում է հարյուրավոր կիլոմետրեր։", speed: 250 },
  { category: "ՁԱՅՆԻ ԱՐԱԳՈՒԹՅՈՒՆԸ", kicker: "ԱԼԻՔ, ՈՐԸ ԼՍՈՒՄ ԵՆՔ", title: "Ձայնը օդում", illustration: "〰️", value: "343", conversion: "մոտ 1 235 կմ/ժ՝ 20°C-ում", fact: "Ձայնը օդում տարածվում է մոտ 343 մ/վ արագությամբ։ Ջերմաստիճանի փոփոխության հետ այդ արագությունն էլ է փոխվում։", speed: 343 },
  { category: "ԵՐԿՐԻ ՈՒՂԵԾՐՈՒՄ", kicker: "ՄԵՐ ՄՈԼՈՐԱԿԻ ՇՈՒՐՋԸ", title: "Միջազգային տիեզերակայան", illustration: "🛰️", value: "7 660", conversion: "մոտ 27 600 կմ/ժ", fact: "Տիեզերակայանն այնքան արագ է պտտվում Երկրի շուրջը, որ մոտ 90 րոպեում մեկ պտույտ է կատարում։", speed: 7660 },
  { category: "ԱՐԵԳԱԿՆԱՅԻՆ ՀԱՄԱԿԱՐԳՈՒՄ", kicker: "ԵՐԿԻՐԸ ՃԱՆԱՊԱՐՀՈՐԴՈՒՄ Է", title: "Երկիրը Արեգակի շուրջ", illustration: "🌍", value: "29 780", conversion: "մոտ 107 200 կմ/ժ", fact: "Մենք նույնիսկ անշարժ կանգնած ժամանակ Արեգակի շուրջը շարժվում ենք ահռելի արագությամբ։", speed: 29780 },
  { category: "ՏԻԵԶԵՐՔԻ ՍԱՀՄԱՆԸ", kicker: "ԱՐԱԳՈՒԹՅԱՆ ԲՆԱԿԱՆ ՍԱՀՄԱՆԸ", title: "Լույս", illustration: "✨", value: "299 792 458", conversion: "մ/վ • մոտ 300 000 կմ/վ", fact: "Վակուումում լույսը մեկ վայրկյանում անցնում է գրեթե 300 հազար կիլոմետր։ Այն բնության մեջ հայտնի ամենաարագ շարժումն է։", speed: 299792458 },
];

const card = document.querySelector("#speed-card");
const stage = document.querySelector("#card-stage");
const dots = document.querySelector("#carousel-dots");
const previousButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");
const fields = {
  category: document.querySelector("#card-category"),
  count: document.querySelector("#card-count"),
  illustration: document.querySelector("#card-illustration"),
  kicker: document.querySelector("#card-kicker"),
  title: document.querySelector("#card-title"),
  value: document.querySelector("#card-value"),
  conversion: document.querySelector("#card-conversion"),
  fact: document.querySelector("#card-fact"),
  indexDecoration: document.querySelector("#card-index-decoration"),
  scaleFill: document.querySelector("#scale-fill"),
  scaleMarker: document.querySelector("#scale-marker"),
};

let currentIndex = 0;
let touchStartX = null;

function makeDots() {
  const fragment = document.createDocumentFragment();

  speeds.forEach((speed, index) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `${index + 1}. ${speed.title}`);
    dot.setAttribute("aria-current", String(index === currentIndex));
    dot.addEventListener("click", () => showSpeed(index));
    fragment.append(dot);
  });

  dots.replaceChildren(fragment);
}

function showSpeed(index) {
  currentIndex = (index + speeds.length) % speeds.length;
  const speed = speeds[currentIndex];
  const number = String(currentIndex + 1).padStart(2, "0");

  card.classList.add("is-changing");
  window.setTimeout(() => {
    fields.category.textContent = speed.category;
    fields.count.innerHTML = `${number} <span>/ ${String(speeds.length).padStart(2, "0")}</span>`;
    fields.illustration.textContent = speed.illustration;
    fields.kicker.textContent = speed.kicker;
    fields.title.textContent = speed.title;
    fields.value.textContent = speed.value;
    fields.conversion.textContent = speed.conversion;
    fields.fact.textContent = speed.fact;
    fields.indexDecoration.textContent = number;

    const progress = Math.max(0, Math.min(100, (Math.log10(speed.speed + 1) / Math.log10(299792458 + 1)) * 100));
    fields.scaleFill.style.width = `${progress}%`;
    fields.scaleMarker.style.left = `${progress}%`;
    card.classList.remove("is-changing");

    dots.querySelectorAll(".carousel-dot").forEach((dot, dotIndex) => {
      dot.setAttribute("aria-current", String(dotIndex === currentIndex));
    });
  }, 110);
}

previousButton.addEventListener("click", () => showSpeed(currentIndex - 1));
nextButton.addEventListener("click", () => showSpeed(currentIndex + 1));

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === "ArrowLeft") showSpeed(currentIndex - 1);
  if (event.key === "ArrowRight") showSpeed(currentIndex + 1);
});

stage.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

stage.addEventListener("touchend", (event) => {
  if (touchStartX === null) return;
  const difference = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(difference) > 45) showSpeed(currentIndex + (difference < 0 ? 1 : -1));
  touchStartX = null;
}, { passive: true });

makeDots();
showSpeed(currentIndex);