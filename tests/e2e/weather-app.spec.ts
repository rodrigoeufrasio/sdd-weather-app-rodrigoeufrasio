import { expect, test } from '@playwright/test';

test('searches for a city and toggles unit in desktop', async ({ page }) => {
  await page.route('https://geocoding-api.open-meteo.com/v1/search*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        results: [
          {
            id: 1,
            name: 'Lisboa',
            country: 'Portugal',
            admin1: 'Lisbon',
            latitude: 38.7223,
            longitude: -9.1393,
          },
        ],
      }),
    });
  });

  await page.route('https://api.open-meteo.com/v1/forecast*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        current: {
          time: '2025-01-01T12:00',
          temperature_2m: 20,
          relative_humidity_2m: 60,
          wind_speed_10m: 15,
          surface_pressure: 1013,
          precipitation: 1,
          weather_code: 0,
        },
        daily: {
          time: ['2025-01-01', '2025-01-02', '2025-01-03', '2025-01-04', '2025-01-05'],
          weather_code: [0, 1, 2, 3, 61],
          temperature_2m_max: [22, 21, 20, 19, 18],
          temperature_2m_min: [14, 13, 12, 11, 10],
          precipitation_probability_max: [10, 20, 30, 40, 50],
        },
      }),
    });
  });

  await page.goto('/');
  await page.getByLabel('Buscar cidade').fill('Lisboa');
  await page.getByRole('button', { name: 'Buscar' }).click();

  await expect(page.getByRole('heading', { name: 'Lisboa' })).toBeVisible();
  await expect(page.getByText('Hoje')).toBeVisible();

  await page.getByRole('button', { name: '°F' }).click();
  await expect(page.getByText('68°F').first()).toBeVisible();
});

test('renders the empty state on mobile when no city matches', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  await page.route('https://geocoding-api.open-meteo.com/v1/search*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ results: [] }),
    });
  });

  await page.goto('/');
  await page.getByLabel('Buscar cidade').fill('Cidade inexistente');
  await page.getByRole('button', { name: 'Buscar' }).click();

  await expect(page.getByText('Nenhuma cidade encontrada')).toBeVisible();
  await page.close();
  await context.close();
});
