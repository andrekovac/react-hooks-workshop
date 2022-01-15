# Custom hook

## Split UI from business logic

Moving the functionality into a function, we get a custom hook: [**CodeSandBox**: Custom hook (JS)](https://codesandbox.io/s/fetch-movies-custom-hook-q5n98)

## Generalize custom hook

Generalize `useFetch`: Add `error` and re-invoke with `setUrl` function:

- Let's generalize the `useFetch` hook and allow new urls to be fetched with a function.
- [**CodeSandBox**: Result (JS)](https://codesandbox.io/s/fetch-data-generalized-custom-hook-jffu6)

- **Insight**: `setUrl` is basically a `doFetch`.
- **Question**: Why does hook not refetch?