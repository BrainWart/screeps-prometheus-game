import { Gauge } from './Gauge';
import { Label } from './Label';
import { Prefix } from './Prefix';

export type Buildable = Gauge | Label | Prefix;

export abstract class Builds {
  private children: Buildable[] = [];

  public addLabel(label: string, value: string): Label {
    const newChild = new Label(label, value);
    this.children.unshift(newChild);
    return newChild;
  }

  public addGauge(name: string, value: number): Gauge {
    const newChild = new Gauge(name, value);
    this.children.unshift(newChild);
    return newChild;
  }

  public addPrefix(prefix: string): Prefix {
    const newChild = new Prefix(prefix);
    this.children.unshift(newChild);
    return newChild;
  }

  public getChildren(): Buildable[] {
    return this.children;
  }
}
