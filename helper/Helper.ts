function parseHour(hourStr: string): number {
    if (!hourStr) return -1;

    const match = hourStr.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
    if (!match) return -1;

    let hour = parseInt(match[1], 10);
    const minute = match[2] ? parseInt(match[2], 10) : 0;
    const meridian = match[3]?.toLowerCase();

    // Conversión a formato 24h
    if (meridian === "pm" && hour < 12) hour += 12;
    if (meridian === "am" && hour === 12) hour = 0;
    if (hour === 24) hour = 0;

    return hour * 60 + minute;
}

function dayToIndex(day: string): number {
    const days: { [key: string]: number } = {
        'lun': 1, 'mar': 2, 'mie': 3, 'jue': 4, 'vie': 5, 'sab': 6, 'dom': 0,
        'lunes': 1, 'martes': 2, 'miercoles': 3, 'jueves': 4, 'viernes': 5, 'sabado': 6, 'domingo': 0,
        'lun.': 1, 'mar.': 2, 'mie.': 3, 'jue.': 4, 'vie.': 5, 'sab.': 6, 'dom.': 0
    };
    return days[day.toLowerCase().replace(/\./g, '')] ?? -1;
}

function parseComplexHours(hours: string): boolean {
    if (!hours || /cerrado|closed/i.test(hours)) {
        console.log('❌ NEGOCIO CERRADO - Horario indica "cerrado"');
        return false;
    }

    const now = new Date();
    const currentDay = now.getDay();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    console.log('=== DEBUG HORARIOS COMPLEJOS ===');
    console.log('Hora actual:', now.toLocaleString('es-CO'));
    console.log('Día actual:', ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'][currentDay]);
    console.log('Minutos actuales:', currentMinutes);
    console.log('Horario completo:', hours);

    // Normalizar el texto
    const normalized = hours.toLowerCase()
        .replace(/ a /g, '-')
        .replace(/ y /g, ',')
        .replace(/\./g, '')
        .replace(/\s+/g, ' ')
        .trim();

    console.log('Horario normalizado:', normalized);

    // Dividir por días (Lunes a viernes, Sábado, etc.)
    const daySections = normalized.split(/(?=\b(?:lunes|martes|miercoles|jueves|viernes|sabado|domingo|lun|mar|mie|jue|vie|sab|dom)\b)/i);
    
    for (const section of daySections) {
        if (!section.trim()) continue;

        console.log('Procesando sección:', section);

        // Extraer días y horarios
        const dayMatch = section.match(/(lunes|martes|miercoles|jueves|viernes|sabado|domingo|lun|mar|mie|jue|vie|sab|dom)(?:\s*a\s*(lunes|martes|miercoles|jueves|viernes|sabado|domingo|lun|mar|mie|jue|vie|sab|dom))?/i);
        
        if (!dayMatch) continue;

        const startDay = dayMatch[1];
        const endDay = dayMatch[2] || startDay;

        // Extraer todos los horarios (pueden ser múltiples como "8-12:30 y 1:30-5")
        const timePart = section.replace(dayMatch[0], '').trim();
        const timeRanges = timePart.split(/,\s*|\s+y\s+/);

        console.log('Días:', { startDay, endDay });
        console.log('Rangos de tiempo:', timeRanges);

        const startIndex = dayToIndex(startDay);
        const endIndex = dayToIndex(endDay);

        // Verificar si estamos en el rango de días
        let inDayRange = false;
        if (startIndex <= endIndex) {
            inDayRange = currentDay >= startIndex && currentDay <= endIndex;
        } else {
            inDayRange = currentDay >= startIndex || currentDay <= endIndex;
        }

        console.log('¿En rango de días?', inDayRange);

        if (!inDayRange) continue;

        // Verificar cada rango de horario para estos días
        for (const timeRange of timeRanges) {
            if (!timeRange.trim()) continue;

            const timeMatch = timeRange.match(/(\d{1,2})(?::(\d{2}))?\s*-\s*(\d{1,2})(?::(\d{2}))?/);
            if (!timeMatch) continue;

            const openHour = parseInt(timeMatch[1]);
            const openMinute = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
            const closeHour = parseInt(timeMatch[3]);
            const closeMinute = timeMatch[4] ? parseInt(timeMatch[4]) : 0;

            // Asumir horario comercial (am/pm basado en valores razonables)
            let openMinutes = openHour * 60 + openMinute;
            let closeMinutes = closeHour * 60 + closeMinute;

            // Ajustar para PM si es necesario
            if (openHour < 8) openMinutes += 12 * 60; // Si abre antes de 8am, probablemente es PM
            if (closeHour <= 5 && closeHour < openHour) closeMinutes += 12 * 60; // Si cierra temprano y es menor que apertura

            console.log('Rango procesado:', {
                original: timeRange,
                openTime: `${Math.floor(openMinutes/60)}:${openMinutes%60}`,
                closeTime: `${Math.floor(closeMinutes/60)}:${closeMinutes%60}`,
                openMinutes,
                closeMinutes
            });

            // Verificar horario
            if (openMinutes <= closeMinutes) {
                if (currentMinutes >= openMinutes && currentMinutes <= closeMinutes) {
                    console.log('✅ NEGOCIO ABIERTO - Horario normal');
                    return true;
                }
            } else {
                if (currentMinutes >= openMinutes || currentMinutes <= closeMinutes) {
                    console.log('✅ NEGOCIO ABIERTO - Horario cruzado');
                    return true;
                }
            }
        }
    }

    console.log('❌ NEGOCIO CERRADO - No coincide con ningún horario');
    return false;
}

// Función principal que puedes exportar
export function isBusinessOpen(hours: string): boolean {
    return parseComplexHours(hours);
}