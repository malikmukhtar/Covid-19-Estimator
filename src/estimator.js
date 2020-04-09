const impactInfectionsByRequestedTime = (data) => {
  if (data === 'days') {
    return Math.trunc(data.timeToElapse / 3);
  }
  if (data === 'weeks') {
    return Math.trunc((data.timeToElapse * 7) / 3);
  }
  if (data === 'months') {
    return Math.trunc((data.timeToElapse * 30) / 3);
  }
  return 0;
};

const severeInfectionsByRequestedTime = (data) => {
  if (data === 'days') {
    return Math.trunc(data.timeToElapse / 3);
  }
  if (data === 'weeks') {
    return Math.trunc((data.timeToElapse * 7) / 3);
  }
  if (data === 'months') {
    return Math.trunc((data.timeToElapse * 30) / 3);
  }
  return 0;
};

const covid19ImpactEstimator = (data) => ({
  data,
  impact: {
    currentlyInfected: data.reportedCases * 10,
    infectionsByRequestedTime: impactInfectionsByRequestedTime()
  },
  severeImpact: {
    currentlyInfected: data.reportedCases * 50,
    infectionsByRequestedTime: severeInfectionsByRequestedTime()
  }
});

export default covid19ImpactEstimator;
