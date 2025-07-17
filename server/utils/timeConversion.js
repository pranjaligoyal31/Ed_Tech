exports.convertTimeStringToSeconds = (timeString) => {
  // Handle invalid or missing data
  if (!timeString || typeof timeString !== "string") return 0;

  const parts = timeString.split(":").map(Number);
  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  }
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  }
  return parseInt(timeString) || 0; // fallback
};
