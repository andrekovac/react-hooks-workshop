# `useSyncExternalStore`

Mainly for use of library authors, this API allows you to create a custom hook that **synchronously** reads from an external store.

## Example usage

1. [External library] `externalLibrary.ts`

    - Implements a function `createStore` which should be used to create a store for your App
    - Implements a custom hook (`useStore`) to access the store (this function returns `useSyncExternalStore`)

```ts
export const createStore = (
  initialState,
  { selectors: originalSelectors, effects: originalEffects }
) => {
    // ...
    const subscribe = (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    };
    // ...
    return { getState, setState, subscribe, effects, selectors };
};

export const useStore = (store, selector) =>
  useSyncExternalStore(
    store.subscribe,
    useCallback(() => {
      return selector(store.getState());
    }, [store, selector])
  );
```

1. [Your code] `store.ts`
   
   You create a store for your App via a provided `createStore` function

    ```ts
    import { createStore } from 'externalLibrary';

    export const store = createStore(
      initialState,
      selectors: {
        // ...
      },
      effects: {
        // ...
      }
    )
    ```

2. [Your code] `App.tsx`
   
   A component which uses the local store

```tsx
import { useStore } from 'externalLibrary';
import { store } from "./store";

const App = () => {
    const todos = useStore(store, (state) => {
        return state.jsonData;
    });
    // ...
}
```

This example is simplified from [this example I found on GitHub](https://github.com/jeffdrumgod/test-for-a-new-lib-with-usesyncexternalstore)

## Example of `useSyncExternalStore` parameters

*UNDER CONSTRUCTION*

```ts
const useSyncExternalStore = <T, S>(
  subscribe: (callback: () => void) => () => void,
  getSnapshot: () => T,
  getServerSnapshot?: () => T,
  config?: {
    isEqual?: (a: T, b: T) => boolean;
    getSnapshotBeforeUpdate?: (snapshot: T) => S;
    shouldInvalidate?: (prevSnapshot: S, nextSnapshot: S) => boolean;
  }
): T;
```

## Other example

- Using a rxjs `BehaviorSubject` as data source.
- Creating a selector with `createSelector` from `reselect` library.

```ts
// subscribe to changes of rxjs BehaviorSubject
const subscribe = (onStoreChange: () => void) => {
    const subscription = stateChanged.subscribe(onStoreChange);
    return () => subscription.unsubscribe();
};

// my own store via `useSyncExternalStore`
const useMyStore = ({
  data: { dataType = 'liveData', parameterNames, defaultValues },
  dataTransform = standardDataTransform,
}) => {
   const [selector, initialValues] = createParamsSelector({
        data: {
            dataType,
            parameterNames,
            defaultValues,
        },
        dataTransform,
    });

    return useSyncExternalStore(subscribe, () => {
      const comAPIData = stateChanged.getValue();

      if (comAPIData) {
          return selector(comAPIData);
      }
      return initialValues;
  });
}
```

Notes:

- `createParamsSelector` has the signature `createParamsSelector: ({ data, dataTransform }) => [Selector, InitialValues]`
- `stateChange` is defined as as rxjs BehaviorSubject

  ```ts
  import { BehaviorSubject } from 'rxjs';
  
  export const stateChanged = new BehaviorSubject<Data | null>(null);
  ```

  and data is send to subscribers via:

  ```ts
  stateChanged.next(data);
  ```

## History

- New in React 18
- It was originally called `useMutableSource`. Read about the change [here](https://github.com/reactwg/react-18/discussions/86).

## Further Links

- See [the section in the new React docs](https://beta-reactjs-org-git-you-might-not-fbopensource.vercel.app/learn/you-might-not-need-an-effect#subscribing-to-an-external-store)
- [related video](https://www.youtube.com/watch?v=oPfSC5bQPR8&t=694s)
