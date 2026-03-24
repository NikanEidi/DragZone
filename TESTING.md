# 🧪 Testing Documentation - DragZoneAI (v1.1.3 - Tag 3)

This project uses a layered testing strategy to ensure high performance and reliability.

## 🏗️ Testing Stack

- **Unit/Component Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **End-to-End (E2E) Testing**: [Cypress](https://www.cypress.io/)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)

## 🏃‍♂️ Running Tests

### Unit Tests
Run unit tests with Jest:
```bash
npm run test:unit
```
To run in watch mode:
```bash
npm run test:unit:watch
```

### E2E Tests
Run Cypress tests in the terminal:
```bash
npm run test:e2e
```
To open the Cypress Test Runner (GUI):
```bash
npm run cypress:open
```

## 🤖 GitHub Actions Workflow
Every push and pull request to the `UI` and `main` branches triggers the CI pipeline, which:
1. Installs dependencies.
2. Builds the project.
3. Runs all unit tests.
4. Executes E2E tests using `start-server-and-test`.

## 📝 Writing New Tests

### Unit Tests
Place files ending in `.test.tsx` next to the component or hook they test. Mock complex dependencies like Canvas effects or LLM streams to keep tests isolated and fast.

### E2E Tests
Place files in `cypress/e2e/`. Focus on critical user paths:
- Conversation creation.
- Message sending.
- Navigation through the "Liquid Glass" shell.

---
*Maintained by **Nikan Eidi***
