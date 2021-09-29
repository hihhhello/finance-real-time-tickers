import _ from "lodash";

export class TickerItem {
  static propsToCamelCase(tickerData) {
    return Object.entries(tickerData).reduce(
      (prevProp, [key, value]) => ({
        ...prevProp,
        [_.camelCase(key)]: value,
      }),
      {}
    );
  }
}
