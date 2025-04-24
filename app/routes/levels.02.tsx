import { json, useLoaderData } from "@remix-run/react";
import { v4 as uuidv4 } from 'uuid';
import { Message } from "~/components/widgets/ChatHistory";
import { requestChatCompletion } from 'server/lib/requestChatCompletion';
import { LevelLayout } from "~/components/LevelLayout";

export async function action({ request }: { request: Request }) {
    const {message, history} = await request.json();

    const chatCompletion = await requestChatCompletion({
        messages: [...history.map((m: Message) => ({
            role: m.sender,
            content: m.content,
        })), {
            role: 'user',
            content: message as string,
        }],
    });

    const responseMessage: Message = {
        id: uuidv4(),
        content: chatCompletion.choices[0].message.content as string,
        sender: 'assistant',
        timestamp: new Date(),
    }

    return json({ message: responseMessage });
}

export async function loader() {
    // @ts-ignore
    const content = await import('/server/lib/levels/flowcharts/level02.md');
    return {
        content: (content as any as {markdown: string}).markdown,
    };
}

export default function Level02() {
    const { content } = useLoaderData<typeof loader>();

    const initialMessages: Message[] = [{
        id: '1',
        content: 'Which cryptocurrency should I invest in?',
        sender: 'user',
        timestamp: new Date(Date.now() - 3000),
    }, {
        "id": "b594776b-6d2f-46af-abef-7fa34eefded8",
        "content": "I'm not a financial advisor, so I can't provide specific investment recommendations. However, I can suggest some general factors to consider when researching cryptocurrencies:\n\n1. **Market Cap**: Look for cryptocurrencies with a solid market capitalization. Larger market cap coins tend to be less volatile.\n\n2. **Use Case**: Understand the purpose of the cryptocurrency. What problem does it solve? Does it have real-world applications?\n\n3. **Technology**: Evaluate the underlying technology. Is it innovative? Is it scalable? What are its security features?\n\n4. **Development Team**: Research the team behind the cryptocurrency. A strong, experienced team can often lead to greater adoption and success.\n\n5. **Community and Adoption**: A strong community and growing adoption can be indicators of a cryptocurrency's potential for long-term success.\n\n6. **Regulatory Environment**: Consider the legal status of the cryptocurrency in your country, as regulatory changes can impact its value.\n\n7. **Diversification**: Avoid putting all your funds into one cryptocurrency. Diversifying your investments can help manage risk.\n\n8. **Stay Informed**: Keep up with the latest news and trends in the cryptocurrency space, as the market can shift rapidly.\n\nBefore investing, it's essential to do thorough research and only invest what you can afford to lose.",
        sender: 'assistant',
        timestamp: new Date(),
    }];

    const suggestedMessages = ['What did you just say?'];

    return (
        <LevelLayout 
            levelNumber={2}
            mermaidJsChart={content}
            initialMessages={initialMessages}
            suggestedMessages={suggestedMessages}
        />
    );
}