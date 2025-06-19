"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyFormHeader from "@/features/properties/components/PropertyFormHeader";
import BasicInfoSection from "@/features/properties/components/BasicInfoSection";
import LocationSection from "@/features/properties/components/LocationSection";
import PropertySpecsSection from "@/features/properties/components/PropertySpecsSection";
import PropertyDescriptionSection from "@/features/properties/components/PropertyDescriptionSection";
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
  const lookupData = useLookupData(selectedRegion, selectedCity);
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
    console.log("Form submitted with data:", data);
    console.log("Selected location:", selectedLocation);

    // Check if location is selected
    if (!selectedLocation) {
      toast.error(t("properties.validation.locationRequired"));
      return;
    }

    // Validate all required fields
    const requiredFields = [
      "title",
      "price",
      "propertyTypeId",
      "listingTypeId",
      "regionId",
      "cityId",
      "neighborhoodId",
      "streetAr",
      "streetEn",
      "area",
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
      console.log("Missing fields:", missingFields);
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await submitProperty(data, selectedLocation);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const nextStep = async () => {
    // Validate current step before proceeding
    let fieldsToValidate: (keyof CreatePropertyFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ["title", "price", "propertyTypeId", "listingTypeId"];
    }

    const isValid = await trigger(fieldsToValidate);
    console.log("Step validation result:", isValid);
    console.log("Current errors:", errors);

    if (isValid && currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else if (!isValid) {
      toast.error("Please fix the errors before proceeding");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmit = async () => {
    console.log("Final submit triggered");

    // Validate all fields before submission
    const isValid = await trigger();
    console.log("Final validation result:", isValid);

    if (isValid) {
      const formData = getValues();
      await onSubmit(formData);
    } else {
      console.log("Form validation failed:", errors);
      toast.error("Please fix all errors before submitting");
    }
  };

  const steps = [
    {
      title: t("properties.basicInfo"),
      description: t("properties.details"),
    },
    {
      title:
        t("properties.locationInfo") + " & " + t("properties.propertySpecs"),
      description: t("properties.locationInfoAndSpecs"),
    },
  ];

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
            Step {currentStep} of {steps.length}
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
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <BasicInfoSection
              control={control}
              register={register}
              errors={errors}
              propertyTypes={lookupData.propertyTypes}
              listingTypes={lookupData.listingTypes}
            />
          </div>
        )}

        {/* Step 2: Location & Specifications */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <LocationSection
              control={control}
              register={register}
              errors={errors}
              regions={lookupData.regions}
              cities={lookupData.cities}
              neighborhoods={lookupData.neighborhoods}
              selectedRegion={selectedRegion}
              selectedCity={selectedCity}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />

            <PropertySpecsSection
              control={control}
              register={register}
              errors={errors}
              conditions={lookupData.conditions}
              finishTypes={lookupData.finishTypes}
            />

            <PropertyDescriptionSection register={register} errors={errors} />
          </div>
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
            Previous
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
              Next
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
