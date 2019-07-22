import ZipList from '../src/index';

describe('ZipList', () => {
  it('can be initialised from an array', () => {
    const zip = ZipList.fromArray([1, 2, 3]);
    expect(zip.active()).toEqual(1);
  });

  it('returns the entire array via asArray', () => {
    const zip = ZipList.fromArray([1, 2, 3]);
    expect(zip.asArray()).toEqual([1, 2, 3]);
  });

  it('can tell you if a given item is active', () => {
    const zip = ZipList.fromArray([1, 2, 3]);
    expect(zip.isActive(1)).toEqual(true);
    expect(zip.isActive(2)).toEqual(false);
  });

  describe('setting the new active item', () => {
    it('updates the properties accordingly', () => {
      const zip = ZipList.fromArray([1, 2, 3]);
      const newZip = zip.setActive(2);
      expect(newZip.isActive(1)).toEqual(false);
      expect(newZip.isActive(2)).toEqual(true);
    });
  });
});
