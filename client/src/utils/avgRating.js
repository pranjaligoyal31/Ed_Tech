export default function GetAvgRating(ratingArray) {
  if (!Array.isArray(ratingArray) || ratingArray.length === 0) {
    return 0;
  }

  let total = 0;
  let count = 0;

  ratingArray.forEach((review) => {
    if (typeof review.rating === "number") {
      total += review.rating;
      count++;
    }
  });

  return count > 0 ? total / count : 0;
}
