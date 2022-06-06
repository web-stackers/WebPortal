import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";

import AddNewJob from "../index";

const onSubmit = jest.fn();

test("onSubmit is called when all fields pass validation", async () => {
  render(<AddNewJob onSubmit={onSubmit} />);
  const jobType = screen.getByLabelText(/job type/i);
  user.type(jobType, "Gardener");
  const dropdown = screen.getByLabelText(/Category/i);
  user.type(dropdown, "Construction");
  user.click(screen.getByRole("button", { name: /Submit/i }));
  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith({
      jobType: "Gardener",
      category: "Construction",
    });
  });
  expect(onSubmit).toHaveBeenCalledTimes(1);
});
