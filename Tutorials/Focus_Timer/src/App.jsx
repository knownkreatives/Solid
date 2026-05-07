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
    <div class="m-5 p-5 bg-gray-100 rounded-md">
       <p class="pl-2 mb-5 bg-blue-100 rounded-md">
        Duration: <input
         type='number'
         value={duration()}
         onchange={(e) => {
           setDuration(e.target.value);
         }}
         class="px-1 bg-blue-200 rounded-md"
       /> sec(s)</p>
       <p class="pl-2 mb-10 bg-blue-100 rounded-md">
        Continue in {duration()}s intervals? <input
         type='checkbox'
         onchange={(e) => {
           setPersistence(e.target.value == "on");
         }}/></p>

       <Ticker
         duration={convertTimeToMilliseconds(0, 0, 0, duration(), 0)}
         interval={500}
         persistent={persistence()}
         onStart={() => (console.log("Starting/Resumed Timer"))}
         onStop={() => (console.log("Stopped/Paused Timer"))}
         onReset={() => (console.log("Reset Timer"))}
         onDurationElapsed={() => (console.log("Completed Timer"))}
       />
    </div>
  );
}

export default App;