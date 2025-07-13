import App from "@/App";
import AllBooks from "@/components/AllBooks";
import BookDetails from "@/components/BookDetails";
import BookSummary from "@/pages/BookSummary";
import Home from "@/pages/Home";

import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "books/:id",
        Component: BookDetails,
      },
      {
        path: "borrow-summary",
        Component: BookSummary,
      },
      {
        path: "books",
        Component: AllBooks,
      },
    ],
  },
]);

export default router;
