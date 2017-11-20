var mdict = {// morse code dictionary
  "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.", "G": "--.", "H": "....", "I": "..", "J":".---",
  "K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---", "P": ".--.", "Q": "--.-", "R": ".-.", "S": "...", "T": "-",
  "U": "..-", "V": "...-", "W": ".--", "X": "-..-", "Y": "-.--", "Z": "--..", "1": ".----", "2": "..---", "3": "...--",
  "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----", " ": " "
};
var todur = {// morse code to beep length (in units) dictionary
  ".": 1, "-": 3, "_": 3, " ": 7
}
var munit = 150; // morse code beep unit length
var beep = (function () { // see http://jsfiddle.net/55Kfu/1506/  and  https://stackoverflow.com/questions/879152/how-do-i-make-javascript-beep  for further explanation
  var ctxClass = window.audioContext || window.AudioContext || window.AudioContext || window.webkitAudioContext
  var ctx = new ctxClass();
  return function (duration, type, finishedCallback) {

    duration = +duration;

    // Only 0-4 are valid types.
    type = (type % 5) || 0;

    if (typeof finishedCallback != "function") {
        finishedCallback = function () {};
    }

    var osc = ctx.createOscillator();

    osc.type = type;
    //osc.type = "sine";

    osc.connect(ctx.destination);
    if (osc.noteOn) osc.noteOn(0);
    if (osc.start) osc.start();

    setTimeout(function () {
        if (osc.noteOff) osc.noteOff(0);
        if (osc.stop) osc.stop();
        finishedCallback();
    }, duration);

  };
})();
  
$(document).ready(function() {
  $("#morse-submit").click(function() {
    var morse = morse_translate($("#morse-input").val());
    $("#morse-output").val(morse);
    morse_beep(morse, 0, function() {
      console.log("done!");
    });
  });
});

function morse_beep(str, index, callback) { // beeps out the string, returns null.
  if(index < str.length) {
    var duration = todur[str[index]];
    if(str[index] == "-" || str[index] == ".") {
      beep(munit * duration, 3, function() {
        setTimeout(morse_beep, munit, str, index + 1, callback);
      });
    } else {
      setTimeout(morse_beep, munit * duration, str, index + 1, callback);
    }
  } else {
    callback();
  }
}

function morse_translate(str) { // translates str and returns the translation
  var nstr = "";
  for(var char of str.toUpperCase()) {
    if(mdict[char]) // translate that character
      nstr += mdict[char];
      nstr += "_";
  }
  return nstr;
}

