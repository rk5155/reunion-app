export type CheckoutResponse = {
  url: string | null;
  error?: string;
};

export const useCheckout = async (
  amount: number,
  name: string,
  successUrl: string,
  email: string,
  cancelUrl: string
): Promise<CheckoutResponse> => {
  try {
    const res: CheckoutResponse = await $fetch('/api/checkout', {
      method: 'POST',
      body: {
        amount,
        name,
        origin: window.location.origin,
        successUrl,
        email,
        cancelUrl
      },
    });
    return res;
  } catch (error) {
    console.error('Checkout failed:', error);
    return { url: null, error: (error as Error).message };
  }
};