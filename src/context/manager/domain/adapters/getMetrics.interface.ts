import { MetricsInputDto } from '../dtos/metrics-input.dto';

export interface IGetMetrics {
  get(input: MetricsInputDto): Promise<any>;
}
