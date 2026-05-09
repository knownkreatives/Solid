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
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6">
            <div class="w-full max-w-lg rounded-[2rem] bg-slate-950/95 p-8 shadow-2xl ring-1 ring-white/10">
                <div class="mb-8 text-center">
                    <p class="text-sm uppercase tracking-[0.35em] text-slate-400 mb-3">Focus Timer</p>
                    <p id="value" class="text-6xl font-semibold tracking-tight text-white">{formatTime(count() * interval)}</p>
                    <p class="mt-3 text-sm text-slate-400">Keep your work sessions on track with a clean and responsive timer.</p>
                </div>

                <div class="flex flex-wrap justify-center gap-4">
                    <button
                        type="button"
                        onclick={() => {
                            setTimeout(step, interval); // Start
                            stopped = false;
                            props.onStart();
                        }}
                        class="min-w-[120px] rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
                    >
                        Start
                    </button>
                    <button
                        type="button"
                        onclick={() => {
                            stopped = true;
                            props.onStop();
                        }}
                        class="min-w-[120px] rounded-2xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:bg-rose-400"
                    >
                        Stop
                    </button>
                    <button
                        type="button"
                        onclick={() => {
                            setCounter(0);
                            props.onReset();
                        }}
                        class="min-w-[120px] rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
