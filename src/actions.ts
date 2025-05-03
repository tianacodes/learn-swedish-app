"use server";
import { db } from "@/db";

export async function checkInput(
  formState: {
    message: string;
    status: string;
    term: string;
    answer: string;
    categorySlug: string;
  },
  formData: FormData
) {
  const wordQuery = formData.get("word_query");
  const defaultReturnProps = {
    term: formState.term,
    categorySlug: formState.categorySlug,
    answer: formState.answer,
  };

  if (wordQuery === formState.answer) {
    return {
      ...defaultReturnProps,
      message: "Success!",
      status: "success",
    };
  } else {
    const existingMistake = await db.card.findFirst({
      where: {
        term: formState.term,
        category: {
          slug: "mistakes",
        },
      },
    });

    if (!existingMistake) {
      await db.category.update({
        where: { slug: "mistakes" },
        data: {
          cards: {
            create: {
              term: formState.term,
              answer: formState.answer,
            },
          },
        },
      });
    }
    return {
      ...defaultReturnProps,
      message: "Incorrect!",
      status: "error",
    };
  }
}
