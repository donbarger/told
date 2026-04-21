import { prodigal }  from './prodigal.js';
import { samaritan } from './samaritan.js';
import { zacchaeus } from './zacchaeus.js';
import { well }      from './well.js';
import { richRuler } from './richRuler.js';
import { bartimaeus } from './bartimaeus.js';
import { talents }   from './talents.js';
import { debt }      from './debt.js';
import { gate }      from './gate.js';
import { widow }     from './widow.js';
import { sower }     from './sower.js';

export const STORIES = [
  prodigal,
  samaritan,
  zacchaeus,
  well,
  richRuler,
  bartimaeus,
  talents,
  debt,
  gate,
  widow,
  sower,
];

export const STORY_MAP = Object.fromEntries(STORIES.map(s => [s.id, s]));

export { prodigal, samaritan, zacchaeus, well, richRuler, bartimaeus, talents, debt, gate, widow, sower };
