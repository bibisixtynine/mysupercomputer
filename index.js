// codemirror 6
import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { javascript } from "@codemirror/lang-javascript";
import { defaultHighlightStyle } from "@codemirror/highlight";
import { bracketMatching } from "@codemirror/matchbrackets";
import { oneDark } from "@codemirror/theme-one-dark";

import { codeExample } from "./codeexample.js";

//
// ui
//
import {
  beep,
  resetUI,
  Button,
  hideUI,
  showUI,
  toggleUI,
  Text,
  NewLine,
} from "./jsui.js";

//
// utils
//
import { stopSpeaking, say, log, iOS, isInstalledAsPWA } from "./zutils.js";

//
// music
//
import { pianoSampler } from "./instruments/piano.js";
import { oscillatorSampler } from "./instruments/oscillator.js";
import { synthetizerSampler } from "./instruments/synthetizer.js";

import "./style.css";

///////////////////////////////////////////////////////
//                                                  //
// dragging of the code/view slider
//
const d = document.getElementsByClassName("draggable");

function filter(e) {
  let target = e.target;

  if (!target.classList.contains("draggable")) {
    return;
  }

  target.moving = true;

  //NOTICE THIS 👇 Check if Mouse events exist on users' device
  if (e.clientX) {
    target.oldX = e.clientX; // If they exist then use Mouse input
    target.oldY = e.clientY;
  } else {
    target.oldX = e.touches[0].clientX; // Otherwise use touch input
    target.oldY = e.touches[0].clientY;
  }
  //NOTICE THIS 👆 Since there can be multiple touches, you need to mention which touch to look for, we are using the first touch only in this case

  target.oldLeft =
    window.getComputedStyle(target).getPropertyValue("left").split("px")[0] * 1;
  target.oldTop =
    window.getComputedStyle(target).getPropertyValue("top").split("px")[0] * 1;

  document.onmousemove = dr;
  //NOTICE THIS 👇
  document.ontouchmove = dr;
  //NOTICE THIS 👆

  function dr(event) {
    event.preventDefault();

    if (!target.moving) {
      return;
    }
    //NOTICE THIS 👇
    let freezeY = target.classList.contains("freezeY");
    let freezeX = target.classList.contains("freezeX");

    if (event.clientX) {
      if (!freezeX) target.distX = event.clientX - target.oldX;
      if (!freezeY) target.distY = event.clientY - target.oldY;
    } else {
      if (!freezeX) target.distX = event.touches[0].clientX - target.oldX;
      if (!freezeY) target.distY = event.touches[0].clientY - target.oldY;
    }
    //NOTICE THIS 👆

    target.style.left = target.oldLeft + target.distX + "px";
    target.style.top = target.oldTop + target.distY + "px";

    let editor = document.getElementById("editor-container");
    let view = document.getElementById("view");
    let editorParent = editor.parentNode;
    let editorParentWidth = editorParent.getBoundingClientRect().width;
    let percent = 100.0 * ((target.oldLeft + target.distX) / editorParentWidth);
    editor.style.width = percent + "vw";
    view.style.left = percent + "vw";
    view.style.width = 100.0 - percent + "vw";
  }

  function endDrag() {
    target.moving = false;
  }
  target.onmouseup = endDrag;
  //NOTICE THIS 👇
  target.ontouchend = endDrag;
  //NOTICE THIS 👆

  document.onmouseup = endDrag;
  //NOTICE THIS 👇
  document.ontouchend = endDrag;
}
document.onmousedown = filter;
//NOTICE THIS 👇
document.ontouchstart = filter;
//NOTICE THIS 👆
//
// dragging of the code/view slider
//                                                   \\
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
//                                                  //
// main
//

/*
let oscillator = new oscillatorSampler();
let piano = new pianoSampler();
let synthetizer = new synthetizerSampler();
*/

///////////////////
//
// some 'written in french' function...
//
window.piano = new pianoSampler();
window.ArreteDeParler = stopSpeaking;
window.Dit = say;
window.NouvelleLigne = NewLine;
window.Ecris = Text;
window.Bouton = Button;
window.beep = beep;
window.largeurPage = document.getElementById("view").clientWidth;
window.hauteurPage = document.getElementById("view").clientHeight;
window.addEventListener("resize", () => {
  window.largeurPage = document.getElementById("view").clientWidth;
  window.hauteurPage = document.getElementById("view").clientHeight;
});
//
// some 'written in french' function...
//
///////////////////

///////////////////
//
// utils...
//
function resetTimers() {
  let maxId = setTimeout(function () {}, 0);

  for (var i = 0; i < maxId; i += 1) {
    clearTimeout(i);
  }
}

const evaluateCode = (code) => {
  //console.clear(); ///////////////////////////////// NEW //
  resetUI();
  resetTimers();
  localStorage.setItem("mysupercomputer-code", code);
  try {
    Function(code)(window);
  } catch (err) {
    console.error(err);
  }
};
//
// utils...
//
///////////////////

/*
/////////////////////////////
//                        
// editor (code mirror 5)
//
let editor = CodeMirror(document.querySelector("#editor"), {
  lineNumbers: true,
  tabSize: 2,
  value: "console.log('hello world')",
  viewportMargin: Infinity,
  mode: "javascript",
  theme: "monokai"
});

editor.on("change", function (delta) {
  evaluateCode(editor.getValue());
});

let code = localStorage.getItem("mysupercomputer-code");

if (code) {
  editor.setValue(code);
} else {
  editor.setValue(codeExample);
}
//
// editor (codemirror 5)
//
/////////////////////////////
*/

/////////////////////////////
//
// editor (code mirror 6)
//
// Codemirror 6

let editorDiv = document.querySelector("#editor");

let initial_doc = codeExample;

const fontTheme = EditorView.theme({
  "&": {
    fontSize: "10.5pt",
  },
  ".cm-content": {
    fontFamily: "Menlo, Monaco, Lucida Console, monospace",
  },
});

let updateListenerExtension = EditorView.updateListener.of((update) => {
  if (update.docChanged) {
    evaluateCode(update.view.state.doc.toString());
  }
});

const styleHackToMakeSelectionWork = EditorView.theme(
  {
    ".cm-gutters": {
      //display: "unset",
      width: "available",
    },
  })
  

let editor = new EditorView({
  state: EditorState.create({
    doc: initial_doc,
    extensions: [
      updateListenerExtension,
      oneDark,
      fontTheme,
      basicSetup,
      javascript(),
      defaultHighlightStyle.fallback,
      bracketMatching(),
      styleHackToMakeSelectionWork
    ],
  }),
  parent: editorDiv,
});

let code = localStorage.getItem("mysupercomputer-code");

if (code) {
  editor.dispatch({
    changes: { from: 0, to: editor.state.doc.length, insert: code },
  });
} else {
  editor.dispatch({
    changes: { from: 0, to: editor.state.doc.length, insert: codeExample },
  });
}
//
// editor (codemirror 6)
//
/////////////////////////////

// ace // editor.getSession().selection.clearSelection();
//
// main
//                                                   \\
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
//                                                  //
// resize
//
if (!isInstalledAsPWA()) {
  function resize() {
    let slider = document.getElementById("screenShareSlider");
    let view = document.getElementById("view");
    slider.style.left = view.style.left;

    let frame = document.getElementById("container");
    if (window.innerWidth < window.innerHeight) {
      // portrait :
      document.body.style.height = "-webkit-fill-available";
      frame.style.height = "-webkit-fill-available";
      //frame.style.backgroundColor = "yellow";
      //document.body.style.backgroundColor = "orange";
    } else {
      // landscape :
      document.body.style.height = "100vh";
      frame.style.height = "100vh";
      //frame.style.backgroundColor = "blue";
      //document.body.style.backgroundColor = "darkBlue";
    }
  }

  window.addEventListener("resize", () => {
    resize();
  });
  resize();
} else {
  function resize() {
    let slider = document.getElementById("screenShareSlider");
    let view = document.getElementById("view");
    slider.style.left = view.style.left;
  }
  window.addEventListener("resize", () => {
    resize();
  });
  resize();
}
//
// resize
//                                                   \\
///////////////////////////////////////////////////////
