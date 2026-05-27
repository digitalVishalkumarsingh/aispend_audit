
# Architecture Documentation

## System Overview
StackSave follows a clean, scalable architecture with strong separation of concerns.

## Data Flow
1. User submits audit form at `/audit`
2. Data is processed by `audit-engine.ts` + `savings-calculator.ts`
3. Audit result is saved via `audit-service.ts`
4. User redirected to `/result/[id]`
5. AI summary generated using `ai-summary.ts`
6. Shareable link and OG image created

## Key Layers
- **UI Layer**: Server Components + Client Components (forms, result cards)
- **Business Logic**: `services/audit-engine.ts`, `pricing-rules.ts`, `recommendation-engine.ts`, `savings-calculator.ts`
- **Data Layer**: `services/database/audit-service.ts`
- **AI Layer**: `services/openai/` with client-side fallback
- **Sharing**: Custom `/api/share` route + `opengraph-image.tsx`

## Design Decisions
- No authentication required for core flow (max conversion)
- React 19 form handling with proper typing
- Feature-based folder structure
- Performance-first with Server Components