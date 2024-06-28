//  1. To Do list
(() => {
  // Retain a reference to the elements which persist
  // throughout usage of the app.
  const inputEl = document.querySelector("input");
  const list = document.querySelector("ul");
  const submitBtn = document.querySelector("#submit");

  function attachEvents() {
    submitBtn.addEventListener("click", (e) => {
      if (inputEl.value.trim() !== "") {
        console.log("entered");
        addTask(inputEl.value);
        inputEl.value = "";
      }
      e.preventDefault();
    });

    list.addEventListener("click", (e) => {
      removeTask(e.target.closest("li"));
    });
  }
  attachEvents();
  function addTask(val) {
    let ParentEle = document.createElement("li");
    let firstChild = document.createElement("span");
    firstChild.textContent = val;
    ParentEle.appendChild(firstChild);
    let secondChild = document.createElement("button");
    secondChild.textContent = "Delete";
    ParentEle.appendChild(secondChild);
    list.appendChild(ParentEle);
  }
  function removeTask(ele) {
    ele.remove();
  }
})();
{
  /* <form>
<label id="input">Enter Task:</label>
<input type="text" name="input" placeholder="Enter a task to add" id="input"/>
</br>
<button id='submit'>Submit</button>
<ul></ul>
</form> */
  // Test Cases
  // Add tasks
  // Add a new task.
  // Add multiple tasks.
  // Add tasks with potentially malicious content like HTML (e.g. <script>, <style> or <link>) and ensure there's no XSS.
  // Check that <input> is cleared after a task is added.
  // Delete tasks
  // Delete an existing task.
  // Delete multiple tasks.
  // Delete newly-added tasks.
}
