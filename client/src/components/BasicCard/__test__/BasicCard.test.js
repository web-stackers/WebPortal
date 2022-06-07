import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import BasicCard from "../index";

test("renders passed parameter in BasicCard component", () => {
  render(<BasicCard text="Provider Count" />);
  const cardElement = screen.getByText(/provider count/i);
  expect(cardElement).toBeInTheDocument();
});
