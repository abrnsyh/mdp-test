import React from "react";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { MantineProvider } from "@mantine/core";
import { createRoot } from "react-dom/client";

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
    return pages[`./Pages/${name}.jsx`];
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App {...props} />
      </MantineProvider>
    );
  },
});
