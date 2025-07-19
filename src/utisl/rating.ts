export const rating = (rating: number) => {
  const rate = rating.toFixed(1);
  if (rate.endsWith('0')) return rating.toFixed(0);
  else return rate;
};

export const color = (rating: number) => {
  if (rating !== undefined) {
    if (rating == 0) return 'transparent';
    if (rating <= 4.5) return '#c82020';
    if (rating > 4.5 && rating < 7) return '#777';
    if (rating == 7 && rating < 8.5) return '#308e21';
    else return '#a59400';
  }
};
