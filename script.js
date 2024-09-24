//your JS code here. If required.
const elementContainer = document.getElementById('element-container');
const memoryUsageDisplay = document.getElementById('memory-usage');
const optimizationAdvice = document.getElementById('optimization-advice');

const memoryLimitMB = 100; // Set memory limit to 100MB
let elementCount = 0;

// Function to add a new element
function addElement() {
    const newElement = document.createElement('div');
    newElement.classList.add('dynamic-element');
    newElement.textContent = `Element ${++elementCount}`;
    elementContainer.appendChild(newElement);

    trackMemoryUsage();
}

// Function to remove the last element
function removeElement() {
    if (elementContainer.lastChild) {
        elementContainer.removeChild(elementContainer.lastChild);
        elementCount--;
    }
    trackMemoryUsage();
}

// Function to clear all elements
function clearElements() {
    elementContainer.innerHTML = '';
    elementCount = 0;
    trackMemoryUsage();
}

// Function to track and display memory usage
function trackMemoryUsage() {
    if (performance.memory) {
        const heapUsedMB = performance.memory.usedJSHeapSize / 1048576; // Convert to MB
        memoryUsageDisplay.textContent = heapUsedMB.toFixed(2);

        // Check if memory usage exceeds the limit
        if (heapUsedMB > memoryLimitMB) {
            alertUser(heapUsedMB);
        } else {
            optimizationAdvice.classList.add('hidden');
        }
    } else {
        memoryUsageDisplay.textContent = "Memory tracking not supported in this browser";
    }
}

// Function to alert the user and provide optimization advice
function alertUser(heapUsedMB) {
    alert(`Memory usage exceeded the limit! Currently using ${heapUsedMB.toFixed(2)} MB`);
    
    // Display optimization suggestions
    optimizationAdvice.textContent = "Consider removing some elements or refreshing the page to free up memory.";
    optimizationAdvice.classList.remove('hidden');
}

// Event listeners for button actions
document.getElementById('add-element').addEventListener('click', addElement);
document.getElementById('remove-element').addEventListener('click', removeElement);
document.getElementById('clear-elements').addEventListener('click', clearElements);

// Initial memory tracking
trackMemoryUsage();
