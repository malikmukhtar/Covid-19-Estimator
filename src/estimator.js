// Normalizing Impact
const impactInfectionsByRequestedTime = (data) => {
  if (data.periodType === 'days') {
    return Math.trunc(data.timeToElapse / 3);
  }
  if (data.periodType === 'weeks') {
    return Math.trunc((data.timeToElapse * 7) / 3);
  }
  if (data.periodType === 'months') {
    return Math.trunc((data.timeToElapse * 30) / 3);
  }
  return 0;
};
// Normalizing Severe
const severeInfectionsByRequestedTime = (data) => {
  if (data.periodType === 'days') {
    return Math.trunc(data.timeToElapse / 3);
  }
  if (data.periodType === 'weeks') {
    return Math.trunc((data.timeToElapse * 7) / 3);
  }
  if (data.periodType === 'months') {
    return Math.trunc((data.timeToElapse * 30) / 3);
  }
  return 0;
};
// Estimator
const covid19ImpactEstimator = (data) => ({
  data,
  impact: {
    currentlyInfected: data.reportedCases * 10,
    infectionsByRequestedTime:
      data.reportedCases * 10 * 2 ** impactInfectionsByRequestedTime(data),
    severeCasesByRequestedTime: Math.trunc(
      data.reportedCases
      * 0.15
      * 10
      * 2 ** impactInfectionsByRequestedTime(data)
    ),
    hospitalBedsByRequestedTime: Math.trunc(
      0.65 * data.totalHospitalBeds
      - 0.15
      * data.reportedCases
      * 10
      * 2 ** impactInfectionsByRequestedTime(data)
    )
  },
  severeImpact: {
    currentlyInfected: data.reportedCases * 50,
    infectionsByRequestedTime:
      data.reportedCases * 50 * 2 ** severeInfectionsByRequestedTime(data),
    severeCasesByRequestedTime: Math.trunc(
      data.reportedCases
      * 0.15
      * 10
      * 2 ** impactInfectionsByRequestedTime(data)
    ),
    hospitalBedsByRequestedTime: Math.trunc(
      0.65 * data.totalHospitalBeds
      - 0.15
      * data.reportedCases
      * 10
      * 2 ** impactInfectionsByRequestedTime(data)
    )
  }
});

export default covid19ImpactEstimator;
