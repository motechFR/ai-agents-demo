import type { DemoLevel } from './types';

import fs from 'node:fs';
import path from 'node:path';

export const level01: DemoLevel = {
    level: 1,
    title: 'Basic LLM',
    description: 'This is the first level of the demo',
    mermaidJsFlowchart: fs.readFileSync(path.resolve('app/lib/levels/flowcharts', 'level01.md'), 'utf8'),
}

export const level02: DemoLevel = {
    level: 2,
    title: 'Agent with Context',
    description: 'Adds short-term memory to maintain conversation relevance',
    mermaidJsFlowchart: undefined,
}

export const level03: DemoLevel = {
    level: 3,
    title: 'Agent with Context and System Prompt',
    description: 'Uses a persistent system prompt to guide behavior and tone',
    mermaidJsFlowchart: undefined,
}

export const level04: DemoLevel = {
    level: 4,
    title: 'Agent with Context and Read-Only Tools',
    description: 'Agent can query live crypto prices and view historical trends',
    mermaidJsFlowchart: undefined,
}

export const level05: DemoLevel = {
    level: 5,
    title: 'Agent with Context, Write Access, and Wallet Integration',
    description: 'Agent can execute trades and interact with blockchain via wallet',
    mermaidJsFlowchart: undefined,
}

export const level06: DemoLevel = {
    level: 6,
    title: 'Agent with Persistent Data and Market Coverage',
    description: 'Backend agent indexes tokens and maintains real-time market view',
    mermaidJsFlowchart: undefined,
}

export const level07: DemoLevel = {
    level: 7,
    title: 'Multi-Agent System with Security Checks',
    description: 'Multiple agents collaborate to ensure safety before trading',
    mermaidJsFlowchart: undefined,
}

export const level08: DemoLevel = {
    level: 8,
    title: 'Fully Agentic System with Portfolio and Risk Management',
    description: 'Autonomous agents manage portfolio and enforce risk constraints',
    mermaidJsFlowchart: undefined,
}

export const allDemoLevels: DemoLevel[] = [
    level01,
    level02,
    level03,
    level04,
    level05,
    level06,
    level07,
    level08,
]