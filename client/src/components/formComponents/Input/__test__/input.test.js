import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Input from "../index";

test("renders passed parameter in BasicCard component", () => {
  render(<Input label="Last Name" />);
  const cardElement = screen.getByLabelText(/Last Name/i);
  expect(cardElement).toBeInTheDocument();
});
