import { Builds } from './Builds';

export class Prefix extends Builds {
  private prefix: string;

  constructor(prefix: string) {
    super();

    this.prefix = prefix;
  }

  public getPrefix(): string {
    return this.prefix;
  }
}
