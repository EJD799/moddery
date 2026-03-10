// Create the definition.
const javaFunctionDefinitions = Blockly.common.createBlockDefinitionsFromJsonArray([
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
    message0: 'clone blocks from x %1 y %2 z %3 to x %4 y %5 z %6 in %7 to destination x %8 y %9 z %10 in %11',
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
        name: 'FROM_DIMENSION',
        spellcheck: false,
        text: "minecraft:overworld"
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
      },
      {
        type: 'field_input',
        name: 'TO_DIMENSION',
        spellcheck: false,
        text: "minecraft:overworld"
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
        type: 'input_value',
        name: 'PLAYER',
        check: null
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
          ["command block output", "command_block_output"],
          ["log admin commands", "log_admin_commands"],
          ["send command feedback", "send_command_feedback"],
          ["show advancement messages", "show_advancement_messages"],
          ["show death messages", "show_death_messages"],
          ["block drops", "block_drops"],
          ["block explosion drop decay", "block_explosion_drop_decay"],
          ["entity drops", "entity_drops"],
          ["mob drops", "mob_drops"],
          ["mob explosion drop decay", "mob_explosion_drop_decay"],
          ["projectiles can break blocks", "projectiles_can_break_blocks"],
          ["tnt explosion drop decay", "tnt_explosion_drop_decay"],
          ["command blocks work", "command_blocks_work"],
          ["global sound events", "global_sound_events"],
          ["max block modifications", "max_block_modifications"],
          ["max command forks", "max_command_forks"],
          ["max command sequence length", "max_command_sequence_length"],
          ["max minecart speed", "max_minecart_speed"],
          ["reduced debug info", "reduced_debug_info"],
          ["tnt explodes", "tnt_explodes"],
          ["forgive dead players", "forgive_dead_players"],
          ["max entity cramming", "max_entity_cramming"],
          ["mob griefing", "mob_griefing"],
          ["raids", "raids"],
          ["universal anger", "universal_anger"],
          ["allow entering nether using portals", "allow_entering_nether_using_portals"],
          ["drowning damage", "drowning_damage"],
          ["elytra movement check", "elytra_movement_check"],
          ["ender pearls vanish on death", "ender_pearls_vanish_on_death"],
          ["fall damage", "fall_damage"],
          ["fire damage", "fire_damage"],
          ["fire spread radius around player", "fire_spread_radius_around_player"],
          ["freeze damage", "freeze_damage"],
          ["immediate respawn", "immediate_respawn"],
          ["keep inventory", "keep_inventory"],
          ["limited crafting", "limited_crafting"],
          ["locator bar", "locator_bar"],
          ["natural health regeneration", "natural_health_regeneration"],
          ["player movement check", "player_movement_check"],
          ["players nether portal creative delay", "players_nether_portal_creative_delay"],
          ["players nether portal default delay", "players_nether_portal_default_delay"],
          ["players sleeping percentage", "players_sleeping_percentage"],
          ["pvp", "pvp"],
          ["respawn radius", "respawn_radius"],
          ["spawn monsters", "spawn_monsters"],
          ["spectators generate chunks", "spectators_generate_chunks"],
          ["spawn mobs", "spawn_mobs"],
          ["spawn patrols", "spawn_patrols"],
          ["spawn phantoms", "spawn_phantoms"],
          ["spawn wandering traders", "spawn_wandering_traders"],
          ["spawn wardens", "spawn_wardens"],
          ["spawner blocks work", "spawner_blocks_work"],
          ["advance time", "advance_time"],
          ["advance weather", "advance_weather"],
          ["lava source conversion", "lava_source_conversion"],
          ["max snow accumulation height", "max_snow_accumulation_height"],
          ["random tick speed", "random_tick_speed"],
          ["spread vines", "spread_vines"],
          ["water source conversion", "water_source_conversion"]
        ]
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: null
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
        type: 'input_value',
        name: 'X_POS',
        check: null
      },
      {
        type: 'input_value',
        name: 'Y_POS',
        check: null
      },
      {
        type: 'input_value',
        name: 'Z_POS',
        check: null
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
    type: 'macro',
    message0: 'get macro %1',
    colour: 240,
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
        spellcheck: false
      }
    ],
    output: null,
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
    type: 'effect_clear',
    message0: 'clear effects from %1 filter type %2',
    colour: 10,
    args0: [
      {
        type: 'field_input',
        name: 'PLAYER',
        spellcheck: false
      },
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
    message0: '%1 %2 xp %3 to %4',
    colour: 10,
    args0: [
      {
        type: 'field_dropdown',
        name: 'MODE',
        options: [
            ["add", "add"],
            ["set", "set"]
        ]
      },
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
    message0: 'apply %1 damage to target %2',
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
    message0: 'spread entities %1 center x %2 z %3 min spread distance %4 range %5 respect teams %6',
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
      {
        type: 'field_checkbox',
        name: 'RESPECT_TEAMS'
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
    message0: 'play sound %1 for %2 at x %3 y %4 z %5 volume %6 pitch %7 source %8',
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
      },
      {
        type: 'field_dropdown',
        name: 'SOURCE',
        options: [
          ["master", "master"],
          ["music", "music"],
          ["record", "record"],
          ["weather", "weather"],
          ["block", "block"],
          ["hostile", "hostile"],
          ["neutral", "neutral"],
          ["player", "player"],
          ["ambient", "ambient"],
          ["voice", "voice"],
          ["ui", "ui"],
        ]
      },
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
          ['the end', 'the_end']
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
          ['list', 'list'],
          ['sidebar', 'sidebar'],
          ['below name', 'belowname']
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

var javaFunctionToolbox = {
    "kind": "categoryToolbox",
    "contents": [
      {
        "kind": "category",
        "name": "Settings",
        "colour": 160,
        "contents": [
          {
            "kind": "block",
            "type": "op_status",
            inputs: {
              PLAYER: {
                shadow: {
                  type: 'text'
                }
              }
            }
          },
          {
            "kind": "block",
            "type": "difficulty"
          },
          {
            "kind": "block",
            "type": "gamerule",
            inputs: {
              VALUE: {
                shadow: {
                  type: 'text'
                }
              }
            }
          },
          {
            "kind": "block",
            "type": "world_spawn",
            inputs: {
              X_POS: {
                shadow: {
                  type: 'math_number'
                }
              },
              Y_POS: {
                shadow: {
                  type: 'math_number'
                }
              },
              Z_POS: {
                shadow: {
                  type: 'math_number'
                }
              }
            }
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
            "type": "effect_clear"
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
            "type": "message"
          },
          {
            "kind": "block",
            "type": "tag"
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
            "type": "macro"
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
            "type": "transfer"
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

Blockly.Blocks['text'].init = function() {
  this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput(""), "TEXT");
  this.setOutput(true, "String");
  this.setColour(160);
  this.setTooltip("Text");
  this.setHelpUrl("");
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

Blockly.common.defineBlocks(javaFunctionDefinitions);
var workspace = Blockly.inject('blocklyDiv', {
  toolbox: javaFunctionToolbox,
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
  const code = Blockly.JavaFunction.workspaceToCode(workspace);
  console.log("Generated code:");
  console.log(code);
  return code;
}
/*document.addEventListener('keydown', e => {
  if (e.key === 'g') generateCode();
});*/