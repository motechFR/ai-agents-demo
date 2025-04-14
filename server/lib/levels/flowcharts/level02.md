```mermaid
graph TD
    subgraph Client Layer
        ConversationHistory[("Conversation History")]
        Client
        Client -- "Updates" --> ConversationHistory
        ConversationHistory -- "Reads" --> Client
    end

    subgraph Server Layer
        APIHandler["API Request Handler"]
        LLMClient["LLM API Client"]
        APIHandler -- "Forwards request" --> LLMClient
    end

    subgraph External Services
        OpenAI
    end

    Client -- "Request" --> APIHandler
    LLMClient -- "API Request (message)" --> OpenAI
    OpenAI -- "API Response" --> LLMClient
    LLMClient -- "Response" --> APIHandler
    APIHandler -- "Response" --> Client

    classDef clientStyle fill:#f96,stroke:#333,stroke-width:2px;
    classDef serverStyle fill:#333,stroke:#ccc,stroke-width:2px,color:#fff;
    classDef externalStyle fill:#99f,stroke:#333,stroke-width:2px;
    classDef historyStyle fill:#fc9,stroke:#333,stroke-width:2px;

    class Client clientStyle;
    class APIHandler,LLMClient serverStyle;
    class OpenAI externalStyle;
    class ConversationHistory historyStyle;
```