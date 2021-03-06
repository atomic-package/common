/*
 * Author: Daisuke Takayama
 */

interface Type {
  id?: number;
  className?: string;
  idName?: string;
  length?: number;
}

/**
 * AtomicPackage Common Model Class
 * @public
 **/
export class Model {
  constructor(
  ) {
  }

  /**
   * Private Static Function
   * @privateStatic
   **/
  private static isArray(data): boolean {
    return Array.isArray(data) || typeof data !== 'object' && /^\[(\d|[^[|,])/.test(data);
  }

  private static isObject(data): boolean {
    let  type = typeof data;

    return type === 'function' || type === 'object' && !!data;
  }

  private static getSearchItems(dataList: any[], type: any) {
    if (!type) return;

    let key: string = Object.keys(type)[0];

    if(type === 'all') {
      return dataList;

    } else {
      return dataList.filter((data: any) => {
        return (data[key] == type[key]);
      });
    }
  }

  private static stringToNumber(data: any): number {
    if(parseInt(data, 10) && /^\d|(^\-)/.test(data)) {
      return parseInt(data, 10);
    } else {
      return data;
    }
  }

  private static stringToObjectCheck(data: string): boolean {
    return /{.*:.*}/.test(data);
  }

  private static stringToJson(data: string) {
    return JSON.parse(
      data
        .replace(/([\$\w]+)\s*:/g, (_, $1) => { return '"' + $1 + '":'; })
        .replace(/'([^']+)'/g, (_, $1) => { return '"' + $1 + '"'; })
    );
  }

  private static stringToArray(data: any): any {
    if(typeof data === 'string') {
      let splitList: any = data.replace(/^\[/g, '').replace(/\s+/g, '').replace(/\]$/g, '').split(","),
          newSplitList = [];

      // Object Array
      if(this.stringToObjectCheck(splitList)) {
        splitList.forEach((item: any) => {
          if(this.stringToObjectCheck(item)) {
            newSplitList.push(this.stringToJson(item.trim()));
          } else {
            newSplitList.push(this.stringToNumber(item));
          }
        });

        return newSplitList;
      } else {
        // Number Array
        splitList.forEach((item: any) => {
          newSplitList.push(this.stringToNumber(item));
        });

        return newSplitList;
      }
    } else {
      return data;
    }
  }

  private static checkType(data: any): Type {
    switch(typeof data) {
      case 'object':
        return data;

      case 'number':
        return { id: data };

      case 'string':
        if(/^#/.test(data)) {
          return { idName: data.substr(1) };
        } else if(/^\./.test(data)) {
          return { className: data.substr(1) };
        } else if(/all/gi.test(data)) {
          return 'all';
        } else if(this.stringToNumber(data)) {
          return { id: data };
        }
        break;
    }
  }

  /**
   * Public Static Function
   **/
  public static search(dataList: any[], type: any): any[] {
    if(this.isArray(type)) {
      let keys = [],
          searchItems = [],
          resultItem = [];

      this.stringToArray(type).forEach((item: any) => {
        keys.push(this.checkType(item));
      });

      keys.forEach((key: any) => {
        searchItems = this.getSearchItems(dataList, key);

        searchItems.forEach((item: any) => {
          resultItem.push(item);
        });
      });

      return resultItem;
    } else {
      return this.getSearchItems(dataList, this.checkType(type));
    }
  }

  public static uniq(stringArr: any[]): any[] {
    let newArr: any[] = stringArr.filter((x, i, self) => {
      return self.indexOf(x) === i;
    });

    return newArr;
  }

  public static flattenArray(array) {
    return [].concat.apply(array);
  }

  // createTriggerModel
  public static createTriggerModel(triggerView: any[], triggerClass) {
    let triggerList = [];

    triggerView.forEach((trigger) => {
      triggerList.push(triggerClass.fromData(trigger));
    });

    return triggerList;
  }

  // createTargetModel
  public static createTargetModel(targetView: any[], targetClass) {
    let targetList = [];

    targetView.forEach((target) => {
      targetList.push(targetClass.fromData(target));
    });

    return targetList;
  }


  public static setTriggerTargetId(triggerList, targetList) {
    for(var i: number = 0; i < triggerList.length; i++) {
      triggerList[i].setTargetId(targetList);
    }
  }
}

export default Model;
