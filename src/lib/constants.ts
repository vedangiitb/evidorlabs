export const SITE_CONFIG = {
  name: 'Evidor',
  version: '1.10.1',
  status: 'Published on PyPI',
  positioning: 'Provider-agnostic runtime for building AI agents.',
  tagline: 'An open-source, provider-agnostic runtime for building AI agents.',
  subtagline: 'Token streaming, stateful & stateless paradigms, thinking flags, native context compaction, async execution, MCP, and <1µs telemetry.',
  githubCoreUrl: 'https://github.com/vedangiitb/evidor-core',
  githubLandingUrl: 'https://github.com/vedangiitb/evidorlabs',
  pypiUrl: 'https://pypi.org/project/evidor/',
  license: 'MIT',
  author: 'Vedang Bale',
  defaultMaxToolIterations: 10,
};

export const CODE_EXAMPLES = {
  quickstart: `from evidor import Agent, OpenAIProvider

agent = Agent(OpenAIProvider(model="gpt-4.1-mini"))
response = agent.send("Give a one-sentence explanation of dependency inversion.")
print(response.text)`,

  streamingSync: `from evidor import Agent, OpenAIProvider

agent = Agent(OpenAIProvider(model="gpt-6-astra"))

# Stream responses token-by-token
stream = agent.send("Write a short haiku about debugging code.", stream=True)
for chunk in stream:
    print(chunk, end="", flush=True)

# Access final accumulated response, token usage, and latency
print(f"\\nModel: {stream.response.model}")
print(f"Total tokens: {stream.response.usage.total_tokens}")
print(f"Time to first token: {stream.time_to_first_token_ms:.1f}ms")`,

  streamingAsync: `import asyncio
from evidor import Agent, GeminiProvider

async def main():
    agent = Agent(GeminiProvider(model="gemini-3.8-flash"))
    stream = await agent.send_async("Explain how event loops work.", stream=True)
    async for chunk in stream:
        print(chunk, end="", flush=True)

    print(f"\\nFinished with {stream.time_to_first_token_ms:.1f}ms TTFT")

asyncio.run(main())`,

  streamingTools: `from evidor import Agent, GeminiProvider, tool

@tool
def check_order_status(order_id: str) -> str:
    """Look up order shipping status."""
    return f"Order {order_id} is out for delivery."

agent = Agent(GeminiProvider(model="gemini-3.8-flash"), tools=[check_order_status])
stream = agent.send("Where is my order ORD-992?", stream=True)

for chunk in stream:
    # chunk.tool_calls contains fully validated ToolCall instances when a tool is invoked
    if chunk.tool_calls:
        for call in chunk.tool_calls:
            print(f"\\n[⚡ Executing tool: {call.name} with args {call.arguments}]")

    # Regular text tokens (arguments accumulate silently without polluting chunk.text)
    print(chunk, end="", flush=True)`,

  streamingThinking: `from evidor import Agent, AnthropicProvider

agent = Agent(AnthropicProvider(model="claude-3-7-sonnet-20250219", thinking=2048))
stream = agent.send("Solve: Which is greater, 9.11 or 9.9?", stream=True)

for chunk in stream:
    if chunk.thinking:
        print(f"\\033[90m{chunk.thinking}\\033[0m", end="", flush=True)  # Dim thinking text
    if chunk.text:
        print(chunk.text, end="", flush=True)`,

  streamingStateless: `from evidor import GenerationRequest, OpenAIProvider

provider = OpenAIProvider(model="gpt-6-astra")

request = GenerationRequest(
    prompt="Explain consensus in distributed systems.",
    stream=True,
)

# Synchronous streaming
stream = provider.generate(request)
for chunk in stream:
    print(chunk, end="", flush=True)

# Asynchronous streaming
# stream = await provider.generate_async(request)
# async for chunk in stream:
#     print(chunk, end="", flush=True)`,

  streamingContextManager: `from evidor import Agent, OpenAIProvider

agent = Agent(OpenAIProvider(model="gpt-6-astra"))

# Sync context manager ensures deterministic cleanup even on early break
with agent.send("List 5 facts about space.", stream=True) as stream:
    for chunk in stream:
        print(chunk, end="", flush=True)

# Async context manager
# async with await agent.send_async("List 5 facts about space.", stream=True) as stream:
#     async for chunk in stream:
#         print(chunk, end="", flush=True)

# Final accumulated response can also be retrieved via helper:
# final_response = stream.get_final_response()`,

  persistentConnectionPool: `import time
from evidor import Agent, OpenAIProvider

# Persistent connection pooling: internal daemon event loop reuses HTTP/2 connections
agent = Agent(OpenAIProvider(model="gpt-6-astra"))

# Turn 1: Establishes HTTP/2 TLS session
agent.send("Hello, initialize session.")

# Turn 2: Sockets and TLS state are preserved; 0ms handshake overhead
agent.send("Tell me a quick tip.")

# Clean shutdown
agent.close()`,

  statefulMultiTurn: `from evidor import Agent, OpenAIProvider

# Stateful conversations maintain context across turns automatically
agent = Agent(OpenAIProvider(model="gpt-6-astra"))

agent.send("My favorite color is navy blue.")
response = agent.send("What color did I say I like?")
print(response.text)  # "You said your favorite color is navy blue."`,

  systemPrompt: `from evidor import Agent, GeminiProvider

agent = Agent(
    GeminiProvider(model="gemini-3.8-flash"),
    system_prompt="You are a concise technical writer. Avoid buzzwords and respond in bullet points.",
)

response = agent.send("How does a TCP handshake work?")
print(response.text)`,

  nativeCompaction: `from evidor import Agent, OpenAIProvider, AnthropicProvider

# 1. OpenAI: Automatic server-side compaction
openai_agent = Agent(
    OpenAIProvider(model="gpt-6-astra", compact_threshold=100000)
)

# 2. Anthropic Claude: Threshold compaction with optional custom instructions
claude_agent = Agent(
    AnthropicProvider(
        model="claude-3-7-sonnet-20250219",
        compact_threshold=150000,
        compact_instructions="Focus on preserving key architecture decisions and code snippets.",
    )
)

# Compaction threshold can also be set directly on the Agent facade
agent = Agent(OpenAIProvider(model="gpt-6-astra"), compact_threshold=100000)`,

  inspectingState: `from evidor import Agent, OpenAIProvider

agent = Agent(OpenAIProvider(model="gpt-6-astra"))
agent.send("Hello!")

# Inspect provider context strategy ('response_chain', 'interaction_chain', 'stateless_replay')
print(agent.strategy)  # "response_chain"

# Inspect the latest provider response/interaction ID
print(agent.last_response_id)  # e.g. "resp_12345"

# Inspect message history captured during this session
for msg in agent.messages:
    print(f"{msg.role}: {msg.content}")

# Reset conversation state and provider response chain
agent.reset()  # or agent.clear_history()
print(agent.last_response_id)  # None`,

  statelessCalls: `from evidor import GenerationRequest, Message, OpenAIProvider

provider = OpenAIProvider(model="gpt-6-astra")

# Single-prompt shortcut
response = provider.generate(GenerationRequest(prompt="Explain Raft consensus in one paragraph."))
print(response.text)

# Multi-message request
request = GenerationRequest(
    messages=[
        Message(role="system", content="You are a distributed systems expert."),
        Message(role="user", content="What is quorum?"),
    ]
)
response = provider.generate(request)
print(response.text)`,

  userManagedHistory: `from evidor import GenerationRequest, Message, OpenAIProvider

# In stateless mode, the user maintains history and passes it explicitly
provider = OpenAIProvider(model="gpt-6-astra")
chat_history: list[Message] = [
    Message(role="system", content="You are a concise coding assistant."),
]

# Turn 1
chat_history.append(Message(role="user", content="Recommend a fast key-value store in Go."))
response = provider.generate(GenerationRequest(messages=chat_history))
chat_history.append(Message(role="assistant", content=response.text))

# Turn 2
chat_history.append(Message(role="user", content="Does it support persistence?"))
response = provider.generate(GenerationRequest(messages=chat_history))
chat_history.append(Message(role="assistant", content=response.text))
print(f"Assistant: {response.text}")`,

  statelessTools: `from evidor import GenerationRequest, Message, OpenAIProvider, Tool

tool_def = Tool(
    name="get_stock_price",
    description="Get current price for a stock ticker.",
    parameters={
        "type": "object",
        "properties": {"ticker": {"type": "string"}},
        "required": ["ticker"],
    },
    func=lambda ticker: f"\${ticker.upper()} is $150.00",
)

request = GenerationRequest(
    messages=[Message(role="user", content="What is the price of AAPL?")],
    tools=(tool_def,),
)
response = provider.generate(request)

if response.tool_calls:
    for call in response.tool_calls:
        print(f"Tool call requested: {call.name} with args {call.arguments}")`,

  thinkingConfig: `from evidor import (
    Agent,
    AnthropicProvider,
    AnthropicThinkingConfig,
    GeminiProvider,
    GeminiThinkingConfig,
    OpenAIProvider,
    OpenAIThinkingConfig,
)

# 1. OpenAI: Reasoning effort ('low', 'medium', 'high', 'xhigh', 'max')
provider = OpenAIProvider(model="gpt-6-astra", thinking="high")
# Or via typed config:
provider = OpenAIProvider(model="gpt-6-astra", thinking=OpenAIThinkingConfig(effort="high"))

# 2. Anthropic: Token budget or adaptive effort
# Shorthand int (budget_tokens >= 1024; auto-bumps max_tokens if needed):
provider = AnthropicProvider(model="claude-3-7-sonnet-20250219", thinking=4096)
# Or via typed config:
provider = AnthropicProvider(
    model="claude-3-7-sonnet-20250219",
    thinking=AnthropicThinkingConfig(budget_tokens=4096),
)

# 3. Gemini: Thinking level ('minimal', 'low', 'medium', 'high') or budget
provider = GeminiProvider(model="gemini-3.8-flash", thinking="high")
# Or via typed config:
provider = GeminiProvider(
    model="gemini-3.8-flash",
    thinking=GeminiThinkingConfig(thinking_level="high", include_thoughts=True),
)`,

  thinkingInspection: `from evidor import Agent, AnthropicProvider

agent = Agent(AnthropicProvider(model="claude-3-7-sonnet-20250219", thinking=2048))
response = agent.send("Solve this logic riddle step-by-step...")

# Visible text response
print(response.text)

# Model's internal reasoning scratchpad (if available)
if response.thinking:
    print(f"Reasoning Steps:\\n{response.thinking}")

# Reasoning tokens recorded in usage metadata
if response.usage and response.usage.reasoning_tokens:
    print(f"Reasoning tokens consumed: {response.usage.reasoning_tokens}")`,

  asyncAgent: `import asyncio
from evidor import Agent, OpenAIProvider, tool

@tool
async def lookup_account(account_id: str) -> dict:
    return {"id": account_id, "status": "active"}

async def main() -> None:
    # Async-first execution engine: runs natively on caller event loop
    async with Agent(OpenAIProvider(model="gpt-4.1-mini"), tools=[lookup_account]) as agent:
        response = await agent.send_async("Check status for account 1234")
        print(response.text)

asyncio.run(main())`,

  concurrentTools: `import asyncio
from evidor import Agent, OpenAIProvider, tool

@tool
async def fetch_user(user_id: str) -> dict:
    await asyncio.sleep(0.1)
    return {"id": user_id, "name": "Alice"}

@tool
async def fetch_orders(user_id: str) -> list[str]:
    await asyncio.sleep(0.1)
    return ["order-101", "order-102"]

# When the LLM emits multiple tool calls in a single turn,
# Evidor executes them concurrently via asyncio.gather()
async def main():
    async with Agent(OpenAIProvider("gpt-4.1-mini"), tools=[fetch_user, fetch_orders]) as agent:
        response = await agent.send_async("Look up user 42 and their recent orders.")
        print(response.text)

asyncio.run(main())`,

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

  toolsQuickstart: `from evidor import Agent, GeminiProvider, tool

@tool
def search_database(query: str) -> list[str]:
    """Search internal records by keyword."""
    return [f"Record 1 matching '{query}'", f"Record 2 matching '{query}'"]

agent = Agent(
    GeminiProvider(model="gemini-3.8-flash"),
    tools=[search_database],
    max_tool_iterations=10,  # Maximum tool execution turns per send() (default: 10)
)

response = agent.send("Can you check our records for 'alpha project'?")
print(response.text)`,

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
    GeminiProvider(model="gemini-3.8-flash"),
    tools=[fetch_webpage],
    tool_timeout=10.0,      # Default tool timeout in seconds
    max_tool_iterations=10, # Max tool turns before forcing final synthesis
)`,

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

  webpageReader: `from evidor import Agent, OpenAIProvider, read_webpage, read_webpage_tool

# Ready-to-use default tool (strips HTML boilerplate, bounded to 15,000 chars)
agent = Agent(OpenAIProvider(model="gpt-4.1-mini"), tools=[read_webpage])

# Or customized with explicit character and timeout limits
custom_reader = read_webpage_tool(max_chars=8_000, timeout=10.0)`,

  evidenceStore: `from evidor import Agent, EvidenceStore, GeminiProvider

store = EvidenceStore()

# store.tools provides record_evidence, list_evidence, and compare_evidence
agent = Agent(GeminiProvider(model="gemini-3.8-flash"), tools=[*store.tools])
agent.send("Analyze trade-offs between PostgreSQL and SQLite and record your findings.")

# Inspect structured findings in Python or format as Markdown
print(store.to_markdown())
for item in store.items:
    print(f"[{item.id}] {item.topic}: {item.finding}")`,

  mcpQuickstart: `from evidor import Agent, OpenAIProvider

# Connect to external MCP server (e.g. AWS Bedrock, Amazon search)
agent = Agent(
    OpenAIProvider(model="gpt-4.1-mini"),
    mcp_servers={
        "amazon": {
            "command": "uvx",
            "args": ["amazon-mcp-server"],
            "env": {"AWS_PROFILE": "default"},
        }
    },
)

# Tools exposed by MCP server are automatically discovered and executed
response = agent.send("Search for Kindle Paperwhite on Amazon and summarize reviews.")
print(response.text)
agent.close()`,

  mcpRemote: `from evidor import Agent, GeminiProvider, MCPServerConfig

# Connect multiple MCP servers (local stdio, Streamable HTTP, and legacy SSE)
agent = Agent(
    GeminiProvider(model="gemini-3.8-flash"),
    mcp_servers=[
        # Stdio subprocess
        MCPServerConfig.stdio(name="amazon", command="uvx", args=["amazon-mcp-server"]),
        # Remote Streamable HTTP server (recommended standard for hosted MCP)
        MCPServerConfig.http(
            name="inventory",
            url="https://inventory.internal/mcp",
            headers={"Authorization": "Bearer secret-token"},
        ),
        # Legacy SSE server
        MCPServerConfig.sse(name="weather", url="http://localhost:8080/sse"),
    ],
)

response = agent.send("Check warehouse stock and recommend hiking boots.")
print(response.text)
agent.close()`,

  sharedMcp: `from evidor import Agent, MCPClient, OpenAIProvider

# Boot a single shared MCP client across multiple agents (e.g. FastAPI backends)
shared_mcp = MCPClient.from_file("claude_desktop_config.json")
shared_mcp.connect()

# Both agents reuse the exact same client without duplicating subprocesses:
researcher = Agent(OpenAIProvider("gpt-4.1-mini"), mcp_client=shared_mcp)
assistant = Agent(OpenAIProvider("gpt-4.1-mini"), mcp_client=shared_mcp)

res1 = researcher.send("Search records for client ABC.")
res2 = assistant.send("Verify credentials for client ABC.")
shared_mcp.close()`,

  standaloneMcp: `import asyncio
from evidor import Agent, MCPClient, OpenAIProvider, tool

@tool
def internal_calculator(x: int, y: int) -> int:
    return x * y

async def main():
    async with MCPClient({"amazon": {"command": "uvx", "args": ["amazon-mcp-server"]}}) as mcp:
        # Retrieve all Evidor Tool objects from the MCP server
        mcp_tools = await mcp.get_tools_async()

        # Combine MCP tools with local tools
        agent = Agent(OpenAIProvider("gpt-4.1-mini"), tools=[*mcp_tools, internal_calculator])
        response = await agent.send_async("Calculate total price for 3 units of item B08N5WRWNW.")
        print(response.text)

asyncio.run(main())`,

  telemetryOtel: `from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor, ConsoleSpanExporter
from evidor import Agent, OpenAIProvider, OpenTelemetrySink

provider = TracerProvider()
provider.add_span_processor(BatchSpanProcessor(ConsoleSpanExporter()))
trace.set_tracer_provider(provider)

# Non-blocking telemetry (<1µs latency on agent thread) via dedicated worker
otel_sink = OpenTelemetrySink(tracer_provider=provider)
agent = Agent(OpenAIProvider("gpt-4.1-mini"), telemetry=otel_sink)

response = agent.send("Search the documentation for vector embeddings.")
agent.close()`,

  telemetryLangfuse: `from evidor import Agent, OpenAIProvider, LangfuseSink

# Traces agent execution, latency, and tokens to Langfuse
langfuse_sink = LangfuseSink()  # Reads credentials from environment
agent = Agent(OpenAIProvider("gpt-4.1-mini"), telemetry=langfuse_sink)

response = agent.send("Summarize the quarterly earnings report.")
agent.close()  # Flushes queues and terminates background worker`,

  telemetryThinking: `from evidor import Agent, AnthropicProvider
from evidor.telemetry import ConsoleSink, OpenTelemetrySink, PhoenixSink, LangfuseSink

# Enable intermediate thinking visibility on any sink (default: capture_thinking=False)
console_sink = ConsoleSink(capture_content=True, capture_thinking=True)
otel_sink = OpenTelemetrySink(capture_content=True, capture_thinking=True)
phoenix_sink = PhoenixSink(capture_content=True, capture_thinking=True)
langfuse_sink = LangfuseSink(capture_content=True, capture_thinking=True)

agent = Agent(
    AnthropicProvider(model="claude-3-7-sonnet-20250219", thinking=2048),
    telemetry=[console_sink, phoenix_sink],
)
response = agent.send("Analyze system security risks...")
agent.close()`,

  telemetryPrivacy: `from evidor import Agent, OpenAIProvider
from evidor.telemetry import OpenTelemetrySink, LangfuseSink

# Metadata-only mode: preserves trace trees, latency, and tokens,
# but omits/redacts all raw prompt text, LLM outputs, and tool arguments.
otel_sink = OpenTelemetrySink(capture_content=False)
langfuse_sink = LangfuseSink(capture_content=False)

agent = Agent(
    OpenAIProvider("gpt-4.1-mini"),
    telemetry=[otel_sink, langfuse_sink],
)
response = agent.send("Sensitive patient record or financial data...")
agent.close()`,

  customProvider: `from evidor import GenerationRequest, GenerationResponse, ModelProvider

class CustomAsyncProvider(ModelProvider):
    """Implements the Evidor ModelProvider protocol with async-first support."""
    def __init__(self, model: str = "custom-model") -> None:
        self.model = model

    def with_model(self, model: str) -> "CustomAsyncProvider":
        return CustomAsyncProvider(model=model)

    async def generate_async(self, request: GenerationRequest) -> GenerationResponse:
        # Asynchronously call custom model backend
        prompt_text = request.prompt
        return GenerationResponse(text="Custom async response", model=self.model)`,
};
