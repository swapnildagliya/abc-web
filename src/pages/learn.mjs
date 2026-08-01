import { page, SITE, routeBar, marquee } from "../shell.mjs";

const FAQ_SCHEMA = JSON.stringify({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Do I need dance experience?", acceptedAnswer: { "@type": "Answer", text: "No prior experience is needed for Wednesday Bollyfolk, Yoga or Indian Dance Technique. Progressive classes list the foundation they expect." } },
    { "@type": "Question", name: "What does a semester cost?", acceptedAnswer: { "@type": "Answer", text: "Public full price is €173 for a 60-minute weekly class per semester. Indian Semi-Classical, at 75 minutes, is €202. Registration options continue through Shoonya Dance Centre." } },
    { "@type": "Question", name: "How long is the semester?", acceptedAnswer: { "@type": "Answer", text: "The semester runs from 14 September 2026 to 30 January 2027, with 14 to 16 weekly sessions depending on the class." } },
    { "@type": "Question", name: "Is there an age limit?", acceptedAnswer: { "@type": "Answer", text: "Most classes are open from age 12. Yoga is open from age 16. There is no upper age limit for open-level classes." } },
  ],
});

const def = {
  depth: 1,
  nav: "learn/",
  title: "Indian dance classes in Ghent — ABC",
  desc: "Indian dance classes in Ghent with Swapnil Dagliya: Bollyfolk, Bollywood, Bhangra, Garba, semi-classical, technique and yoga.",
  canonical: `${SITE}/learn/`,
  themeColor: "#FBC70F",
  ogImage: `${SITE}/assets/img/events/opendeurdag-2026.jpg`,
  bodyClass: "page-learn",
  cinematic: true,
  firstCue: "count in",
  headerLight: true,
  headerCta: { href: "#classes", label: "Find a class", glyph: "↓" },
  schemas: [FAQ_SCHEMA],
};

const body = `
    <section class="inner-hero t-yellow" id="top" aria-labelledby="page-title" data-scene data-cue="count in">
      <p class="ghost" aria-hidden="true">TRY</p>
      <p class="inner-index" aria-hidden="true">02 · Classes</p>
      <div class="inner-hero-copy">
        <p class="inner-kicker fx">Weekly classes · Ghent · Sep 2026</p>
        <h1 id="page-title"><span class="mask-line"><span>Start where</span></span><span class="mask-line"><span><em class="solo">your feet are.</em></span></span></h1>
        <p class="inner-hero-lead fx">Ten weekly classes with Swapnil Dagliya—from your first Bollyfolk step to advanced Bollywood and Indian semi-classical work.</p>
        <div class="button-row fx">
          <a class="button button-dark" href="#classes">See the timetable <span>↓</span></a>
          <a class="button button-outline" href="#trial">Try a class free <span>→</span></a>
        </div>
      </div>
      <div class="inner-hero-visual contain" style="align-self:end">
        <img class="fx-right drift" data-scrub style="--drift:-26px; max-height:72vh; width:auto; margin-inline:auto; filter: drop-shadow(0 24px 36px rgba(80,60,0,.35))" src="../assets/img/dancers/laurien-de-ridder.png" alt="ABC dancer Laurien De Ridder in a namaste greeting, mid-class costume" width="1168" height="1600">
        <p class="inner-hero-note script-note">no perfect feet required ↗</p>
        <div class="stamp stamp-blue" aria-hidden="true"><strong>Beginners</strong><span>very welcome</span></div>
      </div>
    </section>
    ${routeBar("../", "learn/")}
    ${marquee(["Start here", "Try free", "Find your rhythm", "Go deeper", "Perform"], { className: "t-night", speed: "24s" })}

    <section class="scene-pad t-paper" data-scene data-cue="ways in">
      <p class="label fx">Find your way in</p>
      <div class="intro">
        <h2 class="fx">What do you<br><em class="solo">want from it?</em></h2>
        <div class="intro-copy fx">
          <p>Indian dance is not one style, and beginners are not one kind of person. Choose by the feeling you want, then let technique grow from there.</p>
          <p>Classes take place at Shoonya Dance Centre in Ghent and run from September 2026 to January 2027.</p>
        </div>
      </div>
      <div class="card-grid">
        <article class="card fx"><small>I am brand new</small><h3>Bollyfolk or Yoga</h3><p>Open-level entry points with no prior dance experience required.</p></article>
        <article class="card fx"><small>I want energy</small><h3>Bhangra</h3><p>Big movement, strong shoulders and the unmistakable lift of the dhol.</p></article>
        <article class="card fx"><small>I want expression</small><h3>Bollywood</h3><p>Drama, musicality and performance energy shaped through choreography.</p></article>
        <article class="card fx"><small>I want precision</small><h3>Technique or semi-classical</h3><p>Footwork, turns, mudras, alignment and controlled expression.</p></article>
      </div>
    </section>

    <section class="scene-pad t-blue" id="trial" data-scene data-cue="try it free">
      <p class="label fx" style="color:var(--yellow)">Free trial week · 14–19 September</p>
      <div class="intro">
        <h2 class="fx">Try the classes<br><em class="solo">before you choose.</em></h2>
        <div class="intro-copy fx">
          <p>During the first week of the semester, you can attend Swapnil’s classes for free. No booking is needed—come to Shoonya Dance Centre and find the class that feels right.</p>
          <p class="editorial-line">Curiosity is enough for the first class.</p>
          <p><a class="button button-yellow" href="../contact/">Ask a class question <span>↗</span></a></p>
        </div>
      </div>
      <div class="stat-row fx">
        <div><b>10</b><span>Weekly classes</span></div>
        <div><b>3</b><span>Teaching evenings</span></div>
        <div><b>14–19</b><span>September trial week</span></div>
        <div><b>Ghent</b><span>Shoonya Dance Centre</span></div>
      </div>
    </section>

    <section class="scene-pad t-bone" id="classes" data-scene data-cue="the timetable">
      <p class="label fx">Sep 2026 – Jan 2027</p>
      <div class="intro">
        <h2 class="fx">The weekly<br><em class="solo">practice.</em></h2>
        <div class="intro-copy fx">
          <p>Tuesday, Wednesday and Thursday evenings at Shoonya Dance Centre, Stapelplein 41, Ghent.</p>
          <p>Level guidance protects the learning experience. Open-level classes welcome complete beginners; progressive classes build on an Indian dance foundation.</p>
        </div>
      </div>
      <div class="schedule">
        <div class="schedule-day fx">
          <div class="schedule-head"><b>Tuesday</b><small>18:30–21:40</small></div>
          <article class="class-cell"><small>Progressive</small><h3>Bollyfolk</h3><p>Cheraw and Lavani at a quicker pace. Best after an open-level semester.</p></article>
          <article class="class-cell"><small>Open level · 16+</small><h3>Yoga</h3><p>Iyengar-influenced alignment, breath and stillness for all bodies.</p></article>
          <article class="class-cell"><small>All levels</small><h3>Indian Dance Technique</h3><p>Alignment, footwork, Kathak turns, mudras and body control.</p></article>
        </div>
        <div class="schedule-day fx">
          <div class="schedule-head"><b>Wednesday</b><small>18:30–21:45</small></div>
          <article class="class-cell"><small>Open level</small><h3>Bollyfolk</h3><p>The main entry point: Garba and Khoriya this semester.</p></article>
          <article class="class-cell"><small>Foundation</small><h3>Bhangra</h3><p>Punjabi folk energy, shoulder work, jumps and rhythmic stamina.</p></article>
          <article class="class-cell"><small>Level 2</small><h3>Indian Semi-Classical</h3><p>Kathak-shaped footwork, mudras, eye expression and precision.</p></article>
        </div>
        <div class="schedule-day fx">
          <div class="schedule-head"><b>Thursday</b><small>18:30–20:30</small></div>
          <article class="class-cell"><small>Foundation</small><h3>Bollywood</h3><p>Expressive choreography with personality, musicality and drama.</p></article>
          <article class="class-cell"><small>Advanced</small><h3>Bollywood</h3><p>Technique-first choreography with clean timing and strong posture.</p></article>
          <article class="class-cell"><small>Across the week</small><h3>Starter pathways</h3><p>Short introductions support new Bhangra and semi-classical dancers.</p></article>
        </div>
      </div>
    </section>

    <section class="perf-break t-blue spot" data-scene data-stage data-cue="count it in">
      <div>
        <p class="break-kicker fx">Count it in</p>
        <h2 class="fx">No perfect feet.<em class="solo">Just a first beat.</em></h2>
      </div>
      <div class="break-side">
        <p class="script-note fx">begin anywhere.</p>
        <img class="break-mark fx" src="../assets/img/abc-mark-clean.png" alt="" loading="lazy" decoding="async" width="1351" height="1026">
      </div>
    </section>

    <section class="scene-pad t-yellow media-led" data-scene data-scrub data-cue="your teacher">
      <figure class="frame sweep fx-scale" style="aspect-ratio: 3/2; align-self:start">
        <img src="../assets/img/events/opendeurdag-2026.jpg" alt="A class mid-practice in the attic studio at Shoonya Dance Centre" loading="lazy" decoding="async" width="1400" height="933">
        <figcaption><span>Shoonya Dance Centre · Ghent</span></figcaption>
      </figure>
      <div>
        <p class="label fx">Your teacher</p>
        <h2 class="fx">Taught by<br><em class="solo">Swapnil.</em></h2>
        <p class="lead fx">Swapnil Dagliya is the artistic director of ABC and co-founder of Shoonya Dance Centre. He has taught and performed Indian dance since 2008, with training in Indian folk dance, contemporary dance and ballet.</p>
        <p class="lead fx">Classes connect movement to context. Folk, Bollywood and semi-classical forms keep their own vocabulary instead of being flattened into one generic style.</p>
        <p class="fx"><a class="button button-dark" href="../about/">Meet the company <span>→</span></a></p>
      </div>
    </section>

    <section class="scene-pad t-paper" id="at-home" data-scene data-cue="further afield">
      <span id="course"></span>
      <p class="label fx">At home and further afield</p>
      <div class="intro">
        <h2 class="fx">Not in Ghent?<br><em class="solo">Still covered.</em></h2>
        <div class="intro-copy fx">
          <p>Start with ten basic Bollywood steps at home, follow step-by-step folk tutorials, or bring Swapnil to a studio, festival or cultural organisation in your city.</p>
          <p>Private one-to-one coaching is also available online, built around your style, questions and pace.</p>
          <div class="button-row">
            <a class="button button-dark" href="../learn-to-dance-bollywood/">Start the free course <span>↗</span></a>
            <a class="button button-outline" href="../contact/">Ask about coaching <span>→</span></a>
          </div>
        </div>
      </div>
      <div class="card-grid">
        <article class="card fx"><small>01 · Free</small><h3>Bollywood basics</h3><p>Ten beginner steps designed to work with many Bollywood songs.</p></article>
        <article class="card fx"><small>02 · Worldwide</small><h3>Private coaching</h3><p>One-to-one sessions for Bollywood, Kalbeliya, Bhangra, folk and semi-classical work.</p></article>
        <article class="card fx"><small>03 · Europe</small><h3>Garba workshops</h3><p>Footwork, rhythm, circle flow and the community energy of Gujarat’s folk tradition.</p></article>
        <article class="card fx"><small>04 · Your city</small><h3>Guest teaching</h3><p>Workshops and collaborations for studios, festivals and cultural organisations.</p></article>
      </div>
    </section>

    <section class="scene-pad t-bone" data-scene data-cue="good questions">
      <p class="label fx">Questions about classes</p>
      <h2 class="fx" style="margin-bottom:1.6rem">Before your<br><em class="solo">first step.</em></h2>
      <div class="folds fx">
        <details><summary>Do I need dance experience?</summary><div class="fold-body prose"><p>No prior experience is needed for Wednesday Bollyfolk, Yoga or Indian Dance Technique. Progressive classes list the foundation they expect.</p></div></details>
        <details><summary>What does a semester cost?</summary><div class="fold-body prose"><p>Public full price is €173 for a 60-minute weekly class per semester. Indian Semi-Classical, at 75 minutes, is €202. Registration options continue through Shoonya Dance Centre.</p></div></details>
        <details><summary>How long is the semester?</summary><div class="fold-body prose"><p>The semester runs from 14 September 2026 to 30 January 2027, with 14 to 16 weekly sessions depending on the class.</p></div></details>
        <details><summary>Is there an age limit?</summary><div class="fold-body prose"><p>Most classes are open from age 12. Yoga is open from age 16. There is no upper age limit for open-level classes.</p></div></details>
      </div>
    </section>

    <section class="scene-pad t-night" data-scene data-cue="ten steps">
      <blockquote class="big-quote fx">
        <p>Ten steps. Zero audience. Your pace.</p>
        <cite><a class="text-link" href="../learn-to-dance-bollywood/">Start the free Bollywood course <span>→</span></a></cite>
      </blockquote>
    </section>

    <section class="scene-pad t-paper" data-scene data-cue="all the detail">
      <div class="intro">
        <div>
          <p class="label fx">All the detail</p>
          <h2 class="fx">Choose with<br><em class="solo">confidence.</em></h2>
        </div>
        <p class="intro-copy fx">Full class descriptions, online coaching and touring workshop information—kept out of the way until you want it.</p>
      </div>
      <div class="folds fx">
        <details id="class-guide"><summary>Weekly classes in Ghent</summary><div class="fold-body prose">
          <h2>Indian dance classes in Ghent — with Swapnil Dagliya</h2>
          <p>Swapnil Dagliya — Artistic Director of ABC a bollywood company, trained at Broadway Dance Center (New York) and Opus Ballet (Florence) — teaches 10 weekly Indian dance classes at Shoonya Dance Centre in Ghent. Bollywood, Bhangra, Bollyfolk, Garba, Semi-Classical, Indian Technique, and Yoga. Semester: Sep 2026 – Jan 2027.</p>
          <h3>Which class is right for me?</h3>
          <p><strong>I'm a total beginner and just want to have fun.</strong> Start with Bollyfolk (Wed) or Yoga — no experience needed, all levels welcome.</p>
          <p><strong>I want a massive cardio workout.</strong> You'll love Bhangra — high-energy, full-body, loud. Bollyfolk (Wed) is a great entry point first.</p>
          <p><strong>I love the drama and expressions of Bollywood films.</strong> Bollywood is your match — expressive choreography, personality, and performance energy.</p>
          <p><strong>I want to improve my balance, spins, and grace.</strong> Join Indian Semi-Classical or Indian Dance Technique — both focus on precision and control.</p>
          <h3>Enrollment opens twice a year. Your first week is always free.</h3>
          <p><strong>🍂 Fall/Winter semester (Sept – Feb).</strong> The fall semester runs from 14 September 2026 to 30 January 2027, with breaks for autumn (1–8 Nov) and winter holidays (20 Dec – 10 Jan). <strong>Free trial week: 14–19 September 2026.</strong> Attend any class free, no booking needed. Registration opens at <a href="https://shoonyadance.com" target="_blank" rel="noopener">shoonyadance.com</a>.</p>
          <p><strong>🌷 Spring/Summer semester (Feb – June).</strong> The spring semester runs from mid-February to mid-June 2027, with a break for Easter holidays. Free trial week in the first week of February. Registration opens in December 2026.</p>
          <p><strong>🔥 Winter &amp; Summer intensives.</strong> Between semesters, Swapnil Dagliya hosts multi-day Indian dance intensives at Shoonya Dance Centre. These bootcamps are designed to fast-track technique and act as a bridge into Level 2 or Level 3 classes the following semester. Next intensive: Indian Dance Summer Intensive — 26–29 August 2026 in Ghent. <a href="https://www.shoonyadance.com/calendar/indian-dance-summer-intensive-2026" target="_blank" rel="noreferrer noopener">See details →</a></p>
          <h3>Swapnil's classes · Sep 2026 – Jan 2027 · Shoonya Dance Centre, Ghent · Free trial week 14–19 Sep</h3>
          <h4>Tuesday evenings · 18:30–21:40</h4>
          <p><strong>Bollyfolk.</strong> Taught by Swapnil Dagliya. One or two regional folk traditions per semester — more complex choreography and a faster pace. This semester: Cheraw (bamboo dance from Mizoram) and Lavani (theatrical folk dance from Maharashtra). Best after a semester of Wednesday Bollyfolk. Age 12+.</p>
          <p><strong>Yoga.</strong> Iyengar-influenced yoga taught by Swapnil Dagliya, who completed his training in Pune in 2011. Emphasis on alignment, breath, and stillness. Open to all bodies and all levels. Age 16+.</p>
          <p><strong>Indian Dance Technique.</strong> Taught by Swapnil Dagliya. No choreography — just foundations: alignment, footwork, Kathak turns (chakkars), mudras, and body control. The class that makes every other Indian dance style feel cleaner and stronger. All levels. Age 12+.</p>
          <h4>Wednesday evenings · 18:30–21:45</h4>
          <p><strong>Bollyfolk.</strong> Taught by Swapnil Dagliya. The main entry point into Indian dance at ABC — a different regional folk tradition each semester. This semester: Garba from Gujarat and Khoriya from Haryana. No experience needed. Age 12+.</p>
          <p><strong>Bhangra.</strong> Taught by Swapnil Dagliya. The harvest dance of Punjab — high-energy, strong shoulder work, big jumps, and the unmistakable lift of the dhol drum. For dancers with an Indian dance foundation or one year of experience. Age 12+.</p>
          <p><strong>Indian Semi-Classical.</strong> Taught by Swapnil Dagliya. Between Kathak and Bollywood — precise footwork, mudras, and eye expression. For dancers with an Indian dance foundation or two years of experience. Age 12+.</p>
          <h4>Thursday evenings · 18:30–20:30</h4>
          <p><strong>Bollywood.</strong> Taught by Swapnil Dagliya. Expressive choreographies — some lyrical, some high-energy — with a focus on personality and drama. A good fit after a semester of Bollyfolk, or with a general dance background. Age 12+.</p>
          <p><strong>Bollywood.</strong> Taught by Swapnil Dagliya. Technique-first. Choreographies lean toward semi-classical — clean footwork, strong posture, tight timing. Best for dancers with 3+ years of experience. Top dancers may be invited to join ABC. Age 12+.</p>
        </div></details>
        <details id="online"><summary>Learn online</summary><div class="fold-body prose">
          <p class="lede">1:1 private coaching · Online via Zoom · Worldwide</p>
          <h2>Learn the dance. Not just the steps.</h2>
          <p>Private coaching is a 60-minute one-to-one Zoom session shaped around your goals, starting level and chosen style. It is separate from ABC’s in-person semester classes at Shoonya Dance Centre.</p>
          <h3>Styles</h3>
          <p>Choose from Kalbeliya, Bollywood, Bhangra, Indian folk or Indian semi-classical work. Complete beginners and experienced dancers are both welcome.</p>
          <h3>How it works</h3>
          <p>Sessions include live feedback, focused drills and practice notes. Mention your time zone and what you want to learn when you enquire.</p>
          <p><a class="button button-yellow" href="../contact/">Ask about private coaching <span>→</span></a></p>
        </div></details>
        <details id="garba-europe"><summary>Garba workshops across Europe</summary><div class="fold-body prose">
          <h2>Garba across Europe.</h2>
          <p>Swapnil teaches Garba as a living Gujarati folk practice: weight, rhythm, claps, turns and the collective flow of the circle—not only choreography.</p>
          <p>Workshops can be adapted for studios, festivals, cultural organisations, schools and community groups across Belgium and Europe.</p>
          <p><a class="button button-yellow" href="../contact/">Bring a Garba workshop to your city <span>→</span></a></p>
        </div></details>
      </div>
    </section>

    <section class="closing t-night" data-scene data-cue="first step">
      <div>
        <p class="label fx" style="color:var(--yellow)">Your first count</p>
        <h2 class="fx">Ready<br><em class="solo">to start?</em></h2>
        <p class="fx">Start with the free trial week or ask which class best fits your experience and goals.</p>
      </div>
      <p class="fx"><a class="button button-yellow" href="../contact/">Ask about classes <span>↗</span></a></p>
    </section>`;

export const outputs = () => [{ path: "learn/index.html", html: page(def, body) }];
export default { def, body: () => page(def, body) };
