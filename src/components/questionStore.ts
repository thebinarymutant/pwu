import { writable } from "svelte/store";
import { nextQuestion } from "../utils/number-generator";

function createQuestion() {
    const { subscribe, set, update } = writable(nextQuestion(2));

    return {
        subscribe,
        next: () => {
            return update(({ step }) => nextQuestion(step));
        },
    };
}

export const question = createQuestion();
