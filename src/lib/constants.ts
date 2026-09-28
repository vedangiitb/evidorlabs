export const SITE_CONFIG = {
  name: 'Evidor',
  version: '1.0.0-dev.2',
  status: 'Under Development',
  positioning: 'The most powerful LLM harness.',
  tagline: 'A provider-agnostic foundation for building reliable LLM applications and autonomous AI systems.',
  subtagline: 'One interface. Multiple providers. Context management & tool execution built in.',
  githubCoreUrl: 'https://github.com/vedangiitb/evidor-core',
  githubLandingUrl: 'https://github.com/vedangiitb/evidorlabs',
  testPypiUrl: 'https://test.pypi.org/project/evidor/',
  license: 'MIT',
  author: 'Vedang Bale',
  defaultContextWindow: 16000,
  defaultMaxMessages: 50,
  defaultMaxToolIterations: 10,
};

export const CODE_EXAMPLES = {
  quickstart: `from evidor import Agent, OpenAIProvider

# Initialize agent with desired provider
agent = Agent(OpenAIProvider(model="gpt-4.1-mini"))

# Send a query
response = agent.send("Give a one-sentence explanation of dependency inversion.")
print(response.text)`,

  toolsQuickstart: `from evidor import Agent, GeminiProvider, tool

@tool
def get_weather(location: str, unit: str = "celsius") -> str:
    """Get the current weather forecast for a given location.

    Args:
        location: City and country or state, e.g. 'San Francisco, CA'.
        unit: Temperature scale ('celsius' or 'fahrenheit').
    """
    return f"Weather in {location}: 22° {unit}, clear skies."

# Agent automatically loops and invokes tools until completion
agent = Agent(
    GeminiProvider(model="gemini-2.5-flash"),
    tools=[get_weather],
    max_tool_iterations=10,
)

response = agent.send("What is the weather like in Tokyo right now?")
print(response.text)`,

  toolDefinition: `from evidor import tool

# Automatic JSON schema derivation from types & docstrings
@tool
def get_weather(location: str, unit: str = "celsius") -> str:
    """Get the current weather forecast for a given location.

    Args:
        location: City and country or state, e.g. 'San Francisco, CA'.
        unit: Temperature scale ('celsius' or 'fahrenheit').
    """
    return f"Weather in {location}: 22° {unit}, clear skies."

# Explicit name and description overrides
@tool(name="calc_add", description="Add two numbers together.")
def add(a: float, b: float) -> float:
    return a + b`,

  manualTool: `from evidor import Tool

# Programmatic tool creation without Python function inspection
custom_tool = Tool(
    name="query_sql",
    description="Run a read-only SQL query.",
    parameters={
        "type": "object",
        "properties": {
            "query": {"type": "string", "description": "SQL statement"}
        },
        "required": ["query"],
    },
    func=lambda query: f"Results for: {query}",
)`,

  multiTurn: `from evidor import Agent, AnthropicProvider

agent = Agent(AnthropicProvider(model="claude-3-5-sonnet-20241022"))

# First turn maintains session memory
agent.send("My favorite color is navy blue.")

# Second turn retains previous turns
response = agent.send("What color did I say I like?")
print(response.text)  # "You said your favorite color is navy blue."`,

  systemPrompt: `from evidor import Agent, GeminiProvider

agent = Agent(
    GeminiProvider(model="gemini-2.5-flash"),
    system_prompt="You are a concise technical writer. Avoid buzzwords and respond in bullet points.",
)

response = agent.send("How does a TCP handshake work?")
print(response.text)`,

  contextManagement: `from evidor import Agent, OpenAIProvider, DEFAULT_CONTEXT_WINDOW, DEFAULT_MAX_MESSAGES

agent = Agent(
    OpenAIProvider(model="gpt-4.1-mini"),
    context_window=16_000,  # Max token budget (default: 16,000)
    max_messages=50,        # Max messages retained before compaction (default: 50)
)`,

  summarizationModel: `from evidor import Agent, OpenAIProvider, GeminiProvider

# Option 1: Configure a lighter model on the same provider
agent = Agent(
    OpenAIProvider(model="gpt-4.1"),
    summarization_model="gpt-4.1-mini",
)

# Option 2: Provide an entirely separate ModelProvider instance
agent = Agent(
    OpenAIProvider(model="gpt-4.1"),
    summarization_model=GeminiProvider(model="gemini-2.5-flash"),
)`,

  history: `# Inspect conversation history
for message in agent.messages:
    prefix = "[SUMMARY] " if message.is_summary else ""
    print(f"{prefix}{message.role}: {message.content}")

# Clear conversation turns while keeping original system prompt
agent.clear_history()`,

  lowLevel: `from evidor import GenerationRequest, Message, OpenAIProvider

provider = OpenAIProvider(model="gpt-4.1-mini")

# Multi-message generation request
request = GenerationRequest(
    messages=[
        Message(role="system", content="You are a helpful assistant."),
        Message(role="user", content="Explain Raft consensus in one paragraph."),
    ]
)
response = provider.generate(request)
print(response.text)

# Single-prompt compatibility shortcut
simple_request = GenerationRequest(prompt="Hello!")
response = provider.generate(simple_request)`,

  customProvider: `from evidor import GenerationRequest, GenerationResponse, ModelProvider

class CustomProvider:
    """Implements the Evidor ModelProvider protocol."""
    def __init__(self, model: str = "custom-model") -> None:
        self.model = model

    def with_model(self, model: str) -> "CustomProvider":
        return CustomProvider(model=model)

    def generate(self, request: GenerationRequest) -> GenerationResponse:
        # Read from request.prompt or iterate over request.messages
        prompt_text = request.prompt
        return GenerationResponse(text="Custom response", model=self.model)`,
};
