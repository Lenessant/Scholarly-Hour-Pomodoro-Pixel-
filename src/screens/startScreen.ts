import { navigate } from "../router";
import { resetToPhase } from "../state";
import "./start.css";

export function showStartScreen (app: HTMLDivElement): void {
  app.innerHTML= `
    <div class= "screen">
      <h1> Greetings, scholar. </h1>
      <h1>Shall we begin today's session?</h1>
      <button id = "startBtn">
        <span>Begin</span>
      </button>
    </div>
  `;

  document.getElementById("startBtn")!.addEventListener ("click",() => {
    resetToPhase("work");
    navigate ("timer");
  })
}