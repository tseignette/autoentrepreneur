# Angular boilerplate
Angular 10 boilerplate with [Spectre.css](https://picturepan2.github.io/spectre), i18n, static prerendering and some common resources.

## Getting started
`npm install` is obviously a good start. After that, you can run:
- `npm start` to start the project locally on [http://localhost:4200]() (accessible through local network)
- `npm run start:fr` does the same using the French locale
- `npm lint` to lint (the default configuration has not been modified)
- `npm run extract` to extract the source language file in `src/locale`
- `npm run build` to build for production, files are generated in `dist/angular-boilerplate/browser`
- `npm run prerender` does the same but it also prerenders routes defined in the `prerender` configuration in `angular.json`

## Features
### Styling
[Spectre.css](https://picturepan2.github.io/spectre), a lightweight CSS framework, is included with its set of pure CSS icons [Icons.css](https://picturepan2.github.io/icons.css).

### i18n
i18n is done with the native package. It is currently configured to be in English in the source code and to have a French translation. The exact configuration is detailed below.

### Common resources
#### Directives
- `AutofocusDirective`: dynamically focuses an element

#### Pipes
- `ConcatPipe`
- `ForObjectPipe`: iterates through the keys of an object
- `JoinPipe`
- `LastElementPipe`: returns the last element of an array
- `SplitPipe`
- `ToFixedPipe`

## Structure
### @core
`CoreModule` is supposed to contain global services and models. There are a few other useful files:
- `core.constants.ts` to store application constants (not to be confused with `environment.ts`)
- `core.utils.ts` to store simple functions you want to be able to use everywhere

### @theme
`ThemeModule` is supposed to contain global resources which can be used in templates (components, directives, pipes, etc.). You can also find a folder named `styles` containing the following files:
- `custom-spectre.css.scss` imports and configures Spectre.css
- `main.scss` defines global styles
- `variables.scss` stores global SCSS variables

### @modules
This is supposed to contain modules which are likely to be imported in various places in the application.

## Configuration
The project has been initialized with **Angular CLI** and then modified.

### Debugging
``.vscode/launch.json`` allows to attach the debugger to **Chrome**.

### i18n
i18n has been configured like this:
- the source code is in English and there is a French translation
- language files are stored in `src/locale`
- the build command builds all the locales configured
- the base HREF is empty for the source code language and set as the language code for the translations
- a missing translation throws an error and stops the build

### Routing
Nonexistent routes are redirected to home and scroll position restoration is enabled.
