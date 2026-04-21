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
};

export { buildUserMessage };
