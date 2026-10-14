export async function submitContactMessage(body: string, timeoutMs = 20000): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch('/__forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: controller.signal
    });

    if (!response.ok) throw new Error('Contact form submission could not be confirmed');
  } finally {
    clearTimeout(timer);
  }
}
