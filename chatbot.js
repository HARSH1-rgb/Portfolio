
const form = document.getElementById("chatForm");
const input = document.getElementById("chatInput");
const messages = document.getElementById("chatMessages");
const statusText = document.getElementById("chatStatus");
const sendButton = document.getElementById("chatSend");

// Store conversation history for the current page session.
const conversationHistory = [];

// Display a message in the chat window.
function showMessage(text, kind) {
  const p = document.createElement("p");
  p.className = kind === "user" ? "user-message" : "bot-message";
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

// Handle simple greetings without using API tokens.
function isSimpleGreeting(text) {
  return /^(hi|hello|hey|hii|hiii|yo|good morning|good afternoon|good evening|howdy)[!.?,\s]*$/i
    .test(text.trim());
}

// Main chatbot handler — keep only ONE copy.
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const question = input.value.trim();

  if (!question) {
    statusText.textContent = "Please type a question.";
    return;
  }

  showMessage(question, "user");
  input.value = "";

  // Greetings are answered locally without an API request.
  if (isSimpleGreeting(question)) {
    showMessage(
      "Hi! 👋 Ask me about my skills, projects, or background.",
      "bot"
    );
    statusText.textContent = "";
    conversationHistory.push(
        { role: "user", content: question },
        {
          role: "assistant",
          content: "Hi! Ask me about my skills, projects, or background."
        }
      );
    return;
  }

  if (
    !CONFIG.apiKey ||
    CONFIG.apiKey === "PASTE_YOUR_GROQ_API_KEY_HERE"
  ) {
    statusText.textContent = "Groq API key is missing.";
    return;
  }

  sendButton.disabled = true;
  statusText.textContent = "Thinking...";

  try {
    const portfolioContext = getPortfolioContext();

    const response = await fetch(
      `${CONFIG.baseUrl}/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${CONFIG.apiKey}`
        },
        body: JSON.stringify({
          model: CONFIG.model,
          temperature: 0.3,
          max_tokens: 120,
          messages: [
            {
              role: "system",
              content: `You are Harsh Jangid's portfolio assistant.
          
          Portfolio information:
          ${portfolioContext}
          
          Instructions:
          - Answer general knowledge questions as well as portfolio questions.
          - Understand follow-up questions using the previous conversation.
          - If the user says "it", "they", "that", or similar, use the conversation to identify what they mean.
          - Never invent personal details or project features.
          - If portfolio information is missing, say so.
          - Keep answers concise, normally under 80 words.`
            },
            ...conversationHistory.slice(-2),
            {
              role: "user",
              content: question
            }
          ]          
        })
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();

      console.error(
        "Groq API error:",
        response.status,
        errorBody
      );

      throw new Error(
        `HTTP ${response.status}: ${errorBody}`
      );
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content?.trim();

if (!answer) {
  console.error("Unexpected Groq response:", data);
  throw new Error(
    "The AI returned an empty answer. Check the browser console."
  );
}

// Save both sides of the conversation for follow-up questions.
conversationHistory.push(
  { role: "user", content: question },
  { role: "assistant", content: answer }
);

// Keep only the most recent eight messages.
if (conversationHistory.length > 2) {
  conversationHistory.splice(
    0,
    conversationHistory.length - 2
  );
}

showMessage(answer, "bot");
statusText.textContent = "";


    statusText.textContent = "";
  } catch (error) {
    statusText.textContent =
      "Chat unavailable. " + error.message;
  } finally {
    sendButton.disabled = false;
  }
});