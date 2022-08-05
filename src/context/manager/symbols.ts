const Symbols = {
  /** Application Services*/
  HotelInsightsApplicationService: Symbol.for(
    'HotelInsightsApplicationService',
  ),
  InsightsApplicationService: Symbol.for('InsightsApplicationService'),
  IndexOfQueryBuilder: Symbol.for('IndexOfQueryBuilder'),

  /** Domain Interfaces */
  IGetRoomsHotels: Symbol.for('IGetRoomsHotels'),
  ICacheData: Symbol.for('ICacheData'),

  /** Infrastrucure */
  CacheService: Symbol.for('CacheService'),
  UserService: Symbol.for('UserService'),
  UserResolver: Symbol.for('UserResolver'),
  ProviderService: Symbol.for('ProviderService'),
  GetRoomsByRoomTypeService: Symbol.for('GetRoomsByRoomTypeService'),
  InsightsService: Symbol.for('InsightsService'),
  MetricsService: Symbol.for('MetricsService'),
  IGetInsights: Symbol.for('IGetInsights'),
  IGetMetrics: Symbol.for('IGetMetrics'),
  PeriodsBuilder: Symbol.for('PeriodsBuilder'),
};

export default Symbols;
