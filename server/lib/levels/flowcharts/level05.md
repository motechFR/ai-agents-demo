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
        WalletIntegration["Wallet Integration"]
        TransactionService["Transaction Service"]
        
        APIHandler -- "Forwards request" --> LLMClient
        LLMClient -- "Reads" --> SystemPrompt
        LLMClient -- "Query wallet" --> WalletIntegration
        LLMClient -- "Execute transaction" --> TransactionService
    end

    subgraph External Services
        OpenAI
        CryptoAPI["Crypto Price API"]
        Blockchain["Blockchain"]
    end

    Client -- "Request" --> APIHandler
    LLMClient -- "API Request (message + system prompt)" --> OpenAI
    OpenAI -- "API Response" --> LLMClient
    LLMClient -- "Request price data" --> CryptoAPI
    CryptoAPI -- "Price data" --> LLMClient
    WalletIntegration -- "Connect wallet" --> Client
    TransactionService -- "Submit transaction" --> Blockchain
    Blockchain -- "Confirmation" --> TransactionService
    TransactionService -- "Transaction result" --> LLMClient
    LLMClient -- "Response" --> APIHandler
    APIHandler -- "Response" --> Client

    classDef clientStyle fill:#f96,stroke:#333,stroke-width:2px;
    classDef serverStyle fill:#333,stroke:#ccc,stroke-width:2px,color:#fff;
    classDef externalStyle fill:#99f,stroke:#333,stroke-width:2px;
    classDef historyStyle fill:#fc9,stroke:#333,stroke-width:2px;
    classDef blockchainStyle fill:#9f9,stroke:#333,stroke-width:2px;

    class Client clientStyle;
    class APIHandler,LLMClient,SystemPrompt,WalletIntegration,TransactionService serverStyle;
    class OpenAI,CryptoAPI externalStyle;
    class ConversationHistory historyStyle;
    class Blockchain blockchainStyle; 