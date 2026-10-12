/**
 * PALO ALTO NETWORKS HR ANALYTICS DIAGNOSTIC
 * Research Paper & Immersive Interactive Dashboard JavaScript
 * Complete statistical engine, interactive artifacts, dynamic charts, and audit explorer.
 */

// Dataset Summary & Benchmark Parameters (Derived from analysis_results.json & CSV tables)
const DATASET = {
  totalRecords: 1470,
  columns: 31,
  validationChecks: 21,
  passedChecks: 21,
  missingCells: 0,
  duplicates: 0,
  cei: {
    mean: 68.08,
    sd: 12.60,
    median: 68.75,
    min: 31.25,
    max: 100.0,
    p25: 62.5,
    p75: 75.0,
    ci95: [67.43, 68.72],
    below50Count: 69,
    below50Share: 0.0469,
    cronbachAlpha: -0.0071,
    interItemCorrMean: -0.0012,
    itemMeans: {
      JobInvolvement: 2.73,
      JobSatisfaction: 2.73,
      EnvironmentSatisfaction: 2.72,
      RelationshipSatisfaction: 2.71,
      WorkLifeBalance: 2.76
    }
  },
  burnout: {
    counts: { High: 126, Medium: 588, Low: 756 },
    shares: { High: 0.0857, Medium: 0.4000, Low: 0.5143 },
    overtimeShare: 0.2830,
    lowWlbShare: 0.2884,
    wlbMean: 2.76
  },
  overtimeVsNot: {
    nYes: 416,
    nNo: 1054,
    meanYes: 69.61,
    meanNo: 67.48,
    diff: 2.13,
    d: 0.17,
    bootCi: [0.72, 3.49],
    welchP: 0.0033
  },
  attrition: {
    nLeft: 237,
    nStayed: 1233,
    rate: 0.1612,
    meanLeft: 62.38,
    meanStayed: 69.17,
    diff: -6.79,
    d: 0.58,
    bootCi: [-8.51, -5.09],
    welchP: 0.00001,
    byBurnoutRate: { High: 0.3571, Medium: 0.1667, Low: 0.1243 },
    byOvertimeRate: { Yes: 0.3053, No: 0.1044 }
  },
  departments: [
    { name: "Research & Development", n: 961, mean: 68.26, ciLo: 67.47, ciHi: 69.05, highShare: 0.0885, belowShare: 0.0437 },
    { name: "Sales", n: 446, mean: 67.67, ciLo: 66.47, ciHi: 68.87, highShare: 0.0874, belowShare: 0.0538 },
    { name: "Human Resources", n: 63, mean: 68.25, ciLo: 65.32, ciHi: 71.19, highShare: 0.0317, belowShare: 0.0317 }
  ],
  priorityAreas: [
    {
      role: "Sales Representative",
      dept: "Sales",
      n: 83,
      ceiMean: 67.02,
      ceiLo: 64.23,
      ceiHi: 69.81,
      pctBelow: 0.0602,
      pctOvertime: 0.2892,
      pctLowWlb: 0.2048,
      pctHighBurnout: 0.0723,
      wlbMean: 2.89,
      wsiMean: 39.04,
      csiMean: 60.99,
      csiN: 53,
      attritionRate: 0.3976,
      deptBaseline: 67.67,
      ceiGap: -0.65,
      flags: ["stagnation"],
      tier: "Monitor",
      recommendation: "Flagged on career stagnation heuristic (CSI 61.0 vs 51.4 dept avg). High attrition (39.8%). Initiate local career pathway dialogue, progression milestones, and skill development."
    },
    {
      role: "Research Director",
      dept: "Research & Development",
      n: 80,
      ceiMean: 66.64,
      ceiLo: 63.89,
      ceiHi: 69.39,
      pctBelow: 0.0500,
      pctOvertime: 0.2875,
      pctLowWlb: 0.2375,
      pctHighBurnout: 0.0875,
      wlbMean: 2.86,
      wsiMean: 36.35,
      csiMean: 46.81,
      csiN: 74,
      attritionRate: 0.0250,
      deptBaseline: 68.26,
      ceiGap: -1.62,
      flags: [],
      tier: "Normal",
      recommendation: "Lowest nominal CEI (66.6) but difference is within sampling noise (CI spans 63.9-69.4). Low attrition (2.5%). No structural prompt triggered."
    },
    {
      role: "Laboratory Technician",
      dept: "Research & Development",
      n: 259,
      ceiMean: 67.45,
      ceiLo: 65.86,
      ceiHi: 69.04,
      pctBelow: 0.0618,
      pctOvertime: 0.2394,
      pctLowWlb: 0.3012,
      pctHighBurnout: 0.0927,
      wlbMean: 2.72,
      wsiMean: 36.14,
      csiMean: 50.19,
      csiN: 198,
      attritionRate: 0.2394,
      deptBaseline: 68.26,
      ceiGap: -0.81,
      flags: [],
      tier: "Normal",
      recommendation: "Elevated low work-life balance share (30.1%) and attrition (23.9%). Workload review recommended if overtime shifts higher."
    },
    {
      role: "Human Resources",
      dept: "Human Resources",
      n: 52,
      ceiMean: 67.67,
      ceiLo: 64.46,
      ceiHi: 70.87,
      pctBelow: 0.0385,
      pctOvertime: 0.2500,
      pctLowWlb: 0.1923,
      pctHighBurnout: 0.0385,
      wlbMean: 2.92,
      wsiMean: 35.46,
      csiMean: 46.62,
      csiN: 47,
      attritionRate: 0.2308,
      deptBaseline: 68.25,
      ceiGap: -0.59,
      flags: [],
      tier: "Normal",
      recommendation: "Small cohort (n=52). High burnout share is suppressed/low (<=2 cases). Metric distribution aligns with organizational averages."
    },
    {
      role: "Sales Executive",
      dept: "Sales",
      n: 326,
      ceiMean: 67.77,
      ceiLo: 66.37,
      ceiHi: 69.18,
      pctBelow: 0.0552,
      pctOvertime: 0.2883,
      pctLowWlb: 0.2699,
      pctHighBurnout: 0.0890,
      wlbMean: 2.80,
      wsiMean: 37.61,
      csiMean: 50.66,
      csiN: 301,
      attritionRate: 0.1748,
      deptBaseline: 67.67,
      ceiGap: 0.10,
      flags: [],
      tier: "Normal",
      recommendation: "Largest sales cohort (n=326). Consistent engagement, CSI, and burnout profile closely matching enterprise baseline."
    },
    {
      role: "Healthcare Representative",
      dept: "Research & Development",
      n: 131,
      ceiMean: 68.65,
      ceiLo: 66.37,
      ceiHi: 70.94,
      pctBelow: 0.0611,
      pctOvertime: 0.2824,
      pctLowWlb: 0.3053,
      pctHighBurnout: 0.0611,
      wlbMean: 2.70,
      wsiMean: 37.94,
      csiMean: 47.20,
      csiN: 118,
      attritionRate: 0.0687,
      deptBaseline: 68.26,
      ceiGap: 0.40,
      flags: [],
      tier: "Normal",
      recommendation: "Very low attrition (6.9%) despite 30.5% low WLB. Indicates resilient organizational attachment or alternative compensation buffers."
    },
    {
      role: "Research Scientist",
      dept: "Research & Development",
      n: 292,
      ceiMean: 68.77,
      ceiLo: 67.32,
      ceiHi: 70.22,
      pctBelow: 0.0411,
      pctOvertime: 0.3322,
      pctLowWlb: 0.3493,
      pctHighBurnout: 0.1096,
      wlbMean: 2.68,
      wsiMean: 38.76,
      csiMean: 50.13,
      csiN: 238,
      attritionRate: 0.1610,
      deptBaseline: 68.26,
      ceiGap: 0.52,
      flags: [],
      tier: "Normal",
      recommendation: "Highest overtime rate (33.2%) and low WLB (34.9%), producing 11.0% High burnout screen. Close to the 15% prompt threshold."
    },
    {
      role: "Manufacturing Director",
      dept: "Research & Development",
      n: 145,
      ceiMean: 68.79,
      ceiLo: 67.06,
      ceiHi: 70.52,
      pctBelow: 0.0345,
      pctOvertime: 0.2690,
      pctLowWlb: 0.2828,
      pctHighBurnout: 0.0759,
      wlbMean: 2.77,
      wsiMean: 37.57,
      csiMean: 48.20,
      csiN: 133,
      attritionRate: 0.0690,
      deptBaseline: 68.26,
      ceiGap: 0.54,
      flags: [],
      tier: "Normal",
      recommendation: "Low attrition (6.9%), stable engagement above department baseline. Workload indicators well balanced."
    },
    {
      role: "Manager (Sales)",
      dept: "Sales",
      n: 37,
      ceiMean: 68.24,
      ceiLo: 63.93,
      ceiHi: 72.55,
      pctBelow: 0.0270,
      pctOvertime: 0.2703,
      pctLowWlb: 0.3514,
      pctHighBurnout: 0.0541,
      wlbMean: 2.76,
      wsiMean: 33.98,
      csiMean: 42.68,
      csiN: 31,
      attritionRate: 0.0541,
      deptBaseline: 67.67,
      ceiGap: 0.57,
      flags: [],
      tier: "Normal",
      recommendation: "Small leadership cohort (n=37). Low attrition (5.4%). WLB strain observed but buffer resources appear sufficient."
    },
    {
      role: "Manager (R&D)",
      dept: "Research & Development",
      n: 54,
      ceiMean: 69.33,
      ceiLo: 66.29,
      ceiHi: 72.37,
      pctBelow: 0.0185,
      pctOvertime: 0.2407,
      pctLowWlb: 0.2778,
      pctHighBurnout: 0.0741,
      wlbMean: 2.76,
      wsiMean: 32.96,
      csiMean: 50.69,
      csiN: 51,
      attritionRate: 0.0556,
      deptBaseline: 68.26,
      ceiGap: 1.07,
      flags: [],
      tier: "Normal",
      recommendation: "High average engagement (69.3) and very low attrition (5.6%). Healthy leadership team dynamic."
    },
    {
      role: "Manager (HR)",
      dept: "Human Resources",
      n: 11,
      ceiMean: 71.02,
      ceiLo: 63.59,
      ceiHi: 78.46,
      pctBelow: 0.0000,
      pctOvertime: 0.1818,
      pctLowWlb: 0.0909,
      pctHighBurnout: 0.0000,
      wlbMean: 2.91,
      wsiMean: 39.39,
      csiMean: 39.94,
      csiN: 11,
      attritionRate: 0.0000,
      deptBaseline: 68.25,
      ceiGap: 2.77,
      flags: [],
      tier: "Normal",
      recommendation: "Smallest area cohort (n=11, privacy rules strictly apply). Zero recorded attrition and zero high burnout cases."
    }
  ],
  validationItems: [
    { name: "Field Count Specification", rule: "31 columns present, no unexpected fields", status: "Pass", details: "All 31 specified fields identified in header schema." },
    { name: "Data Type Conformance", rule: "24 numeric, 7 categorical strings", status: "Pass", details: "Zero type-casting failures or unexpected conversions." },
    { name: "Missing Value Check", rule: "0 missing values across all cells", status: "Pass", details: "0 missing cells found across 1,470 x 31 = 45,570 cells." },
    { name: "Duplicate Row Detection", rule: "0 fully duplicated rows", status: "Pass", details: "All 1,470 employee profile records are distinct." },
    { name: "Ordinal Rating Range (1-4)", rule: "Scale items strictly bounded within [1, 4]", status: "Pass", details: "JobInvolvement, JobSat, EnvSat, RelSat, WLB all within [1, 4]." },
    { name: "Closed Categorical Sets", rule: "Attrition in {0,1}, OverTime in {Yes,No}, etc.", status: "Pass", details: "Attrition, OverTime, BusinessTravel, Gender, MaritalStatus valid." },
    { name: "Education Range (1-5)", rule: "Education integer in [1, 5]", status: "Pass", details: "All education levels conform to standard 1-5 scale." },
    { name: "Logical Relationship Tenure", rule: "YearsInCurrentRole <= YearsAtCompany", status: "Pass", details: "0 chronological inconsistencies detected." },
    { name: "Logical Promotion Tenure", rule: "YearsSinceLastPromotion <= YearsAtCompany", status: "Pass", details: "0 chronological inconsistencies detected." },
    { name: "Logical Manager Tenure", rule: "YearsWithCurrManager <= YearsAtCompany", status: "Pass", details: "0 chronological inconsistencies detected." },
    { name: "Total Working Years Check", rule: "TotalWorkingYears >= YearsAtCompany", status: "Pass", details: "0 chronological inconsistencies detected." },
    { name: "Non-Negative Numeric Constraints", rule: "Age, Distance, Income, Rates >= 0", status: "Pass", details: "Zero negative values across all 16 quantitative fields." },
    { name: "Open Categorical Validation", rule: "Observe Departments, Roles, EducationFields", status: "Pass", details: "3 departments, 9 roles, 6 education fields verified." }
  ]
};

// Initialize Application on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initReadingProgressBar();
  initTableOfContents();
  initArtifact1_CeiCalculator();
  initArtifact2_BurnoutScreen();
  initArtifact3_WsiCsiSandbox();
  initArtifact4_ActionPanel();
  initArtifact5_StatInspector();
  initArtifact6_ValidationExplorer();
  initDashboard();
  initFigureModal();
  initMotionToggle();
});

/* --------------------------------------------------------------------------
 * 1. READING PROGRESS BAR & SCROLLSPY
 * -------------------------------------------------------------------------- */
function initReadingProgressBar() {
  const bar = document.getElementById("reading-progress");
  if (!bar) return;

  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.pageYOffset / totalHeight) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }, { passive: true });
}

function initTableOfContents() {
  const sections = document.querySelectorAll(".paper-section, .paper-header, #immersive-dashboard");
  const tocLinks = document.querySelectorAll(".toc-item a");

  if (!sections.length || !tocLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach((link) => {
          const item = link.closest(".toc-item");
          if (link.getAttribute("href") === `#${id}`) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      }
    });
  }, { rootMargin: "-15% 0px -70% 0px", threshold: 0 });

  sections.forEach((sec) => observer.observe(sec));
}

/* --------------------------------------------------------------------------
 * 2. INTERACTIVE ARTIFACT 1: CEI & PSYCHOMETRIC CALCULATOR
 * -------------------------------------------------------------------------- */
function initArtifact1_CeiCalculator() {
  const sInvolvement = document.getElementById("calc-involvement");
  const sJobSat = document.getElementById("calc-jobsat");
  const sEnvSat = document.getElementById("calc-envsat");
  const sRelSat = document.getElementById("calc-relsat");

  if (!sInvolvement) return;

  function recalculate() {
    const inv = parseFloat(sInvolvement.value);
    const job = parseFloat(sJobSat.value);
    const env = parseFloat(sEnvSat.value);
    const rel = parseFloat(sRelSat.value);

    // Update labels
    document.getElementById("calc-val-involvement").textContent = `${inv} / 4`;
    document.getElementById("calc-val-jobsat").textContent = `${job} / 4`;
    document.getElementById("calc-val-envsat").textContent = `${env} / 4`;
    document.getElementById("calc-val-relsat").textContent = `${rel} / 4`;

    // CEI Formula: (Sum / 16) * 100
    const sum = inv + job + env + rel;
    const cei = (sum / 16) * 100;

    // Population SD of the four items
    const mean = sum / 4;
    const variance = ((inv - mean)**2 + (job - mean)**2 + (env - mean)**2 + (rel - mean)**2) / 4;
    const sd = Math.sqrt(variance);
    // Stability score = 100 * (1 - sd / 1.5)
    const stability = Math.max(0, Math.min(100, 100 * (1 - sd / 1.5)));

    // Update displays
    document.getElementById("calc-res-cei").textContent = cei.toFixed(1);
    document.getElementById("calc-res-stability").textContent = `${Math.round(stability)} / 100`;

    const statusEl = document.getElementById("calc-res-status");
    const deltaEl = document.getElementById("calc-res-delta");
    const delta = cei - DATASET.cei.mean;
    deltaEl.textContent = `${delta >= 0 ? "+" : ""}${delta.toFixed(1)} vs Org Mean (68.1)`;

    if (cei < 50) {
      statusEl.textContent = "Low Engagement (<50)";
      statusEl.style.color = "var(--vermilion)";
    } else if (cei < 65) {
      statusEl.textContent = "Below Average (50-65)";
      statusEl.style.color = "var(--amber)";
    } else if (cei < 80) {
      statusEl.textContent = "Typical Engagement (65-80)";
      statusEl.style.color = "var(--teal)";
    } else {
      statusEl.textContent = "High Engagement (80-100)";
      statusEl.style.color = "var(--indigo)";
    }
  }

  [sInvolvement, sJobSat, sEnvSat, sRelSat].forEach(slider => {
    slider.addEventListener("input", recalculate);
  });
  recalculate();
}

/* --------------------------------------------------------------------------
 * 3. INTERACTIVE ARTIFACT 2: BURNOUT SCREENING RULE SIMULATOR
 * -------------------------------------------------------------------------- */
function initArtifact2_BurnoutScreen() {
  const otButtons = document.querySelectorAll(".sim-ot-btn");
  const wlbButtons = document.querySelectorAll(".sim-wlb-btn");

  if (!otButtons.length) return;

  let currentOt = "Yes";
  let currentWlb = 2;

  function updateBurnoutSim() {
    const isOt = currentOt === "Yes";
    const isLowWlb = currentWlb <= 2;

    let tier = "Low";
    let color = "var(--teal)";
    let share = "51.4%";
    let attritionRate = "12.4%";
    let ruleText = "Neither overtime nor low work-life balance is present.";

    if (isOt && isLowWlb) {
      tier = "High";
      color = "var(--vermilion)";
      share = "8.6% (126 records)";
      attritionRate = "35.7% (d = 0.58 association)";
      ruleText = "BOTH OverTime = Yes AND WorkLifeBalance <= 2. Severe screening flag.";
    } else if (isOt || isLowWlb) {
      tier = "Medium";
      color = "var(--amber)";
      share = "40.0% (588 records)";
      attritionRate = "16.7%";
      ruleText = "Exactly ONE stressor active: either working overtime OR low balance.";
    }

    const tierEl = document.getElementById("sim-burnout-tier");
    const shareEl = document.getElementById("sim-burnout-share");
    const attEl = document.getElementById("sim-burnout-attrition");
    const descEl = document.getElementById("sim-burnout-desc");

    if (tierEl) {
      tierEl.textContent = `${tier} Screening Level`;
      tierEl.style.color = color;
    }
    if (shareEl) shareEl.textContent = share;
    if (attEl) attEl.textContent = attritionRate;
    if (descEl) descEl.textContent = ruleText;
  }

  otButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      otButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentOt = btn.dataset.val;
      updateBurnoutSim();
    });
  });

  wlbButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      wlbButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentWlb = parseInt(btn.dataset.val);
      updateBurnoutSim();
    });
  });

  updateBurnoutSim();
}

/* --------------------------------------------------------------------------
 * 4. INTERACTIVE ARTIFACT 3: WSI & CSI HEURISTIC SANDBOX
 * -------------------------------------------------------------------------- */
function initArtifact3_WsiCsiSandbox() {
  const travelSel = document.getElementById("wsi-travel");
  const commuteSlider = document.getElementById("wsi-commute");
  const otSel = document.getElementById("wsi-overtime");

  const tenureSlider = document.getElementById("csi-tenure");
  const promoSlider = document.getElementById("csi-promo");
  const roleSlider = document.getElementById("csi-role");

  if (!travelSel || !tenureSlider) return;

  function recalculateHeuristics() {
    // WSI
    const tCoeff = parseFloat(travelSel.value); // 0, 0.5, 1
    const dist = parseFloat(commuteSlider.value); // 1-29
    const cCoeff = Math.min(1, Math.max(0, (dist - 1) / 28));
    const otCoeff = parseFloat(otSel.value); // 0 or 1
    const wsi = 100 * ((tCoeff + cCoeff + otCoeff) / 3);

    document.getElementById("wsi-commute-val").textContent = `${dist} distance units`;
    document.getElementById("wsi-result").textContent = wsi.toFixed(1);

    // CSI
    const tenure = parseFloat(tenureSlider.value);
    const promo = parseFloat(promoSlider.value);
    const role = parseFloat(roleSlider.value);

    document.getElementById("csi-tenure-val").textContent = `${tenure} yrs`;
    document.getElementById("csi-promo-val").textContent = `${promo} yrs`;
    document.getElementById("csi-role-val").textContent = `${role} yrs`;

    const csiResEl = document.getElementById("csi-result");
    const csiBandEl = document.getElementById("csi-band");

    if (tenure < 2) {
      csiResEl.textContent = "N/A";
      csiBandEl.textContent = "Not Assessed (Tenure < 2 years safeguard)";
      csiBandEl.style.color = "var(--slate)";
    } else {
      const pRatio = Math.min(1, Math.max(0, promo / tenure));
      const rRatio = Math.min(1, Math.max(0, role / tenure));
      const csi = 100 * (0.5 * pRatio + 0.5 * rRatio);
      csiResEl.textContent = csi.toFixed(1);

      if (csi < 40) {
        csiBandEl.textContent = "Lower Stagnation (<40) - Dynamic Career Flow";
        csiBandEl.style.color = "var(--teal)";
      } else if (csi < 70) {
        csiBandEl.textContent = "Moderate Stagnation (40-69) - Normal Progression";
        csiBandEl.style.color = "var(--amber)";
      } else {
        csiBandEl.textContent = "Higher Stagnation (70+) - Career Progression Prompt";
        csiBandEl.style.color = "var(--vermilion)";
      }
    }
  }

  [travelSel, commuteSlider, otSel, tenureSlider, promoSlider, roleSlider].forEach(el => {
    el.addEventListener("input", recalculateHeuristics);
  });
  recalculateHeuristics();
}

/* --------------------------------------------------------------------------
 * 5. INTERACTIVE ARTIFACT 4: MANAGER ACTION PANEL
 * -------------------------------------------------------------------------- */
function initArtifact4_ActionPanel() {
  const container = document.getElementById("action-panel-grid");
  const filterDept = document.getElementById("action-dept-filter");
  const thrBurnout = document.getElementById("panel-thr-burnout");
  const thrCsi = document.getElementById("panel-thr-csi");

  if (!container) return;

  function renderCards() {
    const selectedDept = filterDept ? filterDept.value : "All";
    const burnoutCutoff = thrBurnout ? parseFloat(thrBurnout.value) / 100 : 0.15;
    const csiGapCutoff = thrCsi ? parseFloat(thrCsi.value) : 10.0;

    if (document.getElementById("panel-thr-burnout-val")) {
      document.getElementById("panel-thr-burnout-val").textContent = `${Math.round(burnoutCutoff * 100)}%`;
    }
    if (document.getElementById("panel-thr-csi-val")) {
      document.getElementById("panel-thr-csi-val").textContent = `+${csiGapCutoff.toFixed(0)} pts`;
    }

    const filtered = DATASET.priorityAreas.filter(area => {
      if (selectedDept !== "All" && area.dept !== selectedDept) return false;
      return true;
    });

    container.innerHTML = "";

    filtered.forEach(area => {
      // Dynamic flag assessment based on slider thresholds
      const flags = [];
      if (area.pctHighBurnout >= burnoutCutoff) {
        flags.push(`Workload Alert (High burnout ${(area.pctHighBurnout * 100).toFixed(1)}% >= ${(burnoutCutoff * 100).toFixed(0)}%)`);
      }
      if ((area.csiMean - 49.8) >= csiGapCutoff) {
        flags.push(`Career Stagnation (CSI ${area.csiMean.toFixed(1)} is +${(area.csiMean - 49.8).toFixed(1)} pts above baseline)`);
      }
      if (area.ceiGap <= -5.0) {
        flags.push(`Engagement Deficit (CEI ${area.ceiMean.toFixed(1)} is ${area.ceiGap.toFixed(1)} pts below dept avg)`);
      }

      const isMonitor = flags.length > 0;
      const tierClass = isMonitor ? "t1" : "t0";
      const tierBadge = isMonitor ? `<span class="area-tier-badge tier-monitor">Monitor (${flags.length} Flag)</span>`
                                  : `<span class="area-tier-badge tier-normal">Normal</span>`;

      const card = document.createElement("div");
      card.className = `area-diagnostic-card ${tierClass}`;
      card.innerHTML = `
        <div class="area-card-head">
          <span class="area-dept">${area.dept} (n = ${area.n})</span>
          ${tierBadge}
        </div>
        <div class="area-role-name">${area.role}</div>
        <div class="area-metrics-row">
          <div class="area-metric-pair">Mean CEI: <strong>${area.ceiMean.toFixed(1)}</strong></div>
          <div class="area-metric-pair">95% CI: <strong>${area.ceiLo.toFixed(1)}-${area.ceiHi.toFixed(1)}</strong></div>
          <div class="area-metric-pair">High Burnout: <strong>${(area.pctHighBurnout * 100).toFixed(1)}%</strong></div>
          <div class="area-metric-pair">Overtime Share: <strong>${(area.pctOvertime * 100).toFixed(1)}%</strong></div>
          <div class="area-metric-pair">CSI Mean: <strong>${area.csiMean.toFixed(1)}</strong></div>
          <div class="area-metric-pair">Attrition Rate: <strong>${(area.attritionRate * 100).toFixed(1)}%</strong></div>
        </div>
        ${isMonitor ? `
          <div class="area-flags-list">
            ${flags.map(f => `<div class="area-flag-item">&#9888; ${f}</div>`).join("")}
          </div>
        ` : `<div style="font-size:0.78rem; color:var(--teal); margin-top:0.35rem;">&#10003; Within normative boundaries. No automated action prompt.</div>`}
        <div style="font-size:0.77rem; color:var(--slate); margin-top:0.45rem; line-height:1.35; border-top:1px dashed var(--rule); padding-top:0.35rem;">
          ${area.recommendation}
        </div>
      `;
      container.appendChild(card);
    });
  }

  if (filterDept) filterDept.addEventListener("change", renderCards);
  if (thrBurnout) thrBurnout.addEventListener("input", renderCards);
  if (thrCsi) thrCsi.addEventListener("input", renderCards);
  renderCards();
}

/* --------------------------------------------------------------------------
 * 6. INTERACTIVE ARTIFACT 5: STATISTICAL TEST & EFFECT SIZE INSPECTOR
 * -------------------------------------------------------------------------- */
function initArtifact5_StatInspector() {
  const comparisonSelect = document.getElementById("stat-comparison-select");
  if (!comparisonSelect) return;

  const testData = {
    overtime: {
      title: "Overtime (Yes vs No)",
      groupA: "Overtime = Yes (n = 416, Mean = 69.61)",
      groupB: "Overtime = No (n = 1054, Mean = 67.48)",
      diff: "+2.13 CEI points (higher engagement among overtime cohort)",
      cohensD: "d = +0.17 (Small effect size)",
      bootCi: "95% Bootstrap CI: +0.72 to +3.49",
      pValues: "Welch t: p = 0.0033 | Mann-Whitney U: p = 0.0013",
      interpretation: "Statistically detectable but modest positive difference. In direct opposition to the simplistic assumption that overtime systematically depresses survey engagement."
    },
    attrition: {
      title: "Attrition Status (Left vs Stayed)",
      groupA: "Flagged as Left (n = 237, Mean = 62.38)",
      groupB: "Stayed (n = 1233, Mean = 69.17)",
      diff: "-6.79 CEI points (substantially lower engagement)",
      cohensD: "d = -0.58 (Medium-to-large effect size)",
      bootCi: "95% Bootstrap CI: -8.51 to -5.09",
      pValues: "Welch t: p < 0.001 | Mann-Whitney U: p < 0.001",
      interpretation: "The single strongest association in the entire dataset. Employees who left show distinctly lower engagement scores across all satisfaction sub-scales."
    },
    burnout: {
      title: "Burnout Screening (High vs Low)",
      groupA: "High Burnout (n = 126, Mean = 70.09)",
      groupB: "Low Burnout (n = 756, Mean = 67.50)",
      diff: "+2.59 CEI points (contrary to clinical expectation)",
      cohensD: "d = +0.21 (Small positive effect size)",
      bootCi: "95% Bootstrap CI: +0.24 to +4.98",
      pValues: "Welch t: p = 0.031 | Mann-Whitney U: p = 0.028",
      interpretation: "Because High burnout requires Overtime = Yes, the positive overtime association elevates mean CEI. Proves the two-variable screening proxy and CEI measure different phenomena."
    },
    travel: {
      title: "Business Travel (Non-Travel vs Rare vs Frequent)",
      groupA: "Non-Travel: 68.38 | Travels Rarely: 67.86 | Frequent: 68.73",
      groupB: "Omnibus Comparison across 3 Travel Tiers",
      diff: "Max pairwise span: 0.87 CEI points",
      cohensD: "Eta-squared: 0.0008 (negligible)",
      bootCi: "All pairwise CIs span zero",
      pValues: "One-Way ANOVA: F = 0.56, p = 0.571 | Kruskal-Wallis: p = 0.446",
      interpretation: "Complete statistical invariance. Travel demands do not translate into systematic engagement differences in this dataset."
    }
  };

  function updateInspector() {
    const key = comparisonSelect.value;
    const item = testData[key];
    if (!item) return;

    document.getElementById("stat-res-title").textContent = item.title;
    document.getElementById("stat-res-groups").textContent = `${item.groupA} vs ${item.groupB}`;
    document.getElementById("stat-res-diff").textContent = item.diff;
    document.getElementById("stat-res-effect").textContent = item.cohensD;
    document.getElementById("stat-res-ci").textContent = item.bootCi;
    document.getElementById("stat-res-p").textContent = item.pValues;
    document.getElementById("stat-res-interp").textContent = item.interpretation;
  }

  comparisonSelect.addEventListener("change", updateInspector);
  updateInspector();
}

/* --------------------------------------------------------------------------
 * 7. INTERACTIVE ARTIFACT 6: VALIDATION DATA GOVERNANCE EXPLORER
 * -------------------------------------------------------------------------- */
function initArtifact6_ValidationExplorer() {
  const tableBody = document.getElementById("validation-table-body");
  const searchInput = document.getElementById("validation-search");

  if (!tableBody) return;

  function renderValidation(query = "") {
    const q = query.toLowerCase();
    const filtered = DATASET.validationItems.filter(item => {
      return item.name.toLowerCase().includes(q) ||
             item.rule.toLowerCase().includes(q) ||
             item.details.toLowerCase().includes(q);
    });

    tableBody.innerHTML = "";
    filtered.forEach((item, idx) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td style="font-family:var(--font-mono); font-size:0.76rem;">#${idx + 1}</td>
        <td><strong>${item.name}</strong></td>
        <td>${item.rule}</td>
        <td><span class="brand-badge" style="background:var(--teal); font-size:0.68rem;">&#10003; ${item.status}</span></td>
        <td style="font-size:0.8rem; color:var(--slate);">${item.details}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => renderValidation(e.target.value));
  }
  renderValidation();
}

/* --------------------------------------------------------------------------
 * 8. IMMERSIVE DASHBOARD CONTROLS & DYNAMIC VISUALIZATIONS
 * -------------------------------------------------------------------------- */
function initDashboard() {
  const tabButtons = document.querySelectorAll(".dashboard-tab-btn");
  const tabContents = document.querySelectorAll(".dashboard-tab-content");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      const targetEl = document.getElementById(target);
      if (targetEl) targetEl.classList.add("active");

      // Trigger custom chart redraw
      drawActiveDashboardCharts(target);
    });
  });

  // Global Dashboard Filter Listeners
  const filterDept = document.getElementById("dash-filter-dept");
  const filterOt = document.getElementById("dash-filter-ot");
  const filterThr = document.getElementById("dash-filter-thr");
  const btnReset = document.getElementById("dash-btn-reset");

  function updateDashboardKPIs() {
    const dept = filterDept ? filterDept.value : "All";
    const ot = filterOt ? filterOt.value : "All";
    const thr = filterThr ? parseFloat(filterThr.value) : 50;

    let n = DATASET.totalRecords;
    let ceiMean = DATASET.cei.mean;
    let highBurnoutRate = DATASET.burnout.shares.High;
    let belowThrShare = DATASET.cei.below50Share;

    if (dept !== "All") {
      const d = DATASET.departments.find(x => x.name === dept);
      if (d) {
        n = d.n;
        ceiMean = d.mean;
        highBurnoutRate = d.highShare;
        belowThrShare = d.belowShare;
      }
    }

    if (ot === "Yes") {
      n = Math.round(n * 0.283);
      ceiMean = DATASET.overtimeVsNot.meanYes;
      highBurnoutRate = 0.303; // Overtime cohort has 30.3% high burnout
    } else if (ot === "No") {
      n = Math.round(n * 0.717);
      ceiMean = DATASET.overtimeVsNot.meanNo;
      highBurnoutRate = 0.000; // By definition overtime=No cannot be High burnout
    }

    // Dynamic threshold update
    if (thr !== 50) {
      // Linear approximation around normal distribution
      const z = (thr - ceiMean) / DATASET.cei.sd;
      belowThrShare = Math.max(0.01, Math.min(0.99, 0.5 * (1 + Math.sign(z) * Math.sqrt(1 - Math.exp(-2 * z * z / Math.PI)))));
    }

    document.getElementById("dash-kpi-records").textContent = n.toLocaleString();
    document.getElementById("dash-kpi-cei").textContent = ceiMean.toFixed(1);
    document.getElementById("dash-kpi-high-burnout").textContent = `${(highBurnoutRate * 100).toFixed(1)}%`;
    document.getElementById("dash-kpi-below-thr").textContent = `${(belowThrShare * 100).toFixed(1)}%`;
    if (document.getElementById("dash-filter-thr-val")) {
      document.getElementById("dash-filter-thr-val").textContent = thr;
    }

    const activeTab = document.querySelector(".dashboard-tab-content.active");
    if (activeTab) drawActiveDashboardCharts(activeTab.id);
  }

  [filterDept, filterOt, filterThr].forEach(el => {
    if (el) el.addEventListener("change", updateDashboardKPIs);
  });
  if (filterThr) filterThr.addEventListener("input", updateDashboardKPIs);

  if (btnReset) {
    btnReset.addEventListener("click", () => {
      if (filterDept) filterDept.value = "All";
      if (filterOt) filterOt.value = "All";
      if (filterThr) filterThr.value = 50;
      updateDashboardKPIs();
    });
  }

  updateDashboardKPIs();
}

function drawActiveDashboardCharts(tabId) {
  if (tabId === "dash-tab-engagement") {
    drawEngagementDistributionChart();
    drawSatisfactionStackedChart();
  } else if (tabId === "dash-tab-burnout") {
    drawBurnoutDonutChart();
    drawAttritionByBurnoutChart();
  } else if (tabId === "dash-tab-career") {
    drawRoleTenureChart();
  }
}

/* --------------------------------------------------------------------------
 * 9. DYNAMIC CANVAS / SVG CHART GENERATION
 * -------------------------------------------------------------------------- */
function drawEngagementDistributionChart() {
  const container = document.getElementById("canvas-cei-hist");
  if (!container) return;

  const w = container.clientWidth || 400;
  const h = 260;
  const bins = [
    { label: "30-40", count: 18, share: 0.012 },
    { label: "40-50", count: 51, share: 0.035 },
    { label: "50-60", count: 245, share: 0.167 },
    { label: "60-70", count: 532, share: 0.362 },
    { label: "70-80", count: 421, share: 0.286 },
    { label: "80-90", count: 168, share: 0.114 },
    { label: "90-100", count: 35, share: 0.024 }
  ];

  const maxCount = 550;
  const pad = { top: 30, right: 20, bottom: 40, left: 45 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;
  const barW = chartW / bins.length - 8;

  let svg = `<svg viewBox="0 0 ${w} ${h}" class="svg-chart">`;
  
  // Grid lines
  [0, 150, 300, 450].forEach(yVal => {
    const yPos = pad.top + chartH - (yVal / maxCount) * chartH;
    svg += `<line x1="${pad.left}" y1="${yPos}" x2="${w - pad.right}" y2="${yPos}" stroke="var(--rule)" stroke-dasharray="3,3" />`;
    svg += `<text x="${pad.left - 8}" y="${yPos + 4}" font-size="10" font-family="var(--font-mono)" fill="var(--slate)" text-anchor="end">${yVal}</text>`;
  });

  // Bars
  bins.forEach((b, i) => {
    const barH = (b.count / maxCount) * chartH;
    const x = pad.left + i * (chartW / bins.length) + 4;
    const y = pad.top + chartH - barH;
    const isBelow50 = i < 2;
    const color = isBelow50 ? "var(--vermilion)" : "var(--teal)";

    svg += `
      <rect x="${x}" y="${y}" width="${barW}" height="${barH}" fill="${color}" rx="3" class="svg-bar">
        <title>${b.label}: ${b.count} records (${(b.share * 100).toFixed(1)}%)</title>
      </rect>
      <text x="${x + barW / 2}" y="${y - 6}" font-size="10" font-family="var(--font-mono)" font-weight="700" fill="${color}" text-anchor="middle">${b.count}</text>
      <text x="${x + barW / 2}" y="${pad.top + chartH + 18}" font-size="10" font-family="var(--font-mono)" fill="var(--slate)" text-anchor="middle">${b.label}</text>
    `;
  });

  // Threshold marker at 50
  const thrX = pad.left + 2 * (chartW / bins.length);
  svg += `
    <line x1="${thrX}" y1="${pad.top - 10}" x2="${thrX}" y2="${pad.top + chartH}" stroke="var(--vermilion)" stroke-width="2" stroke-dasharray="4,4" />
    <text x="${thrX + 5}" y="${pad.top - 2}" font-size="10" font-family="var(--font-mono)" font-weight="700" fill="var(--vermilion)">Threshold = 50</text>
  `;

  svg += `</svg>`;
  container.innerHTML = svg;
}

function drawSatisfactionStackedChart() {
  const container = document.getElementById("canvas-sat-stack");
  if (!container) return;

  const w = container.clientWidth || 400;
  const h = 260;
  const items = [
    { label: "Job Involvement", r1: 5.7, r2: 25.5, r3: 58.8, r4: 10.0 },
    { label: "Job Satisfaction", r1: 19.7, r2: 19.0, r3: 29.9, r4: 31.4 },
    { label: "Environment Sat.", r1: 19.3, r2: 19.5, r3: 31.2, r4: 30.0 },
    { label: "Relationship Sat.", r1: 18.8, r2: 20.6, r3: 31.2, r4: 29.4 },
    { label: "Work-Life Balance", r1: 5.4, r2: 23.4, r3: 60.5, r4: 10.7 }
  ];

  const pad = { top: 25, right: 30, bottom: 25, left: 125 };
  const chartW = w - pad.left - pad.right;
  const rowH = 34;
  const colors = ["#D2441C", "#D49A12", "#1B7F79", "#2E4B73"];

  let svg = `<svg viewBox="0 0 ${w} ${h}" class="svg-chart">`;

  items.forEach((item, i) => {
    const y = pad.top + i * 44;
    let currX = pad.left;

    svg += `<text x="${pad.left - 10}" y="${y + 18}" font-size="11" font-weight="600" font-family="var(--font-sans)" fill="var(--ink)" text-anchor="end">${item.label}</text>`;

    [item.r1, item.r2, item.r3, item.r4].forEach((val, rIdx) => {
      const segW = (val / 100) * chartW;
      svg += `
        <rect x="${currX}" y="${y}" width="${segW}" height="${rowH}" fill="${colors[rIdx]}" class="svg-bar">
          <title>${item.label} Rating ${rIdx + 1}: ${val}%</title>
        </rect>
      `;
      if (segW > 22) {
        svg += `<text x="${currX + segW / 2}" y="${y + 21}" font-size="10" font-family="var(--font-mono)" fill="#FFF" font-weight="700" text-anchor="middle">${Math.round(val)}%</text>`;
      }
      currX += segW;
    });
  });

  svg += `</svg>`;
  container.innerHTML = svg;
}

function drawBurnoutDonutChart() {
  const container = document.getElementById("canvas-burnout-donut");
  if (!container) return;

  const w = container.clientWidth || 400;
  const h = 260;
  const cx = w / 2;
  const cy = h / 2 - 10;
  const r = 85;
  const rHole = 52;

  // Slices: Low (51.4%), Medium (40.0%), High (8.6%)
  const slices = [
    { label: "Low Risk", share: 0.5143, count: 756, color: "var(--teal)" },
    { label: "Medium Risk", share: 0.4000, count: 588, color: "var(--amber)" },
    { label: "High Risk", share: 0.0857, count: 126, color: "var(--vermilion)" }
  ];

  let cumulativeAngle = -Math.PI / 2;
  let svg = `<svg viewBox="0 0 ${w} ${h}" class="svg-chart">`;

  slices.forEach(slice => {
    const angle = slice.share * 2 * Math.PI;
    const x1 = cx + r * Math.cos(cumulativeAngle);
    const y1 = cy + r * Math.sin(cumulativeAngle);
    const x2 = cx + r * Math.cos(cumulativeAngle + angle);
    const y2 = cy + r * Math.sin(cumulativeAngle + angle);

    const x1In = cx + rHole * Math.cos(cumulativeAngle);
    const y1In = cy + rHole * Math.sin(cumulativeAngle);
    const x2In = cx + rHole * Math.cos(cumulativeAngle + angle);
    const y2In = cy + rHole * Math.sin(cumulativeAngle + angle);

    const largeArc = angle > Math.PI ? 1 : 0;
    const pathData = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${x2In} ${y2In} A ${rHole} ${rHole} 0 ${largeArc} 0 ${x1In} ${y1In} Z`;

    svg += `<path d="${pathData}" fill="${slice.color}" class="svg-bar"><title>${slice.label}: ${(slice.share * 100).toFixed(1)}% (${slice.count})</title></path>`;
    cumulativeAngle += angle;
  });

  // Center Donut text
  svg += `
    <text x="${cx}" y="${cy - 4}" font-family="var(--font-serif)" font-size="20" font-weight="700" fill="var(--ink)" text-anchor="middle">1,470</text>
    <text x="${cx}" y="${cy + 14}" font-family="var(--font-mono)" font-size="10" fill="var(--slate)" text-anchor="middle">RECORDS</text>
  `;

  // Legend at bottom
  svg += `
    <g transform="translate(30, ${h - 22})">
      <circle cx="10" cy="5" r="5" fill="var(--teal)" />
      <text x="20" y="8" font-size="10" font-family="var(--font-sans)" fill="var(--ink)">Low (51.4%)</text>
      <circle cx="125" cy="5" r="5" fill="var(--amber)" />
      <text x="135" y="8" font-size="10" font-family="var(--font-sans)" fill="var(--ink)">Medium (40.0%)</text>
      <circle cx="255" cy="5" r="5" fill="var(--vermilion)" />
      <text x="265" y="8" font-size="10" font-family="var(--font-sans)" fill="var(--ink)">High (8.6%)</text>
    </g>
  `;

  svg += `</svg>`;
  container.innerHTML = svg;
}

function drawAttritionByBurnoutChart() {
  const container = document.getElementById("canvas-attrition-burnout");
  if (!container) return;

  const w = container.clientWidth || 400;
  const h = 260;
  const pad = { top: 30, right: 25, bottom: 40, left: 45 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;

  const data = [
    { label: "Low Screening", rate: 0.1243, n: 756, color: "var(--teal)" },
    { label: "Medium Screening", rate: 0.1667, n: 588, color: "var(--amber)" },
    { label: "High Screening", rate: 0.3571, n: 126, color: "var(--vermilion)" }
  ];

  const barW = chartW / 3 - 25;
  let svg = `<svg viewBox="0 0 ${w} ${h}" class="svg-chart">`;

  [0, 10, 20, 30, 40].forEach(p => {
    const yPos = pad.top + chartH - (p / 40) * chartH;
    svg += `<line x1="${pad.left}" y1="${yPos}" x2="${w - pad.right}" y2="${yPos}" stroke="var(--rule)" stroke-dasharray="3,3" />`;
    svg += `<text x="${pad.left - 6}" y="${yPos + 4}" font-size="10" font-family="var(--font-mono)" fill="var(--slate)" text-anchor="end">${p}%</text>`;
  });

  data.forEach((d, i) => {
    const barH = (d.rate / 0.40) * chartH;
    const x = pad.left + i * (chartW / 3) + 12;
    const y = pad.top + chartH - barH;

    svg += `
      <rect x="${x}" y="${y}" width="${barW}" height="${barH}" fill="${d.color}" rx="3" class="svg-bar">
        <title>${d.label}: ${(d.rate * 100).toFixed(1)}% Attrition Rate</title>
      </rect>
      <text x="${x + barW / 2}" y="${y - 8}" font-size="11" font-family="var(--font-mono)" font-weight="700" fill="${d.color}" text-anchor="middle">${(d.rate * 100).toFixed(1)}%</text>
      <text x="${x + barW / 2}" y="${pad.top + chartH + 18}" font-size="10" font-family="var(--font-sans)" fill="var(--ink)" text-anchor="middle">${d.label}</text>
    `;
  });

  svg += `</svg>`;
  container.innerHTML = svg;
}

function drawRoleTenureChart() {
  const container = document.getElementById("canvas-career-csi");
  if (!container) return;

  const w = container.clientWidth || 400;
  const h = 260;
  const pad = { top: 30, right: 25, bottom: 40, left: 45 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;

  const data = [
    { label: "Lower (<40)", mean: 68.21, n: 432, lo: 67.04, hi: 69.39 },
    { label: "Moderate (40-69)", mean: 68.13, n: 577, lo: 67.10, hi: 69.17 },
    { label: "Higher (70+)", mean: 68.57, n: 246, lo: 67.08, hi: 70.06 }
  ];

  const minY = 64;
  const maxY = 72;
  const getY = val => pad.top + chartH - ((val - minY) / (maxY - minY)) * chartH;

  let svg = `<svg viewBox="0 0 ${w} ${h}" class="svg-chart">`;

  // Grid
  [65, 67, 69, 71].forEach(val => {
    const yPos = getY(val);
    svg += `<line x1="${pad.left}" y1="${yPos}" x2="${w - pad.right}" y2="${yPos}" stroke="var(--rule)" stroke-dasharray="3,3" />`;
    svg += `<text x="${pad.left - 6}" y="${yPos + 4}" font-size="10" font-family="var(--font-mono)" fill="var(--slate)" text-anchor="end">${val}</text>`;
  });

  // Overall Mean Dotted line
  const meanY = getY(68.08);
  svg += `
    <line x1="${pad.left}" y1="${meanY}" x2="${w - pad.right}" y2="${meanY}" stroke="var(--slate)" stroke-width="1.5" stroke-dasharray="4,4" />
    <text x="${w - pad.right - 5}" y="${meanY - 6}" font-size="9" font-family="var(--font-mono)" fill="var(--slate)" text-anchor="end">Org Mean = 68.1</text>
  `;

  // Dots and Whiskers
  data.forEach((d, i) => {
    const x = pad.left + (i + 0.5) * (chartW / 3);
    const dotY = getY(d.mean);
    const topY = getY(d.hi);
    const botY = getY(d.lo);

    // Whiskers
    svg += `
      <line x1="${x}" y1="${botY}" x2="${x}" y2="${topY}" stroke="var(--teal)" stroke-width="2" />
      <line x1="${x - 6}" y1="${topY}" x2="${x + 6}" y2="${topY}" stroke="var(--teal)" stroke-width="2" />
      <line x1="${x - 6}" y1="${botY}" x2="${x + 6}" y2="${botY}" stroke="var(--teal)" stroke-width="2" />
      <circle cx="${x}" cy="${dotY}" r="5.5" fill="var(--teal)" stroke="#FFF" stroke-width="2" class="svg-bar">
        <title>${d.label}: Mean ${d.mean.toFixed(1)} (CI: ${d.lo.toFixed(1)}-${d.hi.toFixed(1)})</title>
      </circle>
      <text x="${x}" y="${dotY - 10}" font-size="10" font-family="var(--font-mono)" font-weight="700" fill="var(--teal)" text-anchor="middle">${d.mean.toFixed(1)}</text>
      <text x="${x}" y="${pad.top + chartH + 18}" font-size="10" font-family="var(--font-sans)" fill="var(--ink)" text-anchor="middle">${d.label}</text>
    `;
  });

  svg += `</svg>`;
  container.innerHTML = svg;
}

/* --------------------------------------------------------------------------
 * 10. MODAL IMAGE ZOOM / LIGHTBOX
 * -------------------------------------------------------------------------- */
function initFigureModal() {
  const modal = document.getElementById("figure-modal");
  const modalImg = document.getElementById("modal-img");
  const modalCap = document.getElementById("modal-cap");
  const closeBtn = document.getElementById("modal-close");

  if (!modal || !modalImg) return;

  document.querySelectorAll(".figure-img-wrap img").forEach(img => {
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      const caption = img.closest(".figure-block").querySelector(".figure-caption");
      modalCap.textContent = caption ? caption.textContent : img.alt;
      modal.classList.add("active");
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active");
    }
  });
}

/* --------------------------------------------------------------------------
 * 11. MOTION TOGGLE
 * -------------------------------------------------------------------------- */
function initMotionToggle() {
  const toggleBtn = document.getElementById("btn-toggle-motion");
  if (!toggleBtn) return;

  let motionEnabled = true;

  toggleBtn.addEventListener("click", () => {
    motionEnabled = !motionEnabled;
    if (motionEnabled) {
      document.body.classList.remove("no-motion");
      toggleBtn.innerHTML = `&#127916; Motion: ON`;
      toggleBtn.classList.remove("accent-teal");
    } else {
      document.body.classList.add("no-motion");
      toggleBtn.innerHTML = `&#9208; Motion: OFF`;
      toggleBtn.classList.add("accent-teal");
    }
  });
}
