export type PrometheusType = 'label' | 'gauge' | 'prefix';

export interface PrometheusObject {
  promStat: PrometheusType;
}

class Buildable {
  private children: PrometheusObject[] = [];

  public add(c: new (...args: any[]) => Prefix, prefix: string): Prefix;
  public add(c: new (...args: any[]) => Label, label: string, value: string): Label;
  public add(c: new (...args: any[]) => Gauge, name: string, value: number, help?: string): Gauge;
  public add<T extends PrometheusObject>(c: new (...args: any[]) => T, arg0?: any, arg1?: any, arg2?: any): T {
    const child: T = new c(arg0, arg1, arg2);
    this.children.push(child);
    return child;
  }

  public getChildren(): PrometheusObject[] {
    return [...this.children];
  }
}

export class Gauge implements PrometheusObject {
  readonly promStat: PrometheusType = 'gauge';
  public constructor(public readonly name: string, public readonly value: number, public readonly help?: string) {}
}

export class Label extends Buildable implements PrometheusObject {
  readonly promStat: PrometheusType = 'label';
  public constructor(public readonly label: string, public readonly value: string) {
    super();
  }
}

export class Prefix extends Buildable implements PrometheusObject {
  readonly promStat: PrometheusType = 'prefix';
  public constructor(public readonly prefix: string) {
    super();
  }
}

type MemoryGauge = {
  promStat: 'gauge';
  value: number;
  help: string | undefined;
};

type MemoryLabel = {
  promStat: 'label';
  label: string;
  value: PromDict;
};

type MemoryObj = MemoryGauge | MemoryLabel;

type PromDict = { [key: string]: MemoryObj | PromDict };

function getMemoryModel(builder: { getChildren: () => PrometheusObject[] }): PromDict {
  const data: PromDict = {};

  for (const obj of builder.getChildren()) {
    if (obj instanceof Gauge) {
      data[obj.name] = {
        promStat: 'gauge',
        value: obj.value,
        help: obj.help,
      } as MemoryGauge;
    } else if (obj instanceof Label) {
      data[obj.value] = {
        promStat: 'label',
        label: obj.label,
        value: getMemoryModel(obj),
      } as MemoryLabel;
    } else if (obj instanceof Prefix) {
      data[obj.prefix] = getMemoryModel(obj);
    }
  }

  return data;
}

export class ScreepsPrometheus extends Buildable {
  public build(): PromDict {
    return getMemoryModel(this);
  }
}
