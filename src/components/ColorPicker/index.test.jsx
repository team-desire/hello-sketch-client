import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import ColorPicker from "./index";

describe("ColorPicker Component", () => {
  test("[1.it must render] should render color input when to Show is true", () => {
    render(
      <ColorPicker color="#ffffff" onColorChange={() => {}} toShow={true} />,
    );

    const colorInput = screen.getByTestId("color-input");

    expect(colorInput).toBeInTheDocument();
  });

  test("[2.test the output] renders the correct input type and value", () => {
    render(
      <ColorPicker color="#ffffff" onColorChange={() => {}} toShow={true} />,
    );

    const input = screen.getByTestId("color-input");

    expect(input.type).toBe("color");
    expect(input.value).toBe("#ffffff");
  });

  test("[3.test the states] does not render when toShow is false", () => {
    render(
      <ColorPicker color="#ffffff" onColorChange={() => {}} toShow={false} />,
    );

    const input = screen.queryByTestId("color-input");

    expect(input).not.toBeInTheDocument();
  });

  test("[4.test the events] calls onColorChange when color changes", () => {
    const mockOnChange = vi.fn();

    render(
      <ColorPicker
        color="#ffffff"
        onColorChange={mockOnChange}
        toShow={true}
      />,
    );

    const input = screen.getByTestId("color-input");

    fireEvent.change(input, { target: { value: "#000000" } });

    expect(mockOnChange).toHaveBeenCalled();
  });
});
