import { useEffect, useState, type ReactNode } from "react";

type Source = { id: string; title: string; publisher: string; url: string };
type MissionImage = { id: string; src: string; alt: string; caption: string; credit: string; sourceId: string };
type Activity = { id: string; title: string; description: string; question: string; answers: string[]; correctAnswer: string; hint: string; explanation: string; successMessage: string };
type Mission = {
  id: string; name: string; agency: string; launchDate: string; summary: string;
  status: { label: string; lastVerified: string }; timeline: { id: string; date: string; title: string; description: string }[];
  facts: { id: string; title: string; text: string }[]; activities: Activity[]; images: MissionImage[]; sources: Source[];
};

const progressKey = "pale-blue-dot:completed-activities";
const sessionKey = "pale-blue-dot:session-id";
const basePath = "/missions/voyager-1";
const route = (page = "") => `${basePath}${page ? `/${page}` : ""}`;

function getSessionId() {
  let id = sessionStorage.getItem(sessionKey);
  if (!id) { id = crypto.randomUUID(); sessionStorage.setItem(sessionKey, id); }
  return id;
}

function track(type: "page_view" | "activity_started" | "activity_completed", path: string, resourceId?: string) {
  const width = window.innerWidth;
  const deviceCategory = width < 700 ? "mobile" : width < 1000 ? "tablet" : "desktop";
  void fetch("/api/v1/analytics/events", {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ type, path, resourceId, deviceCategory, sessionId: getSessionId() })
  }).catch(() => undefined);
}

function ImagePanel({ image, priority = false }: { image: MissionImage; priority?: boolean }) {
  return <figure className="nasa-image">
    <img src={image.src} alt={image.alt} loading={priority ? "eager" : "lazy"} />
    <figcaption>{image.caption} <span>Image credit: {image.credit}</span></figcaption>
  </figure>;
}

function ReadAloud({ text }: { text: string }) {
  return <button className="listen-button" onClick={() => {
    speechSynthesis.cancel();
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }}>🔊 Read this to me</button>;
}

function Header({ completed }: { completed: number }) {
  return <header className="site-header">
    <a className="brand" href="/"><span aria-hidden="true">✦</span> Pale Blue Dot</a>
    <nav aria-label="Voyager 1 sections">
      <a href={route()}>Voyager 1</a><a href={route("play")}>Play</a><a href={route("take-home")}>My card</a>
    </nav>
    <span className="star-counter" aria-label={`${completed} activities complete`}>⭐ {completed}</span>
  </header>;
}

function PageShell({ mission, children }: { mission: Mission; children: ReactNode }) {
  const completed = JSON.parse(localStorage.getItem(progressKey) ?? "[]") as string[];
  return <><Header completed={completed.length} /><main className="page kid-page">{children}<footer>Pale Blue Dot is an independent educational project. NASA and JPL image credits appear with each image.</footer></main></>;
}

function image(mission: Mission, id: string) {
  return mission.images.find((item) => item.id === id)!;
}

function HomePage({ mission }: { mission: Mission }) {
  return <main className="page home-page">
    <section className="home-hero">
      <p className="eyebrow">A LIVING ARCHIVE OF HUMANITY'S SPACE MISSIONS</p>
      <h1>Ready for a journey beyond the stars?</h1>
      <p className="lead">Meet Voyager 1, a brave robot explorer. See real space pictures, visit giant planets, and try hands-on mission games.</p>
      <a className="primary-button" href={route()}>Start Voyager's adventure 🚀</a>
    </section>
    <section className="feature-card">
      <ImagePanel image={image(mission, "spacecraft")} priority />
      <div><p className="eyebrow">FEATURED MISSION</p><h2>Voyager 1</h2><p>{mission.summary}</p><a href={route()}>Explore the mission →</a></div>
    </section>
    <section className="home-promises"><article><span>🪐</span><h2>See amazing worlds</h2><p>Explore real NASA pictures of Jupiter, Saturn, moons, rings, and deep space.</p></article><article><span>🎮</span><h2>Play and learn</h2><p>Build Voyager, send a pretend radio signal, and solve space challenges.</p></article></section>
    <footer>Pale Blue Dot is an independent educational project and is not affiliated with NASA. <a href="/privacy">Privacy</a></footer>
  </main>;
}

function VoyagerLanding({ mission }: { mission: Mission }) {
  const launch = image(mission, "launch");
  return <PageShell mission={mission}>
    <section className="voyager-hero">
      <div><p className="eyebrow">MISSION 1 · NASA'S STAR EXPLORER</p><h1>Hi! I’m Voyager 1.</h1><p className="lead">I am a robot spacecraft. I zoomed past giant planets and now travel in the space between stars.</p><ReadAloud text="Hi! I am Voyager 1. I am a robot spacecraft. I zoomed past giant planets and now travel in the space between stars." /><a className="primary-button" href={route("journey")}>Join my journey →</a></div>
      <ImagePanel image={launch} priority />
    </section>
    <section className="mission-menu"><h2>Choose an adventure</h2><div className="adventure-grid">
      <a href={route("journey")}><span>🚀</span><b>Blast off</b><small>Follow my path from Earth.</small></a>
      <a className="adventure-with-image jupiter-adventure" href={route("discoveries")}><img className="adventure-image" src={image(mission, "jupiter").src} alt="" /><b>Jupiter worlds</b><small>See clouds, storms, and fiery Io.</small></a>
      <a href={route("saturn")}><span>🪐</span><b>Saturn discoveries</b><small>Explore rings and moons.</small></a>
      <a href={route("deep-space")}><span>🌌</span><b>How far?</b><small>See where Voyager has gone.</small></a>
      <a href={route("golden-record")}><span>💛</span><b>The Golden Record</b><small>Discover Earth's message.</small></a>
      <a className="adventure-with-image" href={route("family-portrait")}><img className="adventure-image" src={image(mission, "family-portrait-photo").src} alt="" /><b>Family photo</b><small>See Voyager's family portrait and tiny Earth.</small></a>
      <a href={route("instruments")}><span>🧰</span><b>Voyager's tools</b><small>Meet the parts that help Voyager explore.</small></a>
      <a href={route("play")}><span>🎮</span><b>Play games</b><small>Earn stars as you learn.</small></a>
    </div></section>
    <section className="fact-strip"><b>Did you know?</b> Voyager 1 launched from Earth in 1977 and carries a Golden Record with sounds and pictures from our planet.</section>
  </PageShell>;
}

function JourneyPage({ mission }: { mission: Mission }) {
  const launch = image(mission, "launch");
  const [countdown, setCountdown] = useState<5 | 4 | 3 | 2 | 1 | 0 | null>(null);
  const launchDate = new Date(`${mission.launchDate}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const playLaunchSound = (kind: "countdown" | "liftoff") => {
    const legacyWindow = window as Window & { webkitAudioContext?: typeof AudioContext };
    const AudioContextClass = window.AudioContext ?? legacyWindow.webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    if (kind === "liftoff") {
      const duration = 5;
      const noise = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();
      const buffer = context.createBuffer(1, context.sampleRate * duration, context.sampleRate);
      const data = buffer.getChannelData(0);
      for (let index = 0; index < data.length; index += 1) data[index] = Math.random() * 2 - 1;
      noise.buffer = buffer;
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(420, context.currentTime);
      filter.frequency.exponentialRampToValueAtTime(95, context.currentTime + duration);
      gain.gain.setValueAtTime(.001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(.24, context.currentTime + .08);
      gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + duration);
      noise.connect(filter).connect(gain).connect(context.destination);
      noise.start();
      noise.stop(context.currentTime + duration);
      noise.addEventListener("ended", () => void context.close());
      return;
    }
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const duration = .16;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(720, context.currentTime);
    gain.gain.setValueAtTime(.001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(.11, context.currentTime + .03);
    gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + duration);
    oscillator.addEventListener("ended", () => void context.close());
  };
  const speakCountdown = (words: string, onStart: () => void, onEnd?: () => void) => {
    const announcement = new SpeechSynthesisUtterance(words);
    announcement.volume = 1;
    announcement.rate = .85;
    announcement.pitch = 1.25;
    announcement.addEventListener("start", onStart);
    if (onEnd) announcement.addEventListener("end", () => window.setTimeout(onEnd, 250));
    speechSynthesis.speak(announcement);
  };
  const beginCountdown = () => {
    speechSynthesis.cancel();
    const numbers: (5 | 4 | 3 | 2 | 1)[] = [5, 4, 3, 2, 1];
    const announceNumber = (index: number) => {
      if (index === numbers.length) {
        speakCountdown("Blast off!", () => { setCountdown(0); playLaunchSound("liftoff"); });
        return;
      }
      const number = numbers[index];
      speakCountdown(`${number}!`, () => { setCountdown(number); playLaunchSound("countdown"); }, () => announceNumber(index + 1));
    };
    announceNumber(0);
  };
  return <PageShell mission={mission}>
    <section className="story-heading"><p className="eyebrow">CHAPTER 1 · BLAST OFF</p><h1>Countdown to Voyager's launch!</h1><p>On <b>{launchDate}</b>, Voyager 1 lifted off from Earth to begin its adventure.</p><ReadAloud text={`Voyager 1 launched on ${launchDate}. Count down with the rocket: five, four, three, two, one, blast off!`} /></section>
    <section className={`launch-simulation ${countdown === 0 ? "lifted-off" : ""}`}><ImagePanel image={launch} /><span className="launch-rocket" aria-hidden="true"><img src={launch.src} alt="" /><i /></span><div className="countdown-panel" aria-live="assertive">{countdown === null && <><p className="eyebrow">READY AT THE LAUNCH PAD</p><h2>Press the button to start the countdown.</h2><button className="primary-button" onClick={beginCountdown}>Start countdown 🚀</button></>}{countdown !== null && countdown > 0 && <><p className="eyebrow">GET READY!</p><strong>{countdown}</strong><p>Voyager is about to lift off!</p></>}{countdown === 0 && <><p className="eyebrow">SEPTEMBER 5, 1977</p><strong>BLAST OFF!</strong><p>Voyager 1 is on its way to explore the giant planets.</p><button className="hint-button" onClick={beginCountdown}>Watch the launch again</button></>}</div></section>
    <a className="next-button" href={route("discoveries")}>Next: Jupiter worlds 🪐</a>
  </PageShell>;
}

function DiscoveriesPage({ mission }: { mission: Mission }) {
  const jupiter = image(mission, "jupiter");
  const clouds = image(mission, "jupiter-clouds");
  const io = image(mission, "io");
  return <PageShell mission={mission}>
    <section className="story-heading"><p className="eyebrow">CHAPTER 2</p><h1>Voyager finds wonderful worlds</h1><p>Voyager 1 visited Jupiter and Saturn. It gave scientists new looks at their moons and rings.</p></section>
    <div className="image-story"><ImagePanel image={jupiter} /><article><span aria-hidden="true">🪐</span><h2>Hello, Jupiter!</h2><p>Jupiter is the largest planet in our solar system. Voyager 1 took pictures of its swirling clouds and its moon family.</p></article></div>
    <div className="image-story reverse"><ImagePanel image={clouds} /><article><span aria-hidden="true">🌀</span><h2>Clouds and giant storms</h2><p>Jupiter is covered by colorful cloud bands. The Great Red Spot is a huge storm that Voyager 1 photographed.</p></article></div>
    <div className="image-story reverse"><ImagePanel image={io} /><article><span aria-hidden="true">🌋</span><h2>Wow, volcanoes!</h2><p>Voyager 1 spotted volcanoes erupting on Io, one of Jupiter's moons. That was a big surprise!</p></article></div>
    <a className="next-button" href={route("saturn")}>Next: Saturn's rings 🪐</a>
  </PageShell>;
}

function SaturnPage({ mission }: { mission: Mission }) {
  return <PageShell mission={mission}>
    <section className="story-heading"><p className="eyebrow">CHAPTER 3</p><h1>Saturn's sparkling rings</h1><p>In 1980, Voyager 1 flew by Saturn. It sent home pictures of the planet, its rings, and moons including Titan.</p><ReadAloud text="Voyager 1 explored Saturn in 1980. It sent back pictures of Saturn's rings and moons." /></section>
    <div className="image-story"><ImagePanel image={image(mission, "saturn")} /><article><span aria-hidden="true">🪐</span><h2>Moon family</h2><p>Voyager 1 photographed Saturn with moons nearby. Its flyby helped scientists learn more about Saturn's busy neighborhood.</p></article></div>
    <div className="image-story reverse"><ImagePanel image={image(mission, "saturn-rings")} /><article><span aria-hidden="true">💫</span><h2>Not one solid hoop</h2><p>Saturn's rings have many thin parts and gaps. Voyager 1's pictures helped people see more ring detail.</p></article></div>
    <section className="record-guide"><p className="eyebrow">LOOKING CLOSER</p><h2>What did Voyager learn at Saturn?</h2><div><article><ImagePanel image={image(mission, "saturn")} /><b>1</b><h3>A close look at Titan</h3><p>Voyager 1 changed its path to fly close to Titan, Saturn's largest moon. Titan's thick, orange haze hid its surface from Voyager's camera.</p></article><article><ImagePanel image={image(mission, "saturn-rings")} /><b>2</b><h3>Rings made of countless pieces</h3><p>The rings are not solid. Voyager's pictures showed many narrow ringlets, dark gaps, and tiny particles orbiting Saturn.</p></article><article><ImagePanel image={image(mission, "saturn")} /><b>3</b><h3>Busy moons near the rings</h3><p>Small moons and ring material share Saturn's neighborhood. Their gravity helps shape the ring patterns.</p></article><article><ImagePanel image={image(mission, "distance-map")} /><b>4</b><h3>A path away from the planets</h3><p>The Titan flyby bent Voyager 1's path upward and away from the plane of the planets. After Saturn, it continued toward interstellar space.</p></article></div></section>
    <a className="next-button" href={route("deep-space")}>Next: How far has Voyager gone? 🌌</a>
  </PageShell>;
}

function DeepSpacePage({ mission }: { mission: Mission }) {
  const [step, setStep] = useState(1);
  const stops = ["Earth", "Jupiter", "Saturn", "Interstellar space"];
  return <PageShell mission={mission}>
    <section className="story-heading"><p className="eyebrow">CHAPTER 4</p><h1>Beyond the Sun's big bubble</h1><p>Voyager 1 passed Jupiter and Saturn, then traveled beyond the Sun's protective bubble into interstellar space—the space between stars.</p></section>
    <ImagePanel image={image(mission, "distance-map")} />
    <section className="distance-lab"><p className="eyebrow">DISTANCE EXPLORER</p><h2>Follow Voyager farther and farther</h2><p>Tap the next stop. This is a picture of a huge journey, not a map with exact distances. Voyager keeps moving, so its distance changes every day.</p><div className="distance-track">{stops.map((stop, index) => <button key={stop} className={index < step ? "reached" : ""} onClick={() => setStep(Math.max(step, index + 1))}><span>{index < step ? "✓" : index + 1}</span>{stop}</button>)}</div><p className="success">{step === 4 ? "Voyager is now in interstellar space—far beyond the giant planets!" : "Keep tapping to travel farther."}</p></section>
    <section className="light-time"><p className="eyebrow">LIGHT-TRAVEL TIMER</p><h2>Even light needs about a day to reach Voyager</h2><div><article><span>☀️</span><b>Earth sends a radio wave</b><small>Radio waves travel at the speed of light.</small></article><i aria-hidden="true">→ → →</i><article><strong>about<br />24 hours</strong><small>One way from Earth to Voyager in late 2026.</small></article><i aria-hidden="true">→ → →</i><article><span>🛰️</span><b>Voyager receives it</b><small>A reply needs about another day to return.</small></article></div><p>That makes a simple question-and-answer trip about <b>48 hours</b>. It is like waiting two sleeps for a message to travel there and back.</p></section>
    <a className="next-button" href={route("instruments")}>Next: Meet Voyager's instruments 🧰</a>
  </PageShell>;
}

function InstrumentsPage({ mission }: { mission: Mission }) {
  const instruments = [
    ["📡", "High-gain antenna", "The big dish sends radio messages to Earth and receives instructions from home."],
    ["📷", "Cameras", "Voyager's cameras took the famous pictures of Jupiter, Saturn, and tiny Earth. They were turned off after the 1990 Family Portrait to save power."],
    ["⚡", "Power source", "Radioisotope power sources make electricity from heat, so Voyager can work far beyond sunlight."],
    ["🧲", "Magnetometer boom", "A long boom holds a magnetic-field tool away from the spacecraft, where it can listen for invisible magnetic changes in space."],
    ["✨", "Particle and cosmic-ray tools", "These instruments count tiny energetic particles moving through space."],
    ["📻", "Plasma-wave receiver", "This tool listens for waves in the thin, electrically charged gas between the stars."]
  ];
  return <PageShell mission={mission}>
    <section className="story-heading"><p className="eyebrow">SPACECRAFT TOOL KIT</p><h1>Meet Voyager's clever instruments</h1><p>Voyager is like a flying science lab. Different parts take pictures, make power, talk to Earth, and measure the invisible space around it.</p></section>
    <div className="instrument-gallery"><ImagePanel image={image(mission, "instruments")} /><ImagePanel image={image(mission, "particle-instrument")} /></div>
    <section className="instrument-cards">{instruments.map(([icon, title, text]) => <article key={title}><span aria-hidden="true">{icon}</span><h2>{title}</h2><p>{text}</p></article>)}</section>
    <a className="next-button" href={route("golden-record")}>Next: The Golden Record 💛</a>
  </PageShell>;
}

function FlightSimulatorPage({ mission }: { mission: Mission }) {
  const stages = [
    { year: "1977", title: "Voyager launches from Earth", text: "Voyager 1 begins its enormous journey. Its cameras and science tools are ready to explore.", imageId: "launch", instrument: "Cameras and science tools: ON" },
    { year: "1979", title: "Flyby of Jupiter", text: "Voyager races past giant Jupiter, sending back pictures of swirling clouds and helping reveal volcanoes on Io.", imageId: "jupiter", instrument: "Cameras: ON" },
    { year: "1980", title: "Flyby of Saturn", text: "Voyager flies past Saturn, taking pictures of rings and moons before its path carries it away from the planets.", imageId: "saturn", instrument: "Cameras: ON" },
    { year: "1990", title: "The camera turns back toward Earth", text: "Far beyond Saturn, mission planners ask Voyager to turn its camera toward home for one last Solar System family portrait.", imageId: "family-portrait", instrument: "Camera turning toward Earth" },
    { year: "1990", title: "Earth becomes the Pale Blue Dot", text: "Voyager takes the famous picture. Earth is a tiny speck in a sunbeam because Voyager is so far away.", imageId: "pale-blue-dot", instrument: "Last family-portrait pictures taken" },
    { year: "1990 and beyond", title: "Cameras rest; Voyager travels between stars", text: "The cameras are switched off to save power. Other instruments keep listening and measuring as Voyager travels into interstellar space.", imageId: "interstellar", instrument: "Cameras: OFF · Other science tools: ON" }
  ];
  const [stage, setStage] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    if (stage === stages.length - 1) { setRunning(false); return; }
    const timer = window.setTimeout(() => setStage((current) => current + 1), 4200);
    return () => window.clearTimeout(timer);
  }, [running, stage, stages.length]);
  const startFlight = () => { setStage(0); setRunning(true); };
  const current = stages[stage];
  return <PageShell mission={mission}>
    <section className="story-heading"><p className="eyebrow">FLIGHT SIMULATOR</p><h1>Fly with Voyager to the space between stars</h1><p>Press start and watch Voyager launch, fly past Jupiter and Saturn, turn its camera back toward tiny Earth, then continue into interstellar space.</p></section>
    <section className="flight-simulator"><div className={`flight-space step-${stage} ${running ? "flying" : ""}`}><div className="solar-system" aria-hidden="true"><span className="flight-sun">Sun</span><span className="flight-earth">Earth</span><span className="flight-jupiter">Jupiter</span><span className="flight-saturn">Saturn</span></div><svg className="flight-path" viewBox="0 0 600 260" preserveAspectRatio="none" aria-hidden="true"><path d="M30 218 C100 105 164 250 258 151 S414 241 554 52" /></svg><span className="flight-stars" aria-hidden="true">✦ ✧ ✦</span><img className="flight-voyager" src={image(mission, "flight-spacecraft").src} alt="NASA artist concept of Voyager animated along its journey" />{stage >= 3 && <span className={`camera-beam ${stage === 4 ? "portrait" : ""}`} aria-hidden="true" />}{stage === 5 && <span className="camera-off" aria-label="Voyager's cameras are off">Camera off</span>}<span className="flight-scale" aria-live="polite">Map view: Earth and the Sun stay visible while Voyager flies farther away.</span></div><div className="flight-controls"><button className="primary-button" onClick={startFlight}>{running ? "Restart flight" : stage === stages.length - 1 ? "Fly again" : "Start the flight"}</button><button className="hint-button" onClick={() => setRunning((value) => !value)} disabled={stage === stages.length - 1}>{running ? "Pause flight" : "Continue flight"}</button></div><ol className="flight-stages">{stages.map((item, index) => <li className={index === stage ? "active" : index < stage ? "visited" : ""} key={item.title}><button onClick={() => { setRunning(false); setStage(index); }}><b>{item.year}</b><span>{item.title}</span></button></li>)}</ol><article className="flight-detail"><p className="eyebrow">{current.year} · MISSION MOMENT</p><h2>{current.title}</h2><p>{current.text}</p><p className={stage === 5 ? "success" : "flight-instrument"}>{current.instrument}</p></article></section>
    <a className="next-button" href={route("deep-space")}>Explore deep space 🌌</a>
  </PageShell>;
}

function PredictionPage({ mission, kind }: { mission: Mission; kind: "portrait" | "talk" }) {
  const [guess, setGuess] = useState("");
  const portrait = kind === "portrait";
  const choices = portrait ? ["Earth will look big and blue", "Earth may look like a tiny dot", "Earth will not be in the picture"] : ["It uses a big dish antenna and radio waves", "It shouts very loudly", "It sends letters through space"];
  const right = portrait ? "Earth may look like a tiny dot" : "It uses a big dish antenna and radio waves";
  const title = portrait ? "What do you think Earth will look like?" : "How do you think Voyager talks to Earth?";
  const explanation = portrait ? "You predicted it! From very far away, Earth looked like a tiny speck of light. In 1990 Voyager 1 took this family portrait before its cameras were turned off." : "You predicted it! Voyager uses its large dish antenna to send radio waves. The signals travel for many hours because Voyager is so far away.";
  return <PageShell mission={mission}>
    <section className="story-heading"><p className="eyebrow">LOOK CLOSELY · MAKE A PREDICTION</p><h1>{title}</h1><p>Look at the NASA picture, make your best guess, then reveal the space answer.</p></section>
    <ImagePanel image={portrait ? image(mission, "family-portrait") : image(mission, "spacecraft")} />
    <section className="mini-game"><p className="eyebrow">WHAT DO YOU THINK?</p><h2>{portrait ? "From this far away, how might Earth appear?" : "How can a spacecraft send a message without being near us?"}</h2><div className="choice-row">{choices.map((choice) => <button key={choice} className={guess === choice ? (choice === right ? "correct" : "not-correct") : ""} onClick={() => setGuess(choice)}>{choice}</button>)}</div>{guess && <p className={guess === right ? "success" : "retry"}>{guess === right ? explanation : "That is a thoughtful guess. Try another answer or keep exploring the clues in the picture."}</p>}</section>
    {portrait && guess === right && <><section className="family-photo-viewer"><p className="eyebrow">VOYAGER 1 FAMILY PHOTO</p><ImagePanel image={image(mission, "pale-blue-dot")} /><h2>The Pale Blue Dot</h2><p>Earth is the tiny pale-blue speck in this sunbeam—our small home seen from Voyager.</p></section><p className="fact-strip"><b>Reveal:</b> The little bright blue speck in the sunbeam is Earth—the famous Pale Blue Dot.</p></>}
    <a className="next-button" href={portrait ? route("communicate") : route("play")}>{portrait ? "Next: How does Voyager communicate? 📡" : "Try the signal lab 📡"}</a>
  </PageShell>;
}

function GoldenRecordPage({ mission }: { mission: Mission }) {
  return <PageShell mission={mission}>
    <section className="golden-hero"><ImagePanel image={image(mission, "golden-record")} /><div><p className="eyebrow">CHAPTER 5</p><h1>A golden hello from Earth</h1><p className="lead">Voyager carries a Golden Record. It has sounds, music, pictures, and greetings that share a little about our home.</p><ReadAloud text="Voyager carries a Golden Record. It has sounds, music, pictures, and greetings from Earth." /></div></section>
    <section className="record-guide"><p className="eyebrow">READING THE COVER</p><h2>The cover uses pictures, not words</h2><p>The people who made the record did not know which language a future finder might understand. So they put clues on the cover using science and picture symbols.</p><div><article><b>1</b><h3>The atom clue</h3><p>The little atom picture gives a science “clock” for measuring time.</p></article><article><b>2</b><h3>The record and needle</h3><p>The circle and needle show how the record can be played.</p></article><article><b>3</b><h3>The star map</h3><p>The lines point from our Sun toward special stars, helping show where Earth is.</p></article><article><b>4</b><h3>The solar-system trip</h3><p>The small planets and arrow show that the spacecraft started at Earth and flew outward.</p></article></div></section>
    <section className="record-facts"><article><b>115</b><span>images of life and Earth</span></article><article><b>55</b><span>spoken greetings in languages</span></article><article><b>90</b><span>minutes of music</span></article><article><b>1</b><span>needle and protective jacket</span></article></section>
    <section className="record-examples"><article><ImagePanel image={image(mission, "golden-cover-explanation")} /><p className="eyebrow">COVER DIAGRAM</p><h2>How can the cover be read?</h2><p>The diagram explains the record, needle, picture signals, Sun-and-star map, and hydrogen atom science clue. It is a picture instruction manual for a possible finder.</p></article><article><ImagePanel image={image(mission, "golden-record-image-collage")} /><p className="eyebrow">PICTURES</p><h2>What did the 115 images show?</h2><p>They include people, families, animals, plants, food, buildings, science, our bodies, and views of Earth. The images are stored on the record in a special coded form.</p></article><article><p className="eyebrow">GREETINGS</p><h2>Who said hello?</h2><p>People recorded short greetings in 55 languages. The English greeting says, “Hello from the children of planet Earth.” Other greetings include “Peace” and wishes for health and happiness.</p></article><article><p className="eyebrow">SOUNDS</p><h2>What does Earth sound like?</h2><p>The record includes surf, wind, thunder, birds, whales, a heartbeat, and other sounds from people and nature.</p></article><article><p className="eyebrow">MUSIC</p><h2>What music traveled with Voyager?</h2><p>The 90-minute music collection includes Bach, Mozart, Mexican mariachi, Japanese shakuhachi, Peruvian panpipes, Senegalese percussion, Georgian singing, and Chuck Berry’s “Johnny B. Goode.”</p></article></section>
    <a className="next-button" href={route("family-portrait")}>Next: Predict the family photo 🔎</a>
  </PageShell>;
}

type QuizQuestion = { level: "easy" | "medium" | "hard"; category: string; question: string; answer: string; options: string[]; explanation: string };
const quizBank: QuizQuestion[] = [
  { level: "easy", category: "Launch", question: "What kind of explorer is Voyager 1?", answer: "A robot spacecraft", options: ["A robot spacecraft", "A new planet", "A person in a rocket"], explanation: "Voyager 1 is a robotic spacecraft." },
  { level: "easy", category: "Launch", question: "What year did Voyager 1 launch?", answer: "1977", options: ["1977", "1877", "2077"], explanation: "Voyager 1 began its journey in 1977." },
  { level: "easy", category: "Jupiter", question: "Which giant planet did Voyager 1 visit first?", answer: "Jupiter", options: ["Jupiter", "Earth", "Mars"], explanation: "Voyager 1 explored Jupiter in 1979." },
  { level: "easy", category: "Jupiter", question: "Which moon has volcanoes Voyager 1 helped reveal?", answer: "Io", options: ["Io", "Titan", "Earth's Moon"], explanation: "Io is a moon of Jupiter with active volcanoes." },
  { level: "easy", category: "Saturn", question: "What shines around Saturn?", answer: "Rings", options: ["Rings", "A zipper", "A bridge"], explanation: "Saturn has a beautiful ring system." },
  { level: "easy", category: "Golden Record", question: "What color is Voyager's message record?", answer: "Gold", options: ["Gold", "Green", "Purple"], explanation: "Voyager carries a Golden Record." },
  { level: "easy", category: "Deep space", question: "Where is Voyager 1 now exploring?", answer: "Interstellar space", options: ["Interstellar space", "Inside Jupiter", "On the Moon"], explanation: "Voyager 1 entered interstellar space in 2012." },
  { level: "easy", category: "Communication", question: "What part helps Voyager talk to Earth?", answer: "A dish antenna", options: ["A dish antenna", "A window", "A wheel"], explanation: "Its large dish antenna sends and receives radio signals." },
  { level: "medium", category: "Jupiter", question: "What is the Great Red Spot?", answer: "A huge storm on Jupiter", options: ["A huge storm on Jupiter", "A red moon", "Voyager's engine"], explanation: "The Great Red Spot is a giant storm in Jupiter's clouds." },
  { level: "medium", category: "Saturn", question: "Which Saturn moon did Voyager 1 study closely?", answer: "Titan", options: ["Titan", "Io", "Europa"], explanation: "Voyager 1's path took it near Saturn's moon Titan." },
  { level: "medium", category: "Golden Record", question: "How many languages greet possible listeners?", answer: "55", options: ["55", "5", "500"], explanation: "The Golden Record has greetings in 55 languages." },
  { level: "medium", category: "Golden Record", question: "How many images are encoded on the record?", answer: "115", options: ["115", "11", "1,150"], explanation: "The record carries 115 images about Earth and life." },
  { level: "medium", category: "Golden Record", question: "Which natural sound is on the record?", answer: "Whale songs", options: ["Whale songs", "Video game sounds", "Car alarms"], explanation: "Earth sounds include whales, wind, thunder, and birds." },
  { level: "medium", category: "Communication", question: "What kind of waves carry Voyager's messages?", answer: "Radio waves", options: ["Radio waves", "Ocean waves", "Sound waves"], explanation: "Voyager and Earth use radio waves to communicate." },
  { level: "medium", category: "Family Portrait", question: "What is the Pale Blue Dot?", answer: "Earth seen from far away", options: ["Earth seen from far away", "A moon of Saturn", "A spaceship button"], explanation: "Voyager 1 photographed Earth as a tiny pale-blue speck." },
  { level: "medium", category: "Deep space", question: "What did NASA determine in 2012?", answer: "Voyager 1 entered interstellar space", options: ["Voyager 1 entered interstellar space", "Voyager landed on Mars", "Voyager came home"], explanation: "NASA determined Voyager 1 crossed into interstellar space in 2012." },
  { level: "hard", category: "Golden Record", question: "About how long is the record's music collection?", answer: "90 minutes", options: ["90 minutes", "9 minutes", "9 hours"], explanation: "The record includes about 90 minutes of music from many cultures." },
  { level: "hard", category: "Golden Record", question: "What helps a finder play the Golden Record?", answer: "A cartridge and a needle", options: ["A cartridge and a needle", "A phone app", "Headphones"], explanation: "The record travels with a cartridge and needle." },
  { level: "hard", category: "Golden Record", question: "Why are there symbols on the record cover?", answer: "To explain it without using one language", options: ["To explain it without using one language", "To decorate the cover", "To hide a game"], explanation: "Science-and-picture symbols can help a possible finder understand it." },
  { level: "hard", category: "Family Portrait", question: "When did Voyager 1 take the Pale Blue Dot image?", answer: "1990", options: ["1990", "1977", "2012"], explanation: "Voyager 1 took the family-portrait images in 1990." },
  { level: "hard", category: "Communication", question: "About how long can a Voyager round-trip message take?", answer: "About 48 hours", options: ["About 48 hours", "About 48 seconds", "About 48 minutes"], explanation: "The learning simulation uses about 24 hours each way." },
  { level: "hard", category: "Jupiter", question: "What did Voyager 1's Jupiter images show besides the planet?", answer: "Its moon family", options: ["Its moon family", "A city", "A new Sun"], explanation: "Voyager studied Jupiter and many of its moons." },
  { level: "hard", category: "Saturn", question: "What did Voyager 1 help people see in Saturn's rings?", answer: "Thin parts and gaps", options: ["Thin parts and gaps", "A road", "A forest"], explanation: "Its images revealed more detail in Saturn's ring system." },
  { level: "hard", category: "Voyager parts", question: "Why are some science tools on a boom?", answer: "To hold them away from the spacecraft", options: ["To hold them away from the spacecraft", "To make it fly faster", "To carry snacks"], explanation: "A boom holds some instruments away from the spacecraft." },
  { level: "easy", category: "Jupiter", question: "What color is Jupiter's famous big storm?", answer: "Red", options: ["Red", "Green", "Purple"], explanation: "It is called the Great Red Spot." },
  { level: "easy", category: "Saturn", question: "Which planet is known for its rings?", answer: "Saturn", options: ["Saturn", "Mercury", "Earth"], explanation: "Saturn has bright rings made of many small pieces." },
  { level: "easy", category: "Golden Record", question: "Does the Golden Record carry sounds from Earth?", answer: "Yes", options: ["Yes", "No", "Only silence"], explanation: "It carries sounds from people and nature." },
  { level: "easy", category: "Communication", question: "Do radio messages reach Voyager right away?", answer: "No, they take many hours", options: ["No, they take many hours", "Yes, instantly", "Only at night"], explanation: "Voyager is very far away, so signals take many hours." },
  { level: "easy", category: "Voyager parts", question: "What does a camera help Voyager do?", answer: "Take pictures", options: ["Take pictures", "Cook food", "Grow plants"], explanation: "Voyager's cameras took pictures of planets and moons." },
  { level: "easy", category: "Deep space", question: "Is interstellar space the space between stars?", answer: "Yes", options: ["Yes", "No", "Only space near Earth"], explanation: "Interstellar space is the space between stars." },
  { level: "easy", category: "Golden Record", question: "Which animal can be heard on the Golden Record?", answer: "Whale", options: ["Whale", "Dragon", "Dinosaur"], explanation: "Whale sounds are among the Earth sounds." },
  { level: "easy", category: "Family Portrait", question: "In the Pale Blue Dot picture, Earth looks…", answer: "Tiny", options: ["Tiny", "Bigger than the Sun", "As close as the Moon"], explanation: "From Voyager's distance, Earth is only a tiny speck." },
  { level: "easy", category: "Launch", question: "Did Voyager 1 visit giant planets before interstellar space?", answer: "Yes", options: ["Yes", "No", "It never left Earth"], explanation: "It flew past Jupiter and Saturn first." },
  { level: "medium", category: "Golden Record", question: "Why does the Golden Record have picture symbols on its cover?", answer: "To give instructions without words", options: ["To give instructions without words", "To show a cartoon", "To list a phone number"], explanation: "The symbols show how the record may be played and where it came from." },
  { level: "medium", category: "Golden Record", question: "Which of these is included in the record's music?", answer: "Music from many cultures", options: ["Music from many cultures", "Only one lullaby", "Only animal noises"], explanation: "The record has music from different places and times." },
  { level: "medium", category: "Jupiter", question: "What are Jupiter's colorful bands made of?", answer: "Clouds", options: ["Clouds", "Grass", "Ocean waves"], explanation: "Jupiter's bands are giant swirling cloud layers." },
  { level: "medium", category: "Saturn", question: "What are Saturn's rings made of?", answer: "Many small pieces", options: ["Many small pieces", "One solid hoop", "Clouds of smoke"], explanation: "The rings contain countless small pieces of ice and rock." },
  { level: "medium", category: "Voyager parts", question: "What gives Voyager electricity far from the Sun?", answer: "A power source", options: ["A power source", "A windmill", "A garden"], explanation: "Voyager carries a long-lasting power source." },
  { level: "medium", category: "Communication", question: "Why do scientists use radio waves for Voyager?", answer: "They can travel through space", options: ["They can travel through space", "They need air to travel", "They only work underwater"], explanation: "Radio waves can travel through the empty space between Earth and Voyager." },
  { level: "medium", category: "Family Portrait", question: "What did Voyager make before its cameras were turned off?", answer: "A family portrait of the solar system", options: ["A family portrait of the solar system", "A movie of Earth", "A map of a city"], explanation: "Voyager took images for a solar-system family portrait in 1990." },
  { level: "medium", category: "Deep space", question: "What is the Sun's protective bubble called in simple words?", answer: "The Sun's bubble", options: ["The Sun's bubble", "A cloud castle", "Saturn's ring"], explanation: "Voyager traveled beyond the Sun's protective bubble into interstellar space." },
  { level: "medium", category: "Launch", question: "Why did NASA send Voyager 1?", answer: "To explore giant planets and moons", options: ["To explore giant planets and moons", "To deliver mail", "To land on Earth"], explanation: "Its first mission was to explore Jupiter, Saturn, and their moons." },
  { level: "hard", category: "Golden Record", question: "How are the record's 115 pictures stored?", answer: "As coded signals", options: ["As coded signals", "Painted on the cover", "Inside a book"], explanation: "The images are encoded in analog form on the record." },
  { level: "hard", category: "Golden Record", question: "What science clue gives a time unit on the cover?", answer: "A hydrogen atom diagram", options: ["A hydrogen atom diagram", "A flower drawing", "A weather map"], explanation: "The cover uses a hydrogen transition as a science reference." },
  { level: "hard", category: "Family Portrait", question: "Why did Voyager's cameras stop after the family portrait?", answer: "To conserve resources", options: ["To conserve resources", "Because cameras cannot work in space", "Because Jupiter took them"], explanation: "The cameras were turned off to save resources for the long mission." },
  { level: "hard", category: "Communication", question: "What is a round trip in the signal lab?", answer: "Earth to Voyager and back", options: ["Earth to Voyager and back", "Earth to the Moon only", "Voyager circling Saturn"], explanation: "A round trip includes the outbound message and Voyager's reply." },
  { level: "hard", category: "Saturn", question: "What did Saturn's Titan affect about Voyager 1's path?", answer: "Its flyby path went near Titan", options: ["Its flyby path went near Titan", "It made Voyager stop forever", "It sent Voyager back to Earth"], explanation: "Voyager 1's Saturn encounter included a close look at Titan." },
  { level: "hard", category: "Jupiter", question: "Why was finding Io's volcanoes surprising?", answer: "Active volcanoes had not been seen there before", options: ["Active volcanoes had not been seen there before", "Io was thought to be a star", "Jupiter has no moons"], explanation: "Voyager's images revealed active volcanoes on Io." },
  { level: "hard", category: "Voyager parts", question: "What does the science boom help do?", answer: "Keeps some instruments away from the spacecraft", options: ["Keeps some instruments away from the spacecraft", "Holds the launch rocket", "Plays the Golden Record"], explanation: "The boom holds some instruments away from the rest of Voyager." }
];

function MissionAcademy({ mission }: { mission: Mission }) {
  const [level, setLevel] = useState<QuizQuestion["level"]>("easy");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const start = (nextLevel = level) => {
    setLevel(nextLevel); setQuestions(quizBank.filter((question) => question.level === nextLevel).sort(() => Math.random() - .5).slice(0, 5));
    setIndex(0); setAnswer(""); setScore(0); setFinished(false);
  };
  const current = questions[index];
  const next = () => {
    const nextScore = score + (answer === current.answer ? 1 : 0);
    if (index === questions.length - 1) {
      if (nextScore >= 4) {
        const earned = new Set<string>(JSON.parse(localStorage.getItem("pale-blue-dot:earned-badges") ?? "[]") as string[]);
        earned.add(level);
        localStorage.setItem("pale-blue-dot:earned-badges", JSON.stringify([...earned]));
      }
      setScore(nextScore); setFinished(true); return;
    }
    setScore(nextScore); setIndex((value) => value + 1); setAnswer("");
  };
  const badge = score >= 4 ? `${level[0].toUpperCase()}${level.slice(1)} Voyager Scholar` : "";
  return <PageShell mission={mission}>
    <section className="story-heading"><p className="eyebrow">MISSION ACADEMY</p><h1>Test your space knowledge</h1><p>Choose a level, answer five random questions from the mission adventures, and earn a Voyager badge. You can retry as often as you like.</p></section>
    {!questions.length ? <section className="academy-levels"><button onClick={() => start("easy")}>🌟 Easy<br /><small>Big mission facts</small></button><button onClick={() => start("medium")}>🚀 Medium<br /><small>Details and discoveries</small></button><button onClick={() => start("hard")}>🌌 Hard<br /><small>Mission expert facts</small></button></section> : finished ? <section className="badge-result"><p className="eyebrow">MISSION COMPLETE</p><h2>{score} / {questions.length}</h2>{badge ? <><div className="badge">🏅<span>{badge}</span></div><p className="success">Badge earned! You know Voyager's story well.</p></> : <p className="retry">Good exploring! Score 4 out of 5 to earn this badge. Try again whenever you are ready.</p>}<div className="choice-row">{(["easy", "medium", "hard"] as const).map((item) => <button key={item} onClick={() => start(item)}>Try {item}</button>)}</div><a href={route("play")}>← Back to Play Lab</a></section> : <section className="academy-question"><p className="eyebrow">{level.toUpperCase()} · {current.category} · QUESTION {index + 1} OF {questions.length}</p><h2>{current.question}</h2><div className="answers">{current.options.map((option) => <button className={answer === option ? (option === current.answer ? "correct" : "not-correct") : ""} key={option} onClick={() => setAnswer(option)}>{option}</button>)}</div>{answer && <><p className={answer === current.answer ? "success" : "retry"}>{answer === current.answer ? current.explanation : `Not this time. ${current.explanation}`}</p><button className="primary-button" onClick={next}>{index === questions.length - 1 ? "See my result" : "Next question →"}</button></>}</section>}
  </PageShell>;
}

function PlayPage({ mission }: { mission: Mission }) {
  return <PageShell mission={mission}>
    <section className="story-heading"><p className="eyebrow">MISSION CONTROL</p><h1>Play, build, and explore!</h1><p>Try a hands-on mission activity, then visit Mission Academy when you are ready to test your knowledge and earn a badge.</p></section>
    <section className="lab-grid">
      <a href={route("signal-lab")}><span>📡</span><b>Signal lab</b><small>Send a pretend message to Voyager and get a playful reply.</small></a>
      <a href={route("flight-simulator")}><span>🛰️</span><b>Fly with Voyager</b><small>Watch its journey from Earth to interstellar space.</small></a>
      <a href={route("build-voyager")}><span>🛠️</span><b>Build Voyager</b><small>Choose the parts a space explorer needs.</small></a>
      <a href={route("build-record")}><span>💿</span><b>Build a Golden Record</b><small>Pack a tiny message from Earth.</small></a>
      <a href={route("academy")}><span>🏅</span><b>Mission Academy</b><small>Test your knowledge and earn a badge.</small></a>
    </section>
    <a className="next-button" href={route("academy")}>Open Mission Academy 🏅</a>
  </PageShell>;
}

function SignalLabPage({ mission }: { mission: Mission }) {
  const [message, setMessage] = useState("Hello, Voyager!");
  const [status, setStatus] = useState<"ready" | "earth" | "voyager" | "returning" | "received">("ready");
  const [reply, setReply] = useState("");
  const funMessages = ["Hello, Voyager! What can you see?", "Please send a space high-five!", "Did you see Saturn's rings?", "Hello from Earth, star explorer!", "What is interstellar space like?"];
  const voyagerReplyStarts = ["I am sending you a space high-five!", "My big dish antenna heard you clearly!", "Your words traveled a very long way through space!", "I am happy to get a hello from Earth!", "Your message reached me between the stars!", "I am still listening to the sounds of deep space!", "Your curiosity is a wonderful space tool!", "I am waving my antenna back at you!", "You are part of my Earth team!", "Your message made my long journey feel less lonely!"];
  const voyagerReplyEnds = ["Keep looking up at the night sky!", "Saturn's rings were full of tiny icy pieces.", "Jupiter's clouds were swirly and colorful.", "Earth looks like a tiny, precious home from far away.", "I am exploring the space between stars.", "My Golden Record carries a hello from Earth.", "Every big discovery starts with a curious question.", "Radio waves can carry kind messages across space.", "I hope you keep asking brave space questions!", "Your imagination belongs on a mission to the stars!"];
  const voyagerReplies = voyagerReplyStarts.flatMap((start) => voyagerReplyEnds.map((end) => `Hi! I have received your message. ${start} ${end}`));
  const playSignalSound = (kind: "travel" | "voyager-received" | "earth-received") => {
    const legacyWindow = window as Window & { webkitAudioContext?: typeof AudioContext };
    const AudioContextClass = window.AudioContext ?? legacyWindow.webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const frequency = kind === "travel" ? 520 : kind === "voyager-received" ? 740 : 920;
    const duration = kind === "travel" ? .12 : .42;
    oscillator.type = kind === "travel" ? "sine" : "triangle";
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    if (kind !== "travel") oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.45, context.currentTime + duration);
    gain.gain.setValueAtTime(.001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(.12, context.currentTime + .02);
    gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + duration);
    oscillator.addEventListener("ended", () => void context.close());
  };
  const speak = (words: string) => {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    speechSynthesis.speak(new SpeechSynthesisUtterance(words));
  };
  const stages = [
    <>1. Earth sends radio waves <small>Watch the signal begin its long journey</small></>,
    <>2. Voyager receives the signal <small>About 24 hours have passed</small></>,
    <>3. Voyager sends radio waves back <small>Its reply starts the journey home</small></>,
    <>4. Earth receives a reply <small>About 48 hours for the round trip</small></>
  ];
  const visibleStageCount = status === "received" ? 4 : status === "returning" ? 3 : status === "voyager" ? 2 : 1;
  const send = () => {
    const outgoing = message.trim() || "Hello, Voyager!";
    const nextReply = voyagerReplies[Math.floor(Math.random() * voyagerReplies.length)];
    let signalPings = window.setInterval(() => playSignalSound("travel"), 780);
    setMessage(outgoing);
    setReply(nextReply);
    setStatus("earth");
    playSignalSound("travel");
    window.setTimeout(() => { window.clearInterval(signalPings); setStatus("voyager"); playSignalSound("voyager-received"); }, 8200);
    window.setTimeout(() => { setStatus("returning"); playSignalSound("travel"); signalPings = window.setInterval(() => playSignalSound("travel"), 780); }, 13000);
    window.setTimeout(() => { window.clearInterval(signalPings); setStatus("received"); playSignalSound("earth-received"); }, 21000);
  };
  return <PageShell mission={mission}>
    <section className="story-heading"><p className="eyebrow">PLAY LAB · SIMULATION</p><h1>Send a pretend radio signal</h1><p>Choose a fun message or write your own. You will hear Earth send it, then hear Voyager's playful reply come back.</p></section>
    <section className="signal-lab"><label>Write a short pretend message<input maxLength={60} value={message} onChange={(event) => { setMessage(event.target.value); setStatus("ready"); }} /></label><div className="fun-message-picks">{funMessages.map((funMessage) => <button key={funMessage} onClick={() => { setMessage(funMessage); setStatus("ready"); }}>✦ {funMessage}</button>)}</div><div className={`signal-animation ${status}`}><span>🌍<b>Earth</b></span><div className="signal-space" aria-label={status === "returning" ? "Radio wave traveling from Voyager back to Earth" : "Radio wave traveling from Earth to Voyager"}><i aria-hidden="true">〰〰〰</i></div><span>🚀<b>Voyager</b></span></div><ol className="signal-steps">{stages.slice(0, visibleStageCount).map((stage, index) => <li className={index + 1 === visibleStageCount ? "active" : ""} key={index}>{stage}</li>)}</ol><div className="signal-message"><b>{status === "returning" || status === "received" ? "Voyager's reply" : "Earth's message"}</b><p>{status === "returning" || status === "received" ? reply : message}</p>{status !== "ready" && <button className="listen-button" onClick={() => speak(status === "returning" || status === "received" ? reply : message)}>🔊 Hear this message</button>}</div><p>{status === "ready" && "Ready to beam your words across our pretend space map."}{status === "earth" && "Watch the radio waves flow from Earth toward Voyager."}{status === "voyager" && "Pause and imagine it: about 24 hours have passed. Voyager has received your message!"}{status === "returning" && "Now Voyager sends a reply. Watch its radio waves flow back toward Earth."}{status === "received" && `Another 24 hours have passed. About 48 hours after sending your message, Earth receives Voyager's reply: “${reply}”`}</p><button className="primary-button" onClick={send} disabled={["earth", "voyager", "returning"].includes(status)}>{status === "received" ? "Send another signal" : "Send signal 📡"}</button><p><a href={route("play")}>← Back to Play Lab</a></p></section>
  </PageShell>;
}

function BuildPage({ mission, record = false }: { mission: Mission; record?: boolean }) {
  const voyagerParts = [
    { id: "computer", prompt: "1. Start Voyager's main body. Which part is its tiny command center?", answer: "Computer", options: ["Computer", "Camera", "Golden Record"], hint: "It follows the instructions sent from Earth." },
    { id: "power", prompt: "2. Add the part that makes electricity far from the Sun.", answer: "Power source", options: ["Power source", "Big dish antenna", "Science instrument"], hint: "Voyager needs power where sunlight is very weak." },
    { id: "dish", prompt: "3. Attach the giant bowl that talks to Earth.", answer: "Big dish antenna", options: ["Big dish antenna", "Science boom", "Power source"], hint: "It points toward Earth to send and receive radio signals." },
    { id: "camera", prompt: "4. Add the tool Voyager used to photograph planets.", answer: "Camera", options: ["Camera", "Science instrument", "Big dish antenna"], hint: "This is how Voyager took views of Jupiter and Saturn." },
    { id: "instrument", prompt: "5. Choose a tool that measures and studies space.", answer: "Science instrument", options: ["Science instrument", "Golden Record", "Computer"], hint: "Scientists use this tool's measurements to learn about space." },
    { id: "boom", prompt: "6. Attach the long arm that holds science tools away from Voyager.", answer: "Science boom", options: ["Science boom", "Camera", "Power source"], hint: "It is a long arm that helps keep some tools away from the spacecraft." },
    { id: "record", prompt: "7. Finally, add Voyager's tiny message from Earth.", answer: "Golden Record", options: ["Golden Record", "Big dish antenna", "Science instrument"], hint: "It carries greetings, music, pictures, and sounds." }
  ];
  const rounds = record
    ? [{ prompt: "1. Which kind of greeting is really on the Golden Record?", answer: "Greetings in 55 languages", options: ["Greetings in 55 languages", "A secret password", "A shopping list"], hint: "The record says hello to possible listeners." }, { prompt: "2. How many pictures does the record carry?", answer: "115 images of Earth and life", options: ["115 images of Earth and life", "Only one picture", "No pictures at all"], hint: "The pictures are encoded on the record." }, { prompt: "3. Which natural sound is really on the record?", answer: "A whale song", options: ["A whale song", "A car horn contest", "A robot laugh"], hint: "Think of an animal that lives in the ocean." }, { prompt: "4. What kind of music is really included?", answer: "Music from different cultures and times", options: ["Music from different cultures and times", "Only one short song", "A video game soundtrack"], hint: "The music section lasts about 90 minutes." }, { prompt: "5. What sound from a person is included?", answer: "A human heartbeat", options: ["A human heartbeat", "A balloon popping", "A phone ringtone"], hint: "It is a sound you can hear inside your body." }, { prompt: "6. What helps a finder play the record?", answer: "A cartridge and a needle", options: ["A cartridge and a needle", "A streaming app", "A set of headphones"], hint: "The record travels with a way to play it." }, { prompt: "7. What is printed on the record cover?", answer: "Symbol instructions", options: ["Symbol instructions", "A treasure map", "A comic strip"], hint: "Pictures and symbols can help explain how to play the record." }]
    : voyagerParts;
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [builtParts, setBuiltParts] = useState<string[]>([]);
  const finished = round === rounds.length;
  const choose = (choice: string) => {
    const current = rounds[round];
    if (choice === current.answer) { setFeedback(`✓ ${choice} attached! Now find the next piece.`); setBuiltParts((parts) => [...parts, choice]); setRound((value) => value + 1); }
    else setFeedback(`Not quite. ${current.hint} Try rebuilding with a different choice.`);
  };
  return <PageShell mission={mission}>
    <section className="story-heading"><p className="eyebrow">PLAY LAB · BUILD IT</p><h1>{record ? "Build a Golden Record" : "Build a real Voyager spacecraft"}</h1><p>{record ? "Choose what was really sent from Earth. Some choices are pretend extras—use the hint and rebuild if needed." : "Choose the real parts one at a time. Every correct piece lights up where it belongs on Voyager's NASA test photo."}</p></section>
    <section className="builder">{record ? <ImagePanel image={image(mission, "golden-record")} /> : <div className="voyager-assembly"><div className="assembly-photo"><img src={image(mission, "spacecraft").src} alt={image(mission, "spacecraft").alt} />{voyagerParts.filter((part) => builtParts.includes(part.answer)).map((part) => <span className={`assembly-part ${part.id} attached`} key={part.id}>✓ {part.answer}</span>)}</div><p><b>Voyager assembly:</b> {builtParts.length} of {voyagerParts.length} parts attached</p><div className="assembly-key">{builtParts.map((part) => <span key={part}>✓ {part}</span>)}</div><small>NASA/JPL-Caltech artist's view of Voyager in space.</small></div>}<div>{finished ? <><p className="success">{record ? "Correct! The real Golden Record includes greetings in many languages, music, pictures, natural sounds, and information about Earth." : "Voyager is ready for its adventure! You attached its seven important parts to the spacecraft build map."}</p><a className="next-button" href={route("play")}>Back to Play Lab 🎮</a></> : <><p className="eyebrow">ASSEMBLY STEP {round + 1} OF {rounds.length}</p><h2>{rounds[round].prompt}</h2><div className="visual-options text-options">{rounds[round].options.map((option) => <button key={option} onClick={() => choose(option)}><span>{option}</span></button>)}</div>{feedback && <p className={feedback.startsWith("✓") ? "success" : "retry"}>{feedback}</p>}<button className="hint-button" onClick={() => setFeedback(`Hint: ${rounds[round].hint}`)}>Need a hint?</button></>}</div></section><p><a href={route("play")}>← Back to Play Lab</a></p>
  </PageShell>;
}

const interests = {
  planets: { label: "the planets and colorful clouds", subject: "planet detective", discoveries: ["Jupiter's swirling clouds", "Saturn's shining rings", "Io's fiery volcanoes", "Jupiter's Great Red Spot", "Saturn's moon family"] },
  journey: { label: "Voyager's long journey", subject: "space traveler", discoveries: ["the launch from Earth", "the trip past Jupiter", "the trip past Saturn", "the path to interstellar space", "the huge distance Voyager has traveled"] },
  messages: { label: "the Golden Record and messages", subject: "kind message maker", discoveries: ["Earth's greetings", "music from home", "sounds from nature", "the Golden Record", "a hello sent through space"] },
  building: { label: "how Voyager is built", subject: "clever spacecraft builder", discoveries: ["the big dish antenna", "the science tools", "Voyager's power source", "the radio signal", "the spacecraft's important parts"] },
  space: { label: "space between the stars", subject: "star explorer", discoveries: ["interstellar space", "faraway starlight", "the Sun's giant bubble", "a signal crossing space", "the mystery beyond the planets"] }
} as const;
type Interest = keyof typeof interests;
const messageStarts = ["Your curiosity", "Your brave questions", "Your bright ideas", "Your explorer heart", "Your imagination", "Your careful noticing", "Your love of learning", "Your space spark", "Your big wonder", "Your kind curiosity"];
const messageEnds = ["can travel farther than you think.", "make the universe feel closer.", "are perfect for discovering new things.", "help every explorer keep going.", "shine like a small star in a big sky.", "are a wonderful part of every adventure.", "can turn a question into a discovery.", "belong on a mission to the stars.", "are worth sharing with the world.", "will always have room in space."];
const personalizedMessages = (Object.entries(interests) as [Interest, typeof interests[Interest]][]).flatMap(([interest, details]) => messageStarts.flatMap((start) => messageEnds.map((end, index) => ({ interest, text: `${start} makes you a wonderful ${details.subject}. Keep exploring ${details.discoveries[index % details.discoveries.length]}—${end}` }))));

function TakeHomePage({ mission }: { mission: Mission }) {
  const [name, setName] = useState(() => localStorage.getItem("pale-blue-dot:card-name") ?? "");
  const [interest, setInterest] = useState<Interest>("planets");
  const [message, setMessage] = useState(() => personalizedMessages[0].text);
  const [cardStatus, setCardStatus] = useState<"editing" | "printing" | "ready">("editing");
  const saveName = (value: string) => {
    setName(value);
    setCardStatus("editing");
    localStorage.setItem("pale-blue-dot:card-name", value);
  };
  const chooseInterest = (next: Interest) => {
    setInterest(next);
    const choices = personalizedMessages.filter((item) => item.interest === next);
    setMessage(choices[Math.floor(Math.random() * choices.length)].text);
    setCardStatus("editing");
  };
  const chooseAnotherMessage = () => chooseInterest(interest);
  const generateCard = () => {
    setCardStatus("printing");
    track("activity_started", route("take-home"), "voyager-card");
    window.setTimeout(() => {
      setCardStatus("ready");
      track("activity_completed", route("take-home"), "voyager-card");
    }, 2200);
  };
  return <PageShell mission={mission}>
    <section className="story-heading"><p className="eyebrow">MISSION COMPLETE</p><h1>Your Voyager take-home card</h1><p>Choose what you loved most, then ask Voyager to print a one-of-a-kind card just for you.</p></section>
    <section className="card-maker no-print"><label>What should Voyager call you? <input maxLength={24} value={name} placeholder="Space explorer" onChange={(event) => saveName(event.target.value)} /></label><p>What did you like most about Voyager?</p><div className="message-picks">{(Object.entries(interests) as [Interest, typeof interests[Interest]][]).map(([key, item]) => <button className={interest === key ? "selected" : ""} key={key} onClick={() => chooseInterest(key)}>{item.label}</button>)}</div><div className="card-actions"><button className="hint-button" onClick={chooseAnotherMessage}>Choose another message ✦</button><button className="primary-button" onClick={generateCard} disabled={cardStatus === "printing"}>{cardStatus === "printing" ? "Voyager is printing..." : "Ask Voyager to print my card ✦"}</button>{cardStatus === "ready" && <button className="primary-button" onClick={() => window.print()}>Print my card 🖨️</button>}</div></section>
    {cardStatus !== "ready" && <section className={`voyager-printer ${cardStatus}`} aria-live="polite"><div className="printer-voyager" aria-hidden="true">🛰️</div><div><p className="eyebrow">VOYAGER'S CARD PRINTER</p><h2>{cardStatus === "printing" ? "Voyager is printing your star card..." : "Your special card is waiting to be printed."}</h2><p>{cardStatus === "printing" ? "The message is traveling from your choices into Voyager's tiny printer." : "Choose your favorite part of the adventure, then press the gold button."}</p></div><div className="printer-paper" aria-hidden="true"><span>✦</span></div></section>}
    {cardStatus === "ready" && <><p className="printer-complete no-print" role="status">✦ Printed by Voyager just for you!</p><section className="take-home-card"><p className="eyebrow">VOYAGER 1 STAR EXPLORER CARD</p><div className="card-stars" aria-hidden="true">✦ ✧ ✦</div><h2>To {name.trim() || "Space Explorer"},</h2><p className="card-message">“{message}”</p><p className="from-voyager">— Your friend, Voyager 1 🚀</p><small>I learned about a spacecraft that explored Jupiter and Saturn, carries a Golden Record, and travels in interstellar space.</small></section></>}
    <section className="sources"><h2>Grown-up corner: sources</h2>{mission.sources.map((source) => <a key={source.id} href={source.url} target="_blank" rel="noreferrer">{source.publisher}: {source.title}</a>)}</section>
  </PageShell>;
}

function PrivacyPage({ mission }: { mission: Mission }) {
  return <PageShell mission={mission}>
    <section className="story-heading"><p className="eyebrow">PRIVACY NOTICE</p><h1>Our promise to explorers</h1><p>Pale Blue Dot records anonymous page views and activity starts or completions to learn which parts of the archive are useful. We do not store names, raw IP addresses, precise locations, passwords, or browser fingerprints.</p><p>This first release has no public guestbook. Analytics records are kept for the period set by the project administrator.</p></section>
  </PageShell>;
}

function App() {
  const [mission, setMission] = useState<Mission>();
  const [error, setError] = useState("");
  const path = location.pathname.replace(/\/$/, "") || "/";
  useEffect(() => {
    track("page_view", path);
    fetch("/api/v1/missions/voyager-1").then(async (response) => {
      if (!response.ok) throw new Error("Mission unavailable");
      setMission(await response.json() as Mission);
    }).catch(() => setError("Voyager 1 is unavailable right now. Please try again soon."));
  }, [path]);
  if (error) return <main className="page"><h1>Pale Blue Dot</h1><p>{error}</p></main>;
  if (!mission) return <main className="page"><p>Loading Voyager's adventure…</p></main>;
  if (path === "/") return <HomePage mission={mission} />;
  if (path === "/privacy") return <PrivacyPage mission={mission} />;
  if (path === route("journey")) return <JourneyPage mission={mission} />;
  if (path === route("discoveries")) return <DiscoveriesPage mission={mission} />;
  if (path === route("saturn")) return <SaturnPage mission={mission} />;
  if (path === route("deep-space")) return <DeepSpacePage mission={mission} />;
  if (path === route("instruments")) return <InstrumentsPage mission={mission} />;
  if (path === route("flight-simulator")) return <FlightSimulatorPage mission={mission} />;
  if (path === route("golden-record")) return <GoldenRecordPage mission={mission} />;
  if (path === route("family-portrait")) return <PredictionPage mission={mission} kind="portrait" />;
  if (path === route("communicate")) return <PredictionPage mission={mission} kind="talk" />;
  if (path === route("play")) return <PlayPage mission={mission} />;
  if (path === route("signal-lab")) return <SignalLabPage mission={mission} />;
  if (path === route("build-voyager")) return <BuildPage mission={mission} />;
  if (path === route("build-record")) return <BuildPage mission={mission} record />;
  if (path === route("academy")) return <MissionAcademy mission={mission} />;
  if (path === route("take-home")) return <TakeHomePage mission={mission} />;
  return <VoyagerLanding mission={mission} />;
}

export { App };
