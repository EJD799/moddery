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
    editable: false,
    //extensions: ["no_disable_menu"]
  },
  {
    type: "run_command_dimension",
    message0: "run command %1 in dimension %2",
    colour: 160,
    args0: [
      {
        type: 'input_value',
        name: 'COMMAND',
        check: 'String'
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
    colour: 160,
    args0: [
      {
        type: 'input_value',
        name: 'COMMAND',
        check: 'String'
      },
      {
        type: 'input_value',
        name: 'PLAYER',
        check: 'String'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true
  }
]);

const colourDefinitions = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    type: 'colour_picker',
    message0: 'pick colour %1',
    args0: [{ type: 'input_value', name: 'COLOUR', check: 'String' }],
    output: 'Colour',
    colour: 20,
  },
  {
    type: 'colour_random',
    message0: 'random colour',
    output: 'Colour',
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
    output: 'Colour',
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
        { kind: 'block', type: 'logic_compare' },
        { kind: 'block', type: 'logic_operation' },
        { kind: 'block', type: 'logic_negate' },
        { kind: 'block', type: 'logic_boolean' },
        { kind: 'block', type: 'logic_ternary' }
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
          values: {
            TIMES: { shadow: { type: 'math_number', fields: { NUM: 10 } } }
          }
        },
        { kind: 'block', type: 'controls_whileUntil' },
        {
          kind: 'block',
          type: 'controls_for',
          values: {
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
        { kind: 'block', type: 'math_arithmetic' },
        { kind: 'block', type: 'math_single' },
        { kind: 'block', type: 'math_trig' },
        { kind: 'block', type: 'math_constant' },
        { kind: 'block', type: 'math_number_property' },
        /*{
          kind: 'block',
          type: 'math_change',
          values: {
            DELTA: { shadow: { type: 'math_number', fields: { NUM: 1 } } }
          }
        },*/
        { kind: 'block', type: 'math_round' },
        { kind: 'block', type: 'math_on_list' },
        { kind: 'block', type: 'math_modulo' },
        {
          kind: 'block',
          type: 'math_constrain',
          values: {
            LOW: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
            HIGH: { shadow: { type: 'math_number', fields: { NUM: 100 } } }
          }
        },
        {
          kind: 'block',
          type: 'math_random_int',
          values: {
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
          values: { TEXT: { shadow: { type: 'text' } } }
        },
        { kind: 'block', type: 'text_length' },
        { kind: 'block', type: 'text_isEmpty' },
        {
          kind: 'block',
          type: 'text_indexOf',
          values: {
            VALUE: { block: { type: 'variables_get', fields: { VAR: 'text' } } },
            FIND: { shadow: { type: 'text' } }
          }
        },
        {
          kind: 'block',
          type: 'text_charAt',
          values: {
            VALUE: { block: { type: 'variables_get', fields: { VAR: 'text' } } }
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
      name: 'Colour',
      colour: '%{BKY_COLOUR_HUE}',
      contents: [
        { kind: 'block', type: 'colour_picker' },
        { kind: 'block', type: 'colour_random' },
        { kind: 'block', type: 'colour_rgb' }
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
      name: 'World',
      colour: 160,
      contents: [
        { kind: 'block', type: 'run_command_dimension', inputs: { COMMAND: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
        { kind: 'block', type: 'run_command_player', inputs: { COMMAND: { shadow: { type: 'text', fields: { TEXT: "" } } }, PLAYER: { shadow: { type: 'text', fields: { TEXT: "" } } } } }
      ]
    }
  ]
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

// ------------------------------
// Globally allow all reporter/value blocks to connect to any value input
// ------------------------------
(function() {
  // Step 1: Remove output type checks from all reporter blocks
  for (const type in Blockly.Blocks) {
    const def = Blockly.Blocks[type];
    if (def && def.output) {
      const oldInit = def.init;
      def.init = function() {
        if (oldInit) oldInit.call(this);
        if (this.outputConnection) this.outputConnection.setCheck(null);
      };
    }
  }

  // Step 2: Remove input type checks only for value inputs
  Blockly.Extensions.register('remove_value_input_checks', function() {
    this.inputList.forEach(input => {
      if (input.connection && input.connection.type === Blockly.INPUT_VALUE) {
        input.connection.setCheck(null);
      }
    });
  });

  // Step 3: Apply the extension to all blocks in the workspace
  function applyInputOverrides(workspace) {
    workspace.getAllBlocks().forEach(block => {
      if (!block._valueInputChecksRemoved) {
        Blockly.Extensions.apply('remove_value_input_checks', block, false);
        block._valueInputChecksRemoved = true;
      }
    });
  }

  // Listen for workspace changes to catch newly created blocks
  Blockly.getMainWorkspace().addChangeListener(() => {
    applyInputOverrides(Blockly.getMainWorkspace());
  });

  // Initial application for existing blocks
  applyInputOverrides(Blockly.getMainWorkspace());
})();


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