type InternalZipList<T> = {
  previous: T[];
  current: T;
  next: T[];
};

const partionListByIndex = <T>(list: T[], index: number): [T[], T[]] => {
  return list.reduce(
    (accumulator, currentValue, currentIndex) => {
      const [before, after] = accumulator;

      if (currentIndex < index) {
        return [[...before, currentValue], after];
      } else if (currentIndex > index) {
        return [before, [...after, currentValue]];
      } else {
        return accumulator;
      }
    },
    [[] as T[], [] as T[]]
  );
};

class ZipList<T> {
  static fromArray<T>(arr: T[]) {
    const [current, ...rest] = arr;
    return new ZipList<T>({
      previous: [],
      current,
      next: rest,
    });
  }

  private readonly zipList: InternalZipList<T>;

  private constructor(zipList: InternalZipList<T>) {
    this.zipList = zipList;
  }

  active(): T {
    return this.zipList.current;
  }

  isActive(item: T): Boolean {
    return this.zipList.current === item;
  }

  setActive(item: T): ZipList<T> {
    if (this.zipList.previous.includes(item)) {
      const [
        previousItemsBeforeActive,
        previousItemsAfterActive,
      ] = partionListByIndex(
        this.zipList.previous,
        this.zipList.previous.findIndex(i => i === item)
      );

      return new ZipList({
        previous: [...previousItemsBeforeActive],
        current: item,
        next: [
          ...previousItemsAfterActive,
          this.zipList.current,
          ...this.zipList.next,
        ],
      });
    } else if (this.zipList.next.includes(item)) {
      const [nextItemsBeforeActive, nextItemsAfterActive] = partionListByIndex(
        this.zipList.next,
        this.zipList.next.findIndex(i => i === item)
      );

      return new ZipList({
        previous: [
          ...this.zipList.previous,
          this.zipList.current,
          ...nextItemsBeforeActive,
        ],
        current: item,
        next: [...nextItemsAfterActive],
      });
    } else {
      return this;
    }
  }

  asArray(): T[] {
    return [
      ...this.zipList.previous,
      this.zipList.current,
      ...this.zipList.next,
    ];
  }
}

export default ZipList;
