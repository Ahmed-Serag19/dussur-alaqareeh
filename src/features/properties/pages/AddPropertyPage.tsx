import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyFormHeader from "@/features/properties/components/PropertyFormHeader";
import BasicInfoSection from "@/features/properties/components/BasicInfoSection";
import { LocationSection } from "@/features/properties/components/LocationSection";
import { PropertySpecsSection } from "@/features/properties/components/PropertySpecsSection";
import { usePropertyForm } from "@/features/properties/hooks/usePropertyForm";
import { useLookupData } from "@/features/properties/hooks/useLookupData";
import { usePropertySubmission } from "@/features/properties/hooks/usePropertySubmission";
import type { CreatePropertyFormData } from "@/features/properties/types/property.types";
import useLanguage from "@/hooks/useLanguage";
import { toast } from "react-hot-toast";

const AddPropertyPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    form,
    selectedRegion,
    selectedCity,
    selectedLocation,
    setSelectedLocation,
  } = usePropertyForm();
  const { submitProperty, isLoading } = usePropertySubmission();
  const lookupData = useLookupData();
  const { isRTL, t } = useLanguage();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    getValues,
  } = form;

  const onSubmit = async (data: CreatePropertyFormData) => {
    if (!selectedLocation) {
      toast.error(t("properties.validation.locationRequired"));
      return;
    }

    const requiredFields = [
      "title",
      "description",
      "price",
      "area",
      "propertyTypeId",
      "listingTypeId",
      "regionId",
      "cityId",
      "neighborhoodId",
      "streetAr",
      "streetEn",
      "conditionId",
      "finishTypeId",
      "descriptionAr",
      "descriptionEn",
    ];

    const missingFields = requiredFields.filter((field) => {
      const value = data[field as keyof CreatePropertyFormData];
      return !value || value === 0 || value === "";
    });

    if (missingFields.length > 0) {
      toast.error(t("properties.missingFields"));
      return;
    }

    try {
      await submitProperty(data, selectedLocation);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const nextStep = async () => {
    const stepFields: Record<number, (keyof CreatePropertyFormData)[]> = {
      1: [
        "title",
        "description",
        "price",
        "area",
        "propertyTypeId",
        "listingTypeId",
      ],
      2: ["regionId", "cityId", "neighborhoodId", "streetAr", "streetEn"],
    };

    const isValid = await trigger(stepFields[currentStep] || []);
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else if (!isValid) {
      toast.error(t("properties.fixErrorsBeforeSubmit"));
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFinalSubmit = async () => {
    const isValid = await trigger();
    if (isValid) {
      const formData = getValues();
      await onSubmit(formData);
    } else {
      toast.error(t("properties.fixErrorsBeforeSubmit"));
    }
  };

  const steps = [
    {
      title: t("properties.basicInfo"),
      description: t("properties.basicInfoDescription"),
    },
    {
      title: t("properties.locationInfo"),
      description: t("properties.locationInfoAndSpecs"),
    },
    {
      title: t("properties.propertySpecs") + " & " + t("properties.details"),
      description: t("properties.propertySpecs"),
    },
  ];

  if (lookupData.isLoading) {
    return (
      <div className="space-y-6">
        <PropertyFormHeader />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{t("common.loading")}...</p>
          </div>
        </div>
      </div>
    );
  }

  if (lookupData.error) {
    return (
      <div className="space-y-6">
        <PropertyFormHeader />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-red-600 mb-4">{t("properties.loadError")}</p>
            <Button onClick={() => lookupData.refetch()} variant="outline">
              {t("common.tryAgain")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PropertyFormHeader />

      {/* Progress Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-sm text-gray-500">
              {steps[currentStep - 1].description}
            </p>
          </div>
          <span className="text-sm text-gray-500">
            {t("properties.step")} {currentStep} {t("properties.of")}{" "}
            {steps.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {currentStep === 1 && (
          <BasicInfoSection
            control={control}
            register={register}
            errors={errors}
            propertyTypes={lookupData.propertyTypes}
            listingTypes={lookupData.listingTypes}
          />
        )}
        {currentStep === 2 && (
          <LocationSection
            control={control}
            register={register}
            errors={errors}
            regions={lookupData.regions}
            cities={lookupData.getCitiesByRegion(selectedRegion || 0)}
            neighborhoods={lookupData.getNeighborhoodsByCity(selectedCity || 0)}
            selectedRegion={selectedRegion}
            selectedCity={selectedCity}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        )}
        {currentStep === 3 && (
          <PropertySpecsSection
            control={control}
            register={register}
            errors={errors}
            conditions={lookupData.propertyConditions}
            finishTypes={lookupData.finishingTypes}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            {t("common.previous")}
          </Button>

          {currentStep === steps.length ? (
            <Button
              type="button"
              onClick={handleFinalSubmit}
              disabled={isLoading}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              {isLoading ? t("common.loading") : t("properties.saveProperty")}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2"
            >
              {t("common.next")}
              <ChevronRight
                className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`}
              />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
export default AddPropertyPage;
