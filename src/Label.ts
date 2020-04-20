import { PrometheusObject, PrometheusType } from './PrometheusObject';
import { Builds } from './Builds';

export class Label extends Builds implements PrometheusObject {
  readonly promStat: PrometheusType = 'label';
  private label: string;
  private value: string;

  public constructor(label: string, value: string) {
    super();

    this.label = label;
    this.value = value;
  }

  public getLabel(): string {
    return this.label;
  }
  public getValue(): string {
    return this.value;
  }
}
