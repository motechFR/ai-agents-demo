graph TD
    subgraph Client Layer
        ConversationHistory[("Conversation History")]
        Client
        Client -- "Updates" --> ConversationHistory
        ConversationHistory -- "Reads" --> Client
    end

    subgraph Server Layer
        APIHandler["API Handler"]
        UIAgent["User Interface Agent"]
        SystemPrompt["System Prompt"]
        
        APIHandler -- "Forwards request" --> UIAgent
        UIAgent -- "Reads" --> SystemPrompt
    end

    subgraph Autonomous Agent System
        PortfolioAgent["Portfolio Management Agent"]
        RiskAgent["Risk Management Agent"]
        MarketAgent["Market Analysis Agent"]
        TradeAgent["Trade Execution Agent"]
        
        PortfolioData[("Portfolio Data")]
        MarketData[("Market Data")]
        
        UIAgent -- "Portfolio request" --> PortfolioAgent
        PortfolioAgent -- "Portfolio info" --> UIAgent
        
        UIAgent -- "Risk assessment" --> RiskAgent
        RiskAgent -- "Risk report" --> UIAgent
        
        UIAgent -- "Market analysis" --> MarketAgent
        MarketAgent -- "Market analysis" --> UIAgent
        
        UIAgent -- "Trade request" --> TradeAgent
        TradeAgent -- "Execution report" --> UIAgent
        
        PortfolioAgent -- "Read/Update" --> PortfolioData
        RiskAgent -- "Enforce constraints" --> PortfolioData
        MarketAgent -- "Read/Update" --> MarketData
        
        PortfolioAgent <--> RiskAgent
        PortfolioAgent <--> MarketAgent
        RiskAgent <--> TradeAgent
    end

    subgraph External Services
        OpenAI
        CryptoAPIs["Crypto Data APIs"]
        DEXs["Decentralized Exchanges"]
        CEXs["Centralized Exchanges"]
        WalletService["Wallet Service"]
        Blockchain["Multiple Blockchains"]
    end

    Client -- "Request" --> APIHandler
    UIAgent -- "API Request (message + system prompt)" --> OpenAI
    OpenAI -- "API Response" --> UIAgent
    
    MarketAgent -- "Market data" --> CryptoAPIs
    CryptoAPIs -- "Price/Volume data" --> MarketAgent
    
    TradeAgent -- "DEX trading" --> DEXs
    TradeAgent -- "CEX trading" --> CEXs
    DEXs -- "Trade execution" --> TradeAgent
    CEXs -- "Trade execution" --> TradeAgent
    
    TradeAgent -- "Connect wallet" --> WalletService
    WalletService -- "Execute transaction" --> Blockchain
    Blockchain -- "Confirmation" --> WalletService
    WalletService -- "Transaction result" --> TradeAgent
    
    UIAgent -- "Response" --> APIHandler
    APIHandler -- "Response" --> Client

    classDef clientStyle fill:#f96,stroke:#333,stroke-width:2px;
    classDef serverStyle fill:#333,stroke:#ccc,stroke-width:2px,color:#fff;
    classDef externalStyle fill:#99f,stroke:#333,stroke-width:2px;
    classDef historyStyle fill:#fc9,stroke:#333,stroke-width:2px;
    classDef agentStyle fill:#f99,stroke:#333,stroke-width:2px;
    classDef dataStyle fill:#9cf,stroke:#333,stroke-width:2px;
    classDef walletStyle fill:#9cf,stroke:#333,stroke-width:2px;
    classDef blockchainStyle fill:#9f9,stroke:#333,stroke-width:2px;
    classDef exchangeStyle fill:#fc3,stroke:#333,stroke-width:2px;

    class Client clientStyle;
    class APIHandler,UIAgent,SystemPrompt serverStyle;
    class OpenAI,CryptoAPIs externalStyle;
    class ConversationHistory historyStyle;
    class PortfolioAgent,RiskAgent,MarketAgent,TradeAgent agentStyle;
    class PortfolioData,MarketData dataStyle;
    class WalletService walletStyle;
    class Blockchain blockchainStyle;
    class DEXs,CEXs exchangeStyle; 