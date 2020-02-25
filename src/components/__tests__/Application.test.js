import React from "react";
import axios from "axios";

import { 
  render,
  cleanup, 
  waitForElement, 
  fireEvent, 
  prettyDOM, 
  getByText,
  getAllByAltText,
  getByPlaceholderText,
  getByAltText,
  getAllByText
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Monday"));

    fireEvent.click(getByText(container, "Tuesday"));

    expect(getByText(container, "Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

    const { container } = render (<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    fireEvent.click(getAllByAltText(container, "Add")[0]);
    
    fireEvent.change(getByPlaceholderText(container, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    fireEvent.click(getByAltText(container, "Sylvia Palmer"));
    
    fireEvent.click(getByText(container, "Save"));
    
    expect(getByText(container, "SAVING")).toBeInTheDocument();
    
    await waitForElement(() => getByText(container, "Lydia Miller-Jones"));

    expect(getByText(container, "no spots remaining")).toBeTruthy();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    fireEvent.click(getAllByAltText(container, "Delete")[0]);
    
    expect(getByText(container, "Are you sure you want to delete?")).toBeInTheDocument();
    
    fireEvent.click(getByText(container, "Confirm"));
    
    expect(getByText(container, "DELETING")).toBeInTheDocument();
    
    await waitForElement(() => getByText(container, "Dohnny Boi"))

    expect(getByText(container, "2 spots remaining")).toBeTruthy();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Johnny Boi"));
    
    fireEvent.click(getAllByAltText(container, "Edit")[0]);

    expect(getByText(container, "Save")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "Enter Student Name"), {
      target: { value: "New Boi" }
    });

    fireEvent.click(getByText(container, "Save"));
    
    expect(getByText(container, "SAVING")).toBeInTheDocument();
    
    await waitForElement(() => getByText(container, "New Boi"));

    expect(getAllByText(container, "1 spot remaining")[0]).toBeTruthy();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Leopold Silvers"));

    fireEvent.click(getAllByAltText(container, "Add")[0]);

    expect(getByText(container, "Save")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "Enter Student Name"), {
      target: { value: "Anotha One" }
    });
    
    fireEvent.click(getByAltText(container, "Sylvia Palmer"));

    fireEvent.click(getByText(container, "Save"));

    await waitForElement(() => getByText(container, "ERROR SAVING"));

    expect(getByText(container, "ERROR SAVING")).toBeInTheDocument();
    expect(getAllByText(container, "1 spot remaining")[0]).toBeTruthy();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Leopold Silvers"));

    fireEvent.click(getAllByAltText(container, "Delete")[0]);

    expect(getByText(container, "Are you sure you want to delete?")).toBeInTheDocument();

    fireEvent.click(getByText(container, "Confirm"));
    
    await waitForElement(() => getByText(container, "ERROR DELETING"));

    fireEvent.click(getByAltText(container, "Close"))

    expect(getByText(container, "Johnny Boi")).toBeInTheDocument();
    expect(getAllByText(container, "1 spot remaining")[0]).toBeTruthy();
  });
});
