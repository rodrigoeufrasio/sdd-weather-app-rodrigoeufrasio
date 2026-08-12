export interface WeatherCodeInfo {
  label: string;
  icon: string;
}

const weatherCodeMap: Record<number, WeatherCodeInfo> = {
  0: { label: 'Céu limpo', icon: '☀️' },
  1: { label: 'Parcialmente nublado', icon: '🌤️' },
  2: { label: 'Nublado', icon: '⛅' },
  3: { label: 'Encoberto', icon: '☁️' },
  45: { label: 'Nevoeiro', icon: '🌫️' },
  48: { label: 'Nevoeiro com gelo', icon: '🌫️' },
  51: { label: 'Chuvisco leve', icon: '🌦️' },
  53: { label: 'Chuvisco moderado', icon: '🌦️' },
  55: { label: 'Chuvisco forte', icon: '🌧️' },
  56: { label: 'Geada leve', icon: '🌧️' },
  57: { label: 'Geada forte', icon: '🌧️' },
  61: { label: 'Chuva leve', icon: '🌦️' },
  63: { label: 'Chuva moderada', icon: '🌧️' },
  65: { label: 'Chuva forte', icon: '🌧️' },
  66: { label: 'Geada leve', icon: '🌧️' },
  67: { label: 'Geada forte', icon: '🌧️' },
  71: { label: 'Neve leve', icon: '🌨️' },
  73: { label: 'Neve moderada', icon: '❄️' },
  75: { label: 'Neve forte', icon: '❄️' },
  77: { label: 'Granizo', icon: '🌨️' },
  80: { label: 'Pancadas', icon: '🌦️' },
  81: { label: 'Chuva intensa', icon: '🌧️' },
  82: { label: 'Chuva muito intensa', icon: '🌧️' },
  85: { label: 'Neve leve', icon: '❄️' },
  86: { label: 'Neve forte', icon: '❄️' },
  95: { label: 'Trovoada', icon: '⛈️' },
  96: { label: 'Trovoada com granizo', icon: '⛈️' },
  99: { label: 'Trovoada severa', icon: '⛈️' },
};

export function getWeatherCodeInfo(code: number): WeatherCodeInfo {
  return weatherCodeMap[code] ?? { label: 'Condição variável', icon: '🌤️' };
}
