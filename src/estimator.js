// Normalizing Impact...
const impactInfectionsByRequestedTime = (data) => {
  if (data.periodType === 'days') {
    return (data.timeToElapse / 3);
  }
  if (data.periodType === 'weeks') {
    return ((data.timeToElapse * 7) / 3);
  }
  if (data.periodType === 'months') {
    return ((data.timeToElapse * 30) / 3);
  }
  return 0;
};
// Normalizing Severe
const severeInfectionsByRequestedTime = (data) => {
  if (data.periodType === 'days') {
    return (data.timeToElapse / 3);
  }
  if (data.periodType === 'weeks') {
    return ((data.timeToElapse * 7) / 3);
  }
  if (data.periodType === 'months') {
    return ((data.timeToElapse * 30) / 3);
  }
  return 0;
};
// Estimator
const covid19ImpactEstimator = (data) => ({
  data,
  impact: {
    currentlyInfected: data.reportedCases * 10,
    infectionsByRequestedTime: Math.trunc(
      data.reportedCases * 10 * 2 ** impactInfectionsByRequestedTime(data)
    ),
    severeCasesByRequestedTime: Math.trunc(
      0.15
      * data.reportedCases
      * 10
      * 2 ** impactInfectionsByRequestedTime(data)
    ),
    hospitalBedsByRequestedTime: Math.trunc(
      0.35 * data.totalHospitalBeds
      - 0.15
      * data.reportedCases
      * 10
      * 2 ** impactInfectionsByRequestedTime(data)
    ),
    casesForICUByRequestedTime:
      0.05
      * data.reportedCases
      * 10
      * 2 ** impactInfectionsByRequestedTime(data),
    casesForVentilatorsByRequestedTime: Math.trunc(
      0.02
      * data.reportedCases
      * 10
      * 2 ** impactInfectionsByRequestedTime(data)
    ),
    dollarsInFlight: Math.trunc(
      (data.reportedCases
        * 10
        * 2 ** impactInfectionsByRequestedTime(data)
        * data.region.avgDailyIncomePopulation
        * data.region.avgDailyIncomeInUSD)
      / data.timeToElapse
    )
  },
  severeImpact: {
    currentlyInfected: data.reportedCases * 50,
    infectionsByRequestedTime: Math.trunc(
      data.reportedCases * 50 * 2 ** severeInfectionsByRequestedTime(data)
    ),
    severeCasesByRequestedTime: Math.trunc(
      data.reportedCases
      * 0.15
      * 50
      * 2 ** severeInfectionsByRequestedTime(data)
    ),
    hospitalBedsByRequestedTime: Math.trunc(
      0.35 * data.totalHospitalBeds
      - 0.15
      * data.reportedCases
      * 50
      * 2 ** severeInfectionsByRequestedTime(data)
    ),
    casesForICUByRequestedTime: Math.trunc(
      0.05
      * data.reportedCases
      * 50
      * 2 ** severeInfectionsByRequestedTime(data)
    ),
    casesForVentilatorsByRequestedTime: Math.trunc(
      0.02
      * data.reportedCases
      * 50
      * 2 ** severeInfectionsByRequestedTime(data)
    ),
    dollarsInFlight: Math.trunc(
      (data.reportedCases
        * 50
        * 2 ** severeInfectionsByRequestedTime(data)
        * data.region.avgDailyIncomePopulation
        * data.region.avgDailyIncomeInUSD)
      / data.timeToElapse
    )
  }
});

export default covid19ImpactEstimator;
