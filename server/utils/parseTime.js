// frontend-server/utils/parseTime.js
export function parseTimeToHHMM(timeStr) {
    if (!timeStr) return "";
    const m = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!m) return timeStr.trim();
    let hour = parseInt(m[1], 10);
    let min = parseInt(m[2], 10);
    const ampm = m[3].toUpperCase();
    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    const rounded = Math.round(min / 5) * 5;
    if (rounded === 60) {
      hour = (hour + 1) % 24;
      min = 0;
    } else {
      min = rounded;
    }
    return `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
  }
  