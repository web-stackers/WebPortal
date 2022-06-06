import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import AlertBox from "../index";

test("renders passed alert message in AlertBox component", () => {
  render(<AlertBox alert="User enabled" open={true}/>);
  const alertElement = screen.getByText(/user enabled/i);
  expect(alertElement).toBeInTheDocument();
});