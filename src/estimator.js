const covid19ImpactEstimator = (data) => ({
  data: {},
  impact: {
    currentlyInfected: data.reportedCases * 10,
    infectionsByRequestedTime: data.reportedCases * 10 * 512,
    severeCasesByRequestedTime: 0.15 * data.reportedCases * 10 * 512,
    hospitalBedsByRequestedTime: 23,
    casesForICUByRequestedTime: 0.05 * data.reportedCases * 10 * 512,
    casesForVentilatorsByRequestedTime: 0.02 * data.reportedCases * 10 * 512,
    dollarInFlight:
      this.infectionsByRequestedTime *
      data.region.avgDailyIncomePopulation *
      data.region.avgDailyIncomeInUSD *
      30
  },
  severeImpact: {
    currentlyInfected: data.reportedCases * 50,
    infectionsByRequestedTime: data.reportedCases * 50 * 512,
    severeCasesByRequestedTime: 0.15 * data.reportedCases * 50 * 512,
    hospitalBedsByRequestedTime: 23,
    casesForICUByRequestedTime: 0.05 * data.reportedCases * 50 * 512,
    casesForVentilatorsByRequestedTime: 0.02 * data.reportedCases * 50 * 512
  }
});

export default covid19ImpactEstimator;
