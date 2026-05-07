import { createSignal } from 'solid-js';

export function Ticker(props) {
    const [count, setCounter] = createSignal(0);
    let stopped = true;

    const interval = props.interval;
    const duration = props.duration;
    var expected = Date.now() + interval;

    function step() {
        var delta = Date.now() - expected; // Calculate the amount of drift
        if (delta > interval) {
            console.warn(`A significant differnce detected!\n\tinterval: (${interval})ms\n\tdelta: (${delta})ms`);
            expected += interval * Math.floor(delta / interval); // Correct for large time steps
        }
        
        setCounter(count() + 1); // Update counter

        if ((count() * interval ^ 2 / 2000) % duration == 0) { 
            props.onDurationElapsed();
            if (!props.persistent) stopped = true;
        }

        if (!stopped) {
            expected += interval;
            setTimeout(step, Math.max(0, interval - delta)); // Account for drift
        }
    }

    function formatTime (milliseconds) {
        const ms = Number(milliseconds);
        if (!Number.isFinite(ms) || ms <= 0) return '00:00';

        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div class="p-5 bg-gray-500 rounded-md text-white">
            <p id='value'>{formatTime(count() * interval)}</p>

            <button
                type="button"
                onclick={() => {
                    setTimeout(step, interval); // Start
                    stopped = false;
                    props.onStart();
                }}
                class="p-2 mr-2 bg-green-500 rounded-md"
            >
                Start Timer
            </button>
            <button
                type="button"
                onclick={() => {
                    stopped = true;
                    props.onStop();
                }}
                class="p-2 mr-2 bg-red-500 rounded-md"
            >
                Stop Timer
            </button>
            <button
                type="button"
                onclick={() => {
                    setCounter(0);
                    props.onReset();
                }}
                class="p-2 bg-blue-500 rounded-md"
            >
                Reset Timer
            </button>
        </div>
    );
}
