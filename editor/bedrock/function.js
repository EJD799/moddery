// Create the definition.
const bedrockFunctionDefinitions = Blockly.common.createBlockDefinitionsFromJsonArray([
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
    type: 'structure_save',
    message0: 'save structure name %1 from x %2 y %3 z %4 to x %5 y %6 z %7 save mode %8',
    colour: 80,
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
        spellcheck: false
      },
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
        type: 'field_dropdown',
        name: 'SAVE_MODE',
        options: [
          ['disk', 'disk'],
          ['memory', 'memory']
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'structure_load',
    message0: 'load structure name %1 at x %2 y %3 z %4 rotation %5 mirror %6',
    colour: 80,
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
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
        type: 'field_dropdown',
        name: 'ROTATION',
        options: [
          ['0_degrees', '0_degrees'],
          ['90_degrees', '90_degrees'],
          ['180_degrees', '180_degrees'],
          ['270_degrees', '270_degrees'],
        ]
      },
      {
        type: 'field_dropdown',
        name: 'MIRROR',
        options: [
          ['none', 'none'],
          ['x', 'x'],
          ['z', 'z'],
          ['xz', 'xz'],
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'structure_delete',
    message0: 'delete structure name %1',
    colour: 80,
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
        spellcheck: false
      },
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
    type: 'toggledownfall',
    message0: 'toggle downfall',
    colour: 240,
    args0: [],
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
    type: 'damage',
    message0: 'apply %1 damage to target %2 source %3 type %4',
    colour: 10,
    args0: [
      {
        type: 'field_number',
        name: 'AMOUNT',
      },
      {
        type: 'field_input',
        name: 'TARGET',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'SOURCE',
        spellcheck: false
      },
      {
        type: 'field_dropdown',
        name: 'TYPE',
        options: [
            ["none", "none"],
            ["piston", "piston"],
            ["lava", "lava"],
            ["campfire", "campfire"],
            ["fire", "fire"],
            ["anvil", "anvil"],
            ["magma", "magma"],
            ["soul_campfire", "soul_campfire"],
            ["wither", "wither"],
            ["falling_block", "falling_block"],
            ["fireworks", "fireworks"],
            ["thorns", "thorns"],
            ["sonic_boom", "sonic_boom"],
            ["contact", "contact"],
            ["override", "override"],
            ["entity_attack", "entity_attack"],
            ["projectile", "projectile"],
            ["suffocation", "suffocation"],
            ["mace_smash", "mace_smash"],
            ["fall", "fall"],
            ["starve", "starve"],
            ["ram_attack", "ram_attack"],
            ["fire_tick", "fire_tick"],
            ["stalactite", "stalactite"],
            ["drowning", "drowning"],
            ["block_explosion", "block_explosion"],
            ["entity_explosion", "entity_explosion"],
            ["void", "void"],
            ["self_destruct", "self_destruct"],
            ["magic", "magic"],
            ["charging", "charging"],
            ["stalagmite", "stalagmite"],
            ["fly_into_wall", "fly_into_wall"],
            ["lightning", "lightning"],
            ["freezing", "freezing"],
            ["temperature", "temperature"]
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'hud',
    message0: '%1 hud element %2 for %3',
    colour: 10,
    args0: [
      {
        type: 'field_dropdown',
        name: 'MODE',
        options: [
          ['hide', 'hide'],
          ['show', 'reset']
        ]
      },
      {
        type: 'field_dropdown',
        name: 'ELEMENT',
        options: [
          ['all', 'all'],
          ['air_bubbles', 'air_bubbles'],
          ['armor', 'armor'],
          ['crosshair', 'crosshair'],
          ['health', 'health'],
          ['horse_health', 'horse_health'],
          ['hotbar', 'hotbar'],
          ['hunger', 'hunger'],
          ['item_text', 'item_text'],
          ['paperdoll', 'paperdoll'],
          ['progress_bar', 'progress_bar'],
          ['status_effects', 'status_effects'],
          ['tooltips', 'tooltips'],
          ['touch_controls', 'touch_controls']
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
    type: 'kick',
    message0: 'kick %1 from the game',
    colour: 10,
    args0: [
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
    message0: 'send message %1 to all players',
    colour: 10,
    args0: [
      {
        type: 'field_input',
        name: 'MESSAGE',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'spreadplayers',
    message0: 'spread entities %1 center x %2 z %3 min spread distance %4 range %5',
    colour: 10,
    args0: [
      {
        type: 'field_input',
        name: 'ENTITIES',
        spellcheck: false
      },
      {
        type: 'field_number',
        name: 'X_POS'
      },
      {
        type: 'field_number',
        name: 'Z_POS'
      },
      {
        type: 'field_number',
        name: 'MIN_SPREAD'
      },
      {
        type: 'field_number',
        name: 'RANGE'
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'ride_start',
    message0: '%1 start riding on %2',
    colour: 10,
    args0: [
      {
        type: 'field_input',
        name: 'RIDER',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'VEHICLE',
        spellcheck: false
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'ride_stop',
    message0: '%1 stop riding',
    colour: 10,
    args0: [
      {
        type: 'field_input',
        name: 'RIDER',
        spellcheck: false
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'ride_evict',
    message0: 'evict riders from %1',
    colour: 10,
    args0: [
      {
        type: 'field_input',
        name: 'VEHICLE',
        spellcheck: false
      },
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
    type: 'tell',
    message0: 'tell player %1 message %2',
    colour: 240,
    args0: [
      {
        type: 'field_input',
        name: 'PLAYER',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'MESSAGE',
        spellcheck: false
      },
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
    type: 'scriptevent',
    message0: 'trigger script event id %1 message %2',
    colour: 240,
    args0: [
      {
        type: 'field_input',
        name: 'ID',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'MESSAGE',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'music_play',
    message0: '%1 music track %2 at volume %3% fade %4 seconds repeat mode %5',
    colour: 240,
    args0: [
      {
        type: 'field_dropdown',
        name: 'MODE',
        options: [
          ['play', 'play'],
          ['queue', 'queue']
        ]
      },
      {
        type: 'field_input',
        name: 'TRACK',
        spellcheck: false
      },
      {
        type: 'field_number',
        name: 'VOLUME'
      },
      {
        type: 'field_number',
        name: 'FADE'
      },
      {
        type: 'field_dropdown',
        name: 'REPEAT',
        options: [
          ['play once', 'play_once'],
          ['loop', 'loop']
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'music_stop',
    message0: 'stop music fade %1 seconds',
    colour: 240,
    args0: [
      {
        type: 'field_number',
        name: 'FADE'
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'music_volume',
    message0: 'set music volume to %1%',
    colour: 240,
    args0: [
      {
        type: 'field_number',
        name: 'VOLUME'
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'transfer',
    message0: 'transfer %1 to server ip %2 port %3',
    colour: 240,
    args0: [
      {
        type: 'field_input',
        name: 'PLAYER'
      },
      {
        type: 'field_input',
        name: 'IP'
      },
      {
        type: 'field_number',
        name: 'PORT'
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'tickingarea_add1',
    message0: 'add ticking area from x %1 y %2 z %3 to x %4 y %5 z %6 name %7 preload %8',
    colour: 240,
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
        name: 'NAME',
        spellcheck: false
      },
      {
        type: 'field_checkbox',
        name: 'PRELOAD',
        checked: false
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'tickingarea_add2',
    message0: 'add circular ticking area center x %1 y %2 z %3 radius %4 name %5 preload %6',
    colour: 240,
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
        type: 'field_number',
        name: 'RADIUS'
      },
      {
        type: 'field_input',
        name: 'NAME',
        spellcheck: false
      },
      {
        type: 'field_checkbox',
        name: 'PRELOAD',
        checked: false
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'tickingarea_remove1',
    message0: 'remove ticking area with name %1',
    colour: 240,
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
        spellcheck: false
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'tickingarea_remove2',
    message0: 'remove ticking area at x %1 y %2 z %3',
    colour: 240,
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
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'tickingarea_removeall',
    message0: 'remove all ticking areas',
    colour: 240,
    args0: [],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'tickingarea_preload1',
    message0: 'set ticking area with name %1 to preload %2',
    colour: 240,
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
        spellcheck: false
      },
      {
        type: 'field_checkbox',
        name: 'PRELOAD',
        checked: false
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'tickingarea_preload2',
    message0: 'set ticking area at x %1 y %2 z %3 to preload %4',
    colour: 240,
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
        type: 'field_checkbox',
        name: 'PRELOAD',
        checked: false
      },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'execute',
    message0: 'execute\nanchored %1\nas %2\nat %3\nfacing x %4 y %5 z %6\nin %7\npositioned x %8 y %9 z %10\nrotated yaw %11 pitch %12\nrun %13',
    colour: 240,
    args0: [
      {
        type: 'field_dropdown',
        name: 'ANCHORED',
        options: [
          ['feet', 'feet'],
          ['eyes', 'eyes']
        ]
      },
      {
        type: 'field_input',
        name: 'AS',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'AT',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'FACING_X',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'FACING_Y',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'FACING_Z',
        spellcheck: false
      },
      {
        type: 'field_dropdown',
        name: 'IN',
        options: [
          ['overworld', 'overworld'],
          ['nether', 'nether'],
          ['the_end', 'the_end']
        ]
      },
      {
        type: 'field_input',
        name: 'POS_X',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'POS_Y',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'POS_Z',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'ROT_YAW',
        spellcheck: false
      },
      {
        type: 'field_input',
        name: 'ROT_PITCH',
        spellcheck: false
      },
      {
        type: 'input_statement',
        name: 'COMMAND'
      },
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

var bedrockFunctionToolbox = {
    "kind": "categoryToolbox",
    "contents": [
      {
        "kind": "category",
        "name": "Settings",
        "colour": 160,
        "contents": [
          {
            "kind": "block",
            "type": "always_day"
          },
          {
            "kind": "block",
            "type": "op_status"
          },
          {
            "kind": "block",
            "type": "difficulty"
          },
          {
            "kind": "block",
            "type": "gamerule"
          },
          {
            "kind": "block",
            "type": "max_players"
          },
          {
            "kind": "block",
            "type": "world_spawn"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Entity",
        "colour": 10,
        "contents": [
          {
            "kind": "block",
            "type": "clear_inv"
          },
          {
            "kind": "block",
            "type": "player_spawn"
          },
          {
            "kind": "block",
            "type": "damage"
          },
          {
            "kind": "block",
            "type": "effect"
          },
          {
            "kind": "block",
            "type": "enchant"
          },
          {
            "kind": "block",
            "type": "xp"
          },
          {
            "kind": "block",
            "type": "tp_xyz"
          },
          {
            "kind": "block",
            "type": "tp_e"
          },
          {
            "kind": "block",
            "type": "kill"
          },
          {
            "kind": "block",
            "type": "gamemode"
          },
          {
            "kind": "block",
            "type": "summon"
          },
          {
            "kind": "block",
            "type": "give"
          },
          {
            "kind": "block",
            "type": "replaceitem"
          },
          {
            "kind": "block",
            "type": "message"
          },
          {
            "kind": "block",
            "type": "tag"
          },
          {
            "kind": "block",
            "type": "hud"
          },
          {
            "kind": "block",
            "type": "kick"
          },
          {
            "kind": "block",
            "type": "spreadplayers"
          },
          {
            "kind": "block",
            "type": "ride_start"
          },
          {
            "kind": "block",
            "type": "ride_stop"
          },
          {
            "kind": "block",
            "type": "ride_evict"
          },
        ]
      },
      {
        "kind": "category",
        "name": "Blocks",
        "colour": 80,
        "contents": [
          {
            "kind": "block",
            "type": "set_block"
          },
          {
            "kind": "block",
            "type": "fill_blocks"
          },
          {
            "kind": "block",
            "type": "clone_blocks"
          },
          {
            "kind": "block",
            "type": "structure_save"
          },
          {
            "kind": "block",
            "type": "structure_load"
          },
          {
            "kind": "block",
            "type": "structure_delete"
          },
        ]
      },
      {
        "kind": "category",
        "name": "Other",
        "colour": 240,
        "contents": [
          {
            "kind": "block",
            "type": "run_command"
          },
          {
            "kind": "block",
            "type": "run_function"
          },
          {
            "kind": "block",
            "type": "time"
          },
          {
            "kind": "block",
            "type": "weather"
          },
          {
            "kind": "block",
            "type": "toggledownfall"
          },
          {
            "kind": "block",
            "type": "particle"
          },
          {
            "kind": "block",
            "type": "title"
          },
          {
            "kind": "block",
            "type": "tell"
          },
          {
            "kind": "block",
            "type": "playsound"
          },
          {
            "kind": "block",
            "type": "stopsound"
          },
          {
            "kind": "block",
            "type": "music_play"
          },
          {
            "kind": "block",
            "type": "music_stop"
          },
          {
            "kind": "block",
            "type": "music_volume"
          },
          {
            "kind": "block",
            "type": "transfer"
          },
          {
            "kind": "block",
            "type": "tickingarea_add1"
          },
          {
            "kind": "block",
            "type": "tickingarea_add2"
          },
          {
            "kind": "block",
            "type": "tickingarea_remove1"
          },
          {
            "kind": "block",
            "type": "tickingarea_remove2"
          },
          {
            "kind": "block",
            "type": "tickingarea_removeall"
          },
          {
            "kind": "block",
            "type": "tickingarea_preload1"
          },
          {
            "kind": "block",
            "type": "tickingarea_preload2"
          },
          {
            "kind": "block",
            "type": "scriptevent"
          },
          {
            "kind": "block",
            "type": "execute"
          },
        ]
      },
      {
        "kind": "category",
        "name": "Scoreboard",
        "colour": 320,
        "contents": [
          {
            "kind": "block",
            "type": "addobjective"
          },
          {
            "kind": "block",
            "type": "removeobjective"
          },
          {
            "kind": "block",
            "type": "objectivedisplay"
          },
          {
            "kind": "block",
            "type": "hidedisplay"
          },
          {
            "kind": "block",
            "type": "operatescore"
          }
        ]
      }
    ]
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

Blockly.common.defineBlocks(bedrockFunctionDefinitions);
var workspace = Blockly.inject('blocklyDiv', {
  toolbox: bedrockFunctionToolbox,
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

Blockly.Blocks['execute'].onchange = function() {
  const first = this.getInputTargetBlock("COMMAND");
  if (first && first.getNextBlock()) {
    first.getNextBlock().unplug();
  }
}




function loadProject(data) {
  Blockly.serialization.workspaces.load(data, workspace);
}
function saveProject() {
  return Blockly.serialization.workspaces.save(workspace);
}
function generateCode() {
  const code = Blockly.BedrockFunction.workspaceToCode(workspace);
  console.log("Generated code:");
  console.log(code);
  return code;
}
/*document.addEventListener('keydown', e => {
  if (e.key === 'g') generateCode();
});*/