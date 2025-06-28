# Component Library

A modern, reusable React component library built for rapid development and beautiful UIs. This library provides a growing set of accessible, customizable components for your next project.

---

## 🚀 Project Summary

This project is a modular, production-ready React component library featuring:

- **Atomic design**: Atoms, Molecules, and Organisms for scalable UI architecture.
- **Accessibility**: Keyboard navigation, ARIA support, and focus management.
- **Customizability**: Built with Tailwind CSS for easy theming and rapid prototyping.
- **Developer Experience**: Live documentation and isolated component development with Storybook.
- **Robust Testing**: Comprehensive unit and integration tests using Vitest and Testing Library.

---

## 🛠️ Stack Used

- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Vite** (build tool)
- **Storybook** (component explorer & docs)
- **Vitest** (unit & integration testing)
- **Testing Library** (React DOM testing)

---

## 📦 Available Components

### Atoms
- **Button**: Primary, secondary, and icon buttons.
- **Input**: Text input with validation and error states.
- **Avatar**: User avatar with fallback.

### Molecules
- **Card**: Flexible card container.
- **Dropdown**: Accessible, searchable dropdown/select.
- **Modal**: Dialog/modal with focus trap.
- **Toast**: Toast notifications with context provider.

### Organisms
- **Section**: Layout section wrapper.
- **Footer**: Responsive footer navigation.
- **Navbar**: Top navigation bar.

---

## 🖥️ Getting Started

### 1. **Install dependencies**
```bash
npm install
```

### 2. **Run the project (Storybook)**
```bash
npm run storybook
```
Storybook will start at [http://localhost:6006](http://localhost:6006) with live component previews and documentation.

> **Note:** If you want to add custom documentation pages, create `.mdx` files in your `src` directory. Storybook will automatically pick them up.

### 3. **Build the library**
```bash
npm run build
```

---

## 🧪 Running Tests

- **All tests:**
  ```bash
  npm test
  ```
- **Test UI (interactive):**
  ```bash
  npm run test:ui
  ```
- **Coverage report:**
  ```bash
  npm run test:coverage
  ```

---

## 🧩 Usage Example

Import components in your app:
```tsx
import { Button, Dropdown, Modal, ToastProvider } from 'component-library';

function App() {
  return (
    <ToastProvider>
      <Button>Click me</Button>
      <Dropdown options={[{ value: '1', label: 'Option 1' }]} />
    </ToastProvider>
  );
}
```

---

## 🐞 Issues Faced

- Complex keyboard navigation and accessibility edge cases, especially for the Dropdown component (focus management, ARIA attributes, wrap-around navigation).
- Ensuring custom styles and props (e.g., className, maxHeight) are applied to the correct elements.
- Synchronizing controlled and uncontrolled component states.
- Handling asynchronous focus and rerender timing in tests and real usage.
- Making sure all components are fully accessible and pass rigorous test suites.

---

## 🚧 Planned Improvements

- Add more visual and functional regression tests (e.g., with Chromatic) *(optional, not currently enabled)*.
- Expand the component set (e.g., Tabs, Accordion, Tooltip, Table, Pagination).
- Improve documentation with more usage examples and live previews.
- Add dark mode and theming support.
- Enhance accessibility with more ARIA roles and screen reader testing.
- Provide Figma/Design tokens for better design-dev handoff.
- Optimize bundle size and tree-shaking for production use.
- Add CI/CD for automated testing and deployment.

---

## 📚 Contributing

Contributions are welcome! Please open issues or pull requests for new components, bug fixes, or improvements.

---

## 📄 License

MIT
# storybook-component-library
