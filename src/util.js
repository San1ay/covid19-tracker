import numeral from 'numeral';

// Sort countries on basis of Cases
export const sortData = (data, dataType = 'cases') => {
  const sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a[dataType] > b[dataType]) {
      return -1;
    } else {
      return 1;
    }
  }); return sortedData;
};


//
export const prettyPrintStat = stat => stat ? `+${numeral(stat).format("0.00a")}` : "None";