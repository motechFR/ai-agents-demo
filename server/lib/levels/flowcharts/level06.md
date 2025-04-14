graph TD
    subgraph Client Layer
        ConversationHistory[("Conversation History")]
        Client
        Client -- "Updates" --> ConversationHistory
        ConversationHistory -- "Reads" --> Client
    end

    subgraph Server Layer
        APIHandler["API Handler"]
        LLMClient["LLM API Client"]
        SystemPrompt["System Prompt"]
        
        APIHandler -- "Forwards request" --> LLMClient
        LLMClient -- "Reads" --> SystemPrompt
    end

    subgraph Backend Agent System
        IndexingAgent["Token Indexing Agent"]
        DataStore[("Persistent Data Store")]
        NewsAgent["News Aggregator Agent"]
        MarketAgent["Market Coverage Agent"]
        
        IndexingAgent -- "Store token data" --> DataStore
        NewsAgent -- "Store news data" --> DataStore
        MarketAgent -- "Store market data" --> DataStore
        LLMClient -- "Query data" --> DataStore
    end

    subgraph External Services
        OpenAI
        BlockchainNodes["Multiple Blockchain Nodes"]
        NewsAPI["News API Sources"]
        SocialAPI["Social Media API"]
    end

    Client -- "Request" --> APIHandler
    LLMClient -- "API Request (message + system prompt)" --> OpenAI
    OpenAI -- "API Response" --> LLMClient
    
    IndexingAgent -- "Index tokens" --> BlockchainNodes
    NewsAgent -- "Gather news" --> NewsAPI
    MarketAgent -- "Analyze sentiment" --> SocialAPI
    
    LLMClient -- "Response" --> APIHandler
    APIHandler -- "Response" --> Client

    classDef clientStyle fill:#f96,stroke:#333,stroke-width:2px;
    classDef serverStyle fill:#333,stroke:#ccc,stroke-width:2px,color:#fff;
    classDef externalStyle fill:#99f,stroke:#333,stroke-width:2px;
    classDef historyStyle fill:#fc9,stroke:#333,stroke-width:2px;
    classDef agentStyle fill:#f99,stroke:#333,stroke-width:2px;
    classDef dataStoreStyle fill:#9cf,stroke:#333,stroke-width:2px;

    class Client clientStyle;
    class APIHandler,LLMClient,SystemPrompt serverStyle;
    class OpenAI,BlockchainNodes,NewsAPI,SocialAPI externalStyle;
    class ConversationHistory historyStyle;
    class IndexingAgent,NewsAgent,MarketAgent agentStyle;
    class DataStore dataStoreStyle; 