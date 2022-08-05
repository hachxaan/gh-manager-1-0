import { roomType } from '../../infrastructure/graphql/dtos/insights.dto';
import { InsightsInputDto } from '../dtos/insights-input.dto';

export interface IGetInsights {
  get(input: InsightsInputDto): Promise<[roomType]>;
}
