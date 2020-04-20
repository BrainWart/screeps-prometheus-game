export type PrometheusType = 'label' | 'gauge';

export interface PrometheusObject {
  promStat: PrometheusType;
}
