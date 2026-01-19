export const transformShippingMethod = (method: any) => {
  const s = method.settings || {};

  const baseCost = Number(s.cost?.value ?? 0);
  const type = s.type?.value ?? "order";

  const classCosts: Record<string, number> = {};
  for (const [key, val] of Object.entries(s)) {
    if (key.startsWith("class_cost_") || key === "no_class_cost") {
      classCosts[key.replace("class_cost_", "")] = Number(
        (val as any)?.value ?? 0
      );
    }
  }
  return {
    id: method.id,
    title: method.title,
    methodId: method.method_id,
    baseCost,
    classCosts,
    type,
  };
};

export const findZoneByCountry = (
  shippingMethods: any[],
  countryCode: string | undefined
) => {
  if (!countryCode) return null;
  const code = String(countryCode).toUpperCase();
  // Busca zone que tenga ese code
  const matched = shippingMethods.find(
    (zone) =>
      Array.isArray(zone.locations) &&
      zone.locations.some((loc: any) => String(loc.code).toUpperCase() === code)
  );
  if (matched) return matched;
  // Fallback: "rest of world" — zona con locations vacía (si existe)
  return (
    shippingMethods.find(
      (zone) => !Array.isArray(zone.locations) || zone.locations.length === 0
    ) ?? null
  );
};
