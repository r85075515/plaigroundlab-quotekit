/* QuoteKit — Client-Side Freelance Pricing & Instant PDF Invoice Engine */

const I18N = {
  "zh-TW": {
    appTitle: "QuoteKit 接案報價與發票",
    privacyPill: "100% 本機運算",
    heroKicker: "自由接案定價 × 即時報價單 PDF",
    heroHeadline: "別再低估報價。60 秒算出合理時薪並匯出專業 PDF 報價／請款單。",
    heroSub: "把稅金預留、軟體開銷與休假週數扣乾淨算出真正時薪底線，接著直接產生乾淨的雙語報價與請款單列印成 PDF，免註冊、資料不離開瀏覽器。",
    tabCalculator: "1. 時薪定價試算器",
    tabInvoice: "2. 報價單 / 請款單 PDF",
    calcInputsTitle: "目標年收與工時條件",
    lblCurrency: "幣別",
    lblTargetIncome: "目標年度稅後實拿收入",
    lblBillableHours: "每週可計費工時",
    lblVacationWeeks: "每年休假週數",
    lblOverheadPct: "工具訂閱與雜支成本 (%)",
    lblTaxBufferPct: "稅金與保障預留 (%)",
    calcResultsTitle: "建議報價底線",
    lblHourlyRate: "建議標準時薪",
    lblDayRate: "單日費率 (8h)",
    lblRushRate: "急件加價 (+35%)",
    lblRetainerRate: "長期顧問月約 (-10%)",
    btnApplyRate: "把此標準時薪帶入右側報價單 →",
    lblDocType: "單據類型",
    optInvoice: "請款單 (INVOICE)",
    optQuote: "報價單 (QUOTE)",
    lblInvCurrency: "單據幣別",
    btnAddItem: "+ 新增項目",
    btnPrintPdf: "列印 / 另存 PDF",
    lblFromName: "開立人／工作室名稱",
    lblFromEmail: "聯絡方式 / Email",
    lblDocNumber: "單據編號",
    lblIssueDate: "開立日期",
    lblClientName: "客戶名稱",
    colDescription: "項目說明",
    colQty: "數量 / 時數",
    colUnitPrice: "單價",
    colAmount: "小計",
    lblNotes: "付款條件與備註",
    lblSubtotal: "小計",
    lblDiscountPct: "折扣 (%)",
    lblTaxPct: "稅率 (%)",
    lblTotal: "應付總金額",
    proTag: "PRO 範本擴充包",
    proTitle: "需要 12 套雙語接案合約（SOW）、逾期利息條款與分期付款範本嗎？",
    proDesc: "專為獨立顧問與接案工程師設計，含 Notion／Google Docs／PDF 即改即用範本。",
    proCtaSoon: "Pro 範本包即將推出（$9）",
    proCtaBuy: "解鎖 Pro 範本包（$9）",
    footerPrivacy: "所有計算與單據完全在瀏覽器本機完成，絕不上傳任何客戶資料。",
    billableSummaryFmt: "每年計費 {weeks} 週 × {hours} 小時 = {totalHours} 計費小時（含成本與稅金緩衝）",
    defaultItem1: "Discovery & Architecture Sprint（需求盤點與架構設計）",
    defaultItem2: "Core Implementation & QA Delivery（核心開發與交付驗收）",
  },
  en: {
    appTitle: "QuoteKit",
    privacyPill: "100% Client-Side",
    heroKicker: "FREELANCE PRICING & INVOICING",
    heroHeadline: "Stop Underpricing. Send Client-Ready Quotes & PDF Invoices in 60 Seconds.",
    heroSub: "Compute your break-even hourly rate after taxes, overhead, and time off—then build and print clean PDF quotes directly in your browser without signup.",
    tabCalculator: "1. Rate Calculator",
    tabInvoice: "2. Quote & Invoice PDF",
    calcInputsTitle: "Income & Capacity Inputs",
    lblCurrency: "Currency",
    lblTargetIncome: "Target Net Annual Income",
    lblBillableHours: "Billable Hours / Week",
    lblVacationWeeks: "Weeks Off / Year",
    lblOverheadPct: "Software & Overhead (%)",
    lblTaxBufferPct: "Tax & Self-Employment Buffer (%)",
    calcResultsTitle: "Recommended Pricing Floor",
    lblHourlyRate: "Hourly Rate",
    lblDayRate: "Day Rate (8h)",
    lblRushRate: "Rush Rate (+35%)",
    lblRetainerRate: "Retainer Rate (-10%)",
    btnApplyRate: "Use This Hourly Rate in Quote Builder →",
    lblDocType: "Document Type",
    optInvoice: "INVOICE",
    optQuote: "ESTIMATE / QUOTE",
    lblInvCurrency: "Currency",
    btnAddItem: "+ Add Line Item",
    btnPrintPdf: "Print / Save PDF",
    lblFromName: "From (Your Name / Studio)",
    lblFromEmail: "Contact / Email",
    lblDocNumber: "Doc #",
    lblIssueDate: "Issue Date",
    lblClientName: "Bill To (Client)",
    colDescription: "Description",
    colQty: "Qty / Hrs",
    colUnitPrice: "Unit Rate",
    colAmount: "Amount",
    lblNotes: "Payment Terms & Notes",
    lblSubtotal: "Subtotal",
    lblDiscountPct: "Discount (%)",
    lblTaxPct: "Tax (%)",
    lblTotal: "Total Due",
    proTag: "PRO PACK",
    proTitle: "Want 12 Bilingual Contract + Scope-of-Work Templates & Retainer Calculators?",
    proDesc: "Includes agency-grade SOW clauses, late-fee terms, and milestone payment schedules ready for Notion, Google Docs, and PDF export.",
    proCtaSoon: "Pro Pack Launching Soon ($9)",
    proCtaBuy: "Get Pro Template Pack ($9)",
    footerPrivacy: "All calculations run locally in your browser. Zero data uploaded.",
    billableSummaryFmt: "{weeks} working weeks × {hours} hrs = {totalHours} billable hrs/yr (after tax & overhead buffer)",
    defaultItem1: "Discovery & Architecture Sprint",
    defaultItem2: "Core Implementation & QA Delivery",
  },
};

const DEFAULT_CONFIG = {
  currencies: [
    { code: "USD", symbol: "$", decimals: 2 },
    { code: "TWD", symbol: "NT$", decimals: 0 },
    { code: "EUR", symbol: "€", decimals: 2 },
  ],
  project_multipliers: { standard: 1.0, rush: 1.35, retainer_discount: 0.9 },
  pro_checkout_url: "",
};

let appConfig = DEFAULT_CONFIG;
let currentLang = "zh-TW";
let lastComputedHourly = 0;

function getCurrencySpec(code) {
  return (appConfig.currencies || DEFAULT_CONFIG.currencies).find((c) => c.code === code) || {
    code: "USD",
    symbol: "$",
    decimals: 2,
  };
}

function formatMoney(amount, currencyCode) {
  const spec = getCurrencySpec(currencyCode);
  const num = Number.isFinite(amount) ? amount : 0;
  return `${spec.symbol}${num.toLocaleString("en-US", {
    minimumFractionDigits: spec.decimals,
    maximumFractionDigits: spec.decimals,
  })}`;
}

function applyLanguage(lang) {
  currentLang = I18N[lang] ? lang : "zh-TW";
  const dict = I18N[currentLang];
  document.documentElement.lang = currentLang === "zh-TW" ? "zh-Hant" : "en";

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && dict[key]) {
      el.textContent = dict[key];
    }
  });
  updateProCta();
  recalculateRates();
  recalculateInvoice();
}

function updateProCta() {
  const btn = document.getElementById("pro-cta-btn");
  if (!btn) return;
  const dict = I18N[currentLang];
  const url = (appConfig.pro_checkout_url || "").trim();
  if (url && url.startsWith("https://")) {
    btn.href = url;
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.classList.remove("disabled");
    btn.removeAttribute("aria-disabled");
    btn.textContent = dict.proCtaBuy;
  } else {
    btn.href = "#pro-soon";
    btn.classList.add("disabled");
    btn.setAttribute("aria-disabled", "true");
    btn.textContent = dict.proCtaSoon;
  }
}

function recalculateRates() {
  const currency = document.getElementById("calc-currency").value;
  const netIncome = Math.max(0, Number(document.getElementById("calc-income").value) || 0);
  const hoursPerWeek = Math.max(1, Number(document.getElementById("calc-hours").value) || 1);
  const vacationWeeks = Math.min(51, Math.max(0, Number(document.getElementById("calc-vacation").value) || 0));
  const overheadPct = Math.max(0, Number(document.getElementById("calc-overhead").value) || 0) / 100;
  const taxPct = Math.min(0.85, Math.max(0, Number(document.getElementById("calc-tax").value) || 0) / 100);

  const workWeeks = Math.max(1, 52 - vacationWeeks);
  const billableHours = workWeeks * hoursPerWeek;
  const grossNeeded = (netIncome * (1 + overheadPct)) / Math.max(0.15, 1 - taxPct);
  const hourly = grossNeeded / billableHours;
  lastComputedHourly = Math.round(hourly);

  const mult = appConfig.project_multipliers || DEFAULT_CONFIG.project_multipliers;
  document.getElementById("res-hourly").textContent = formatMoney(lastComputedHourly, currency);
  document.getElementById("res-day").textContent = formatMoney(lastComputedHourly * 8, currency);
  document.getElementById("res-rush").textContent = formatMoney(Math.round(lastComputedHourly * mult.rush), currency);
  document.getElementById("res-retainer").textContent = formatMoney(Math.round(lastComputedHourly * mult.retainer_discount), currency);

  const fmt = I18N[currentLang].billableSummaryFmt;
  document.getElementById("calc-billable-summary").textContent = fmt
    .replace("{weeks}", String(workWeeks))
    .replace("{hours}", String(hoursPerWeek))
    .replace("{totalHours}", String(billableHours));
}

function createLineItemRow(desc, qty, rate) {
  const tr = document.createElement("tr");

  const tdDesc = document.createElement("td");
  const inpDesc = document.createElement("input");
  inpDesc.type = "text";
  inpDesc.className = "item-desc";
  inpDesc.value = desc;
  tdDesc.appendChild(inpDesc);

  const tdQty = document.createElement("td");
  tdQty.className = "num";
  const inpQty = document.createElement("input");
  inpQty.type = "number";
  inpQty.className = "num-input item-qty";
  inpQty.min = "0";
  inpQty.step = "0.5";
  inpQty.value = String(qty);
  tdQty.appendChild(inpQty);

  const tdRate = document.createElement("td");
  tdRate.className = "num";
  const inpRate = document.createElement("input");
  inpRate.type = "number";
  inpRate.className = "num-input item-rate";
  inpRate.min = "0";
  inpRate.step = "1";
  inpRate.value = String(rate);
  tdRate.appendChild(inpRate);

  const tdAmt = document.createElement("td");
  tdAmt.className = "num item-amt";
  tdAmt.textContent = "$0.00";

  const tdAct = document.createElement("td");
  tdAct.className = "no-print action-col";
  const btnDel = document.createElement("button");
  btnDel.type = "button";
  btnDel.className = "btn-remove";
  btnDel.textContent = "×";
  btnDel.addEventListener("click", () => {
    tr.remove();
    recalculateInvoice();
  });
  tdAct.appendChild(btnDel);

  [inpDesc, inpQty, inpRate].forEach((inp) => inp.addEventListener("input", recalculateInvoice));
  tr.append(tdDesc, tdQty, tdRate, tdAmt, tdAct);
  return tr;
}

function recalculateInvoice() {
  const currency = document.getElementById("inv-currency").value;
  let subtotal = 0;
  document.querySelectorAll("#inv-items-body tr").forEach((tr) => {
    const qty = Math.max(0, Number(tr.querySelector(".item-qty").value) || 0);
    const rate = Math.max(0, Number(tr.querySelector(".item-rate").value) || 0);
    const amt = qty * rate;
    subtotal += amt;
    tr.querySelector(".item-amt").textContent = formatMoney(amt, currency);
  });

  const discPct = Math.min(100, Math.max(0, Number(document.getElementById("inv-discount").value) || 0)) / 100;
  const taxPct = Math.min(50, Math.max(0, Number(document.getElementById("inv-tax").value) || 0)) / 100;
  const discountAmt = subtotal * discPct;
  const taxable = Math.max(0, subtotal - discountAmt);
  const taxAmt = taxable * taxPct;
  const total = taxable + taxAmt;

  document.getElementById("inv-subtotal").textContent = formatMoney(subtotal, currency);
  document.getElementById("inv-discount-amt").textContent = `-${formatMoney(discountAmt, currency)}`;
  document.getElementById("inv-tax-amt").textContent = formatMoney(taxAmt, currency);
  document.getElementById("inv-total").textContent = formatMoney(total, currency);
}

function switchTab(tabName) {
  document.querySelectorAll(".tab-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.tab === tabName);
  });
  document.getElementById("panel-calculator").classList.toggle("active", tabName === "calculator");
  document.getElementById("panel-invoice").classList.toggle("active", tabName === "invoice");
}

async function init() {
  try {
    const res = await fetch("./config.json");
    if (res.ok) appConfig = await res.json();
  } catch {
    appConfig = DEFAULT_CONFIG;
  }

  document.getElementById("inv-date").value = new Date().toISOString().slice(0, 10);

  const tbody = document.getElementById("inv-items-body");
  tbody.appendChild(createLineItemRow(I18N[currentLang].defaultItem1, 6, 100));
  tbody.appendChild(createLineItemRow(I18N[currentLang].defaultItem2, 16, 100));

  document.querySelectorAll(".lang-btn").forEach((b) => {
    b.addEventListener("click", () => applyLanguage(b.dataset.lang));
  });
  document.querySelectorAll(".tab-btn").forEach((b) => {
    b.addEventListener("click", () => switchTab(b.dataset.tab));
  });

  ["calc-currency", "calc-income", "calc-hours", "calc-vacation", "calc-overhead", "calc-tax"].forEach((id) => {
    document.getElementById(id).addEventListener("input", recalculateRates);
    document.getElementById(id).addEventListener("change", recalculateRates);
  });

  document.getElementById("btn-apply-rate").addEventListener("click", () => {
    recalculateRates();
    const calcCurr = document.getElementById("calc-currency").value;
    document.getElementById("inv-currency").value = calcCurr;
    document.querySelectorAll("#inv-items-body .item-rate").forEach((inp) => {
      inp.value = String(lastComputedHourly);
    });
    recalculateInvoice();
    switchTab("invoice");
  });

  document.getElementById("inv-doc-type").addEventListener("change", (e) => {
    document.getElementById("inv-type-badge").textContent = e.target.value;
  });
  ["inv-currency", "inv-discount", "inv-tax"].forEach((id) => {
    document.getElementById(id).addEventListener("input", recalculateInvoice);
    document.getElementById(id).addEventListener("change", recalculateInvoice);
  });
  document.getElementById("btn-add-item").addEventListener("click", () => {
    const rate = lastComputedHourly > 0 ? lastComputedHourly : 100;
    tbody.appendChild(createLineItemRow("Additional Deliverable", 2, rate));
    recalculateInvoice();
  });
  document.getElementById("btn-print-pdf").addEventListener("click", () => {
    window.print();
  });

  applyLanguage("zh-TW");
}

document.addEventListener("DOMContentLoaded", init);
