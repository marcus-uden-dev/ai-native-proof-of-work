export function publicProviderFailure(error) {
  if (providerCreditsExhausted(error)) {
    return {
      status: 503,
      code: 'provider_credits_exhausted',
      error: 'The best things in life are free — sadly, API credits are not. The AI review credits have run out. Please try again soon or use the copyable prompt.'
    };
  }
  if (error?.name === 'AbortError') {
    return { status: 504, code: 'review_timeout', error: 'The review took too long. Please try again.' };
  }
  if (error?.status === 429) {
    return { status: 429, code: 'provider_rate_limited', error: 'The AI review service is busy. Please try again in a moment.' };
  }
  if (Number.isInteger(error?.status) && error.status >= 500) {
    return { status: 503, code: 'provider_unavailable', error: 'The AI review service is temporarily unavailable. Please try again shortly.' };
  }
  if (error?.status === 401 || error?.status === 403) {
    return { status: 503, code: 'provider_configuration', error: 'The AI review service is temporarily unavailable. Use the copyable prompt instead.' };
  }
  return { status: 502, code: 'provider_response_invalid', error: 'The AI review response could not be used safely. Use the copyable prompt instead.' };
}

export function shouldTryBackupProvider(error) {
  return error?.retryable === true
    || error?.name === 'AbortError'
    || error?.status === 401
    || error?.status === 403
    || error?.status === 429
    || (Number.isInteger(error?.status) && error.status >= 500);
}

export function providerCreditsExhausted(error) {
  if (error?.creditsExhausted === true) return true;
  const failures = error?.failures ?? [error];
  return failures.length > 0 && failures.every((failure) => /credit|quota|billing|spend|balance|resource_exhausted/i.test(failure?.detail ?? ''));
}

export function providerErrorCategory(error) {
  if (error?.name === 'AbortError') return 'timeout';
  if (error?.status === 429) return 'rate-limit';
  if (Number.isInteger(error?.status) && error.status >= 500) return 'provider-5xx';
  if (error?.status === 401 || error?.status === 403) return 'provider-configuration';
  return 'provider-response';
}
