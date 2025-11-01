// Create the definition.
const bedrockScriptDefinitions = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    type: 'always_day',
    message0: 'set always day to %1',
    colour: 160,
    args0: [
      {
        type: 'field_dropdown',
        name: 'VALUE',
        options: [
          ["true", "true"],
          ["false", "false"]
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'clear_inv',
    message0: 'clear inventory of %1 filter item %2 max count %3',
    colour: 10,
    args0: [
      {
        type: 'field_input',
        name: 'PLAYER',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'ITEM_ID',
        spellcheck: false
      },
      {
        type: 'field_number',
        name: 'MAX_COUNT'
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'set_block',
    message0: 'set block at x %1 y %2 z %3 to %4',
    colour: 80,
    args0: [
      {
        type: 'field_number',
        name: 'X_POS'
      },
      {
        type: 'field_number',
        name: 'Y_POS'
      },
      {
        type: 'field_number',
        name: 'Z_POS'
      },
      {
        type: 'field_input',
        name: 'BLOCK_ID',
        text: 'minecraft:stone',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'fill_blocks',
    message0: 'fill blocks from x %1 y %2 z %3 to x %4 y %5 z %6 with %7',
    colour: 80,
    args0: [
      {
        type: 'field_number',
        name: 'X_POS1'
      },
      {
        type: 'field_number',
        name: 'Y_POS1'
      },
      {
        type: 'field_number',
        name: 'Z_POS1'
      },
      {
        type: 'field_number',
        name: 'X_POS2'
      },
      {
        type: 'field_number',
        name: 'Y_POS2'
      },
      {
        type: 'field_number',
        name: 'Z_POS2'
      },
      {
        type: 'field_input',
        name: 'BLOCK_ID',
        text: 'minecraft:stone',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'clone_blocks',
    message0: 'clone blocks from x %1 y %2 z %3 to x %4 y %5 z %6 to destination x %7 y %8 z %9',
    colour: 80,
    args0: [
      {
        type: 'field_number',
        name: 'X_POS1'
      },
      {
        type: 'field_number',
        name: 'Y_POS1'
      },
      {
        type: 'field_number',
        name: 'Z_POS1'
      },
      {
        type: 'field_number',
        name: 'X_POS2'
      },
      {
        type: 'field_number',
        name: 'Y_POS2'
      },
      {
        type: 'field_number',
        name: 'Z_POS2'
      },
      {
        type: 'field_number',
        name: 'X_POS3'
      },
      {
        type: 'field_number',
        name: 'Y_POS3'
      },
      {
        type: 'field_number',
        name: 'Z_POS3'
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'op_status',
    message0: '%1 op status to %2',
    colour: 160,
    args0: [
      {
        type: 'field_dropdown',
        name: 'MODE',
        options: [
          ['give', 'give'],
          ['revoke', 'revoke']
        ]
      },
      {
        type: 'field_input',
        name: 'PLAYER',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'difficulty',
    message0: 'set difficulty to %1',
    colour: 160,
    args0: [
      {
        type: 'field_dropdown',
        name: 'DIFFICULTY',
        options: [
          ['peaceful', 'peaceful'],
          ['easy', 'easy'],
          ['normal', 'normal'],
          ['hard', 'hard'],
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'gamerule',
    message0: 'set gamerule %1 to %2',
    colour: 160,
    args0: [
      {
        type: 'field_dropdown',
        name: 'RULE',
        options: [
          ['commandBlockOutput', 'commandBlockOutput'],
          ['commandBlocksEnabled', 'commandBlocksEnabled'],
          ['doDaylightCycle', 'doDaylightCycle'],
          ['doEntityDrops', 'doEntityDrops'],
          ['doFireTick', 'doFireTick'],
          ['doImmediateRespawn', 'doImmediateRespawn'],
          ['doInsomnia', 'doInsomnia'],
          ['doMobLoot', 'doMobLoot'],
          ['doMobSpawning', 'doMobSpawning'],
          ['doTileDrops', 'doTileDrops'],
          ['doWeatherCycle', 'doWeatherCycle'],
          ['drowningDamage', 'drowningDamage'],
          ['fallDamage', 'fallDamage'],
          ['fireDamage', 'fireDamage'],
          ['keepInventory', 'keepInventory'],
          ['maxCommandChainLength', 'maxCommandChainLength'],
          ['mobGriefing', 'mobGriefing'],
          ['naturalRegeneration', 'naturalRegeneration'],
          ['pvp', 'pvp'],
          ['randomTickSpeed', 'randomTickSpeed'],
          ['sendCommandFeedback', 'sendCommandFeedback'],
          ['showCoordinates', 'showCoordinates'],
          ['showDeathMessages', 'showDeathMessages'],
          ['tntExplodes', 'tntExplodes']
        ]
      },
      {
        type: 'field_input',
        name: 'VALUE',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'max_players',
    message0: 'set player limit to %1',
    colour: 160,
    args0: [
      {
        type: 'field_number',
        name: 'MAX_PLAYERS'
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'world_spawn',
    message0: 'set world spawn point to x %1 y %2 z %3',
    colour: 160,
    args0: [
      {
        type: 'field_number',
        name: 'X_POS'
      },
      {
        type: 'field_number',
        name: 'Y_POS'
      },
      {
        type: 'field_number',
        name: 'Z_POS'
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'player_spawn',
    message0: 'set spawn point of player %1 to x %2 y %3 z %4',
    colour: 10,
    args0: [
      {
        type: 'field_input',
        name: 'PLAYER',
        spellcheck: false
      },
      {
        type: 'field_number',
        name: 'X_POS'
      },
      {
        type: 'field_number',
        name: 'Y_POS'
      },
      {
        type: 'field_number',
        name: 'Z_POS'
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'run_command',
    message0: 'run command %1',
    colour: 240,
    args0: [
      {
        type: 'field_input',
        name: 'COMMAND',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'run_function',
    message0: 'run function %1',
    colour: 240,
    args0: [
      {
        type: 'field_input',
        name: 'FUNCTION',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'time',
    message0: 'set time to %1',
    colour: 240,
    args0: [
      {
        type: 'field_input',
        name: 'TIME',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'weather',
    message0: 'set weather to %1',
    colour: 240,
    args0: [
      {
        type: 'field_dropdown',
        name: 'WEATHER',
        options: [
            ["clear", "clear"],
            ["rain", "rain"],
            ["thunder", "thunder"]
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'effect',
    message0: 'give effect %1 level %2 to %3 for %4 seconds hide particles %5',
    colour: 10,
    args0: [
      {
        type: 'field_dropdown',
        name: 'EFFECT',
        options: [
          ['Absorption', 'absorption'],
          ['Blindness', 'blindness'],
          ['Conduit Power', 'conduit_power'],
          ['Fire Resistance', 'fire_resistance'],
          ['Fatal Poison', 'fatal_poison'],
          ['Haste', 'haste'],
          ['Health Boost', 'health_boost'],
          ['Hunger', 'hunger'],
          ['Instant Damage', 'instant_damage'],
          ['Instant Health', 'instant_health'],
          ['Invisibility', 'invisibility'],
          ['Jump Boost', 'jump_boost'],
          ['Levitation', 'levitation'],
          ['Mining Fatigue', 'mining_fatigue'],
          ['Nausea', 'nausea'],
          ['Night Vision', 'night_vision'],
          ['Poison', 'poison'],
          ['Resistance', 'resistance'],
          ['Regeneration', 'regeneration'],
          ['Saturation', 'saturation'],
          ['Slowness', 'slowness'],
          ['Slow Falling', 'slow_falling'],
          ['Speed', 'speed'],
          ['Strength', 'strength'],
          ['Water Breathing', 'water_breathing'],
          ['Weakness', 'weakness'],
          ['Wither', 'wither']
        ]
      },
      {
        type: 'field_number',
        name: 'LEVEL',
        value: 1
      },
      {
        type: 'field_input',
        name: 'PLAYER',
        spellcheck: false
      },
      {
        type: 'field_number',
        name: 'DURATION',
        value: 60
      },
      {
        type: 'field_checkbox',
        name: 'HIDE_PARTICLES'
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'enchant',
    message0: 'enchant held item of %1 with %2 level %3',
    colour: 10,
    args0: [
      {
        type: 'field_input',
        name: 'PLAYER',
        spellcheck: false
      },
      {
        type: 'field_dropdown',
        name: 'ENCHANTMENT',
        options: [
          ['Aqua Affinity', 'aqua_affinity'],
          ['Bane of Arthropods', 'bane_of_arthropods'],
          ['Blast Protection', 'blast_protection'],
          ['Channeling', 'channeling'],
          ['Depth Strider', 'depth_strider'],
          ['Efficiency', 'efficiency'],
          ['Feather Falling', 'feather_falling'],
          ['Fire Aspect', 'fire_aspect'],
          ['Fire Protection', 'fire_protection'],
          ['Flame', 'flame'],
          ['Fortune', 'fortune'],
          ['Frost Walker', 'frost_walker'],
          ['Impaling', 'impaling'],
          ['Infinity', 'infinity'],
          ['Knockback', 'knockback'],
          ['Loyalty', 'loyalty'],
          ['Looting', 'looting'],
          ['Luck of the Sea', 'luck_of_the_sea'],
          ['Lure', 'lure'],
          ['Mending', 'mending'],
          ['Multishot', 'multishot'],
          ['Piercing', 'piercing'],
          ['Power', 'power'],
          ['Projectile Protection', 'projectile_protection'],
          ['Protection', 'protection'],
          ['Punch', 'punch'],
          ['Quick Charge', 'quick_charge'],
          ['Respiration', 'respiration'],
          ['Riptide', 'riptide'],
          ['Sharpness', 'sharpness'],
          ['Silk Touch', 'silk_touch'],
          ['Smite', 'smite'],
          ['Thorns', 'thorns'],
          ['Unbreaking', 'unbreaking']
        ]
      },
      {
        type: 'field_number',
        name: 'LEVEL'
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'xp',
    message0: 'give %1 xp %2 to %3',
    colour: 10,
    args0: [
      {
        type: 'field_number',
        name: 'QUANTITY',
      },
      {
        type: 'field_dropdown',
        name: 'FORMAT',
        options: [
            ["points", "points"],
            ["levels", "levels"]
        ]
      },
      {
        type: 'field_input',
        name: 'PLAYER',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'tp_e',
    message0: 'teleport %1 to %2',
    colour: 10,
    args0: [
      {
        type: 'field_input',
        name: 'PLAYER1',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'PLAYER2',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'tp_xyz',
    message0: 'teleport %1 to x %2 y %3 z %4',
    colour: 10,
    args0: [
      {
        type: 'field_input',
        name: 'PLAYER',
        spellcheck: false
      },
      {
        type: 'field_number',
        name: 'X_POS'
      },
      {
        type: 'field_number',
        name: 'Y_POS'
      },
      {
        type: 'field_number',
        name: 'Z_POS'
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'kill',
    message0: 'kill %1',
    colour: 10,
    args0: [
      {
        type: 'field_input',
        name: 'ENTITY',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'gamemode',
    message0: 'set gamemode of %1 to %2',
    colour: 10,
    args0: [
      {
        type: 'field_input',
        name: 'PLAYER',
        spellcheck: false
      },
      {
        type: 'field_dropdown',
        name: 'GAMEMODE',
        options: [
          ['Survival', 'survival'],
          ['Creative', 'creative'],
          ['Adventure', 'adventure'],
          ['Spectator', 'spectator']
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'summon',
    message0: 'summon %1 at x %2 y %3 z %4',
    colour: 10,
    args0: [
      {
        type: 'field_input',
        name: 'ENTITY',
        spellcheck: false
      },
      {
        type: 'field_number',
        name: 'X_POS'
      },
      {
        type: 'field_number',
        name: 'Y_POS'
      },
      {
        type: 'field_number',
        name: 'Z_POS'
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'give',
    message0: 'give %1 of %2 to %3',
    colour: 10,
    args0: [
      {
        type: 'field_number',
        name: 'QUANTITY'
      },
      {
        type: 'field_input',
        name: 'ITEM',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'PLAYER',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'replaceitem',
    message0: 'replace item in %1 slot %2 of %3 with %4 of %5',
    colour: 10,
    args0: [
      {
        type: 'field_dropdown',
        name: 'SLOT_TYPE',
        options: [
          ['main hand', 'slot.weapon.mainhand'],
          ['off hand', 'slot.weapon.offhand'],
          ['hotbar', 'slot.hotbar'],
          ['inventory', 'slot.inventory'],
          ['helmet slot', 'slot.armor.head'],
          ['chestplate slot', 'slot.armor.chest'],
          ['leggings slot', 'slot.armor.legs'],
          ['boots slot', 'slot.armor.feet'],
          ['ender chest', 'slot.enderchest'],
          ['saddle', 'slot.saddle'],
          ['horse armor', 'slot.armor'],
          ['entity chest', 'slot.chest']
        ]
      },
      {
        type: 'field_number',
        name: 'SLOT_NUMBER'
      },
      {
        type: 'field_input',
        name: 'PLAYER',
        spellcheck: false
      },
      {
        type: 'field_number',
        name: 'QUANTITY'
      },
      {
        type: 'field_input',
        name: 'ITEM',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'message',
    message0: 'send message %1 to %2',
    colour: 10,
    args0: [
      {
        type: 'field_input',
        name: 'MESSAGE',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'PLAYER',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'particle',
    message0: 'show particle %1 at x %2 y %3 z %4',
    colour: 240,
    args0: [
      {
        type: 'field_input',
        name: 'PARTICLE',
        spellcheck: false
      },
      {
        type: 'field_number',
        name: 'X_POS'
      },
      {
        type: 'field_number',
        name: 'Y_POS'
      },
      {
        type: 'field_number',
        name: 'Z_POS'
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'title',
    message0: 'show title %1 to %2 style %3',
    colour: 240,
    args0: [
      {
        type: 'field_input',
        name: 'TEXT',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'PLAYER',
        spellcheck: false
      },
      {
        type: 'field_dropdown',
        name: 'STYLE',
        options: [
          ['title', 'title'],
          ['subtitle', 'subtitle'],
          ['actionbar', 'actionbar']
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'tag',
    message0: '%1 tag %2 for entity %3',
    colour: 10,
    args0: [
      {
        type: 'field_dropdown',
        name: 'MODE',
        options: [
          ['add', 'add'],
          ['remove', 'remove']
        ]
      },
      {
        type: 'field_input',
        name: 'TAG',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'ENTITY',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'playsound',
    message0: 'play sound %1 for %2 at x %3 y %4 z %5 volume %6 pitch %7',
    colour: 240,
    args0: [
      {
        type: 'field_input',
        name: 'SOUND',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'PLAYER',
        spellcheck: false
      },
      {
        type: 'field_number',
        name: 'X_POS'
      },
      {
        type: 'field_number',
        name: 'Y_POS'
      },
      {
        type: 'field_number',
        name: 'Z_POS'
      },
      {
        type: 'field_number',
        name: 'VOLUME'
      },
      {
        type: 'field_number',
        name: 'PITCH'
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'stopsound',
    message0: 'stop sound %1 for %2',
    colour: 240,
    args0: [
      {
        type: 'field_input',
        name: 'SOUND',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'PLAYER',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'addobjective',
    message0: 'add objective %1 display name %2',
    colour: 320,
    args0: [
      {
        type: 'field_input',
        name: 'OBJECTIVE',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'DISPLAY_NAME',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'removeobjective',
    message0: 'remove objective %1',
    colour: 320,
    args0: [
      {
        type: 'field_input',
        name: 'OBJECTIVE',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'objectivedisplay',
    message0: 'set display %1 to objective %2',
    colour: 320,
    args0: [
      {
        type: 'field_dropdown',
        name: 'DISPLAY',
        options: [
          ['sidebar ascending', 'sidebar_ascending'],
          ['sidebar descending', 'sidebar_descending'],
          ['below name', 'below_name']
        ]
      },
      {
        type: 'field_input',
        name: 'OBJECTIVE',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'hidedisplay',
    message0: 'disable display %1',
    colour: 320,
    args0: [
      {
        type: 'field_dropdown',
        name: 'DISPLAY',
        options: [
          ['sidebar', 'sidebar'],
          ['below name', 'belowname']
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'operatescore',
    message0: '%1 score %2 to score of %3 on objective %4',
    colour: 320,
    args0: [
      {
        type: 'field_dropdown',
        name: 'MODE',
        options: [
          ['add', 'add'],
          ['remove', 'remove'],
          ['set', 'set']
        ]
      },
      {
        type: 'field_number',
        name: 'QUANTITY'
      },
      {
        type: 'field_input',
        name: 'PLAYER',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'OBJECTIVE',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "on_start",
    message0: "on start",
    nextStatement: null,
    colour: 45,
    hat: "cap",
    deletable: false,
    movable: false,
    editable: false,
    //extensions: ["no_disable_menu"]
  }
]);

const bedrockScriptToolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Logic',
      colour: '%{BKY_LOGIC_HUE}',
      contents: [
        { kind: 'block', type: 'controls_if' },
        { kind: 'block', type: 'logic_compare' },
        { kind: 'block', type: 'logic_operation' },
        { kind: 'block', type: 'logic_negate' },
        { kind: 'block', type: 'logic_boolean' },
        { kind: 'block', type: 'logic_null' },
        { kind: 'block', type: 'logic_ternary' },
      ],
    },
    {
      kind: 'category',
      name: 'Loops',
      colour: '%{BKY_LOOPS_HUE}',
      contents: [
        {
          kind: 'block',
          type: 'controls_repeat_ext',
          inputs: {
            TIMES: {
              shadow: {
                type: 'math_number',
                fields: { NUM: 10 },
              },
            },
          },
        },
        { kind: 'block', type: 'controls_whileUntil' },
        {
          kind: 'block',
          type: 'controls_for',
          inputs: {
            FROM: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
            TO: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
            BY: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
          },
        },
        { kind: 'block', type: 'controls_forEach' },
        { kind: 'block', type: 'controls_flow_statements' },
      ],
    },
    {
      kind: 'category',
      name: 'Math',
      colour: '%{BKY_MATH_HUE}',
      contents: [
        { kind: 'block', type: 'math_number' },
        { kind: 'block', type: 'math_arithmetic' },
        { kind: 'block', type: 'math_single' },
        { kind: 'block', type: 'math_trig' },
        { kind: 'block', type: 'math_constant' },
        { kind: 'block', type: 'math_number_property' },
        {
          kind: 'block',
          type: 'math_change',
          inputs: {
            DELTA: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
          },
        },
        { kind: 'block', type: 'math_round' },
        { kind: 'block', type: 'math_on_list' },
        { kind: 'block', type: 'math_modulo' },
        {
          kind: 'block',
          type: 'math_constrain',
          inputs: {
            LOW: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
            HIGH: { shadow: { type: 'math_number', fields: { NUM: 100 } } },
          },
        },
        {
          kind: 'block',
          type: 'math_random_int',
          inputs: {
            FROM: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
            TO: { shadow: { type: 'math_number', fields: { NUM: 100 } } },
          },
        },
        { kind: 'block', type: 'math_random_float' },
      ],
    },
    {
      kind: 'category',
      name: 'Text',
      colour: '%{BKY_TEXTS_HUE}',
      contents: [
        { kind: 'block', type: 'text' },
        { kind: 'block', type: 'text_join' },
        {
          kind: 'block',
          type: 'text_append',
          inputs: { TEXT: { shadow: { type: 'text' } } },
        },
        { kind: 'block', type: 'text_length' },
        { kind: 'block', type: 'text_isEmpty' },
        {
          kind: 'block',
          type: 'text_indexOf',
          inputs: {
            VALUE: {
              block: {
                type: 'variables_get',
                fields: { VAR: 'text' },
              },
            },
            FIND: { shadow: { type: 'text' } },
          },
        },
        {
          kind: 'block',
          type: 'text_charAt',
          inputs: {
            VALUE: {
              block: {
                type: 'variables_get',
                fields: { VAR: 'text' },
              },
            },
          },
        },
        { kind: 'block', type: 'text_getSubstring' },
        { kind: 'block', type: 'text_changeCase' },
        { kind: 'block', type: 'text_trim' },
        { kind: 'block', type: 'text_print' },
        { kind: 'block', type: 'text_prompt_ext' },
      ],
    },
    {
      kind: 'category',
      name: 'Lists',
      colour: '%{BKY_LISTS_HUE}',
      contents: [
        { kind: 'block', type: 'lists_create_with' },
        {
          kind: 'block',
          type: 'lists_create_with',
          extraState: { itemCount: 0 },
        },
        {
          kind: 'block',
          type: 'lists_repeat',
          inputs: {
            NUM: { shadow: { type: 'math_number', fields: { NUM: 5 } } },
          },
        },
        { kind: 'block', type: 'lists_length' },
        { kind: 'block', type: 'lists_isEmpty' },
        { kind: 'block', type: 'lists_indexOf' },
        { kind: 'block', type: 'lists_getIndex' },
        { kind: 'block', type: 'lists_setIndex' },
        { kind: 'block', type: 'lists_getSublist' },
        { kind: 'block', type: 'lists_sort' },
        { kind: 'block', type: 'lists_split' },
        { kind: 'block', type: 'lists_reverse' },
      ],
    },
    {
      kind: 'category',
      name: 'Colour',
      colour: '%{BKY_COLOUR_HUE}',
      contents: [
        { kind: 'block', type: 'colour_picker' },
        { kind: 'block', type: 'colour_random' },
        { kind: 'block', type: 'colour_rgb' },
        { kind: 'block', type: 'colour_blend' },
      ],
    },
    { kind: 'sep' },
    {
      kind: 'category',
      name: 'Variables',
      custom: 'VARIABLE',
      colour: '%{BKY_VARIABLES_HUE}',
    },
    {
      kind: 'category',
      name: 'Functions',
      custom: 'PROCEDURE',
      colour: '%{BKY_PROCEDURES_HUE}',
    },
  ],
};



// Apply the no_disable_menu logic to all blocks
Blockly.BlockSvg.prototype.customContextMenu = function(menuOptions) {
  // Filter out "Disable block" entries
  for (let i = menuOptions.length - 1; i >= 0; i--) {
    if (menuOptions[i].text && menuOptions[i].text.includes('Disable')) {
      menuOptions.splice(i, 1);
    }
  }
};

Blockly.common.defineBlocks(bedrockScriptDefinitions);
var workspace = Blockly.inject('blocklyDiv', {
  toolbox: bedrockScriptToolbox,
  move: {
    scrollbars: {
      horizontal: true,
      vertical: true
    },
    drag: true,
    wheel: true
  },
  renderer: 'zelos',
  zoom: {
    controls: true,
    wheel: true,
    startScale: 0.75, // smaller scale (0.5–1.0 is common)
    maxScale: 1.2,
    minScale: 0.5,
    scaleSpeed: 1.1
  }
});
const startBlock = workspace.newBlock('on_start');
startBlock.initSvg();
startBlock.render();
startBlock.setDeletable(false);
startBlock.moveBy(50, 50);




function loadProject(data) {
  Blockly.serialization.workspaces.load(data, workspace);
}
function saveProject() {
  return Blockly.serialization.workspaces.save(workspace);
}
function generateCode() {
  const code = Blockly.BedrockFunction.workspaceToCode(workspace);
  console.log(code);
  alert(code);
  return code;
}
document.addEventListener('keydown', e => {
  if (e.key === 'g') generateCode();
});