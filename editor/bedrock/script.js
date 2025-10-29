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
          }
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
          }
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
            "type": "particle"
          },
          {
            "kind": "block",
            "type": "title"
          },
          {
            "kind": "block",
            "type": "playsound"
          },
          {
            "kind": "block",
            "type": "stopsound"
          }
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
  }
});

function loadProject(data) {
  Blockly.serialization.workspaces.load(data, workspace);
}
function saveProject() {
  return Blockly.serialization.workspaces.save(workspace);
}