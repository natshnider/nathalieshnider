/* ============================================================
   CONTENT.JS  —  the only file you need to edit.

   The site has three galleries — Film, Treatments, Photography —
   plus the Profile page. Each gallery is its own list below:
   FILM, TREATMENTS, PHOTOGRAPHY. Add a work by copying the
   TEMPLATE at the bottom of whichever list it belongs in.

   Two rules and you're safe:
     1. Every entry sits between {  } and ends with a comma.
     2. Text goes between `backticks`. Backticks let you use
        apostrophes and quotes freely — don't ask me why.
   ============================================================ */


/* ============================================================
   FILM
   ============================================================ */

const FILM = [

  {
    // ---- shows on the reel ----
    title: `Waltz En Blue`,
    meta: `Short film · 2026`,          // small line under the title
    blurb: `Director`,       // one short line. Keep it under ~40 characters.
    cover: `images/waltz.png`,  // the image on the reel
    ratio: `1/1`,                      // shape of the cover: 16/9, 4/3, 1/1, 3/4, 4/5

    // ---- shows in the pop-up ----
    description: `Through grain, movement, and silence, Paris becomes a landscape of longing for a woman tracing what remains of herself after a fleeting romance gives way to blue-tinted memory. This quiet, experimental 16mm reverie explores the line between what was lived and what softly fades to a new reality.`,

    credits: [                           // optional
      `Director / Producer — Nathalie Shnider`,
      `Director of Photography — Susan Liu`,
      `Production Manager — Manyl Hendou`,
      `Editor — Maria Bykina`,
      `Starring — Gabriella Laws`,
    ],

    stills: [                            // optional
      `images/waltz-s1.png`,
      `images/waltz-s2.png`,
      `images/waltz-s3.png`,
    ],
  },

  {
    title: `I'm Your Answer`,
    meta: `Music Video · 2025`,
    blurb: `Director / Producer`,
    cover: `images/answer.png`,
    ratio: `1/1`,
    description: `Direction and Production for Paitra's music video *I'm Your Answer*, inspired by childhood imagination and wonder.`,
    embed: `https://www.youtube.com/watch?v=unAC-7ECT-E`,
    link: { label: `Watch it on Youtube`, url: `https://www.youtube.com/watch?v=unAC-7ECT-E` },
    credits: [
      `Director / Producer — Nathalie Shnider`,
      `Director of Photography — Spencer Wither`,
      `Editor / Production Manager — Ariel Ravitz`,
      `Costume Designer & Stylist — Josie Eccelston`,
      `Production Designer — Teaghen Brown`,
      `Production Assistant — Malak Bakir`,
    ],
    stills: [
      `images/answer-s1.png`,
      `images/answer-s2.png`,
      `images/answer-s3.png`,
      `images/answer-s4.png`,
      `images/answer-s5.png`,
      `images/answer-s6.png`,
      `images/answer-s7.png`,
      `images/answer-s8.png`,
    ],
  },
  {
    title: `It Comes in Waves`,
    meta: `Short Film · 2025`,
    blurb: `Producer`,
    cover: `images/waves.png`,
    ratio: `1/1`,
    description: `In the aftermath of an intense yet fleeting connection, a young man wrestles with the presence of a lost friend, navigating queer longing, guilt, and the quiet grief of love never fully realized.`,
    credits: [
      `Director / Writer — Michael Petruzzelli`,
      `Producer — Nathalie Shnider`,
      `Director of Photography — John Ker`,
      `Sound Design — Alex Gulch`,
      `Editing — Nicolas Houghton`,
      `Production Designer — Talia Missaghi`
    ],
    stills: [
      `images/waves-s1.png`,
      `images/waves-s2.png`,
    ],
  },
  {
    title: `A Universal Feeling`,
    meta: `Music Video · 2025`,
    blurb: `Director / Producer`,
    cover: `images/feeling.png`,
    ratio: `1/1`,
    description: `Directed, Produced, Shot and Edited for Paitra's music visualizer for *A Universal Feeling* - inspired by the fleeting beauty of nature.`,
    embed: `https://youtu.be/FP-rWioBTGE`,
    link: { label: `Watch it on Youtube`, url: `https://youtu.be/FP-rWioBTGE` },
  },
  {
    title: `Sleep Talking`,
    meta: `Short Film · 2024`,
    blurb: `Producer`,
    cover: `images/sleep.png`,
    ratio: `1/1`,
    description: `*Sleep Talking* is an absurdist comedy-drama that explores where our minds go when we can't fall asleep. It follows David, a tired 20-something experiencing a sleepless night. He meanders into an office space—the metaphorical representation of his mind and spends the night on menial tasks to uncover why he is unable to sleep.`,
    awards: [
      `Best Short Film — Canadian Film Fest`,
      `Official Selection — Festival du Nouveau Cinema`,
      `Official Selection — Canadian Film Fest`,
      `Official Selection — Festival du Film Canadien de Dieppe`
    ],
    credits: [
      `Director — Ethan Goedel`,
      `Production — Ryan Bobkin & Nathalie Shnider`,
      `Script — Ethan Goedel & Filip Lee`,
      `Director of Photography — Shady Hana`,
      `Sound Design — Alex Gulch`,
      `Editor — Ethan Goedel`,
      `Art Director — Somerville Black`,
      `Projection Mapping — Nathalie Shnider`,
    ],
    stills: [
      `images/sleep-s2.jpg`,
    ],
  },
  {
    title: `Sludge`,
    meta: `Short Film · 2024`,
    blurb: `Producer - TMU Thesis`,
    cover: `images/sludge.png`,
    ratio: `1/1`,
    awards: [
      `Best Short Film — Toronto Metropolian Film Festival`,
      `Winner — Absurd Film Festival`,
      `Official Selection — Toronto Youth Shorts`,
      `Official Selection — Sacramento Independent Film Festival`,
      `Official Selection — Toronto Independent Festival of CIFT`
    ],
    description: `Reba, a lost 20 something, tries to escape her inner demons, but the more she runs from them, the closer they get.`,
    credits: [
      `Writer / Director — Molly Cole`,
      `Producer — Nathalie Shnider`,
      `Director of Photography — Susannah Haight`,
      `Sound Design — Dylan Micallef & Alex Gulch`,
      `Editor — Matthew Morreale`,
      `Art Director — Cassidy Skye-James`,
    ],
    stills: [
      `images/sludge-s1.png`,
      `images/sludge-s3.png`,
    ],
  },
  {
    title: `Pre-Nostalgia`,
    meta: `Short Film · 2023`,
    blurb: `Director`,
    cover: `images/nostalgia.png`,
    ratio: `1/1`,
    description: `A reflective montage of friends meandering by the French sea side, punctuated by the awareness that this beautiful moment will soon end.  Exemplifying private melancholy, reconciling notions of joy and longing. From the periphery bleeds a pre-nostalgia for the present.`,
    embed: `https://youtu.be/K4NvZfx81_0`,
    link: { label: `Watch it on Youtube`, url: `https://youtu.be/K4NvZfx81_0` },
    credits: [
      `Director — Nathalie Shnider`,
      `Producer — Alliza Vitto`,
      `Cinematography — Nathalie Shnider & Alliza Vitto`,
      `Colour — Christian Theo, Nathalie Shnider, & Alliza Vitto`,
      `Sound Design — Mina Pinawina & Christian Theo`,
    ],
    stills: [
      `images/nostalgia-s1.jpg`,
      `images/nostalgia-s2.jpg`,
    ],
  },
  {
    title: `Immersive Reverie`,
    meta: `Immersive Exhibit · 2023`,
    blurb: `Creative Director`,
    cover: `images/reverie.png`,
    ratio: `1/1`,
    description: `Final project while on exchange in Amsterdam with Hogeschool van Amsterdam (HvA), Immersive Environments Program titled Immersive Rêverie

    This piece was inspired by impressionist paintings like Monet's Waterlilies’s and uses Claude Debussy’s “Rêverie” as a score for daydreaming. Shot at the Keukenhof Gardens in the Netherlands, manipulated in Touch Designer, and built with two shower curtains.`,
    video: `videos/reverie.mp4`,
    link: { label: `See it here`, url: `https://www.instagram.com/p/C0QFyskrOuF/?utm_source=ig_embed&utm_campaign=loading` },
  },
  {
    title: `Immersive Reverie Deux`,
    meta: `Immersive Exhibit · 2023`,
    blurb: `Creative Director`,
    cover: `images/reverie_deux.png`,
    ratio: `1/1`,
    description: `Final piece for media art exhibition Magnified,  created by Toronto Metropolitan University Creative School Students.

    Rêverie is a state of being pleasantly lost in one's thoughts; a daydream.

    In this immersive exhibit, memories of a semester spent in Europe are preserved through personal archived footage. The footage has been edited in Millumin and touch designer to exemplify the interplay between light, sound, and colour. Inspired by the tranquil 360 degree paintings of Claude Monet's Waterlilies at the Musée de l'Orangerie, this immersive exhibit echoes the ethereal nature of impressionist landscapes in a more contemporary way.`,
    video: `videos/reverie_deux.mp4`,
    link: { label: `See it here`, url: `https://example.com` },
  },
  {
    title: `Release`,
    meta: `Dance Film · 2022`,
    blurb: `Director`,
    cover: `images/release.png`,
    ratio: `1/1`,
    description: `A short dance film inspired by the changing leaves of late September. Set to Patrick Watson's *Lost With You*.`,
    video: `videos/release.mp4`,
    link: { label: `See it here`, url: `https://drive.google.com/file/d/1kyeAViiwAQOorkfElkTvtT6wcazqFMAT/view?usp=sharing` },
    credits: [
      `Director — Nathalie Shnider`,
      `Cinematography — Lucas Cabaj Guerra`,
      `Edit — Lucas Cabaj Guerra & Nathalie Shnider`,
      `Dancer — Abby Hanson`,
    ],
  },
  {
    title: `Too Stuck`,
    meta: `Music Video · 2025`,
    blurb: `Director / Producer`,
    cover: `images/stuck.png`,
    ratio: `1/1`,
    description: `Direction and Production for Paitra’s music visualizer, *Too Stuck*; inspired by 80s visuals.`,
    embed: `https://youtu.be/rqKBDIcen1o`,
    link: { label: `Watch it on Youtube`, url: `https://youtu.be/rqKBDIcen1o` },
    credits: [
      `Creative Director, Producer — Nathalie Shnider`,
      `Camera Operator, Editor — Evie Maynes`,
      `Hair & Makeup — Olivia Mokrzycki`,
    ],
  },

  /* ---------- TEMPLATE — copy everything between the lines ----------

  {
    title: `Name of the work`,
    meta: `Medium · Year`,
    blurb: `One short line for the reel.`,
    cover: `images/your-image.jpg`,
    ratio: `16/9`,
    awards: [
      `Official Selection — Festival Name 2026`,
    ],
    description: `The longer text for the pop-up.`,
    embed: `https://vimeo.com/000000`,
    link: { label: `Watch it`, url: `https://example.com` },
    credits: [
      `Director — Name`,
      `Editor — Name`,
    ],
    stills: [
      `images/still-1.jpg`,
      `images/still-2.jpg`,
    ],
  },

  ------------------------------------------------------------------- */

];


/* ============================================================
   TREATMENTS
   Works exactly like FILM, but the pop-up flips through a PDF
   instead of playing a video. Set `pdf` to the path of a PDF
   file and the pop-up shows it as slides, with prev/next arrows
   and a page counter. Everything else — description, awards,
   credits — still works the same as it does for Film.

   If a work has both `pdf` and `embed`, the PDF wins. If it has
   neither, the pop-up just shows the cover image.
   ============================================================ */

const TREATMENTS = [

  {
    title: `Example Treatment`,
    meta: `Treatment · 2026`,
    blurb: `Replace this with your own.`,
    cover: `images/example-treatment.svg`,
    ratio: `3/4`,

    pdf: `documents/example-treatment.pdf`,   // the pop-up flips through this

    description: `This is a placeholder so you can see how it works. Drop your own PDF into the documents folder, point "pdf" at it, and delete this entry.`,

    credits: [
      `Written by — Nathalie Shnider`,
    ],
  },

  /* ---------- TEMPLATE — copy everything between the lines ----------

  {
    title: `Name of the treatment`,
    meta: `Treatment · Year`,
    blurb: `One short line for the reel.`,
    cover: `images/your-image.jpg`,
    ratio: `3/4`,
    pdf: `documents/your-treatment.pdf`,
    description: `The longer text for the pop-up.`,
    credits: [
      `Written by — Name`,
    ],
  },

  ------------------------------------------------------------------- */

];


/* ============================================================
   PHOTOGRAPHY
   No pop-up on this page — clicking a photo does nothing, so
   only the fields that show up on the reel itself matter:
   title, meta, blurb, cover, ratio. Anything else you add to
   an entry here (description, credits, and so on) is simply
   never shown, so there's no need to fill those in.
   ============================================================ */

const PHOTOGRAPHY = [

  {
    title: `Example Photograph I`,
    meta: `Photography · 2026`,
    blurb: `Replace this with your own.`,
    cover: `images/example-photo-1.png`,
    ratio: `4/5`,
  },

  /* ---------- TEMPLATE — copy everything between the lines ----------

  {
    title: `Name of the photo`,
    meta: `Photography · Year`,
    blurb: `One short line for the reel.`,
    cover: `images/your-image.jpg`,
    ratio: `4/5`,
  },

  ------------------------------------------------------------------- */

];


/* ============================================================
   PAGES — tells each HTML file which gallery to show and what
   to call it. You shouldn't need to touch this unless you want
   to rename a section (change `heading`) or add a fourth gallery.
   ============================================================ */

const PAGES = {
  film:        { heading: `Nathalie Shnider`, mode: `film`,        works: FILM },
  treatments:  { heading: `Treatments`,       mode: `treatments`,  works: TREATMENTS },
  photography: { heading: `Photography`,      mode: `photography`, works: PHOTOGRAPHY },
};


/* ============================================================
   THE PROFILE PAGE + THE BITS THAT APPEAR ON EVERY PAGE
   ============================================================ */

const SITE = {

  name: " ",             // ← the script wordmark, top left
  footerNote: `Toronto`,

  profile: {
    heading: `Profile`,
    portrait: `images/headshot.jpg`,

    // Each `paragraph` is one block of text. Add or delete as many as you like.
    body: [
      `Nathalie Shnider is a Toronto-based director and creative producer whose work explores the complexities of human connection, memory, and the poetic nuances that linger beneath everyday life. Drawing from a multidisciplinary background spanning art history, graphic design, classical music, immersive film, and marketing strategy, she brings a distinctive blend of artistic sensitivity and creative vision to every project.`,
      `She has contributed to a diverse range of narrative, commercial, and immersive productions, with experience spanning projects developed through the Canadian Film Centre, commercial campaigns for Porter Airlines, and music videos for acclaimed Canadian artists. Working across development, production, and post-production, she is passionate about creating visually rich, emotionally resonant stories that bridge artistic expression with meaningful audience connection.`,
    ],

    details: [
      { label: `Based in`, value: `Toronto` },
      { label: `Working in`, value: `Film, Creative Direction` },
    ],

    links: [
      { label: `Email`, url: `mailto:hello@example.com` },
      { label: `Instagram`, url: `https://instagram.com/` },
      { label: `Vimeo`, url: `https://vimeo.com/` },
    ],
  },
};
