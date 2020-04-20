import { Builds, Buildable } from './Builds';
import { Gauge } from './Gauge';
import { Label } from './Label';
import { Prefix } from './Prefix';
import { PrometheusObject } from './PrometheusObject';

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

function getMemoryModel(builder: Builds): PromDict {
  const data: PromDict = {};

  for (const obj of builder.getChildren()) {
    if (obj instanceof Gauge) {
      data[obj.getName()] = {
        value: obj.getValue(),
        help: obj.getHelp(),
      } as MemoryGauge;
    } else if (obj instanceof Label) {
      data[obj.getLabel()] = {
        label: obj.getValue(),
        value: getMemoryModel(obj),
      } as MemoryLabel;
    } else if (obj instanceof Prefix) {
      data[obj.getPrefix()] = getMemoryModel(obj);
    }
  }

  return data;
}

export class ScreepsPrometheus extends Builds {
  public build(): PromDict {
    return getMemoryModel(this);
  }
}
