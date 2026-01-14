# Design Document: Property Form UI Improvements

## Overview

This design addresses UI/UX improvements for the Add Property form by optimizing input field sizing, enhancing dropdown placeholders with validation, and improving number input styling. The solution focuses on CSS modifications, component prop adjustments, and form validation enhancements without requiring major architectural changes.

## Architecture

The improvements will be implemented across existing form components:

1. **Select Components** - Add default placeholder values and validation
2. **Number Inputs** - Convert to text inputs with numeric validation and custom styling
3. **Input Styling** - Adjust CSS classes for appropriate field widths
4. **Form Validation** - Enhance validation to reject placeholder values

## Components and Interfaces

### Modified Components

#### 1. TypeAndListingSelects Component

- Add disabled placeholder option to Select components
- Update validation to ensure placeholder is not selected
- Maintain consistent SelectTrigger height

#### 2. PropertySpecsSection Component

- Add disabled placeholder options for condition and finish type selects
- Convert number inputs to text inputs with `inputMode="numeric"`
- Add custom width classes for number inputs
- Implement numeric-only input validation

#### 3. PriceAndArea Component

- Keep as number inputs but add custom width constraints
- Ensure proper padding and spacing

#### 4. Input Component (shadcn/ui)

- Add CSS to hide number input spinners
- Create size variants for different input types

### Component Changes

```typescript
// Select with non-submittable placeholder
<Select
  onValueChange={(value) => field.onChange(Number(value))}
  value={field.value?.toString() || ""}
>
  <SelectTrigger className="min-h-[40px]">
    <SelectValue placeholder={t("properties.selectOption")} />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="" disabled>
      {t("properties.selectOption")}
    </SelectItem>
    {options?.map((item) => (
      <SelectItem key={item.id} value={item.id.toString()}>
        {isRTL ? item.nameAr : item.nameEn}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

// Number input as text with numeric validation
<Input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  className="w-32 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
  onChange={(e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = value;
    field.onChange(value ? Number(value) : 0);
  }}
/>
```

## Data Models

No new data models required. Existing form data types remain unchanged:

```typescript
interface CreatePropertyFormData {
  // ... existing fields
  propertyTypeId: number;
  listingTypeId: number;
  conditionId: number;
  finishTypeId: number;
  roomsCount?: number;
  bathroomsCount?: number;
  // ... etc
}
```

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Dropdown placeholder validation

_For any_ dropdown field in an unselected state, form validation should reject the submission and display an error message.
**Validates: Requirements 1.2, 5.1**

### Property 2: Numeric input filtering

_For any_ number input field, when non-numeric characters are entered, the input should filter them out and only accept digits.
**Validates: Requirements 2.3**

### Property 3: Number input conversion

_For any_ number input field with valid numeric text, form submission should convert the text value to a number type.
**Validates: Requirements 2.4**

### Property 4: Layout stability

_For any_ dropdown field, selecting an option should not change the component height or cause visible layout shift.
**Validates: Requirements 4.2**

### Property 5: Input width consistency

_For any_ text input field, the width should be sufficient to display typical input values without horizontal scrolling.
**Validates: Requirements 3.2**

## Error Handling

### Validation Errors

1. **Unselected Dropdown**: Display field-specific error message when user attempts to submit with placeholder selected
2. **Invalid Numeric Input**: Prevent non-numeric characters from being entered (client-side filtering)
3. **Empty Required Fields**: Existing validation continues to work

### Error Messages

```typescript
// Translation keys to add
{
  "properties.validation.selectRequired": "Please select an option",
  "properties.validation.numericOnly": "Only numbers are allowed",
  "properties.selectOption": "Select an option"
}
```

## Testing Strategy

### Unit Tests

1. **Dropdown Placeholder Test**: Verify placeholder option is disabled and not submittable
2. **Numeric Input Filter Test**: Test that non-numeric characters are filtered from number inputs
3. **Form Validation Test**: Verify form validation rejects unselected dropdowns
4. **Type Conversion Test**: Verify numeric text inputs are converted to numbers on submission

### Property-Based Tests

Property-based tests will validate universal behaviors across all form inputs:

1. **Property Test 1**: For any dropdown with placeholder, validation should fail until a real option is selected
2. **Property Test 2**: For any numeric input, entering any combination of non-numeric characters should result in an empty or numeric-only value
3. **Property Test 3**: For any valid numeric string in a number input, form submission should produce a valid number type
4. **Property Test 4**: For any dropdown state change, the component height should remain constant

### Manual Testing Checklist

- [ ] Verify dropdowns show "Select an option" placeholder
- [ ] Verify placeholder cannot be submitted
- [ ] Verify number inputs don't show up/down arrows
- [ ] Verify number inputs are appropriately sized (smaller than text inputs)
- [ ] Verify text inputs are wide enough for typical content
- [ ] Verify no layout shift when selecting dropdown options
- [ ] Test in both RTL and LTR modes
- [ ] Test form submission with all field types

## Implementation Notes

### CSS Classes for Number Inputs

```css
/* Hide number input spinners */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Or use Tailwind classes */
.no-spinner {
  @apply [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none;
}
```

### Width Classes

- **Number inputs**: `w-24` or `w-32` (96px or 128px)
- **Text inputs**: `w-full` (default, responsive)
- **Price/Area inputs**: `w-full` (larger numbers need more space)

### Form Validation Enhancement

Update validation schema to check for empty string or undefined values in dropdown fields:

```typescript
propertyTypeId: z.number().min(1, t("properties.validation.selectRequired")),
listingTypeId: z.number().min(1, t("properties.validation.selectRequired")),
conditionId: z.number().min(1, t("properties.validation.selectRequired")),
finishTypeId: z.number().min(1, t("properties.validation.selectRequired")),
```
