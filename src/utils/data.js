export function getRandomDecimal() {
  // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
  const min = 1.0;
  const max = 5.0;
  const randomDecimal = Math.random() * (max - min) + min;
  // Round to one decimal place
  const roundedDecimal = Math.round(randomDecimal * 10) / 10;
  return roundedDecimal;
}
