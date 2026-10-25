const form = document.getElementById("chatForm");
const input = document.getElementById("chatInput");
const messages = document.getElementById("chatMessages");
const statusText = document.getElementById("chatStatus");
const sendButton = document.getElementById("chatSend");

// Keep only the latest two conversation messages.
const conversationHistory = [];

// Display a message in the chat window.
function showMessage(text, kind) {
  const p = document.createElement("p");

  p.className =
    kind === "user" ? "user-message" : "bot-message";

  p.textContent = text;
  messages.appendChild(p);
  messages.scrollTop = messages.scrollHeight;
}

// Collect information from the portfolio.
function getPortfolioContext() {
  const sections = ["#about", "#skills", "#projects"];

  return sections
    .map((selector) => {
      const section = document.querySelector(selector);

      if (!section) return "";

      const copy = section.cloneNode(true);

      // Remove unfinished placeholder projects.
      copy.querySelectorAll("li").forEach((item) => {
        if (/placeholder/i.test(item.textContent)) {
          item.remove();
        }
      });

      return copy.innerText.replace(/\s+/g, " ").trim();
    })
    .filter(Boolean)
    .join("\n\n");
}

// Handle simple greetings locally without using API tokens.
function isSimpleGreeting(text) {
  return /^(hi|hello|hey|hii|hiii|yo|good morning|good afternoon|good evening|howdy)[!.?,\s]*$/i
    .test(text.trim());
}

// Handle chat submissions.
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const question = input.value.trim();

  if (!question) {
    statusText.textContent = "Please type a question.";
    return;
  }

  // Prevent multiple simultaneous requests.
  if (sendButton.disabled) return;

  showMessage(question, "user");
  input.value = "";

  // Answer greetings locally.
  if (isSimpleGreeting(question)) {
    const greeting =
      "Hi! 👋 Ask me about my skills, projects, or background.";

    showMessage(greeting, "bot");

    conversationHistory.push(
      { role: "user", content: question },
      { role: "assistant", content: greeting }
    );

    if (conversationHistory.length > 2) {
      conversationHistory.splice(
        0,
        conversationHistory.length - 2
      );
    }

    statusText.textContent = "";
    return;
  }

  sendButton.disabled = true;
  statusText.textContent = "Thinking...";

  try {
    const portfolioContext = getPortfolioContext();

    // Send the request to your Vercel backend.
    // The Groq API key stays on the server.
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        portfolioContext,
        history: conversationHistory.slice(-2),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || `Chat request failed (${response.status}).`
      );
    }

    const answer = data.answer;

    if (typeof answer !== "string" || !answer.trim()) {
      throw new Error("The AI returned an empty answer.");
    }

    // Save the question and answer for follow-up questions.
    conversationHistory.push(
      { role: "user", content: question },
      { role: "assistant", content: answer }
    );

    // Keep only the latest two messages.
    if (conversationHistory.length > 2) {
      conversationHistory.splice(
        0,
        conversationHistory.length - 2
      );
    }

    // Display the AI response exactly once.
    showMessage(answer, "bot");
    statusText.textContent = "";

  } catch (error) {
    console.error("Chat error:", error);

    statusText.textContent =
      error.message || "Chat unavailable. Please try again.";

  } finally {
    sendButton.disabled = false;
  }
});
