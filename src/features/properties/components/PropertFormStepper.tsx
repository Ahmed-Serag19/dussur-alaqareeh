import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useLanguage from "@/hooks/useLanguage";

interface Step {
  id: string;
  title: string;
  component: React.ReactNode;
}

interface PropertyFormStepperProps {
  steps: Step[];
  onSubmit: () => void;
  isLoading: boolean;
}

const PropertyFormStepper = ({
  steps,
  onSubmit,
  isLoading,
}: PropertyFormStepperProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { isRTL, t } = useLanguage();

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="h-screen flex flex-col">
      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {steps[currentStep].title}
            </h2>
            <span className="text-sm text-gray-500">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-hidden bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          {steps[currentStep].component}
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            {t("common.previous") || "Previous"}
          </Button>

          {isLastStep ? (
            <Button
              onClick={onSubmit}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? t("common.loading") : t("properties.saveProperty")}
            </Button>
          ) : (
            <Button onClick={nextStep} className="flex items-center gap-2">
              {t("common.next") || "Next"}
              <ChevronRight
                className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`}
              />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyFormStepper;
