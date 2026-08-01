import { page, SITE, routeBar } from "../shell.mjs";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const lessons = JSON.parse(readFileSync(fileURLToPath(new URL("../data/lessons.json", import.meta.url)), "utf8"));

const COURSE_SCHEMA = JSON.stringify({
  "@context": "https://schema.org", "@type": "Course",
  name: "Learn to dance Bollywood",
  description: "Ten free beginner Bollywood dance lessons with Swapnil Dagliya. Learn practical steps at home and use them with the music you love.",
  provider: { "@type": "Organization", name: "ABC a bollywood company", url: `${SITE}/` },
  hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "Ten self-paced video lessons" },
});

/* ---------- hub ---------- */
const hubDef = {
  depth: 1,
  nav: "learn/",
  title: "Learn to dance Bollywood — Free beginner course | ABC",
  desc: "Ten free beginner Bollywood dance lessons with Swapnil Dagliya. Learn practical steps at home and use them with the music you love.",
  canonical: `${SITE}/learn-to-dance-bollywood/`,
  themeColor: "#FBC70F",
  ogImage: `${SITE}/assets/img/gidf/finale-hero.jpg`,
  bodyClass: "page-course",
  firstCue: "watch",
  headerLight: true,
  headerCta: { href: "../learn/", label: "Start dancing", glyph: "↗" },
  schemas: [COURSE_SCHEMA],
};

// order lessons: basics = the 5 "lesson-N-*" of chapter 1 (per Codex hub listing)
const basics = ["lesson-1-step-touch", "lesson-2-dip", "lesson-3-around-the-world", "lesson-4-cross", "lesson-5-touch-up-revision"];
const advance = ["lesson-1-dip-variations", "lesson-2-swings", "lesson-3-sexy-girl", "lesson-4-flowers", "lesson-5-shoulder-step"];
const bySlug = Object.fromEntries(lessons.map(l => [l.slug, l]));
const lessonName = (slug) => bySlug[slug].h1.replace(/<[^>]*>/g, " ").replace(/Lesson \d+:\s*/i, "").trim();

function lessonRow(slug, index) {
  return `<li class="fx"><a href="${slug}/"><small>0${index + 1}</small><strong>${lessonName(slug)}</strong><span>Watch lesson →</span></a></li>`;
}

const hubBody = `
    <section class="course-hero t-yellow" id="top" aria-labelledby="page-title" data-scene data-cue="watch">
      <p class="ghost" aria-hidden="true">PLAY</p>
      <div>
        <p class="inner-kicker fx">Free course · Beginners · At home</p>
        <h1 id="page-title"><span class="mask-line"><span>Learn to dance</span></span><span class="mask-line"><span><em class="solo">Bollywood.</em></span></span></h1>
        <p class="inner-hero-lead fx">Ten useful steps, taught with context and enough freedom to make them your own. No mirror wall, no audience, no perfect feet required.</p>
        <div class="button-row fx">
          <a class="button button-dark" href="#lessons">Start lesson one <span>↓</span></a>
          <a class="button button-outline" href="../learn/">See Ghent classes <span>↗</span></a>
        </div>
      </div>
      <aside class="course-side" aria-label="Course facts">
        <b class="fx">10</b>
        <span class="fx">Free video lessons</span>
        <p class="script-note fx">any clear patch of floor will do.</p>
      </aside>
      <div class="stamp stamp-blue" aria-hidden="true"><strong>Free</strong><span>10 lessons</span></div>
    </section>
    ${routeBar("../", "learn/")}

    <section class="scene-pad t-paper" data-scene data-cue="try">
      <div class="intro">
        <h2 class="fx">A vocabulary<br><em class="solo">you can use.</em></h2>
        <div class="intro-copy fx">
          <p>Always wanted to dance Bollywood but did not know where to begin—or felt too shy to try the steps in front of other people? Start here.</p>
          <p>The first chapter gives you five versatile basics. The second adds variations, folk influences and more expressive movement. Put them together in any order and try them with different songs.</p>
        </div>
      </div>
      <div class="stat-row fx">
        <div><b>Free</b><span>No registration</span></div>
        <div><b>10</b><span>Practical steps</span></div>
        <div><b>2</b><span>Learning chapters</span></div>
        <div><b>You</b><span>Set the pace</span></div>
      </div>
    </section>

    <section class="perf-break t-blue spot" data-scene data-stage data-cue="your floor counts">
      <div>
        <p class="break-kicker fx">Your floor counts</p>
        <h2 class="fx">Watch. Try.<em class="solo">Laugh. Repeat.</em></h2>
      </div>
      <div class="break-side">
        <p class="script-note fx">no audience required.</p>
        <img class="break-mark fx" src="../assets/img/abc-mark-clean.png" alt="" loading="lazy" decoding="async" width="1351" height="1026">
      </div>
    </section>

    <section class="scene-pad t-bone" id="lessons" data-scene data-cue="repeat">
      <p class="label fx">The full course</p>
      <h2 class="fx" style="margin-bottom:1rem">Start simple.<br><em class="solo">Then play.</em></h2>
      <div class="chapter">
        <div class="chapter-head fx"><h3>The basics</h3><span>5 lessons</span></div>
        <ol class="lesson-list">
          ${basics.map(lessonRow).join("\n          ")}
        </ol>
      </div>
      <div class="chapter">
        <div class="chapter-head fx"><h3>Let’s advance</h3><span>5 lessons</span></div>
        <ol class="lesson-list">
          ${advance.map(lessonRow).join("\n          ")}
        </ol>
      </div>
    </section>

    <section class="closing t-night" data-scene data-cue="keep going">
      <div>
        <p class="label fx" style="color:var(--yellow)">After the ten steps</p>
        <h2 class="fx">Want to learn<br><em class="solo">with a teacher?</em></h2>
        <p class="fx">Continue online or join ABC’s weekly Indian dance classes at Shoonya Dance Centre in Ghent.</p>
      </div>
      <p class="fx"><a class="button button-yellow" href="../learn/">Explore classes <span>↗</span></a></p>
    </section>`;

/* ---------- lesson pages ---------- */
function lessonPage(lesson) {
  const def = {
    depth: 2,
    nav: "learn/",
    title: lesson.title,
    desc: lesson.desc.replaceAll("&quot;", '"'),
    canonical: `${SITE}/learn-to-dance-bollywood/${lesson.slug}/`,
    themeColor: "#FBC70F",
    ogImage: `${SITE}/assets/img/gidf/finale-hero.jpg`,
    bodyClass: "page-course page-lesson",
    firstCue: "watch",
    headerLight: true,
    headerCta: { href: "../../learn/", label: "Start dancing", glyph: "↗" },
    schemas: [JSON.stringify([
      {
        "@context": "https://schema.org", "@type": "VideoObject",
        name: lesson.videoName, embedUrl: lesson.embed, contentUrl: lesson.contentUrl,
        thumbnailUrl: lesson.thumb, description: lesson.videoDesc, uploadDate: lesson.uploadDate,
      },
      {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Learn to dance Bollywood", item: `${SITE}/learn-to-dance-bollywood/` },
          { "@type": "ListItem", position: 3, name: lesson.videoName },
        ],
      },
    ])],
  };

  const nextLink = lesson.next
    ? `<a href="${lesson.next}"><small>Next →</small><strong>${lesson.nextLabel}</strong></a>`
    : `<a href="../"><small>That’s ten!</small><strong>Back to the course</strong></a>`;

  const body = `
    <section class="lesson-hero t-yellow" id="top" aria-labelledby="page-title" data-scene data-cue="watch">
      <p class="ghost" aria-hidden="true">${lesson.number}</p>
      <p class="lesson-track fx">${lesson.track}</p>
      <h1 id="page-title"><span class="mask-line"><span>${lesson.h1.replace(/<em>/, '</span></span><span class="mask-line"><span><em class="solo">')}</span></span></h1>
      <div class="stamp stamp-blue" aria-hidden="true"><strong>Pause</strong><span>rewind · repeat</span></div>
    </section>
    ${routeBar("../../", "learn/")}
    <section class="lesson-video-wrap t-bone" data-scene data-cue="try">
      <div class="lesson-video-head">
        <p class="fx">Press play · move at your pace</p>
        <span class="script-note fx">pause, rewind, laugh, repeat.</span>
      </div>
      <div class="video-frame fx-scale">
        <iframe src="${lesson.embed}" title="${lesson.videoName} video lesson" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </section>
    <aside class="lesson-moment" data-scene data-cue="try">
      <small class="fx">One move · many versions</small>
      <p class="fx">Missed the beat? Good. Now you know where it is.</p>
    </aside>
    <section class="lesson-copy t-bone" data-scene data-cue="repeat">
      <h2 class="fx">${lesson.copyHead}</h2>
      <div class="fx prose">${lesson.copyBody}</div>
    </section>
    <nav class="lesson-nav" aria-label="Course lessons" data-scene>
      <a class="fx" href="${lesson.prev}"><small>← Previous</small><strong>${lesson.prevLabel}</strong></a>
      <a class="fx" href="../"><small>Course</small><strong>All 10 lessons</strong></a>
      ${nextLink.replace("<a ", '<a class="fx" ')}
    </nav>`;

  return { path: `learn-to-dance-bollywood/${lesson.slug}/index.html`, html: page(def, body) };
}

export const outputs = () => [
  { path: "learn-to-dance-bollywood/index.html", html: page(hubDef, hubBody) },
  ...lessons.map(lessonPage),
];
export default { def: hubDef, body: () => page(hubDef, hubBody) };
