export const SITE_CONFIG = {
  name: 'Evidor',
  version: '1.2.0',
  status: 'Published on PyPI',
  positioning: 'Provider-agnostic runtime for building AI agents.',
  tagline: 'An open-source, provider-agnostic runtime for building AI agents.',
  subtagline: 'One interface. Multiple providers. Context compaction, native async, and tool loops built in.',
  githubCoreUrl: 'https://github.com/vedangiitb/evidor-core',
  githubLandingUrl: 'https://github.com/vedangiitb/evidorlabs',
  pypiUrl: 'https://pypi.org/project/evidor/',
  license: 'MIT',
  author: 'Vedang Bale',
  defaultContextWindow: 16000,
  defaultMaxMessages: 50,
  defaultMaxToolIterations: 10,
};

export const CODE_EXAMPLES = {
  quickstart: `from evidor import Agent, OpenAIProvider

agent = Agent(OpenAIProvider(model="gpt-4.1-mini"))
response = agent.send("Give a one-sentence explanation of dependency inversion.")
print(response.text)`,

  toolsQuickstart: `from evidor import Agent, GeminiProvider, tool

@tool
def search_database(query: str) -> list[str]:
    """Search internal records by keyword."""
    return [f"Record 1 matching '{query}'", f"Record 2 matching '{query}'"]

agent = Agent(
    GeminiProvider(model="gemini-2.5-flash"),
    tools=[search_database],
    max_tool_iterations=10,  # Maximum tool execution turns per send() (default: 10)
)

response = agent.send("Can you check our records for 'alpha project'?")
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

  asyncTools: `import asyncio
from evidor import Agent, GeminiProvider, tool

# Async functions are automatically executed without blocking
@tool(timeout=5.0)  # Timeout in seconds
async def fetch_webpage(url: str) -> str:
    """Fetch content from a URL."""
    await asyncio.sleep(0.1)
    return f"Contents of {url}"

# Configure an agent with a default timeout for all its tools
agent = Agent(
    GeminiProvider(model="gemini-2.5-flash"),
    tools=[fetch_webpage],
    tool_timeout=10.0,      # Default tool timeout in seconds
    max_tool_iterations=10, # Max tool turns before forcing final synthesis
)`,

  asyncAgent: `import asyncio
from evidor import Agent, OpenAIProvider, tool

@tool
async def lookup_account(account_id: str) -> dict:
    return {"id": account_id, "status": "active"}

async def main() -> None:
    # Executes natively on caller's event loop (FastAPI, Tornado)
    agent = Agent(OpenAIProvider(model="gpt-4.1-mini"), tools=[lookup_account])
    response = await agent.send_async("Check status for account 1234")
    print(response.text)

asyncio.run(main())`,

  builtInTools: `from evidor import Agent, OpenAIProvider, calculator, get_current_time

# Built-in zero-dependency utility tools
agent = Agent(
    OpenAIProvider(model="gpt-4.1-mini"),
    tools=[calculator, get_current_time],
)`,

  filesystemTools: `from evidor import Agent, OpenAIProvider, calculator, filesystem_tools, get_current_time

# Scoped filesystem tools (list, read, search, create, write, delete)
agent = Agent(
    OpenAIProvider(model="gpt-4.1-mini"),
    tools=[
        calculator,
        get_current_time,
        *filesystem_tools("./project", max_file_bytes=100_000, max_results=100),
    ],
)`,

  webSearch: `from evidor import Agent, OpenAIProvider, TavilySearchProvider, web_search

# Provider-neutral web search using Python standard library
search = web_search(TavilySearchProvider(), max_results=5)
agent = Agent(OpenAIProvider(model="gpt-4.1-mini"), tools=[search])

response = agent.send("Find the current Python release notes and cite the sources.")
print(response.text)`,

  manualTool: `from evidor import Tool

# Programmatic tool creation without standard Python function inspection
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
    timeout=5.0,
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

  contextManagement: `from evidor import DEFAULT_CONTEXT_WINDOW, DEFAULT_MAX_MESSAGES, Agent, OpenAIProvider

agent = Agent(
    OpenAIProvider(model="gpt-4.1-mini"),
    context_window=16_000,  # Max token budget (default: 16,000)
    max_messages=50,        # Max messages retained before compaction (default: 50)
)`,

  summarizationModel: `from evidor import Agent, GeminiProvider, OpenAIProvider

# Option 1: Configure a different model name on the same provider
agent = Agent(
    OpenAIProvider(model="gpt-4.1"),
    summarization_model="gpt-4.1-mini",
)

# Option 2: Provide an entirely separate ModelProvider instance
agent = Agent(
    OpenAIProvider(model="gpt-4.1"),
    summarization_model=GeminiProvider(model="gemini-2.5-flash"),
)`,

  history: `# Inspect conversation history (tuple of Message objects)
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
        prompt_text = request.prompt
        # or iterate over request.messages
        return GenerationResponse(text="Custom response", model=self.model)`,
};
