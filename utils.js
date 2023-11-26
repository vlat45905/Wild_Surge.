function rollDice(dice) {
    if (!dice || typeof dice !== 'string') return null;
    const [num, faces] = dice.split("d").map(Number);
    let sum = 0;
    for (let i = 0; i < num; i++) {
        sum += Math.floor(Math.random() * faces) + 1;
    }
    return sum;
}

function getUndoDescription(effectDescription) {
    const level = rollDice("1d6") + 2;
    const removeCurse = (level > 3 && !effectDescription.includes("permanent")) ? `Remove Curse spell level ${level} or ` : '';
    const greaterRestoration = `Greater Restoration spell level ${level}`;
    const wish = "the Wish spell";
    return `The effect can be removed by ${removeCurse}${greaterRestoration}, or ${wish}.`;
}

function getRandomArrayElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function pluralize(word, count) {
    return count === 1 ? word : word + "s";
}

function getAdditionalCondition() {
    const conditionsTemplate = [
        "or he has been branded the name of the deity he follows with a hot iron like a bull.",
        "or he has been stabbed by a silver weapon 3d10 times.",
        "or he has been tried and imprisoned for heresy.",
        "or he has bought a hugely expensive home and burned it down",
        "or he has broken every finger on one of his hands",
        "or he has burned himself for 2d20 total hit points of fire damage",
        "or he has carved his full name in 10d10 different trees",
        "He has built 2d10 snowmenore scarecrow",
        "He has carried a gallon of water from the sea to the spot whear he optain the Wild Burst",
         "He has carried a stone from the spot whear he optain the Wild Burst to  the sea",
"He has circumnavigated the globe without using magic to do so",
"He has composed 3d4 sonnets",
"He has cut off 1d10 fingers",
"He has cut off his own ear",
"He has destroyed every book that he owns",
"He has dug a functioning and productive well on the spot whear he optain the Wild Burst",
"He has eaten 1d4 pounds of soil",
"He has eaten 1d4X his weight in squirrels",
"He has eaten 2d6 pounds of cured leather",
"He has eaten an entire, live chicken",
"He has extracted 1d4 of his own teeth",
"He has felled 3d6 trees older than he is",
"He has forged a sword from meteoric iron",
"He has found a lost city hidden in the desert",
"He has founded a cult",
"He has gone 10d10 days and nights without speaking",
"He has gone 1d4 weeks without exposure to direct sunlight",
"He has gone one full month without using magic or any magic items",
"He has hand-carved a marble statue of himself",
"He has hand-carved a marble statue of the dyety he's serving",
"He has imbibed 1d4 pints of lamp oil",
"He has imbibed 1d8 pints of his own blood",
"He has lost a total of 3d10 hit points due to burns from acid",
"He has lost a total of 3d10 hit points due to electrical damage",
"He has manually unearthed a diamond larger than his head",
"He has married even if he is already married",
"He has married, divorced, and remarried 1d4 times",
"He has produced an heir",
"He has razed the nearest wooden structure",
"He has remained awake for 4d6 consecutive days and nights",
"He has retrieved a particular gold coin from the bottom of the sea",
"He has rid himself of all magic items",
"He has rolled less than his weight on 1d1000, one attempt per day",
"He has rolled less than his Strendth on 1d100, one attempt per day",
"He has rolled less than his Dexterity on 1d100, one attempt per day",
"He has rolled less than his Constitution on 1d100, one attempt per day",
"He has rolled less than his Inteligence on 1d100, one attempt per day",
"He has rolled less than his Wisdom on 1d100, one attempt per day",
"He has rolled less than his Charisma on 1d100, one attempt per day",
"He has scaled the tallest mountian on the continent",
"He has shaved his head completely bald",
"He has shed 2d10 pounds",
"He has single-handedly dammed the nearest river",
"He has spent 1,000,000 gold pieces with nothing to show for it",
"He has spent 1d4 days and nights at the bottom of a deep well",
"He has spent 1d4 nights in a sty with at least 3d10 pigs",
"He has spent a 2d6 night in active dragons lair",
"He has spent an entire night at the bottom of a lake",
"He has spent an entire night naked and unprotected in snow",
"He has spent an entire night sealed in a barrel",
"He has spent an entire night up to his neck in offal",
"He has stabbed himself with a weapon that he forged 3d10 times",
"He has swallowed 4d10 gallons of water",
"He has tattooed 10d100 cryptic runes on his skin",
"He has triggered 1d4 additional wild surges",
"He has visited both of the worlds magnetic poles",
"He has waded along the shores of 1d4 oceans",
"He has walked 10d100 miles",
"He has walked on the floor of the ocean",
"He has walked the shores of hell",
"He has woven a 6d10 foot length of rope",
"He has written his full name in 10d10 different books",
"His next birthday",
        "His son produces an heir",
        "The current king has died",
        "The next total lunar eclipse occurs"
    ];

    const replacedConditions = conditionsTemplate.map(condition => {
        return condition.replace(/\d+d\d+/g, match => rollDice(match));
    });

    return getRandomArrayElement(replacedConditions);
}

module.exports = {
    rollDice,
    getRandomArrayElement,
    pluralize,
    getAdditionalCondition,
    getUndoDescription
};