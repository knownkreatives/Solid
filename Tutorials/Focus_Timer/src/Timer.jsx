import { createSignal } from 'solid-js';
import createTimer, { Shedule } from "@solid-primitives/timer";

export function Timer(props) {
    const formatTime = milliseconds => {
        const ms = Number(milliseconds);
        if (!Number.isFinite(ms) || ms <= 0) return '00:00';

        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const durationMs = Number(props.duration) || 0;
    const timeRemaining = durationMs - (Date.now() - Number(props.savedTime));
    console.log(Date.now() - props.savedTime);

    const [count, setCounter] = createSignal(0);
    createTimer(() => setCounter(count() + 1), 1000, Shedule.Interval);
    
    return (
        <div class="timer">
            <p>Current Duration: <strong>{formatTime(durationMs)}</strong></p>
            <p>Time Remaining: <strong>{formatTime(timeRemaining)}</strong></p>
            <p>Time Elapsed: <strong>{formatTime(count)}</strong></p>
        </div>
    );
}