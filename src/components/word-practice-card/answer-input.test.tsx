import { render, screen } from "@testing-library/react";
import { AnswerInput } from "./answer-input";
import "@testing-library/jest-dom";

describe("@unit AnswerInput", () => {
    it("renders the input field with the correct label", () => {
        render(
            <AnswerInput
                inputRef={{ current: null }}
                message=""
                status=""
            />
        );

        const label = screen.getByLabelText("Answer:");
        expect(label).toBeInTheDocument();
    });

    it("applies the correct styles and displays the error message when status is 'error'", () => {
        const errorMessage = "This is an error message";

        render(
            <AnswerInput
                inputRef={{ current: null }}
                message={errorMessage}
                status="error"
            />
        );

        const messageElement = screen.getByText(errorMessage);
        expect(messageElement).toBeInTheDocument();
        expect(messageElement).toHaveClass("text-red-600");
    });

    it("applies the correct styles and does not display an error message when status is not 'error'", () => {
        render(
            <AnswerInput
                inputRef={{ current: null }}
                message="This is a success message"
                status="success"
            />
        );

        const messageElement = screen.queryByText("This is a success message");
        expect(messageElement).not.toBeInTheDocument();
    });

    it("renders the input field with the correct placeholder", () => {
        render(
            <AnswerInput
                inputRef={{ current: null }}
                message=""
                status=""
            />
        );

        const input = screen.getByPlaceholderText("Type your answer here...");
        expect(input).toBeInTheDocument();
    });

    it("associates the input field with the label", () => {
        render(
            <AnswerInput
                inputRef={{ current: null }}
                message=""
                status=""
            />
        );

        const input = screen.getByLabelText("Answer:");
        expect(input).toHaveAttribute("name", "word_query");
    });
});