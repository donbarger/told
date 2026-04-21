import { SYSTEM_PROMPT as prodigalPrompt }  from './prodigal.js';
import { SYSTEM_PROMPT as samaritanPrompt } from './samaritan.js';
import { SYSTEM_PROMPT as zacchaeusPrompt } from './zacchaeus.js';
import { SYSTEM_PROMPT as wellPrompt }      from './well.js';
import { SYSTEM_PROMPT as richRulerPrompt } from './richRuler.js';
import { SYSTEM_PROMPT as bartimaeusPrompt }from './bartimaeus.js';
import { SYSTEM_PROMPT as talentsPrompt }   from './talents.js';
import { SYSTEM_PROMPT as debtPrompt }      from './debt.js';
import { SYSTEM_PROMPT as gatePrompt }      from './gate.js';
import { SYSTEM_PROMPT as widowPrompt }     from './widow.js';
import { SYSTEM_PROMPT as sowerPrompt }     from './sower.js';
import { SYSTEM_PROMPT as elderPrompt }     from './elder.js';
import { SYSTEM_PROMPT as phariseePrompt }  from './pharisee.js';
import { SYSTEM_PROMPT as marthaPrompt }    from './martha.js';
import { SYSTEM_PROMPT as nicodemusPrompt } from './nicodemus.js';
import { SYSTEM_PROMPT as richFoolPrompt }  from './richFool.js';
import { SYSTEM_PROMPT as virginsPrompt }   from './virgins.js';
import { SYSTEM_PROMPT as waterPrompt }     from './water.js';
import { SYSTEM_PROMPT as poolPrompt }      from './pool.js';
import { SYSTEM_PROMPT as blindManPrompt }  from './blindMan.js';
import { SYSTEM_PROMPT as adulteryPrompt }  from './adultery.js';
import { SYSTEM_PROMPT as treasurePrompt }  from './treasure.js';
import { SYSTEM_PROMPT as laborersPrompt }  from './laborers.js';
import { SYSTEM_PROMPT as legionPrompt }    from './legion.js';
import { buildUserMessage }                  from './shared.js';

export const PROMPTS = {
  prodigal:   prodigalPrompt,
  samaritan:  samaritanPrompt,
  zacchaeus:  zacchaeusPrompt,
  well:       wellPrompt,
  richRuler:  richRulerPrompt,
  bartimaeus: bartimaeusPrompt,
  talents:    talentsPrompt,
  debt:       debtPrompt,
  gate:       gatePrompt,
  widow:      widowPrompt,
  sower:      sowerPrompt,
  elder:      elderPrompt,
  pharisee:   phariseePrompt,
  martha:     marthaPrompt,
  nicodemus:  nicodemusPrompt,
  richFool:   richFoolPrompt,
  virgins:    virginsPrompt,
  water:      waterPrompt,
  pool:       poolPrompt,
  blindMan:   blindManPrompt,
  adultery:   adulteryPrompt,
  treasure:   treasurePrompt,
  laborers:   laborersPrompt,
  legion:     legionPrompt,
};

export { buildUserMessage };
