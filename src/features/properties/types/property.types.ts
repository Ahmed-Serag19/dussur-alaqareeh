import { z } from "zod";

export const createPropertySchema = (t: (key: string) => string) =>
  z.object({
    title: z.string().min(1, t("properties.validation.titleRequired")),
    descriptionAr: z
      .string()
      .min(1, t("properties.validation.descriptionRequired")),
    descriptionEn: z
      .string()
      .min(1, t("properties.validation.descriptionRequired")),
    price: z.number().min(1, t("properties.validation.priceRequired")),
    area: z.number().min(1, t("properties.validation.areaRequired")),
    regionId: z.number().min(1, t("properties.validation.regionRequired")),
    cityId: z.number().min(1, t("properties.validation.cityRequired")),
    neighborhoodId: z
      .number()
      .min(1, t("properties.validation.neighborhoodRequired")),
    propertyTypeId: z
      .number()
      .min(1, t("properties.validation.propertyTypeRequired")),
    listingTypeId: z
      .number()
      .min(1, t("properties.validation.listingTypeRequired")),
    conditionId: z
      .number()
      .min(1, t("properties.validation.conditionRequired")),
    finishTypeId: z
      .number()
      .min(1, t("properties.validation.finishTypeRequired")),
    streetAr: z.string().min(1, t("properties.validation.streetRequired")),
    streetEn: z.string().min(1, t("properties.validation.streetRequired")),
    roomsCount: z.number().min(0),
    bathroomsCount: z.number().min(0),
    livingroomsCount: z.number().min(0),
    floorsCount: z.number().min(0),
    buildingAge: z.number().min(0),
    longitude: z.number(),
    latitude: z.number(),
  });

export type CreatePropertyFormData = z.infer<
  ReturnType<typeof createPropertySchema>
>;
