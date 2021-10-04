export const indexOfMinMax = (lapTimes) => {
  const min = Math.min(...lapTimes);
  const max = Math.max(...lapTimes);

  const indexMin = lapTimes.indexOf(min);
  const indexMax = lapTimes.indexOf(max);
  return { minIndex: indexMin, maxIndex: indexMax };
};

export const markMinMax = (minMaxIndex, index) => {
  if (minMaxIndex.minIndex !== minMaxIndex.maxIndex) {
    if (index === minMaxIndex.minIndex) {
      return "min";
    }
    if (index === minMaxIndex.maxIndex) {
      return "max";
    }
  }
};

//RunmarkMinMax only after length =2
