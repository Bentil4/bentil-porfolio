import { portfolio } from './portfolio.ts'
import type { PortfolioConfig } from './types.ts'

/** Typed view of the portfolio config (optional fields stay optional). */
export const config: PortfolioConfig = portfolio
export type * from './types.ts'
