# Splitter

A simple straightforward way to split bills with friends and family.

## Features

*   Create new tabs to manage shared expenses.
*   Define tab name and currency.
*   Add expenses to a tab, specifying:
    *   Expense name
    *   Who paid
    *   Amount
    *   Number of people to split the expense between.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (version 20 or later recommended)
*   npm (comes with Node.js)

### Installation

1.  Clone the repo:
    ```bash
    git clone https://github.com/your_username/your_project_name.git
    ```
    *Replace `your_username/your_project_name.git` with the actual URL of the repository.*
2.  Navigate to the project directory:
    ```bash
    cd your_project_name
    ```
3.  Install NPM packages:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

This will typically start the application on `http://localhost:3000`.

### Building for Production

To build the application for production, use:

```bash
npm run build
```

And to start the production server:

```bash
npm run start
```

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** Radix UI (based on `package.json` dependencies like `@radix-ui/react-label`)
*   **Form Handling:** React Hook Form (based on `package.json` dependencies)
*   **Schema Validation:** Zod (based on `package.json` dependencies)

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
