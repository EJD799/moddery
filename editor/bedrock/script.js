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
          ['playerLeave', 'playerLeave']
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
          ['placeholder', 'placeholder']
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
    output: null,
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
      name: 'Events',
      colour: 45,
      contents: [
        { kind: 'block', type: 'before_event'},
        { kind: 'block', type: 'after_event'}
      ]
    },
    {
      kind: 'category',
      name: 'World',
      colour: 180,
      contents: [
        { kind: 'block', type: 'run_command_dimension', inputs: { COMMAND: { shadow: { type: 'text', fields: { TEXT: "" } } } } },
        { kind: 'block', type: 'run_command_player', inputs: { COMMAND: { shadow: { type: 'text', fields: { TEXT: "" } } } } }
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

let isAdjustingReporters = false; // prevent recursive loops

workspace.addChangeListener(function(event) {
  // Ignore irrelevant events or recursive triggers
  if (isAdjustingReporters) return;
  if (event.type !== Blockly.Events.BLOCK_MOVE && event.type !== Blockly.Events.BLOCK_DELETE) {
    return;
  }

  isAdjustingReporters = true;
  try {
    const allShowFormBlocks = workspace.getAllBlocks(false)
      .filter(b => b.type === 'show_form');

    for (const formBlock of allShowFormBlocks) {
      const input = formBlock.getInput('CALLBACK');
      if (!input) continue;

      const connected = input.connection.targetBlock();

      // If nothing is connected, spawn a new reporter block
      if (!connected) {
        const newReporter = workspace.newBlock('show_form_var');
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