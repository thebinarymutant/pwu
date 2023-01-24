<script lang="ts">
    import { question } from "./questionStore";
    import { fly } from "svelte/transition";

    import soundFile from "../assets/DilatingTimes-GoldenGirl.mp3";

    let playing = false;

    let userAnswer: number | undefined;

    let correctAnswer: boolean | undefined;

    let questionsAttempted = 1;
    let questionsCorrectlyAnswered = 0;

    const sound = new Audio(soundFile);

    function onClick() {
        if (!playing) {
            sound.play();
        } else {
            sound.pause();
        }

        playing = !playing;
    }

    $: ({ num1, num2, answer } = $question);

    function onSubmit(e: SubmitEvent) {
        e.preventDefault();
        correctAnswer = answer === userAnswer;

        if (correctAnswer) questionsCorrectlyAnswered++;

        setTimeout(() => {
            correctAnswer = undefined;
            userAnswer = undefined;
            question.next();
            questionsAttempted++;
        }, 500);
    }
</script>

<h1 class="text-4xl text-center text-fuchsia-400">
    <code> {num1} * {num2} </code>
</h1>

<h2 class="text-2xl text-center text-gradient py-8">
    Score: {questionsCorrectlyAnswered} / {questionsAttempted}
</h2>

<div class="h-8">
    {#if correctAnswer}
        <h3
            class="text-xl text-green-500 text-center"
            in:fly={{ delay: 20, duration: 100, y: 40 }}
        >
            Correct Answer
        </h3>
    {/if}

    {#if correctAnswer !== undefined && !correctAnswer}
        <h3
            class="text-xl text-red-500 text-center"
            in:fly={{ delay: 20, duration: 100, y: 40 }}
        >
            Wrong Answer
        </h3>
    {/if}
</div>

<button class="h-12 w-12 text-3xl" on:click={onClick}
    >{playing ? "🔊" : "🔇"}</button
>

<form class="grid grid-gap-8 py-8 text-4xl" on:submit|preventDefault={onSubmit}>
    <input
        class="h-16 w-full"
        bind:value={userAnswer}
        min="1"
        name="userAnswer"
        type="number"
    />
</form>

<style>
    .text-gradient {
        background-image: var(--accent-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 300%;
        background-position: 0%;
    }
</style>
