import { z } from 'zod';

// The canonical SpendSentinel CSV format based on the PRD
export const CanonicalRowSchema = z.object({
  usage_date: z.string().date(), // Required
  service: z.string().min(1), // Required
  cost: z.coerce.number(), // Required
  region: z.string().optional().default('global'),
  usage_type: z.string().optional(),
  resource_id: z.string().optional(),
  usage_quantity: z.coerce.number().optional(),
  account_id: z.string().optional(),
  tag_env: z.string().optional(),
  tag_team: z.string().optional(),
});

export type CanonicalRow = z.infer<typeof CanonicalRowSchema>;

// Column mapping dictionaries for different providers
export const COLUMN_MAPS = {
  aws_cur: {
    line_item_usage_start_date: 'usage_date',
    product_servicename: 'service',
    product_region: 'region',
    line_item_unblended_cost: 'cost',
    line_item_resource_id: 'resource_id',
    line_item_usage_type: 'usage_type',
    line_item_usage_amount: 'usage_quantity',
    line_item_usage_account_id: 'account_id',
    'resource_tags_user_env': 'tag_env',
    'resource_tags_user_team': 'tag_team',
  },
  focus: {
    ChargePeriodStart: 'usage_date',
    ServiceName: 'service',
    RegionId: 'region',
    BilledCost: 'cost',
    ResourceId: 'resource_id',
    UsageType: 'usage_type',
    PricingQuantity: 'usage_quantity',
    SubAccountId: 'account_id',
    Tags_env: 'tag_env',
    Tags_team: 'tag_team',
  },
  canonical: {
    usage_date: 'usage_date',
    service: 'service',
    region: 'region',
    cost: 'cost',
    resource_id: 'resource_id',
    usage_type: 'usage_type',
    usage_quantity: 'usage_quantity',
    account_id: 'account_id',
    tag_env: 'tag_env',
    tag_team: 'tag_team',
  }
};