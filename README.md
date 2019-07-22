# Zip List

A super simple TypeScript implementation of a basic zip list from the ["Making Impossible States Impossible"](https://www.youtube.com/watch?v=IcgmSRJHu_8) talk at Elm Conf by Richard Feldman.

Used to model a list of data where one item is active. The underlying data structure is:

```js
{ previous: [1], current: 2, next: [3] }
```

This module provides a nice wrapper around that data structure with a nice API.

## Install

```
npm install zip-list
yarn add zip-list
```

## API

Construct a zip list using the static `fromArray` method:

```js
import ZipList from 'zip-list';

const zip = ZipList.fromArray([1, 2, 3]);
```

This will set the first item (`1`) as active.

If you're using TypeScript, you can pass the type through as a generic to `fromArray`:

```ts
interface MyObj {
  name: string;
}

const zip = ZipList.fromArray<MyObj>([{ name: 'alice' }, { name: 'bob' }]);
```

Fetch and check if an item is active:

```js
zip.active() === 1;
zip.isActive(2) === false;
```

Get the data as an array (useful for rendering):

```js
zip.asArray() === [1, 2, 3];
```

And update the active value. This never mutates but returns a new zip:

```js
const newZip = zip.setActive(2);
```
