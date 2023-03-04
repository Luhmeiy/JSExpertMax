export default class Controller {
	#view;
	#camera;
	#worker;
	#bothBlinkCounter = 0;
	#leftBlinkCounter = 0;
	#rightBlinkCounter = 0;

	constructor({ view, worker, camera }) {
		this.#view = view;
		this.#camera = camera;
		this.#worker = this.#configureWorker(worker);

		this.#view.configureOnBtnClick(this.onBtnStart.bind(this));
	}

	static async initialize(deps) {
		const controller = new Controller(deps);
		controller.log(
			"Not yet detecting eye blink! Click in the button to start"
		);
		return controller.init();
	}

	#configureWorker(worker) {
		let ready = false;

		worker.onmessage = ({ data }) => {
			if ("READY" === data) {
				console.log("Worker is ready");
				this.#view.enableButton();
				ready = true;
				return;
			}

			console.log(data.blinked);

			const blinked = data.blinked.counter;

			if (data.blinked.direction === "left") {
				this.#leftBlinkCounter += blinked;
				return;
			} else if (data.blinked.direction === "right") {
				this.#rightBlinkCounter += blinked;
				return;
			}

			this.#bothBlinkCounter += blinked;
			this.#view.togglePlayVideo();
		};

		return {
			send(msg) {
				if (!ready) return;
				worker.postMessage(msg);
			},
		};
	}

	async init() {
		console.log("Init!");
	}

	loop() {
		const video = this.#camera.video;
		const img = this.#view.getVideoFrame(video);

		this.#worker.send(img);
		this.log(`Detecting eye blink...`);

		setTimeout(() => this.loop(), 100);
	}

	log(text) {
		const times = `- blinked times:\n
	-- both eyes: ${this.#bothBlinkCounter}\n
	-- left eye: ${this.#leftBlinkCounter}\n
	-- right eye: ${this.#rightBlinkCounter}`;
		this.#view.log(
			`logger: ${text}`.concat(this.#bothBlinkCounter ? times : "")
		);
	}

	onBtnStart() {
		this.log("Initializing detection...");
		this.#bothBlinkCounter = 0;
		this.#leftBlinkCounter = 0;
		this.#rightBlinkCounter = 0;
		this.loop();
	}
}
