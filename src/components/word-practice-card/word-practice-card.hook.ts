import { INPUT_STATUS } from "@/types";
import { useActionState, useState, useEffect } from "react";
import { checkInput } from "@/actions";

type UseWordPracticeType = {
    handleClick: () => void;
    handleMistake: () => void
    categorySlug: string;
    term: string;
    answer: string;
}

export const useWordPracticeCard = ({
    handleClick,
    categorySlug,
    term,
    answer,
    handleMistake,
}: UseWordPracticeType) => {
    const [state, formAction] = useActionState(checkInput, {
        term,
        answer,
        status: INPUT_STATUS.DEFAULT,
        message: "",
        categorySlug,
    });

    const [hasDoneMistake, setHasDoneMistake] = useState(false);
    // const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        if (state.status === INPUT_STATUS.SUCCESS) {
            // if (categorySlug === "mistakes") {
            //     handleTrainedMistakes()
            // }
            setTimeout(() => { }, 500);
            handleClick();
        }
        if (state.status === INPUT_STATUS.ERROR && !hasDoneMistake) {
            handleMistake();
            setHasDoneMistake(true);
        }
    }, [state, handleClick, handleMistake, hasDoneMistake]);

    return { formAction, state };
};
