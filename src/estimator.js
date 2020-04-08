const covid19ImpactEstimator = (data) => ({
  data: {},
  impact: {
    currentlyInfected: data.reportedCases * 10,
    infectionsByRequestedTime: data.reportedCases * 10 * 512
  },
  severeImpact: {
    currentlyInfected: data.reportedCases * 50,
    infectionsByRequestedTime: data.reportedCases * 10 * 512
  }
});

export default covid19ImpactEstimator;
