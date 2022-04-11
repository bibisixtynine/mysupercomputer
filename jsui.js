export { resetUI, Image, beep, Slider, showUI, hideUI, Text, Button, toggleUI, NewLine };

/////////////////////////////////////////////////////////////////
//                                                            //
// UI
//

//
// 1) Meta
//
function Meta(name, content) {
  let el = document.createElement('meta');
  el.name = name;
  el.content = content;
  document.head.appendChild(el);
}

let el = document.createElement('meta');
el.charset = 'utf-8';
document.head.appendChild(el);

/*
Meta(
  'viewport',
  `
    viewport-fit=cover,
    user-scalable=no,
    width=device-width,
    initial-scale=1,
    maximum-scale=1`
);


Meta('apple-mobile-web-app-status-bar-style', 'black-translucent');
Meta('apple-mobile-web-app-capable', 'yes');
*/

//
// 2) append UI divs
//   <div class="outer-container">
//      <div class="inner-container" id="ui"></div>
//   </div>
//


// NEW //////////////////////////////////////////
//
let view = document.getElementById('view')

let div = document.createElement('div');
div.classList = 'outer-container';
view.appendChild(div);
//
// NEW //////////////////////////////////////////


let subDiv = document.createElement('div');
subDiv.classList = 'inner-container';
div.appendChild(subDiv);

let ui = document.createElement('div');
ui.id = 'ui';
subDiv.appendChild(ui);



//
// 3) append UI css styles
//

let sheet = document.createElement('style');
sheet.innerHTML = `



.outer-container {
  font-family: ArialRoundedMTBold;
  font-size: 2rem;
  color: rgba(241, 231, 231, 0.808);
  background-color: rgb(31, 33, 46);

  position: absolute;
  translate: translation(-50%, -50%);
  left: 0.0px;
  top: 0.0px;

  display: table;

  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  pointer-events: none; 
  background-color: transparent;

}

#ui {
  background-color: black;
  pointer-events: none;
}

.inner-container {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  margin: 0;
  padding: 0;
}

.box {
  display: inline-block;
  margin: 5px;
  padding: 0px;
  border-radius: 8px;
  pointer-events: auto;
  background-color: transparent;
}

.img-center {

  width: 5rem;
  height: 5rem;



  border-radius: 3rem; 
  border-style: solid;
  border-color: rgba(241, 231, 231, 0.808);
  padding: 0.3rem;
  
}
`;


 document.body.appendChild(sheet);





//
// 4) UI functions
//
let currentDIV = [];
currentDIV.push(document.body);

function enableScrollModeIfOverflow(el) {
  return;
  const rect = el.getBoundingClientRect();

// NEW ///////////////////////////////////////
  const isInViewport =
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) 
      //&& rect.right <= (window.innerWidth || document.documentElement.clientWidth);
// NEW ///////////////////////////////////////

  if (!isInViewport) {
    let ui = document.getElementById('ui');
    ui.style.overflowY = 'scroll';
    ui.style.height = '100%';
  }
}

export function VStack() {
  const el = document.createElement('div');
  currentDIV.push(el);
}

function toggleUI() {
  let ui = document.getElementById('ui');
  if (ui.style.display === 'table-cell') {
    ui.style.display = 'none';
  } else {
    ui.style.display = 'table-cell';
  }
}

function hideUI() {
  let ui = document.getElementById('ui');
  ui.style.display = 'none';
}

function removeChildren(node) {
  while (node.hasChildNodes()) {
    //node.removeEventListener()
    node.removeChild(node.lastChild)
  }
}

// NEW ///////////////////////////////////
//
function resetUI() {
  let ui = document.getElementById('ui');
  removeChildren(ui)
  ui.style.overflowY = '';
  ui.style.height = '';
}
//
// NEW ///////////////////////////////////

function showUI() {
  let ui = document.getElementById('ui');
  ui.style.display = 'table-cell';
}

function NewLine() {
  let element = document.createElement('br');
  let ui = document.getElementById('ui');
  ui.appendChild(element);
  return element;
}

function Button(
  html,
  fct = function () {
    console.log('button clicked');
  }
) {
  let element = document.createElement('div');

  element.classList = 'font box';
  element.innerHTML = html;

  element.style.backgroundColor = '#000000AA';
  element.style.border = 'solid';
  element.style.borderWidth = '2px';
  element.style.borderRadius = '1em';
  //element.style.borderColor = 'white';
  //element.style.color = 'white';
  element.style.padding = '0.8rem';
  //element.style.fontSize = '42px';
  let ui = document.getElementById('ui');
  ui.appendChild(element);

  addStyleToElement(element);

  enableScrollModeIfOverflow(element);

  return element;
}

function Text(html) {
  let element = document.createElement('div');

  element.classList = 'font box';
  element.innerHTML = html;
  element.style.border = 'none';
  element.style.borderWidth = '1px';
  element.style.borderRadius = '8px';
  element.style.padding = '0px';
  let ui = document.getElementById('ui');
  ui.appendChild(element);

  addStyleToElement(element);

  enableScrollModeIfOverflow(element);
  return element;
}

function Image(src) {
  let element = document.createElement('img');
  element.className = 'img-center';
  element.src = src;
  let ui = document.getElementById('ui');
  ui.appendChild(element);
  addStyleToElement(element);

  enableScrollModeIfOverflow(element);
  return element;
}

// <input type="range" oninput="set_freq(this.value)">
function Slider(
  fct = function () {
    console.log('sliding !');
  }
) {
  let element = document.createElement('input');

  element.type = 'range';
  element.classList = 'font box';
  element.addEventListener('input', function (event) {
    fct(this.value);
  });

  let ui = document.getElementById('ui');
  ui.appendChild(element);

  addStyleToElement(element);
  enableScrollModeIfOverflow(element);
  return element;
}

function flash(el) {
  let oldBackgroundColor = el.style.backgroundColor;
  el.style.backgroundColor = 'white';
  setTimeout(() => {
    el.style.backgroundColor = oldBackgroundColor;
  }, 100);
}

function addStyleToElement(element) {
  element.color = function (color = 'white') {
    this.style.color = color;
    return this;
  };

  element.borderStyle = style => {
    this.style.borderStyle = style;
    return this;
  };

  element.borderWidth = function (width = 2) {
    if (width > 0) {
      this.style.borderStyle = 'solid';
      this.style.borderWidth = width + 'px';
    } else {
      this.style.borderStyle = 'none';
    }
    return this;
  };

  element.borderColor = function (color = 'white') {
    this.style.borderStyle = 'solid';
    this.style.borderColor = color;
    return this;
  };

  element.position = function (x, y) {
    this.style.position = 'absolute';

    this.style.top = y + 'px';
    this.style.left = x + 'px';
    return this;
  };

  element.margin = function (left = 5, top = left, right = left, bottom = top) {
    this.style.marginLeft = left + 'px';
    this.style.marginTop = top + 'px';
    this.style.marginRight = right + 'px';
    this.style.marginBottom = bottom + 'px';
    return this;
  };

  element.padding = function (
    left = 5,
    top = left,
    right = left,
    bottom = top
  ) {
    this.style.paddingLeft = left + 'px';
    this.style.paddingTop = top + 'px';
    this.style.paddingRight = right + 'px';
    this.style.paddingBottom = bottom + 'px';
    return this;
  };

  element.backgroundColor = function (color = 'blue') {
    this.style.backgroundColor = color;
    return this;
  };

  element.borderRadius = function (radius = 8) {
    this.style.borderRadius = radius + 'px';
    return this;
  };

  element.onClick = closure => {
    element.addEventListener('mousedown', event => {
      flash(event.target);
      setTimeout(closure, 1, event);
    });

    element.addEventListener('touchstart', event => {
      flash(event.target);
      event.preventDefault();
      setTimeout(closure, 1, event);
    });
    return element;
  };

  element.onHover = function (fct) {
    this.addEventListener('mouseover', fct);
    return this;
  };

  element.fontFamily = function (font) {
    this.style.fontFamily = font;
    return this;
  };

  element.fontSize = function (size) {
    this.style.fontSize = size + 'px';
    return this;
  };

  element.fontWeight = function (weight) {
    this.style.fontWeight = weight;
    return this;
  };

  element.isHidden = function (hidden) {
    if (hidden) this.style.display = 'none';
    else this.style.display = 'inline-block';
    return this;
  };
}

function beep() {
  let sound_data =
  'data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=';
  let sound = new Audio(sound_data);
  sound.play();
}
