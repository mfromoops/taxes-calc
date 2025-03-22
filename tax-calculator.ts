/**
 * Tax calculator for Federal, California, Puerto Rico, Massachusetts, New York, and Illinois tax systems
 */

/**
 * Calculate federal income tax based on income
 * @param income Annual income in USD
 * @returns Tax amount in USD
 */
function calculateFederalTax(income: number): number {
  if (income <= 0) return 0;
  
  let tax = 0;
  
  if (income <= 11600) {
    tax = income * 0.10;
  } else if (income <= 47150) {
    tax = 11600 * 0.10 + (income - 11600) * 0.12;
  } else if (income <= 100525) {
    tax = 11600 * 0.10 + (47150 - 11600) * 0.12 + (income - 47150) * 0.22;
  } else if (income <= 191950) {
    tax = 11600 * 0.10 + (47150 - 11600) * 0.12 + (100525 - 47150) * 0.22 + (income - 100525) * 0.24;
  } else if (income <= 243725) {
    tax = 11600 * 0.10 + (47150 - 11600) * 0.12 + (100525 - 47150) * 0.22 + (191950 - 100525) * 0.24 + (income - 191950) * 0.32;
  } else if (income <= 609350) {
    tax = 11600 * 0.10 + (47150 - 11600) * 0.12 + (100525 - 47150) * 0.22 + (191950 - 100525) * 0.24 + (243725 - 191950) * 0.32 + (income - 243725) * 0.35;
  } else {
    tax = 11600 * 0.10 + (47150 - 11600) * 0.12 + (100525 - 47150) * 0.22 + (191950 - 100525) * 0.24 + (243725 - 191950) * 0.32 + (609350 - 243725) * 0.35 + (income - 609350) * 0.37;
  }
  
  return tax;
}

/**
 * Calculate California state income tax based on income
 * @param income Annual income in USD
 * @returns Tax amount in USD
 */
function calculateCaliforniaTax(income: number): number {
  if (income <= 0) return 0;
  
  let tax = 0;
  
  if (income <= 10756) {
    tax = income * 0.01;
  } else if (income <= 25499) {
    tax = 107.56 + (income - 10756) * 0.02;
  } else if (income <= 40245) {
    tax = 402.42 + (income - 25499) * 0.04;
  } else if (income <= 55866) {
    tax = 992.26 + (income - 40245) * 0.06;
  } else if (income <= 70606) {
    tax = 1929.52 + (income - 55866) * 0.08;
  } else if (income <= 360659) {
    tax = 3108.72 + (income - 70606) * 0.093;
  } else if (income <= 432787) {
    tax = 30083.65 + (income - 360659) * 0.103;
  } else if (income <= 721314) {
    tax = 37512.83 + (income - 432787) * 0.113;
  } else {
    tax = 70116.38 + (income - 721314) * 0.123;
  }
  
  return tax;
}

/**
 * Calculate Puerto Rico income tax based on income
 * @param income Annual income in USD
 * @returns Tax amount in USD
 */
function calculatePuertoRicoTax(income: number): number {
  if (income <= 0) return 0;
  
  let tax = 0;
  
  if (income <= 9000) {
    tax = 0;
  } else if (income <= 25000) {
    tax = (income - 9000) * 0.07;
  } else if (income <= 41500) {
    tax = 1120 + (income - 25000) * 0.14;
  } else if (income <= 61500) {
    tax = 3430 + (income - 41500) * 0.25;
  } else {
    tax = 8430 + (income - 61500) * 0.33;
  }
  
  return tax;
}

/**
 * Calculate Massachusetts (Boston) state income tax based on income
 * @param income Annual income in USD
 * @returns Tax amount in USD
 */
function calculateMassachusettsTax(income: number): number {
  if (income <= 0) return 0;
  
  // Massachusetts has a flat 5% tax rate
  return income * 0.05;
}

/**
 * Calculate New York state income tax based on income
 * @param income Annual income in USD
 * @returns Tax amount in USD
 */
function calculateNewYorkTax(income: number): number {
  if (income <= 0) return 0;
  
  let tax = 0;
  
  if (income <= 13900) {
    tax = income * 0.04;
  } else if (income <= 80650) {
    tax = 13900 * 0.04 + (income - 13900) * 0.045;
  } else if (income <= 215400) {
    tax = 13900 * 0.04 + (80650 - 13900) * 0.045 + (income - 80650) * 0.055;
  } else if (income <= 1077550) {
    tax = 13900 * 0.04 + (80650 - 13900) * 0.045 + (215400 - 80650) * 0.055 + (income - 215400) * 0.06;
  } else if (income <= 5000000) {
    tax = 13900 * 0.04 + (80650 - 13900) * 0.045 + (215400 - 80650) * 0.055 + (1077550 - 215400) * 0.06 + (income - 1077550) * 0.0685;
  } else if (income <= 25000000) {
    tax = 13900 * 0.04 + (80650 - 13900) * 0.045 + (215400 - 80650) * 0.055 + (1077550 - 215400) * 0.06 + (5000000 - 1077550) * 0.0685 + (income - 5000000) * 0.0965;
  } else {
    tax = 13900 * 0.04 + (80650 - 13900) * 0.045 + (215400 - 80650) * 0.055 + (1077550 - 215400) * 0.06 + (5000000 - 1077550) * 0.0685 + (25000000 - 5000000) * 0.0965 + (income - 25000000) * 0.109;
  }
  
  // Add NYC local tax (simplified as an average of 3.5% for all income levels)
  const nycLocalTax = income * 0.035;
  
  return tax + nycLocalTax;
}

/**
 * Calculate Illinois (Chicago) state income tax based on income
 * @param income Annual income in USD
 * @returns Tax amount in USD
 */
function calculateIllinoisTax(income: number): number {
  if (income <= 0) return 0;
  
  // Illinois has a flat 4.95% tax rate
  // Chicago does not impose a separate city income tax
  return income * 0.0495;
}

/**
 * Calculate effective tax rates for all tax systems
 * @param income Annual income in USD
 * @returns Object containing effective tax rates for each tax system
 */
export function calculateEffectiveTaxRates(income: number): {
  federal: { tax: number, rate: number },
  california: { tax: number, rate: number },
  puertoRico: { tax: number, rate: number },
  massachusetts: { tax: number, rate: number },
  newYork: { tax: number, rate: number },
  illinois: { tax: number, rate: number },
  combinedCalifornia: { tax: number, rate: number },
  combinedMassachusetts: { tax: number, rate: number },
  combinedNewYork: { tax: number, rate: number },
  combinedIllinois: { tax: number, rate: number }
} {
  if (income <= 0) {
    return {
      federal: { tax: 0, rate: 0 },
      california: { tax: 0, rate: 0 },
      puertoRico: { tax: 0, rate: 0 },
      massachusetts: { tax: 0, rate: 0 },
      newYork: { tax: 0, rate: 0 },
      illinois: { tax: 0, rate: 0 },
      combinedCalifornia: { tax: 0, rate: 0 },
      combinedMassachusetts: { tax: 0, rate: 0 },
      combinedNewYork: { tax: 0, rate: 0 },
      combinedIllinois: { tax: 0, rate: 0 }
    };
  }

  const federalTax = calculateFederalTax(income);
  const californiaTax = calculateCaliforniaTax(income);
  const puertoRicoTax = calculatePuertoRicoTax(income);
  const massachusettsTax = calculateMassachusettsTax(income);
  const newYorkTax = calculateNewYorkTax(income);
  const illinoisTax = calculateIllinoisTax(income);
  
  const combinedCaliforniaTax = federalTax + californiaTax;
  const combinedMassachusettsTax = federalTax + massachusettsTax;
  const combinedNewYorkTax = federalTax + newYorkTax;
  const combinedIllinoisTax = federalTax + illinoisTax;

  return {
    federal: {
      tax: federalTax,
      rate: (federalTax / income) * 100
    },
    california: {
      tax: californiaTax,
      rate: (californiaTax / income) * 100
    },
    puertoRico: {
      tax: puertoRicoTax,
      rate: (puertoRicoTax / income) * 100
    },
    massachusetts: {
      tax: massachusettsTax,
      rate: (massachusettsTax / income) * 100
    },
    newYork: {
      tax: newYorkTax,
      rate: (newYorkTax / income) * 100
    },
    illinois: {
      tax: illinoisTax,
      rate: (illinoisTax / income) * 100
    },
    combinedCalifornia: {
      tax: combinedCaliforniaTax,
      rate: (combinedCaliforniaTax / income) * 100
    },
    combinedMassachusetts: {
      tax: combinedMassachusettsTax,
      rate: (combinedMassachusettsTax / income) * 100
    },
    combinedNewYork: {
      tax: combinedNewYorkTax,
      rate: (combinedNewYorkTax / income) * 100
    },
    combinedIllinois: {
      tax: combinedIllinoisTax,
      rate: (combinedIllinoisTax / income) * 100
    }
  };
}

// Example usage
function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatPercent(rate: number): string {
  return rate.toFixed(2) + '%';
}

export function printTaxAnalysis(income: number): void {
  const result = calculateEffectiveTaxRates(income);
  
  console.log(`\nTax Analysis for Annual Income: ${formatCurrency(income)}`);
  console.log('---------------------------------------------------');
  console.log(`Federal Tax:     ${formatCurrency(result.federal.tax)} (${formatPercent(result.federal.rate)})`);
  console.log(`California Tax:  ${formatCurrency(result.california.tax)} (${formatPercent(result.california.rate)})`);
  console.log(`Massachusetts:   ${formatCurrency(result.massachusetts.tax)} (${formatPercent(result.massachusetts.rate)})`);
  console.log(`New York:        ${formatCurrency(result.newYork.tax)} (${formatPercent(result.newYork.rate)})`);
  console.log(`Illinois:        ${formatCurrency(result.illinois.tax)} (${formatPercent(result.illinois.rate)})`);
  console.log(`Puerto Rico Tax: ${formatCurrency(result.puertoRico.tax)} (${formatPercent(result.puertoRico.rate)})`);
  console.log('---------------------------------------------------');
  console.log(`Combined (Fed+CA): ${formatCurrency(result.combinedCalifornia.tax)} (${formatPercent(result.combinedCalifornia.rate)})`);
  console.log(`Combined (Fed+MA): ${formatCurrency(result.combinedMassachusetts.tax)} (${formatPercent(result.combinedMassachusetts.rate)})`);
  console.log(`Combined (Fed+NY): ${formatCurrency(result.combinedNewYork.tax)} (${formatPercent(result.combinedNewYork.rate)})`);
  console.log(`Combined (Fed+IL): ${formatCurrency(result.combinedIllinois.tax)} (${formatPercent(result.combinedIllinois.rate)})`);
}

// Example
// printTaxAnalysis(75000); 