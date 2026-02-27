# NgStateManagementDojo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.2.

# Angular State Evolution: Get/Set → Observer → BehaviorSubject → Signals

## The Path

### 1. Get/Set (not truly reactive)
- Angular re-reads values during change detection
- No notification mechanism
- Appears reactive, but is pull-based

### 2. Observer Pattern (manual push)
- Introduces subscribe / notify
- State changes push updates to components
- Requires manual unsubscribe

### 3. BehaviorSubject (RxJS Observer implementation)
- Same pattern, built-in and safe
- Use `.next()` to update state
- Use `async` pipe to avoid manual unsubscribe
- Supports async composition (`switchMap`, `combineLatest`, etc.)

### 4. Signals (Angular-native reactive state)
- No subscriptions needed for UI
- Read with `signal()`, write with `.set()` / `.update()`
- Use `computed()` for derived state
- Best fit for UI state

---

## Heuristics: When to use Signals vs BehaviorSubject

### Use Signals (default choice)
Best for:
- UI state
- Component and feature state
- Derived state
- HTTP-loaded state (set signal when response arrives)

Example:
```ts
http.get(...).subscribe(data => signal.set(data))
```

### Use BehaviorSubject / RxJS when you need stream logic

Best for:
- debounce, cancel, retry
- combining async sources
- websocket / realtime
- complex async pipelines

Example:
```ts
search$.pipe(
  debounceTime(300),
  switchMap(query => http.get(...))
)
```

Simple rule

Use Signals for state.
Use RxJS for streams.
Use both when needed: RxJS produces data, Signals store and expose it.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
# ng-duck-state-management-dojo


# When to Use Signals vs BehaviorSubject (Simple Scenarios)

This guide explains *when to use Signals vs RxJS BehaviorSubject* using simple, concrete stories.

---

# Scenario 1: Logged-in User Profile → Use Signals ✅

**Story:**  
When the app starts, you fetch the logged-in user once.

That user data is displayed:

- in the header (“Welcome, Dean”)
- in the settings page
- in a profile badge

This data is fetched once and then used as shared state.

**Why Signals:**  
This is simple state storage. You just need to store the current value and let the UI react.

There is no stream of rapid events or timing logic.

---

# Scenario 2: Search Box with Live API Calls → Use BehaviorSubject / RxJS ✅

**Story:**  
User types in a duck search box:

- types “m”
- types “ma”
- types “mal”

Each keystroke could trigger an API call.

You want to:

- wait until typing pauses
- cancel previous requests
- only show the latest result

This is a stream of events over time.

**Why BehaviorSubject / RxJS:**  
You need event orchestration like debouncing and cancellation.

This is not just storing state — it’s managing an event pipeline.

---

# Scenario 3: Selected Duck in the UI → Use Signals ✅

**Story:**  
User clicks a duck in a list.

That duck becomes the “selected duck”.

Multiple components display details of the selected duck.

**Why Signals:**  
This is shared UI state. You only need to store the current selection and react to changes.

No async event pipeline is needed.

---

# Scenario 4: Live Websocket Duck Updates → Use BehaviorSubject / RxJS ✅

**Story:**  
The server sends live duck updates continuously.

You need to:

- receive updates
- merge them with existing data
- handle reconnects or retries

This is a continuous stream of events.

**Why BehaviorSubject / RxJS:**  
This requires stream handling and event coordination, which RxJS is designed for.

---

# Scenario 5: Load Ducks Once and Display → Use Signals ✅

**Story:**  
The app loads a list of ducks once from an API.

You display them across multiple components.

Maybe you update them occasionally.

**Why Signals:**  
This is simple application state, not a stream of events.

Signals are ideal for storing and reacting to state.

---

# Core Mental Model

Use **Signals** when the question is:

> What is the current state?

Examples:
- current user
- selected duck
- loaded data
- UI state

Use **BehaviorSubject / RxJS** when the question is:

> How does state change over time due to events?

Examples:
- search input streams
- websocket updates
- debounced or cancelable requests
- combining async sources

---

# Simple Rule

**Signals = state**

**RxJS = events over time**