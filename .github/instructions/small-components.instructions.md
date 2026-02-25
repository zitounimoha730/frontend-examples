# Angular Component Size Rule

## Rule
Angular components MUST be small and focused.

## Requirements
- A single Angular component file must not exceed **50 lines of TypeScript code**
  (excluding imports and decorators).
- Each component should have **one clear responsibility**.
- Complex logic must be extracted into:
  - Services
  - Utility functions
  - Child components

## Guidance for AI Code Generation
When generating or refactoring Angular code:
- Split large components into smaller components.
- Prefer composition over large templates or controllers.
- If a component exceeds 20 lines, refactor automatically.

## Preferred Outcome
Many small, readable, testable components instead of large, monolithic ones.
