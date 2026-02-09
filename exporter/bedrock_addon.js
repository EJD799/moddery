let bedrockExporter = {};

bedrockExporter.parseCraftingGrid = function(grid, type, name) {
  // Normalize to 3x3 item-only array
  const items = grid.slice(0, 9).map(cell => cell?.[0] ?? "");

  if (!isBedrockShapedRecipeValid(items)) {
    logExporter(`⚠ The shaped recipe <i>${name}</i> may not work correctly in Minecraft Bedrock Edition due to known crafting pattern issues.`, "warn");
  }

  // Convert to rows
  let rows = [
    items.slice(0, 3),
    items.slice(3, 6),
    items.slice(6, 9)
  ];

  // Trim empty rows
  while (rows.length && rows[0].every(v => !v)) rows.shift();
  while (rows.length && rows[rows.length - 1].every(v => !v)) rows.pop();

  // Trim empty columns
  let minCol = 0;
  let maxCol = rows[0].length - 1;

  while (rows.every(r => !r[minCol])) minCol++;
  while (rows.every(r => !r[maxCol])) maxCol--;

  rows = rows.map(r => r.slice(minCol, maxCol + 1));

  // Build pattern + key
  const key = {};
  const itemToChar = {};
  let charCode = "A".charCodeAt(0);

  const pattern = rows.map(row => {
    return row.map(item => {
      if (!item) return " ";

      if (!itemToChar[item]) {
        const char = String.fromCharCode(charCode++);
        itemToChar[item] = char;
        key[char] = item;
      }
      return itemToChar[item];
    }).join("");
  });

  return [pattern, key];
};

bedrockExporter.parseItemComponents = async function(file) {
  let components = file.components;
  let keys = Object.keys(components);
  let newObj = {};
  newObj["minecraft:max_stack_size"] = Number(file.maxStackSize);
  if (keys.includes("Allow Off Hand")) {
    let component = components["Allow Off Hand"];
    newObj["minecraft:allow_off_hand"] = component.main;
  }
  if (keys.includes("Block Placer")) {
    let component = components["Block Placer"];
    newObj["minecraft:block_placer"] = {
      "block": component.block,
      "replace_block_item": component.replace_block_item,
    };
    if (component.use_on) {
      newObj["minecraft:block_placer"].use_on = component.use_on;
    }
  }
  if (keys.includes("Bundle Interaction")) {
    let component = components["Bundle Interaction"];
    newObj["minecraft:bundle_interaction"] = {
      "num_viewable_slots": Number(component.num_viewable_slots)
    };
  }
  if (keys.includes("Can Destroy in Creative")) {
    let component = components["Can Destroy in Creative"];
    newObj["minecraft:can_destroy_in_creative"] = component.main;
  }
  if (keys.includes("Compostable")) {
    let component = components["Compostable"];
    newObj["minecraft:compostable"] = {
      "composting_chance": Number(component.composting_chance)
    };
  }
  /*if (keys.includes("Cooldown")) {
    let component = components["Cooldown"];
    newObj["minecraft:cooldown"] = {
      "category": `${projManifest.namespace}:cooldown_${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`,
      "duration": Number(component.duration),
      "type": "use"
    };
  }*/
  if (keys.includes("Damage")) {
    let component = components["Damage"];
    newObj["minecraft:damage"] = Number(component.main);
  }
  if (keys.includes("Digger")) {
    let component = components["Digger"];
    newObj["minecraft:digger"] = {
      "use_efficiency": true,
      "destroy_speeds": [
        {
          "block": {
            "tags": component.block
          },
          "speed": Number(component.speed)
        }
      ]
    };
  }
  if (keys.includes("Durability")) {
    let component = components["Durability"];
    newObj["minecraft:durability"] = {
      "max_durability": Number(component.max_durability),
      "damage_chance": {
        "min": Number(component.damage_chance),
        "max": Number(component.damage_chance)
      }
    };
  }
  if (keys.includes("Dyeable")) {
    let component = components["Dyeable"];
    newObj["minecraft:dyeable"] = {
      "default_color": component.default_color
    };
  }
  if (keys.includes("Enchantable")) {
    let component = components["Enchantable"];
    newObj["minecraft:enchantable"] = {
      "slot": component.slot,
      "value": Number(component.value)
    };
  }
  if (keys.includes("Entity Placer")) {
    let component = components["Entity Placer"];
    newObj["minecraft:entity_placer"] = {
      "entity": component.entity,
      "use_on": [],
      "dispense_on": []
    };
  }
  if (keys.includes("Fire Resistant")) {
    let component = components["Fire Resistant"];
    newObj["minecraft:fire_resistant"] = {
      "value": component.main
    };
  }
  if (keys.includes("Food")) {
    let component = components["Food"];
    newObj["minecraft:food"] = {
      "can_always_eat": component.can_always_eat,
      "nutrition": Number(component.nutrition),
      "saturation_modifier": Number(component.saturation_modifier),
    };
    if (component.using_converts_to) {
      newObj["minecraft:food"].using_converts_to = component.using_converts_to;
    }
  }
  if (keys.includes("Fuel")) {
    let component = components["Fuel"];
    newObj["minecraft:fuel"] = {
      "duration": Number(component.duration)
    };
  }
  if (keys.includes("Glint")) {
    let component = components["Glint"];
    newObj["minecraft:glint"] = component.main;
  }
  if (keys.includes("Hand Equipped")) {
    let component = components["Hand Equipped"];
    newObj["minecraft:hand_equipped"] = component.main;
  }
  if (keys.includes("Hover Text Color")) {
    let component = components["Hover Text Color"];
    newObj["minecraft:hover_text_color"] = component.main;
  }
  if (keys.includes("Interact Button")) {
    let component = components["Interact Button"];
    newObj["minecraft:interact_button"] = component.main;
  }
  // Kinetic Weapon
  if (keys.includes("Liquid Clipped")) {
    let component = components["Liquid Clipped"];
    newObj["minecraft:liquid_clipped"] = component.main;
  }
  // Piercing Weapon
  if (keys.includes("Pottery Sherd")) {
    let component = components["Pottery Sherd"];
    newObj["minecraft:decorated_pot_sherds"] = {
      texture: component.texture
    };
  }
  if (keys.includes("Projectile")) {
    let component = components["Projectile"];
    newObj["minecraft:projectile"] = {
      "minimum_critical_power": Number(component.minimum_critical_power),
      "projectile_entity": component.projectile_entity
    };
  }
  if (keys.includes("Rarity")) {
    let component = components["Rarity"];
    newObj["minecraft:rarity"] = component.main;
  }
  if (keys.includes("Record")) {
    let component = components["Record"];
    newObj["minecraft:record"] = {
      "comparator_signal": Number(component.comparator_signal),
      "duration": Number(component.duration),
      "sound_event": component.sound_event
    };
  }
  if (keys.includes("Repairable")) {
    let component = components["Repairable"];
    newObj["minecraft:repairable"] = {
      "repair_items": [
        {
          "items": component.items,
          "repair_amount": component.repair_amount
        }
      ]
    };
  }
  if (keys.includes("Shooter")) {
    let component = components["Shooter"];
    newObj["minecraft:shooter"] = {
      "ammunition": [
        {
          "item": component.item,
          "use_offhand": true,
          "search_inventory": true,
          "use_in_creative": true
        }
      ],
      "max_draw_duration": Number(component.max_draw_duration),
      "scale_power_by_draw_duration": component.scale_power_by_draw_duration,
      "charge_on_draw": component.charge_on_draw
    };
  }
  if (keys.includes("Should Despawn")) {
    let component = components["Should Despawn"];
    newObj["minecraft:should_despawn"] = component.main;
  }
  if (keys.includes("Storage Item")) {
    let component = components["Storage Item"];
    newObj["minecraft:storage_item"] = {
      "max_slots": Number(component.max_slots),
      "allow_nested_storage_items": component.allow_nested_storage_items,
    };
    if (component.allowed_items) {
      newObj["minecraft:storage_item"].allowed_items = component.allowed_items;
    }
    if (component.banned_items) {
      newObj["minecraft:storage_item"].banned_items = component.banned_items;
    }
  }
  if (keys.includes("Swing Duration")) {
    let component = components["Swing Duration"];
    newObj["minecraft:swing_duration"] = {
      "value": Number(component.value)
    };
  }
  if (keys.includes("Tags")) {
    let component = components["Tags"];
    newObj["minecraft:tags"] = {
      "tags": component.tags
    };
  }
  if (keys.includes("Throwable")) {
    let component = components["Throwable"];
    newObj["minecraft:throwable"] = {
      "do_swing_animation": component.do_swing_animation,
      "launch_power_scale": Number(component.launch_power_scale),
      "max_launch_power": Number(component.max_launch_power),
      "scale_power_by_draw_duration": false,
      "min_draw_duration": -1,
      "max_draw_duration": -1
    };
  }
  if (keys.includes("Use Animation")) {
    let component = components["Use Animation"];
    newObj["minecraft:use_animation"] = component.main;
  }
  if (keys.includes("Use Modifiers")) {
    let component = components["Use Modifiers"];
    newObj["minecraft:use_modifiers"] = {
      //"emit_vibrations": component.emit_vibrations,
      "movement_modifer": component.movement_modifer,
      "use_duration": Number(component.use_duration)
    };
  }
  if (keys.includes("Wearable")) {
    let component = components["Wearable"];
    newObj["minecraft:wearable"] = {
      "slot": component.slot,
      "protection": Number(component.protection),
      "hides_player_location": component.hides_player_location
    };
  }
  return newObj;
};

bedrockExporter.parseBlockComponents = async function(file) {
  let components = file.components;
  let keys = Object.keys(components);
  let newObj1 = {};
  let newObj2 = [];
  let newObj3 = {};
  let newObj4 = false;

  if (keys.includes("Placement Direction")) {
    let component = components["Placement Direction"];
    newObj3["minecraft:placement_direction"] = {
      "enabled_states": [`minecraft:${component.type}`],
      "y_rotation_offset": Number(component.y_rotation_offset)
    };
    let permutationsToAdd;
    if (component.type == "cardinal_direction") {
      permutationsToAdd = [
        {
          "condition": "q.block_state('minecraft:cardinal_direction') == 'north'",
          "components": {
            "minecraft:transformation": { "rotation": [0, 0, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:cardinal_direction') == 'west'",
          "components": {
            "minecraft:transformation": { "rotation": [0, 90, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:cardinal_direction') == 'south'",
          "components": {
            "minecraft:transformation": { "rotation": [0, 180, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:cardinal_direction') == 'east'",
          "components": {
            "minecraft:transformation": { "rotation": [0, -90, 0] }
          }
        }
      ];
    } else if (component.type == "facing_direction") {
      permutationsToAdd = [
        {
          "condition": "q.block_state('minecraft:facing_direction') == 'down'",
          "components": {
            "minecraft:transformation": { "rotation": [90, 0, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:facing_direction') == 'up'",
          "components": {
            "minecraft:transformation": { "rotation": [-90, 0, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:facing_direction') == 'north'",
          "components": {
            "minecraft:transformation": { "rotation": [0, 0, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:facing_direction') == 'west'",
          "components": {
            "minecraft:transformation": { "rotation": [0, 90, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:facing_direction') == 'south'",
          "components": {
            "minecraft:transformation": { "rotation": [0, 180, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:facing_direction') == 'east'",
          "components": {
            "minecraft:transformation": { "rotation": [0, -90, 0] }
          }
        }
      ];
    }
    newObj2.push(...permutationsToAdd);
  }
  if (keys.includes("Placement Position")) {
    let component = components["Placement Position"];
    newObj3["minecraft:placement_position"] = {
      "enabled_states": [`minecraft:${component.type}`]
    };
    let permutationsToAdd;
    if (component.type == "vertical_half") {
      permutationsToAdd = [
        {
          "condition": "q.block_state('minecraft:vertical_half') == 'bottom'",
          "components": {
            "minecraft:transformation": { "translation": [0, 0, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:vertical_half') == 'top'",
          "components": {
            "minecraft:transformation": { "translation": [0, 8, 0] }
          }
        }
      ];
    } else if (component.type == "block_face") {
      permutationsToAdd = [
        {
          "condition": "q.block_state('minecraft:block_face') == 'down'",
          "components": {
            "minecraft:transformation": { "rotation": [90, 0, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:block_face') == 'up'",
          "components": {
            "minecraft:transformation": { "rotation": [-90, 0, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:block_face') == 'north'",
          "components": {
            "minecraft:transformation": { "rotation": [0, 0, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:block_face') == 'west'",
          "components": {
            "minecraft:transformation": { "rotation": [0, 90, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:block_face') == 'south'",
          "components": {
            "minecraft:transformation": { "rotation": [0, 180, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:block_face') == 'east'",
          "components": {
            "minecraft:transformation": { "rotation": [0, -90, 0] }
          }
        }
      ];
    }
    newObj2.push(...permutationsToAdd);
  }
  if (keys.includes("Collision Box")) {
    let component = components["Collision Box"];
    if (component.disable) {
      newObj1["minecraft:collision_box"] = false;
    } else {
      let originV3 = component.origin.split(",").map(str => Number(str));
      let sizeV3 = component.size.split(",").map(str => Number(str));
      newObj1["minecraft:collision_box"] = {
        "origin": originV3,
        "size": sizeV3
      };
    }
  }
  if (keys.includes("Crafting Table")) {
    let component = components["Crafting Table"];
    newObj1["minecraft:crafting_table"] = {
      "table_name": component.table_name,
      "crafting_tags": [component.crafting_tags]
    };
  }
  if (keys.includes("Destructible by Explosion")) {
    let component = components["Destructible by Explosion"];
    if (!component.main) {
      newObj1["minecraft:destructible_by_explosion"] = false;
    } else {
      newObj1["minecraft:destructible_by_explosion"] = {
        "explosion_resistance": Number(component.explosion_resistance)
      };
    }
  }
  if (keys.includes("Destructible by Mining")) {
    let component = components["Destructible by Mining"];
    if (!component.main) {
      newObj1["minecraft:destructible_by_mining"] = false;
    } else if (component.seconds_to_destroy == 0) {
      newObj1["minecraft:destructible_by_mining"] = true;
    } else {
      newObj1["minecraft:destructible_by_mining"] = {
        "seconds_to_destroy": Number(component.seconds_to_destroy)
      };
    }
  }
  if (keys.includes("Destruction Particles")) {
    let component = components["Destruction Particles"];
    newObj1["minecraft:destruction_particles"] = {
      "particle_count": component.particle_count
    };
  }
  if (keys.includes("Flammable")) {
    let component = components["Flammable"];
    if (!component.main) {
      newObj1["minecraft:flammable"] = false;
    } else {
      newObj1["minecraft:flammable"] = {
        "catch_chance_modifier": Number(component.catch_chance_modifier),
        "destroy_chance_modifier": Number(component.destroy_chance_modifier)
      };
    }
  }
  if (keys.includes("Flower Pottable")) {
    let component = components["Flower Pottable"];
    newObj1["minecraft:flower_pottable"] = {};
  }
  if (keys.includes("Friction")) {
    let component = components["Friction"];
    newObj1["minecraft:friction"] = Number(component.main);
  }
  if (keys.includes("Interactable")) {
    let component = components["Interactable"];
    if (component.main) {
      newObj4 = [
        `${projManifest.namespace}:interactable`
      ];
    }
  }
  if (keys.includes("Light Dampening")) {
    let component = components["Light Dampening"];
    newObj1["minecraft:light_dampening"] = Number(component.main);
  }
  if (keys.includes("Light Emission")) {
    let component = components["Light Emission"];
    newObj1["minecraft:light_emission"] = Number(component.main);
  }
  if (keys.includes("Liquid Detection")) {
    let component = components["Liquid Detection"];
    newObj1["minecraft:liquid_detection"] = {
      "detection_rules": [
        {
          "liquid_type": "water",
          "can_contain_liquid": component.can_contain_liquid,
          "on_liquid_touches": component.on_liquid_touches
        }
      ]
    };
  }
  if (keys.includes("Loot")) {
    let component = components["Loot"];
    let lootTableFile = JSON.parse(await projZip.folder("elements").file(`${component.main}.json`).async("string"));
    newObj1["minecraft:loot"] = `loot_tables/${lootTableFile.id}.json`;
  }
  if (keys.includes("Map Color")) {
    let component = components["Map Color"];
    newObj1["minecraft:map_color"] = component.main;
  }
  if (keys.includes("Movable")) {
    let component = components["Movable"];
    newObj1["minecraft:movable"] = {
      "movement_type": component.movement_type,
      "sticky": component.sticky
    };
  }
  if (keys.includes("Precipitation Interactions")) {
    let component = components["Precipitation Interactions"];
    newObj1["minecraft:precipitation_interactions"] = {
      "precipitation_behavior": component.precipitation_behavior
    };
  }
  if (keys.includes("Random Offset")) {
    let component = components["Random Offset"];
    newObj1["minecraft:random_offset"] = {
      "x": {
        "steps": Number(component.x_steps),
        "range": {
          "min": Number(component.x_min),
          "max": Number(component.x_max)
        }
      },
      "y": {
        "steps": Number(component.y_steps),
        "range": {
          "min": Number(component.y_min),
          "max": Number(component.y_max)
        }
      },
      "z": {
        "steps": Number(component.z_steps),
        "range": {
          "min": Number(component.z_min),
          "max": Number(component.z_max)
        }
      }
    };
  }
  if (keys.includes("Redstone Conductivity")) {
    let component = components["Redstone Conductivity"];
    newObj1["minecraft:redstone_conductivity"] = {
      "redstone_conductor": component.redstone_conductor,
      "allows_wire_to_step_down": component.allows_wire_to_step_down
    };
  }
  if (keys.includes("Redstone Producer")) {
    let component = components["Redstone Producer"];
    newObj1["minecraft:redstone_producer"] = {
      "power": Number(component.power),
    };
    if (component.connected_faces) {
      newObj1["minecraft:redstone_producer"].connected_faces = component.connected_faces;
    }
  }
  if (keys.includes("Replaceable")) {
    let component = components["Replaceable"];
    if (component.main) {
      newObj1["minecraft:replaceable"] = {};
    }
  }
  if (keys.includes("Selection Box")) {
    let component = components["Selection Box"];
    if (component.disable) {
      newObj1["minecraft:selection_box"] = false;
    } else {
      let originV3 = component.origin.split(",").map(str => Number(str));
      let sizeV3 = component.size.split(",").map(str => Number(str));
      newObj1["minecraft:selection_box"] = {
        "origin": originV3,
        "size": sizeV3
      };
    }
  }

  return [newObj1, newObj2, newObj3, newObj4];
}

bedrockExporter.parseEntityComponents = async function(file) {
  let components = file.components;
  let keys = Object.keys(components);
  let newObj1 = {};
  let newObj2 = {};

  if (keys.includes("Health")) {
    let component = components["Health"];
    newObj1["minecraft:health"] = {
      value: Number(component.value),
      max: Number(component.max)
    };
  }
  if (keys.includes("Attack Damage")) {
    let component = components["Attack Damage"];
    newObj1["minecraft:attack"] = {
      damage: Number(component.damage)
    };
  }
  if (keys.includes("Movement Speed")) {
    let component = components["Movement Speed"];
    newObj1["minecraft:movement"] = {
      value: Number(component.value)
    };
  }
  if (keys.includes("Collision Box")) {
    let component = components["Collision Box"];
    newObj1["minecraft:collision_box"] = {
      height: Number(component.height),
      width: Number(component.width)
    };
  }
  if (keys.includes("Can Fly")) {
    let component = components["Can Fly"];
    newObj1["minecraft:can_fly"] = component.main;
  }
  if (keys.includes("Can Climb")) {
    let component = components["Can Climb"];
    newObj1["minecraft:can_climb"] = component.main;
  }
  if (keys.includes("Buoyant")) {
    let component = components["Buoyant"];
    if (component.main) {
      newObj1["minecraft:buoyant"] = {
        liquid_blocks: ["water", "lava"]
      };
    }
  }
  if (keys.includes("Fire Immune")) {
    let component = components["Fire Immune"];
    newObj1["minecraft:fire_immune"] = component.main;
  }
  if (keys.includes("Random Stroll Behavior")) {
    let component = components["Random Stroll Behavior"];
    newObj1["minecraft:behavior.random_stroll"] = {
      priority: Number(component.priority),
      speed_multiplier: Number(component.speed_multiplier)
    };
  }
  if (keys.includes("Melee Attack Behavior")) {
    let component = components["Melee Attack Behavior"];
    newObj1["minecraft:behavior.melee_attack"] = {
      priority: Number(component.priority),
      speed_multiplier: Number(component.speed_multiplier)
    };
  }
  if (keys.includes("Panic Behavior")) {
    let component = components["Panic Behavior"];
    newObj1["minecraft:behavior.panic"] = {
      priority: Number(component.priority),
      speed_multiplier: Number(component.speed_multiplier)
    };
  }
  if (keys.includes("Loot")) {
    let component = components["Loot"];
    let lootTableFile = JSON.parse(await projZip.folder("elements").file(`${component.table}.json`).async("string"));
    newObj1["minecraft:loot"] = {
      table: `loot_tables/${lootTableFile.id}.json`
    };
  }
  if (keys.includes("Effect Immunity")) {
    let component = components["Effect Immunity"];
    newObj1["minecraft:mob_effect_immunity"] = {
      mob_effects: component.effect
    };
  }
  if (keys.includes("Apply Effect")) {
    let component = components["Apply Effect"];
    newObj1["minecraft:mob_effect"] = {
      mob_effect: component.effect,
      effect_time: Number(component.duration),
      effect_range: Number(component.range),
      cooldown_time: Number(component.cooldown),
      entity_filter: component.entity_filter,
      ambient: component.ambient
    };
  }
  if (keys.includes("Spawn Weight")) {
    let component = components["Spawn Weight"];
    newObj1["minecraft:weight"] = {
      value: Number(component.value)
    };
  }
  if (keys.includes("Transient")) {
    let component = components["Transient"];
    newObj1["minecraft:transient"] = component.main;
  }
  if (keys.includes("Interactable")) {
    let component = components["Interactable"];
    newObj1["minecraft:interact"] = {
      interact_text: component.interact_text,
      cooldown: Number(component.cooldown),
      play_sounds: component.play_sounds
    };
  }
  if (keys.includes("Add Rider")) {
    let component = components["Add Rider"];
    newObj1["minecraft:addrider"] = {
      entity_type: component.entity_type
    };
  }
  if (keys.includes("Break Door")) {
    let component = components["Break Door"];
    newObj1["minecraft:annotation.break_door"] = {
      break_time: Number(component.break_time),
      min_difficulty: component.min_difficulty
    };
  }
  if (keys.includes("Open Door")) {
    let component = components["Open Door"];
    newObj1["minecraft:annotation.open_door"] = {};
  }
  if (keys.includes("Attack Cooldown")) {
    let component = components["Attack Cooldown"];
    newObj1["minecraft:attack_cooldown"] = {
      attack_cooldown_time: [Number(component.attack_cooldown_time_min), Number(component.attack_cooldown_time_max)]
    };
  }
  if (keys.includes("Barter")) {
    let component = components["Barter"];
    let lootTableFile = JSON.parse(await projZip.folder("elements").file(`${component.barter_table}.json`).async("string"));
    newObj1["minecraft:barter"] = {
      barter_table: `loot_tables/${lootTableFile.id}.json`,
      cooldown_after_being_attacked: Number(component.cooldown_after_being_attacked)
    };
  }
  if (keys.includes("Boss")) {
    let component = components["Boss"];
    newObj1["minecraft:boss"] = {
      name: component.name,
      hud_range: Number(component.hud_range),
      should_darken_sky: component.should_darken_sky
    };
  }
  if (keys.includes("Breathable")) {
    let component = components["Breathable"];
    newObj1["minecraft:breathable"] = {
      breathes_air: component.breathes_air,
      breathes_lava: component.breathes_lava,
      breathes_solids: component.breathes_solids,
      breathes_water: component.breathes_water,
      can_dehydrate: component.can_dehydrate,
      generates_bubbles: component.generates_bubbles,
      inhale_time: Number(component.inhale_time),
      total_supply: Number(component.total_supply)
    };
  }
  if (keys.includes("Burns in Daylight")) {
    let component = components["Burns in Daylighr"];
    newObj1["minecraft:burns_in_daylight"] = component.main;
  }
  if (keys.includes("Can Join Raid")) {
    let component = components["Can Join Raid"];
    newObj1["minecraft:can_join_raid"] = component.main;
  }
  if (keys.includes("Can Power Jump")) {
    let component = components["Can Power Jump"];
    newObj1["minecraft:can_power_jump"] = component.main;
  }
  if (keys.includes("Cannot Be Attacked")) {
    let component = components["Cannot Be Attacked"];
    newObj1["minecraft:cannot_be_attacked"] = component.main;
  }
  if (keys.includes("Economy Trade Table")) {
    let component = components["Economy Trade Table"];
    let lootTableFile = JSON.parse(await projZip.folder("elements").file(`${component.table}.json`).async("string"));
    newObj1["minecraft:economy_trade_table"] = {
      table: `trading/${lootTableFile.id}.json`,
      display_name: component.display_name
    };
  }
  if (keys.includes("Flying Speed")) {
    let component = components["Flying Speed"];
    newObj1["minecraft:flying_speed"] = {
      value: Number(component.value)
    };
  }
  if (keys.includes("Friction Modifier")) {
    let component = components["Friction Modifier"];
    newObj1["minecraft:friction_modifier"] = {
      value: Number(component.value)
    };
  }
  if (keys.includes("Ground Offset")) {
    let component = components["Ground Offset"];
    newObj1["minecraft:ground_offset"] = {
      value: Number(component.value)
    };
  }
  if (keys.includes("Input Controls")) {
    let component = components["Input Controls"];
    newObj1["minecraft:input_ground_controlled"] = component.main;
  }
  if (keys.includes("Is Collidable")) {
    let component = components["Is Collidable"];
    newObj1["minecraft:is_collidable"] = component.main;
  }
  if (keys.includes("Is Dyeable")) {
    let component = components["Is Dyeable"];
    newObj1["minecraft:is_dyeable"] = {
      interact_text: component.interact_text
    };
  }
  if (keys.includes("Is Hidden When Invisible")) {
    let component = components["Is Hidden When Invisible"];
    newObj1["minecraft:is_hidden_when_invisible"] = component.main;
  }
  if (keys.includes("Renders When Invisible")) {
    let component = components["Renders When Invisible"];
    newObj1["minecraft:renders_when_invisible"] = component.main;
  }
  if (keys.includes("Scale")) {
    let component = components["Scale"];
    newObj1["minecraft:scale"] = {
      value: Number(component.value)
    };
  }
  if (keys.includes("Item Hopper")) {
    let component = components["Item Hopper"];
    newObj1["minecraft:item_hopper"] = component.main;
  }
  if (keys.includes("Static Jump")) {
    let component = components["Static Jump"];
    newObj1["minecraft:jump.static"] = {
      jump_power: Number(component.jump_power)
    };
  }
  if (keys.includes("Leashable")) {
    let component = components["Leashable"];
    newObj1["minecraft:leashable"] = {
      can_be_cut: component.can_be_cut,
      can_be_stolen: component.can_be_stolen
    };
  }
  if (keys.includes("Amphibious Movement")) {
    let component = components["Amphibious Movement"];
    newObj1["minecraft:movement.amphibious"] = {
      max_turn: Number(component.max_turn)
    };
  }
  if (keys.includes("Basic Movement")) {
    let component = components["Basic Movement"];
    newObj1["minecraft:movement.basic"] = {
      max_turn: Number(component.max_turn)
    };
  }
  if (keys.includes("Fly Movement")) {
    let component = components["Fly Movement"];
    newObj1["minecraft:movement.fly"] = {
      max_turn: Number(component.max_turn)
    };
  }
  if (keys.includes("Generic Movement")) {
    let component = components["Generic Movement"];
    newObj1["minecraft:movement.generic"] = {
      max_turn: Number(component.max_turn)
    };
  }
  if (keys.includes("Hover Movement")) {
    let component = components["Hover Movement"];
    newObj1["minecraft:movement.hover"] = {
      max_turn: Number(component.max_turn)
    };
  }
  if (keys.includes("Jump Movement")) {
    let component = components["Jump Movement"];
    newObj1["minecraft:movement.jump"] = {
      max_turn: Number(component.max_turn)
    };
  }
  if (keys.includes("Skip Movement")) {
    let component = components["Skip Movement"];
    newObj1["minecraft:movement.skip"] = {
      max_turn: Number(component.max_turn)
    };
  }
  if (keys.includes("Sway Movement")) {
    let component = components["Sway Movement"];
    newObj1["minecraft:movement.sway"] = {
      max_turn: Number(component.max_turn)
    };
  }
  if (keys.includes("Nameable")) {
    let component = components["Nameable"];
    newObj1["minecraft:nameable"] = {
      allow_name_tag_renaming: component.allow_name_tag_renaming,
      always_show: component.always_show
    };
  }
  if (keys.includes("Climb Navigation")) {
    let component = components["Climb Navigation"];
    newObj1["minecraft:navigation.climb"] = {
      avoid_damage_blocks: component.avoid_damage_blocks,
      avoid_portals: component.avoid_portals,
      avoid_sun: component.avoid_sun,
      avoid_water: component.avoid_water,
      blocks_to_avoid: component.blocks_to_avoid,
      can_breach: component.can_breach,
      can_break_doors: component.can_break_doors,
      can_jump: component.can_jump,
      can_open_doors: component.can_open_doors,
      can_open_iron_doors: component.can_open_iron_doors,
      can_pass_doors: component.can_pass_doors,
      can_path_from_air: component.can_path_from_air,
      can_path_over_lava: component.can_path_over_lava,
      can_path_over_water: component.can_path_over_water,
      can_sink: component.can_sink,
      can_swim: component.can_swim,
      can_walk: component.can_walk,
      can_walk_in_lava: component.can_walk_in_lava,
      is_amphibious: component.is_amphibious
    };
  }
  if (keys.includes("Float Navigation")) {
    let component = components["Float Navigation"];
    newObj1["minecraft:navigation.float"] = {
      avoid_damage_blocks: component.avoid_damage_blocks,
      avoid_portals: component.avoid_portals,
      avoid_sun: component.avoid_sun,
      avoid_water: component.avoid_water,
      blocks_to_avoid: component.blocks_to_avoid,
      can_breach: component.can_breach,
      can_break_doors: component.can_break_doors,
      can_jump: component.can_jump,
      can_open_doors: component.can_open_doors,
      can_open_iron_doors: component.can_open_iron_doors,
      can_pass_doors: component.can_pass_doors,
      can_path_from_air: component.can_path_from_air,
      can_path_over_lava: component.can_path_over_lava,
      can_path_over_water: component.can_path_over_water,
      can_sink: component.can_sink,
      can_swim: component.can_swim,
      can_walk: component.can_walk,
      can_walk_in_lava: component.can_walk_in_lava,
      is_amphibious: component.is_amphibious
    };
  }
  if (keys.includes("Fly Navigation")) {
    let component = components["Fly Navigation"];
    newObj1["minecraft:navigation.fly"] = {
      avoid_damage_blocks: component.avoid_damage_blocks,
      avoid_portals: component.avoid_portals,
      avoid_sun: component.avoid_sun,
      avoid_water: component.avoid_water,
      blocks_to_avoid: component.blocks_to_avoid,
      can_breach: component.can_breach,
      can_break_doors: component.can_break_doors,
      can_jump: component.can_jump,
      can_open_doors: component.can_open_doors,
      can_open_iron_doors: component.can_open_iron_doors,
      can_pass_doors: component.can_pass_doors,
      can_path_from_air: component.can_path_from_air,
      can_path_over_lava: component.can_path_over_lava,
      can_path_over_water: component.can_path_over_water,
      can_sink: component.can_sink,
      can_swim: component.can_swim,
      can_walk: component.can_walk,
      can_walk_in_lava: component.can_walk_in_lava,
      is_amphibious: component.is_amphibious
    };
  }
  if (keys.includes("Generic Navigation")) {
    let component = components["Generic Navigation"];
    newObj1["minecraft:navigation.generic"] = {
      avoid_damage_blocks: component.avoid_damage_blocks,
      avoid_portals: component.avoid_portals,
      avoid_sun: component.avoid_sun,
      avoid_water: component.avoid_water,
      blocks_to_avoid: component.blocks_to_avoid,
      can_breach: component.can_breach,
      can_break_doors: component.can_break_doors,
      can_jump: component.can_jump,
      can_open_doors: component.can_open_doors,
      can_open_iron_doors: component.can_open_iron_doors,
      can_pass_doors: component.can_pass_doors,
      can_path_from_air: component.can_path_from_air,
      can_path_over_lava: component.can_path_over_lava,
      can_path_over_water: component.can_path_over_water,
      can_sink: component.can_sink,
      can_swim: component.can_swim,
      can_walk: component.can_walk,
      can_walk_in_lava: component.can_walk_in_lava,
      is_amphibious: component.is_amphibious
    };
  }
  if (keys.includes("Hover Navigation")) {
    let component = components["Hover Navigation"];
    newObj1["minecraft:navigation.hover"] = {
      avoid_damage_blocks: component.avoid_damage_blocks,
      avoid_portals: component.avoid_portals,
      avoid_sun: component.avoid_sun,
      avoid_water: component.avoid_water,
      blocks_to_avoid: component.blocks_to_avoid,
      can_breach: component.can_breach,
      can_break_doors: component.can_break_doors,
      can_jump: component.can_jump,
      can_open_doors: component.can_open_doors,
      can_open_iron_doors: component.can_open_iron_doors,
      can_pass_doors: component.can_pass_doors,
      can_path_from_air: component.can_path_from_air,
      can_path_over_lava: component.can_path_over_lava,
      can_path_over_water: component.can_path_over_water,
      can_sink: component.can_sink,
      can_swim: component.can_swim,
      can_walk: component.can_walk,
      can_walk_in_lava: component.can_walk_in_lava,
      is_amphibious: component.is_amphibious
    };
  }
  if (keys.includes("Swim Navigation")) {
    let component = components["Swim Navigation"];
    newObj1["minecraft:navigation.swim"] = {
      avoid_damage_blocks: component.avoid_damage_blocks,
      avoid_portals: component.avoid_portals,
      avoid_sun: component.avoid_sun,
      avoid_water: component.avoid_water,
      blocks_to_avoid: component.blocks_to_avoid,
      can_breach: component.can_breach,
      can_break_doors: component.can_break_doors,
      can_jump: component.can_jump,
      can_open_doors: component.can_open_doors,
      can_open_iron_doors: component.can_open_iron_doors,
      can_pass_doors: component.can_pass_doors,
      can_path_from_air: component.can_path_from_air,
      can_path_over_lava: component.can_path_over_lava,
      can_path_over_water: component.can_path_over_water,
      can_sink: component.can_sink,
      can_swim: component.can_swim,
      can_walk: component.can_walk,
      can_walk_in_lava: component.can_walk_in_lava,
      is_amphibious: component.is_amphibious
    };
  }
  if (keys.includes("Walk Navigation")) {
    let component = components["Walk Navigation"];
    newObj1["minecraft:navigation.walk"] = {
      avoid_damage_blocks: component.avoid_damage_blocks,
      avoid_portals: component.avoid_portals,
      avoid_sun: component.avoid_sun,
      avoid_water: component.avoid_water,
      blocks_to_avoid: component.blocks_to_avoid,
      can_breach: component.can_breach,
      can_break_doors: component.can_break_doors,
      can_jump: component.can_jump,
      can_open_doors: component.can_open_doors,
      can_open_iron_doors: component.can_open_iron_doors,
      can_pass_doors: component.can_pass_doors,
      can_path_from_air: component.can_path_from_air,
      can_path_over_lava: component.can_path_over_lava,
      can_path_over_water: component.can_path_over_water,
      can_sink: component.can_sink,
      can_swim: component.can_swim,
      can_walk: component.can_walk,
      can_walk_in_lava: component.can_walk_in_lava,
      is_amphibious: component.is_amphibious
    };
  }
  if (keys.includes("Persistent")) {
    let component = components["Persistent"];
    newObj1["minecraft:persistent"] = component.main;
  }
  if (keys.includes("Physics")) {
    let component = components["Physics"];
    newObj1["minecraft:physics"] = {
      has_collision: component.has_collision,
      has_gravity: component.has_gravity,
      push_towards_closest_space: component.push_towards_closest_space
    };
  }
  if (keys.includes("Pushable")) {
    let component = components["Pushable"];
    newObj1["minecraft:pushable"] = {
      is_pushable: component.is_pushable,
      is_pushable_by_piston: component.is_pushable_by_piston
    };
  }
  if (keys.includes("Rail Movement")) {
    let component = components["Rail Movement"];
    newObj1["minecraft:rail_movement"] = {
      max_speed: Number(component.max_speed)
    };
  }
  if (keys.includes("Rideable")) {
    let component = components["Rideable"];
    newObj1["minecraft:rideable"] = {
      controlling_seat: Number(component.controlling_seat),
      crouching_skip_interact: component.crouching_skip_interact,
      dismount_mode: component.dismount_mode,
      family_types: component.family_types,
      interact_text: component.interact_text,
      passenger_max_width: Number(component.passenger_max_width),
      pull_in_entities: component.pull_in_entities,
      seat_count: Number(component.seat_count),
      seats: component.seats
    };
  }
  if (keys.includes("Tameable")) {
    let component = components["Tameable"];
    newObj1["minecraft:tameable"] = {
      probability: Number(component.probability) / 100,
      tame_items: component.tame_items
    };
  }
  if (keys.includes("Max Auto Step")) {
    let component = components["Max Auto Step"];
    newObj1["minecraft:variable_max_auto_step"] = {
      base_value: Number(component.base_value),
      controlled_value: Number(component.controlled_value)
    };
  }
  if (keys.includes("Vertical Movement Action")) {
    let component = components["Vertical Movement Action"];
    newObj1["minecraft:vertical_movement_action"] = {
      vertical_velocity: Number(component.vertical_velocity)
    };
  }
  if (keys.includes("Water Movement")) {
    let component = components["Water Movement"];
    newObj1["minecraft:water_movement"] = {
      drag_factor: Number(component.drag_factor)
    };
  }

  if (keys.includes("Spawn Egg")) {
    let component = components["Spawn Egg"];
    if (component.texture) {
      newObj2["spawn_egg"] = {
        texture: component.texture
      };
    } else {
      newObj2["spawn_egg"] = {
        base_color: component.base_color,
        overlay_color: component.overlay_color
      };
    }
  }
  
  return [newObj1, newObj2];
}


bedrockExporter.runExport = async function() {
  exportZip1 = new JSZip();
  exportZip2 = new JSZip();
  let resourcePackRequired = false;
  let decoratedPotFile = false;
  if (projManifest.packIcon) {
    let packIcon = await projZip.folder("assets").file(projManifest.packIcon).async("blob");
    exportZip1.file("pack_icon.png", packIcon);
    exportZip2.file("pack_icon.png", packIcon);
  }
  let bpManifest = {
    "format_version": 2,
    "header": {
      "name": projManifest.name,
      "description": projManifest.description,
      "uuid": projManifest.bp_uuid,
      "version": [Number(projManifest.addon_version[0]), Number(projManifest.addon_version[1]), Number(projManifest.addon_version[2])],
      "min_engine_version": minEngineVersion
    },
    "modules": [
      {
        "type": "data",
        "uuid": "5e60ecee-8628-4df7-a9cb-960baeae2c41",
        "version": [1, 0, 0]
      }
    ],
    "metadata": {
      "product_type": "addon"
    },
    "dependencies": [
      {
        "uuid": projManifest.rp_uuid,
        "version": [Number(projManifest.addon_version[0]), Number(projManifest.addon_version[1]), Number(projManifest.addon_version[2])]
      },
      {
        "module_name": "@minecraft/server",
        "version": "1.10.0"
      },
      {
        "module_name": "@minecraft/server-ui",
        "version": "1.2.0"
      }
    ]
  }
  if (projManifest?.scriptEntry ?? false) {
    let scriptInfoFile = JSON.parse(await projZip.folder("elements").file(`${projManifest.scriptEntry}.json`).async("string"));
    bpManifest.modules.push({
      "type": "script",
      "language": "javascript",
      "entry": `scripts/${scriptInfoFile?.id ?? ""}.js`,
      "uuid": "53a5804b-fb35-4f7d-a89e-e4a925fadb77",
      "version": [1, 0, 0]
    });
    exportZip1.folder("scripts").file("modderyLibs.js", (await (await fetch("https://ejd799.github.io/moddery/export_utils/bedrock/modderyLibs.js")).text()))
  }
  exportZip1.file("manifest.json", JSON.stringify(bpManifest, null, 4));
  let rpManifest = {
    "format_version": 2,
    "header": {
      "name": projManifest.name,
      "description": projManifest.description,
      "uuid": projManifest.rp_uuid,
      "version": [Number(projManifest.addon_version[0]), Number(projManifest.addon_version[1]), Number(projManifest.addon_version[2])],
      "min_engine_version": minEngineVersion
    },
    "modules": [
      {
        "type": "resources",
        "uuid": "5a5510c5-5965-48af-a3b6-44cbaa434af5",
        "version": [1, 0, 0]
      }
    ],
    "metadata": {
      "product_type": "addon"
    },
    "dependencies": [
      {
        "uuid": projManifest.bp_uuid,
        "version": [Number(projManifest.addon_version[0]), Number(projManifest.addon_version[1]), Number(projManifest.addon_version[2])]
      }
    ]
  };
  exportZip2.file("manifest.json", JSON.stringify(rpManifest, null, 4));
  let elementsList = fileListInFolder("elements").filter(item => !item.endsWith(".code.json"));
  let assetsList = fileListInFolder("assets");
  exportLoaderText.innerHTML = "Exporting Project... (0%)";
  progressBarMax = elementsList.length + 1;
  exportLoaderProgress.setAttribute("max", progressBarMax),
  exportLoaderProgress.value = "0";
  let itemTextureFile = {
    "resource_pack_name": projManifest.namespace,
    "texture_name": "atlas.items",
    "texture_data": {}
  };
  let terrainTextureFile = {
    "resource_pack_name": projManifest.namespace,
    "texture_name": "atlas.terrain",
    "texture_data": {}
  };
  let languageFile = "";
  for (let i = 0; i < elementsList.length; i++) {
    try {
      logExporter("Exporting element: " + elementsList[i], "info");
      let elementFile = JSON.parse(await projZip.folder("elements").file(elementsList[i]).async("string"));
      let namespacedID = `${projManifest.namespace}:${elementFile.id}`;
      let role = elementFile.type;
      let exportedFile1;
      let exportedFile2;
      let exportedFile3;
      let exportedFile4;
      if (role == "Function") {
        exporterFrame.src = "https://ejd799.github.io/moddery/editor/bedrock/function.html";
        let elementCode = JSON.parse(await projZip.folder("elements").file(elementsList[i].replace(".json", ".code.json")).async("string"));
        await waitForIframeLoad(exporterFrame);
        await waitForIframeReady(exporterFrame, "loadProject");
        exporterFrame.contentWindow.loadProject(elementCode);
        if (exporterFrame.contentWindow?.generateCode) {
          exportedFile1 = exporterFrame.contentWindow.generateCode();
        } else {
          exportedFile1 = "";
        }
        exportZip1.folder("functions").folder(projManifest.namespace).file(`${elementFile.id}.mcfunction`, exportedFile1);
      } else if (role == "Script") {
        exporterFrame.src = "https://ejd799.github.io/moddery/editor/bedrock/script.html";
        let elementCode = JSON.parse(await projZip.folder("elements").file(elementsList[i].replace(".json", ".code.json")).async("string"));
        await waitForIframeLoad(exporterFrame);
        await waitForIframeReady(exporterFrame, "loadProject");
        exporterFrame.contentWindow.loadProject(elementCode);
        if (exporterFrame.contentWindow?.generateCode) {
          exportedFile1 = exporterFrame.contentWindow.generateCode()[0];
          if (projManifest.scriptEntry == elementFile.name) {
            exportedFile1 += `world.beforeEvents.worldInitialize.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent(
        "${projManifest.namespace}:interactable",
        {
            onPlayerInteract() {}
        }
    );
});`;
          }
        } else {
          exportedFile1 = "";
        }
        exportZip1.folder("scripts").file(`${elementFile.id}.js`, exportedFile1);

        let guiTextures = exporterFrame.contentWindow.generateCode()[1];
        for (let j = 0; j < guiTextures.length; j++) {
          let textureFile = await projZip.folder("assets").file(guiTextures[j]).async("arraybuffer");
          exportZip2.folder("textures").folder("custom_gui").file(guiTextures[j], textureFile);
        }
      } else if (role == "Item") {
        resourcePackRequired = true;
        let itemComponents = await bedrockExporter.parseItemComponents(elementFile);
        let textureID = `${projManifest.namespace}:${elementFile.texture.replace(".png", "")}`;
        itemComponents["minecraft:icon"] = textureID;
        if (!Object.keys(itemTextureFile.texture_data).includes(textureID)) {
          itemTextureFile.texture_data[textureID] = {
            "textures": `textures/items/${elementFile.texture.replace(".png", "")}`
          };
        }
        if (!fileListInFolder("textures/items", false, exportZip2).includes(elementFile.texture)) {
          let texture = await projZip.folder("assets").file(elementFile.texture).async("blob");
          exportZip2.folder("textures").folder("items").file(elementFile.texture, texture);
        }
        if (typeof itemComponents["minecraft:decorated_pot_sherds"] == "object") {
          itemComponents["minecraft:tags"] = {
            "tags": ["minecraft:decorated_pot_sherds"]
          };
          itemComponents["minecraft:display_name"] = {
            "value": `item.${namespacedID}.name`
          };
          languageFile += `item.${namespacedID}.name=${elementFile.displayName}\n`;
          if (!decoratedPotFile) {
            decoratedPotFile = {
              "format_version": "1.8.0",
              "minecraft:client_entity": {
                "description": {
                  "identifier": "minecraft:decorated_pot",
                  "textures": {}
                }
              }
            };
          }
          decoratedPotFile["minecraft:client_entity"].description.textures[elementFile.id] = `textures/blocks/${elementFile.id}_pattern`;
          console.log(itemComponents);
          let potTexture = await projZip.folder("assets").file(itemComponents["minecraft:decorated_pot_sherds"].texture).async("blob");
          exportZip2.folder("textures").folder("blocks").file(`${elementFile.id}_pattern.png`, potTexture);
          delete itemComponents["minecraft:decorated_pot_sherds"];
        } else {
          languageFile += `item.${namespacedID}=${elementFile.displayName}\n`;
        }
        let exportObj = {
          "format_version": formatVersion,
          "minecraft:item": {
            "description": {
              "identifier": namespacedID,
              "menu_category": {
                "category": elementFile.invCategory
              }
            },
            "components": itemComponents
          }
        };
        exportedFile1 = JSON.stringify(exportObj, null, 4);
        exportZip1.folder("items").file(`${elementFile.id}.json`, exportedFile1);
      } else if (role == "Block") {
        resourcePackRequired = true;
        let parsedFile = await bedrockExporter.parseBlockComponents(elementFile);
        let blockComponents = parsedFile?.[0] ?? {};
        let blockPermutations = parsedFile?.[1] ?? [];
        let blockTraits = parsedFile?.[2] ?? {};
        let modelID;
        let geoFile;
        if (elementFile.model == "Full Block") {
          modelID = "minecraft:geometry.full_block";
          geoFile = {
            "minecraft:geometry": [
              {
                "bones": [
                  {
                    "name": "test_bone",
                    "cubes": [
                      {
                        "uv": {
                          "up":    { "material_instance": "up" },
                          "down":  { "material_instance": "down" },
                          "north": { "material_instance": "north" },
                          "east":  { "material_instance": "east" },
                          "west":  { "material_instance": "west" },
                          "south": { "material_instance": "south" }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          };
        } else if (elementFile.model == "Plant") {
          modelID = "minecraft:geometry.cross";
          geoFile = {
            "minecraft:geometry": [
              {
                "bones": [
                  {
                    "name": "test_bone",
                    "cubes": [
                      {
                        "uv": {}
                      }
                    ]
                  }
                ]
              }
            ]
          };
        } else {
          modelID = `geometry.${elementFile.model.replace(".geo.json", "")}`;
          geoFile = await projZip.folder("assets").file(elementFile.model).async("string");
          exportZip2.folder("models").folder("blocks").file(elementFile.model, geoFile);
        }
        blockComponents["minecraft:geometry"] = modelID;
        let texturesObj = elementFile.textures;
        if (texturesObj["item"]) {
          delete texturesObj["item"];
        }
        let texturesKeys = Object.keys(texturesObj);
        let materialInstances = getMaterialInstances(geoFile);
        blockComponents["minecraft:material_instances"] = {};
        for (let j = 0; j < texturesKeys.length; j++) {
          if (texturesKeys[j] != "item") {
            let materialName;
            if (texturesKeys[j] == "default") {
              materialName = "*";
            } else {
              materialName = materialInstances[j];
            }
            let textureID = `${projManifest.namespace}:${(texturesObj[texturesKeys[j]]).replace(".png", "")}`;
            if (!fileListInFolder("textures/blocks", false, exportZip2).includes(texturesObj[texturesKeys[j]])) {
              console.log(texturesObj);
              console.log(j);
              let texture = await projZip.folder("assets").file(texturesObj[texturesKeys[j]]).async("blob");
              exportZip2.folder("textures").folder("blocks").file(texturesObj[texturesKeys[j]], texture);
            }
            if (!Object.keys(terrainTextureFile.texture_data).includes(textureID)) {
              terrainTextureFile.texture_data[textureID] = {
                "textures": `textures/blocks/${(texturesObj[texturesKeys[j]]).replace(".png", "")}`
              };
            }
            blockComponents["minecraft:material_instances"][materialName] = {
              "texture": textureID
            };
          }
        }
        if (typeof blockComponents["minecraft:flower_pottable"] == "object") {
          blockComponents["minecraft:embedded_visual"] = {
            "geometry": modelID,
            "material_instances": blockComponents["minecraft:material_instances"]
          };
        }
        languageFile += `tile.${namespacedID}.name=${elementFile.displayName}\n`;
        let exportObj = {
          "format_version": formatVersion,
          "minecraft:block": {
            "description": {
              "identifier": namespacedID,
              "menu_category": {
                "category": elementFile.invCategory
              },
              "traits": blockTraits
            },
            "components": blockComponents,
            "permutations": blockPermutations
          }
        };
        if (parsedFile[3]) {
          exportObj.custom_components = parsedFile[3];
        }
        exportedFile1 = JSON.stringify(exportObj, null, 4);
        exportZip1.folder("blocks").file(`${elementFile.id}.json`, exportedFile1);
      } else if (role == "Entity") {
        resourcePackRequired = true;
        let parsedFile = await bedrockExporter.parseEntityComponents(elementFile);

        let exportObj1 = {
          "format_version": formatVersion,
          "minecraft:entity": {
            "description": {
              "identifier": namespacedID,
              "is_summonable": true,
              "is_spawnable": true
            },
            "components": parsedFile[0]
          }
        };

        let exportObj2 = {
          "format_version": formatVersion,
          "minecraft:client_entity": {
            "description": {
              "identifier": namespacedID,
              "materials": {
                "default": "entity_alphatest"
              },
              "textures": {},
              "geometry": {
                "default": `geometry.${elementFile.id}`
              },
              "render_controllers": [
                `controller.render.${elementFile.id}`
              ],
              "enable_attachables": elementFile.additionalOptions.enableAttachables,
              "hide_armor": elementFile.additionalOptions.hideArmor
            }
          }
        };
        let modelFile = JSON.parse(await projZip.folder("assets").file(elementFile.model).async("string"));
        modelFile["minecraft:geometry"][0]["description"]["identifier"] = `geometry.${elementFile.id}`;
        exportZip2.folder("models").folder("entity").file(`geometry.${elementFile.id}.json`, JSON.stringify(modelFile));
        let textureList = elementFile.textures;
        for (let j = 0; j < textureList.length; j++) {
          let texture = textureList[j];
          exportObj2["minecraft:client_entity"]["description"]["textures"][texture[0]] = `textures/entity/${elementFile.id}/${texture[1].replace(".png", "")}`;
          let textureFile = await projZip.folder("assets").file(texture[1]).async("blob");
          exportZip2.folder("textures").folder("entity").folder(elementFile.id).file(texture[1], textureFile);
        }
        if (parsedFile[1]["spawn_egg"]) {
          exportObj2["minecraft:client_entity"]["description"]["spawn_egg"] = parsedFile[1]["spawn_egg"];
        }

        let exportObj3 = {
          "format_version": formatVersion,
          "render_controllers": {}
        };
        exportObj3.render_controllers[`controller.render.${elementFile.id}`] = {
          "geometry": "geometry.default",
          "materials": [
            {
              "*": "material.default"
            }
          ],
          "textures": ["texture.default"]
        };

        exportedFile1 = JSON.stringify(exportObj1, null, 4);
        exportedFile2 = JSON.stringify(exportObj2, null, 4);
        exportedFile3 = JSON.stringify(exportObj3, null, 4);
        exportZip1.folder("entities").file(`${elementFile.id}.json`, exportedFile1);
        exportZip2.folder("entity").file(`${elementFile.id}.json`, exportedFile2);
        exportZip2.folder("render_controllers").file(`${elementFile.id}.rc.json`, exportedFile3);

        languageFile += `entity.${namespacedID}.name=${elementFile.displayName}\n`;
        languageFile += `action.hint.exit.${namespacedID}=Press SHIFT to dismount\n`;
        languageFile += `item.spawn_egg.entity.${namespacedID}=${elementFile.displayName} Spawn Egg\n`;
      } else if (role == "Structure") {
        let exportObj1 = {
          "format_version": formatVersion,
          "minecraft:structure_template_feature": {
            "description": {
              "identifier": `${namespacedID}_feature`
            },
            "structure_name": namespacedID,
            "adjustment_radius": 4,
            "facing_direction": elementFile.facingDirection
          }
        };
        if (elementFile.structureType == "Surface") {
          exportObj1["minecraft:structure_template_feature"]["constraints"] = {
            "grounded": {},
            "unburied": {},
            "block_intersection": {
              "block_allowlist": [
                "minecraft:air" //The structure can only replace air
              ]
            }
          };
        } else if (elementFile.structureType == "Underground") {
          exportObj1["minecraft:structure_template_feature"]["constraints"] = {
            "block_intersection": {
              "block_allowlist": [
                "minecraft:air", //Makes the feature only replace air and stone
                "minecraft:stone"
              ]
            }
          };
        } else if (elementFile.structureType == "Floating") {
          exportObj1["minecraft:structure_template_feature"]["constraints"] = {
            "block_intersection": {
              "block_allowlist": [
                "minecraft:air" //Makes the structure only replace air
              ]
            }
          };
        } else if (elementFile.structureType == "Underwater") {
          exportObj1["minecraft:structure_template_feature"]["constraints"] = {
            "block_intersection": {
              "block_allowlist": [
                "minecraft:water" //Makes the structure only replace water
              ]
            }
          };
        } else if (elementFile.structureType == "Water Surface") {
          exportObj1["minecraft:structure_template_feature"]["constraints"] = {
            "block_intersection": {
              "block_allowlist": [
                "minecraft:water", //Makes the structure only replace air and water
                "minecraft:air"
              ]
            }
          };
        }

        let exportObj2 = {
          "format_version": formatVersion,
          "minecraft:feature_rules": {
            "description": {
              "identifier": `${namespacedID}_feature`,
              "places_feature": `${namespacedID}_feature`
            }
          }
        };
        if (elementFile.structureType == "Surface") {
          exportObj2["minecraft:feature_rules"]["conditions"] = {
            "placement_pass": "first_pass",
            "minecraft:biome_filter": {
              "test": "has_biome_tag",
              "operator": "==",
              "value": "overworld"
            }
          };
          exportObj2["minecraft:feature_rules"]["distribution"] = {
            "iterations": 1,
            "x": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "y": "q.heightmap(v.worldx, v.worldz)", //Generates the feature on the highest block on the column
            "z": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "scatter_chance": {
              "numerator": elementFile.spawnChance[0],
              "denominator": elementFile.spawnChance[1]
            }
          };
        } else if (elementFile.structureType == "Underground") {
          exportObj2["minecraft:feature_rules"]["conditions"] = {
            "placement_pass": "first_pass",
            "minecraft:biome_filter": {
              "test": "has_biome_tag",
              "operator": "==",
              "value": "overworld"
            }
          };
          exportObj2["minecraft:feature_rules"]["distribution"] = {
            "iterations": 1,
            "x": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "y": {
              "extent": [
                11,
                50 //Makes the structure generate between y11 and y50
              ],
              "distribution": "uniform"
            },
            "z": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "scatter_chance": {
              "numerator": 1,
              "denominator": 15
            }
          };
        } else if (elementFile.structureType == "Floating") {
          exportObj2["minecraft:feature_rules"]["conditions"] = {
            "placement_pass": "first_pass",
            "minecraft:biome_filter": {
              "test": "has_biome_tag",
              "operator": "==",
              "value": "overworld"
            }
          };
          exportObj2["minecraft:feature_rules"]["distribution"] = {
            "iterations": 1,
            "x": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "y": {
              "extent": [
                100, //Makes the structure generate from y100 to y200
                200
              ],
              "distribution": "uniform"
            },
            "z": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "scatter_chance": {
              "numerator": elementFile.spawnChance[0],
              "denominator": elementFile.spawnChance[1]
            }
          };
        } else if (elementFile.structureType == "Underwater") {
          exportObj2["minecraft:feature_rules"]["conditions"] = {
            "placement_pass": "first_pass",
            "minecraft:biome_filter": {
              "test": "has_biome_tag",
              "operator": "==",
              "value": "ocean"
            }
          };
          exportObj2["minecraft:feature_rules"]["distribution"] = {
            "iterations": 1,
            "x": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "y": "q.above_top_solid(v.worldx, v.worldz)", //Places the feature on top of the highest solid block on the column, so it won't place it on the surface of the water
            "z": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "scatter_chance": {
              "numerator": elementFile.spawnChance[0],
              "denominator": elementFile.spawnChance[1]
            }
          };
        } else if (elementFile.structureType == "Water Surface") {
          exportObj2["minecraft:feature_rules"]["conditions"] = {
            "placement_pass": "first_pass",
            "minecraft:biome_filter": {
              "test": "has_biome_tag",
              "operator": "==",
              "value": "ocean"
            }
          };
          exportObj2["minecraft:feature_rules"]["distribution"] = {
            "iterations": 1,
            "x": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "y": 62, //Makes the feature generate only on y62, which is Minecraft water level
            "z": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "scatter_chance": {
              "numerator": elementFile.spawnChance[0],
              "denominator": elementFile.spawnChance[1]
            }
          };
        }
        exportZip1.folder("features").file(`${elementFile.id}_feature.json`, JSON.stringify(exportObj1, null, 4));
        exportZip1.folder("feature_rules").file(`${elementFile.id}_feature_rule.json`, JSON.stringify(exportObj2, null, 4));
        if (elementFile.structure) {
            let structureFile = await projZip.folder("assets").file(elementFile.structure).async("blob");
            exportZip1.folder("structures").file(`${elementFile.id}.mcstructure`, structureFile);
        }
      } else if (role == "Recipe") {
        let craftingGrid = elementFile.craftingGrid;
        let exportObj = {
          "format_version": formatVersion
        };
        let parsedGrid;
        if (elementFile.recipeType == "crafting") {
          parsedGrid = bedrockExporter.parseCraftingGrid(craftingGrid, "crafting", elementFile.name);
          let ingredients = Object.values(parsedGrid[1]);
          let unlock = [];
          for (let j = 0; j < ingredients.length; j++) {
            unlock.push({
              "item": ingredients[j]
            });
          }
          exportObj["minecraft:recipe_shaped"] = {
            "description": {
              "identifier": namespacedID
            },
            "tags": ["crafting_table"],
            "pattern": parsedGrid[0],
            "key": parsedGrid[1],
            "unlock": unlock,
            "result": [
              {
                "item": craftingGrid[9][0],
                "count": Number(elementFile.outputQuantity)
              }
            ]
          };
          exportedFile1 = JSON.stringify(exportObj, null, 4);
          exportZip1.folder("recipes").file(`${elementFile.id}.json`, exportedFile1);
        } else if (elementFile.recipeType == "crafting_shapeless") {
          let ingredients = craftingGrid.slice(0, -1).map(v => v[0]).filter(Boolean);
          let unlock = [];
          for (let j = 0; j < ingredients.length; j++) {
            unlock.push({
              "item": ingredients[j]
            });
          }
          exportObj["minecraft:recipe_shapeless"] = {
            "description": {
              "identifier": namespacedID
            },
            "tags": ["crafting_table"],
            "ingredients": ingredients,
            "unlock": unlock,
            "result": [
              {
                "item": craftingGrid[9][0],
                "count": Number(elementFile.outputQuantity)
              }
            ]
          };
          exportedFile1 = JSON.stringify(exportObj, null, 4);
          exportZip1.folder("recipes").file(`${elementFile.id}.json`, exportedFile1);
        } else if (elementFile.recipeType == "stonecutter") {
          exportObj["minecraft:recipe_stonecutter"] = {
            "description": {
              "identifier": namespacedID
            },
            "tags": ["stonecutter"],
            "input": craftingGrid[5][0],
            "output": {
              "item": craftingGrid[9][0],
              "count": Number(elementFile.outputQuantity)
            }
          };
          exportedFile1 = JSON.stringify(exportObj, null, 4);
          exportZip1.folder("recipes").file(`${elementFile.id}.json`, exportedFile1);
        } else if (elementFile.recipeType == "brewing") {
          exportObj["minecraft:recipe_brewing_mix"] = {
            "description": {
              "identifier": namespacedID
            },
            "tags": ["brewing_stand"],
            "input": craftingGrid[5][0],
            "reagent": craftingGrid[4][0],
            "output": craftingGrid[9][0]
          };
          exportedFile1 = JSON.stringify(exportObj, null, 4);
          exportZip1.folder("recipes").file(`${elementFile.id}.json`, exportedFile1);
        } else {
          exportObj["minecraft:recipe_furnace"] = {
            "description": {
              "identifier": namespacedID
            },
            "tags": [elementFile.recipeType],
            "input": craftingGrid[5][0],
            "output": {
              "item": craftingGrid[9][0],
              "count": Number(elementFile.outputQuantity)
            }
          };
          exportedFile1 = JSON.stringify(exportObj, null, 4);
          exportZip1.folder("recipes").file(`${elementFile.id}.json`, exportedFile1);
        }
      } else if (role == "Loot Table") {
        let exportObj = {
          "pools": [
            {
              "rolls": {
                "min": Number(elementFile.rollCount[0]),
                "max": Number(elementFile.rollCount[1])
              },
              "entries": []
            }
          ]
        };
        let itemList = elementFile.items;
        for (let i = 0; i < itemList.length; i++) {
          exportObj.pools[0].entries.push({
            "type": "item",
            "name": itemList[i][0],
            "weight": itemList[i][1]
          });
        }
        exportedFile1 = JSON.stringify(exportObj, null, 4);
        exportZip1.folder("loot_tables").file(`${elementFile.id}.json`, exportedFile1);
      } else if (role == "Trade Table") {
        let exportObj = {
          "tiers": []
        };
        let tierList = elementFile.tiers
        let itemList = elementFile.items;
        for (let i = 0; i < tierList.length; i++) {
          filteredItemList = itemList.filter(entry => entry.tier == elementFile.tiers[i][0]);
          exportObj.tiers.push({
            "total_exp_required": elementFile.tiers[i][1],
            "trades": []
          });
          for (let j = 0; j < filteredItemList.length; j++) {
            let wantsObj = [
              {
                "item": filteredItemList[j].item1[0],
                "quantity": {
                  "min": filteredItemList[j].item1[1],
                  "max": filteredItemList[j].item1[2]
                }
              }
            ];
            if (filteredItemList[j].item1[0] != "") {
              wantsObj.push({
                "item": filteredItemList[j].item2[0],
                "quantity": {
                  "min": filteredItemList[j].item2[1],
                  "max": filteredItemList[j].item2[2]
                }
              });
            }
            let givesObj = [
              {
                "item": filteredItemList[j].item3[0],
                "quantity": {
                  "min": filteredItemList[j].item3[1],
                  "max": filteredItemList[j].item3[2]
                }
              }
            ];
            exportObj.tiers[i].trades.push({
              "wants": wantsObj,
              "gives": givesObj,
              "max_uses": -1,
              "reward_exp": true,
              "trader_exp": 1
            });
          }
        }
        exportedFile1 = JSON.stringify(exportObj, null, 4);
        exportZip1.folder("trading").file(`${elementFile.id}.json`, exportedFile1);
      }
    } catch(err) {
      logExporter(err, "error");
    }
    exportLoaderText.innerHTML = `Exporting Project... (${Math.round((exportLoaderProgress.value / progressBarMax) * 100)}%)`;
    exportLoaderProgress.value = (i + 1).toString();
  }
  exportZip2.folder("textures").file("item_texture.json", JSON.stringify(itemTextureFile, null, 4));
  exportZip2.folder("textures").file("terrain_texture.json", JSON.stringify(terrainTextureFile, null, 4));
  exportZip2.folder("texts").file("en_US.lang", languageFile);
  exportZip2.folder("texts").file("languages.json", JSON.stringify(["en_US"]));
  if (decoratedPotFile) {
    exportZip2.folder("entity").file("decorated_pot.json", JSON.stringify(decoratedPotFile, null, 4));
  }

  let audioFiles = fileListInFolder("auxiliaryData", false, projZip);
  let soundDefinitionFile = {
    "format_version": "1.14.0",
    "sound_definitions": {}
  };
  for (let i = 0; i < audioFiles.length; i++) {
    logExporter(audioFiles[i]);

    let audioData;
    try {
      audioData = JSON.parse(await projZip.folder("auxiliaryData").file(audioFiles[i]).async("string"));
    } catch(e) {}

    let audioFile = await projZip.folder("assets").file(audioFiles[i].replace(".json", ".wav")).async("arraybuffer");

    exportZip2.folder("sounds").file(audioData.id + ".wav", audioFile);

    soundDefinitionFile.sound_definitions[audioData.id] = {
      "category": audioData.category,
      "sounds": [`sounds/${audioData.id}`]
    };
  }

  if (audioFiles.length > 0) {
    exportZip2.folder("sounds").file("sound_definitions.json", JSON.stringify(soundDefinitionFile, null, 4));
  }

  if (!resourcePackRequired) {
    if (exportDlgModeBox.value == "1mcaddon") {
      exportDlgModeBox.value = "2mcpack";
      logExporter("This addon does not require a resource pack. Exporting as a behavior pack...", "warn");
    } else if (exportDlgModeBox.value == "1zip") {
      exportDlgModeBox.value = "2zip";
      logExporter("This addon does not require a resource pack. Exporting as a behavior pack...", "warn");
    }
  }

  if (exportDlgModeBox.value === "1mcaddon" || exportDlgModeBox.value === "1zip") {
    // One file containing both BP and RP

    const exportZipFinal = new JSZip();

    const bpFolder = exportZipFinal.folder(`${projManifest.name}_BP`);
    const rpFolder = exportZipFinal.folder(`${projManifest.name}_RP`);

    await copyZipIntoFolder(exportZip1, bpFolder);
    await copyZipIntoFolder(exportZip2, rpFolder);

    const ext = exportDlgModeBox.value === "1mcaddon" ? "mcaddon" : "zip";
    await downloadZip(exportZipFinal, `${projManifest.name}.${ext}`);

  } else if (exportDlgModeBox.value === "2mcpack" || exportDlgModeBox.value === "2zip") {
    // Two separate files (BP + RP)

    const ext = exportDlgModeBox.value === "2mcpack" ? "mcpack" : "zip";

    await downloadZip(
      exportZip1,
      `${projManifest.name}_BP.${ext}`
    );

    if (resourcePackRequired) {
      await downloadZip(
        exportZip2,
        `${projManifest.name}_RP.${ext}`
      );
    }

  }
}