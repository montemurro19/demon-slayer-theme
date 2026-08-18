/**
 * Reference file for eyeballing a theme: open it with each variant active.
 */
import { readFile } from 'node:fs/promises';

export const MAX_BREATHS = 12;

type Breathing = 'water' | 'thunder' | 'flame' | 'sun';

interface Slayer {
  readonly name: string;
  rank?: number;
  breathing: Breathing;
}

export class DemonSlayerCorps<T extends Slayer> {
  #members = new Map<string, T>();

  constructor(private readonly region = 'Taisho') {}

  @deprecated
  add(member: T): this {
    if (!member.name) throw new Error(`member without a name: ${JSON.stringify(member)}`);
    this.#members.set(member.name, member);
    return this;
  }

  find(pattern: RegExp = /^[a-z]+$/i): T[] {
    return [...this.#members.values()].filter((m) => pattern.test(m.name));
  }
}

async function main(): Promise<void> {
  const raw = await readFile('./roster.json', 'utf8');
  const roster: Slayer[] = JSON.parse(raw);

  for (const [index, slayer] of roster.entries()) {
    const label = index < 3 ? 'Hashira' : 'Kinoe';
    console.log(`${label}\t${slayer.name} — ${slayer.breathing} (${slayer.rank ?? 0})`);
  }
}

main().catch(console.error);
