export const contractTypes = [
  "payment-gateway",
  "pro-rata",
  "vesting",
  "babt",
] as const;

export const contractTypeChoices = contractTypes.map((type) => ({
  id: type,
  name: type,
}));
