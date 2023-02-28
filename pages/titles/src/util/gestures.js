const { GestureDescription, Finger, FingerCurl } = window.fp;

const ScrollDownGesture = new GestureDescription("scroll-down"); // ✊️
const ScrollUpGesture = new GestureDescription("scroll-up"); // 🖐
const RockGesture = new GestureDescription("rock"); // 🤘
const PeaceSignGesture = new GestureDescription("peace-sign"); // ✌

// Scroll Down
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// all other fingers: curled
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
	ScrollDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
	ScrollDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

// Scroll Up
// -----------------------------------------------------------------------------

// no finger should be curled
for (let finger of Finger.all) {
	ScrollUpGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

// Rock
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
RockGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
RockGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// all other fingers: curled
for (let finger of [Finger.Index, Finger.Pinky]) {
	RockGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

for (let finger of [Finger.Middle, Finger.Ring]) {
	RockGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
	RockGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

// Peace Sign
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
PeaceSignGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
PeaceSignGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// all other fingers: curled
for (let finger of [Finger.Index, Finger.Middle]) {
	PeaceSignGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

for (let finger of [Finger.Pinky, Finger.Ring]) {
	PeaceSignGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
	PeaceSignGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

const knownGestures = [
	ScrollDownGesture,
	ScrollUpGesture,
	RockGesture,
	PeaceSignGesture,
];

const gestureStrings = {
	"scroll-up": "🖐",
	"scroll-down": "✊️",
	"rock": "🤘",
	"peace-sign": "✌",
};

export { knownGestures, gestureStrings };
