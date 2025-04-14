graph TD
    subgraph Client Layer
        ConversationHistory[("Conversation History")]
        Client
        Client -- "Updates" --> ConversationHistory
        ConversationHistory -- "Reads" --> Client
    end

    subgraph Server Layer
        APIHandler["API Handler"]
        PrimaryAgent["Primary Conversational Agent"]
        SystemPrompt["System Prompt"]
        
        APIHandler -- "Forwards request" --> PrimaryAgent
        PrimaryAgent -- "Reads" --> SystemPrompt
    end

    subgraph Multi-Agent System
        SecurityAgent["Security Agent"]
        RiskAgent["Risk Assessment Agent"]
        MarketAgent["Market Data Agent"]
        TransactionSimulator["Transaction Simulator"]
        
        PrimaryAgent -- "Trade request" --> SecurityAgent
        SecurityAgent -- "Security report" --> PrimaryAgent
        PrimaryAgent -- "Risk assessment" --> RiskAgent
        RiskAgent -- "Risk report" --> PrimaryAgent
        PrimaryAgent -- "Market data request" --> MarketAgent
        MarketAgent -- "Market data" --> PrimaryAgent
        PrimaryAgent -- "Simulate transaction" --> TransactionSimulator
        TransactionSimulator -- "Simulation results" --> PrimaryAgent
    end

    subgraph External Services
        OpenAI
        CryptoAPI["Crypto Price API"]
        BlockchainContracts["Blockchain Smart Contracts"]
        WalletService["Wallet Service"]
        Blockchain["Blockchain"]
    end

    Client -- "Request" --> APIHandler
    PrimaryAgent -- "API Request (message + system prompt)" --> OpenAI
    OpenAI -- "API Response" --> PrimaryAgent
    
    MarketAgent -- "Request price data" --> CryptoAPI
    CryptoAPI -- "Price data" --> MarketAgent
    SecurityAgent -- "Verify contracts" --> BlockchainContracts
    BlockchainContracts -- "Verification result" --> SecurityAgent
    
    PrimaryAgent -- "Approved transaction" --> WalletService
    WalletService -- "Execute transaction" --> Blockchain
    Blockchain -- "Confirmation" --> WalletService
    WalletService -- "Transaction result" --> PrimaryAgent
    
    PrimaryAgent -- "Response" --> APIHandler
    APIHandler -- "Response" --> Client

    classDef clientStyle fill:#f96,stroke:#333,stroke-width:2px;
    classDef serverStyle fill:#333,stroke:#ccc,stroke-width:2px,color:#fff;
    classDef externalStyle fill:#99f,stroke:#333,stroke-width:2px;
    classDef historyStyle fill:#fc9,stroke:#333,stroke-width:2px;
    classDef agentStyle fill:#f99,stroke:#333,stroke-width:2px;
    classDef walletStyle fill:#9cf,stroke:#333,stroke-width:2px;
    classDef blockchainStyle fill:#9f9,stroke:#333,stroke-width:2px;

    class Client clientStyle;
    class APIHandler,PrimaryAgent,SystemPrompt serverStyle;
    class OpenAI,CryptoAPI externalStyle;
    class ConversationHistory historyStyle;
    class SecurityAgent,RiskAgent,MarketAgent,TransactionSimulator agentStyle;
    class WalletService walletStyle;
    class Blockchain,BlockchainContracts blockchainStyle; 