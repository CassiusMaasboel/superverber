document.addEventListener('DOMContentLoaded', () => {
    // Get query parameters for verb and tense
    const params = new URLSearchParams(window.location.search);
    const verb = params.get('verb');
    const tense = params.get('tense');

    // Map with correct accented verbs and tenses
    const accentMap = {
        "etre": "être",
        "avoir": "avoir",
        "aller": "aller",
        "devoir": "devoir",
        "pouvoir": "pouvoir",
        "vouloir": "vouloir",
        "savoir": "savoir",
        "aimer": "aimer",
        "croire": "croire",
        "demander": "demander",
        "dire": "dire",
        "penser": "penser",
        "comprendre": "comprendre",
        "devenir": "devenir",
        "donner": "donner",
        "faire": "faire",
        "laisser": "laisser",
        "mettre": "mettre",
        "partir": "partir",
        "passer": "passer",
        "prendre": "prendre",
        "rester": "rester",
        "sortir": "sortir",
        "venir": "venir",
        "voir": "voir",
        "present": "présent",
        "passe-compose": "passé composé"
    };

    // Validate and fetch accented versions
    const verbWithAccents = accentMap[verb] || verb || "Ukendt verbum";
    const tenseWithAccents = accentMap[tense] || tense || "Ukendt tid";

    // Map for pronouns and their translations
    const pronouns = ["je", "tu", "il", "nous", "vous", "ils"];
    const danishPronouns = ["jeg", "du", "han", "vi", "I", "de"];
    const taskNumberMapping = pronouns.reduce((map, pronoun, index) => {
        map[pronoun] = index + 1;
        return map;
    }, {});

    // Define questions (verbs and tenses)
    const questions = {
        "être": {
            "present": ["suis", "es", "est", "sommes", "êtes", "sont"],
            "passe-compose": ["ai été", "as été", "a été", "avons été", "avez été", "ont été"]
        },
        "avoir": {
            "present": ["ai", "as", "a", "avons", "avez", "ont"],
            "passe-compose": ["ai eu", "as eu", "a eu", "avons eu", "avez eu", "ont eu"]
        },
        "aller": {
            "present": ["vais", "vas", "va", "allons", "allez", "vont"],
            "passe-compose": ["suis allé", "es allé", "est allé", "sommes allés", "êtes allés", "sont allés"]
        },
        "devoir": {
            "present": ["dois", "dois", "doit", "devons", "devez", "doivent"],
            "passe-compose": ["ai dû", "as dû", "a dû", "avons dû", "avez dû", "ont dû"]
        },
        "pouvoir": {
            "present": ["peux", "peux", "peut", "pouvons", "pouvez", "peuvent"],
            "passe-compose": ["ai pu", "as pu", "a pu", "avons pu", "avez pu", "ont pu"]
        },
        "vouloir": {
            "present": ["veux", "veux", "veut", "voulons", "voulez", "veulent"],
            "passe-compose": ["ai voulu", "as voulu", "a voulu", "avons voulu", "avez voulu", "ont voulu"]
        },
        "savoir": {
            "present": ["sais", "sais", "sait", "savons", "savez", "savent"],
            "passe-compose": ["ai su", "as su", "a su", "avons su", "avez su", "ont su"]
        },
        "aimer": {
            "present": ["aime", "aimes", "aime", "aimons", "aimez", "aiment"],
            "passe-compose": ["ai aimé", "as aimé", "a aimé", "avons aimé", "avez aimé", "ont aimé"]
        },
        "croire": {
            "present": ["crois", "crois", "croit", "croyons", "croyez", "croient"],
            "passe-compose": ["ai cru", "as cru", "a cru", "avons cru", "avez cru", "ont cru"]
        },
        "demander": {
            "present": ["demande", "demandes", "demande", "demandons", "demandez", "demandent"],
            "passe-compose": ["ai demandé", "as demandé", "a demandé", "avons demandé", "avez demandé", "ont demandé"]
        },
        "dire": {
            "present": ["dis", "dis", "dit", "disons", "dites", "disent"],
            "passe-compose": ["ai dit", "as dit", "a dit", "avons dit", "avez dit", "ont dit"]
        },
        "penser": {
            "present": ["pense", "penses", "pense", "pensons", "pensez", "pensent"],
            "passe-compose": ["ai pensé", "as pensé", "a pensé", "avons pensé", "avez pensé", "ont pensé"]
        },
        "comprendre": {
            "present": ["comprends", "comprends", "comprend", "comprenons", "comprenez", "comprennent"],
            "passe-compose": ["ai compris", "as compris", "a compris", "avons compris", "avez compris", "ont compris"]
        },
        "devenir": {
            "present": ["deviens", "deviens", "devient", "devenons", "devenez", "deviennent"],
            "passe-compose": ["suis devenu", "es devenu", "est devenu", "sommes devenus", "êtes devenus", "sont devenus"]
        },
        "donner": {
            "present": ["donne", "donnes", "donne", "donnons", "donnez", "donnent"],
            "passe-compose": ["ai donné", "as donné", "a donné", "avons donné", "avez donné", "ont donné"]
        },
        "faire": {
            "present": ["fais", "fais", "fait", "faisons", "faites", "font"],
            "passe-compose": ["ai fait", "as fait", "a fait", "avons fait", "avez fait", "ont fait"]
        },
        "laisser": {
            "present": ["laisse", "laisses", "laisse", "laissons", "laissez", "laissent"],
            "passe-compose": ["ai laissé", "as laissé", "a laissé", "avons laissé", "avez laissé", "ont laissé"]
        },
        "mettre": {
            "present": ["mets", "mets", "met", "mettons", "mettez", "mettent"],
            "passe-compose": ["ai mis", "as mis", "a mis", "avons mis", "avez mis", "ont mis"]
        },
        "partir": {
            "present": ["pars", "pars", "part", "partons", "partez", "partent"],
            "passe-compose": ["suis parti", "es parti", "est parti", "sommes partis", "êtes partis", "sont partis"]
        },
        "passer": {
            "present": ["passe", "passes", "passe", "passons", "passez", "passent"],
            "passe-compose": ["ai passé", "as passé", "a passé", "avons passé", "avez passé", "ont passé"]
        },
        "prendre": {
            "present": ["prends", "prends", "prend", "prenons", "prenez", "prennent"],
            "passe-compose": ["ai pris", "as pris", "a pris", "avons pris", "avez pris", "ont pris"]
        },
        "rester": {
            "present": ["reste", "restes", "reste", "restons", "restez", "restent"],
            "passe-compose": ["suis resté", "es resté", "est resté", "sommes restés", "êtes restés", "sont restés"]
        },
        "sortir": {
            "present": ["sors", "sors", "sort", "sortons", "sortez", "sortent"],
            "passe-compose": ["suis sorti", "es sorti", "est sorti", "sommes sortis", "êtes sortis", "sont sortis"]
        },
        "venir": {
            "present": ["viens", "viens", "vient", "venons", "venez", "viennent"],
            "passe-compose": ["suis venu", "es venu", "est venu", "sommes venus", "êtes venus", "sont venus"]
        },
        "voir": {
            "present": ["vois", "vois", "voit", "voyons", "voyez", "voient"],
            "passe-compose": ["ai vu", "as vu", "a vu", "avons vu", "avez vu", "ont vu"]
        }
    };


    // Define simplified Danish translations for verbs
    const danishVerbs = {
        "être": { "present": "er", "passe-compose": "har været" },
        "avoir": { "present": "har", "passe-compose": "har haft" },
        "aller": { "present": "går", "passe-compose": "er gået" },
        "devoir": { "present": "skal", "passe-compose": "har skullet" },
        "pouvoir": { "present": "kan", "passe-compose": "har kunnet" },
        "vouloir": { "present": "vil", "passe-compose": "har villet" },
        "savoir": { "present": "ved", "passe-compose": "har vidst" },
        "aimer": { "present": "elsker", "passe-compose": "har elsket" },
        "croire": { "present": "tror", "passe-compose": "har troet" },
        "demander": { "present": "spørger", "passe-compose": "har spurgt" },
        "dire": { "present": "siger", "passe-compose": "har sagt" },
        "penser": { "present": "tænker", "passe-compose": "har tænkt" },
        "comprendre": { "present": "forstår", "passe-compose": "har forstået" },
        "devenir": { "present": "bliver", "passe-compose": "er blevet" },
        "donner": { "present": "giver", "passe-compose": "har givet" },
        "faire": { "present": "gør", "passe-compose": "har gjort" },
        "laisser": { "present": "lader", "passe-compose": "har ladet" },
        "mettre": { "present": "lægger", "passe-compose": "har lagt" },
        "partir": { "present": "rejser", "passe-compose": "er rejst" },
        "passer": { "present": "tilbringer", "passe-compose": "har tilbragt" },
        "prendre": { "present": "tager", "passe-compose": "har taget" },
        "rester": { "present": "bliver", "passe-compose": "er blevet" },
        "sortir": { "present": "går ud", "passe-compose": "er gået ud" },
        "venir": { "present": "kommer", "passe-compose": "er kommet" },
        "voir": { "present": "ser", "passe-compose": "har set" }
    };
    
    // Initialize tasks
    let currentTaskIndex = 0;
    let isLocked = false; // Lock to prevent quick pressing
    const selectedVerb = questions[verb] && questions[verb][tense];
    const danishVerb = danishVerbs[verb] && danishVerbs[verb][tense];
    const checkAnswerButton = document.getElementById('check-answer');

    if (!selectedVerb || !danishVerb) {
        console.error("Invalid verb or tense in URL parameters.");
        document.body.innerHTML = "<h1>Fejl: Ugyldig URL</h1>";
        return;
    }

    function loadTask() {
        isLocked = false; // Unlock for the next question
        const pronoun = pronouns[currentTaskIndex];
        let correctAnswer = selectedVerb[currentTaskIndex];
        const danishTranslation = `${danishPronouns[currentTaskIndex]} ${danishVerb}`;

        document.title = `superverber | ${verbWithAccents.toLowerCase()}`;

        // Replace "je ai" with "j'"
        let pronounText = pronoun;
        if (pronoun === "je" && correctAnswer.startsWith("ai")) {
            pronounText = "j'";
        }

        // Update task elements
        document.getElementById('verb-name').textContent = verbWithAccents;
        document.getElementById('tense-name').textContent = tenseWithAccents;
        document.getElementById('danish-text').textContent = danishTranslation;
        document.querySelector('.task-number').textContent = taskNumberMapping[pronoun];
        document.getElementById('question-text').textContent = pronounText;
        document.getElementById('verb-input').value = '';
        resetFeedback();
    }

    function resetFeedback() {
        const inputBox = document.getElementById('verb-input');
        const feedbackContainer = document.getElementById('feedback-container');
        const taskNumber = document.querySelector('.task-number');
        inputBox.classList.remove('correct', "incorrect");
        taskNumber.classList.remove('correct'); // Reset .task-number color
        document.getElementById('error-icon-container').classList.remove('visible');
        document.getElementById('success-icon-container').classList.remove('visible');
        feedbackContainer.style.backgroundColor = '#f9fafb'; // Reset feedback container background
    }

    function checkAnswer() {
        if (isLocked) return; // Prevent answer submission during lock period

        const userAnswer = document.getElementById('verb-input').value.trim().toLowerCase();
        const inputBox = document.getElementById('verb-input');
        const errorIcon = document.getElementById('error-icon-container');
        const successIcon = document.getElementById('success-icon-container');
        const feedbackContainer = document.getElementById('feedback-container');
        const taskNumber = document.querySelector('.task-number');
        const correctAnswer = selectedVerb[currentTaskIndex].toLowerCase();

        resetFeedback();

        if (userAnswer === correctAnswer) {
            successIcon.classList.add('visible');
            inputBox.classList.add('correct');
            taskNumber.classList.add('correct'); // Make .task-number green
            feedbackContainer.style.backgroundColor = '#dbfaea'; // Set background to greenish
            checkAnswerButton.style.backgroundColor = '#30d58c'; // Set button color to green
            isLocked = true; // Lock during transition
            currentTaskIndex++;

            setTimeout(() => {
                if (currentTaskIndex < pronouns.length) {
                    checkAnswerButton.style.backgroundColor = '#333'; // Reset button color
                    loadTask();
                } else {
                    finishExercise();
                }
            }, 1000);
        } else {
            errorIcon.classList.add('visible');
            inputBox.classList.add('incorrect');
        }
    }

    function finishExercise() {
        checkAnswerButton.textContent = 'afslut'; // Change button text to 'Afslut'
        checkAnswerButton.style.backgroundColor = '#30d58c'; // Change button color to green
        checkAnswerButton.removeEventListener('click', checkAnswer);
        checkAnswerButton.addEventListener('click', () => {
            window.location.href = 'index.html'; // Redirect to index.html
        });
    }

    // Click animation
    function triggerClickAnimation(button) {
        button.classList.add('pressed');
        setTimeout(() => button.classList.remove('pressed'), 200);
    }

    // Event listener for checking the answer
    checkAnswerButton.addEventListener('click', () => {
        triggerClickAnimation(checkAnswerButton);
        checkAnswer();
    });

    // Event listener for "Enter" key
    document.getElementById('verb-input').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            triggerClickAnimation(checkAnswerButton);
            checkAnswerButton.click();
        }
    });

    // Load the first task
    loadTask();
});
