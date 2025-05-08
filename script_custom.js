// elements for obtaining vals
const savedColors = {
  '.main': ['00D8FF', '408BFB', getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor()],
  '.second': ['00D8FF']
};
const presets = {
  1: {
    colors: ["FF0000", "FF7F00", "FFFF00", "00FF00", "0000FF", "4B0082", "9400D3"],
  }
}
const formats = {
  0: {
    outputPrefix: '',
    template: '&#$1$2$3$4$5$6$f$c',
    formatChar: '&',
    maxLength: 256
  },
  1: {
    outputPrefix: '',
    template: '<#$1$2$3$4$5$6>$f$c',
    formatChar: '&',
    maxLength: 256
  },
  2: {
    outputPrefix: '',
    template: '&x&$1&$2&$3&$4&$5&$6$f$c',
    formatChar: '&',
    maxLength: 256
  },
  3: {
    outputPrefix: '/nick ',
    template: '&#$1$2$3$4$5$6$f$c',
    formatChar: '&',
    maxLength: 256
  },
  4: {
    outputPrefix: '/nick ',
    template: '<#$1$2$3$4$5$6>$f$c',
    formatChar: '&',
    maxLength: 256
  },
  5: {
    outputPrefix: '/nick ',
    template: '&x&$1&$2&$3&$4&$5&$6$f$c',
    formatChar: '&',
    maxLength: 256
  },
  6: {
    outputPrefix: '',
    template: '§x§$1§$2§$3§$4§$5§$6$f$c',
    formatChar: '§',
    maxLength: null
  },
  7: {
    outputPrefix: '',
    template: '[COLOR=#$1$2$3$4$5$6]$c[/COLOR]',
    formatChar: null,
    maxLength: null
  },
  8: {
    outputPrefix: '',
    template: '\\u00A7x\\u00A7$1\\u00A7$2\\u00A7$3\\u00A7$4\\u00A7$5\\u00A7$6$c',
    formatChar: null,
    maxLength: null
  },
};
const translateSymbols = {
    a: "\u1d00",
    b: "\u0299",
    c: "\u1d04",
    d: "\u1d05",
    e: "\u1d07",
    f: "\u0493",
    g: "\u0262",
    h: "\u029c",
    i: "\u026a",
    j: "\u1d0a",
    k: "\u1d0b",
    l: "\u029f",
    m: "\u1d0d",
    n: "\u0274",
    o: "\u1d0f",
    p: "\u1d18",
    q: "\u01eb",
    r: "\u0280",
    s: "s",
    t: "\u1d1b",
    u: "\u1d1c",
    v: "\u1d20",
    w: "\u1d21",
    x: "x",
    y: "\u028f",
    z: "\u1d22",
    "\u0430": "\u1d00",
    "\u0432": "\u0299",
    "\u0441": "\u1d04",
    "\u0435": "\u1d07",
    "\u043d": "\u029c",
    "\u0456": "\u026a",
    "\u043a": "\u1d0b",
    "\u043e": "\u1d0f",
    "\u0440": "\u1d18",
    "\u0444": "\u0239",
    "\xe6": "\u1d01",
    "\u0153": "\u0276",
    "\xf0": "\u1d06",
    "\u0292": "\u1d23",
    "\u01dd": "\u2c7b",
    "\u0142": "\u1d0c",
    "\u0254": "\u1d10",
    "\u026f": "\ua7fa",
    "\u03b3": "\u1d26",
    "\u03bb": "\u1d27",
    "\u03c0": "\u1d28",
    "\u03c1": "\u1d18",
    "\u03c8": "\u1d2a",
    "_": "_",
    ".": ".",
    ",": ","
}

function darkMode() {
  if ($('.darkmode').is(':checked')) {
    $('body').addClass('dark');
    $('.output-format, .color-preset, .numOfColors').addClass('dark');
    $('.graylabel1, .graylabel2').removeClass('gray').addClass('darkgray');
    $('.outputText').removeClass('gray').addClass('darkgray');
    $('.error').removeClass('errortext').addClass('darkerrortext');
    $('.numOfColors, .nickname, .outputText').addClass('darktextboxes');
    $('.hexColor').each(function() {
      $(this).addClass('darktextboxes');
    });

    Cookies.set("darkmode", true, { expires: 30, path: '' });
  } else {
    $('body').removeClass('dark');
    $('.output-format, .color-preset, .numOfColors').removeClass('dark');
    $('.graylabel1, .graylabel2').removeClass('darkgray').addClass('gray');
    $('.outputText').removeClass('darkgray').addClass('gray');
    $('.error').removeClass('darkerrortext').addClass('errortext');
    $('.numOfColors, .nickname, .outputText').removeClass('darktextboxes');
    $('.hexColor').each(function() {
      $(this).removeClass('darktextboxes');
    });

    Cookies.remove("darkmode");
  }
}

/* Get a random HEX color */
function getRandomHexColor() {
     return Math.floor(Math.random()*16777215).toString(16).toUpperCase();
}


/* Copies contents to clipboard */
function copyTextToClipboard(text) {
    // Создаём фейк-объект (некоторые браузеры требуют это действие)
      var textArea = document.createElement("textarea");
      textArea.style.position = 'fixed';
      textArea.style.top = 0;
      textArea.style.left = 0;
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = 0;
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      textArea.value = text;

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      document.execCommand('copy');
      document.body.removeChild(textArea);
}


function showError(show, suffix = '', text = 'Текст превышает 256 символов и может не поместиться в поле чата.') {
  if (show) {
    $('.error' + suffix).text(text).show();
    $('.outputText' + suffix).css({
      'height': '70px',
      'margin-bottom': '5px'
    });
  } else {
    $('.error' + suffix).hide();
    $('.outputText' + suffix).css({
      'height': '95px',
      'margin-bottom': '10px'
    });
  }
}

function hex(c) {
  let s = '0123456789abcdef';
  let i = parseInt(c);
  if (i == 0 || isNaN(c))
    return '00';
  i = Math.round(Math.min(Math.max(0, i), 255));
  return s.charAt((i - i % 16) / 16) + s.charAt(i % 16);
}

/* Convert an RGB triplet to a hex string */
function convertToHex(rgb) {
  return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

/* Remove '#' in color hex string */
function trim(s) {
  return (s.charAt(0) == '#') ? s.substring(1, 7) : s
}

/* Convert a hex string to an RGB triplet */
function convertToRGB(hex) {
  let color = [];
  color[0] = parseInt((trim(hex)).substring(0, 2), 16);
  color[1] = parseInt((trim(hex)).substring(2, 4), 16);
  color[2] = parseInt((trim(hex)).substring(4, 6), 16);
  return color;
}

/**
 * JavaScript implementation of HexUtils Gradients from RoseGarden.
 * https://github.com/Rosewood-Development/RoseGarden/blob/master/src/main/java/dev/rosewood/rosegarden/utils/HexUtils.java#L358
 */
class Gradient {
  constructor(colors, numSteps) {
    this.colors = colors;
    this.gradients = [];
    this.steps = numSteps - 1;
    this.step = 0;

    const increment = this.steps / (colors.length - 1);
    for (let i = 0; i < colors.length - 1; i++)
      this.gradients.push(new TwoStopGradient(colors[i], colors[i + 1], increment * i, increment * (i + 1)));
  }

  /* Gets the next color in the gradient sequence as an array of 3 numbers: [r, g, b] */
  next() {
    if (this.steps <= 1)
      return this.colors[0];

    const adjustedStep = Math.round(Math.abs(((2 * Math.asin(Math.sin(this.step * (Math.PI / (2 * this.steps))))) / Math.PI) * this.steps));
    let color;
    if (this.gradients.length < 2) {
      color = this.gradients[0].colorAt(adjustedStep);
    } else {
      const segment = this.steps / this.gradients.length;
      const index = Math.min(Math.floor(adjustedStep / segment), this.gradients.length - 1);
      color = this.gradients[index].colorAt(adjustedStep);
    }

    this.step++;
    return color;
  }
}

class TwoStopGradient {
  constructor(startColor, endColor, lowerRange, upperRange) {
    this.startColor = startColor;
    this.endColor = endColor;
    this.lowerRange = lowerRange;
    this.upperRange = upperRange;
  }

  colorAt(step) {
    return [
      this.calculateHexPiece(step, this.startColor[0], this.endColor[0]),
      this.calculateHexPiece(step, this.startColor[1], this.endColor[1]),
      this.calculateHexPiece(step, this.startColor[2], this.endColor[2])
    ];
  }

  calculateHexPiece(step, channelStart, channelEnd) {
    const range = this.upperRange - this.lowerRange;
    const interval = (channelEnd - channelStart) / range;
    return Math.round(interval * (step - this.lowerRange) + channelStart);
  }
}

/* Toggles the number of gradient colors between 2 and 10 based on user input */
function toggleColors(colors, suffix) {
  let clamped = Math.min(10, Math.max(1, colors));
  if (colors == 1 || colors == '') {
    colors = Math.max(clamped, getColors(suffix).length);
  } else if (colors != clamped) {
    $('.numOfColors' + suffix).val(clamped);
    colors = clamped;
  }
  const container = $('.hexColors' + suffix);
  const hexColors = container.find('.hexColor');
  const number = hexColors.size();
  if (number > colors) {
    // Need to remove some colors
    hexColors.each((index, element) => {
      if (index + 1 > colors) {
        savedColors[suffix][index] = $(element).val();
        $(element).parent().remove();
      }
    });
  } else if (number < colors) {
    // Need to add some colors
    let template = $('.hexColorTemplate' + suffix).html();
    for (let i = number + 1; i <= colors; i++) {
      let html = template.replace(/\$NUM/g, i).replace(/\$VAL/g, savedColors[suffix][i - 1]);
      container.append(html);
    }
    jscolor.install(); // Refresh all jscolor elements
  }
}

/* Gets all colored entered by the user */
function getColors(suffix) {
  const hexColors = $('.hexColors' + suffix).find('.hexColor');
  const colors = [];
  hexColors.each((index, element) => {
    const value = $(element).val();
    savedColors[suffix][index] = value;
    colors[index] = convertToRGB(value);
  });
  return colors;
}

function translateAllSymbols(input) {
  let lowInput = input.toLowerCase();
  let newString = [];

  for (let i = 0, o = 0; i < lowInput.length; i++) {
    if(!(lowInput[i] in translateSymbols))
      continue;

    newString[o] = translateSymbols[lowInput[i]]
    o++;
  }

  return newString.join('');
}

function updateOutputText(event, suffix = '') {
  let titleMode = $('.titlemode' + suffix).is(':checked');
  let format = formats[$('.output-format' + suffix).val()];
  let nickName = $('.nickname' + suffix);

  if (format.outputPrefix) {
    nickName.val(nickName.val().replace(/ /g, ''));

    if (nickName.val()) {
      let letters = /^[0-9a-zA-Z_.,]+$/;
      if (!nickName.val().match(letters)) {
        nickName.val(nickName.val().replace(event.data, ''));
      }
      if (!nickName.val().match(letters)) {
        nickName.val('TidePvP');
      }
    }
  }

  let newNick = nickName.val();

  if (suffix === '.main') {
    newNick = translateAllSymbols(newNick);
    newNick = '«' + newNick + '»';
  }

  const bold = $('.bold' + suffix).is(':checked');
  const italic = $('.italics' + suffix).is(':checked');
  const underline = $('.underline' + suffix).is(':checked');
  const strike = $('.strike' + suffix).is(':checked');

  let $outputText = $('.outputText' + suffix);
  let colors = getColors(suffix);

  if (colors.length < 2)
    colors[1] = colors[0];

  let gradient = new Gradient(colors, newNick.replace(/ /g, '').length);
  let charColors = [];
  let output = format.outputPrefix;

  for (let i = 0; i < newNick.length; i++) {
    let char = newNick.charAt(i);

    if (char === ' ') {
      output += char;
      charColors.push(null);
      continue;
    }

    let hex = convertToHex(gradient.next());
    charColors.push(hex);

    let hexOutput = format.template;
    for (let n = 1; n <= 6; n++) {
      hexOutput = hexOutput.replace(`$${n}`, hex.charAt(n - 1));
    }

    let formatCodes = '';
    if (format.formatChar != null) {
      if (bold) formatCodes += format.formatChar + 'l';
      if (italic) formatCodes += format.formatChar + 'o';
      if (underline) formatCodes += format.formatChar + 'n';
      if (strike) formatCodes += format.formatChar + 'm';
    }

    hexOutput = hexOutput.replace('$f', formatCodes);
    hexOutput = hexOutput.replace('$c', suffix === '.second' ? ' ' : char);

    if (suffix !== '.second' || i === 0) {
        output += hexOutput;
    }
  }

  $outputText.text(output);

  if (titleMode) {
    if (newNick.length > 16) {
      showError(true, suffix, 'Текст превышает 16 символов и ваш титул может быть обрезан.');
    } else {
      showError(format.maxLength != null && format.maxLength < output.length);
    }
  }

  displayColoredName(newNick, charColors, suffix);
}

/**
 * padding function:
 * cba to roll my own, thanks Pointy!
 * ==================================
 * source: http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
 */
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function displayColoredName(nickName, colors, suffix = '') {
  const $coloredNick = $('.coloredNick' + suffix);

  $coloredNick.removeClass('minecraftbold minecraftibold minecraftitalic');

  if ($('.bold' + suffix).is(':checked')) {
    if ($('.italics' + suffix).is(':checked')) {
      $coloredNick.addClass('minecraftibold');
    } else {
      $coloredNick.addClass('minecraftbold');
    }
  } else if ($('.italics' + suffix).is(':checked')) {
    $coloredNick.addClass('minecraftitalic');
  }

  $coloredNick.empty();

  for (let i = 0; i < nickName.length; i++) {
    const $coloredNickSpan = $('<span></span>');

    if ($('.underline' + suffix).is(':checked')) {
      if ($('.strike' + suffix).is(':checked')) {
        $coloredNickSpan.addClass('minecraftustrike');
      } else {
        $coloredNickSpan.addClass('minecraftunderline');
      }
    } else if ($('.strike' + suffix).is(':checked')) {
      $coloredNickSpan.addClass('minecraftstrike');
    }

    $coloredNickSpan.css('color', `#${colors[i]}`);
    $coloredNickSpan.text(nickName[i]);
    $coloredNick.append($coloredNickSpan);
  }
}

function preset(n, suffix = '') {
  const colors = presets[n].colors
  const container = $('.hexColors' + suffix);
  container.empty();
    // Need to add some colors
    let template = $('.hexColorTemplate' + suffix).html();
    for (let i = 0 + 1; i <= colors.length; i++) {
      let html = template.replace(/\$NUM/g, i).replace(/\$VAL/g, colors[i - 1]);
      container.append(html);
    }
    jscolor.install(); // Refresh all jscolor elements
}

function switchTitleMode(suffix = '') {
	if($('.titlemode' + suffix).checked) {
		$('.output-format' + suffix).value = '2';
		$('.output-format' + suffix).disabled = true;
	} else {
		$('.output-format' + suffix).disabled = false;
	}
	
	updateOutputText(null, suffix);
}

toggleColors(2, '.main');
toggleColors(1, '.second');
updateOutputText(null, '.main');
updateOutputText(null, '.second');
switchTitleMode('.main');
switchTitleMode('.second');

if(Cookies.get('darkmode')) {
	$('.darkmode').attr('checked', true);
	darkMode()
}
