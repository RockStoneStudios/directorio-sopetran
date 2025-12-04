// 📁 utils/weatherCorrection.ts

export function correctSopetranTemperature(
  rawTemp: number, 
  humidity?: number
): { temperature: number; feelsLike: number } {
  
  // Corrección base para Sopetrán (+10°C)
  const adjustment = 10;
  
  // Temperatura corregida
  const correctedTemp = rawTemp + adjustment;
  
  // Sensación térmica ajustada
  const humidityEffect = humidity ? (humidity / 100) * 2 : 1.5;
  const feelsLike = correctedTemp + humidityEffect;
  
  return {
    temperature: Math.round(correctedTemp * 10) / 10,
    feelsLike: Math.round(feelsLike * 10) / 10
  };
}