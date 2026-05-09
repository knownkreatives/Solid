import { createSignal } from 'solid-js';
import { Ticker } from './Ticker';

function App() {
  const [duration, setDuration] = createSignal(5);
  const [persistence, setPersistence] = createSignal(false);

  function convertTimeToMilliseconds(days, hours, minuites, seconds, milliseconds) {
    let result = 0;
    result += days * 86400000; // to hours, minuites, seconds and then milliseconds
    result += hours * 3600000; // to minuites, seconds and then milliseconds
    result += minuites * 60000; // to seconds and then milliseconds
    result += seconds * 1000; // to miliseconds
    result += milliseconds;

    return result;
  }

  return (
    <div class="min-h-screen bg-slate-50 p-6">
      <div class="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <header class="mb-8">
          <h1 class="text-4xl font-semibold text-slate-900">Focus Timer</h1>
          <p class="mt-2 text-slate-600">Set your duration and enable persistence for interval-based focus sessions.</p>
        </header>

        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200">
            <label class="mb-3 block text-sm font-medium text-slate-700">Duration (seconds)</label>
            <input
              type="number"
              min="1"
              value={duration()}
              onchange={(e) => setDuration(Number(e.target.value))}
              class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-lg text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div class="flex items-center justify-between rounded-2xl bg-slate-50 px-6 py-5 shadow-sm ring-1 ring-slate-200">
            <div>
              <p class="text-base font-medium text-slate-800">Repeat timer</p>
              <p class="text-sm text-slate-500">Continue in {duration()} second intervals</p>
            </div>
            <label class="inline-flex cursor-pointer items-center gap-3">
              <span class="text-sm text-slate-700">Enable</span>
              <input
                type="checkbox"
                checked={persistence()}
                onchange={(e) => setPersistence(e.target.checked)}
                class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>

          <div class="rounded-2xl bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200">
            <Ticker
              duration={convertTimeToMilliseconds(0, 0, 0, duration(), 0)}
              interval={500}
              persistent={persistence()}
              onStart={() => console.log('Starting/Resumed Timer')}
              onStop={() => console.log('Stopped/Paused Timer')}
              onReset={() => console.log('Reset Timer')}
              onDurationElapsed={() => console.log('Completed Timer')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;