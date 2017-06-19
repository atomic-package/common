/**
 * Trigger View Class
 * @public
 * @param option
**/
let _created_trigger_num: number = 0;

export class Trigger {
  private callBackFunction: Function = () => {};

  constructor(
    public id: number,
    public className: string,
    public idName: string,
    public target: any,
    public node: any
  ) {
    this.id = this.createTriggerId();
  }

  /**
   * Static Function
   **/
  static fromData(data: any): Trigger {
    return new Trigger(
      0,
      data.className ? data.className : null,
      data.id ? data.id : null,
      data.dataset.apToggle ? data.dataset.apToggle : null,
      data ? data : null
    );
  }

  /**
   * Private Function
   **/
  private createTriggerId(): number {
    return ++_created_trigger_num;
  }

  public getItemNode() {
    return this.node;
  }
}

export default Trigger;
