function parseHour(hourStr?: string): number {
    if (!hourStr || typeof hourStr !== "string") {
        return -1; // o lanza un error si quieres que sea obligatorio
    }

    const match = hourStr.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);

    if (!match) return -1;

    let hour = parseInt(match[1], 10);
    const minute = match[2] ? parseInt(match[2], 10) : 0;
    const meridian = match[3]?.toLowerCase();

    if (meridian === "pm" && hour < 12) hour += 12;
    if (meridian === "am" && hour === 12) hour = 0;

    return hour * 60 + minute; // devuelve en minutos, por ejemplo
}


function dayToIndex(day: string): number {
  const days = ["lun", "mar", "mie", "jue", "vie", "sab", "dom"];
  return days.indexOf(day.toLowerCase());
}

export function isBusinessOpen(hours: string): boolean {
  const now = new Date();
  const currentDay = now.getDay(); // 0=Dom, 1=Lun...
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // 🔥 Aquí separamos cada bloque de horario por coma
  const entries = hours.split(",").map(e => e.trim());

  for (const entry of entries) {
    if (/cerrado/i.test(entry)) continue;

    // Dividir en parte de días y horas (ej: "lun-sab 8am-6pm")
    const [daysPart, hoursPart] = entry.split(" ").map(e => e.trim());
    if (!daysPart || !hoursPart) continue;

    const [startDay, endDay] = daysPart.split("-").map(d => d.trim());
    const [openStr, closeStr] = hoursPart.split("-").map(h => h.trim());

    const openMinutes = parseHour(openStr);
    const closeMinutes = parseHour(closeStr);

    const startIndex = dayToIndex(startDay);
    const endIndex = endDay ? dayToIndex(endDay) : startIndex;

    // Ajustar índice de getDay() para que coincida
    // (JS getDay: 0=Dom, 1=Lun → nuestro array: 0=Lun, ..., 6=Dom)
    const currentIndex = (currentDay + 6) % 7;

    const inDayRange =
      (startIndex <= endIndex &&
        currentIndex >= startIndex &&
        currentIndex <= endIndex) ||
      (startIndex > endIndex &&
        (currentIndex >= startIndex || currentIndex <= endIndex));

    if (!inDayRange) continue;

    // Caso normal (ej: 9am-6pm)
    if (openMinutes < closeMinutes) {
      if (currentMinutes >= openMinutes && currentMinutes <= closeMinutes) {
        return true;
      }
    } else {
      // Caso nocturno (ej: 8pm-2am)
      if (currentMinutes >= openMinutes || currentMinutes <= closeMinutes) {
        return true;
      }
    }
  }

  return false;
}
