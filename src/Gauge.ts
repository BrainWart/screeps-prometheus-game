import { PrometheusObject, PrometheusType } from './PrometheusObject';

export class Gauge implements PrometheusObject {
  readonly promStat: PrometheusType = 'gauge';
  private name: string;
  private help: string | undefined;
  private value: number;

  public constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }

  public addHelp(help: string): void {
    this.help = help;
  }

  public getName(): string {
    return this.name;
  }
  public getValue(): number {
    return this.value;
  }
  public getHelp(): string | undefined {
    return this.help;
  }
}
