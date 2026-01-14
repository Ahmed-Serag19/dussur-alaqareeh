# Implementation Plan: Property Form UI Improvements

## Overview

This implementation plan breaks down the UI/UX improvements for the Add Property form into discrete coding tasks. Each task focuses on specific components and builds incrementally to ensure all changes integrate smoothly.

## Tasks

- [x] 1. Add CSS utilities for number input styling

  - Add Tailwind classes to hide number input spinners in global CSS or component
  - Create reusable width classes for different input types
  - _Requirements: 2.2_

- [x] 2. Update Select components with non-submittable placeholders

  - [x] 2.1 Update TypeAndListingSelects component

    - Add disabled placeholder option to property type and listing type selects
    - Ensure SelectTrigger has consistent min-height
    - Update placeholder text to use translation keys
    - _Requirements: 1.1, 1.3, 4.1_

  - [x] 2.2 Update PropertySpecsSection select components

    - Add disabled placeholder option to condition and finish type selects
    - Ensure consistent SelectTrigger styling
    - _Requirements: 1.1, 1.3, 4.1_

  - [x] 2.3 Update LocationSection select components (if applicable)
    - Add disabled placeholder options to region, city, and neighborhood selects
    - _Requirements: 1.1, 1.3_

- [x] 3. Convert number inputs to text inputs with numeric validation

  - [x] 3.1 Update PropertySpecsSection number inputs

    - Convert roomsCount, bathroomsCount, livingroomsCount, floorsCount, buildingAge to text inputs
    - Add `inputMode="numeric"` and `pattern="[0-9]*"`
    - Implement onChange handler to filter non-numeric characters
    - Add appropriate width classes (w-24 or w-32)
    - Add CSS classes to hide spinners
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [x] 3.2 Update PriceAndArea component
    - Keep type="number" but add custom width constraints for better sizing
    - Add CSS to hide spinner arrows
    - Ensure proper padding
    - _Requirements: 2.2, 2.5_

- [ ] 4. Enhance form validation for dropdown placeholders

  - [x] 4.1 Update form validation schema

    - Ensure dropdown fields validate that a real option is selected (not placeholder)
    - Add validation to check for values greater than 0 or non-empty strings
    - _Requirements: 1.2, 5.1, 5.2_

  - [x] 4.2 Add translation keys for validation messages
    - Add "properties.validation.selectRequired" translation
    - Add "properties.selectOption" translation for placeholder text
    - _Requirements: 5.2_

- [x] 5. Optimize text input widths

  - Review and adjust text input components (TitleInput, DescriptionInput, etc.)
  - Ensure sufficient width and padding for typical input values
  - Test with both RTL and LTR layouts
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 6. Checkpoint - Test all form inputs
  - Verify dropdowns show proper placeholders and cannot submit placeholder values
  - Verify number inputs accept only numeric characters
  - Verify number inputs are appropriately sized
  - Verify text inputs display content without truncation
  - Verify no layout shifts when selecting dropdown options
  - Test in both RTL and LTR modes
  - Ensure all tests pass, ask the user if questions arise

## Notes

- All tasks involve modifying existing components without architectural changes
- Focus on CSS styling, component props, and validation logic
- Maintain backward compatibility with existing form data structure
- Test thoroughly in both RTL and LTR layouts
- Ensure responsive behavior on mobile and desktop
