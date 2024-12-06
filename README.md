# Mantine Vite template

##### NOTE: need node version > 20 to use

## Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

## npm scripts

## Build and dev scripts

- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `test` – runs vitest tests
- `test:watch` – starts vitest watch
- `test:full` – runs `vitest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `prettier:write` – formats all files with Prettier

### React-router V7

[Router - v7 ](https://reactrouter.com/home)

[Router - v6 ](https://reactrouter.com/6.28.0/start/overview)

#### 1. Setup

There are two ways to setup routes:

```js
// you can find this in Router.tsx file
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} id="user-detail" loader={userLoader}>
      <Route index element={<HomePage />} />
      <Route path="work" errorElement={<ErrorPage />}>
        <Route index element={<WorkPage />} loader={itemsLoader} />
        <Route path=":id" element={<ItemPage />} loader={itemLoader} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
```

or

```js
const routerX = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    id: "use-detail",
    loader: userLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "work",
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <WorkPage />,
            loader: itemsLoader,
          },
          {
            path: ":id",
            element: <ItemPage />,
            loader: itemLoader,
          },
        ],
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
```

then in App.tsx file

```js
import { RouterProvider } from "react-router";
import { router } from "@/Router";

export default function App() {
  return (
    <React.StrictMode>
      <MantineProvider theme={theme}>
        <Provider store={store}>
          {/* this is important */}
          <RouterProvider router={router} />
        </Provider>
      </MantineProvider>
    </React.StrictMode>
  );
}
```

#### Absolute nad relative path

This is very important if you are using `Link` and `navigate` hook

```ts
// your current route is https//localhost:3000/work

// if you use note that id must be string:
<Link to={id}>
navigate(id)
// this will append id to current route and you will get /work/id

// if you use
<Link to={`/${id}`}>
navigate(`/${id}`)
// this will make https//localhost:3000/id

```

#### Get route loading state

```js
export default function HomePage() {
  const navigation = useNavigation();

  // This loader will be shown on route start transition (navigation to other route)
  if (navigation.state === "loading") {
    return <Loader />;
  }
  return <Welcome />;
}
```

you can use this hook `const navigation = useNavigation();` inside of the component

#### Get route error state

```js
// You can find usage in file ErrorPage.tsx
const error = useRouteError() as { status: number; data: string };

// as { status: number; data: string } This type will depend on type that you throw in loader will show example latter

// Add errorElement to route

<Route path="work" errorElement={<ErrorPage />}>
```

#### Work with route loaders

##### Example with global data shared with all routes that are on same level or child of route that use this loader

1. Create apiSlice with RTKQuery example in `globalApiSlice.ts` file

```js
// This is the normal api call setup with RTKQuery
export const globalApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, {}>({
      query: () => '/users/1',
    }),
  }),
});

export const { useGetUserQuery } = globalApiSlice;

// This is the function that we will use in loader on route level.
// Function is the same but loader can not use hooks so we need to make it as a normal function
export const getUserLoader = async () => {
   // To dispatch a action you need to use store
  const { data, isError, error } = await store.dispatch(
    // initiate function is the query function and can get same parameters, will show how to pass parameters latter
    globalApiSlice.endpoints.getUser.initiate({})
  );

  if (isError) {
    const { status } = error as { status: string };
    // Throw error ad Response this will be catch in errorElement on route level
    throw new Response(JSON.stringify({ message: 'Fail to fetch user!' }), {
      status: Number(status),
    });
  }

  return data;
};
```

2. Add loader to route

In the file `HomePage.tsx` add this (we are adding this to HomePage because it is index page of the root element):

```js
export function userLoader() {
  return getUserLoader();
}
```

3. Now in route register that loader

```js
<Route path="/" element={<Layout />} id="user-detail" loader={userLoader}>
```

To access this data in other routes you need to specify id. This id can be anything but must be unique for every route.

4. How to consume this data

In the component that is on same level or some childe component add:

```ts
import { useRouteLoaderData } from "react-router";

// useRouteLoaderData is generic function so you can pass the type.
const user = useRouteLoaderData<User>("user-detail");
```

5. Consuming data from parent component or first loader that is in route tree

```js
// Register loader
<Route path=":id" element={<ItemPage />} loader={itemLoader} />
```

```ts
// in component
// useLoaderData is generic function so you can pass the type.
const item = useLoaderData<Todo>();
```

6. Important

If you use `useLoaderData` in child component it will search for the first parent or same level route that have register loader on it.
If you use `useRouteLoaderData` this can target any route that is on same level or above in the tree. This is the reason why `id` is needed

#### Reading data from loader

```ts
export function itemsLoader({ params, request }: LoaderFunctionArgs) {
  // Reading param from route
  // <Route path=":id" element={<ItemPage />} loader={itemLoader} />
  const { id } = params; // it will be the same name what you add to path

  // Reading search params from route
  // if you navigate to page like /todos?page=1
  // you can log request and see more properties that are set
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get("page");
  return getPaginatedTodosLoader({ page: Number(page || 1) });
}
```

#### Adding view transition

view transition is the css that you can apply to route when is entered or leave.  
you can add view transition to all elements and hooks that are used for navigation

```js
// add to navigate hook
const navigation = useNavigation();
navigate(`/work/${id}`, { viewTransition: true });

// add to Link and NavLink
<NavLink viewTransition />;
<Link viewTransition />;
```

#### Block leaving page

```js
// in the component add
const blocker = useBlocker(
  ({ currentLocation, nextLocation }) =>
    currentLocation.pathname !== nextLocation.pathname
);

<Modal opened={blocker.state === "blocked"}>
  <Title>Are you sure you want to leave?</Title>

  <Group my="xl" grow>
    <Button onClick={() => blocker?.proceed?.()}>Proceed</Button>
    <Button onClick={() => blocker?.reset?.()} variant="light">
      Cancel
    </Button>
  </Group>
</Modal>;
```
