let textures;
let elementData = {};
let currentEntityTextures = [["default", ""]];
let selectedTexture;
let selectedModel;
let currentTextureSelecting;
let currentModelSelecting;
let currentLootTableSelecting;

// new start
let advEditorComponent;
let advEditorInput;
let advEditorType;
let advEditorCurrentData;
let textureSelectorMode;
let tableSelectorMode;
// new end

const componentDefinitions = {
  "Health": {
    name: "Health",
    id: "minecraft:health",
    inputs: [
      {
        type: "number",
        name: "value",
        label: "Current Health",
        tooltip: "The entity's starting health value when it spawns."
      },
      {
        type: "number",
        name: "max",
        label: "Maximum Health",
        tooltip: "The maximum amount of health this entity can have."
      }
    ],
    requires: false
  },

  "Attack Damage": {
    name: "Attack Damage",
    id: "minecraft:attack",
    inputs: [
      {
        type: "number",
        name: "damage",
        label: "Damage",
        tooltip: "The amount of damage dealt when the entity performs a melee attack."
      }
    ],
    requires: false
  },

  "Movement Speed": {
    name: "Movement Speed",
    id: "minecraft:movement",
    inputs: [
      {
        type: "number",
        name: "value",
        label: "Speed",
        tooltip: "Controls how fast the entity moves while walking or running."
      }
    ],
    requires: false
  },

  "Collision Box": {
    name: "Collision Box",
    id: "minecraft:collision_box",
    inputs: [
      {
        type: "number",
        name: "width",
        label: "Width",
        tooltip: "The width of the entity's collision box."
      },
      {
        type: "number",
        name: "height",
        label: "Height",
        tooltip: "The height of the entity's collision box."
      }
    ],
    requires: false
  },

  "Can Fly": {
    name: "Can Fly",
    id: "minecraft:can_fly",
    inputs: [
      {
        type: "boolean",
        name: "main",
        label: "Can Fly",
        tooltip: "Allows the entity to fly instead of being affected by gravity."
      }
    ],
    requires: false
  },

  "Can Climb": {
    name: "Can Climb",
    id: "minecraft:can_climb",
    inputs: [
      {
        type: "boolean",
        name: "main",
        label: "Can Climb",
        tooltip: "Allows the entity to climb ladders, vines, and other climbable blocks."
      }
    ],
    requires: false
  },

  "Buoyant": {
    name: "Buoyant",
    id: "minecraft:buoyant",
    inputs: [
      {
        type: "boolean",
        name: "main",
        label: "Buoyant",
        tooltip: "Causes the entity to float in water or lava instead of sinking."
      }
    ],
    requires: false
  },

  "Fire Immune": {
    name: "Fire Immune",
    id: "minecraft:fire_immune",
    inputs: [
      {
        type: "boolean",
        name: "main",
        label: "Fire Immune",
        tooltip: "Prevents the entity from taking damage from fire and lava."
      }
    ],
    requires: false
  },

  "Random Stroll Behavior": {
    name: "Random Stroll Behavior",
    id: "minecraft:behavior.random_stroll",
    inputs: [
      {
        type: "number",
        name: "priority",
        label: "Priority",
        tooltip: "Determines how important this behavior is compared to other behaviors."
      },
      {
        type: "number",
        name: "speed_multiplier",
        label: "Speed Multiplier",
        tooltip: "Controls how fast the entity moves while wandering."
      }
    ],
    requires: false
  },

  "Melee Attack Behavior": {
    name: "Melee Attack Behavior",
    id: "minecraft:behavior.melee_attack",
    inputs: [
      {
        type: "number",
        name: "priority",
        label: "Priority",
        tooltip: "Determines how important attacking is compared to other behaviors."
      },
      {
        type: "number",
        name: "speed_multiplier",
        label: "Speed Multiplier",
        tooltip: "Controls how fast the entity moves while attacking."
      }
    ],
    requires: false
  },

  "Panic Behavior": {
    name: "Panic Behavior",
    id: "minecraft:behavior.panic",
    inputs: [
      {
        type: "number",
        name: "priority",
        label: "Priority",
        tooltip: "Determines how urgently the entity panics when threatened."
      },
      {
        type: "number",
        name: "speed_multiplier",
        label: "Speed Multiplier",
        tooltip: "Controls how fast the entity runs while panicking."
      }
    ],
    requires: false
  },

  "Loot": {
    name: "Loot",
    id: "minecraft:loot",
    inputs: [
      {
        type: "loot_table",
        name: "table",
        label: "Loot Table",
        tooltip: "The loot table that determines what items this entity drops when it dies."
      }
    ],
    requires: false
  },

  "Effect Immunity": {
    name: "Effect Immunity",
    id: "minecraft:mob_effect_immunity",
    inputs: [
      {
        type: "list",
        name: "effects",
        label: "Immune Effects",
        tooltip: "Status effects that this entity is immune to."
      }
    ],
    requires: false
  },

  "Apply Effect": {
    name: "Apply Effect",
    id: "minecraft:mob_effect",
    inputs: [
      {
        type: "text",
        name: "effect",
        label: "Effect",
        tooltip: "The status effect that will be applied."
      },
      {
        type: "number",
        name: "duration",
        label: "Duration",
        tooltip: "How long the effect lasts in seconds."
      },
      {
        type: "number",
        name: "range",
        label: "Range",
        tooltip: "The range of the applied effect."
      },
      {
        type: "number",
        name: "cooldown",
        label: "Cooldown",
        tooltip: "The amount of time between each application of the effect."
      },
      {
        type: "list",
        name: "entity_filter",
        label: "Entity Filter",
        tooltip: "The list of entities the effect can be applied to."
      },
      {
        type: "boolean",
        name: "ambient",
        label: "Ambient",
        tooltip: "Whether the effect should be treated as ambient, like beacon effects."
      }
    ],
    requires: false
  },

  "Spawn Weight": {
    name: "Spawn Weight",
    id: "minecraft:weight",
    inputs: [
      {
        type: "number",
        name: "value",
        label: "Weight",
        tooltip: "Controls how likely this entity is to spawn compared to others."
      }
    ],
    requires: false
  },

  "Transient": {
    name: "Transient",
    id: "minecraft:transient",
    inputs: [
      {
        type: "boolean",
        name: "main",
        label: "Transient",
        tooltip: "Prevents the entity from persisting in the world for long periods."
      }
    ],
    requires: false
  },

  "Interactable": {
    name: "Interactable",
    id: "minecraft:interact",
    inputs: [
        {
            type: "text",
            name: "interact_text",
            label: "Interact Button Text",
            tooltip: "The text that is shown on the interact button when using touchscreen controls."
        },
        {
            type: "list",
            name: "play_sounds",
            label: "Play Sounds",
            tooltip: "The list of sounds that will be played when the entity is interacted with."
        },
        {
            type: "number",
            name: "cooldown",
            label: "Cooldown",
            tooltip: "The time in seconds between entity interactions."
        }
    ],
    requires: false
  },

  "Add Rider": {
    name: "Add Rider",
    id: "minecraft:addrider",
    inputs: [
        {
            type: "text",
            name: "entity_type",
            label: "Entity Type",
            tooltip: "The type of entity that will spawn riding this one."
        }
    ],
    requires: ["Rideable"]
  },

  "Break Door": {
    name: "Break Door",
    id: "minecraft:annotation.break_door",
    inputs: [
        {
            type: "number",
            name: "break_time",
            label: "Break Time",
            tooltip: "The amount of time, in seconds, that it takes the entity to break through doors."
        },
        {
            type: "dropdown",
            name: "min_difficulty",
            label: "Minimum Difficulty",
            tooltip: "The minimum difficulty setting for the entity to be able to break through doors.",
            options: [
                "peaceful",
                "easy",
                "normal",
                "hard"
            ]
        }
    ],
    requires: false
  },

  "Open Door": {
    name: "Open Door",
    id: "minecraft:annotation.open_door",
    inputs: [],
    requires: false
  },

  "Attack Cooldown": {
    name: "Attack Cooldown",
    id: "minecraft:attack_cooldown",
    inputs: [
        {
            type: "number",
            name: "attack_cooldown_time_min",
            label: "Min Attack Cooldown Time",
            tooltip: "The minimum amount of time, in seconds, that the attack cooldown lasts."
        },
        {
            type: "number",
            name: "attack_cooldown_time_max",
            label: "Max Attack Cooldown Time",
            tooltip: "The maximum amount of time, in seconds, that the attack cooldown lasts."
        }
    ],
    requires: false
  },

  "Barter": {
    name: "Barter",
    id: "minecraft:barter",
    inputs: [
        {
            type: "loot_table",
            name: "barter_table",
            label: "Barter Table",
            tooltip: "The loot table that will be used for the randomized item trades."
        },
        {
            type: "number",
            name: "cooldown_after_being_attacked",
            label: "Cooldown After Being Attacked",
            tooltip: "The duration, in seconds, that the entity will not barter after being attacked."
        }
    ],
    requires: false
  },

  "Boss": {
    name: "Boss",
    id: "minecraft:boss",
    inputs: [
        {
            type: "text",
            name: "name",
            label: "Name",
            tooltip: "The name of the entity that appears above the boss HUD."
        },
        {
            type: "number",
            name: "hud_range",
            label: "HUD Range",
            tooltip: "The distance from which the boss HUD can be seen."
        },
        {
            type: "boolean",
            name: "should_darken_sky",
            label: "Should Darken Sky",
            tooltip: "Whether the sky should darken in the presence of the entity."
        }
    ],
    requires: false
  },

  "Breathable": {
    name: "Breathable",
    id: "minecraft:breathable",
    inputs: [
        {
            type: "boolean",
            name: "breathes_air",
            label: "Breathes Air",
            tooltip: "Whether the entity can breathe in air."
        },
        {
            type: "boolean",
            name: "breathes_water",
            label: "Breathes Water",
            tooltip: "Whether the entity can breathe in water."
        },
        {
            type: "boolean",
            name: "breathes_solids",
            label: "Breathes Solids",
            tooltip: "Whether the entity can breathe in solids."
        },
        {
            type: "boolean",
            name: "breathes_lava",
            label: "Breathes Lava",
            tooltip: "Whether the entity can breathe in lava."
        },
        {
            type: "boolean",
            name: "can_dehydrate",
            label: "Can Dehydrate",
            tooltip: "Whether the entity takes dehydration damage when out of water."
        },
        {
            type: "boolean",
            name: "generates_bubbles",
            label: "Generates Bubbles",
            tooltip: "Whether the entity generates bubble particles when in water."
        },
        {
            type: "boolean",
            name: "inhale_time",
            label: "Inhale Time",
            tooltip: "The amount of time, in seconds, the entity takes to recover breath to maximum."
        },
        {
            type: "boolean",
            name: "total_supply",
            label: "Total Supply",
            tooltip: "The time, in seconds, the entity can hold its breath."
        }
    ],
    requires: false
  },

  "Burns in Daylight": {
    name: "Burns in Daylight",
    id: "minecraft:burns_in_daylight",
    inputs: [
        {
            type: "boolean",
            name: "main",
            label: "Burns in Daylight",
            tooltip: "Whether the entity should burn in daylight."
        }
    ],
    requires: false
  },

  "Can Join Raid": {
    name: "Can Join Raid",
    id: "minecraft:can_join_raid",
    inputs: [
        {
            type: "boolean",
            name: "main",
            label: "Can Join Raid",
            tooltip: "Whether the entity can join an existing raid."
        }
    ],
    requires: false
  },

  "Can Power Jump": {
    name: "Can Power Jump",
    id: "minecraft:can_power_jump",
    inputs: [
        {
            type: "boolean",
            name: "main",
            label: "Can Power Jump",
            tooltip: "Whether the entity can power jump, like vanilla horses."
        }
    ],
    requires: false
  },

  "Cannot Be Attacked": {
    name: "Cannot Be Attacked",
    id: "minecraft:cannot_be_attacked",
    inputs: [
        {
            type: "boolean",
            name: "main",
            label: "Cannot Be Attacked",
            tooltip: "Whether the entity should block attacks from other entities."
        }
    ],
    requires: false
  },

  "Economy Trade Table": {
    name: "Economy Trade Table",
    id: "minecraft:economy_trade_table",
    inputs: [
        {
            type: "trade_table",
            name: "table",
            label: "Trade Table",
            tooltip: "The trade table that will be used for the trades."
        },
        {
            type: "text",
            name: "display_name",
            label: "Display Name",
            tooltip: "The name of entity displayed in the trading GUI."
        }
    ],
    requires: false
  },

  "Flying Speed": {
    name: "Flying Speed",
    id: "minecraft:flying_speed",
    inputs: [
        {
            type: "number",
            name: "value",
            label: "Flying Speed",
            tooltip: "The flying speed of the entity, in blocks per tick."
        }
    ],
    requires: false
  },

  "Friction Modifier": {
    name: "Friction Modifier",
    id: "minecraft:friction_modifier",
    inputs: [
        {
            type: "number",
            name: "value",
            label: "Friction Modifier",
            tooltip: "The amount friction affects this entity."
        }
    ],
    requires: false
  },

  "Ground Offset": {
    name: "Ground Offset",
    id: "minecraft:ground_offset",
    inputs: [
        {
            type: "number",
            name: "value",
            label: "Ground Offset",
            tooltip: "The offset of the entity above the terrain, in blocks."
        }
    ],
    requires: false
  },

  "Input Controls": {
    name: "Input Controls",
    id: "minecraft:input_ground_controlled",
    inputs: [
        {
            type: "boolean",
            name: "main",
            label: "Use Input Controls",
            tooltip: "Whether the entity should be controllable with WASD."
        }
    ],
    requires: ["Rideable"]
  },

  "Is Collidable": {
    name: "Is Collidable",
    id: "minecraft:is_collidable",
    inputs: [
        {
            type: "boolean",
            name: "main",
            label: "Is Collidable",
            tooltip: "Whether the entity can have collision box interactions with other entities."
        }
    ],
    requires: ["Collision Box"]
  },

  "Is Dyeable": {
    name: "Is Dyeable",
    id: "minecraft:is_dyeable",
    inputs: [
        {
            type: "text",
            name: "interact_text",
            label: "Interact Text",
            tooltip: "The text that will be displayed on the interact button of the touch-screen controls."
        }
    ],
    requires: false
  },

  "Is Hidden When Invisible": {
    name: "Is Hidden When Invisible",
    id: "minecraft:is_hidden_when_invisible",
    inputs: [
        {
            type: "boolean",
            name: "main",
            label: "Is Hidden When Invisible",
            tooltip: "Whether the entity is hidden from hostile mobs when invisible."
        }
    ],
    requires: false
  },

  "Renders When Invisible": {
    name: "Renders When Invisible",
    id: "minecraft:renders_when_invisible",
    inputs: [
        {
            type: "boolean",
            name: "main",
            label: "Renders When Invisible",
            tooltip: "Whether the entity should render, even when invisible."
        }
    ],
    requires: false
  },

  "Scale": {
    name: "Scale",
    id: "minecraft:scale",
    inputs: [
        {
            type: "number",
            name: "value",
            label: "Scale",
            tooltip: "The visual scale of the entity."
        }
    ],
    requires: false
  },

  "Item Hopper": {
    name: "Item Hopper",
    id: "minecraft:item_hopper",
    inputs: [
        {
            type: "boolean",
            name: "main",
            label: "Is Item Hopper",
            tooltip: "Whether the entity should be an item hopper."
        }
    ],
    requires: false
  },

  "Static Jump": {
    name: "Static Jump",
    id: "minecraft:static_jump",
    inputs: [
        {
            type: "number",
            name: "jump_power",
            label: "Jump Power",
            tooltip: "The initial vertical velocity of the jump."
        }
    ],
    requires: false
  },

  "Leashable": {
    name: "Leashable",
    id: "minecraft:leashable",
    inputs: [
        {
            type: "boolean",
            name: "can_be_cut",
            label: "Can Be Cut",
            tooltip: "Whether the leash can be cut by shearing the entity."
        },
        {
            type: "boolean",
            name: "can_be_stolen",
            label: "Can Be Stolen",
            tooltip: "Whether the entity can be leashed when it is already leashed to another entity."
        },
        {
            type: "boolean",
            name: "can_be_cut",
            label: "Can Be Cut",
            tooltip: "Whether the leash can be cut by shearing the entity."
        },
    ],
    requires: false
  },

  "Amphibious Movement": {
    name: "Amphibious Movement",
    id: "minecraft:movement.amphibious",
    inputs: [
        {
            type: "number",
            name: "max_turn",
            label: "Max Turn",
            tooltip: "The maximum amount, in degrees, the entity can turn in one tick."
        }
    ],
    requires: false
  },

  "Basic Movement": {
    name: "Basic Movement",
    id: "minecraft:movement.basic",
    inputs: [
        {
            type: "number",
            name: "max_turn",
            label: "Max Turn",
            tooltip: "The maximum amount, in degrees, the entity can turn in one tick."
        }
    ],
    requires: false
  },

  "Fly Movement": {
    name: "Fly Movement",
    id: "minecraft:movement.fly",
    inputs: [
        {
            type: "number",
            name: "max_turn",
            label: "Max Turn",
            tooltip: "The maximum amount, in degrees, the entity can turn in one tick."
        }
    ],
    requires: false
  },

  "Generic Movement": {
    name: "Generic Movement",
    id: "minecraft:movement.generic",
    inputs: [
        {
            type: "number",
            name: "max_turn",
            label: "Max Turn",
            tooltip: "The maximum amount, in degrees, the entity can turn in one tick."
        }
    ],
    requires: false
  },

  "Hover Movement": {
    name: "Hover Movement",
    id: "minecraft:movement.hover",
    inputs: [
        {
            type: "number",
            name: "max_turn",
            label: "Max Turn",
            tooltip: "The maximum amount, in degrees, the entity can turn in one tick."
        }
    ],
    requires: false
  },

  "Jump Movement": {
    name: "Jump Movement",
    id: "minecraft:movement.jump",
    inputs: [
        {
            type: "number",
            name: "max_turn",
            label: "Max Turn",
            tooltip: "The maximum amount, in degrees, the entity can turn in one tick."
        }
    ],
    requires: false
  },

  "Skip Movement": {
    name: "Skip Movement",
    id: "minecraft:movement.skip",
    inputs: [
        {
            type: "number",
            name: "max_turn",
            label: "Max Turn",
            tooltip: "The maximum amount, in degrees, the entity can turn in one tick."
        }
    ],
    requires: false
  },

  "Sway Movement": {
    name: "Sway Movement",
    id: "minecraft:movement.sway",
    inputs: [
        {
            type: "number",
            name: "max_turn",
            label: "Max Turn",
            tooltip: "The maximum amount, in degrees, the entity can turn in one tick."
        }
    ],
    requires: false
  },

  "Nameable": {
    name: "Nameable",
    id: "minecraft:nameable",
    inputs: [
        {
            type: "boolean",
            name: "allow_name_tag_renaming",
            label: "Renameable",
            tooltip: "Whether the entity can be renamed with name tags."
        },
        {
            type: "boolean",
            name: "always_show",
            label: "Always Show",
            tooltip: "Whether the name of the entity should always be shown."
        }
    ],
    requires: false
  },

  "Climb Navigation": {
    name: "Climb Navigation",
    id: "minecraft:navigation.climb",
    inputs: [
        {
            type: "boolean",
            name: "avoid_damage_blocks",
            label: "Avoid Damage Blocks",
            tooltip: "Whether the entity should avoid damage blocks when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_portals",
            label: "Avoid Portals",
            tooltip: "Whether the entity should avoid portals when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_sun",
            label: "Avoid Sun",
            tooltip: "Whether the entity should avoid blocks exposed to the sun when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_water",
            label: "Avoid Water",
            tooltip: "Whether the entity should avoid water when pathfinding."
        },
        {
            type: "list",
            name: "blocks_to_avoid",
            label: "Blocks to Avoid",
            tooltip: "Additional blocks to avoid when pathfinding."
        },
        {
            type: "boolean",
            name: "can_breach",
            label: "Can Breach",
            tooltip: "Whether the entity can jump out of water (like a dolphin)."
        },
        {
            type: "boolean",
            name: "can_break_doors",
            label: "Can Break Doors",
            tooltip: "Whether the entity can break closed doors."
        },
        {
            type: "boolean",
            name: "can_jump",
            label: "Can Jump",
            tooltip: "Whether the entity can jump."
        },
        {
            type: "boolean",
            name: "can_open_doors",
            label: "Can Open Doors",
            tooltip: "Whether the entity can open doors."
        },
        {
            type: "boolean",
            name: "can_open_iron_doors",
            label: "Can Open Doors",
            tooltip: "Whether the entity can open iron doors."
        },
        {
            type: "boolean",
            name: "can_pass_doors",
            label: "Can Pass Doors",
            tooltip: "Whether the entity can pathfind through doors."
        },
        {
            type: "boolean",
            name: "can_path_from_air",
            label: "Can Path From Air",
            tooltip: "Whether the entity can start pathfinding in the air."
        },
        {
            type: "boolean",
            name: "can_path_over_lava",
            label: "Can Path Over Lava",
            tooltip: "Whether the entity can travel over lava."
        },
        {
            type: "boolean",
            name: "can_path_over_water",
            label: "Can Path Over Water",
            tooltip: "Whether the entity can travel over water."
        },
        {
            type: "boolean",
            name: "can_sink",
            label: "Can Sink",
            tooltip: "Whether the entity can sink in water."
        },
        {
            type: "boolean",
            name: "can_swim",
            label: "Can Swim",
            tooltip: "Whether the entity can swim."
        },
        {
            type: "boolean",
            name: "can_walk",
            label: "Can Walk",
            tooltip: "Whether the entity can walk."
        },
        {
            type: "boolean",
            name: "can_walk_in_lava",
            label: "Can Walk In Lava",
            tooltip: "Whether the entity can walk in lava."
        },
        {
            type: "boolean",
            name: "is_amphibious",
            label: "Is Amphibious",
            tooltip: "Whether the entity is amphibious."
        }
    ],
    requires: false
  },

  "Float Navigation": {
    name: "Float Navigation",
    id: "minecraft:navigation.float",
    inputs: [
        {
            type: "boolean",
            name: "avoid_damage_blocks",
            label: "Avoid Damage Blocks",
            tooltip: "Whether the entity should avoid damage blocks when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_portals",
            label: "Avoid Portals",
            tooltip: "Whether the entity should avoid portals when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_sun",
            label: "Avoid Sun",
            tooltip: "Whether the entity should avoid blocks exposed to the sun when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_water",
            label: "Avoid Water",
            tooltip: "Whether the entity should avoid water when pathfinding."
        },
        {
            type: "list",
            name: "blocks_to_avoid",
            label: "Blocks to Avoid",
            tooltip: "Additional blocks to avoid when pathfinding."
        },
        {
            type: "boolean",
            name: "can_breach",
            label: "Can Breach",
            tooltip: "Whether the entity can jump out of water (like a dolphin)."
        },
        {
            type: "boolean",
            name: "can_break_doors",
            label: "Can Break Doors",
            tooltip: "Whether the entity can break closed doors."
        },
        {
            type: "boolean",
            name: "can_jump",
            label: "Can Jump",
            tooltip: "Whether the entity can jump."
        },
        {
            type: "boolean",
            name: "can_open_doors",
            label: "Can Open Doors",
            tooltip: "Whether the entity can open doors."
        },
        {
            type: "boolean",
            name: "can_open_iron_doors",
            label: "Can Open Doors",
            tooltip: "Whether the entity can open iron doors."
        },
        {
            type: "boolean",
            name: "can_pass_doors",
            label: "Can Pass Doors",
            tooltip: "Whether the entity can pathfind through doors."
        },
        {
            type: "boolean",
            name: "can_path_from_air",
            label: "Can Path From Air",
            tooltip: "Whether the entity can start pathfinding in the air."
        },
        {
            type: "boolean",
            name: "can_path_over_lava",
            label: "Can Path Over Lava",
            tooltip: "Whether the entity can travel over lava."
        },
        {
            type: "boolean",
            name: "can_path_over_water",
            label: "Can Path Over Water",
            tooltip: "Whether the entity can travel over water."
        },
        {
            type: "boolean",
            name: "can_sink",
            label: "Can Sink",
            tooltip: "Whether the entity can sink in water."
        },
        {
            type: "boolean",
            name: "can_swim",
            label: "Can Swim",
            tooltip: "Whether the entity can swim."
        },
        {
            type: "boolean",
            name: "can_walk",
            label: "Can Walk",
            tooltip: "Whether the entity can walk."
        },
        {
            type: "boolean",
            name: "can_walk_in_lava",
            label: "Can Walk In Lava",
            tooltip: "Whether the entity can walk in lava."
        },
        {
            type: "boolean",
            name: "is_amphibious",
            label: "Is Amphibious",
            tooltip: "Whether the entity is amphibious."
        }
    ],
    requires: false
  },

  "Fly Navigation": {
    name: "Fly Navigation",
    id: "minecraft:navigation.fly",
    inputs: [
        {
            type: "boolean",
            name: "avoid_damage_blocks",
            label: "Avoid Damage Blocks",
            tooltip: "Whether the entity should avoid damage blocks when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_portals",
            label: "Avoid Portals",
            tooltip: "Whether the entity should avoid portals when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_sun",
            label: "Avoid Sun",
            tooltip: "Whether the entity should avoid blocks exposed to the sun when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_water",
            label: "Avoid Water",
            tooltip: "Whether the entity should avoid water when pathfinding."
        },
        {
            type: "list",
            name: "blocks_to_avoid",
            label: "Blocks to Avoid",
            tooltip: "Additional blocks to avoid when pathfinding."
        },
        {
            type: "boolean",
            name: "can_breach",
            label: "Can Breach",
            tooltip: "Whether the entity can jump out of water (like a dolphin)."
        },
        {
            type: "boolean",
            name: "can_break_doors",
            label: "Can Break Doors",
            tooltip: "Whether the entity can break closed doors."
        },
        {
            type: "boolean",
            name: "can_jump",
            label: "Can Jump",
            tooltip: "Whether the entity can jump."
        },
        {
            type: "boolean",
            name: "can_open_doors",
            label: "Can Open Doors",
            tooltip: "Whether the entity can open doors."
        },
        {
            type: "boolean",
            name: "can_open_iron_doors",
            label: "Can Open Doors",
            tooltip: "Whether the entity can open iron doors."
        },
        {
            type: "boolean",
            name: "can_pass_doors",
            label: "Can Pass Doors",
            tooltip: "Whether the entity can pathfind through doors."
        },
        {
            type: "boolean",
            name: "can_path_from_air",
            label: "Can Path From Air",
            tooltip: "Whether the entity can start pathfinding in the air."
        },
        {
            type: "boolean",
            name: "can_path_over_lava",
            label: "Can Path Over Lava",
            tooltip: "Whether the entity can travel over lava."
        },
        {
            type: "boolean",
            name: "can_path_over_water",
            label: "Can Path Over Water",
            tooltip: "Whether the entity can travel over water."
        },
        {
            type: "boolean",
            name: "can_sink",
            label: "Can Sink",
            tooltip: "Whether the entity can sink in water."
        },
        {
            type: "boolean",
            name: "can_swim",
            label: "Can Swim",
            tooltip: "Whether the entity can swim."
        },
        {
            type: "boolean",
            name: "can_walk",
            label: "Can Walk",
            tooltip: "Whether the entity can walk."
        },
        {
            type: "boolean",
            name: "can_walk_in_lava",
            label: "Can Walk In Lava",
            tooltip: "Whether the entity can walk in lava."
        },
        {
            type: "boolean",
            name: "is_amphibious",
            label: "Is Amphibious",
            tooltip: "Whether the entity is amphibious."
        }
    ],
    requires: false
  },

  "Generic Navigation": {
    name: "Generic Navigation",
    id: "minecraft:navigation.generic",
    inputs: [
        {
            type: "boolean",
            name: "avoid_damage_blocks",
            label: "Avoid Damage Blocks",
            tooltip: "Whether the entity should avoid damage blocks when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_portals",
            label: "Avoid Portals",
            tooltip: "Whether the entity should avoid portals when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_sun",
            label: "Avoid Sun",
            tooltip: "Whether the entity should avoid blocks exposed to the sun when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_water",
            label: "Avoid Water",
            tooltip: "Whether the entity should avoid water when pathfinding."
        },
        {
            type: "list",
            name: "blocks_to_avoid",
            label: "Blocks to Avoid",
            tooltip: "Additional blocks to avoid when pathfinding."
        },
        {
            type: "boolean",
            name: "can_breach",
            label: "Can Breach",
            tooltip: "Whether the entity can jump out of water (like a dolphin)."
        },
        {
            type: "boolean",
            name: "can_break_doors",
            label: "Can Break Doors",
            tooltip: "Whether the entity can break closed doors."
        },
        {
            type: "boolean",
            name: "can_jump",
            label: "Can Jump",
            tooltip: "Whether the entity can jump."
        },
        {
            type: "boolean",
            name: "can_open_doors",
            label: "Can Open Doors",
            tooltip: "Whether the entity can open doors."
        },
        {
            type: "boolean",
            name: "can_open_iron_doors",
            label: "Can Open Doors",
            tooltip: "Whether the entity can open iron doors."
        },
        {
            type: "boolean",
            name: "can_pass_doors",
            label: "Can Pass Doors",
            tooltip: "Whether the entity can pathfind through doors."
        },
        {
            type: "boolean",
            name: "can_path_from_air",
            label: "Can Path From Air",
            tooltip: "Whether the entity can start pathfinding in the air."
        },
        {
            type: "boolean",
            name: "can_path_over_lava",
            label: "Can Path Over Lava",
            tooltip: "Whether the entity can travel over lava."
        },
        {
            type: "boolean",
            name: "can_path_over_water",
            label: "Can Path Over Water",
            tooltip: "Whether the entity can travel over water."
        },
        {
            type: "boolean",
            name: "can_sink",
            label: "Can Sink",
            tooltip: "Whether the entity can sink in water."
        },
        {
            type: "boolean",
            name: "can_swim",
            label: "Can Swim",
            tooltip: "Whether the entity can swim."
        },
        {
            type: "boolean",
            name: "can_walk",
            label: "Can Walk",
            tooltip: "Whether the entity can walk."
        },
        {
            type: "boolean",
            name: "can_walk_in_lava",
            label: "Can Walk In Lava",
            tooltip: "Whether the entity can walk in lava."
        },
        {
            type: "boolean",
            name: "is_amphibious",
            label: "Is Amphibious",
            tooltip: "Whether the entity is amphibious."
        }
    ],
    requires: false
  },

  "Hover Navigation": {
    name: "Hover Navigation",
    id: "minecraft:navigation.hover",
    inputs: [
        {
            type: "boolean",
            name: "avoid_damage_blocks",
            label: "Avoid Damage Blocks",
            tooltip: "Whether the entity should avoid damage blocks when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_portals",
            label: "Avoid Portals",
            tooltip: "Whether the entity should avoid portals when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_sun",
            label: "Avoid Sun",
            tooltip: "Whether the entity should avoid blocks exposed to the sun when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_water",
            label: "Avoid Water",
            tooltip: "Whether the entity should avoid water when pathfinding."
        },
        {
            type: "list",
            name: "blocks_to_avoid",
            label: "Blocks to Avoid",
            tooltip: "Additional blocks to avoid when pathfinding."
        },
        {
            type: "boolean",
            name: "can_breach",
            label: "Can Breach",
            tooltip: "Whether the entity can jump out of water (like a dolphin)."
        },
        {
            type: "boolean",
            name: "can_break_doors",
            label: "Can Break Doors",
            tooltip: "Whether the entity can break closed doors."
        },
        {
            type: "boolean",
            name: "can_jump",
            label: "Can Jump",
            tooltip: "Whether the entity can jump."
        },
        {
            type: "boolean",
            name: "can_open_doors",
            label: "Can Open Doors",
            tooltip: "Whether the entity can open doors."
        },
        {
            type: "boolean",
            name: "can_open_iron_doors",
            label: "Can Open Doors",
            tooltip: "Whether the entity can open iron doors."
        },
        {
            type: "boolean",
            name: "can_pass_doors",
            label: "Can Pass Doors",
            tooltip: "Whether the entity can pathfind through doors."
        },
        {
            type: "boolean",
            name: "can_path_from_air",
            label: "Can Path From Air",
            tooltip: "Whether the entity can start pathfinding in the air."
        },
        {
            type: "boolean",
            name: "can_path_over_lava",
            label: "Can Path Over Lava",
            tooltip: "Whether the entity can travel over lava."
        },
        {
            type: "boolean",
            name: "can_path_over_water",
            label: "Can Path Over Water",
            tooltip: "Whether the entity can travel over water."
        },
        {
            type: "boolean",
            name: "can_sink",
            label: "Can Sink",
            tooltip: "Whether the entity can sink in water."
        },
        {
            type: "boolean",
            name: "can_swim",
            label: "Can Swim",
            tooltip: "Whether the entity can swim."
        },
        {
            type: "boolean",
            name: "can_walk",
            label: "Can Walk",
            tooltip: "Whether the entity can walk."
        },
        {
            type: "boolean",
            name: "can_walk_in_lava",
            label: "Can Walk In Lava",
            tooltip: "Whether the entity can walk in lava."
        },
        {
            type: "boolean",
            name: "is_amphibious",
            label: "Is Amphibious",
            tooltip: "Whether the entity is amphibious."
        }
    ],
    requires: false
  },

  "Swim Navigation": {
    name: "Swim Navigation",
    id: "minecraft:navigation.swim",
    inputs: [
        {
            type: "boolean",
            name: "avoid_damage_blocks",
            label: "Avoid Damage Blocks",
            tooltip: "Whether the entity should avoid damage blocks when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_portals",
            label: "Avoid Portals",
            tooltip: "Whether the entity should avoid portals when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_sun",
            label: "Avoid Sun",
            tooltip: "Whether the entity should avoid blocks exposed to the sun when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_water",
            label: "Avoid Water",
            tooltip: "Whether the entity should avoid water when pathfinding."
        },
        {
            type: "list",
            name: "blocks_to_avoid",
            label: "Blocks to Avoid",
            tooltip: "Additional blocks to avoid when pathfinding."
        },
        {
            type: "boolean",
            name: "can_breach",
            label: "Can Breach",
            tooltip: "Whether the entity can jump out of water (like a dolphin)."
        },
        {
            type: "boolean",
            name: "can_break_doors",
            label: "Can Break Doors",
            tooltip: "Whether the entity can break closed doors."
        },
        {
            type: "boolean",
            name: "can_jump",
            label: "Can Jump",
            tooltip: "Whether the entity can jump."
        },
        {
            type: "boolean",
            name: "can_open_doors",
            label: "Can Open Doors",
            tooltip: "Whether the entity can open doors."
        },
        {
            type: "boolean",
            name: "can_open_iron_doors",
            label: "Can Open Doors",
            tooltip: "Whether the entity can open iron doors."
        },
        {
            type: "boolean",
            name: "can_pass_doors",
            label: "Can Pass Doors",
            tooltip: "Whether the entity can pathfind through doors."
        },
        {
            type: "boolean",
            name: "can_path_from_air",
            label: "Can Path From Air",
            tooltip: "Whether the entity can start pathfinding in the air."
        },
        {
            type: "boolean",
            name: "can_path_over_lava",
            label: "Can Path Over Lava",
            tooltip: "Whether the entity can travel over lava."
        },
        {
            type: "boolean",
            name: "can_path_over_water",
            label: "Can Path Over Water",
            tooltip: "Whether the entity can travel over water."
        },
        {
            type: "boolean",
            name: "can_sink",
            label: "Can Sink",
            tooltip: "Whether the entity can sink in water."
        },
        {
            type: "boolean",
            name: "can_swim",
            label: "Can Swim",
            tooltip: "Whether the entity can swim."
        },
        {
            type: "boolean",
            name: "can_walk",
            label: "Can Walk",
            tooltip: "Whether the entity can walk."
        },
        {
            type: "boolean",
            name: "can_walk_in_lava",
            label: "Can Walk In Lava",
            tooltip: "Whether the entity can walk in lava."
        },
        {
            type: "boolean",
            name: "is_amphibious",
            label: "Is Amphibious",
            tooltip: "Whether the entity is amphibious."
        }
    ],
    requires: false
  },

  "Walk Navigation": {
    name: "Walk Navigation",
    id: "minecraft:navigation.walk",
    inputs: [
        {
            type: "boolean",
            name: "avoid_damage_blocks",
            label: "Avoid Damage Blocks",
            tooltip: "Whether the entity should avoid damage blocks when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_portals",
            label: "Avoid Portals",
            tooltip: "Whether the entity should avoid portals when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_sun",
            label: "Avoid Sun",
            tooltip: "Whether the entity should avoid blocks exposed to the sun when pathfinding."
        },
        {
            type: "boolean",
            name: "avoid_water",
            label: "Avoid Water",
            tooltip: "Whether the entity should avoid water when pathfinding."
        },
        {
            type: "list",
            name: "blocks_to_avoid",
            label: "Blocks to Avoid",
            tooltip: "Additional blocks to avoid when pathfinding."
        },
        {
            type: "boolean",
            name: "can_breach",
            label: "Can Breach",
            tooltip: "Whether the entity can jump out of water (like a dolphin)."
        },
        {
            type: "boolean",
            name: "can_break_doors",
            label: "Can Break Doors",
            tooltip: "Whether the entity can break closed doors."
        },
        {
            type: "boolean",
            name: "can_jump",
            label: "Can Jump",
            tooltip: "Whether the entity can jump."
        },
        {
            type: "boolean",
            name: "can_open_doors",
            label: "Can Open Doors",
            tooltip: "Whether the entity can open doors."
        },
        {
            type: "boolean",
            name: "can_open_iron_doors",
            label: "Can Open Doors",
            tooltip: "Whether the entity can open iron doors."
        },
        {
            type: "boolean",
            name: "can_pass_doors",
            label: "Can Pass Doors",
            tooltip: "Whether the entity can pathfind through doors."
        },
        {
            type: "boolean",
            name: "can_path_from_air",
            label: "Can Path From Air",
            tooltip: "Whether the entity can start pathfinding in the air."
        },
        {
            type: "boolean",
            name: "can_path_over_lava",
            label: "Can Path Over Lava",
            tooltip: "Whether the entity can travel over lava."
        },
        {
            type: "boolean",
            name: "can_path_over_water",
            label: "Can Path Over Water",
            tooltip: "Whether the entity can travel over water."
        },
        {
            type: "boolean",
            name: "can_sink",
            label: "Can Sink",
            tooltip: "Whether the entity can sink in water."
        },
        {
            type: "boolean",
            name: "can_swim",
            label: "Can Swim",
            tooltip: "Whether the entity can swim."
        },
        {
            type: "boolean",
            name: "can_walk",
            label: "Can Walk",
            tooltip: "Whether the entity can walk."
        },
        {
            type: "boolean",
            name: "can_walk_in_lava",
            label: "Can Walk In Lava",
            tooltip: "Whether the entity can walk in lava."
        },
        {
            type: "boolean",
            name: "is_amphibious",
            label: "Is Amphibious",
            tooltip: "Whether the entity is amphibious."
        }
    ],
    requires: false
  },

  "Persistent": {
    name: "Persistent",
    id: "minecraft:persistent",
    inputs: [
        {
            type: "boolean",
            name: "main",
            label: "Is Persistent",
            tooltip: "Whether the entity should persist in the game world."
        }
    ],
    requires: false
  },

  "Physics": {
    name: "Physics",
    id: "minecraft:physics",
    inputs: [
        {
            type: "boolean",
            name: "has_collision",
            label: "Has Collision",
            tooltip: "Whether the entity should collide with things."
        },
        {
            type: "boolean",
            name: "has_gravity",
            label: "Has Gravity",
            tooltip: "Whether the entity is affected by gravity."
        },
        {
            type: "boolean",
            name: "push_towards_closest_space",
            label: "Push Towards Closest Space",
            tooltip: "Whether the entity should be pushed towards the closest open space when stuck inside a block."
        }
    ],
    requires: false
  },

  "Pushable": {
    name: "Pushable",
    id: "minecraft:pushable",
    inputs: [
        {
            type: "boolean",
            name: "is_pushable",
            label: "Pushable by Entities",
            tooltip: "Whether the entity can be pushed by other entities."
        },
        {
            type: "boolean",
            name: "is_pushable_by_piston",
            label: "Pushable by Pistons",
            tooltip: "Whether the entity can be pushed by pistons."
        }
    ],
    requires: ["Collision Box"]
  },

  "Rail Movement": {
    name: "Rail Movement",
    id: "minecraft:rail_movement",
    inputs: [
        {
            type: "number",
            name: "max_speed",
            label: "Max Speed",
            tooltip: "The maximum speed of the entity on rails."
        }
    ],
    requires: false
  },

  "Rideable": {
    name: "Rideable",
    id: "minecraft:rideable",
    inputs: [
        {
            type: "number",
            name: "controlling_seat",
            label: "Controlling Seat",
            tooltip: "The seat number of the driver of the entity."
        },
        {
            type: "boolean",
            name: "crouching_skip_interact",
            label: "Crouching Skip Interact",
            tooltip: "Whether crouching makes the entity non-interactable."
        },
        {
            type: "dropdown",
            name: "dismount_mode",
            label: "Dismount Mode",
            tooltip: "Where riders are placed when dismounting from the entity. When set to \"default\", riders are placed on the ground near the entity. When set to \"on_top_center\", riders are placed on top of the entity, at the center of its collision box.",
            options: [
                "default",
                "on_top_center"
            ]
        },
        {
            type: "list",
            name: "family_types",
            label: "Family Types",
            tooltip: "The list of entities that can ride this entity."
        },
        {
            type: "text",
            name: "interact_text",
            label: "Interact Text",
            tooltip: "The text that appears on the interact button of the touch-screen controls."
        },
        {
            type: "number",
            name: "passenger_max_width",
            label: "Passenger Max Width",
            tooltip: "The maximum width of an entity to ride this entity. Set to 0 to ignore it."
        },
        {
            type: "boolean",
            name: "pull_in_entities",
            label: "Pull In Entities",
            tooltip: "Whether entities should be pulled into available seats."
        },
        {
            type: "number",
            name: "seat_count",
            label: "Seat Count",
            tooltip: "The number of entities that can ride this entity simultaneously."
        },
        {
            type: "seat_selector",
            name: "seats",
            label: "Seats",
            tooltip: "The seat positions of the entity."
        }
    ],
    requires: false
  },

  "Tameable": {
    name: "Tameable",
    id: "minecraft:tameable",
    inputs: [
        {
            type: "number",
            name: "probability",
            label: "Probability (%)",
            tooltip: "The chance of taming the entity with each item use, as a percentage."
        },
        {
            type: "list",
            name: "tame_items",
            label: "Tame Items",
            tooltip: "The list of items that can be used to tame this entity."
        }
    ],
    requires: false
  },

  "Max Auto Step": {
    name: "Max Auto Step",
    id: "minecraft:variable_max_auto_step",
    inputs: [
        {
            type: "number",
            name: "base_value",
            label: "Base Value",
            tooltip: "The maximum auto-step height."
        },
        {
            type: "number",
            name: "controlled_value",
            label: "Controlled Value",
            tooltip: "The maximum auto-step height when controlled by a player."
        }
    ],
    requires: false
  },

  "Vertical Movement Action": {
    name: "Vertical Movement Action",
    id: "minecraft:vertical_movement_action",
    inputs: [
        {
            type: "number",
            name: "vertical_velocity",
            label: "Vertical Velocity",
            tooltip: "The vertical velocity of the entity when the jump command is issued."
        }
    ],
    requires: ["Rideable"]
  },

  "Water Movement": {
    name: "Water Movement",
    id: "minecraft:water_movement",
    inputs: [
        {
            type: "number",
            name: "drag_factor",
            label: "Drag Factor",
            tooltip: "The drag factor, which determines the movement speed, of the entity while in water."
        }
    ],
    requires: false
  },

  "Spawn Egg": {
    name: "Spawn Egg",
    id: "spawn_egg",
    inputs: [
        {
            type: "color",
            name: "base_color",
            label: "Base Color",
            tooltip: "The base color of the spawn egg."
        },
        {
            type: "color",
            name: "overlay_color",
            label: "Overlay Color",
            tooltip: "The overlay color of the spawn egg."
        },
        {
            type: "texture",
            name: "texture",
            label: "Texture",
            tooltip: "The texture of the spawn egg. Overrides base color and overlay color."
        }
    ],
    requires: false
  },
};

var currentEntityComponents = {};

function centerDialogViewport(selector) {
    const $dlg = $(selector).dialog("widget");
    const w = $dlg.outerWidth();
    const h = $dlg.outerHeight();

    $dlg.css({
        position: "fixed",
        top: `calc(50% - ${h / 2}px)`,
        left: `calc(50% - ${w / 2}px)`
    });
}

$("#modelBtn").button();
$("#itemTextureBtn").button();
$("#blockTextureBtn0").button();

$("#categoryBox").selectmenu();
$("#addTextureBtn").button();
$("#entityTextureBtn0").button();
$("#addComponentBtn").button();
$("#addComponentCancelBtn").button();
$("#addComponentAddBtn").button();
$("#selectTextureCancelBtn").button();
$("#selectTextureSelectBtn").button();
// new start
$("#selectTextureSelectBtn2").button();
$("#selectTableSelectBtn").button();
$("#selectTableCancelBtn").button();
$("#selectTableDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 500,
  width: 500
});
$("#selectTableDlg").dialog("close");
// new end
$("#selectModelCancelBtn").button();
$("#selectModelSelectBtn").button();
$("#selectLootTableCancelBtn").button();
$("#selectLootTableSelectBtn").button();
$('input').addClass("ui-widget ui-widget-content ui-corner-all");

$("#addComponentDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 200,
  width: 500
});
$("#addComponentDlg").dialog("close");
$("#selectTextureDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 500,
  width: 500
});
$("#selectTextureDlg").dialog("close");
$("#selectModelDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 500,
  width: 500
});
$("#selectModelDlg").dialog("close");
$("#selectLootTableDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 500,
  width: 500
});
$("#selectLootTableDlg").dialog("close");
$("#deleteDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 150,
  width: 300,
  closeOnEscape: false
});
$("#deleteDlg").dialog("close");
$("#deleteDlgCancel").button();
$("#deleteDlgConfirm").button();

// new start
$("#advEditor").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 400,
  width: 400,
  closeOnEscape: false
});
$("#advEditor").dialog("close");
$("#advEditorSave").button();
// new end

function addComponent() {
  $("#addComponentDlg").dialog("open");
}
function closeAddComponentDlg() {
  $("#addComponentDlg").dialog("close");
}
function removeSpaces(str) {
    return str.replaceAll(" ", "_s_");
}
// new start
function addSpaces(str) {
    return str.replaceAll("_s_", " ");
}
// new end
function createComponent(type) {
    let newComponentObj = {};
    let newComponentType;
    let newComponentDefault;
    let newComponentDOM;
    for (let i = 0; i < componentDefinitions[type].inputs.length; i++) {
        newComponentType = componentDefinitions[type].inputs[i].type
        if (newComponentType == "number") {
            newComponentDefault = 0;
        } else if (newComponentType == "boolean") {
            newComponentDefault = false;
        } else {
            newComponentDefault = "";
        }
        newComponentObj[componentDefinitions[type].inputs[i].name] = newComponentDefault;
    }
    if (!Object.keys(currentEntityComponents).includes(type)) {
        currentEntityComponents[type] = newComponentObj;
        var parentDiv = document.getElementById("componentsBox");
        var elementBox = document.createElement("div");
        elementBox.setAttribute("class", "componentbox");
        elementBox.setAttribute("id", "componentbox_" + removeSpaces(type));
        var elementBoxTitle = document.createElement("h3");
        elementBoxTitle.innerHTML = type + " ";
        var elementBoxDelete = document.createElement("i");
        elementBoxDelete.setAttribute("class", "fas fa-trash deleteIcon");
        elementBoxDelete.setAttribute("onclick", `openDeleteComponent('${type}')`);
        elementBoxTitle.appendChild(elementBoxDelete);
        elementBox.appendChild(elementBoxTitle);
        let dropdownsToRegister = [];
        for (let i = 0; i < componentDefinitions[type].inputs.length; i++) {
            newComponentType = componentDefinitions[type].inputs[i].type;
            newComponentInputName = componentDefinitions[type].inputs[i].name;
            newComponentInputLabel = componentDefinitions[type].inputs[i].label;
            newComponentInputTooltip = componentDefinitions[type].inputs[i].tooltip;
            newComponentTypeName = componentDefinitions[type].name;
            if (newComponentType == "number") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.appendChild(document.createTextNode(" "));
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.appendChild(document.createTextNode(" "));
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName));
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("type", "number");
                let typeName = newComponentTypeName;
                let inputName = newComponentInputName;
                newComponentDOM.addEventListener("change", event => {
                    updateInput(typeName, inputName, Number(event.target.value));
                });
                elementBox.appendChild(newComponentDOM);
            } else if (newComponentType == "color") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.appendChild(document.createTextNode(" "));
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.appendChild(document.createTextNode(" "));
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName));
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("type", "color");
                let typeName = newComponentTypeName;
                let inputName = newComponentInputName;
                newComponentDOM.addEventListener("change", event => {
                    updateInput(typeName, inputName, event.target.value);
                });
                elementBox.appendChild(newComponentDOM);
            } else if (newComponentType == "dropdown") {
                // Create label
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);

                // Optional tooltip icon
                if (newComponentInputTooltip) {
                    elementBox.appendChild(document.createTextNode(" "));
                    const tooltipIcon = document.createElement("i");
                    tooltipIcon.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    tooltipIcon.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(tooltipIcon);
                }

                // Add space before the dropdown
                elementBox.appendChild(document.createTextNode(" "));

                // Create <select> element
                newComponentDOM = document.createElement("select");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName));

                // Retrieve and add options from component definition
                const newComponentInputOptions = componentDefinitions[type].inputs[i].options;
                if (Array.isArray(newComponentInputOptions)) {
                    for (const optVal of newComponentInputOptions) {
                        const opt = document.createElement("option");
                        opt.value = optVal;
                        opt.textContent = optVal;
                        newComponentDOM.appendChild(opt);
                    }
                }

                // Attach event listener
                const typeName = newComponentTypeName;
                const inputName = newComponentInputName;
                newComponentDOM.addEventListener("change", event => {
                    updateInput(typeName, inputName, event.target.value);
                });

                // Add to dropdown registration list for jQuery UI
                dropdownsToRegister.push([removeSpaces(newComponentTypeName), removeSpaces(newComponentInputName)]);

                // Append to the element box
                elementBox.appendChild(newComponentDOM);
            } else if (newComponentType == "boolean") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.appendChild(document.createTextNode(" "));
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.appendChild(document.createTextNode(" "));
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName));
                newComponentDOM.setAttribute("type", "checkbox");
                let typeName = newComponentTypeName;
                let inputName = newComponentInputName;
                newComponentDOM.addEventListener("change", event => {
                    updateInput(typeName, inputName, event.target.checked);
                });
                elementBox.appendChild(newComponentDOM);
            }/* new start */ else if (newComponentType == "list") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.appendChild(document.createTextNode(" "));
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.appendChild(document.createTextNode(" "));
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName));
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("disabled", "true");
                newComponentDOM.setAttribute("class", "almostFullInput");
                newComponentDOM.setAttribute("value", "[]");
                let typeName = newComponentTypeName;
                let inputName = newComponentInputName;
                elementBox.appendChild(newComponentDOM);
                newComponentDOM = document.createElement("button");
                newComponentDOM.innerHTML = `<i class="fas fa-pencil"></i>`;
                newComponentDOM.setAttribute("class", "inputEditBtn");
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName) + "_btn");
                newComponentDOM.setAttribute("onclick", `openAdvInputEditor("${removeSpaces(newComponentTypeName)}", "${removeSpaces(newComponentInputName)}", "list")`);
                buttonsToRegister.push([removeSpaces(newComponentTypeName), removeSpaces(newComponentInputName)]);
                elementBox.appendChild(newComponentDOM);
            } else if (newComponentType == "texture") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.appendChild(document.createTextNode(" "));
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.appendChild(document.createTextNode(" "));
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName));
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("disabled", "true");
                newComponentDOM.setAttribute("class", "almostFullInput");
                newComponentDOM.setAttribute("value", "");
                let typeName = newComponentTypeName;
                let inputName = newComponentInputName;
                elementBox.appendChild(newComponentDOM);
                newComponentDOM = document.createElement("button");
                newComponentDOM.innerHTML = `<i class="fas fa-pencil"></i>`;
                newComponentDOM.setAttribute("class", "inputEditBtn");
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName) + "_btn");
                newComponentDOM.setAttribute("onclick", `openSelectTextureDlg("${removeSpaces(newComponentTypeName)}", "${removeSpaces(newComponentInputName)}", "component")`);
                buttonsToRegister.push([removeSpaces(newComponentTypeName), removeSpaces(newComponentInputName)]);
                elementBox.appendChild(newComponentDOM);
            } else if (newComponentType == "loot_table") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.appendChild(document.createTextNode(" "));
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.appendChild(document.createTextNode(" "));
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName));
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("disabled", "true");
                newComponentDOM.setAttribute("class", "almostFullInput");
                newComponentDOM.setAttribute("value", "");
                let typeName = newComponentTypeName;
                let inputName = newComponentInputName;
                elementBox.appendChild(newComponentDOM);
                newComponentDOM = document.createElement("button");
                newComponentDOM.innerHTML = `<i class="fas fa-pencil"></i>`;
                newComponentDOM.setAttribute("class", "inputEditBtn");
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName) + "_btn");
                newComponentDOM.setAttribute("onclick", `openSelectTableDlg("${removeSpaces(newComponentTypeName)}", "${removeSpaces(newComponentInputName)}", "loot_table")`);
                buttonsToRegister.push([removeSpaces(newComponentTypeName), removeSpaces(newComponentInputName)]);
                elementBox.appendChild(newComponentDOM);
            } else if (newComponentType == "trade_table") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.appendChild(document.createTextNode(" "));
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.appendChild(document.createTextNode(" "));
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName));
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("disabled", "true");
                newComponentDOM.setAttribute("class", "almostFullInput");
                newComponentDOM.setAttribute("value", "");
                let typeName = newComponentTypeName;
                let inputName = newComponentInputName;
                elementBox.appendChild(newComponentDOM);
                newComponentDOM = document.createElement("button");
                newComponentDOM.innerHTML = `<i class="fas fa-pencil"></i>`;
                newComponentDOM.setAttribute("class", "inputEditBtn");
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName) + "_btn");
                newComponentDOM.setAttribute("onclick", `openSelectTableDlg("${removeSpaces(newComponentTypeName)}", "${removeSpaces(newComponentInputName)}", "trade_table")`);
                buttonsToRegister.push([removeSpaces(newComponentTypeName), removeSpaces(newComponentInputName)]);
                elementBox.appendChild(newComponentDOM);
            }/* new end */ else {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.appendChild(document.createTextNode(" "));
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.appendChild(document.createTextNode(" "));
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName));
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                let typeName = newComponentTypeName;
                let inputName = newComponentInputName;
                newComponentDOM.addEventListener("change", event => {
                    updateInput(typeName, inputName, event.target.value);
                });
                elementBox.appendChild(newComponentDOM);
            }
            elementBox.appendChild(document.createElement("br"));
            elementBox.appendChild(document.createElement("br"));
        }
        parentDiv.appendChild(elementBox);
        for (let k = 0; k < dropdownsToRegister.length; k++) {
            const [typeName, inputName] = dropdownsToRegister[k];
            $("#" + typeName + inputName).selectmenu({
                change: function (event, ui) {
                    updateInput(typeName, inputName, ui.item.value);
                }
            });
        }
        // new start
        for (let k = 0; k < buttonsToRegister.length; k++) {
            const [typeName, inputName] = buttonsToRegister[k];
            $("#" + typeName + inputName + "_btn").button();
        }
        // new end
        $(".tooltipIcon").tooltip({
            show: { effect: "fadeIn", duration: 200, delay: 0 },
            hide: { effect: "fadeOut", duration: 200, delay: 0 },
            track: false
        });
        $('input').addClass("ui-widget ui-widget-content ui-corner-all");
    }
    $("#addComponentDlg").dialog("close");
}

function generateTextureSelector(id) {
    return `<label for="entityTextureBtn${id}"> <span id="textureNameText${id}">No texture selected</span></label>
<button name="entityTextureBtn${id}" id="entityTextureBtn${id}" onclick="openSelectTextureDlg(${id})">Select Texture</button>
<i class="fas fa-trash deleteIcon" onclick="removeTexture(${id})"></i>
<br><br>`;
}

function openSelectTextureDlg(textureToSelect) {
    // new start
    if (mode == "component") {
        advEditorComponent = component;
        advEditorInput = input;
        advEditorType = "texture";
        textureSelectorMode = "component";
        $("#selectTextureSelectBtn").hide();
        $("#selectTextureSelectBtn2").show();
    } else {
        textureSelectorMode = "default";
        $("#selectTextureSelectBtn").show();
        $("#selectTextureSelectBtn2").hide();
    }
    // new end
    $("#selectTextureDlg").dialog("open");
    currentTextureSelecting = textureToSelect;
    textures = window.parent.getTextureList();
    let selectTextureMenu = document.getElementById("selectTextureMenu");
    selectTextureMenu.innerHTML = "";
    for (let i = 0; i < textures.length; i++) {
        let selectTextureMenuItem;
        let previewBox;
        let preview;
        let itemTitle;
        let itemRadio;
        selectTextureMenuItem = document.createElement("div");
        selectTextureMenuItem.setAttribute("class", "textureMenuItem");
        itemRadio = document.createElement("input");
        itemRadio.setAttribute("type", "radio");
        itemRadio.setAttribute("name", "selectedTexture");
        itemRadio.setAttribute("class", "textureRadio");
        itemRadio.setAttribute("value", textures[i]);
        selectTextureMenuItem.appendChild(itemRadio);
        if (textures[i] != "None") {
            previewBox = document.createElement("div");
            previewBox.setAttribute("class", "smallPreviewBox");
            preview = document.createElement("img");
            window.parent.projZip.folder("assets").file(textures[i]).async("blob").then(async function (file) {
            preview.setAttribute("src", await window.parent.fileToDataURL(file));
            });
            preview.setAttribute("id", window.parent.encodeText(textures[i]) + "_preview");
            previewBox.appendChild(preview);
            selectTextureMenuItem.appendChild(previewBox);
        }
        itemTitle = document.createElement("span");
        itemTitle.setAttribute("class", "textureMenuTitle");
        itemTitle.innerHTML = textures[i];
        selectTextureMenuItem.appendChild(itemTitle);
        selectTextureMenu.appendChild(selectTextureMenuItem);
        selectTextureMenuItem.addEventListener("click", () => {
        const itemRadio = selectTextureMenuItem.querySelector('input[type="radio"]');
        if (itemRadio) {
            itemRadio.checked = true;  // select this radio
        }
        });
    }
}
function closeSelectTextureDlg() {
  $("#selectTextureDlg").dialog("close");
}
function selectTexture(textureNumber) {
    $("#selectTextureDlg").dialog("close");
    const selected = document.querySelector('input[name="selectedTexture"]:checked');
    if (selected.value) {
        let textureNameText = document.getElementById("textureNameText" + textureNumber);
        if (selected.value == "None") {
            if (textureNumber == 0) {
                currentEntityTextures[0][1] = "";
            } else {
                currentEntityTextures[textureNumber - 1][1] = "";
            }
            textureNameText.innerHTML = "No texture selected";
            selectedTexture = "";
        } else {
            if (textureNumber == 0) {
                currentEntityTextures[0][1] = selected.value;
            } else {
                currentEntityTextures[textureNumber - 1][1] = selected.value;
            }
            textureNameText.innerHTML = selected.value;
            selectedTexture = selected.value;
        }
    }
}
// new start
function selectCompTexture() {
    const selected = document.querySelector('input[name="selectedTexture"]:checked');

    let component = advEditorComponent;
    let input = advEditorInput;

    if (selected.value) {
        const textureNameText = document.getElementById("textureNameText");
        if (selected.value == "None") {
            $(`#${component}${input}`).val("");
            updateInput(component, input, "");
        } else {
            $(`#${component}${input}`).val(selected.value);
            updateInput(component, input, selected.value);
        }
    }

    $("#selectTextureDlg").dialog("close");
}



async function openSelectTableDlg(component, input, type) {
    tableSelectorMode = type;
    advEditorComponent = component;
    advEditorInput = input;
    advEditorType = type;
    let tables;
    if (type == "trade_table") {
        $("#selectTableDlg").dialog("option", "title", "Select Trade Table");
        tables = await window.parent.getTradeTableList();
    } else {
        $("#selectTableDlg").dialog("option", "title", "Select Loot Table");
        tables = await window.parent.getLootTableList();
    }
    $("#selectTableDlg").dialog("open");
    let selectTableMenu = document.getElementById("selectTableMenu");
    selectTableMenu.innerHTML = "";
    for (let i = 0; i < tables.length; i++) {
        let selectTableMenuItem;
        let previewBox;
        let preview;
        let itemTitle;
        let itemRadio;
        selectTableMenuItem = document.createElement("div");
        selectTableMenuItem.setAttribute("class", "textureMenuItem");
        itemRadio = document.createElement("input");
        itemRadio.setAttribute("type", "radio");
        itemRadio.setAttribute("name", "selectedTable");
        itemRadio.setAttribute("class", "textureRadio");
        itemRadio.setAttribute("value", tables[i]);
        selectTableMenuItem.appendChild(itemRadio);
        itemTitle = document.createElement("span");
        itemTitle.setAttribute("class", "textureMenuTitle");
        itemTitle.innerHTML = tables[i];
        selectTableMenuItem.appendChild(itemTitle);
        selectTableMenu.appendChild(selectTableMenuItem);
        selectTableMenuItem.addEventListener("click", () => {
            const itemRadio = selectTableMenuItem.querySelector('input[type="radio"]');
            if (itemRadio) {
                itemRadio.checked = true;  // select this radio
            }
        });
    }
}
function closeSelectTableDlg() {
    $("#selectTableDlg").dialog("close");
}
function selectTable() {
    const selected = document.querySelector('input[name="selectedTable"]:checked');

    let component = advEditorComponent;
    let input = advEditorInput;

    if (selected.value) {
        const textureNameText = document.getElementById("textureNameText");
        if (selected.value == "None") {
            $(`#${component}${input}`).val("");
            updateInput(component, input, "");
        } else {
            $(`#${component}${input}`).val(selected.value);
            updateInput(component, input, selected.value);
        }
    }

    $("#selectTableDlg").dialog("close");
}
// new end
$("#addComponentType").selectmenu();

function openSelectModelDlg() {
  $("#selectModelDlg").dialog("open");
  models = window.parent.getModelList("entity");
  let selectModelMenu = document.getElementById("selectModelMenu");
  selectModelMenu.innerHTML = "";
  for (let i = 0; i < models.length; i++) {
    let selectModelMenuItem;
    let previewBox;
    let preview;
    let itemTitle;
    let itemRadio;
    selectModelMenuItem = document.createElement("div");
    selectModelMenuItem.setAttribute("class", "textureMenuItem");
    itemRadio = document.createElement("input");
    itemRadio.setAttribute("type", "radio");
    itemRadio.setAttribute("name", "selectedModel");
    itemRadio.setAttribute("class", "textureRadio");
    itemRadio.setAttribute("value", models[i]);
    selectModelMenuItem.appendChild(itemRadio);
    itemTitle = document.createElement("span");
    itemTitle.setAttribute("class", "textureMenuTitle");
    itemTitle.innerHTML = models[i];
    selectModelMenuItem.appendChild(itemTitle);
    selectModelMenu.appendChild(selectModelMenuItem);
    selectModelMenuItem.addEventListener("click", () => {
      const itemRadio = selectModelMenuItem.querySelector('input[type="radio"]');
      if (itemRadio) {
        itemRadio.checked = true;  // select this radio
      }
    });
  }
}
function closeSelectModelDlg() {
  $("#selectModelDlg").dialog("close");
}
async function selectModel() {
    $("#selectModelDlg").dialog("close");
    const selected = document.querySelector('input[name="selectedModel"]:checked');
    let oldModel = selectedModel;
    if (selected.value) {
        if (selected.value == "None") {
            modelNameText.innerHTML = "No model selected";
            selectedModel = "";
        } else {
            modelNameText.innerHTML = selected.value;
            selectedModel = selected.value;
        }
    }
}

function addTexture(name = "", value = "", i = currentEntityTextures.length, addToList = true) {
    let div = document.createElement("div");
    div.innerHTML = generateTextureSelector(i + 1);
    let nameBox = document.createElement("input");
    nameBox.setAttribute("id", `textureNameBox${i + 1}`);
    nameBox.addEventListener("change", function() {
        currentEntityTextures[i][0] = nameBox.value;
    });
    nameBox.value = name;
    div.prepend(nameBox);
    additionalTexturesDiv.appendChild(div);
    if (value == "") {
        document.getElementById(`textureNameText${i + 1}`).innerHTML = "No texture selected";
    } else {
        document.getElementById(`textureNameText${i + 1}`).innerHTML = value;
    }
    $(`#entityTextureBtn${i + 1}`).button();
    $('input').addClass("ui-widget ui-widget-content ui-corner-all");
    if (addToList) {
        currentEntityTextures.push([name, value]);
    }
}

function removeTexture(id) {
    currentEntityTextures.splice(id - 1, 1);
    additionalTexturesDiv.innerHTML = "";
    loadTextureList(currentEntityTextures);
}

function loadTextureList(data) {
    for (let i = 1; i < data.length; i++) {
        addTexture(data[i][0], data[i][1], i, false);
    }
}

function saveProject() {
    return {
        name: elementData.name,
        id: $("#entityIDBox").val(),
        type: "Entity",
        displayName: $("#nameBox").val(),
        model: selectedModel,
        textures: currentEntityTextures,
        components: currentEntityComponents,
        additionalOptions: {
            enableAttachables: enableAttachablesBox.checked,
            hideArmor: hideArmorBox.checked
        }
    };
}
function loadProject(data) {
    elementData = data;
    $("#elementIDBox").val(data.name);
    $("#entityIDBox").val(data.id);
    $("#nameBox").val(data.displayName);
    enableAttachablesBox.checked = data.additionalOptions.enableAttachables;
    hideArmorBox.checked = data.additionalOptions.hideArmor;
    if (data.textures) {
        currentEntityTextures = data.textures;
        loadTextures(data);
    }
    loadComponents(data.components);
}

async function loadTextures(data) {
    if (data) {
        selectedModel = data.model;
        if (data.model) {
            modelNameText.innerHTML = data.model;
        }
        loadTextureList(data.textures);
        dataKeys = Object.keys(data.textures);
        console.log("Object:");
        console.log(data.textures);
        console.log("Keys:");
        console.log(dataKeys);
        if (data.textures[0][1]) {
            document.getElementById(`textureNameText0`).innerHTML = data.textures[0][1];
        } else {
            document.getElementById(`textureNameText0`).innerHTML = "No texture selected";
        }
        for (let i = 1; i < dataKeys.length - 1; i++) {
            j = i.toString();
            console.log("i: " + i);
            console.log(data.textures[j]);
            if (data.textures[j]) {
                document.getElementById(`textureNameText${i}`).innerHTML = data.textures[j];
            }
        }
    }
}

function loadComponents(data) {
    if (data) {
        for (let i = 0; i < Object.keys(data).length; i++) {
            createComponent(Object.keys(data)[i]);
            let componentInputDefs = componentDefinitions[Object.keys(data)[i]].inputs;
            for (let j = 0; j < componentInputDefs.length; j++) {
                if (componentInputDefs[j].type == "boolean") {
                    $(removeSpaces(`#${Object.keys(data)[i]}${componentInputDefs[j].name}`)).prop("checked", data[Object.keys(data)[i]][componentInputDefs[j].name]);
                } else {
                    $(removeSpaces(`#${Object.keys(data)[i]}${componentInputDefs[j].name}`)).val(data[Object.keys(data)[i]][componentInputDefs[j].name]);
                    if (componentInputDefs[j].type == "dropdown") {
                        $(removeSpaces(`#${Object.keys(data)[i]}${componentInputDefs[j].name}`)).selectmenu("refresh");
                    }
                }
                currentEntityComponents[Object.keys(data)[i]][componentInputDefs[j].name] = data[Object.keys(data)[i]][componentInputDefs[j].name];
            }
        }
    }
}

function updateInput(type, input, value) {
    currentEntityComponents[type.replace("_s_", " ")][input] = value;
}

function deleteComponent(name) {
    delete currentEntityComponents[name];
    document.getElementById("componentbox_" + removeSpaces(name)).remove();
    closeDeleteComponent()
}

function closeDeleteComponent() {
    $("#deleteDlg").dialog("close");
}

function openDeleteComponent(name) {
    $("#deleteDlg").dialog("open");
    let deleteDlgText = document.getElementById("deleteDlgText");
    let deleteDlgConfirm = document.getElementById("deleteDlgConfirm");
    deleteDlgText.innerHTML = `Are you sure you want to delete the component "${name}"?`;
    deleteDlgConfirm.setAttribute("onclick", `deleteComponent("${name}")`);
}


// new start
function changeAdvInputMode(mode) {
    if (mode == "list") {
        $("#advEditorContentList").show();
        advEditorListContent.innerHTML = "";
    }
}
function openAdvInputEditor(component, input, type) {
    advEditorComponent = component;
    advEditorInput = input;
    advEditorType = type;
    $("#advEditor").dialog("open");
    if (type == "list") {
        changeAdvInputMode("list");
        if (typeof currentItemComponents[addSpaces(component)][addSpaces(input)] != "object") {
            currentItemComponents[addSpaces(component)][addSpaces(input)] = [];
        }
        advEditorCurrentData = currentItemComponents[addSpaces(component)][addSpaces(input)];
        for (let i = 0; i < advEditorCurrentData.length; i++) {
            advEditorAddItem("list", advEditorCurrentData[i], i);
        }
    }
}
function closeAdvInputEditor() {
    $("#advEditor").dialog("close");
}
function saveAdvInput() {
    let component = advEditorComponent;
    let input = advEditorInput;
    let type = advEditorType;
    let data = advEditorCurrentData;
    $(`#${component}${input}`).val(data.toString());
    updateInput(component, input, data);
    closeAdvInputEditor();
}
function advEditorAddItem(mode, value, idVal = -1) {
    let id;
    if (idVal >= 0) {
        id = idVal;
    } else {
        id = advEditorCurrentData.length;
        advEditorCurrentData[id] = value;
    }
    if (mode == "list") {
        let textBox = document.createElement("input");
        textBox.setAttribute("id", `advEditorListItem${id}`);
        textBox.setAttribute("value", value);
        textBox.addEventListener("change", event => {
            advEditorCurrentData[id] = event.target.value;
        });
        advEditorListContent.appendChild(textBox);
        let deleteBtn = document.createElement("i");
        deleteBtn.setAttribute("class", "fas fa-trash deleteIcon");
        deleteBtn.setAttribute("onclick", `advEditorRemoveItem(${id})`);
        advEditorListContent.appendChild(document.createTextNode(" "));
        advEditorListContent.appendChild(deleteBtn);
        advEditorListContent.appendChild(document.createElement("br"));
    }
    $('input').addClass("ui-widget ui-widget-content ui-corner-all");
}
function advEditorRemoveItem(id) {
    if (advEditorType == "list") {
        advEditorListContent.innerHTML = "";
    }
    advEditorCurrentData.splice(id, 1);
    for (let i = 0; i < advEditorCurrentData.length; i++) {
        advEditorAddItem(advEditorType, advEditorCurrentData[i], i);
    }
}
$("#advEditorListAddBtn").button();
// new end


// Run after jQuery, jQuery UI and TouchPunch are loaded and after dialogs exist.
$(function () {

  // --- Small compatibility patch for draggable + fixed positioning (fixes offsets) ---
  // This tweak adjusts internal offsets when element is fixed. Run once.
  (function () {
    if (!$.ui || !$.ui.draggable) return;
    const _oldMouseStart = $.ui.draggable.prototype._mouseStart;
    $.ui.draggable.prototype._mouseStart = function (event) {
      // If helper/widget is fixed, adjust click offset to page coords so TouchPunch / draggable agree.
      try {
        if (this.helper && this.helper.css && this.helper.css("position") === "fixed" && event && event.pageX !== undefined) {
          const helperOffset = this.helper.offset(); // page coords
          this.offset.click = {
            left: event.pageX - helperOffset.left,
            top: event.pageY - helperOffset.top
          };
        }
      } catch (err) {
        // swallow harmless errors
      }
      return _oldMouseStart.call(this, event);
    };
  })();

  // --- Helpers ---
  function centerWidgetInViewport($widget) {
    // Use window.innerWidth/innerHeight to ensure viewport values
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w = $widget.outerWidth();
    const h = $widget.outerHeight();
    const top = Math.max(Math.round((vh - h) / 2), 0);
    const left = Math.max(Math.round((vw - w) / 2), 0);
    $widget.css({
      position: "fixed",
      top: top + "px",
      left: left + "px",
      transform: "" // ensure no translate transform interfering
    });
  }

  function makeTitlebarTouchable($widget) {
    $widget.find(".ui-dialog-titlebar").css({
      "touch-action": "none",
      "-ms-touch-action": "none"
    });
  }

  // --- Main patch routine ---
  function patchAllDialogsToViewport() {
    $(".ui-dialog-content").each(function () {
      const $content = $(this);
      const inst = $content.dialog("instance");
      if (!inst) return;

      // Widget is the actual visible .ui-dialog wrapper
      const $widget = $content.dialog("widget");

      // ensure titlebar allows touch events
      makeTitlebarTouchable($widget);

      // Initialize draggable once on the widget (do NOT destroy/recreate on open)
      if (!$widget.data("ui-draggable")) {
        $widget.draggable({
          handle: ".ui-dialog-titlebar",
          scroll: false,
          // We do not set containment here because containment coords can be tricky with fixed,
          // but you can enable if you want to restrict dragging:
          // containment: [0, 0, window.innerWidth - $widget.outerWidth(), window.innerHeight - $widget.outerHeight()]
        });
      }

      // Preserve any existing open callback
      const originalOpen = $content.dialog("option", "open");

      // Replace open to center (but DO NOT re-init draggable)
      $content.dialog("option", "open", function (event, ui) {
        if (typeof originalOpen === "function") originalOpen.call(this, event, ui);

        // center the widget in the viewport (pixel-based)
        centerWidgetInViewport($widget);

        // reapply touchable titlebar (in case UI rebuilt the widget)
        makeTitlebarTouchable($widget);

        // Re-center on resize (use namespaced handler so we can overwrite safely)
        $(window).off("resize.centerDialog").on("resize.centerDialog", function () {
          centerWidgetInViewport($widget);
        });
      });
    });
  }

  // Run it now:
  patchAllDialogsToViewport();

  // Optional: watch for future dialogs being added dynamically and patch them
  const mo = new MutationObserver((mutations) => {
    let added = false;
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.classList && node.classList.contains("ui-dialog-content")) { added = true; break; }
        if (node.querySelector && node.querySelector(".ui-dialog-content")) { added = true; break; }
      }
      if (added) break;
    }
    if (added) patchAllDialogsToViewport();
  });
  mo.observe(document.body, { childList: true, subtree: true });

});
