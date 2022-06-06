import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";

import AddNewThirdParty from "../index";

describe("AddNewThirdParty", () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
    // render(<AddNewThirdParty onSubmit={onSubmit} />);
  });

  test("onSubmit is called when all fields pass validation", async () => {
    render(<AddNewThirdParty onSubmit={onSubmit} />);
    const fName = screen.getByLabelText(/first name/i);
    user.type(fName, "Theepana");
    const lName = screen.getByLabelText(/Last Name/i);
    user.type(lName, "Govintharajah");
    const email = screen.getByLabelText(/Email/i);
    user.type(email, "theepana@gmail.com");
    const mobile = screen.getByLabelText(/Mobile Number/i);
    user.type(mobile, "0774565711");
    const address = screen.getByLabelText(/Address/i);
    user.type(address, "Colombo");
    user.click(screen.getByText(/submit/i));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        fName: "Theepana",
        lName: "Govintharajah",
        email: "theepana@gmail.com",
        mobile: "0774047911",
        address: "Colombo",
      });
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
