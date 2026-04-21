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
import { elder }     from './elder.js';
import { pharisee }  from './pharisee.js';
import { martha }    from './martha.js';
import { nicodemus } from './nicodemus.js';
import { richFool }  from './richFool.js';
import { virgins }   from './virgins.js';
import { water }     from './water.js';
import { pool }      from './pool.js';
import { blindMan }  from './blindMan.js';
import { adultery }  from './adultery.js';
import { treasure }  from './treasure.js';
import { laborers }  from './laborers.js';
import { legion }    from './legion.js';

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
  elder,
  pharisee,
  martha,
  nicodemus,
  richFool,
  virgins,
  water,
  pool,
  blindMan,
  adultery,
  treasure,
  laborers,
  legion,
];

export const STORY_MAP = Object.fromEntries(STORIES.map(s => [s.id, s]));

export { prodigal, samaritan, zacchaeus, well, richRuler, bartimaeus, talents, debt, gate, widow, sower, elder, pharisee, martha, nicodemus, richFool, virgins, water, pool, blindMan, adultery, treasure, laborers, legion };
