# 🎧 Audiophile E-Commerce Store

A fully responsive and accessible e-commerce web application for premium audio products, built with **Angular**. This project is a frontend clone of the Audiophile website challenge by [Frontend Mentor](https://www.frontendmentor.io/challenges/audiophile-ecommerce-website-C8cuSfBzxc), featuring modern design principles, modular architecture, and route-based modals.

---

## 🚀 Features

- ✅ Fully responsive across mobile, tablet, and desktop
- 🎨 UI built with SCSS and BEM-style organization
- 🧩 Modular components with standalone APIs
- 🛍️ Add to cart, update quantities, and checkout flow
- 🔐 Protected routes using Angular Route Guards
- 🧭 Route-based modal overlays for cart, checkout, and mobile menu
- 🧾 Order summary modal on successful checkout
- 📦 Supabase integration for authentication and profile data

---

## 🛠️ Tech Stack

| Technology     | Purpose                              |
|----------------|--------------------------------------|
| Angular        | SPA Framework                        |
| Angular Router | Navigation and route outlets         |
| SCSS           | Styling with variables and nesting   |
| Supabase       | Auth & Backend (Profiles, Cart)      |
| Signals        | State management and reactivity      |

---

## 📁 Project Structure

```bash
src/
├── app/
│   ├── components/      # Reusable components
│   ├── modals/          # Route-based modals (cart, checkout, menu)
│   ├── pages/           # Page views (home, products, profile, etc.)
│   ├── services/        # API and utility services
│   ├── guards/          # Route guards (e.g., authGuard)
│   └── app.routes.ts    # Lazy-loaded + named outlet routing


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0.

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
