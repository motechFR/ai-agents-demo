```mermaid
graph TD
    subgraph Client Layer
        ConversationHistory[("Conversation History")]
        Client["Client / UI Renderer"]
        APIClient["API Client"]
        ConversationId["Conversation ID"]
        MicroUI["Micro UI Components"]
        
        Client -- "Reads" --> ConversationId
        Client -- "Updates" --> ConversationHistory
        ConversationHistory -- "Reads" --> Client
        Client -- "Renders" --> MicroUI
        MicroUI -- "Based on" --> ConversationHistory
    end

    subgraph Server Layer
        APIHandler["API Handler"]
        UIAgent["User Interface Agent"]

        
        APIHandler -- "Forwards request" --> UIAgent

        ConversationHistoryEndpoint["Conversation History Endpoint"]
        ConversationHistoryEndpoint -- "Conversation Data" --> ConversationHistory
        ConversationHistoryEndpoint -- "Forwards Request" --> APIHandler
        UIAgent -- "Updates" --> ConversationHistoryEndpoint
        APIHandler -- "Response" --> APIClient

        APIClient -- "Forwards requests" --> APIHandler
        APIClient -- "Sends Conversation ID" --> ConversationHistoryEndpoint
    end

    subgraph Autonomous Agent System
        PortfolioAgent["Portfolio Management Agent"]
        RiskAgent["Risk Management Agent"]
        MarketAgent["Market Analysis Agent"]
        TradeAgent["Trade Execution Agent"]
        SecurityAgent["Security Agent"]
        
        UIAgent -- "Portfolio request" --> PortfolioAgent
        PortfolioAgent -- "Portfolio info" --> UIAgent
        
        UIAgent -- "Risk assessment" --> RiskAgent
        RiskAgent -- "Risk report" --> UIAgent
        
        UIAgent -- "Market analysis" --> MarketAgent
        MarketAgent -- "Market analysis" --> UIAgent
        
        UIAgent -- "Trade request" --> TradeAgent
        TradeAgent -- "Execution report" --> UIAgent
        
        PortfolioAgent <--> RiskAgent
        PortfolioAgent <--> MarketAgent
        RiskAgent <--> TradeAgent
    end

    subgraph External Services
        CryptoAPIs["Crypto Data APIs"]
        DEXs["Decentralized Exchanges"]
        CEXs["Centralized Exchanges"]
        WalletService["Wallet Service"]
        Blockchain["Multiple Blockchains"]
    end

    subgraph Data Layer

        subgraph Database Layer
            DataAccessLayer["Data Access Layer"]
            PostgreSQL[("PostgreSQL")]
            Pinecone[("Pinecone Vector DB")]
            MongoDB[("MongoDB")]
            Redis[("Redis Cache")]
            
            DataAccessLayer -- "SQL Queries" --> PostgreSQL
            DataAccessLayer -- "Vector Embeddings" --> Pinecone
            DataAccessLayer -- "Document Operations" --> MongoDB
            DataAccessLayer -- "Cache Operations" --> Redis
            ConversationHistoryEndpoint -- "Stores Conversation" --> DataAccessLayer
        end

        subgraph Workplace
            Notion["Notion"]
            Slack["Slack"]
            MicrosoftWord["Microsoft Word"]
            GoogleDrive["Google Drive"]
            
            DataAccessLayer -- "Store Knowledge Base" --> Notion
            DataAccessLayer -- "Store Communication" --> Slack
            DataAccessLayer -- "Store Documents" --> MicrosoftWord
            DataAccessLayer -- "Store Files" --> GoogleDrive
            
            Notion -- "Retrieve Data" --> DataAccessLayer
            Slack -- "Retrieve Messages" --> DataAccessLayer
            MicrosoftWord -- "Retrieve Documents" --> DataAccessLayer
            GoogleDrive -- "Retrieve Files" --> DataAccessLayer
        end
    end

    subgraph Workflows
        subgraph NewOpportunitiesWorkflow
            Step1["Step 1: Track new token listings on base"]
            Step2["Step 2: Pull down smart contracts"]
            Step3["Step 3: Analyse against security parameters"]
            Step4["Step 4: Discard or add to watch list"]
            Step5["Step 5: Monitor evolutions in volume and price"]
            Step6["Step 6: Surface investment decision"]
            
            Step1 --> Step2
            Step2 --> Step3
            Step3 --> Step4
            Step4 --> Step5
            Step5 --> Step6
            
            Step1 -- "Uses" --> MarketAgent
            Step2 -- "Uses" --> DataAccessLayer
            Step3 -- "Uses" --> SecurityAgent
            Step4 -- "Uses" --> DataAccessLayer
            Step5 -- "Uses" --> StatisticalModel["Statistical Model"]
            Step6 -- "Uses" --> TradeAgent
        end

        subgraph PortfolioManagementWorkflow
            PMStep1["Step 1: Review portfolio"]
            PMStep2["Step 2: Analyse risk"]
            PMStep3["Step 3: Review market"]
            PMStep4["Step 4: Review trades"]
            PMStep5["Step 5: Take profits and stop losses"]

            PMStep1 --> PMStep2
            PMStep2 --> PMStep3
            PMStep3 --> PMStep4
            PMStep4 --> PMStep5

            PMStep1 -- "Uses" --> PortfolioAgent
            PMStep2 -- "Uses" --> RiskAgent
            PMStep3 -- "Uses" --> MarketAgent
            PMStep4 -- "Uses" --> DataAccessLayer
            PMStep5 -- "Uses" --> TradeAgent
        end
        
    end

    Client -- "Request" --> APIClient
    
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

    PortfolioAgent -- "Data Access" --> DataAccessLayer
    RiskAgent -- "Data Access" --> DataAccessLayer
    MarketAgent -- "Data Access" --> DataAccessLayer
    TradeAgent -- "Data Access" --> DataAccessLayer
    UIAgent -- "Data Access" --> DataAccessLayer
    SecurityAgent -- "Data Access" --> DataAccessLayer
    StatisticalModel -- "Data Access" --> DataAccessLayer

    classDef clientStyle fill:#f96,stroke:#333,stroke-width:2px;
    classDef serverStyle fill:#333,stroke:#ccc,stroke-width:2px,color:#fff;
    classDef externalStyle fill:#99f,stroke:#333,stroke-width:2px;
    classDef historyStyle fill:#fc9,stroke:#333,stroke-width:2px;
    classDef agentStyle fill:#f99,stroke:#333,stroke-width:2px;
    classDef dataStyle fill:#9cf,stroke:#333,stroke-width:2px;
    classDef walletStyle fill:#9cf,stroke:#333,stroke-width:2px;
    classDef blockchainStyle fill:#9f9,stroke:#333,stroke-width:2px;
    classDef exchangeStyle fill:#fc3,stroke:#333,stroke-width:2px;
    classDef databaseStyle fill:#6c9,stroke:#333,stroke-width:2px;
    classDef dataLayerStyle fill:#69c,stroke:#333,stroke-width:2px;
    classDef workplaceStyle fill:#c9f,stroke:#333,stroke-width:2px;
    classDef workflowStyle fill:#f9c,stroke:#333,stroke-width:2px;
    classDef modelStyle fill:#9fc,stroke:#333,stroke-width:2px;

    class Client,APIClient,MicroUI clientStyle;
    class APIHandler,UIAgent,SystemPrompt,ConversationHistoryEndpoint serverStyle;
    class ConversationHistory,ConversationId historyStyle;
    class PortfolioAgent,RiskAgent,MarketAgent,TradeAgent,SecurityAgent agentStyle;
    class PortfolioData,MarketData dataStyle;
    class WalletService walletStyle;
    class Blockchain blockchainStyle;
    class DEXs,CEXs exchangeStyle;
    class PostgreSQL,Pinecone,MongoDB,Redis databaseStyle;
    class DataAccessLayer dataLayerStyle;
    class Notion,Slack,MicrosoftWord,GoogleDrive workplaceStyle;
    class Step1,Step2,Step3,Step4,Step5,Step6 workflowStyle;
    class StatisticalModel modelStyle; 