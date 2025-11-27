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
    colour: 100,
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
    output: null,
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
    message0: "add text field with label %1 placeholder %2 default value %3 to form %4",
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
    type: "get_player_property",
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
    output: null,
    inputsInline: true
  },
  {
    type: "set_dynamic_property",
    message0: "set dynamic property %1 to %2",
    colour: 180,
    args0: [
      {
        type: "input_value",
        name: "PROPERTY",
        check: null
      },
      {
        type: "input_value",
        name: "VALUE",
        check: null
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "clear_dynamic_properties",
    message0: "clear dynamic properties",
    colour: 180,
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "get_dynamic_property",
    message0: "get dynamic property %1",
    colour: 180,
    args0: [
      {
        type: "input_value",
        name: "PROPERTY",
        check: null
      }
    ],
    output: null,
    inputsInline: true
  },
  {
    type: "command_parameter",
    message0: "command parameter %1",
    colour: 180,
    args0: [
      {
        type: "field_input",
        name: "PARAM",
        spellcheck: false
      }
    ],
    output: null,
    inputsInline: true
  },
  {
    type: "command_origin",
    message0: "command origin",
    colour: 180,
    output: null,
    inputsInline: true
  },
  {
    type: "set_block",
    message0: "set block at x %1 y %2 z %3 in %4 to %5",
    colour: 100,
    args0: [
      {
        type: "input_value",
        name: "X_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Y_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Z_POS",
        check: null
      },
      {
        type: "field_dropdown",
        name: "DIMENSION",
        options: [
          ["overworld", "overworld"],
          ["nether", "nether"],
          ["the end", "the_end"]
        ]
      },
      {
        type: "input_value",
        name: "BLOCK",
        check: null
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "get_absolute_time",
    message0: "absolute time since start of world",
    colour: 180,
    output: null,
    inputsInline: true
  },
  {
    type: "get_day",
    message0: "get world day counter",
    colour: 180,
    output: null,
    inputsInline: true
  },
  {
    type: "get_default_spawn",
    message0: "get default spawn location %1",
    colour: 180,
    args0: [
      {
        type: "field_dropdown",
        name: "POS",
        options: [
          ["x", "x"],
          ["y", "y"],
          ["z", "z"]
        ]
      }
    ],
    output: null,
    inputsInline: true
  },
  {
    type: "get_difficulty",
    message0: "get world difficulty",
    colour: 180,
    output: null,
    inputsInline: true
  },
  {
    type: "dynamic_property_list",
    message0: "get list of dynamic property ids",
    colour: 180,
    output: null,
    inputsInline: true
  },
  {
    type: "dynamic_property_size",
    message0: "get total dynamic property byte count",
    colour: 180,
    output: null,
    inputsInline: true
  },
  {
    type: "get_time",
    message0: "get time of day",
    colour: 180,
    output: null,
    inputsInline: true
  },
  {
    type: "get_moon_phase",
    message0: "get moon phase",
    colour: 180,
    output: null,
    inputsInline: true
  },
  {
    type: "world_play_music",
    message0: "play music track %1 to all players",
    colour: 180,
    args0: [
      {
        type: "input_value",
        name: "TRACK",
        check: null
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "world_queue_music",
    message0: "queue music track %1 to all players",
    colour: 180,
    args0: [
      {
        type: "input_value",
        name: "TRACK",
        check: null
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "set_time",
    message0: "set time of day to %1 ticks",
    colour: 180,
    args0: [
      {
        type: "input_value",
        name: "TIME",
        check: null
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "set_default_spawn",
    message0: "set default spawn point to x %1 y %2 z %3",
    colour: 180,
    args0: [
      {
        type: "input_value",
        name: "X_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Y_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Z_POS",
        check: null
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "set_difficulty",
    message0: "set difficulty to %1",
    colour: 180,
    args0: [
      {
        type: "field_dropdown",
        name: "DIFFICULTY",
        options: [
          ["peaceful", "peaceful"],
          ["easy", "easy"],
          ["normal", "normal"],
          ["hard", "hard"]
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "world_stop_music",
    message0: "stop music track for all players",
    colour: 180,
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "fill_blocks",
    message0: "fill blocks from x %1 y %2 z %3 to x %4 y %5 z %6 in %7 with %8",
    colour: 100,
    args0: [
      {
        type: "input_value",
        name: "X_POS1",
        check: null
      },
      {
        type: "input_value",
        name: "Y_POS1",
        check: null
      },
      {
        type: "input_value",
        name: "Z_POS1",
        check: null
      },
      {
        type: "input_value",
        name: "X_POS2",
        check: null
      },
      {
        type: "input_value",
        name: "Y_POS2",
        check: null
      },
      {
        type: "input_value",
        name: "Z_POS2",
        check: null
      },
      {
        type: "field_dropdown",
        name: "DIMENSION",
        options: [
          ["overworld", "overworld"],
          ["nether", "nether"],
          ["the end", "the_end"]
        ]
      },
      {
        type: "input_value",
        name: "BLOCK",
        check: null
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "create_explosion",
    message0: "create explosion at x %1 y %2 z %3 radius %4 in %5 break blocks %6 cause fire %7 allow underwater %8",
    colour: 100,
    args0: [
      {
        type: "input_value",
        name: "X_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Y_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Z_POS",
        check: null
      },
      {
        type: "input_value",
        name: "RADIUS",
        check: null
      },
      {
        type: "field_dropdown",
        name: "DIMENSION",
        options: [
          ["overworld", "overworld"],
          ["nether", "nether"],
          ["the end", "the_end"]
        ]
      },
      {
        type: "input_value",
        name: "BREAK_BLOCKS",
        check: null
      },
      {
        type: "input_value",
        name: "CAUSE_FIRE",
        check: null
      },
      {
        type: "input_value",
        name: "ALLOW_UNDERWATER",
        check: null
      },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "get_biome",
    message0: "get biome at x %1 y %2 z %3",
    colour: 100,
    args0: [
      {
        type: "input_value",
        name: "X_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Y_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Z_POS",
        check: null
      }
    ],
    output: null,
    inputsInline: true
  },
  {
    type: "get_block",
    message0: "get block at x %1 y %2 z %3",
    colour: 100,
    args0: [
      {
        type: "input_value",
        name: "X_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Y_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Z_POS",
        check: null
      }
    ],
    output: null,
    inputsInline: true
  },
  {
    type: "get_block_property",
    message0: "get property %1 of block %2",
    colour: 100,
    args0: [
      {
        type: "field_dropdown",
        name: "PROPERTY",
        options: [
          ["dimension", "dimension"],
          ["is air", "isAir"],
          ["is liquid", "isLiquid"],
          ["is valid", "isValid"],
          ["is waterlogged", "isWaterlogged"],
          ["localizationKey", "localizationKey"],
          ["x position", "x"],
          ["y position", "y"],
          ["z position", "z"],
          ["type id", "typeId"],
          ["above", "above()"],
          ["below", "below()"],
          ["can be destroyed by liquid spread", "canBeDestroyedByLiquidSpread()"],
          ["can contain liquid", "canContainLiquid()"],
          ["is liquid blocking", "isLiquidBlocking()"],
          ["liquid can flow from direction", "liquidCanFlowFromDirection()"],
          ["liquid spread causes spawn", "liquidSpreadCausesSpawn()"],
          ["north", "north()"],
          ["east", "east()"],
          ["south", "south()"],
          ["west", "west()"],
          ["light level", "getLightLevel()"],
          ["sky light level", "getSkyLightLevel()"],
          ["redstone power", "getRedstonePower()"]
        ]
      },
      {
        type: "input_value",
        name: "BLOCK",
        check: null
      }
    ],
    output: null,
    inputsInline: true
  },
  {
    type: "get_block_component",
    message0: "get component %1 of block %2",
    colour: 100,
    args0: [
      {
        type: "input_value",
        name: "COMPONENT",
        check: null
      },
      {
        type: "input_value",
        name: "BLOCK",
        check: null
      }
    ],
    output: null,
    inputsInline: true
  },
  {
    type: "json_stringify",
    message0: "stringify array/object %1",
    colour: 260,
    args0: [
      {
        type: "input_value",
        name: "OBJECT",
        check: null
      }
    ],
    output: null,
    inputsInline: true
  },
  {
    type: "json_parse",
    message0: "parse stringified array/object %1",
    colour: 260,
    args0: [
      {
        type: "input_value",
        name: "OBJECT",
        check: null
      }
    ],
    output: null,
    inputsInline: true
  },
  {
    type: "set_block_type",
    message0: "set type of block %1 to %2",
    colour: 100,
    args0: [
      {
        type: "input_value",
        name: "BLOCK",
        check: null
      },
      {
        type: "input_value",
        name: "TYPE",
        check: null
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "set_block_waterlogged",
    message0: "set block %1 to %2",
    colour: 100,
    args0: [
      {
        type: "input_value",
        name: "BLOCK",
        check: null
      },
      {
        type: "field_dropdown",
        name: "TYPE",
        options: [
          ["waterlogged", "true"],
          ["not waterlogged", "false"]
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "get_entities",
    message0: "get entities",
    colour: 100,
    output: null,
    inputsInline: true
  },
  {
    type: "get_entities_at_location",
    message0: "get entities at x %1 y %2 z %3",
    colour: 100,
    args0: [
      {
        type: "input_value",
        name: "X_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Y_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Z_POS",
        check: null
      }
    ],
    output: null,
    inputsInline: true
  },
  {
    type: "get_players_dimension",
    message0: "get list of players in dimension %1",
    colour: 100,
    args0: [
      {
        type: "field_dropdown",
        name: "DIMENSION",
        options: [
          ["overworld", "overworld"],
          ["nether", "nether"],
          ["the end", "the_end"]
        ]
      }
    ],
    output: null,
    inputsInline: true
  },
  {
    type: "is_chunk_loaded",
    message0: "is chunk at x %1 y %2 z %3 in %4 loaded?",
    colour: 100,
    args0: [
      {
        type: "input_value",
        name: "X_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Y_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Z_POS",
        check: null
      },
      {
        type: "field_dropdown",
        name: "DIMENSION",
        options: [
          ["overworld", "overworld"],
          ["nether", "nether"],
          ["the end", "the_end"]
        ]
      }
    ],
    output: "Boolean",
    inputsInline: true
  },
  {
    type: "play_sound_all",
    message0: "play sound %1 to all players in %2",
    colour: 100,
    args0: [
      {
        type: "input_value",
        name: "SOUND",
        check: null
      },
      {
        type: "field_dropdown",
        name: "DIMENSION",
        options: [
          ["overworld", "overworld"],
          ["nether", "nether"],
          ["the end", "the_end"]
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "get_entities",
    message0: "get entities",
    colour: 100,
    output: null,
    inputsInline: true
  },
  {
    type: "set_weather",
    message0: "set weather to %1 for %2 seconds",
    colour: 100,
    args0: [
      {
        type: "field_dropdown",
        name: "WEATHER",
        options: [
          ["clear", "clear"],
          ["rain", "rain"],
          ["thunder", "thunder"]
        ]
      },
      {
        type: "input_value",
        name: "DURATION",
        check: null
      },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "spawn_entity",
    message0: "spawn entity %1 at x %2 y %3 z %4",
    colour: 100,
    args0: [
      {
        type: "input_value",
        name: "ENTITY",
        check: null
      },
      {
        type: "input_value",
        name: "X_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Y_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Z_POS",
        check: null
      },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "spawn_item",
    message0: "spawn %1 of item %2 at x %3 y %4 z %5",
    colour: 100,
    args0: [
      {
        type: "input_value",
        name: "QUANTITY",
        check: null
      },
      {
        type: "input_value",
        name: "ITEM",
        check: null
      },
      {
        type: "input_value",
        name: "X_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Y_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Z_POS",
        check: null
      },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "spawn_particle",
    message0: "create particle emitter type %1 at x %2 y %3 z %4",
    colour: 100,
    args0: [
      {
        type: "input_value",
        name: "PARTICLE",
        check: null
      },
      {
        type: "input_value",
        name: "X_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Y_POS",
        check: null
      },
      {
        type: "input_value",
        name: "Z_POS",
        check: null
      },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  },
  {
    type: "get_entity_property",
    message0: "get property %1 of entity %2",
    colour: 100,
    args0: [
      {
        type: "field_dropdown",
        name: "PROPERTY",
        options: [
          ["dimension", "dimension"],
          ["uuid", "id"],
          ["is climbing", "isClimbing"],
          ["is falling", "isFalling"],
          ["is in water", "isInWater"],
          ["is on ground", "isOnGround"],
          ["is sleeping", "isSleeping"],
          ["is sneaking", "isSneaking"],
          ["is sprinting", "isSprinting"],
          ["is swimming", "isSwimming"],
          ["is valid", "isValid"],
          ["localization key", "localizationKey"],
          ["x position", "location.x"],
          ["y position", "location.y"],
          ["z position", "location.z"],
          ["name", "nameTag"],
          ["type id", "typeId"],
        ]
      },
      {
        type: "input_value",
        name: "ENTITY",
        check: null
      }
    ],
    output: null,
    inputsInline: true
  },
  {
    type: "set_entity_property",
    message0: "set property %1 of entity %2 to %3",
    colour: 100,
    args0: [
      {
        type: "field_dropdown",
        name: "PROPERTY",
        options: [
          ["is sneaking", "isSneaking"],
          ["name", "nameTag"],
        ]
      },
      {
        type: "input_value",
        name: "ENTITY",
        check: null
      },
      {
        type: "input_value",
        name: "VALUE",
        check: null
      }
    ],
    output: null,
    inputsInline: true
  },
]);

const additionalDefinitions = Blockly.common.createBlockDefinitionsFromJsonArray([
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
  },
  {
    "type": "json_create",
    "message0": "new object",
    "output": null,
    "colour": 260
  },
  {
    "type": "json_get_prop",
    "message0": "get property %1 from object %2",
    "args0": [
      {
        "type": "input_value",
        "name": "KEY",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "OBJ"
      }
    ],
    "output": null,
    "colour": 260,
    inputsInline: true
  },
  {
    "type": "json_set_prop",
    "message0": "set property in object %1 key %2 value %3",
    "args0": [
      {
        "type": "input_value",
        "name": "OBJ"
      },
      {
        "type": "input_value",
        "name": "KEY",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    inputsInline: true
  },
  {
    "type": "json_delete_prop",
    "message0": "delete property in object %1 key %2",
    "args0": [
      {
        "type": "input_value",
        "name": "OBJ"
      },
      {
        "type": "input_value",
        "name": "KEY",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    inputsInline: true
  },
  {
    "type": "json_has_prop",
    "message0": "object %1 has key %2",
    "args0": [
      {
        "type": "input_value",
        "name": "OBJ"
      },
      {
        "type": "input_value",
        "name": "KEY",
        "check": "String"
      }
    ],
    "output": "Boolean",
    "colour": 260,
    inputsInline: true
  },
  {
    "type": "json_keys",
    "message0": "keys of object %1",
    "args0": [
      {
        "type": "input_value",
        "name": "OBJ"
      }
    ],
    "output": null,
    "colour": 260,
    inputsInline: true
  },
  {
    "type": "json_merge",
    "message0": "merge object %1 with %2",
    "args0": [
      {
        "type": "input_value",
        "name": "A"
      },
      {
        "type": "input_value",
        "name": "B"
      }
    ],
    "output": null,
    "colour": 260,
    inputsInline: true
  },
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
            VALUE: { shadow: { type: 'text' } },
            FIND: { shadow: { type: 'text' } }
          }
        },
        {
          kind: 'block',
          type: 'text_charAt',
          inputs: {
            VALUE: { shadow: { type: 'text' } },
            AT: { shadow: { type: 'math_number' } }
          }
        },
        { kind: 'block', type: 'text_getSubstring',
          inputs: {
            STRING: { shadow: { type: 'text' } },
            AT1: { shadow: { type: 'math_number' } },
            AT2: { shadow: { type: 'math_number' } }
          }
        },
        { kind: 'block', type: 'text_changeCase',
          inputs: {
            TEXT: { shadow: { type: 'text' } }
          }
        },
        { kind: 'block', type: 'text_trim',
          inputs: {
            TEXT: { shadow: { type: 'text' } }
          }
        },
        { kind: 'block', type: 'text_print',
          inputs: {
            TEXT: {shadow:{type:'text'}}
          }
        }
      ]
    },
    // Lists
    {
      kind: 'category',
      name: 'Lists',
      colour: '%{BKY_LISTS_HUE}',
      contents: [
        { kind: 'label', text: 'Arrays'},
        { kind: 'block', type: 'lists_create_with' },
        { kind: 'block', type: 'lists_repeat', inputs: { ITEM:{shadow:{type:'text'}}, NUM: { shadow: { type: 'math_number', fields: { NUM: 5 } } } } },
        { kind: 'block', type: 'lists_length' },
        { kind: 'block', type: 'lists_isEmpty' },
        { kind: 'block', type: 'lists_indexOf',
          inputs: {
            FIND: {shadow:{type:'text'}}
          }
        },
        { kind: 'block', type: 'lists_getIndex',
          inputs: {
            AT: {shadow:{type:'math_number'}}
          }
        },
        { kind: 'block', type: 'lists_setIndex',
          inputs: {
            AT: {shadow:{type:'math_number'}},
            TO: {shadow:{type:'text'}}
          }
        },
        { kind: 'block', type: 'lists_getSublist',
          inputs: {
            AT1: {shadow:{type:'math_number'}},
            AT2: {shadow:{type:'math_number'}}
          }
        },
        { kind: 'block', type: 'lists_sort' },
        { kind: 'block', type: 'lists_split',
          inputs: {
            INPUT: {shadow:{type:'text'}},
            DELIM: {shadow:{type:'text'}}
          }
        },
        { kind: 'block', type: 'lists_reverse' },
        { kind: 'sep'},
        { kind: 'label', text: 'Objects'},
        { kind: 'block', type: 'json_create' },
        { kind: 'block', type: 'json_get_prop',
          inputs: {
            KEY: {shadow:{type:'text'}}
          }
        },
        { kind: 'block', type: 'json_set_prop',
          inputs: {
            KEY: {shadow:{type:'text'}},
            VALUE: {shadow:{type:'text'}}
          }
        },
        { kind: 'block', type: 'json_delete_prop',
          inputs: {
            KEY: {shadow:{type:'text'}}
          }
        },
        { kind: 'block', type: 'json_has_prop',
          inputs: {
            KEY: {shadow:{type:'text'}}
          }
        },
        { kind: 'block', type: 'json_keys' },
        { kind: 'block', type: 'json_merge' },
        { kind: 'sep'},
        { kind: 'label', text: 'JSON'},
        { kind: 'block', type: 'json_stringify' },
        { kind: 'block', type: 'json_parse' },
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
    /*{
      kind: 'category',
      name: 'Functions',
      colour: '%{BKY_PROCEDURES_HUE}',
      contents: [
        { kind: 'block', type: 'custom_procedure_def'},
        { kind: 'block', type: 'custom_procedure_call'},
      ]
    },*/
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
        { kind: 'block', type: 'register_command' },
        { kind: 'block', type: 'command_parameter' },
        { kind: 'block', type: 'command_origin' },
        { kind: 'sep'},
        { kind: 'label', text: 'Settings'},
        { kind: 'block', type: 'set_gamerule' },
        { kind: 'block', type: 'get_gamerule' },
        { kind: 'block', type: 'is_hardcore' },
        { kind: 'block', type: 'get_default_spawn' },
        { kind: 'block', type: 'set_default_spawn', inputs: { X_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Y_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Z_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } } } },
        { kind: 'block', type: 'get_difficulty' },
        { kind: 'block', type: 'set_difficulty' },
        { kind: 'sep'},
        { kind: 'label', text: 'Dynamic Properties'},
        { kind: 'block', type: 'set_dynamic_property', inputs: { PROPERTY: { shadow: { type: 'text', fields: { TEXT: "" } } }, VALUE: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
        { kind: 'block', type: 'get_dynamic_property', inputs: { PROPERTY: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
        { kind: 'block', type: 'clear_dynamic_properties' },
        { kind: 'block', type: 'dynamic_property_list' },
        { kind: 'block', type: 'dynamic_property_size' },
        { kind: 'sep'},
        { kind: 'label', text: 'Players'},
        { kind: 'block', type: 'player_list' },
        { kind: 'block', type: 'get_player_property' },
        { kind: 'block', type: 'send_message', inputs: { MESSAGE: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
        { kind: 'block', type: 'world_play_music', inputs: { TRACK: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
        { kind: 'block', type: 'world_queue_music', inputs: { TRACK: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
        { kind: 'block', type: 'world_stop_music' },
        { kind: 'sep'},
        { kind: 'label', text: 'Time'},
        { kind: 'block', type: 'get_absolute_time' },
        { kind: 'block', type: 'get_day' },
        { kind: 'block', type: 'get_moon_phase' },
        { kind: 'block', type: 'get_time' },
        { kind: 'block', type: 'set_time', inputs: { TIME: { shadow: { type: 'math_number', fields: { NUM: "" } } } } },
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
      kind: 'category',
      name: 'Dimension',
      colour: 100,
      contents: [
        { kind: 'label', text: 'Blocks'},
        { kind: 'block', type: 'set_block', inputs: { X_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Y_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Z_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, BLOCK: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
        { kind: 'block', type: 'fill_blocks', inputs: { X_POS1: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Y_POS1: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Z_POS1: { shadow: { type: 'math_number', fields: { NUM: "" } } }, X_POS2: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Y_POS2: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Z_POS2: { shadow: { type: 'math_number', fields: { NUM: "" } } }, BLOCK: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
        { kind: 'block', type: 'create_explosion', inputs: { X_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Y_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Z_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, RADIUS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, BREAK_BLOCKS: { shadow: { type: 'logic_boolean', fields: { BOOL: false } } }, CAUSE_FIRE: { shadow: { type: 'logic_boolean', fields: { BOOL: false } } }, ALLOW_UNDERWATER: { shadow: { type: 'logic_boolean', fields: { BOOL: false } } } } },
        { kind: 'block', type: 'get_biome', inputs: { X_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Y_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Z_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } } } },
        { kind: 'block', type: 'get_block', inputs: { X_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Y_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Z_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } } } },
        { kind: 'block', type: 'get_block_property'},
        { kind: 'block', type: 'get_block_component', inputs: { COMPONENT: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
        { kind: 'block', type: 'set_block_type', inputs: { TYPE: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
        { kind: 'block', type: 'set_block_waterlogged'},
        { kind: 'sep' },
        { kind: 'label', text: 'Entities'},
        { kind: 'block', type: 'get_entities'},
        { kind: 'block', type: 'get_entities_at_location', inputs: { X_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Y_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Z_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } } } },
        { kind: 'block', type: 'get_entity_property'},
        { kind: 'block', type: 'set_entity_property', inputs: { VALUE: { shadow: { type: 'text', fields: { TEXT: "" } } } }},
        { kind: 'block', type: 'spawn_entity', inputs: { ENTITY: { shadow: { type: 'text', fields: { TEXT: "" } } }, X_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Y_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Z_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } } } },
        { kind: 'block', type: 'spawn_item', inputs: { ITEM: { shadow: { type: 'text', fields: { TEXT: "" } } }, QUANTITY: { shadow: { type: 'math_number', fields: { NUM: "" } } }, X_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Y_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Z_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } } } },
        { kind: 'block', type: 'spawn_particle', inputs: { PARTICLE: { shadow: { type: 'text', fields: { TEXT: "" } } }, X_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Y_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Z_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } } } },
        { kind: 'block', type: 'get_players_dimension'},
        { kind: 'sep' },
        { kind: 'label', text: 'Other'},
        { kind: 'block', type: 'is_chunk_loaded', inputs: { X_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Y_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } }, Z_POS: { shadow: { type: 'math_number', fields: { NUM: "" } } } } },
        { kind: 'block', type: 'play_sound_all', inputs: { SOUND: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
        { kind: 'block', type: 'run_command_dimension', inputs: { COMMAND: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
        { kind: 'block', type: 'set_weather', inputs: { DURATION: { shadow: { type: 'math_number', fields: { NUM: "" } } } } },
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


Blockly.common.defineBlocks(bedrockScriptDefinitions);
Blockly.common.defineBlocks(additionalDefinitions);


Blockly.common.defineBlocks({
  register_command: {
    init: function () {
      this.parameterCount_ = 0;
      this.parameterData_ = this.parameterData_ || [];

      // ----- NAME (FieldInput instead of appendValueInput) -----
      this.appendDummyInput("NAME_INPUT")
          .appendField("register command with name")
          .appendField(new Blockly.FieldTextInput(""), "NAME");

      // ----- DESCRIPTION (FieldInput instead of appendValueInput) -----
      this.appendDummyInput("DESCRIPTION_INPUT")
          .appendField("description")
          .appendField(new Blockly.FieldTextInput(""), "DESCRIPTION");

      // ----- PERMISSION LEVEL -----
      this.appendDummyInput("PERMISSION_INPUT")
        .appendField("permission level")
        .appendField(
          new Blockly.FieldDropdown([
            ["Any", "Any"],
            ["GameDirectors", "GameDirectors"],
            ["Admin", "Admin"],
            ["Host", "Host"],
            ["Owner", "Owner"]
          ]),
          "PERMISSION_LEVEL"
        );

      // ----- ADD PARAM BUTTON -----
      const addBtn = new Blockly.FieldLabel("+", undefined, "param-button");
      addBtn.CLICKABLE = true;

      this.appendDummyInput("ADD_PARAM")
        .appendField(addBtn, "ADD_PARAM_BTN");

      addBtn.onMouseDown_ = (e) => {
        e.stopPropagation();
        this.parameterData_.push({
          name: "name",
          type: "OPTION1",
          optional: false
        });
        this.updateParameters_();
      };

      // ----- CODE STATEMENTS -----
      this.appendStatementInput("CODE").appendField("code");

      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(180);
    },


    mutationToDom: function () {
      const m = document.createElement("mutation");
      
      // Ensure parameterData_ exists
      if (!this.parameterData_) this.parameterData_ = [];

      m.setAttribute("count", this.parameterData_.length);

      // Save each parameter as <param ... />
      this.parameterData_.forEach((p) => {
        const el = document.createElement("param");
        el.setAttribute("name", p.name);
        el.setAttribute("type", p.type);
        el.setAttribute("optional", p.optional ? "true" : "false");
        m.appendChild(el);
      });

      return m;
    },

    domToMutation: function (xml) {
      const count = parseInt(xml.getAttribute("parameters") || "0", 10);

      if (!this.parameterData_) this.parameterData_ = [];

      // Make sure the array has the correct number of items
      while (this.parameterData_.length < count) {
        this.parameterData_.push({
          name: "name",
          type: "OPTION1",
          optional: false
        });
      }
      while (this.parameterData_.length > count) {
        this.parameterData_.pop();
      }

      this.updateParameters_();
    },

    updateParameters_: function () {
      // Initialize storage if it doesn't exist
      if (!this.parameterData_) this.parameterData_ = [];

      // Remove all existing PARAM inputs
      let i = 0;
      while (this.getInput("PARAM" + i)) {
        this.removeInput("PARAM" + i);
        i++;
      }

      // Rebuild PARAM inputs from parameterData_
      for (let i = 0; i < this.parameterData_.length; i++) {
        const data = this.parameterData_[i];

        const removeBtn = new Blockly.FieldLabel("×", undefined, "param-button");
        removeBtn.CLICKABLE = true;

        // Create the dropdown
        const typeDropdown = new Blockly.FieldDropdown([
          ["BlockType", "BlockType"],
          ["Boolean", "Boolean"],
          ["EntitySelector", "EntitySelector"],
          ["Float", "Float"],
          ["Integer", "Integer"],
          ["ItemType", "ItemType"],
          ["Location", "Location"],
          ["PlayerSelector", "PlayerSelector"],
          ["String", "String"]
        ]);
        typeDropdown.setValue(data.type); // <-- set initial value
        typeDropdown.setValidator(function (val) {
          data.type = val;
          return val;
        });

        const input = this.appendDummyInput("PARAM" + i)
          .appendField("param " + (i + 1))
          .appendField(new Blockly.FieldTextInput(data.name, function (val) {
            data.name = val;
          }), "PARAM_NAME_" + i)
          .appendField(typeDropdown, "PARAM_DROPDOWN_" + i)
          .appendField(new Blockly.FieldCheckbox(data.optional ? "TRUE" : "FALSE", function (val) {
            data.optional = val === "TRUE";
          }), "PARAM_OPTIONAL_" + i)
          .appendField(removeBtn, "REMOVE_BTN_" + i);

        // Remove button removes this parameter from the array
        removeBtn.getClickTarget_().onclick = ((index) => {
          return (e) => {
            e.stopPropagation();
            this.parameterData_.splice(index, 1);
            this.updateParameters_();
          };
        })(i);

        this.moveInputBefore("PARAM" + i, "CODE");
      }
    },
  },
});


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
      if (parentBlock.type === 'register_command') {
        // Loop through each dynamic parameter input
        const paramCount = parentBlock.parameterCount_ || 0;
        for (let i = 0; i < paramCount; i++) {
          const input = parentBlock.getInput('PARAM' + i);
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
      } else {
        // Existing behavior for CALLBACK inputs
        const input = parentBlock.getInput('CALLBACK');
        if (!input) continue;

        const connected = input.connection.targetBlock();
        if (!connected) {
          const reporterType = reporterMap[parentBlock.type];
          const newReporter = workspace.newBlock(reporterType);
          newReporter.initSvg();
          newReporter.render();
          input.connection.connect(newReporter.outputConnection);
        }
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