// ============ i18n ============
const root = document.documentElement;
const STORE_KEY = "pos-lang";

function applyLang(lang) {
  root.setAttribute("data-lang", lang);
  document.querySelectorAll(".lang-toggle button").forEach(b => {
    b.classList.toggle("active", b.dataset.langSet === lang);
  });
  document.querySelectorAll("[data-en-placeholder]").forEach(el => {
    el.placeholder = el.getAttribute(`data-${lang}-placeholder`) || el.placeholder;
  });
  try { localStorage.setItem(STORE_KEY, lang); } catch (_) {}
}
const initialLang = (() => {
  try { const s = localStorage.getItem(STORE_KEY); if (s) return s; } catch (_) {}
  return (navigator.language || "en").toLowerCase().startsWith("zh") ? "zh" : "en";
})();
applyLang(initialLang);

document.querySelectorAll(".lang-toggle button").forEach(btn => {
  btn.addEventListener("click", () => applyLang(btn.dataset.langSet));
});

// ============ Atlas tabs ============
document.querySelectorAll("#atlas-tabs .atlas-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    const stage = tab.dataset.stage;
    document.querySelectorAll("#atlas-tabs .atlas-tab").forEach(t => t.classList.toggle("active", t === tab));
    document.querySelectorAll(".atlas-panel").forEach(p => {
      p.classList.toggle("active", p.dataset.stage === stage);
    });
  });
});

// ============ Emotion scenarios ============
const SCENARIOS = {
  meltdown: {
    under: {
      en: [
        ["Nervous system flooded.", " The child's prefrontal cortex has gone offline. They can't hear you because the survival circuits are running."],
        ["Public adds shame.", " Onlookers, lights, and noise raise the load. What looks like 'acting up' is the system overheating."],
        ["The need underneath is regulation.", " Not a lesson, not a consequence — first co-regulation, then everything else."]
      ],
      zh: [
        ["神经系统已经被淹没。", "孩子的前额叶暂时下线，他/她听不进你说的话，因为生存回路正在运行。"],
        ["公共场合还叠加了羞耻感。", "围观者、灯光和噪声进一步加压。看起来像"故意闹"，其实是系统过载。"],
        ["真正的需求是被调节。", "不是讲道理，也不是后果 —— 先共同调节，再谈其他。"]
      ]
    },
    do: {
      en: [
        ["Move first.", " Take them out of the public stimulus. Quiet space, lower voice, less light."],
        ["Drop your volume below theirs.", " Your calm body is the regulator. Sit, slow your breath, near them but not on them."],
        ["Name, don't fix.", " 'You really wanted that. It feels huge.' Don't argue with the feeling — let it move through."],
        ["Repair after, not during.", " When the storm passes, briefly review what we'll do next time. That's where the learning lives."]
      ],
      zh: [
        ["先移动场景。", "把孩子带离公共刺激。安静的地方、压低的嗓音、更柔和的光。"],
        ["把自己的音量降到比他/她更低。", "你平静的身体就是调节器。坐下来，放慢呼吸，靠近但不压迫。"],
        ["命名情绪，不要急着解决。", ""你真的很想要那个，那种感觉很大。"不要和情绪辩论 —— 让它流过去。"],
        ["修复留到风暴之后。", "情绪过去之后，再简短回顾下次怎么做。学习发生在那一刻。"]
      ]
    }
  },
  sibling: {
    under: {
      en: [
        ["Two children, one resource.", " Often a toy is just the surface — what's contested is fairness, attention, and rank."],
        ["Brain age matters.", " Younger sibling can't yet wait or share on demand. Older sibling can — but not all the time."],
        ["Don't pick a winner.", " Becoming the family judge installs you as a third party in every fight, forever."]
      ],
      zh: [
        ["两个孩子，一个资源。", "玩具往往只是表面 —— 真正在争的是公平、关注和地位。"],
        ["大脑年龄差很重要。", "弟妹还做不到说等就等、说分享就分享；哥哥姐姐能 —— 但不是任何时候都能。"],
        ["不要扮演判官。", "一旦成为家庭法官，你就会被永久安装在他们每一次冲突里。"]
      ]
    },
    do: {
      en: [
        ["Pause the scene.", " 'Stop. Both of you, hands off. We'll figure this out.'"],
        ["Reflect each side.", " 'You wanted to keep playing.' 'You wanted a turn.' Out loud, both heard."],
        ["Hand the problem back.", " 'You're both smart. What's a way both people get something?' Wait. Resist solving."],
        ["Coach, don't enforce.", " If they need help, offer two options, not a verdict. Repair between siblings is the goal — not your judgment."]
      ],
      zh: [
        ["先暂停。", ""停。两个人都把手放开。我们一起想办法。""],
        ["分别复述双方。", ""你想继续玩。""你想轮一次。"两个人都被听到。"],
        ["把问题还回去。", ""你们都很聪明，有没有一种办法让两个人都拿到一些？"等一会儿，忍住替他们解决。"],
        ["做教练，而不是执法。", "如果他们需要帮助，给两个选项，而不是判决。目标是兄弟姐妹之间修复，而不是你的裁定。"]
      ]
    }
  },
  refusal: {
    under: {
      en: [
        ["Refusal is information.", " It's not laziness — it usually marks overload, fear of failure, or a damaged sense of competence."],
        ["School-age children need autonomy.", " A demand triggers the same circuit as a threat. Refusal is the brake."],
        ["The relationship matters more than the worksheet.", " A child who feels controlled will resist on principle, even when the task is easy."]
      ],
      zh: [
        ["拒绝是一种信号。", "不是懒 —— 多半意味着负荷过大、害怕失败，或胜任感受损。"],
        ["学龄期孩子需要自主感。", "命令会触发与威胁相同的回路，拒绝就是刹车。"],
        ["关系比那张作业纸更重要。", "感到被控制的孩子，即使任务很简单也会出于原则反抗。"]
      ]
    },
    do: {
      en: [
        ["Get curious before you push.", " 'I'm noticing you really don't want to start. What's hard about it tonight?'"],
        ["Shrink the first step.", " 'Just write your name and the date. We'll see from there.' Done beats perfect."],
        ["Offer agency in form.", " Where to sit, which subject first, with music or without. Real choice, not a fake one."],
        ["Separate the task from the relationship.", " End the night with connection, not with a fight about page 3."]
      ],
      zh: [
        ["先好奇，再推进。", ""我注意到你今晚真的不想开始。今天有哪里特别难？""],
        ["把第一步缩到最小。", ""只写名字和日期，我们再看看。"完成胜过完美。"],
        ["在形式上给自主权。", "坐哪里、先做哪一科、要不要听音乐。真正的选择，不是假选项。"],
        ["把任务和关系区分开。", "用连接结束这一晚，而不是用关于第 3 页的争吵。"]
      ]
    }
  },
  lying: {
    under: {
      en: [
        ["Lying is developmental.", " Around 3–4 it's a cognitive milestone. Through childhood, lies usually protect against punishment or shame."],
        ["The harder the consequence, the better the lie.", " Children who fear severe response learn to hide, not to stop."],
        ["Truth needs a soft landing.", " If telling the truth costs more than hiding it, hiding wins."]
      ],
      zh: [
        ["说谎是发展的一部分。", "3–4 岁前后属于认知里程碑。儿童期的谎言多半是为了避免惩罚或羞耻。"],
        ["惩罚越重，谎言越精。", "害怕严厉反应的孩子学会的是更好地隐藏，而不是停止。"],
        ["真相需要柔和的着陆。", "如果说真话的代价比隐瞒更高，隐瞒就会赢。"]
      ]
    },
    do: {
      en: [
        ["Don't ask gotcha questions.", " If you already know, don't lay a trap. State what you saw, calmly."],
        ["Make truth-telling worth it.", " 'Telling me the truth is brave. We'll handle it together.' Reduce — don't remove — consequences for honesty."],
        ["Talk about the lie, not the character.", " 'You lied' not 'you're a liar'. Behavior is changeable; identity is sticky."],
        ["Repair, then a small consequence connected to the act.", " Pay back the cookie, write the apology — not punishments unrelated to the event."]
      ],
      zh: [
        ["别用"陷阱式提问"。", "如果你已经知道答案，就不要设套。平静地说出你看到的事实。"],
        ["让说真话有回报。", ""说真话是勇敢的。我们一起处理。"为诚实而减轻 —— 而不是免除 —— 后果。"],
        ["说"那次谎言"，不要说"你是骗子"。", "行为是可以改的，身份是粘人的。"],
        ["先修复，再给一个与事件相关的小后果。", "把饼干补上、写一个道歉 —— 而不是和事件无关的惩罚。"]
      ]
    }
  }
};

function renderEmotion(scenario) {
  const data = SCENARIOS[scenario];
  if (!data) return;
  const renderSide = (sideKey, target) => {
    const en = data[sideKey].en;
    const zh = data[sideKey].zh;
    target.innerHTML = en.map((step, i) => `
      <div class="emotion-step">
        <span lang="en"><b>${step[0]}</b>${step[1]}</span>
        <span lang="zh"><b>${zh[i][0]}</b>${zh[i][1]}</span>
      </div>
    `).join("");
  };
  renderSide("under", document.getElementById("emotion-under-body"));
  renderSide("do", document.getElementById("emotion-do-body"));
  applyLang(root.getAttribute("data-lang"));
}
renderEmotion("meltdown");

document.querySelectorAll("#scenario-picker .scenario-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#scenario-picker .scenario-btn").forEach(b => b.classList.toggle("active", b === btn));
    renderEmotion(btn.dataset.scenario);
  });
});

// ============ Decision Simulator ============
const SIM = {
  authoritarian: {
    en: [
      ["Tonight", "Door slamming stops; child apologizes. Underneath, anger is suppressed and the connection takes a hit they can't yet name."],
      ["Next month", "Behavior compliance improves at home. Less open expression — more sneaking, more lying when the cost of honesty is high."],
      ["Adolescence", "Higher rates of anxiety, lower self-esteem, weaker capacity to argue with authority figures (including bosses, partners)."],
      ["Adulthood", "Often successful externally, struggles with internal validation. Either over-controls own children or swings to permissive."]
    ],
    zh: [
      ["当晚", "摔门停止，孩子道歉。表层平息，深层的愤怒被压下去，关系受到一次孩子还无法命名的损伤。"],
      ["下个月", "在家的服从度提高，但表达减少 —— 更多偷偷做事、在诚实代价高时更倾向说谎。"],
      ["青春期", "焦虑水平更高，自尊更低，对权威（未来包括上司、伴侣）表达异议的能力更弱。"],
      ["成年后", "在外常常表现成功，但难以从内部肯定自己。日后要么过度控制自己的孩子，要么完全摆向放任。"]
    ]
  },
  permissive: {
    en: [
      ["Tonight", "Storm passes quickly. Child gets the sleepover, learns that intensity gets results."],
      ["Next month", "Limits feel arbitrary; bigger reactions to smaller no's. Bedtime, food, screen time all start to slip."],
      ["Adolescence", "Difficulty self-regulating frustration. Outsourced executive function — needs external rules to function under pressure."],
      ["Adulthood", "Higher reactivity to setbacks. Often warm and creative, but workplace boundaries and follow-through are pain points."]
    ],
    zh: [
      ["当晚", "风暴很快过去。孩子拿到了过夜，并学到：强度会带来结果。"],
      ["下个月", "边界开始显得随意，对更小的"不"也有更大的反应。就寝、吃饭、屏幕都开始失守。"],
      ["青春期", "对挫折的自我调节能力较弱，执行功能"外包"，在压力下依赖外部规则才能运行。"],
      ["成年后", "对挫折反应更强烈。通常温暖、有创造力，但在工作中的边界与执行力上常感到吃力。"]
    ]
  },
  authoritative: {
    en: [
      ["Tonight", "The 'hate you' lands; you don't argue with it. Child storms off; no escalation, no chase. The 'no' holds."],
      ["Within 24 hours", "You re-open: 'That was hard. I love you, the answer was still no.' Repair without softening the limit."],
      ["Next month", "Child trusts what you say. Limits don't become daily battles — energy moves to the relationship."],
      ["Adolescence", "Higher self-regulation, comes back when something is wrong, more likely to speak up rather than hide."],
      ["Adulthood", "Best long-run outcomes across studies: lower anxiety, stronger relationships, capacity to hold limits while staying warm."]
    ],
    zh: [
      ["当晚", ""我恨你"被你接住，但你不和它辩论。孩子甩门离开，事态没有升级，你也没有追上去。"不"被守住了。"],
      ["24 小时内", "你重新打开对话：&ldquo;刚才很难。我爱你，但答案仍然是不行。&rdquo;修复关系，但不软化边界。"],
      ["下个月", "孩子相信你说的话。边界不再是每天的战场，能量转移到关系上。"],
      ["青春期", "自我调节更好，遇到问题更愿意回来找你，更可能说出来，而不是藏起来。"],
      ["成年后", "在所有纵向研究中表现最好：焦虑更低、关系更强、能温暖地守住边界。"]
    ]
  }
};

function renderSim(style) {
  const data = SIM[style];
  const target = document.getElementById("sim-outcome");
  const head = `
    <div class="head"><span lang="en">PROJECTED OUTCOMES · evidence-aligned</span><span lang="zh">推演结果 · 与研究证据一致</span></div>
    <h4>
      <span lang="en">${style === "authoritarian" ? "Authoritarian" : style === "permissive" ? "Permissive" : "Authoritative"} response</span>
      <span lang="zh">${style === "authoritarian" ? "权威专制型" : style === "permissive" ? "放任溺爱型" : "权威民主型"}回应</span>
    </h4>
  `;
  const rows = data.en.map((row, i) => `
    <div class="outcome-row">
      <div class="horizon"><span lang="en">${row[0]}</span><span lang="zh">${data.zh[i][0]}</span></div>
      <div class="text"><span lang="en">${row[1]}</span><span lang="zh">${data.zh[i][1]}</span></div>
    </div>
  `).join("");
  target.innerHTML = head + rows;
  applyLang(root.getAttribute("data-lang"));
}
renderSim("authoritarian");

document.querySelectorAll("#sim-styles .sim-style").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll("#sim-styles .sim-style").forEach(c => c.classList.toggle("active", c === card));
    renderSim(card.dataset.style);
  });
});

// ============ AI Coach ============
const COACH = {
  "why-toddler-no": {
    q: { en: "Why does my 2-year-old say no to everything?", zh: "为什么 2 岁的孩子什么都说"不"？" },
    a: {
      en: [
        "<strong>What's happening:</strong> 'No' is a developmental milestone, not defiance. Around 18–30 months, children discover that they are a separate person from you — and the most economical way to mark that border is the word 'no'.",
        "<strong>What it tells you:</strong> the brain is doing exactly what it should. Selfhood requires opposition before it can hold preferences.",
        "<strong>What to try this week:</strong>",
        "• Offer two yes-options instead of yes/no questions ('milk or water?').<br>• Reduce non-essential commands. Save the firm yeses for safety and the things that really matter.<br>• Narrate their choosing back to them: 'You decided water. Got it.'<br>• Don't take the 'no' personally; it's the muscle, not a verdict on you."
      ],
      zh: [
        "<strong>正在发生的：</strong>"不"是一个发展里程碑，而不是顶撞。在 18–30 月之间，孩子发现自己是一个独立于你的人 —— 标记这条边界最经济的方式，就是"不"这个字。",
        "<strong>它告诉你的：</strong>大脑正在做该做的事。要有"自我"，必须先有"反对"。",
        "<strong>本周可以试试：</strong>",
        "• 给两个"是"的选项，而不是是/否问题（"喝牛奶还是喝水？"）。<br>• 减少非必要命令，把坚定的"是"留给安全和真正重要的事。<br>• 把他/她的选择复述回去："你选了水。好。"<br>• 不要把"不"当作针对你 —— 那是一块肌肉，不是对你的判决。"
      ]
    }
  },
  "screen-time": {
    q: { en: "How much screen time is OK at age 4?", zh: "4 岁孩子可以看多久屏幕？" },
    a: {
      en: [
        "<strong>Time is the wrong primary metric.</strong> What matters more: what content, in what context, with whom.",
        "<strong>A practical frame for age 4:</strong> aim for under ~1 hour of high-quality content on weekdays, ideally co-viewed for at least part of it. Avoid screens in the hour before bed (sleep-onset disruption is real at this age).",
        "<strong>Watch for:</strong>",
        "• Content that's algorithmically tuned for novelty (short-form video) — it trains attention to expect very high stimulation.<br>• Solo viewing replacing connection — same minutes alongside a parent are dramatically different developmentally.<br>• Trouble transitioning off — the post-screen meltdown is a signal, not bad behavior."
      ],
      zh: [
        "<strong>时长不是首要指标。</strong>更重要的是：内容是什么、什么场景、和谁一起看。",
        "<strong>4 岁的实际框架：</strong>工作日尽量控制在约 1 小时以内的高质量内容，其中至少一部分共同观看。睡前 1 小时不看屏幕（这个年龄段对入睡的干扰是真实的）。",
        "<strong>需要警惕：</strong>",
        "• 由算法按"新奇"调优的内容（短视频） —— 它会把注意力训练成期待极高的刺激。<br>• 独自观看替代了亲子连接 —— 同样的分钟数，独自看与陪伴看，对发展的意义完全不同。<br>• 关掉时的过渡困难 —— 看完后崩溃是一个信号，不是品行问题。"
      ]
    }
  },
  "anxious-school": {
    q: { en: "My 7-year-old is suddenly anxious about going to school.", zh: "我 7 岁的孩子突然很焦虑上学。" },
    a: {
      en: [
        "<strong>First, normalize but don't dismiss.</strong> School anxiety at 7 is common and almost always points to something specific underneath — a peer issue, an academic gap, a teacher dynamic, a transition (new sibling, move, illness).",
        "<strong>Investigate gently:</strong>",
        "• Side-by-side conversations work better than face-to-face — car, walk, while drawing.<br>• Ask about lunch, recess, the bathroom, and the bus separately. Anxiety often sits in one of those, not 'school'.<br>• Listen for the single recurring detail. That's where the answer is.",
        "<strong>What helps:</strong> a short, predictable goodbye ritual; staying connected with the teacher; reducing intensity at home (sleep, screens, scheduling) so the child has a wider tolerance window. Avoid grilling for the cause — that itself becomes a stressor."
      ],
      zh: [
        "<strong>先正常化，但不要轻描淡写。</strong>7 岁出现上学焦虑很常见，几乎都指向某个具体的原因 —— 同伴问题、学业落差、与老师的关系、过渡期（弟妹出生、搬家、生病）。",
        "<strong>温和地调查：</strong>",
        "• 并排对话比面对面更有效 —— 车上、散步时、画画时。<br>• 分开问午餐、课间、卫生间和校车。焦虑常常蹲在其中一处，而不是"学校"这个抽象概念里。<br>• 留意反复出现的那一个细节 —— 答案就在那里。",
        "<strong>有用的事：</strong>简短而可预测的告别仪式；与老师保持联系；降低家中的强度（睡眠、屏幕、日程），扩大孩子的耐受窗。不要追问根因 —— 追问本身会变成新的压力源。"
      ]
    }
  },
  "teen-distance": {
    q: { en: "My teen has gone distant. What should I do?", zh: "我的青少年孩子和我疏远了，该怎么办？" },
    a: {
      en: [
        "<strong>Distance is partly developmental.</strong> In adolescence, peer relationships move into the primary slot. That's normal and adaptive. Your job changes — from director to base camp.",
        "<strong>Lower your demand for talk.</strong> Increase quality of presence: shared activity, side-by-side, not interrogation. The car, the kitchen, late at night.",
        "<strong>Watch the signal, not just the silence:</strong>",
        "• Sleep change, social withdrawal across all friends, loss of joy in things they loved → take seriously.<br>• Distance from parents specifically, but still engaged with friends and interests → likely typical.",
        "<strong>Repair small gaps quickly.</strong> 'I was short with you yesterday — that was about my day, not you.' Over years, these small repairs are what they remember."
      ],
      zh: [
        "<strong>疏远部分是发展性的。</strong>青春期里同伴关系会进入"主关系"的位置。这正常，也是适应性的。你的角色从导演变成大本营。",
        "<strong>降低对"聊一聊"的需求。</strong>提升在场质量：一起做点事、并排而不是审讯。车上、厨房、深夜，是好的时机。",
        "<strong>看信号，而不只是看沉默：</strong>",
        "• 睡眠变化、对所有朋友都退缩、对原本喜爱的事失去兴趣 → 严肃对待。<br>• 只是与父母有距离，但与朋友和兴趣仍有连接 → 多数是典型的。",
        "<strong>小裂痕，及时修补。</strong>"昨天我对你有点冲，那是我自己的状态，跟你无关。"许多年后，他们记得的就是这些小修复。"
      ]
    }
  },
  "picky-eater": {
    q: { en: "My 5-year-old is a really picky eater.", zh: "我 5 岁的孩子非常挑食。" },
    a: {
      en: [
        "<strong>Picky eating peaks around 2–6.</strong> It's developmentally rooted in neophobia (caution around new foods) — historically, a survival feature.",
        "<strong>Two roles, clearly separated:</strong>",
        "• You decide <em>what</em>, <em>when</em>, <em>where</em>.<br>• Your child decides <em>whether</em> and <em>how much</em>.",
        "<strong>What helps over months, not days:</strong>",
        "• Serve a 'safe' food alongside any new one. Pressure-free exposure, often 10–15 times before acceptance.<br>• Family meals, no separate kid menu, no praise or punishment for eating.<br>• Cooking together — touching the food off the plate is the on-ramp."
      ],
      zh: [
        "<strong>挑食的高峰大约在 2–6 岁。</strong>它根植于"新食物恐惧"（对新食物保持警惕）—— 历史上这是一种生存机制。",
        "<strong>两个角色，分清楚：</strong>",
        "• 你决定<em>吃什么</em>、<em>什么时候吃</em>、<em>在哪里吃</em>。<br>• 孩子决定<em>吃不吃</em>、<em>吃多少</em>。",
        "<strong>以月为单位起作用的事：</strong>",
        "• 任何新食物旁边都搭一份"安全食物"。无压力地接触，通常需要 10–15 次才会接受。<br>• 全家一起吃饭，不准备"儿童菜单"，对吃与不吃都不表扬也不惩罚。<br>• 一起做饭 —— 在餐盘外接触食物，是上车的坡道。"
      ]
    }
  }
};

const stream = document.getElementById("assistant-stream");

function pushMsg(role, htmlEN, htmlZH) {
  const msg = document.createElement("div");
  msg.className = "msg" + (role === "user" ? " user" : "");
  msg.innerHTML = `
    <div class="role">${role === "user"
      ? '<span lang="en">You</span><span lang="zh">你</span>'
      : '<span lang="en">Coach</span><span lang="zh">教练</span>'}</div>
    <div class="bubble">
      <div lang="en">${htmlEN}</div>
      <div lang="zh">${htmlZH}</div>
    </div>
  `;
  stream.appendChild(msg);
  stream.scrollTo({ top: stream.scrollHeight, behavior: "smooth" });
}

function answer(key) {
  const item = COACH[key];
  if (!item) return;
  pushMsg("user", item.q.en, item.q.zh);
  setTimeout(() => {
    const en = item.a.en.map(p => `<p>${p}</p>`).join("");
    const zh = item.a.zh.map(p => `<p>${p}</p>`).join("");
    pushMsg("coach", en, zh);
  }, 320);
}

document.querySelectorAll(".assistant-pill").forEach(p => {
  p.addEventListener("click", () => answer(p.dataset.q));
});

document.getElementById("assistant-send").addEventListener("click", () => sendCustom());
document.getElementById("assistant-input").addEventListener("keydown", e => {
  if (e.key === "Enter") sendCustom();
});

function sendCustom() {
  const input = document.getElementById("assistant-input");
  const text = input.value.trim();
  if (!text) return;
  pushMsg("user", text, text);
  input.value = "";

  // Heuristic match against canned answers; otherwise generic helpful reply.
  const t = text.toLowerCase();
  let key = null;
  if (/(no|why.*say no|toddler|2 ?y|2[岁年])/.test(t) || /两岁|2岁|2 岁|不停说不|说不/.test(text)) key = "why-toddler-no";
  else if (/(screen|tablet|tv|phone|ipad)/.test(t) || /屏幕|手机|平板|看电视/.test(text)) key = "screen-time";
  else if (/(school|anxious|anxiety|worry)/.test(t) || /学校|焦虑|不想上学|害怕/.test(text)) key = "anxious-school";
  else if (/(teen|adolescen|distant|13|14|15|16|17)/.test(t) || /青少年|十几岁|疏远|青春期/.test(text)) key = "teen-distance";
  else if (/(picky|eat|food|meal)/.test(t) || /挑食|不吃饭|偏食|吃饭/.test(text)) key = "picky-eater";

  if (key) {
    setTimeout(() => {
      const item = COACH[key];
      const en = item.a.en.map(p => `<p>${p}</p>`).join("");
      const zh = item.a.zh.map(p => `<p>${p}</p>`).join("");
      pushMsg("coach", en, zh);
    }, 320);
  } else {
    setTimeout(() => {
      pushMsg("coach",
        "<p>I can help with this. To give you something useful rather than generic, can you share <strong>your child's age</strong> and one specific recent moment? The more concrete the situation, the more accurate the developmental read.</p>",
        "<p>我可以帮你想这个问题。为了给出真正有用而不是泛泛的建议，能否告诉我<strong>孩子的年龄</strong>和最近一次具体的情境？情境越具体，对发展阶段的判断就越准。</p>"
      );
    }, 320);
  }
}

// ============ Reveal on scroll ============
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
}, { rootMargin: "0px 0px -10% 0px" });
document.querySelectorAll(".section-head, .knowledge-card, .learning-block, .emotion-card, .family-item, .metric").forEach(el => {
  el.classList.add("fade-in");
  io.observe(el);
});
