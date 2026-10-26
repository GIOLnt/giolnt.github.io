// ═══ DATI DEL SITO — si cambiano qui, una volta sola, e valgono per tutte le pagine ═══
window.SITE = {
  nome: 'GL',  // sito anonimo: solo le iniziali (26 ott)
  ruolo: 'AI Filmmaker',
  sottotitolo: 'Cortometraggi, documentari e spot creati con l’intelligenza artificiale',
  premio: {
    titolo: '3rd place — MotionMux Wan 3.0 Hackathon',
    dettaglio: ''  // il numero dei partecipanti non si scrive
  }
};

// ═══ SCHEDE DEI LAVORI — la striscia sotto il video intero (in inglese, lingua principale del sito) ═══
// Testi approvati uno per uno il 25 ott. La chiave è il file del video intero (data-full).
// Crediti come nei titoli di coda: solo i ruoli veri; il primo nome va in oro. Le tecniche non hanno crediti.
const CREDITS_FILM = [
  ['Directed by', 'GL'],
  ['Written by', 'GL & Claude'],
  ['Prompts & AI direction', 'Claude (Anthropic) & GL'],
  ['Edit & sound', 'Claude (Anthropic) — supervised by GL']
];
const CREDITS_DOC = [...CREDITS_FILM, ['Narration', 'George — ElevenLabs (AI voice)']];
const CREDITS_SPOT = [
  ['Directed by', 'GL'],
  ['Storyboard & prompts', 'Claude (Anthropic) & GL'],
  ['Edit', 'GL']
];

window.WORKS = {
  // Short film
  'media/film/the_letter.mp4': {
    title: 'The Letter', category: 'Short film', duration: '1:37',
    text: 'Constantinople, 1453. Anna Notaras receives a sealed letter, and with it the news she feared.',
    tools: ['Wan 3.0', 'Adobe Firefly'], credits: CREDITS_FILM
  },
  'media/film/let_her_finish.mp4': {
    title: 'Let Her Finish', category: 'Short film', duration: '3:44',
    text: 'A girl comes home to her mother. The house is quiet, and something in it is waiting.',
    tools: ['Wan 3.0', 'Nano Banana', 'Stable Audio', 'HyperFrames'], credits: CREDITS_FILM
  },
  // Documentari
  'media/film/venezia.mp4': {
    title: 'Venice', category: 'Documentary', duration: '6:39',
    text: 'San Giorgio dei Greci: the Greeks who reached Venice after the fall of Constantinople, and the church they built.',
    tools: ['Wan 3.0', 'Google Flow', 'Nano Banana', 'ElevenLabs', 'Stable Audio', 'HyperFrames'], credits: CREDITS_DOC
  },
  'media/film/napoli.mp4': {
    title: 'Naples Underground', category: 'Documentary', duration: '7:33',
    text: 'From the Greek city of Neapolis to the shelters under the streets: the Greek soul of Naples.',
    tools: ['Wan 3.0', 'Google Flow', 'Nano Banana', 'ElevenLabs', 'Stable Audio', 'CapCut'], credits: CREDITS_DOC
  },
  'media/film/anticitera.mp4': {
    title: 'Antikythera', category: 'Documentary', duration: '2:42',
    text: 'The Machine That Shouldn’t Exist: the story of the Antikythera mechanism. English version.',
    award: '3rd place — MotionMux Wan 3.0 Hackathon',
    tools: ['Wan 3.0', 'Google Flow', 'Nano Banana', 'ElevenLabs', 'Stable Audio', 'Mirelo', 'CassetteAI'], credits: CREDITS_DOC
  },
  // Spot
  'media/spot/intero/ether.mp4': {
    title: 'Ether', category: 'Commercial', duration: '0:17',
    text: 'Fragrance commercial. Ether eau de parfum on a black-sand beach at sunset.',
    tools: ['Google Flow'], credits: CREDITS_SPOT
  },
  'media/spot/intero/scarpa.mp4': {
    title: 'Stride', category: 'Commercial', duration: '0:13',
    text: 'Running shoe commercial. One shoe, eight places, from the city streets to the beach.',
    tools: ['Grok Imagine 1.5'], credits: CREDITS_SPOT
  },
  'media/spot/intero/orologio.mp4': {
    title: 'Chrono', category: 'Commercial', duration: '0:10',
    text: 'Watch commercial. A men’s watch in the studio, in macro, detail by detail.',
    tools: ['Google Flow'], credits: CREDITS_SPOT
  },
  'media/spot/intero/aurelia.mp4': {
    title: 'Aurélia', category: 'Commercial', duration: '0:10',
    text: 'Skincare commercial. Aurélia face cream in the morning light.',
    tools: ['Google Flow', 'Nano Banana'], credits: CREDITS_SPOT
  },
  'media/spot/intero/pulse.mp4': {
    title: 'Pulse', category: 'Commercial', duration: '0:15',
    text: 'Speaker commercial. Six shots from one storyboard, and a logo that beats with the bass.',
    tools: ['Seedance 2.0 Mini', 'GPT Image'], credits: CREDITS_SPOT
  },
  'media/spot/intero/zest.mp4': {
    title: 'Zest', category: 'Commercial', duration: '0:10',
    text: 'Juice commercial. Zest cold-pressed orange juice, from a six-panel storyboard.',
    tools: ['Gemini Omni Flash', 'GPT Image'], credits: CREDITS_SPOT
  },
  // Tecniche (senza crediti)
  'media/tecniche/partitura.mp4': {
    title: 'Image → Video', category: 'Technique', duration: '0:27',
    text: '4 reference photos and a 1,434-word prompt: each block directs its own second of video. From The Letter.',
    tools: ['Wan 3.0', 'HyperFrames']
  },
  'media/tecniche/testo_video.mp4': {
    title: 'Text → Video', category: 'Technique', duration: '0:22',
    text: 'No images: a 523-word prompt becomes the shots, the camera move, the voice and the music. 1080p.',
    tools: ['Wan 3.0', 'HyperFrames']
  },
  'media/tecniche/blender.mp4': {
    title: 'Blender → Clay → Video', category: 'Technique', duration: '0:20',
    text: 'Camera and volumes from the 3D model, materials from a colour legend: a 360° turn inside the real church.',
    note: 'Reference photos: D. Kamaras, CC BY 2.0',
    tools: ['Blender', 'Wan 3.0', 'HyperFrames']
  },
  'media/tecniche/storyboard.mp4': {
    title: 'Storyboard → Video', category: 'Technique', duration: '0:23',
    text: 'A 6-panel grid becomes a 15-second commercial, shot by shot, in a single generation.',
    tools: ['Grok Imagine 1.5', 'HyperFrames']
  }
};
