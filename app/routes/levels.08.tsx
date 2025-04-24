import { useLoaderData } from "@remix-run/react";
import { LevelLayout } from "~/components/LevelLayout";


export async function loader() {
    // @ts-ignore
    const content = await import('/server/lib/levels/flowcharts/level08.md');
    return {
        content: (content as any as {markdown: string}).markdown,
    };

}

export default function Level08() {
    const { content } = useLoaderData<typeof loader>();


    return (
        <LevelLayout 
            levelNumber={8}
            mermaidJsChart={content}
            enabledModes={['mermaid']}
        />
    );
} 