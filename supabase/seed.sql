-- ============================================================
-- Smart Study — Seed Data
-- ============================================================
-- HOW TO USE:
--   1. Open the Supabase SQL Editor for your project.
--   2. Create one real user through your app's sign-up flow (or
--      use the Supabase Auth dashboard to invite a user).
--   3. Copy that user's UUID from Authentication → Users.
--   4. Replace EVERY occurrence of
--        '00000000-0000-0000-0000-000000000001'
--      with your actual user UUID.
--   5. Paste this entire file into the SQL Editor and click Run.
-- ============================================================

-- ── convenience: store the demo user id once ────────────────
do $$
declare
  v_user_id   uuid := '1ce9c943-9e6d-420d-8831-89d45a0c12a3'; -- ← REPLACE ME

  -- subject ids
  s_math      uuid := gen_random_uuid();
  s_science   uuid := gen_random_uuid();
  s_history   uuid := gen_random_uuid();
  s_english   uuid := gen_random_uuid();
  s_cs        uuid := gen_random_uuid();

  -- chapter ids  (math)
  c_algebra   uuid := gen_random_uuid();
  c_geometry  uuid := gen_random_uuid();
  c_calculus  uuid := gen_random_uuid();

  -- chapter ids  (science)
  c_physics   uuid := gen_random_uuid();
  c_chemistry uuid := gen_random_uuid();
  c_biology   uuid := gen_random_uuid();

  -- chapter ids  (history)
  c_ancient   uuid := gen_random_uuid();
  c_modern    uuid := gen_random_uuid();
  c_ww2       uuid := gen_random_uuid();

  -- chapter ids  (english)
  c_grammar   uuid := gen_random_uuid();
  c_poetry    uuid := gen_random_uuid();
  c_prose     uuid := gen_random_uuid();

  -- chapter ids  (cs)
  c_dsa       uuid := gen_random_uuid();
  c_os        uuid := gen_random_uuid();
  c_dbms      uuid := gen_random_uuid();

begin

-- ════════════════════════════════════════════════════════════
-- 1. SUBJECTS
-- ════════════════════════════════════════════════════════════
insert into subjects (id, user_id, name) values
  (s_math,    v_user_id, 'Mathematics'),
  (s_science, v_user_id, 'Science'),
  (s_history, v_user_id, 'History'),
  (s_english, v_user_id, 'English'),
  (s_cs,      v_user_id, 'Computer Science');

-- ════════════════════════════════════════════════════════════
-- 2. CHAPTERS
-- ════════════════════════════════════════════════════════════

-- Mathematics
insert into chapters (id, subject_id, user_id, name) values
  (c_algebra,  s_math, v_user_id, 'Algebra'),
  (c_geometry, s_math, v_user_id, 'Geometry'),
  (c_calculus, s_math, v_user_id, 'Calculus');

-- Science
insert into chapters (id, subject_id, user_id, name) values
  (c_physics,   s_science, v_user_id, 'Physics – Motion & Forces'),
  (c_chemistry, s_science, v_user_id, 'Chemistry – Periodic Table'),
  (c_biology,   s_science, v_user_id, 'Biology – Cell Structure');

-- History
insert into chapters (id, subject_id, user_id, name) values
  (c_ancient, s_history, v_user_id, 'Ancient Civilizations'),
  (c_modern,  s_history, v_user_id, 'Modern Era (1800–1945)'),
  (c_ww2,     s_history, v_user_id, 'World War II');

-- English
insert into chapters (id, subject_id, user_id, name) values
  (c_grammar, s_english, v_user_id, 'Grammar & Sentence Structure'),
  (c_poetry,  s_english, v_user_id, 'Poetry Analysis'),
  (c_prose,   s_english, v_user_id, 'Prose & Fiction');

-- Computer Science
insert into chapters (id, subject_id, user_id, name) values
  (c_dsa,  s_cs, v_user_id, 'Data Structures & Algorithms'),
  (c_os,   s_cs, v_user_id, 'Operating Systems'),
  (c_dbms, s_cs, v_user_id, 'Database Management');

-- ════════════════════════════════════════════════════════════
-- 3. STUDY SESSIONS  (question + answer + all four AI outputs)
-- ════════════════════════════════════════════════════════════

-- ────────────────────────────────────────────────────────────
-- ALGEBRA
-- ────────────────────────────────────────────────────────────
insert into study_sessions
  (user_id, chapter_id, question, raw_answer, easy_points, important_points, flashcards, flowchart_mermaid)
values (
  v_user_id, c_algebra,
  'What is a quadratic equation and how do you solve it?',
  'A quadratic equation is a polynomial equation of degree 2, written as ax²+bx+c=0. It can be solved by factoring, completing the square, or using the quadratic formula: x = (-b ± √(b²-4ac)) / 2a. The discriminant b²-4ac tells us the nature of roots.',
  '["A quadratic equation has degree 2: ax²+bx+c=0",
    "Three solving methods: factoring, completing the square, quadratic formula",
    "The quadratic formula always works even when factoring is hard",
    "Roots can be real or complex depending on the discriminant"]'::jsonb,
  '["Quadratic formula: x = (-b ± √(b²−4ac)) / 2a — memorise this",
    "Discriminant (b²−4ac) > 0 → two real roots; = 0 → one real root; < 0 → complex roots",
    "Completing the square converts ax²+bx+c into vertex form a(x−h)²+k"]'::jsonb,
  '[{"q":"What is the standard form of a quadratic equation?","a":"ax² + bx + c = 0, where a ≠ 0"},
    {"q":"State the quadratic formula","a":"x = (−b ± √(b²−4ac)) / 2a"},
    {"q":"What does a negative discriminant mean?","a":"The equation has no real roots; roots are complex/imaginary"}]'::jsonb,
  'flowchart TD
    A[Quadratic Equation ax²+bx+c=0] --> B{Can you factor it?}
    B -- Yes --> C[Factor and set each factor = 0]
    B -- No --> D{Complete the square or use formula}
    D --> E[Apply quadratic formula]
    C --> F[Find roots x₁ and x₂]
    E --> F'
);

insert into study_sessions
  (user_id, chapter_id, question, raw_answer, easy_points, important_points, flashcards, flowchart_mermaid)
values (
  v_user_id, c_algebra,
  'Explain linear equations and their graphs.',
  'A linear equation in one variable looks like ax+b=0 and has exactly one solution. In two variables y=mx+b, it produces a straight line on a graph. m is the slope (rise/run) and b is the y-intercept. Two lines can be parallel (same slope), perpendicular (slopes multiply to -1), or intersecting.',
  '["Linear equations produce straight-line graphs",
    "Slope m = rise/run tells you how steep the line is",
    "y-intercept b is where the line crosses the y-axis",
    "Parallel lines share the same slope"]'::jsonb,
  '["Slope-intercept form: y = mx + b — the most useful form for graphing",
    "Two lines are perpendicular when m₁ × m₂ = −1",
    "Systems of linear equations can be solved by substitution or elimination"]'::jsonb,
  '[{"q":"What is slope-intercept form?","a":"y = mx + b, where m is slope and b is y-intercept"},
    {"q":"How are perpendicular slopes related?","a":"Their product equals −1 (they are negative reciprocals)"},
    {"q":"What does a slope of 0 mean?","a":"The line is horizontal"}]'::jsonb,
  'flowchart LR
    A[Linear Equation y=mx+b] --> B[Identify slope m]
    A --> C[Identify y-intercept b]
    B --> D[Plot second point using rise/run]
    C --> E[Plot point 0,b]
    D & E --> F[Draw line through both points]'
);

-- ────────────────────────────────────────────────────────────
-- GEOMETRY
-- ────────────────────────────────────────────────────────────
insert into study_sessions
  (user_id, chapter_id, question, raw_answer, easy_points, important_points, flashcards, flowchart_mermaid)
values (
  v_user_id, c_geometry,
  'What is the Pythagorean theorem and where is it used?',
  'The Pythagorean theorem states that in a right-angled triangle, the square of the hypotenuse equals the sum of squares of the other two sides: a²+b²=c². It is used to find missing side lengths, check if a triangle is right-angled, calculate distances in coordinate geometry, and in many real-world engineering problems.',
  '["Only applies to right-angled triangles",
    "The hypotenuse is always the longest side, opposite the right angle",
    "Formula: a² + b² = c²",
    "Useful in maps, construction, and navigation"]'::jsonb,
  '["Pythagorean theorem: a² + b² = c² (c = hypotenuse)",
    "Pythagorean triples (e.g. 3-4-5, 5-12-13) are whole-number solutions worth memorising",
    "Distance formula in coordinate geometry derives directly from this theorem"]'::jsonb,
  '[{"q":"State the Pythagorean theorem","a":"a² + b² = c², where c is the hypotenuse"},
    {"q":"Name a common Pythagorean triple","a":"3-4-5 (and multiples like 6-8-10)"},
    {"q":"How do you check if a triangle is right-angled?","a":"Verify whether a² + b² = c² holds for its sides"}]'::jsonb,
  'flowchart TD
    A[Right Triangle] --> B[Label sides a, b and hypotenuse c]
    B --> C{Known sides?}
    C -- Two sides known --> D[Apply a²+b²=c²]
    C -- All three given --> E[Check if a²+b²=c²]
    D --> F[Solve for missing side]
    E --> G{Is it a right triangle?}'
);

-- ────────────────────────────────────────────────────────────
-- CALCULUS
-- ────────────────────────────────────────────────────────────
insert into study_sessions
  (user_id, chapter_id, question, raw_answer, easy_points, important_points, flashcards, flowchart_mermaid)
values (
  v_user_id, c_calculus,
  'What is a derivative and how is it calculated?',
  'A derivative measures the instantaneous rate of change of a function with respect to a variable. Geometrically, it is the slope of the tangent line at a point. Basic rules include the power rule (d/dx xⁿ = nxⁿ⁻¹), product rule, quotient rule, and chain rule. Derivatives are used in optimization, physics (velocity/acceleration), and economics.',
  '["A derivative is the instantaneous rate of change",
    "Geometrically it represents the slope of the tangent line",
    "Power rule: d/dx xⁿ = nxⁿ⁻¹",
    "Used to find maxima and minima of functions"]'::jsonb,
  '["Power rule: d/dx xⁿ = nxⁿ⁻¹ — the most-used differentiation rule",
    "Chain rule: d/dx f(g(x)) = f′(g(x))·g′(x) — essential for composite functions",
    "Setting f′(x) = 0 finds critical points (potential maxima/minima)"]'::jsonb,
  '[{"q":"What does a derivative represent geometrically?","a":"The slope of the tangent line to the curve at that point"},
    {"q":"State the power rule for derivatives","a":"d/dx xⁿ = nxⁿ⁻¹"},
    {"q":"What is the chain rule used for?","a":"Differentiating composite functions: d/dx f(g(x)) = f′(g(x))·g′(x)"}]'::jsonb,
  'flowchart TD
    A[Function f of x] --> B{Rule to apply?}
    B -- Polynomial --> C[Power Rule: d/dx xⁿ = nxⁿ⁻¹]
    B -- Product --> D[Product Rule: uv′ + vu′]
    B -- Quotient --> E[Quotient Rule: vu′−uv′ / v²]
    B -- Composite --> F[Chain Rule: f′g·g′]
    C & D & E & F --> G[Derivative f′ of x]'
);

-- ────────────────────────────────────────────────────────────
-- PHYSICS – MOTION & FORCES
-- ────────────────────────────────────────────────────────────
insert into study_sessions
  (user_id, chapter_id, question, raw_answer, easy_points, important_points, flashcards, flowchart_mermaid)
values (
  v_user_id, c_physics,
  'State Newton''s three laws of motion.',
  'Newton''s First Law (Inertia): An object stays at rest or in uniform motion unless acted on by a net external force. Second Law: F=ma — net force equals mass times acceleration. Third Law: For every action there is an equal and opposite reaction. These laws form the foundation of classical mechanics.',
  '["First Law: objects resist changes in motion (inertia)",
    "Second Law: F = ma links force, mass, and acceleration",
    "Third Law: every action has an equal and opposite reaction",
    "These laws apply at everyday (non-relativistic) speeds"]'::jsonb,
  '["F = ma is the most important equation in classical mechanics — know all three variables",
    "Inertia is proportional to mass; heavier objects are harder to accelerate",
    "Third Law pairs always act on different objects — they never cancel each other"]'::jsonb,
  '[{"q":"State Newton''s First Law","a":"An object at rest stays at rest, and an object in motion stays in motion, unless acted on by a net external force"},
    {"q":"What does F = ma stand for?","a":"Force = mass × acceleration"},
    {"q":"Give an example of Newton''s Third Law","a":"A rocket expels gas downward (action); the gas pushes the rocket upward (reaction)"}]'::jsonb,
  'flowchart LR
    A[Net Force Applied to Object] --> B{F = 0?}
    B -- Yes --> C[Object remains at rest or constant velocity First Law]
    B -- No --> D[Calculate acceleration a = F/m Second Law]
    D --> E[Object accelerates in direction of F]
    E --> F[Reaction force on source Third Law]'
);

-- ────────────────────────────────────────────────────────────
-- CHEMISTRY – PERIODIC TABLE
-- ────────────────────────────────────────────────────────────
insert into study_sessions
  (user_id, chapter_id, question, raw_answer, easy_points, important_points, flashcards, flowchart_mermaid)
values (
  v_user_id, c_chemistry,
  'How is the periodic table organised and what are periodic trends?',
  'The periodic table arranges elements by increasing atomic number. Elements in the same group (column) share similar chemical properties due to the same number of valence electrons. Periods (rows) indicate the highest energy level. Key trends: atomic radius decreases left-to-right; ionisation energy and electronegativity increase left-to-right; both properties reverse going down a group.',
  '["Elements are arranged by increasing atomic number",
    "Groups (columns) share similar properties",
    "Periods (rows) correspond to energy levels",
    "Metals are on the left, non-metals on the right"]'::jsonb,
  '["Atomic radius decreases across a period (more protons pull electrons closer)",
    "Ionisation energy increases across a period (harder to remove electrons)",
    "Electronegativity increases across a period and decreases down a group",
    "Noble gases (Group 18) have full valence shells and are largely inert"]'::jsonb,
  '[{"q":"Why do elements in the same group behave similarly?","a":"They have the same number of valence electrons"},
    {"q":"What happens to atomic radius across a period?","a":"It decreases because more protons attract electrons more strongly"},
    {"q":"Which group contains noble gases?","a":"Group 18"}]'::jsonb,
  'flowchart TD
    A[Element in Periodic Table] --> B[Find its Group column]
    A --> C[Find its Period row]
    B --> D[Valence electrons = Group number for main groups]
    C --> E[Energy levels = Period number]
    D & E --> F[Predict chemical properties and reactivity]'
);

-- ────────────────────────────────────────────────────────────
-- BIOLOGY – CELL STRUCTURE
-- ────────────────────────────────────────────────────────────
insert into study_sessions
  (user_id, chapter_id, question, raw_answer, easy_points, important_points, flashcards, flowchart_mermaid)
values (
  v_user_id, c_biology,
  'What are the differences between prokaryotic and eukaryotic cells?',
  'Prokaryotic cells (bacteria, archaea) have no membrane-bound nucleus; their DNA is in a nucleoid region. They are smaller and simpler, with no membrane-bound organelles. Eukaryotic cells (animals, plants, fungi, protists) have a true nucleus enclosed by a nuclear envelope and contain membrane-bound organelles like mitochondria, ER, and Golgi apparatus. Plant cells also have chloroplasts and a rigid cell wall.',
  '["Prokaryotes have no true nucleus; DNA floats in the nucleoid",
    "Eukaryotes have a membrane-bound nucleus",
    "Prokaryotes are generally smaller (~1–10 µm) than eukaryotes (~10–100 µm)",
    "Plant cells have chloroplasts and a cell wall; animal cells do not"]'::jsonb,
  '["The nucleus is the defining feature that separates eukaryotes from prokaryotes",
    "Mitochondria (powerhouse) are present in almost all eukaryotic cells",
    "Chloroplasts carry out photosynthesis and are unique to plant/algae cells",
    "Both cell types have ribosomes, a cell membrane, and cytoplasm"]'::jsonb,
  '[{"q":"What is the key structural difference between prokaryotes and eukaryotes?","a":"Eukaryotes have a membrane-bound nucleus; prokaryotes do not"},
    {"q":"Name the organelle responsible for energy production","a":"Mitochondria (the powerhouse of the cell)"},
    {"q":"Which organelle is unique to plant cells and performs photosynthesis?","a":"Chloroplast"}]'::jsonb,
  'flowchart TD
    A[Cell] --> B{Has membrane-bound nucleus?}
    B -- No --> C[Prokaryote e.g. bacteria]
    B -- Yes --> D[Eukaryote]
    D --> E{Has chloroplasts?}
    E -- Yes --> F[Plant or Algae cell]
    E -- No --> G[Animal or Fungal cell]'
);

-- ────────────────────────────────────────────────────────────
-- HISTORY – ANCIENT CIVILIZATIONS
-- ────────────────────────────────────────────────────────────
insert into study_sessions
  (user_id, chapter_id, question, raw_answer, easy_points, important_points, flashcards, flowchart_mermaid)
values (
  v_user_id, c_ancient,
  'What were the key contributions of Ancient Egypt to civilization?',
  'Ancient Egypt developed one of the world''s earliest writing systems (hieroglyphics), monumental architecture (pyramids, temples), advanced mathematics and astronomy, mummification for religious preservation, a complex bureaucratic state, and papyrus as a writing material. The Nile River enabled agriculture and trade that sustained the civilisation for over 3,000 years.',
  '["Hieroglyphics was one of the first writing systems",
    "The Nile River was the lifeline of Egyptian civilisation",
    "Egyptians built the Great Pyramids as royal tombs",
    "Papyrus was an early form of paper"]'::jsonb,
  '["Egyptian mathematics included early concepts of geometry used in pyramid construction",
    "The 365-day solar calendar is an Egyptian invention that influenced our modern calendar",
    "Mummification reflects Egyptian beliefs in the afterlife, central to their religion",
    "Egypt''s administrative system was among the first complex bureaucracies in history"]'::jsonb,
  '[{"q":"What writing system did Ancient Egyptians use?","a":"Hieroglyphics — a system of pictographic and phonetic symbols"},
    {"q":"Why was the Nile River crucial to Egypt?","a":"It provided water for agriculture, enabled trade, and deposited rich silt for farming"},
    {"q":"What was papyrus used for?","a":"As a writing material, similar to modern paper, made from the papyrus plant"}]'::jsonb,
  'flowchart TD
    A[Ancient Egypt] --> B[Nile River]
    B --> C[Agriculture and food surplus]
    C --> D[Population growth and trade]
    D --> E[Complex government and bureaucracy]
    E --> F[Monuments: Pyramids and Temples]
    A --> G[Writing: Hieroglyphics and Papyrus]
    A --> H[Science: Calendar and Mathematics]'
);

-- ────────────────────────────────────────────────────────────
-- HISTORY – WORLD WAR II
-- ────────────────────────────────────────────────────────────
insert into study_sessions
  (user_id, chapter_id, question, raw_answer, easy_points, important_points, flashcards, flowchart_mermaid)
values (
  v_user_id, c_ww2,
  'What were the main causes of World War II?',
  'The main causes of WWII include: the harsh terms of the Treaty of Versailles (1919) which humiliated Germany; the Great Depression creating economic instability; the rise of fascism and Nazism under Hitler; appeasement policies by Britain and France; the failure of the League of Nations; and German expansionism (annexing Austria, invading Poland in 1939 which triggered the war).',
  '["Treaty of Versailles (1919) imposed heavy penalties on Germany",
    "The Great Depression caused mass unemployment and political instability",
    "Hitler rose to power exploiting Germany''s resentment",
    "Germany''s invasion of Poland in 1939 officially started the war"]'::jsonb,
  '["The policy of appeasement — allowing Hitler''s early expansions unchallenged — is seen as a critical mistake",
    "The failure of the League of Nations to enforce peace emboldened aggressors",
    "Nazi ideology of racial superiority directly led to the Holocaust",
    "The war ended with atomic bombs dropped on Hiroshima and Nagasaki (1945)"]'::jsonb,
  '[{"q":"What treaty ended WWI and contributed to WWII?","a":"The Treaty of Versailles (1919), which imposed harsh reparations and territorial losses on Germany"},
    {"q":"What event is considered the official start of WWII?","a":"Germany''s invasion of Poland on September 1, 1939"},
    {"q":"What was the policy of appeasement?","a":"The strategy of making concessions to aggressive powers to avoid war, practised by Britain and France"}]'::jsonb,
  'flowchart TD
    A[Treaty of Versailles 1919] --> B[German economic hardship and resentment]
    C[Great Depression 1929] --> B
    B --> D[Rise of Hitler and Nazi Party]
    D --> E[German expansionism: Austria and Czechoslovakia]
    E --> F[Appeasement by Britain and France]
    F --> G[Invasion of Poland 1939]
    G --> H[Britain and France declare war → WWII begins]'
);

-- ────────────────────────────────────────────────────────────
-- ENGLISH – GRAMMAR
-- ────────────────────────────────────────────────────────────
insert into study_sessions
  (user_id, chapter_id, question, raw_answer, easy_points, important_points, flashcards, flowchart_mermaid)
values (
  v_user_id, c_grammar,
  'What are the eight parts of speech in English?',
  'The eight parts of speech are: Noun (names a person, place, thing, or idea), Pronoun (replaces a noun), Verb (expresses action or state), Adjective (describes a noun), Adverb (modifies a verb, adjective, or other adverb), Preposition (shows relationship between elements), Conjunction (joins words or clauses), and Interjection (expresses sudden emotion).',
  '["Nouns name things; pronouns replace them",
    "Verbs express actions or states of being",
    "Adjectives describe nouns; adverbs modify verbs and adjectives",
    "Conjunctions join words, phrases, or clauses"]'::jsonb,
  '["Knowing the part of speech of a word helps identify its function in a sentence",
    "Coordinating conjunctions (FANBOYS: For And Nor But Or Yet So) are the most common",
    "A word can be different parts of speech depending on context (e.g. ''run'' as noun vs. verb)"]'::jsonb,
  '[{"q":"What is a conjunction?","a":"A word that joins words, phrases, or clauses (e.g. and, but, because)"},
    {"q":"What does an adverb modify?","a":"Verbs, adjectives, or other adverbs — often ends in -ly"},
    {"q":"Name the FANBOYS conjunctions","a":"For, And, Nor, But, Or, Yet, So"}]'::jsonb,
  'flowchart LR
    A[Word in a sentence] --> B{What does it do?}
    B -- Names something --> C[Noun]
    B -- Replaces a noun --> D[Pronoun]
    B -- Shows action/state --> E[Verb]
    B -- Describes a noun --> F[Adjective]
    B -- Modifies verb/adj --> G[Adverb]
    B -- Shows relationship --> H[Preposition]
    B -- Joins clauses --> I[Conjunction]
    B -- Expresses emotion --> J[Interjection]'
);

-- ────────────────────────────────────────────────────────────
-- COMPUTER SCIENCE – DATA STRUCTURES & ALGORITHMS
-- ────────────────────────────────────────────────────────────
insert into study_sessions
  (user_id, chapter_id, question, raw_answer, easy_points, important_points, flashcards, flowchart_mermaid)
values (
  v_user_id, c_dsa,
  'What is Big-O notation and why does it matter?',
  'Big-O notation describes the worst-case time or space complexity of an algorithm as input size n grows. Common complexities from fastest to slowest: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) linearithmic, O(n²) quadratic, O(2ⁿ) exponential. It helps compare algorithms and choose the most efficient one for large inputs.',
  '["Big-O measures how runtime or memory scales with input size",
    "O(1) is the best — constant time regardless of input",
    "O(n²) algorithms become very slow for large datasets",
    "Always aim for the lowest Big-O you can achieve"]'::jsonb,
  '["O(log n) typically comes from algorithms that halve the problem each step (e.g. binary search)",
    "O(n log n) is the best possible for comparison-based sorting (e.g. merge sort, quicksort average)",
    "Drop constants and lower-order terms: 3n² + 5n + 2 simplifies to O(n²)"]'::jsonb,
  '[{"q":"What does O(1) mean?","a":"Constant time — the algorithm takes the same time regardless of input size"},
    {"q":"What is the time complexity of binary search?","a":"O(log n) — it halves the search space each step"},
    {"q":"Why is O(n²) bad for large inputs?","a":"The number of operations grows quadratically, so n=1000 means ~1,000,000 operations"}]'::jsonb,
  'flowchart TD
    A[Algorithm Analysis] --> B[Count dominant operations as f of n]
    B --> C[Drop constants and lower-order terms]
    C --> D{Complexity class?}
    D --> E[O of 1: Constant]
    D --> F[O of log n: Logarithmic]
    D --> G[O of n: Linear]
    D --> H[O of n log n: Linearithmic]
    D --> I[O of n squared: Quadratic]
    D --> J[O of 2 to n: Exponential]'
);

insert into study_sessions
  (user_id, chapter_id, question, raw_answer, easy_points, important_points, flashcards, flowchart_mermaid)
values (
  v_user_id, c_dsa,
  'Explain the difference between a stack and a queue.',
  'A stack is a LIFO (Last In, First Out) data structure — the last element added is the first removed. Operations: push (add) and pop (remove from top). A queue is FIFO (First In, First Out) — the first element added is the first removed. Operations: enqueue (add to rear) and dequeue (remove from front). Stacks are used in recursion/undo; queues in scheduling/BFS.',
  '["Stack = LIFO: like a stack of plates",
    "Queue = FIFO: like a line of people waiting",
    "Stack operations: push and pop",
    "Queue operations: enqueue and dequeue"]'::jsonb,
  '["Call stacks in programming languages use LIFO — the most recent function call is resolved first",
    "Queues are used in BFS (Breadth-First Search) graph traversal",
    "Both can be implemented with arrays or linked lists"]'::jsonb,
  '[{"q":"What does LIFO stand for?","a":"Last In, First Out — the most recently added item is removed first (stack)"},
    {"q":"What does FIFO stand for?","a":"First In, First Out — the earliest added item is removed first (queue)"},
    {"q":"Where is a stack used in programming?","a":"Function call stacks, undo/redo operations, expression parsing"}]'::jsonb,
  'flowchart LR
    A[Data Structure] --> B{Access Order?}
    B -- Last In First Out --> C[Stack]
    B -- First In First Out --> D[Queue]
    C --> E[Operations: push / pop]
    D --> F[Operations: enqueue / dequeue]
    C --> G[Use case: recursion, undo, parsing]
    D --> H[Use case: scheduling, BFS, print spooler]'
);

-- ────────────────────────────────────────────────────────────
-- COMPUTER SCIENCE – OPERATING SYSTEMS
-- ────────────────────────────────────────────────────────────
insert into study_sessions
  (user_id, chapter_id, question, raw_answer, easy_points, important_points, flashcards, flowchart_mermaid)
values (
  v_user_id, c_os,
  'What is a process and how does the OS manage processes?',
  'A process is a program in execution. Each process has its own memory space, program counter, and resources. The OS manages processes through a Process Control Block (PCB) that stores state, PID, registers, and memory info. States: New → Ready → Running → Waiting → Terminated. The CPU scheduler picks which ready process runs next using algorithms like FCFS, Round Robin, or Priority Scheduling.',
  '["A process is a running instance of a program",
    "Each process has a unique PID (Process ID)",
    "Process states: New, Ready, Running, Waiting, Terminated",
    "The OS scheduler decides which process gets the CPU"]'::jsonb,
  '["PCB (Process Control Block) stores all process metadata — essential for context switching",
    "Context switching lets the CPU switch between processes by saving/restoring PCB data",
    "Round Robin scheduling assigns fixed time slices (quantum) to each process — good for fairness"]'::jsonb,
  '[{"q":"What is a PCB?","a":"Process Control Block — a data structure storing all info about a process (state, PID, registers, memory)"},
    {"q":"List the five process states","a":"New → Ready → Running → Waiting → Terminated"},
    {"q":"What is context switching?","a":"Saving the state of a running process and loading another process''s state to resume it"}]'::jsonb,
  'flowchart TD
    A[Program on disk] --> B[New: Process created]
    B --> C[Ready: Waiting for CPU]
    C --> D[Running: CPU executing]
    D --> E{I/O or event needed?}
    E -- Yes --> F[Waiting: blocked]
    F --> C
    E -- No --> G{Time slice expired?}
    G -- Yes --> C
    G -- No --> H[Terminated: process ends]'
);

-- ────────────────────────────────────────────────────────────
-- COMPUTER SCIENCE – DATABASE MANAGEMENT
-- ────────────────────────────────────────────────────────────
insert into study_sessions
  (user_id, chapter_id, question, raw_answer, easy_points, important_points, flashcards, flowchart_mermaid)
values (
  v_user_id, c_dbms,
  'What are the ACID properties of a database transaction?',
  'ACID stands for: Atomicity (a transaction is all-or-nothing — if any part fails, the whole transaction is rolled back), Consistency (a transaction brings the database from one valid state to another), Isolation (concurrent transactions do not interfere with each other), and Durability (once committed, changes persist even after a system crash). These properties ensure reliable database operations.',
  '["ACID = Atomicity, Consistency, Isolation, Durability",
    "Atomicity: all or nothing — no partial transactions",
    "Durability: committed data survives crashes",
    "These properties are critical for banking and financial systems"]'::jsonb,
  '["Isolation is the hardest to achieve at scale — solved via locking or MVCC (Multi-Version Concurrency Control)",
    "Without Atomicity, a failed transfer could debit one account without crediting the other",
    "Modern distributed databases (NoSQL) sometimes relax ACID for performance (BASE model)"]'::jsonb,
  '[{"q":"What does Atomicity mean in ACID?","a":"A transaction is all-or-nothing — if any step fails, the entire transaction is rolled back"},
    {"q":"What does Durability guarantee?","a":"Once a transaction is committed, the data persists even if the system crashes"},
    {"q":"What problem does Isolation prevent?","a":"Dirty reads and race conditions between concurrent transactions"}]'::jsonb,
  'flowchart TD
    A[Database Transaction] --> B[Atomicity: all or nothing]
    A --> C[Consistency: valid state to valid state]
    A --> D[Isolation: no interference between transactions]
    A --> E[Durability: persists after commit]
    B --> F{All steps succeed?}
    F -- Yes --> G[COMMIT]
    F -- No --> H[ROLLBACK]'
);

end $$;
