import { useLoaderData } from "@remix-run/react";
import { MermaidJS } from "~/components/widgets/MermaidJS";
import { getLevel } from "~/lib/levels/definitions";

const level1Definition = getLevel(1);

export async function loader() {
    // @ts-ignore
    const content = await import('/app/lib/levels/flowcharts/level01.md');
    return {
        content: (content as any as {markdown: string}).markdown,
    };
}

export default function Level01() {

    const { content } = useLoaderData<typeof loader>();
    return (
        <div>
            <h1>Level 01</h1>
            <MermaidJS content={content} />
        </div>
    );
}