import { calculateEffectiveTaxRates, printTaxAnalysis } from './tax-calculator';
import { write } from 'bun';

// Example incomes to analyze
const incomeExamples = process.argv.slice(2).length > 0 
  ? process.argv.slice(2).map(arg => parseFloat(arg))
  : [
      100000,
      125000,
      150000,
      200000,
      225000,
      250000,
      275000,
      300000,
    ];

// Prepare file content
let fileContent = 'TAX RATE COMPARISON - FEDERAL, CALIFORNIA, MASSACHUSETTS, NEW YORK, ILLINOIS, AND PUERTO RICO\n';
fileContent += '==========================================================\n\n';

// Prepare console output
console.log('TAX RATE COMPARISON - FEDERAL, CALIFORNIA, MASSACHUSETTS, NEW YORK, ILLINOIS, AND PUERTO RICO');
console.log('==========================================================');

incomeExamples.forEach(income => {
  const result = calculateEffectiveTaxRates(income);
  
  // Format information for both console and file
  const analysisTitle = `\nTax Analysis for Annual Income: ${formatCurrency(income)}`;
  const divider = '\n---------------------------------------------------';
  const federalInfo = `\nFederal Tax:     ${formatCurrency(result.federal.tax)} (${formatPercent(result.federal.rate)})`;
  const californiaInfo = `\nCalifornia Tax:  ${formatCurrency(result.california.tax)} (${formatPercent(result.california.rate)})`;
  const massachusettsInfo = `\nMassachusetts:   ${formatCurrency(result.massachusetts.tax)} (${formatPercent(result.massachusetts.rate)})`;
  const newYorkInfo = `\nNew York:        ${formatCurrency(result.newYork.tax)} (${formatPercent(result.newYork.rate)})`;
  const illinoisInfo = `\nIllinois:        ${formatCurrency(result.illinois.tax)} (${formatPercent(result.illinois.rate)})`;
  const combinedCAInfo = `\nCombined (Fed+CA): ${formatCurrency(result.combinedCalifornia.tax)} (${formatPercent(result.combinedCalifornia.rate)})`;
  const combinedMAInfo = `\nCombined (Fed+MA): ${formatCurrency(result.combinedMassachusetts.tax)} (${formatPercent(result.combinedMassachusetts.rate)})`;
  const combinedNYInfo = `\nCombined (Fed+NY): ${formatCurrency(result.combinedNewYork.tax)} (${formatPercent(result.combinedNewYork.rate)})`;
  const combinedILInfo = `\nCombined (Fed+IL): ${formatCurrency(result.combinedIllinois.tax)} (${formatPercent(result.combinedIllinois.rate)})`;
  const puertoRicoInfo = `\nPuerto Rico Tax: ${formatCurrency(result.puertoRico.tax)} (${formatPercent(result.puertoRico.rate)})`;
  
  // Calculate differences for comparisons with Puerto Rico
  const prVsCADiff = result.puertoRico.tax - result.combinedCalifornia.tax;
  const prVsCADiffPercent = Math.abs(prVsCADiff) / income * 100;
  
  const prVsMADiff = result.puertoRico.tax - result.combinedMassachusetts.tax;
  const prVsMADiffPercent = Math.abs(prVsMADiff) / income * 100;
  
  const prVsNYDiff = result.puertoRico.tax - result.combinedNewYork.tax;
  const prVsNYDiffPercent = Math.abs(prVsNYDiff) / income * 100;
  
  const prVsILDiff = result.puertoRico.tax - result.combinedIllinois.tax;
  const prVsILDiffPercent = Math.abs(prVsILDiff) / income * 100;
  
  // Calculate differences between states
  const maVsCADiff = result.combinedMassachusetts.tax - result.combinedCalifornia.tax;
  const maVsCADiffPercent = Math.abs(maVsCADiff) / income * 100;
  
  const nyVsCADiff = result.combinedNewYork.tax - result.combinedCalifornia.tax;
  const nyVsCADiffPercent = Math.abs(nyVsCADiff) / income * 100;
  
  const nyVsMADiff = result.combinedNewYork.tax - result.combinedMassachusetts.tax;
  const nyVsMADiffPercent = Math.abs(nyVsMADiff) / income * 100;
  
  const ilVsCADiff = result.combinedIllinois.tax - result.combinedCalifornia.tax;
  const ilVsCADiffPercent = Math.abs(ilVsCADiff) / income * 100;
  
  const ilVsMADiff = result.combinedIllinois.tax - result.combinedMassachusetts.tax;
  const ilVsMADiffPercent = Math.abs(ilVsMADiff) / income * 100;
  
  const ilVsNYDiff = result.combinedIllinois.tax - result.combinedNewYork.tax;
  const ilVsNYDiffPercent = Math.abs(ilVsNYDiff) / income * 100;
  
  // Format comparison info for Puerto Rico
  let prVsCAInfo = '';
  if (prVsCADiff > 0) {
    prVsCAInfo = `\nPuerto Rico taxes are ${formatCurrency(prVsCADiff)} MORE than Federal+California (${formatPercent(prVsCADiffPercent)} of income)`;
  } else {
    prVsCAInfo = `\nPuerto Rico taxes are ${formatCurrency(Math.abs(prVsCADiff))} LESS than Federal+California (${formatPercent(prVsCADiffPercent)} of income)`;
  }
  
  let prVsMAInfo = '';
  if (prVsMADiff > 0) {
    prVsMAInfo = `\nPuerto Rico taxes are ${formatCurrency(prVsMADiff)} MORE than Federal+Massachusetts (${formatPercent(prVsMADiffPercent)} of income)`;
  } else {
    prVsMAInfo = `\nPuerto Rico taxes are ${formatCurrency(Math.abs(prVsMADiff))} LESS than Federal+Massachusetts (${formatPercent(prVsMADiffPercent)} of income)`;
  }
  
  let prVsNYInfo = '';
  if (prVsNYDiff > 0) {
    prVsNYInfo = `\nPuerto Rico taxes are ${formatCurrency(prVsNYDiff)} MORE than Federal+New York (${formatPercent(prVsNYDiffPercent)} of income)`;
  } else {
    prVsNYInfo = `\nPuerto Rico taxes are ${formatCurrency(Math.abs(prVsNYDiff))} LESS than Federal+New York (${formatPercent(prVsNYDiffPercent)} of income)`;
  }
  
  let prVsILInfo = '';
  if (prVsILDiff > 0) {
    prVsILInfo = `\nPuerto Rico taxes are ${formatCurrency(prVsILDiff)} MORE than Federal+Illinois (${formatPercent(prVsILDiffPercent)} of income)`;
  } else {
    prVsILInfo = `\nPuerto Rico taxes are ${formatCurrency(Math.abs(prVsILDiff))} LESS than Federal+Illinois (${formatPercent(prVsILDiffPercent)} of income)`;
  }
  
  // Format comparison info between states
  let maVsCAInfo = '';
  if (maVsCADiff > 0) {
    maVsCAInfo = `\nFederal+Massachusetts taxes are ${formatCurrency(maVsCADiff)} MORE than Federal+California (${formatPercent(maVsCADiffPercent)} of income)`;
  } else {
    maVsCAInfo = `\nFederal+Massachusetts taxes are ${formatCurrency(Math.abs(maVsCADiff))} LESS than Federal+California (${formatPercent(maVsCADiffPercent)} of income)`;
  }
  
  let nyVsCAInfo = '';
  if (nyVsCADiff > 0) {
    nyVsCAInfo = `\nFederal+New York taxes are ${formatCurrency(nyVsCADiff)} MORE than Federal+California (${formatPercent(nyVsCADiffPercent)} of income)`;
  } else {
    nyVsCAInfo = `\nFederal+New York taxes are ${formatCurrency(Math.abs(nyVsCADiff))} LESS than Federal+California (${formatPercent(nyVsCADiffPercent)} of income)`;
  }
  
  let nyVsMAInfo = '';
  if (nyVsMADiff > 0) {
    nyVsMAInfo = `\nFederal+New York taxes are ${formatCurrency(nyVsMADiff)} MORE than Federal+Massachusetts (${formatPercent(nyVsMADiffPercent)} of income)`;
  } else {
    nyVsMAInfo = `\nFederal+New York taxes are ${formatCurrency(Math.abs(nyVsMADiff))} LESS than Federal+Massachusetts (${formatPercent(nyVsMADiffPercent)} of income)`;
  }
  
  let ilVsCAInfo = '';
  if (ilVsCADiff > 0) {
    ilVsCAInfo = `\nFederal+Illinois taxes are ${formatCurrency(ilVsCADiff)} MORE than Federal+California (${formatPercent(ilVsCADiffPercent)} of income)`;
  } else {
    ilVsCAInfo = `\nFederal+Illinois taxes are ${formatCurrency(Math.abs(ilVsCADiff))} LESS than Federal+California (${formatPercent(ilVsCADiffPercent)} of income)`;
  }
  
  let ilVsMAInfo = '';
  if (ilVsMADiff > 0) {
    ilVsMAInfo = `\nFederal+Illinois taxes are ${formatCurrency(ilVsMADiff)} MORE than Federal+Massachusetts (${formatPercent(ilVsMADiffPercent)} of income)`;
  } else {
    ilVsMAInfo = `\nFederal+Illinois taxes are ${formatCurrency(Math.abs(ilVsMADiff))} LESS than Federal+Massachusetts (${formatPercent(ilVsMADiffPercent)} of income)`;
  }
  
  let ilVsNYInfo = '';
  if (ilVsNYDiff > 0) {
    ilVsNYInfo = `\nFederal+Illinois taxes are ${formatCurrency(ilVsNYDiff)} MORE than Federal+New York (${formatPercent(ilVsNYDiffPercent)} of income)`;
  } else {
    ilVsNYInfo = `\nFederal+Illinois taxes are ${formatCurrency(Math.abs(ilVsNYDiff))} LESS than Federal+New York (${formatPercent(ilVsNYDiffPercent)} of income)`;
  }
  
  // Add to file content
  fileContent += analysisTitle + divider + 
                federalInfo + californiaInfo + massachusettsInfo + newYorkInfo + illinoisInfo + puertoRicoInfo + 
                divider + 
                combinedCAInfo + combinedMAInfo + combinedNYInfo + combinedILInfo + 
                divider + 
                prVsCAInfo + prVsMAInfo + prVsNYInfo + prVsILInfo + 
                divider + 
                maVsCAInfo + nyVsCAInfo + ilVsCAInfo + 
                divider + 
                nyVsMAInfo + ilVsMAInfo + ilVsNYInfo + '\n';
  
  // Print to console
  console.log(analysisTitle);
  console.log('---------------------------------------------------');
  console.log(federalInfo);
  console.log(californiaInfo);
  console.log(massachusettsInfo);
  console.log(newYorkInfo);
  console.log(illinoisInfo);
  console.log(puertoRicoInfo);
  console.log('---------------------------------------------------');
  console.log(combinedCAInfo);
  console.log(combinedMAInfo);
  console.log(combinedNYInfo);
  console.log(combinedILInfo);
  console.log('---------------------------------------------------');
  console.log('Puerto Rico vs States:');
  console.log(prVsCAInfo);
  console.log(prVsMAInfo);
  console.log(prVsNYInfo);
  console.log(prVsILInfo);
  console.log('---------------------------------------------------');
  console.log('California vs Other States:');
  console.log(maVsCAInfo);
  console.log(nyVsCAInfo);
  console.log(ilVsCAInfo);
  console.log('---------------------------------------------------');
  console.log('Other State Comparisons:');
  console.log(nyVsMAInfo);
  console.log(ilVsMAInfo);
  console.log(ilVsNYInfo);
});



// Generate filename with date
const now = new Date();
const dateString = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
const filename = `tax-comparison-${dateString}.txt`;

// Write to file
await write(filename, fileContent);
console.log(`\nResults written to file: ${filename}`);

// Helper functions (copied from tax-calculator.ts to avoid circular dependencies)
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