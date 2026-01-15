import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import PropertyFormHeader from "@/features/properties/components/PropertyFormHeader";
import BasicInfoSection from "@/features/properties/components/BasicInfoSection";
import { LocationSection } from "@/features/properties/components/LocationSection";
import { PropertySpecsSection } from "@/features/properties/components/PropertySpecsSection";
import PropertyImagesSection from "@/features/properties/components/PropertyImagesSection";
import { usePropertyForm } from "@/features/properties/hooks/usePropertyForm";
import { usePropertySubmission } from "@/features/properties/hooks/usePropertySubmission";
import type { CreatePropertyFormData } from "@/features/properties/types/property.types";
import useLanguage from "@/hooks/useLanguage";
import { toast } from "react-hot-toast";
import PropertyFeaturesSection from "../components/PropertyFeaturesStep";
import { useLookupContext } from "../context/lookup-context";

const AddPropertyPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const {
    form,
    selectedRegion,
    selectedCity,
    selectedLocation,
    setSelectedLocation,
  } = usePropertyForm();
  const { submitProperty, isLoading } = usePropertySubmission();
  const lookupData = useLookupContext();
  const { isRTL, t } = useLanguage();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    getValues,
    watch,
    setValue,
  } = form;

  // Helper function to get translated field label
  const getFieldLabel = (fieldName: keyof CreatePropertyFormData): string => {
    const fieldLabelMap: Record<string, string> = {
      title: "properties.title",
      description: "properties.description",
      price: "properties.price",
      area: "properties.area",
      propertyTypeId: "properties.propertyType",
      listingTypeId: "properties.listingType",
      regionId: "properties.region",
      cityId: "properties.city",
      neighborhoodId: "properties.neighborhood",
      streetAr: "properties.streetAr",
      streetEn: "properties.streetEn",
      conditionId: "properties.condition",
      finishTypeId: "properties.finishType",
      descriptionAr: "properties.descriptionAr",
      descriptionEn: "properties.descriptionEn",
      roomsCount: "properties.roomsCount",
      bathroomsCount: "properties.bathroomsCount",
      livingroomsCount: "properties.livingroomsCount",
      floorsCount: "properties.floorsCount",
      buildingAge: "properties.buildingAge",
    };

    const translationKey = fieldLabelMap[fieldName] || fieldName;
    return t(translationKey);
  };

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
      await submitProperty(data, selectedLocation, selectedImages);
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
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else if (!isValid) {
      // Get field-specific errors
      const fieldErrors = stepFields[currentStep] || [];
      const errorMessages = fieldErrors
        .map((field) => {
          const error = errors[field];
          if (error?.message) {
            const fieldLabel = getFieldLabel(field);
            return `${fieldLabel}: ${error.message}`;
          }
          return null;
        })
        .filter((msg): msg is string => msg !== null);

      if (errorMessages.length > 0) {
        // Show specific field errors
        const errorList = errorMessages.slice(0, 5).join("\n• ");
        const remainingCount = errorMessages.length - 5;
        let moreErrorsText = "";
        if (remainingCount > 0) {
          const baseText = t("properties.messages.moreErrors", {
            count: remainingCount,
          });
          moreErrorsText = baseText
            .replace("error(s)", remainingCount === 1 ? "error" : "errors")
            .replace(
              "خطأ/أخطاء أخرى",
              remainingCount === 1 ? "خطأ آخر" : "أخطاء أخرى"
            );
        }
        const fullMessage = `${t(
          "properties.messages.fixErrorsBeforeSubmit"
        )}\n\n• ${errorList}${moreErrorsText ? `\n• ${moreErrorsText}` : ""}`;

        toast.error(fullMessage, {
          duration: 8000,
          style: {
            whiteSpace: "pre-line",
            maxWidth: "500px",
          },
        });
      } else {
        toast.error(t("properties.messages.fixErrorsBeforeSubmit"));
      }
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
      // Get all field errors
      const errorFields = Object.keys(errors) as Array<
        keyof CreatePropertyFormData
      >;
      const errorMessages = errorFields
        .map((field) => {
          const error = errors[field];
          if (error?.message) {
            const fieldLabel = getFieldLabel(field);
            return `${fieldLabel}: ${error.message}`;
          }
          return null;
        })
        .filter((msg): msg is string => msg !== null);

      if (errorMessages.length > 0) {
        // Show specific field errors
        const errorList = errorMessages.slice(0, 5).join("\n• ");
        const remainingCount = errorMessages.length - 5;
        let moreErrorsText = "";
        if (remainingCount > 0) {
          const baseText = t("properties.messages.moreErrors", {
            count: remainingCount,
          });
          moreErrorsText = baseText
            .replace("error(s)", remainingCount === 1 ? "error" : "errors")
            .replace(
              "خطأ/أخطاء أخرى",
              remainingCount === 1 ? "خطأ آخر" : "أخطاء أخرى"
            );
        }
        const fullMessage = `${t(
          "properties.messages.fixErrorsBeforeSubmit"
        )}\n\n• ${errorList}${moreErrorsText ? `\n• ${moreErrorsText}` : ""}`;

        toast.error(fullMessage, {
          duration: 8000,
          style: {
            whiteSpace: "pre-line",
            maxWidth: "500px",
          },
        });
      } else {
        toast.error(t("properties.messages.fixErrorsBeforeSubmit"));
      }
    }
  };

  const steps = [
    {
      id: 1,
      title: t("properties.basicInfo"),
      description: t("properties.basicInfoDescription"),
      icon: "📝",
    },
    {
      id: 2,
      title: t("properties.locationInfo"),
      description: t("properties.locationInfoAndSpecs"),
      icon: "📍",
    },
    {
      id: 3,
      title: t("properties.propertySpecs") + " & " + t("properties.details"),
      description: t("properties.propertySpecs"),
      icon: "🏗️",
    },
    {
      id: 4,
      title: t("properties.features.title"),
      description: t("properties.features.subtitle"),
      icon: "✨",
    },
    {
      id: 5,
      title: t("properties.images.title"),
      description: t("properties.images.description"),
      icon: "📷",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <PropertyFormHeader />

        <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
          {/* Sidebar Navigation - Hidden on mobile/tablet, shown on desktop */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 xl:p-6 sticky top-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-5 xl:mb-6 uppercase tracking-wide">
                {t("properties.step")} {currentStep} {t("properties.of")}{" "}
                {steps.length}
              </h3>
              <nav className="space-y-2.5 xl:space-y-2">
                {steps.map((step, index) => {
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  const isUpcoming = currentStep < step.id;

                  return (
                    <button
                      key={step.id}
                      onClick={() => {
                        // Allow navigation to completed or next step
                        if (isCompleted || step.id === currentStep + 1) {
                          setCurrentStep(step.id);
                        }
                      }}
                      disabled={isUpcoming && !isCompleted}
                      className={`w-full text-left group relative ${
                        isUpcoming && !isCompleted
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`}
                    >
                      <div
                        className={`flex items-start gap-3.5 xl:gap-4 p-3.5 xl:p-4 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-blue-50 border-2 border-blue-500 shadow-sm"
                            : isCompleted
                            ? "bg-green-50 border-2 border-green-200 hover:bg-green-100"
                            : "border-2 border-transparent hover:bg-gray-50"
                        }`}
                      >
                        {/* Step Number/Icon */}
                        <div
                          className={`flex-shrink-0 w-9 h-9 xl:w-10 xl:h-10 rounded-full flex items-center justify-center text-base xl:text-lg font-semibold transition-all ${
                            isActive
                              ? "bg-blue-500 text-white shadow-md"
                              : isCompleted
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="w-4 h-4 xl:w-5 xl:h-5" />
                          ) : (
                            <span className="text-sm xl:text-base">{step.icon}</span>
                          )}
                        </div>

                        {/* Step Info */}
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-sm xl:text-sm font-semibold mb-1 ${
                              isActive
                                ? "text-blue-900"
                                : isCompleted
                                ? "text-green-900"
                                : "text-gray-700"
                            }`}
                          >
                            {step.title}
                          </div>
                          <div className="text-xs xl:text-xs text-gray-500 line-clamp-3 xl:line-clamp-2 leading-relaxed">
                            {step.description}
                          </div>
                        </div>

                        {/* Connector Line */}
                        {index < steps.length - 1 && (
                          <div
                            className={`absolute ${
                              isRTL ? "right-4 xl:right-5" : "left-4 xl:left-5"
                            } top-14 xl:top-14 w-0.5 h-8 xl:h-8 ${
                              isCompleted
                                ? "bg-green-300"
                                : isActive
                                ? "bg-blue-300"
                                : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Mobile/Tablet Step Indicator - Horizontal Scroll */}
          <div className="lg:hidden mb-4 sm:mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  {t("properties.step")} {currentStep} {t("properties.of")}{" "}
                  {steps.length}
                </h3>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                {steps.map((step) => {
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => {
                        if (isCompleted || step.id === currentStep + 1) {
                          setCurrentStep(step.id);
                        }
                      }}
                      disabled={currentStep < step.id && !isCompleted}
                      className={`flex-shrink-0 flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-blue-50 border-2 border-blue-500"
                          : isCompleted
                          ? "bg-green-50 border-2 border-green-200"
                          : "border-2 border-transparent bg-gray-50"
                      } ${currentStep < step.id && !isCompleted ? "opacity-50" : ""}`}
                    >
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold transition-all ${
                          isActive
                            ? "bg-blue-500 text-white shadow-md"
                            : isCompleted
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <span className="text-xs sm:text-sm">{step.icon}</span>
                        )}
                      </div>
                      <span
                        className={`text-[10px] sm:text-xs font-medium text-center max-w-[70px] sm:max-w-[90px] line-clamp-2 ${
                          isActive
                            ? "text-blue-900"
                            : isCompleted
                            ? "text-green-900"
                            : "text-gray-600"
                        }`}
                      >
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 xl:col-span-9">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              {/* Current Step Content */}
              <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    {steps[currentStep - 1].title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    {steps[currentStep - 1].description}
                  </p>
                </div>
                <div className="p-4 sm:p-6">
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
                      neighborhoods={lookupData.getNeighborhoodsByCity(
                        selectedCity || 0
                      )}
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
                  {currentStep === 4 && (
                    <PropertyFeaturesSection
                      watch={watch}
                      setValue={setValue}
                    />
                  )}
                  {currentStep === 5 && (
                    <PropertyImagesSection
                      images={selectedImages}
                      onImagesChange={setSelectedImages}
                    />
                  )}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                {/* Mobile: Stacked layout */}
                <div className="flex flex-col sm:hidden gap-3">
                  {/* Progress indicator on mobile */}
                  <div className="w-full mb-2">
                    <div className="flex items-center justify-center gap-1.5">
                      {steps.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1.5 rounded-full transition-all duration-300 flex-1 ${
                            index + 1 <= currentStep
                              ? "bg-blue-500"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-center text-xs text-gray-500 mt-2">
                      {t("properties.step")} {currentStep} {t("properties.of")}{" "}
                      {steps.length}
                    </div>
                  </div>
                  
                  {/* Buttons stacked */}
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      <ChevronLeft
                        className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`}
                      />
                      {t("common.previous")}
                    </Button>

                    {currentStep === steps.length ? (
                      <Button
                        type="button"
                        onClick={handleFinalSubmit}
                        disabled={isLoading}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            {t("common.loading")}
                          </>
                        ) : (
                          <>
                            <Check className="h-4 w-4" />
                            {t("properties.saveProperty")}
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
                      >
                        {t("common.next")}
                        <ChevronRight
                          className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`}
                        />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Tablet/Desktop: Horizontal layout */}
                <div className="hidden sm:flex justify-between items-center gap-3 md:gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 min-w-[100px] md:min-w-[120px] flex-shrink-0"
                  >
                    <ChevronLeft
                      className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`}
                    />
                    <span className="hidden md:inline">{t("common.previous")}</span>
                    <span className="md:hidden">{t("common.previous")}</span>
                  </Button>

                  {/* Progress Indicator - Tablet/Desktop */}
                  <div className="flex-1 mx-3 md:mx-6 min-w-0">
                    <div className="flex items-center justify-center gap-1.5 md:gap-2">
                      {steps.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            index + 1 <= currentStep
                              ? "bg-blue-500 w-6 md:w-8"
                              : "bg-gray-200 w-2"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {currentStep === steps.length ? (
                    <Button
                      type="button"
                      onClick={handleFinalSubmit}
                      disabled={isLoading}
                      className="flex items-center gap-2 min-w-[100px] md:min-w-[120px] flex-shrink-0 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span className="hidden md:inline">{t("common.loading")}</span>
                          <span className="md:hidden">{t("common.loading")}</span>
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4" />
                          <span className="hidden md:inline">{t("properties.saveProperty")}</span>
                          <span className="md:hidden">{t("properties.saveProperty")}</span>
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 min-w-[100px] md:min-w-[120px] flex-shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
                    >
                      <span className="hidden md:inline">{t("common.next")}</span>
                      <span className="md:hidden">{t("common.next")}</span>
                      <ChevronRight
                        className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`}
                      />
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyPage;
