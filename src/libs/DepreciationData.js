export default (currentBookValue,SalvageValue,assetLife) => {
  let yearlyDepreciation = (currentBookValue - SalvageValue) / assetLife
  let index = Array.from(Array(assetLife).keys());
  let thisYear = new Date().getFullYear()
  let assetYearlyBookValue = [[thisYear,currentBookValue]]
  let lastRes = currentBookValue
  index.forEach((o) => {
    lastRes -= yearlyDepreciation
    assetYearlyBookValue.push([o + thisYear + 1, lastRes])
  });
  return assetYearlyBookValue
}