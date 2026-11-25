const events = [
  {
    id: "ai-orientation",
    title: "AI Orientation Programme",
    category: "Orientation",
    year: "2027",
    summary:
      "An introductory programme for students interested in artificial intelligence and its everyday applications.",
    date: "To be announced",
    venue: "To be announced",
    registrationUrl: ""
  },
  {
    id: "viksit-bharat",
    title: "Viksit Bharat Workshop & Seminar",
    category: "Workshop & Seminar",
    year: "2027",
    summary:
      "A programme exploring how students, technology and community initiatives can contribute to India's development.",
    date: "To be announced",
    venue: "To be announced",
    registrationUrl: ""
  }
];

const notices = [
  {
    title: "2027 programme calendar",
    text: "The AI Orientation Programme and Viksit Bharat Workshop & Seminar are listed in the programme directory."
  },
  {
    title: "Schedule announcement",
    text: "Confirmed dates and venues will be published on this portal."
  }
];

const galleryPhotos = [
  // ছবি images ফোল্ডারে রাখার পর নিচের মতো একটি entry যোগ করো।
  // {
  //   src: "images/ai-orientation-session.jpg",
  //   caption: "AI Orientation Programme · Opening session",
  //   alt: "Students attending the opening session of the AI orientation"
  // }
];

function element(tag, text, className) {
  const node = document.createElement(tag);

  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;

  return node;
}

function renderFeatured() {
  const featured = events[0];
  const panel = document.querySelector(".featured");

  if (!featured) {
    panel.hidden = true;
    return;
  }

  document.querySelector("#featured-title").textContent = featured.title;
  document.querySelector("#featured-summary").textContent = featured.summary;

  const link = document.querySelector("#featured-link");
  link.href = `#${featured.id}`;

  link.addEventListener("click", () => {
    const card = document.getElementById(featured.id);
    card.querySelector("details").open = true;
  });
}

function metaRow(label, value) {
  const row = element("div");
  row.append(element("dt", label), element("dd", value));
  return row;
}

function createEventCard(event) {
  const card = element("article", undefined, "event-card");
  card.id = event.id;

  const category = element(
    "p",
    `${event.category} · ${event.year}`,
    "event-type"
  );

  const details = element("details");
  const toggle = element("summary", "Schedule & registration");
  const meta = element("dl", undefined, "event-meta");

  meta.append(
    metaRow("Date", event.date),
    metaRow("Venue", event.venue)
  );

  details.append(toggle, meta);

  if (event.registrationUrl) {
    const register = element("a", "Register for this event ↗", "button register-button");
    register.href = event.registrationUrl;
    register.target = "_blank";
    register.rel = "noopener noreferrer";
    details.append(register);
  } else {
    details.append(
      element("p", "Registration link to be announced.", "registration-note")
    );
  }

  card.append(
    category,
    element("h3", event.title),
    element("p", event.summary),
    details
  );

  return card;
}

function renderEvents() {
  const list = document.querySelector("#event-list");

  if (!events.length) {
    list.append(element("p", "The next programme will be announced here."));
    return;
  }

  events.forEach(event => list.append(createEventCard(event)));
}

function renderNotices() {
  const list = document.querySelector("#notice-list");

  notices.forEach(notice => {
    const item = element("li");
    item.append(element("strong", notice.title), element("p", notice.text));
    list.append(item);
  });
}

function renderGallery() {
  const grid = document.querySelector("#gallery-grid");

  if (!galleryPhotos.length) {
    grid.append(
      element("p", "Event photographs will appear here after each programme.", "empty-gallery")
    );
    return;
  }

  galleryPhotos.forEach(photo => {
    const figure = element("figure");
    const image = element("img");
    image.src = photo.src;
    image.alt = photo.alt;
    image.loading = "lazy";

    const fullPhoto = element("a");
    fullPhoto.href = photo.src;
    fullPhoto.setAttribute("aria-label", `View full photograph: ${photo.caption}`);
    fullPhoto.append(image);

    figure.append(fullPhoto, element("figcaption", photo.caption));
    grid.append(figure);
  });
}

renderEvents();
renderFeatured();
renderNotices();
renderGallery();