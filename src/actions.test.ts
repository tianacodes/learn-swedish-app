import { checkInput } from "./actions";
import { db } from "@/db";

jest.mock("./db", () => ({
  db: {
    card: {
      findFirst: jest.fn(),
    },
    category: {
      update: jest.fn(),
    },
  },
}));

describe("checkInput", () => {
  const mockFormState = {
    message: "",
    status: "",
    term: "test-term",
    answer: "test-answer",
    categorySlug: "test-category",
  };

  const mockFormData = new FormData();
  mockFormData.set("word_query", "test-answer");

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns success when the input matches the answer", async () => {
    const result = await checkInput(mockFormState, mockFormData);

    expect(result).toEqual({
      term: "test-term",
      categorySlug: "test-category",
      answer: "test-answer",
      message: "Success!",
      status: "success",
    });
  });

  it("returns error and creates a mistake card when the input is incorrect and no existing mistake exists", async () => {
    mockFormData.set("word_query", "wrong-answer");

    (db.card.findFirst as jest.Mock).mockResolvedValue(null); // No existing mistake
    (db.category.update as jest.Mock).mockResolvedValue({});

    const result = await checkInput(mockFormState, mockFormData);

    expect(result).toEqual({
      term: "test-term",
      categorySlug: "test-category",
      answer: "test-answer",
      message: "Incorrect!",
      status: "error",
    });

    expect(db.card.findFirst).toHaveBeenCalledWith({
      where: {
        term: "test-term",
        category: {
          slug: "mistakes",
        },
      },
    });

    expect(db.category.update).toHaveBeenCalledWith({
      where: { slug: "mistakes" },
      data: {
        cards: {
          create: {
            term: "test-term",
            answer: "test-answer",
          },
        },
      },
    });
  });

  it("returns error without creating a mistake card when the input is incorrect and an existing mistake exists", async () => {
    mockFormData.set("word_query", "wrong-answer");

    (db.card.findFirst as jest.Mock).mockResolvedValue({ id: 1 }); // Existing mistake

    const result = await checkInput(mockFormState, mockFormData);

    expect(result).toEqual({
      term: "test-term",
      categorySlug: "test-category",
      answer: "test-answer",
      message: "Incorrect!",
      status: "error",
    });

    expect(db.card.findFirst).toHaveBeenCalledWith({
      where: {
        term: "test-term",
        category: {
          slug: "mistakes",
        },
      },
    });

    expect(db.category.update).not.toHaveBeenCalled();
  });
});