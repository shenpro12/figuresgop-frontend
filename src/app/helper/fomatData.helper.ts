export class FomatDataHelper {
  setFilter(arr: Array<string>, value: string, checked: boolean) {
    if (checked && !arr.includes(value)) {
      arr.push(value);
    } else {
      arr.map((item, index) => {
        if (item == value) {
          arr.splice(index, 1);
        }
      });
    }
  }
}
