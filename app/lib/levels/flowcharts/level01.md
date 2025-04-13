graph TD
    Client -->|Request| Server;
    Server -->|API Request (message)| OpenAI;
    OpenAI -->|API Response| Server;
    Server -->|Response| Client;

    classDef clientStyle fill:#f96,stroke:#333,stroke-width:2px;
    classDef serverStyle fill:#333,stroke:#ccc,stroke-width:2px,color:#fff;
    classDef externalStyle fill:#99f,stroke:#333,stroke-width:2px;

    class Client clientStyle;
    class Server serverStyle;
    class OpenAI externalStyle;
