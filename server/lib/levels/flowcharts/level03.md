```mermaid
graph TD
    subgraph Client Layer
        ConversationHistory[("Conversation History")]
        Client
        Client -- "Updates" --> ConversationHistory
        ConversationHistory -- "Reads" --> Client
    end

    subgraph Server Layer
        APIHandler["API Handler"]
    end
    
    subgraph Agent
        MessageHandler["Message Handler"]
        SystemPrompt["System Prompt"]
        LLMClient["LLM API Client"]
        
        subgraph Models
            OpenAI["OpenAI"]
        end
        
        MessageHandler -- "Retrieves" --> SystemPrompt
        MessageHandler -- "Calls" --> LLMClient
        LLMClient -- "API Request (message + system prompt)" --> OpenAI
        OpenAI -- "API Response" --> LLMClient
        LLMClient -- "Returns response" --> MessageHandler
    end

    Client -- "Request" --> APIHandler
    APIHandler -- "Forwards request" --> MessageHandler
    MessageHandler -- "Returns response" --> APIHandler
    APIHandler -- "Response" --> Client


    classDef clientStyle fill:#f96,stroke:#333,stroke-width:2px;
    classDef serverStyle fill:#333,stroke:#ccc,stroke-width:2px,color:#fff;
    classDef externalStyle fill:#99f,stroke:#333,stroke-width:2px;
    classDef historyStyle fill:#fc9,stroke:#333,stroke-width:2px;
    classDef agentStyle fill:#6c9,stroke:#333,stroke-width:2px;
    classDef modelStyle fill:#c9f,stroke:#333,stroke-width:2px;

    class Client clientStyle;
    class APIHandler serverStyle;
    class MessageHandler,SystemPrompt,LLMClient agentStyle;
    class OpenAI modelStyle;
    class ConversationHistory historyStyle;
```