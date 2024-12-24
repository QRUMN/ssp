interface AnalyticsEvent {
  membership_selected: {
    membership_tier: string;
    source: string;
  };
  membership_selection_error: {
    error: string;
    membership_tier: string;
  };
  onboarding_started: {
    membership_tier: string;
  };
  onboarding_completed: {
    membership_tier: string;
  };
  onboarding_error: {
    error: string;
    membership_tier: string;
    step: string;
  };
}

export function useAnalytics() {
  const trackEvent = <T extends keyof AnalyticsEvent>(
    eventName: T,
    eventData: AnalyticsEvent[T]
  ) => {
    // In a real app, this would send to your analytics service
    console.log(`[Analytics] ${eventName}:`, eventData);
  };

  return { trackEvent };
}