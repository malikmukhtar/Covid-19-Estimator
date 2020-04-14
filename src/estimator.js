const impact = {};
const severeImpact = {};

const convertToDays = (data) => {
  if (data.periodType === 'days') {
    return data.timeToElapse;
  }
  if (data.periodType === 'weeks') {
    return data.timeToElapse * 7;
  }
  if (data.periodType === 'months') {
    return data.timeToElapse * 30;
  }
  return 0;
};

// Estimator
const covid19ImpactEstimator = (data) => {
  // Challenge 1

  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;

  impact.infectionsByRequestedTime = impact.currentlyInfected
    * 2 ** Math.trunc(convertToDays(data) / 3);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected
    * 2 ** Math.trunc(convertToDays(data) / 3);

  // Challenge 2

  impact.severeCasesByRequestedTime = Math.trunc(
    impact.infectionsByRequestedTime * 0.15
  );
  severeImpact.severeCasesByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.15
  );

  impact.hospitalBedsByRequestedTime = Math.trunc(
    0.35 * data.totalHospitalBeds - impact.severeCasesByRequestedTime
  );
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(
    0.35 * data.totalHospitalBeds - severeImpact.severeCasesByRequestedTime
  );

  // Challenge 3

  impact.casesForICUByRequestedTime = Math.trunc(
    0.05 * impact.infectionsByRequestedTime
  );
  severeImpact.casesForICUByRequestedTime = Math.trunc(
    0.05 * severeImpact.infectionsByRequestedTime
  );

  impact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * impact.infectionsByRequestedTime
  );
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * severeImpact.infectionsByRequestedTime
  );

  impact.dollarsInFlight = Math.trunc(
    (impact.infectionsByRequestedTime
      * data.region.avgDailyIncomePopulation
      * data.region.avgDailyIncomeInUSD) / convertToDays(data)
  );
  severeImpact.dollarsInFlight = Math.trunc(
    (severeImpact.infectionsByRequestedTime
      * data.region.avgDailyIncomePopulation
      * data.region.avgDailyIncomeInUSD) / convertToDays(data)
  );

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
