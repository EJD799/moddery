// Create the definition.
const bedrockScriptDefinitions = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    type: "on_start",
    message0: "on start",
    nextStatement: null,
    colour: 45,
    hat: "cap",
    deletable: false,
    movable: false,
    editable: false
  },
  {
    type: "before_event",
    message0: "register before event %1 callback %2 %3",
    colour: 45,
    args0: [
      {
        type: 'field_dropdown',
        name: 'EVENT',
        options: [
          ['effectAdd', 'effectAdd'],
          ['entityRemove', 'entityRemove'],
          ['explosion', 'explosion'],
          ['itemUse', 'itemUse'],
          ['playerBreakBlock', 'playerBreakBlock'],
          ['playerGameModeChange', 'playerGameModeChange'],
          ['playerInteractWithBlock', 'playerInteractWithBlock'],
          ['playerInteractWithEntity', 'playerInteractWithEntity'],
          ['playerLeave', 'playerLeave'],
          ['weatherChange', 'weatherChange']
        ]
      },
      {
        type: 'input_value',
        name: 'CALLBACK',
        check: null
      },
      {
        type: 'input_statement',
        name: 'DO'
      }
    ],
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "after_event",
    message0: "register after event %1 callback %2 %3",
    colour: 45,
    args0: [
      {
        type: 'field_dropdown',
        name: 'EVENT',
        options: [
          ['blockExplode', 'blockExplode'],
          ['buttonPush', 'buttonPush'],
          ['dataDrivenEntityTrigger', 'dataDrivenEntityTrigger'],
          ['effectAdd', 'effectAdd'],
          ['entityDie', 'entityDie'],
          ['entityHealthChanged', 'entityHealthChanged'],
          ['entityHitBlock', 'entityHitBlock'],
          ['entityHitEntity', 'entityHitEntity'],
          ['entityHurt', 'entityHurt'],
          ['entityLoad', 'entityLoad'],
          ['entityRemove', 'entityRemove'],
          ['entitySpawn', 'entitySpawn'],
          ['explosion', 'explosion'],
          ['gameRuleChange', 'gameRuleChange'],
          ['itemCompleteUse', 'itemCompleteUse'],
          ['itemReleaseUse', 'itemReleaseUse'],
          ['itemStartUse', 'itemStartUse'],
          ['itemStartUseOn', 'itemStartUseOn'],
          ['itemStopUse', 'itemStopUse'],
          ['itemStopUseOn', 'itemStopUseOn'],
          ['itemUse', 'itemUse'],
          ['leverAction', 'leverAction'],
          ['pistonActivate', 'pistonActivate'],
          ['playerBreakBlock', 'playerBreakBlock'],
          ['playerButtonInput', 'playerButtonInput'],
          ['playerDimensionChange', 'playerDimensionChange'],
          ['playerEmote', 'playerEmote'],
          ['playerGameModeChange', 'playerGameModeChange'],
          ['playerHotbarSelectedSlotChange', 'playerHotbarSelectedSlotChange'],
          ['playerInputModeChange', 'playerInputModeChange'],
          ['playerInputPermissionCategoryChange', 'playerInputPermissionCategoryChange'],
          ['playerInteractWithBlock', 'playerInteractWithBlock'],
          ['playerInteractWithEntity', 'playerInteractWithEntity'],
          ['playerInventoryItemChange', 'playerInventoryItemChange'],
          ['playerJoin', 'playerJoin'],
          ['playerLeave', 'playerLeave'],
          ['playerPlaceBlock', 'playerPlaceBlock'],
          ['playerSpawn', 'playerSpawn'],
          ['pressurePlatePop', 'pressurePlatePop'],
          ['pressurePlatePush', 'pressurePlatePush'],
          ['projectileHitBlock', 'projectileHitBlock'],
          ['projectileHitEntity', 'projectileHitEntity'],
          ['targetBlockHit', 'targetBlockHit'],
          ['tripWireTrip', 'tripWireTrip'],
          ['weatherChange', 'weatherChange'],
          ['worldLoad', 'worldLoad']
        ]
      },
      {
        type: 'input_value',
        name: 'CALLBACK',
        check: null
      },
      {
        type: 'input_statement',
        name: 'DO'
      }
    ],
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "event_data",
    message0: "event data",
    colour: 45,
    output: null,
    inputsInline: true
  },
  {
    type: "get_event_data",
    message0: "get %1 from event data %2",
    colour: 45,
    args0: [
      {
        type: 'field_dropdown',
        name: 'TYPE',
        options: [
          ["beforeItemStack", "beforeItemStack"],
          ["block", "block"],
          ["blockFace", "blockFace"],
          ["brokenBlockPermutation", "brokenBlockPermutation"],
          ["button", "button"],
          ["category", "category"],
          ["cause", "cause"],
          ["damage", "damage"],
          ["damageSource", "damageSource"],
          ["damagingEntity", "damagingEntity"],
          ["deadEntity", "deadEntity"],
          ["dimension", "dimension"],
          ["duration", "duration"],
          ["effect", "effect"],
          ["effectAdd", "effectAdd"],
          ["enabled", "enabled"],
          ["entity", "entity"],
          ["eventId", "eventId"],
          ["explodedBlockPermutation", "explodedBlockPermutation"],
          ["faceLocation", "faceLocation"],
          ["fromDimension", "fromDimension"],
          ["fromGameMode", "fromGameMode"],
          ["fromLocation", "fromLocation"],
          ["hitBlock", "hitBlock"],
          ["hitBlockPermutation", "hitBlockPermutation"],
          ["hitEntity", "hitEntity"],
          ["hitVector", "hitVector"],
          ["hurtEntity", "hurtEntity"],
          ["initialSpawn", "initialSpawn"],
          ["inventoryType", "inventoryType"],
          ["isExpanding", "isExpanding"],
          ["isFirstEvent", "isFirstEvent"],
          ["isPowered", "isPowered"],
          ["itemStack", "itemStack"],
          ["itemStackAfterBreak", "itemStackAfterBreak"],
          ["itemStackBeforeBreak", "itemStackBeforeBreak"],
          ["location", "location"],
          ["newButtonState", "newButtonState"],
          ["newInputModeUsed", "newInputModeUsed"],
          ["newSlotSelected", "newSlotSelected"],
          ["newValue", "newValue"],
          ["newWeather", "newWeather"],
          ["oldValue", "oldValue"],
          ["personaPieceId", "personaPieceId"],
          ["piston", "piston"],
          ["player", "player"],
          ["playerId", "playerId"],
          ["playerName", "playerName"],
          ["previousInputModeUsed", "previousInputModeUsed"],
          ["previousRedstonePower", "previousRedstonePower"],
          ["previousSlotSelected", "previousSlotSelected"],
          ["previousWeather", "previousWeather"],
          ["projectile", "projectile"],
          ["redstonePower", "redstonePower"],
          ["removedEntity", "removedEntity"],
          ["removedEntityId", "removedEntityId"],
          ["rule", "rule"],
          ["slot", "slot"],
          ["source", "source"],
          ["sources", "sources"],
          ["target", "target"],
          ["toDimension", "toDimension"],
          ["toGameMode", "toGameMode"],
          ["toLocation", "toLocation"],
          ["typeId", "typeId"],
          ["useDuration", "useDuration"],
          ["value", "value"]
      ]
      },
      {
        type: 'input_value',
        name: 'DATA',
        check: null
      },
    ],
    output: null,
    inputsInline: true
  },
  {
    type: "cancel_event",
    message0: "cancel before event %1",
    colour: 45,
    args0: [
      {
        type: 'input_value',
        name: 'EVENT',
        check: null
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "run_command_dimension",
    message0: "run command %1 in dimension %2",
    colour: 180,
    args0: [
      {
        type: 'input_value',
        name: 'COMMAND',
        check: null
      },
      {
        type: 'field_dropdown',
        name: 'DIMENSION',
        options: [
          ['overworld', 'overworld'],
          ['nether', 'nether'],
          ['the end', 'the_end']
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "run_command_player",
    message0: "run command %1 as player %2",
    colour: 180,
    args0: [
      {
        type: 'input_value',
        name: 'COMMAND',
        check: null
      },
      {
        type: 'input_value',
        name: 'PLAYER',
        check: null
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "send_message",
    message0: "send message %1 to player %2",
    colour: 180,
    args0: [
      {
        type: 'input_value',
        name: 'MESSAGE',
        check: null
      },
      {
        type: 'input_value',
        name: 'PLAYER',
        check: null
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: 'set_gamerule',
    message0: 'set gamerule %1 to %2',
    colour: 180,
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
        type: 'input_value',
        name: 'VALUE',
        check: null
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'get_gamerule',
    message0: 'get gamerule %1',
    colour: 180,
    args0: [
      {
        type: 'field_dropdown',
        name: 'RULE',
        options: [
          ['maxCommandChainLength', 'maxCommandChainLength'],
          ['randomTickSpeed', 'randomTickSpeed'],
        ]
      }
    ],
    output: null,
  },
  {
    type: 'get_gamerule_boolean',
    message0: 'get gamerule %1',
    colour: 180,
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
          ['mobGriefing', 'mobGriefing'],
          ['naturalRegeneration', 'naturalRegeneration'],
          ['pvp', 'pvp'],
          ['sendCommandFeedback', 'sendCommandFeedback'],
          ['showCoordinates', 'showCoordinates'],
          ['showDeathMessages', 'showDeathMessages'],
          ['tntExplodes', 'tntExplodes']
        ]
      }
    ],
    output: "Boolean",
  },
  {
    type: "new_form",
    message0: "new %1",
    colour: 210,
    args0: [
      {
        type: 'field_dropdown',
        name: 'TYPE',
        options: [
          ['action form', 'ActionFormData'],
          ['message form', 'MessageFormData'],
          ['modal form', 'ModalFormData']
        ]
      }
    ],
    output: null,
    inputsInline: true
  },
  {
    type: "show_form",
    message0: "show form %1 to player %2 callback %3 %4",
    colour: 210,
    args0: [
      {
        type: 'input_value',
        name: 'FORM',
        check: null
      },
      {
        type: 'input_value',
        name: 'PLAYER',
        check: null
      },
      {
        type: 'input_value',
        name: 'CALLBACK',
        check: null
      },
      {
        type: "input_statement",
        name: "DO"
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "show_form_var",
    message0: "form response",
    colour: 210,
    output: null,
    inputsInline: true
  },
  {
    type: "form_title",
    message0: "set title of form %1 to %2",
    colour: 210,
    args0: [
      {
        type: 'input_value',
        name: 'FORM',
        check: null
      },
      {
        type: 'input_value',
        name: 'TEXT',
        check: null
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "form_body",
    message0: "set body text of form %1 to %2",
    colour: 210,
    args0: [
      {
        type: 'input_value',
        name: 'FORM',
        check: null
      },
      {
        type: 'input_value',
        name: 'TEXT',
        check: null
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "form_cancel",
    message0: "set cancel button text of form %1 to %2",
    colour: 210,
    args0: [
      {
        type: 'input_value',
        name: 'FORM',
        check: null
      },
      {
        type: 'input_value',
        name: 'TEXT',
        check: null
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "form_confirm",
    message0: "set confirm button text of form %1 to %2",
    colour: 210,
    args0: [
      {
        type: 'input_value',
        name: 'FORM',
        check: null
      },
      {
        type: 'input_value',
        name: 'TEXT',
        check: null
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "form_submit",
    message0: "set submit button text of form %1 to %2",
    colour: 210,
    args0: [
      {
        type: 'input_value',
        name: 'FORM',
        check: null
      },
      {
        type: 'input_value',
        name: 'TEXT',
        check: null
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "form_button",
    message0: "add button with text %1 image %2 to form %3",
    colour: 210,
    args0: [
      {
        type: 'input_value',
        name: 'TEXT',
        check: null
      },
      {
        type: 'input_value',
        name: 'IMAGE',
        check: null
      },
      {
        type: 'input_value',
        name: 'FORM',
        check: null
      },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "form_textfield",
    message0: "add textfield with label %1 placeholder %2 default value %3 to form %4",
    colour: 210,
    args0: [
      {
        type: 'input_value',
        name: 'LABEL',
        check: null
      },
      {
        type: 'input_value',
        name: 'PLACEHOLDER',
        check: null
      },
      {
        type: 'input_value',
        name: 'DEFAULT',
        check: null
      },
      {
        type: 'input_value',
        name: 'FORM',
        check: null
      },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "form_dropdown",
    message0: "add dropdown with label %1 options from list %2 default value %3 to form %4",
    colour: 210,
    args0: [
      {
        type: 'input_value',
        name: 'LABEL',
        check: null
      },
      {
        type: 'input_value',
        name: 'OPTIONS',
        check: null
      },
      {
        type: 'input_value',
        name: 'DEFAULT',
        check: null
      },
      {
        type: 'input_value',
        name: 'FORM',
        check: null
      },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "form_slider",
    message0: "add slider with label %1 minimum value %2 maximum value %3 step value %4 default value %5 to form %6",
    colour: 210,
    args0: [
      {
        type: 'input_value',
        name: 'LABEL',
        check: null
      },
      {
        type: 'input_value',
        name: 'MIN',
        check: null
      },
      {
        type: 'input_value',
        name: 'MAX',
        check: null
      },
      {
        type: 'input_value',
        name: 'STEP',
        check: null
      },
      {
        type: 'input_value',
        name: 'DEFAULT',
        check: null
      },
      {
        type: 'input_value',
        name: 'FORM',
        check: null
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "form_toggle",
    message0: "add toggle with label %1 default value %2 to form %3",
    colour: 210,
    args0: [
      {
        type: 'input_value',
        name: 'LABEL',
        check: null
      },
      {
        type: 'input_value',
        name: 'DEFAULT',
        check: null
      },
      {
        type: 'input_value',
        name: 'FORM',
        check: null
      },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "form_response_action",
    message0: "button selection of form response %1",
    colour: 210,
    args0: [
      {
        type: 'input_value',
        name: 'RESPONSE',
        check: null
      }
    ],
    output: null,
    inputsInline: true
  },
  {
    type: "form_response_message",
    message0: "confirmation status of form response %1",
    colour: 210,
    args0: [
      {
        type: 'input_value',
        name: 'RESPONSE',
        check: null
      }
    ],
    output: "Boolean",
    inputsInline: true
  },
  {
    type: "form_response_modal",
    message0: "value of field %1 in form response %2",
    colour: 210,
    args0: [
      {
        type: 'input_value',
        name: 'FIELD',
        check: null
      },
      {
        type: 'input_value',
        name: 'RESPONSE',
        check: null
      }
    ],
    output: null,
    inputsInline: true
  },
  {
    type: "is_hardcore",
    message0: "is world in hardcore?",
    colour: 180,
    output: "Boolean",
    inputsInline: true
  },
  {
    type: 'addobjective',
    message0: 'add objective id %1 display name %2',
    colour: 320,
    args0: [
      {
        type: 'input_value',
        name: 'OBJECTIVE',
        spellcheck: false
      },
      {
        type: 'input_value',
        name: 'DISPLAY_NAME',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: 'removeobjective',
    message0: 'remove objective %1',
    colour: 320,
    args0: [
      {
        type: 'input_value',
        name: 'OBJECTIVE',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
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
        type: 'input_value',
        name: 'OBJECTIVE',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
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
    inputsInline: true
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
        type: 'input_value',
        name: 'QUANTITY'
      },
      {
        type: 'input_value',
        name: 'PLAYER',
        spellcheck: false
      },
      {
        type: 'input_value',
        name: 'OBJECTIVE',
        spellcheck: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "objective_list",
    message0: "list of objectives",
    colour: 320,
    output: null,
    inputsInline: true
  },
  {
    type: "player_list",
    message0: "list of players",
    colour: 180,
    output: null,
    inputsInline: true
  },
  {
    type: "player_property_reporter",
    message0: "get property %1 of player %2",
    colour: 180,
    args0: [
      {
        type: "field_dropdown",
        name: "PROPERTY",
        options: [
          ["camera", "camera"],
          ["clientSystemInfo", "clientSystemInfo"],
          ["commandPermissionLevel", "commandPermissionLevel"],
          ["graphicsMode", "graphicsMode"],
          ["inputInfo", "inputInfo"],
          ["inputPermissions", "inputPermissions"],
          ['level', 'level'],
          ['name', 'name'],
          ['onScreenDisplay', 'onScreenDisplay'],
          ['playerPermissionLevel', 'playerPermissionLevel'],
          ['selectedSlotIndex', 'selectedSlotIndex'],
          ['totalXpNeededForNextLevel', 'totalXpNeededForNextLevel'],
          ['xpEarnedAtCurrentLevel', 'xpEarnedAtCurrentLevel'],
        ]
      },
      {
        type: "input_value",
        name: "PLAYER",
        check: null
      }
    ],
    output: null,
    inputsInline: true
  },
  {
    type: "player_property_boolean",
    message0: "get property %1 of player %2",
    colour: 180,
    args0: [
      {
        type: "field_dropdown",
        name: "PROPERTY",
        options: [
          ['isEmoting', 'isEmoting'],
          ['isFlying', 'isFlying'],
          ['isGliding', 'isGliding'],
          ['isJumping', 'isJumping'],
        ]
      },
      {
        type: "input_value",
        name: "PLAYER",
        check: null
      }
    ],
    output: "Boolean",
    inputsInline: true
  },
]);

const colourDefinitions = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    type: 'colour_picker',
    message0: 'color from hex code %1',
    args0: [{ type: 'input_value', name: 'COLOUR', check: null }],
    output: null,
    colour: 20,
  },
  {
    type: 'colour_random',
    message0: 'random color',
    output: null,
    colour: 20
  },
  {
    type: 'colour_rgb',
    message0: 'red %1 green %2 blue %3',
    args0: [
      { type: 'input_value', name: 'RED', check: 'Number' },
      { type: 'input_value', name: 'GREEN', check: 'Number' },
      { type: 'input_value', name: 'BLUE', check: 'Number' }
    ],
    output: null,
    colour: 20
  }
]);




const bedrockScriptToolbox = {
  kind: 'categoryToolbox',
  contents: [
    // Logic
    {
      kind: 'category',
      name: 'Logic',
      colour: '%{BKY_LOGIC_HUE}',
      contents: [
        { kind: 'block', type: 'controls_if' },
        { kind: 'block', type: 'logic_compare',
          inputs: {
            A: { 
              shadow: { 
                type: 'text',
                fields: {
                  TEXT: ""
                }
              }
            },
            B: { 
              shadow: { 
                type: 'text',
                fields: {
                  TEXT: ""
                }
              }
            }
          }
        },
        { kind: 'block', type: 'logic_operation' },
        { kind: 'block', type: 'logic_negate' },
        { kind: 'block', type: 'logic_boolean' },
        { kind: 'block', type: 'logic_ternary',
          inputs: {
            THEN: { 
              shadow: { 
                type: 'text',
                fields: {
                  TEXT: ""
                }
              }
            },
            ELSE: { 
              shadow: { 
                type: 'text',
                fields: {
                  TEXT: ""
                }
              }
            }
          }
        },
      ]
    },
    // Loops
    {
      kind: 'category',
      name: 'Loops',
      colour: '%{BKY_LOOPS_HUE}',
      contents: [
        {
          kind: 'block',
          type: 'controls_repeat_ext',
          inputs: {
            TIMES: { shadow: { type: 'math_number', fields: { NUM: 10 } } }
          }
        },
        { kind: 'block', type: 'controls_whileUntil' },
        {
          kind: 'block',
          type: 'controls_for',
          inputs: {
            FROM: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
            TO: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
            BY: { shadow: { type: 'math_number', fields: { NUM: 1 } } }
          }
        },
        { kind: 'block', type: 'controls_forEach' },
        { kind: 'block', type: 'controls_flow_statements' }
      ]
    },
    // Math
    {
      kind: 'category',
      name: 'Math',
      colour: '%{BKY_MATH_HUE}',
      contents: [
        { kind: 'block', type: 'math_number' },
        { kind: 'block', type: 'math_arithmetic',
          inputs: {
            A: { 
              shadow: { 
                type: 'math_number',
                fields: {
                  NUM: 0
                }
              }
            },
            B: { 
              shadow: { 
                type: 'math_number',
                fields: {
                  NUM: 0
                }
              }
            }
          }
        },
        { kind: 'block', type: 'math_single',
          inputs: {
            NUM: { 
              shadow: { 
                type: 'math_number',
                fields: {
                  NUM: 0
                }
              }
            }
          }
        },
        { kind: 'block', type: 'math_trig',
          inputs: {
            NUM: { 
              shadow: { 
                type: 'math_number',
                fields: {
                  NUM: 0
                }
              }
            }
          }
        },
        { kind: 'block', type: 'math_constant' },
        { kind: 'block', type: 'math_number_property',
          inputs: {
            NUMBER_TO_CHECK: { 
              shadow: { 
                type: 'math_number',
                fields: {
                  NUM: 0
                }
              }
            }
          }
        },
        /*{
          kind: 'block',
          type: 'math_change',
          values: {
            DELTA: { shadow: { type: 'math_number', fields: { NUM: 1 } } }
          }
        },*/
        { kind: 'block', type: 'math_round',
          inputs: {
            NUM: { 
              shadow: { 
                type: 'math_number',
                fields: {
                  NUM: 0
                }
              }
            }
          }
        },
        { kind: 'block', type: 'math_on_list' },
        { kind: 'block', type: 'math_modulo',
          inputs: {
            DIVIDEND: { 
              shadow: { 
                type: 'math_number',
                fields: {
                  NUM: 0
                }
              }
            },
            DIVISOR: { 
              shadow: { 
                type: 'math_number',
                fields: {
                  NUM: 0
                }
              }
            }
          }
        },
        {
          kind: 'block',
          type: 'math_constrain',
          inputs: {
            LOW: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
            HIGH: { shadow: { type: 'math_number', fields: { NUM: 100 } } }
          }
        },
        {
          kind: 'block',
          type: 'math_random_int',
          inputs: {
            FROM: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
            TO: { shadow: { type: 'math_number', fields: { NUM: 100 } } }
          }
        },
        { kind: 'block', type: 'math_random_float' }
      ]
    },
    // Text
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
          inputs: { TEXT: { shadow: { type: 'text' } } }
        },
        { kind: 'block', type: 'text_length',
          inputs: {
            VALUE: { 
              shadow: { 
                type: 'text',
                fields: {
                  TEXT: ""
                }
              }
            }
          }
        },
        { kind: 'block', type: 'text_isEmpty',
          inputs: {
            VALUE: { 
              shadow: { 
                type: 'text',
                fields: {
                  TEXT: ""
                }
              }
            }
          }
        },
        {
          kind: 'block',
          type: 'text_indexOf',
          inputs: {
            VALUE: { block: { type: 'text' } },
            FIND: { shadow: { type: 'text' } }
          }
        },
        {
          kind: 'block',
          type: 'text_charAt',
          inputs: {
            VALUE: { block: { type: 'text' } },
            AT: { block: { type: 'math_number' } }
          }
        },
        { kind: 'block', type: 'text_getSubstring' },
        { kind: 'block', type: 'text_changeCase' },
        { kind: 'block', type: 'text_trim' },
        { kind: 'block', type: 'text_print' },
        { kind: 'block', type: 'text_prompt_ext' }
      ]
    },
    // Lists
    {
      kind: 'category',
      name: 'Lists',
      colour: '%{BKY_LISTS_HUE}',
      contents: [
        { kind: 'block', type: 'lists_create_with' },
        { kind: 'block', type: 'lists_repeat', inputs: { NUM: { shadow: { type: 'math_number', fields: { NUM: 5 } } } } },
        { kind: 'block', type: 'lists_length' },
        { kind: 'block', type: 'lists_isEmpty' },
        { kind: 'block', type: 'lists_indexOf' },
        { kind: 'block', type: 'lists_getIndex' },
        { kind: 'block', type: 'lists_setIndex' },
        { kind: 'block', type: 'lists_getSublist' },
        { kind: 'block', type: 'lists_sort' },
        { kind: 'block', type: 'lists_split' },
        { kind: 'block', type: 'lists_reverse' }
      ]
    },
    // Colour
    {
      kind: 'category',
      name: 'Color',
      colour: '%{BKY_COLOUR_HUE}',
      contents: [
        { kind: 'block', type: 'colour_picker', inputs: { COLOUR: { shadow: { type: 'text', fields: { TEXT: "#FF0000" } } } }},
        { kind: 'block', type: 'colour_random' },
        { kind: 'block', type: 'colour_rgb', inputs: { RED: { shadow: { type: 'math_number', fields: { NUM: 255 } } }, GREEN: { shadow: { type: 'math_number', fields: { NUM: 0 } } }, BLUE: { shadow: { type: 'math_number', fields: { NUM: 0 } } } }}
      ]
    },
    // Variables
    {
      kind: 'category',
      name: 'Variables',
      custom: 'VARIABLE',
      colour: '%{BKY_VARIABLES_HUE}'
    },
    // Functions
    {
      kind: 'category',
      name: 'Functions',
      custom: 'PROCEDURE',
      colour: '%{BKY_PROCEDURES_HUE}'
    },
    {
      kind: "sep"
    },
    {
      kind: 'category',
      name: 'Events',
      colour: 45,
      contents: [
        { kind: 'block', type: 'before_event'},
        { kind: 'block', type: 'after_event'},
        { kind: 'block', type: 'get_event_data'},
        { kind: 'block', type: 'cancel_event'}
      ]
    },
    {
      kind: 'category',
      name: 'World',
      colour: 180,
      contents: [
        { kind: 'sep'},
        { kind: 'label', text: 'Commands'},
        { kind: 'block', type: 'run_command_dimension', inputs: { COMMAND: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
        { kind: 'block', type: 'run_command_player', inputs: { COMMAND: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
        { kind: 'sep'},
        { kind: 'label', text: 'Settings'},
        { kind: 'block', type: 'set_gamerule' },
        { kind: 'block', type: 'get_gamerule' },
        { kind: 'block', type: 'get_gamerule_boolean' },
        { kind: 'block', type: 'is_hardcore' },
        { kind: 'sep'},
        { kind: 'label', text: 'Players'},
        { kind: 'block', type: 'player_list' },
        { kind: 'block', type: 'player_property_reporter' },
        { kind: 'block', type: 'player_property_boolean' },
        { kind: 'block', type: 'send_message', inputs: { MESSAGE: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
      ]
    },
    {
      kind: 'category',
      name: 'Forms',
      colour: 210,
      contents: [
        { kind: 'label', text: 'General'},
        { kind: 'block', type: 'new_form'},
        { kind: 'block', type: 'show_form'},
        { kind: 'block', type: 'form_title', inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: "" } } } }},
        { kind: 'sep'},
        { kind: 'label', text: 'Action Forms'},
        { kind: 'block', type: 'form_button', inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: "" } } }, IMAGE: { shadow: { type: 'text', fields: { TEXT: "" } } } }},
        { kind: 'block', type: 'form_response_action'},
        { kind: 'sep'},
        { kind: 'label', text: 'Message Forms'},
        { kind: 'block', type: 'form_body', inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
        { kind: 'block', type: 'form_cancel', inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
        { kind: 'block', type: 'form_confirm', inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
        { kind: 'block', type: 'form_response_message'},
        { kind: 'sep'},
        { kind: 'label', text: 'Modal Forms'},
        { kind: 'block', type: 'form_submit', inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
        { kind: 'block', type: 'form_textfield', inputs: { LABEL: { shadow: { type: 'text', fields: { TEXT: "" } } }, PLACEHOLDER: { shadow: { type: 'text', fields: { TEXT: "" } } }, DEFAULT: { shadow: { type: 'text', fields: { TEXT: "" } } } }},
        { kind: 'block', type: 'form_dropdown', inputs: { LABEL: { shadow: { type: 'text', fields: { TEXT: "" } } }, DEFAULT: { shadow: { type: 'math_number', fields: { NUM: "" } } } }},
        { kind: 'block', type: 'form_slider', inputs: { LABEL: { shadow: { type: 'text', fields: { TEXT: "" } } }, MIN: { shadow: { type: 'math_number', fields: { NUM: "" } } }, MAX: { shadow: { type: 'math_number', fields: { NUM: "" } } }, STEP: { shadow: { type: 'math_number', fields: { NUM: "" } } }, DEFAULT: { shadow: { type: 'math_number', fields: { NUM: "" } } } }},
        { kind: 'block', type: 'form_toggle', inputs: { LABEL: { shadow: { type: 'text', fields: { TEXT: "" } } }, DEFAULT: { shadow: { type: 'logic_boolean', fields: { BOOL: true } } } }},
        { kind: 'block', type: 'form_response_modal', inputs: { FIELD: { shadow: { type: 'math_number', fields: { NUM: "" } } } }}
      ]
    },
    {
        "kind": "category",
        "name": "Scoreboard",
        "colour": 320,
        "contents": [
          {
            "kind": "block",
            "type": "addobjective",
            "inputs": {
              "OBJECTIVE": {
                "shadow": {
                  "type": "text",
                  "fields": {
                    "TEXT": ""
                  }
                }
              },
              "DISPLAY_NAME": {
                "shadow": {
                  "type": "text",
                  "fields": {
                    "TEXT": ""
                  }
                }
              }
            }
          },
          {
            "kind": "block",
            "type": "removeobjective",
            "inputs": {
              "OBJECTIVE": {
                "shadow": {
                  "type": "text",
                  "fields": {
                    "TEXT": ""
                  }
                }
              }
            }
          },
          {
            "kind": "block",
            "type": "objectivedisplay",
            "inputs": {
              "OBJECTIVE": {
                "shadow": {
                  "type": "text",
                  "fields": {
                    "TEXT": ""
                  }
                }
              }
            }
          },
          {
            "kind": "block",
            "type": "hidedisplay"
          },
          {
            "kind": "block",
            "type": "operatescore",
            "inputs": {
              "QUANTITY": {
                "shadow": {
                  "type": "math_number",
                  "fields": {
                    "NUM": ""
                  }
                }
              },
              "OBJECTIVE": {
                "shadow": {
                  "type": "text",
                  "fields": {
                    "TEXT": ""
                  }
                }
              }
            }
          },
          {
            "kind": "block",
            "type": "objective_list"
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

const originalUpdate = Blockly.Procedures.mutateCallers;
Blockly.Procedures.mutateCallers = function(defBlock) {
  originalUpdate.call(this, defBlock);
  const workspace = defBlock.workspace;
  const callers = Blockly.Procedures.getCallers(defBlock.getFieldValue('NAME'), workspace);
  callers.forEach(block => {
    block.setInputsInline(true); // 👈 force inline layout for all call blocks
  });
};


Blockly.common.defineBlocks(bedrockScriptDefinitions);
Blockly.common.defineBlocks(colourDefinitions);
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

let isAdjustingReporters = false; // prevent recursive loops

workspace.addChangeListener(function(event) {
  // Ignore irrelevant events or recursive triggers
  if (isAdjustingReporters) return;
  if (event.type !== Blockly.Events.BLOCK_MOVE && event.type !== Blockly.Events.BLOCK_DELETE) {
    return;
  }

  isAdjustingReporters = true;
  try {
    // Parent block types that should spawn reporters
    const parentTypes = ['show_form', 'after_event', 'before_event'];

    // Map each parent type to its corresponding reporter type
    const reporterMap = {
      'show_form': 'show_form_var',
      'after_event': 'event_data',
      'before_event': 'event_data'
    };

    // Find all parent blocks of interest
    const allParentBlocks = workspace.getAllBlocks(false)
      .filter(b => parentTypes.includes(b.type));

    for (const parentBlock of allParentBlocks) {
      const input = parentBlock.getInput('CALLBACK');
      if (!input) continue;

      const connected = input.connection.targetBlock();

      // If nothing is connected, spawn a new reporter block
      if (!connected) {
        const reporterType = reporterMap[parentBlock.type];
        const newReporter = workspace.newBlock(reporterType);
        newReporter.initSvg();
        newReporter.render();
        input.connection.connect(newReporter.outputConnection);
      }
    }
  } finally {
    isAdjustingReporters = false;
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