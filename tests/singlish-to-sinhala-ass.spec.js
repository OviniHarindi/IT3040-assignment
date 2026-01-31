const { test, expect } = require("@playwright/test");

const SITE_URL = "https://www.swifttranslator.com/";


async function openSite(page) {
  await page.goto(SITE_URL, { waitUntil: "domcontentloaded" });
}

function getInputLocator(page) {
  return page.getByPlaceholder("Input Your Singlish Text Here.");
}

function getOutputLocator(page) {
  return page.locator('.card:has-text("Sinhala") .bg-slate-50').first();
}


async function readOutput(locator) {
  const t = await locator.textContent();
  return (t || "").replace(/\r\n/g, "\n");
}

function normalize(s) {
  return (s || "").replace(/\r\n/g, "\n").trim();
}

// ---- Positive test data ----
const positiveCases = [
  {
    id: "Pos_Fun_0001",
    input: "karuNaakaralaa mata podi udhavvak karanna puluvandha?",
    expected: "කරුණාකරලා මට පොඩි උදව්වක් කරන්න පුලුවන්ද?"
  },
  {
    id: "Pos_Fun_0002",
    input: "api heta 7.30 AM Colombo yanna hadhannee traffic eka godaama thiyennee nisaa, ehema unath trip eka cancel karanne naehae kiyala kiyala, passe cafe ekakta gihin tea ekak bonna saha poddak relax venna puluwan kiyala api sakachchaa karamu",
    expected:"අපි හෙට 7.30 AM Colombo යන්න හදන්නේ traffic එක ගොඩාම තියෙන්නේ නිසා, එහෙම උනත් trip එක cancel කරන්නේ නැහැ කියල කියල, පස්සෙ cafe එකක්ට ගිහින් tea එකක් බොන්න සහ පොඩ්ඩක් relax වෙන්න පුලුwඅන් කියල අපි සකච්චා කරමු"
  },
  {
    id: "Pos_Fun_0003",
    input: "mama gedhara yanavaa",
    expected: "මම ගෙදර යනවා"
  },
  {
    id: "Pos_Fun_0004",
    input: "mama ehema karanne naehae",
    expected: "මම එහෙම කරන්නේ නැහැ"
  },
  {
    id: "Pos_Fun_0005",
    input: "api heta enavaa",
    expected: "අපි හෙට එනවා"
  },
  {
    id: "Pos_Fun_0006",
    input: "mama iiyee gedhara giyaa",
    expected: "මම ඊයේ ගෙදර ගියා"
  },
  {
    id: "Pos_Fun_0007",
    input: "adha manager mata kiyala thiyenavaa report tika review karala changes tika apply karanna kiyala, ehema karoth next release eka hariyata plan karanna puluwan saha customer feedback tika collect karala team ekkata share karanna puluwan kiyala api kathaa karamu",
    expected: "අද manager මට කියල තියෙනවා report ටික review කරල changes ටික apply කරන්න කියල, එහෙම කරොත් next release එක හරියට plan කරන්න පුලුwඅන් සහ customer feedback ටික collect කරල team එක්කට share කරන්න පුලුwඅන් කියල අපි කතා කරමු"
  },
  {
    id: "Pos_Fun_0008",
    input: "mata paan kanna oonee",
    expected: "මට පාන් කන්න ඕනේ"
  },
  {
    id: "Pos_Fun_0009",
    input: "oya enavadha?",
    expected: "ඔය එනවද?"
  },
  {
    id: "Pos_Fun_0010",
    input: "api adha shop ekee Rs. 1500  kiyala thiyena items tika balala, ehema unath quality eka hariyata thiyenavaadha kiyala check karala, passe api budget eka hariyata hadhaaganna puluwan kiyala poddak sakachchaa karamu",
    expected: "අපි අද shop එකේ Rs. 1500  කියල තියෙන items ටික බලල, එහෙම උනත් quality එක හරියට තියෙනවාද කියල check කරල, පස්සෙ අපි budget එක හරියට හදාගන්න පුලුwඅන් කියල පොඩ්ඩක් සකච්චා කරමු"
  },
  {
    id: "Pos_Fun_0011",
    input: "kiyana dhe karapan",
    expected: "කියන දෙ කරපන්"
  },
  {
    id: "Pos_Fun_0012",
    input: "api kaeema kanna yanavaa saha passe cafe ekakta gihin poddak inna",
    expected: "අපි කෑම කන්න යනවා සහ පස්සෙ cafe එකක්ට ගිහින් පොඩ්ඩක් ඉන්න"
  },
  {
    id: "Pos_Fun_0013",
    input: "7.30 AM",
    expected: "7.30 AM"
  },
  {
    id: "Pos_Fun_0014",
    input: "adha api customer feedback session eka gena full discussion ekak karala, samahara aya kiyala thiyenavaa app ekee UI eka simple karanna oone kiyala, ehema unath system eka stable vidihata vaeda karanavaa kiyala thava samahara aya hariyata appreciate karanavaa, ehema nisaa api improvements tika prioritize karanna oone kiyala team ekka poddak sakachchaa karamu. passe next sprint eka plan karala, tasks tika board ekee add karala, deadlines tika set karala, daily meeting eka 9.00 AM thiyennee kiyala confirm karanna manager ta WhatsApp massage ekak yavanna mathak karaganna. ehema karoth api workflow eka clear venavaa saha communication issues venne adu venavaa kiyala api kathaa karamu. api office ekee poddak time ekak ganna saha colleagues laath ekka poddak relax venna tea break ekak ganna puluvan kiyala plan karamu, ehema karoth work-life balance eka hariyata maintain karanna puluvan kiyala api hamoma agreement ekakata aavaa.",
    expected: "අද අපි customer feedback session එක ගෙන full discussion එකක් කරල, සමහර අය කියල තියෙනවා app එකේ UI එක simple කරන්න ඕනෙ කියල, එහෙම උනත් system එක stable විඩිහට වැඩ කරනවා කියල තව සමහර අය හරියට appreciate කරනවා, එහෙම නිසා අපි improvements ටික prioritize කරන්න ඕනෙ කියල team එක්ක පොඩ්ඩක් සකච්චා කරමු. පස්සෙ next sprint එක plan කරල, tasks ටික board එකේ add කරල, deadlines ටික සෙට් කරල, daily meeting එක 9.00 AM තියෙන්නේ කියල confirm කරන්න manager ට WhatsApp massage එකක් යවන්න මතක් කරගන්න. එහෙම කරොත් අපි workflow එක clear වෙනවා සහ communication issues වෙන්නෙ අඩු වෙනවා කියල අපි කතා කරමු. අපි office එකේ පොඩ්ඩක් time එකක් ගන්න සහ colleagues ලාත් එක්ක පොඩ්ඩක් relax වෙන්න tea break එකක් ගන්න පුලුවන් කියල plan කරමු, එහෙම කරොත් work-life balance එක හරියට maintain කරන්න පුලුවන් කියල අපි හමොම agreement එකකට ආවා."
  },
  {
    id: "Pos_Fun_0015",
    input: "api kaeema kanna yanavaa passe film ekak balanavaa",
    expected: "අපි කෑම කන්න යනවා පස්සෙ film එකක් බලනවා"
  },
  {
    id: "Pos_Fun_0016",
    input: "25/12/2025",
    expected: "25/12/2025"
  },
  {
    id: "Pos_Fun_0017",
    input: "Documents tika attach karalaa email ekak evanna",
    expected: "Documents ටික attach කරලා email එකක් එවන්න"
  },
  {
    id: "Pos_Fun_0018",
    input: "Rs. 5343",
    expected: "Rs. 5343"
  },
  {
    id: "Pos_Fun_0019",
    input: "oya enavaanam mama balan innavaa",
    expected: "ඔය එනවානම් මම බලන් ඉන්නවා"
  },
  {
    id: "Pos_Fun_0020",
    input: "dhitvaa suLi kuNaatuva samaGa aethi vuu gQQvathura saha naayayaeem heethuven dhaedi haani.",
    expected: "දිට්වා සුළි කුණාටුව සමඟ ඇති වූ ගංවතුර සහ නායයෑම් හේතුවෙන් දැඩි හානි."
  },
  {
    id: "Pos_Fun_0021",
    input: "5 kg",
    expected: "5 kg"
  },
  {
    id: "Pos_Fun_0022",
    input: "karuNaakaralaa heta api office ekee thiyena meeting eka gena poddak sakachchaa karala, Teams ekee link eka WhatsApp karala ayaata yawanna saha documents tika attach karala email ekak evanna puluvandha kiyala mata kiyanna",
    expected: "කරුණාකරලා හෙට අපි office එකේ තියෙන meeting එක ගෙන පොඩ්ඩක් සකච්චා කරල, Teams එකේ link එක WhatsApp කරල අයාට යwඅන්න සහ documents ටික attach කරල email එකක් එවන්න පුලුවන්ද කියල මට කියන්න"
  },
  {
    id: "Pos_Fun_0023",
    input: "ela machan",
    expected: "එල මචන්"
  },
  {
    id: "Pos_Fun_0024",
    input: "adha api team ekka full project status eka gena sakachchaa karamu, mulinma last week ekee thiyena tasks tika hariyata complete vunaadha kiyala check karala, ehema unath samahara files tika late vennee nisaa documents tika attach karala email ekak manager ta yawanna oone kiyala api kathaa karamu, passe Teams ekee link eka WhatsApp karala clients laata demo meeting eka set karanna puluwan kiyala plan karamu. ehema karoth next release eka hariyata schedule karanna puluwan saha customer feedback tika collect karala improvements tika apply karanna puluwan kiyala team ekka agreement ekakata aavaa. api meya karanne nam, quality assurance stage ekee test cases tika run karala issues thiyenavaadha kiyala verify karala, ehema unoth immediate fix ekak dhenna puluwan kiyala api sakachchaa karamu. adha meeting eka ivarai unaata passe, api office ekee poddak relax venna tea ekak bonna saha iiLaGa davasata to-do list eka update karanna puluwan kiyala poddak kathaa karala, overall workflow eka smooth karanna thiyena ideas tika share karala meeting eka hariyata close karamu",
    expected: "අද අපි team එක්ක full project status එක ගෙන සකච්චා කරමු, මුලින්ම last week එකේ තියෙන tasks ටික හරියට complete වුනාද කියල check කරල, එහෙම උනත් සමහර files ටික late වෙන්නේ නිසා documents ටික attach කරල email එකක් manager ට යwඅන්න ඕනෙ කියල අපි කතා කරමු, පස්සෙ Teams එකේ link එක WhatsApp කරල clients ලාට demo meeting එක සෙට් කරන්න පුලුwඅන් කියල plan කරමු. එහෙම කරොත් next release එක හරියට schedule කරන්න පුලුwඅන් සහ customer feedback ටික collect කරල improvements ටික apply කරන්න පුලුwඅන් කියල team එක්ක agreement එකකට ආවා. අපි මෙය කරන්නේ නම්, quality assurance stage එකේ test cases ටික run කරල issues තියෙනවාද කියල verify කරල, එහෙම උනොත් immediate fix එකක් දෙන්න පුලුwඅන් කියල අපි සකච්චා කරමු. අද meeting එක ඉවරෛ උනාට පස්සෙ, අපි office එකේ පොඩ්ඩක් relax වෙන්න tea එකක් බොන්න සහ ඊළඟ ඩවසට to-ඩො list එක update කරන්න පුලුwඅන් කියල පොඩ්ඩක් කතා කරල, overall workflow එක smooth කරන්න තියෙන ideas ටික share කරල meeting එක හරියට close කරමු"
  }
];

// --------- Test Data (Negative test data) 
const negativeCases = [
  {
    id: "Neg_Fun_0001",
    input: "mama gedahara yanavaa heta",
    expected: "මමගෙදරයනවාහෙට"
  },
  {
    id: "Neg_Fun_0002",
    input: "adoo vaedak karapanko bnn",
    expected: "ado වැඩක් කරපන්කො බ්න්න්"
  },
  {
    id: "Neg_Fun_0003",
    input: "mama @@@ gedhara",
    expected: "මම @@ ගෙදර"
  },
  {
    id: "Neg_Fun_0004",
    input: "ASAP email ekak evanna",
    expected: "හැකි විගස email එකක් එවන්න"
  },
  {
    id: "Neg_Fun_0005",
    input: "mama giyaa tomorrow",
    expected: "මම ගියා හෙට"
  },
  {
    id: "Neg_Fun_0006",
    input: "mama 😊 yanavaa",
    expected: "මම 😊 යනව"
  },
  {
    id: "Neg_Fun_0007",
    input: " ",
    expected: "No output"
  },
  {
    id: "Neg_Fun_0008",
    input: "mama beach eke inne @oyaa kohedha inne ?",
    expected: "මම beach eke inne @ඔයා කොහෙද ඉන්නේ ?"
  },
  {
    id: "Neg_Fun_0009",
    input: "classcutkarala zoo eka balanna giya",
    expected: "classcutkarala  zoo එක බලන්න ගිය"
  },
  {
    id: "Neg_Fun_0010",
    input: "rata beraganna aragalayata apith giya",
    expected: "රට බෙරගන්නරගලයට අපිත් ගිය"
  },
  {
    id: "Neg_UI_0001",
    input: "adhaapinewUIdesignekalaunchkarannahadhanne,homepageekelayoutekacleanwidihataarrangekaralanavigationbarekaeasywidihatausekarannapuluwanwidihatasetkarala,colorthemeekasoftbluesahawhitemixkaralauserlaataeyefriendlyexperienceekaklabagannahadhanne,ehemaunothuserslaatawebsiteekabrowsekarannaeasywennesahaoverallperformanceekaimprovewennekiyalaapiteamekkapodireviewmeetingekakkaralafinalchangestikaapplykaramua",
    expected: "අද අපි new UI design එක launch කරන්න හදන්නෙ, homepage eke layout එක clean wඉඩිහට arrange කරල navigation bar එක easy widihata use කරන්න puluwan widihata සෙට් කරල, color theme එක soft blue සහ white mix කරල user ලාට eye friendly experience එකක් ලබගන්න හදන්නෙ, එහෙම උනොත් users ලාට website එක browse කරන්න easy wඑන්නෙ සහ overall performance එක improve wඑන්නෙ කියල අපි team එක්ක පොඩි review meeting එකක් කරල final changes ටික apply කරමු."
  }
];

// --------- Tests ----------
test("open swifttranslator", async ({ page }) => {
  await openSite(page);

  const pageTitle = await page.title();
  console.log("page title is:", pageTitle);

  await expect(page).toHaveURL(SITE_URL);
  await expect(page).toHaveTitle(/Translator/i);
});

test.describe("SwiftTranslator – Positive Functional", () => {
  for (const tc of positiveCases) {
    test(`${tc.id} – should match expected Sinhala output`, async ({ page }) => {
      await openSite(page);

      const inputArea = getInputLocator(page);
      const outputBox = getOutputLocator(page);

      await inputArea.waitFor({ state: "visible", timeout: 1000000 });
      await inputArea.fill(tc.input);

      await expect
        .poll(async () => normalize(await readOutput(outputBox)), {
          timeout: 2000000,
          message: `Output did not match for ${tc.id}`
        })
        .toBe(normalize(tc.expected));
    });
  }
});

test.describe("SwiftTranslator – Negative Functional", () => {
  for (const tc of negativeCases) {
    test(`${tc.id} – should match expected Sinhala output`, async ({ page }) => {
      await openSite(page);

      const inputArea = getInputLocator(page);
      const outputBox = getOutputLocator(page);

      await inputArea.waitFor({ state: "visible", timeout: 10000 });
      await inputArea.fill(tc.input);

      await expect
        .poll(async () => normalize(await readOutput(outputBox)), {
          timeout: 2000000,
          message: `Output did not match for ${tc.id}`
        })
        .toBe(normalize(tc.expected));
    });
  }
});

test("Pos_UI_0001 – Clearing input clears Sinhala output immediately", async ({ page }) => {
  await openSite(page);

  const inputArea = getInputLocator(page);
  const outputBox = getOutputLocator(page);

  await inputArea.waitFor({ state: "visible", timeout: 1000000 });

  
  await inputArea.fill("api heta hambemu.");

  
  await expect
    .poll(async () => normalize(await readOutput(outputBox)), {
      timeout: 2000000,
      message: "No output produced"
    })
    .not.toBe("");

  
  await inputArea.fill("");

  
  await expect
    .poll(async () => normalize(await readOutput(outputBox)), {
      timeout: 1500000,
      message: "Output did not clear after clearing the input"
    })
    .toBe("");
});

test("Neg_UI_0001 – should respond within time for long gibberish input", async ({ page }) => {
  await openSite(page);

  const inputArea = getInputLocator(page);
  const outputBox = getOutputLocator(page);

  await inputArea.waitFor({ state: "visible", timeout: 1000000 });

  const before = normalize(await readOutput(outputBox));
  const start = Date.now();

  await inputArea.fill(
    "ffnfnmlfnmltn fjnbfkrrh rkhmmlm tmhl5my5lye5lymolkjuyml hmyljmlt jtnhrenno nhkrehohnmkhmtm h5khm5olho 5o"
  );

  
  await expect
    .poll(async () => normalize(await readOutput(outputBox)) !== before, {
      timeout: 100000,
      message: "UI did not respond within 2000ms"
    })
    .toBe(true);

  const elapsed = Date.now() - start;
  expect(elapsed).toBeLessThanOrEqual(200000);
});