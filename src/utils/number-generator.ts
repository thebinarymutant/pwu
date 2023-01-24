import { customAlphabet } from "nanoid";

enum MultiplicationType {
    Square,
    TwoxOne,
    TwoxTwo,
}

export interface QuestionStore {
    step: MultiplicationType;
    num1: number;
    num2: number;
    answer: number;
    // window.performance.measure
}

const nanoid = (size: number | undefined): number =>
    parseInt(customAlphabet("123456789", 10)(size));

const questionForState = (questionType: MultiplicationType): QuestionStore => {
    let num1 = nanoid(2);

    if (questionType === MultiplicationType.Square) {
        return {
            step: MultiplicationType.Square,
            num1: num1,
            num2: num1,
            answer: num1 * num1,
        };
    } else if (questionType === MultiplicationType.TwoxOne) {
        let num2 = nanoid(1);

        return {
            step: MultiplicationType.TwoxOne,
            num1: num1,
            num2: num2,
            answer: num1 * num2,
        };
    } else {
        let num2 = nanoid(2);

        return {
            step: MultiplicationType.TwoxTwo,
            num1: num1,
            num2: num2,
            answer: num1 * num2,
        };
    }
};

const nextQuestion = (previousState: MultiplicationType): QuestionStore => {
    return questionForState((previousState + 1) % 3);
};

export { nextQuestion };
