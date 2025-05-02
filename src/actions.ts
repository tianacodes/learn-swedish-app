"use server";

export async function checkInput(
  formState: {
    wordId: string;
    message: string;
    status: string;
    answer: string;
  },
  formData: FormData
) {
  const wordQuery = formData.get("word_query");

  if (wordQuery === formState.answer) {
      return {
        wordId: formState.wordId,
        answer: formState.answer,
        message: "Success!",
        status: "success",
      }
    } else {
      // Add a fake delay to make waiting noticeable.
      await new Promise(resolve => {
        setTimeout(resolve, 2000);
      });
      return {
        wordId: formState.wordId,
        answer: formState.answer,
        message: "Incorrect!",
        status: "error",
      }
    }
}
