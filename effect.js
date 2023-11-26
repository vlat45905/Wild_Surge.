

const { rollDice, getRandomArrayElement, pluralize, getAdditionalCondition, getUndoDescription } = require('./utils.js');

// Helper function to create the description.
const createDescription = (baseDesc, ...args) => {
    if (!baseDesc) {
        console.error("Base description is missing.");
        return "";
    }

    let desc = baseDesc.replace('%s', args[0]);

    if (args[1] !== null && args[1] !== undefined) {
        desc = desc.replace('%d', args[1].toString());
    }

    if (args[2] && args[3]) {
        desc += ` for ${args[2]} ${args[3]}`;
    }
    return desc;
};

const subjects = ["Caster", "Target", "Caster's Closest Ally", "Target's Closest Ally"];
const timeUnits = ["turn", "round", "minute", "hour", "day", "week", "month", "year"];
const statueMaterials = ["stone", "wood", "marble", "bronze", "crystal", "gold", "silver", "moldy bread", "goat cheese", "cow cheese", "sheep cheese", "beeswax", "hay", "clay"];
const savingThrowDCs = [5, 10, 15, 20, 25, 30];

// Updated describeEffect function
function describeEffect(effect, subject) {
    const number = effect.dice ? rollDice(effect.dice) : null;
    const effectDescription = effect.description(number, subject);
    if (Math.random() < 0.1) {
        return `${effectDescription} permanently. ${getAdditionalCondition()}`;
    } else {
        const duration = effect.hasDuration ? rollDice("1d30") : "";
        const timeUnit = effect.hasDuration ? pluralize(getRandomArrayElement(timeUnits), duration) : "";
        return effect.hasDuration
            ? `${effectDescription}, for the duration of ${duration} ${timeUnit}.`
            : effectDescription;
    }
}
const baseEffectsList = [
    {
        description: (number, subject, duration, timeUnit) =>
            createDescription(`${number} of ${subject}'s fingers turn to stone`, number, subject, duration, timeUnit),
        dice: "1d10",
        hasDuration: true,
        isUndoable: true
    },
    {
        description: (number, subject, duration, timeUnit) =>
            createDescription(`${number} bees swarm harmlessly around ${subject} for several weeks`, number, subject, duration, timeUnit),
        dice: "1d100",
        hasDuration: true,
        isUndoable: true
    },
    {
        description: (number, subject, duration, timeUnit) =>
            createDescription(`${number} sparkling motes dance about ${subject}'s head until dawn`, number, subject, duration, timeUnit),
        dice: "1d100",
        hasDuration: true,
        isUndoable: true
    },
    {
        description: (number, subject, duration, timeUnit) =>
            createDescription(`${number}% of ${subject}'s body turns to iron for that many rounds`, number, subject, duration, timeUnit),
        dice: "1d100",
        hasDuration: true,
        isUndoable: true
    },
    {
        description: (number, subject, duration, timeUnit) =>
            createDescription(`${number} ducklings identify ${subject} as their mother`, number, subject, duration, timeUnit),
        dice: "1d12",
        hasDuration: true,
        isUndoable: true
    },
    {
        description: (number, subject, duration, timeUnit) =>
            createDescription(`${number} of ${subject}'s fingers move from his left hand to his right hand`, number, subject, duration, timeUnit),
        dice: "1d5",
        hasDuration: true,
        isUndoable: true
    },
    {
        description: (number, subject, duration, timeUnit) =>
            createDescription(`${number} of ${subject}'s limbs are as durable as steel`, number, subject, duration, timeUnit),
        dice: "1d4",
        hasDuration: true,
            isUndoable: true
        },
        {
            description: (number, subject, duration, timeUnit) =>
                createDescription(`${number} of ${subject}'s limbs are covered in fish scales`, number, subject, duration, timeUnit),
            dice: "1d4",
            hasDuration: true,
            isUndoable: true
        },
        {
            description: (number, subject, duration, timeUnit) =>
                createDescription(`${number} of ${subject}'s limbs are invisible`, number, subject, duration, timeUnit),
            dice: "1d4",
            hasDuration: true,
            isUndoable: true
        },
        {
            description: (number, subject, duration, timeUnit) =>
                createDescription(`${number} of ${subject}'s primary orifices seal shut`, number, subject, duration, timeUnit),
            dice: "1d8",
            hasDuration: true,
            isUndoable: true
        },
      {
          description: (number, subject, duration, timeUnit) =>
              createDescription(`Harmless lumps as big as walnuts cover ${subject}'s body`, number, subject, duration, timeUnit),
          dice: "3d10",
          hasDuration: true,
          isUndoable: true
      },
      {
          description: (number, subject, duration, timeUnit) =>
              createDescription(`${number} quarts of olive oil pour from ${subject}'s ears`, number, subject, duration, timeUnit),
          dice: "3d10",
          hasDuration: true,
          isUndoable: true
      },
      {
          description: (number, subject, duration, timeUnit) =>
              createDescription(`${number} non-functioning eyes appear on ${subject}'s face and head`, number, subject, duration, timeUnit),
          dice: "4d6",
          hasDuration: true,
          isUndoable: true
      },
        {
          description: (number, subject, duration, timeUnit) =>
              createDescription(`${number} functioning eyes appear on ${subject}'s face and head`, number, subject, duration, timeUnit),
          dice: "4d6",
          hasDuration: true,
          isUndoable: true
      },
      {
          description: (number, subject, duration, timeUnit) =>
              createDescription(`A 100-yard radius around ${subject}'s home is stripped of vegetation`, number, subject, duration, timeUnit),
          dice: null,
          hasDuration: false,
          isUndoable: false 
      },
      {
          description: (number, subject, duration, timeUnit) =>
              createDescription(`A ${number} foot radius around ${subject} sinks as many feet into the earth`, number, subject, duration, timeUnit),
          dice: "2d6",
          hasDuration: false,
          isUndoable: false
      },
      {
          description: (number, subject, duration, timeUnit) =>
              createDescription(`A basement has been installed in ${subject}'s home while ${subject} has been away`, number, subject, duration, timeUnit),
          dice: null,
          hasDuration: false,
          isUndoable: false
      },
      {
          description: (number, subject, duration, timeUnit) =>
              createDescription(`A close friend of ${subject} is an assassin hired to kill ${subject}`, number, subject, duration, timeUnit),
          dice: null,
          hasDuration: false,
          isUndoable: true
      },
      {
          description: (number, subject, duration, timeUnit) =>
              createDescription(`A distant but powerful army declares war on ${subject}`, number, subject, duration, timeUnit),
          dice: null,
          hasDuration: false,
          isUndoable: true
      },
      {
          description: (number, subject, duration, timeUnit) =>
              createDescription(`A drop of ${subject}'s blood can purify ${rollDice("1d4")} gallons of water`, number, subject, duration, timeUnit),
          dice: null,
          hasDuration: true,
          isUndoable: true
      },
      {
          description: (number, subject, duration, timeUnit) =>
              createDescription(`A family of skunks has taken up residence in ${subject}'s home`, number, subject, duration, timeUnit),
          dice: null,
          hasDuration: false,
          isUndoable: false
      },  
      {
            description: (number, subject, duration, timeUnit) =>
                createDescription(`A fast-growing oak sprouts beneath ${subject}'s home`, number, subject, duration, timeUnit),
            dice: null,
            hasDuration: false,
            isUndoable: false
        },
        {
            description: (number, subject, duration, timeUnit) =>
                createDescription(`A foot-long steel bar runs completely through ${subject}'s thigh, he takes ${number} pirsing`, number, subject, duration, timeUnit),
            dice: "1d4",
            hasDuration: true,
            isUndoable: true
        },
        {
            description: (number, subject, duration, timeUnit) =>
                createDescription(`A geyser erupts from one of ${subject}'s pockets`, number, subject, duration, timeUnit),
            dice: null,
            hasDuration: true,
            isUndoable: true
        },
        {
            description: (number, subject, duration, timeUnit) =>
                createDescription(`A glowing orb hovers over ${subject}'s head while he's invisible`, number, subject, duration, timeUnit),
            dice: null,
            hasDuration: true,
            isUndoable: true
        },
        {
            description: (number, subject, duration, timeUnit) =>
                createDescription(`A great wind blows ${subject} ${rollDice("1d100")} yards in a random direction`, number, subject, duration, timeUnit),
            dice: null,
            hasDuration: false,
            isUndoable: false
        },
        {
            description: (number, subject, duration, timeUnit) =>
                createDescription(`A large haystack falls from the sky onto ${subject}`, number, subject, duration, timeUnit),
            dice: null,
            hasDuration: false,
            isUndoable: false
        },
        {
            description: (number, subject, duration, timeUnit) =>
                createDescription(`A large oak sprouts from one of ${subject}'s pockets`, number, subject, duration, timeUnit),
            dice: null,
            hasDuration: false,
            isUndoable: false
        },
        {
            description: (number, subject, duration, timeUnit) =>
                createDescription(`A length of chain now runs completely through ${subject}'s torso, he has a disadvantage on stealth rolls`, number, subject, duration, timeUnit),
            dice: null,
            hasDuration: false,
            isUndoable: true
        },   {
        description: (number, subject, duration, timeUnit) =>
                createDescription(`A group of necromancers take an interest in ${subject}'s skeleton`, number, subject, duration, timeUnit),
            dice: null,
            hasDuration: false,
            isUndoable: true
      },
        {
            description: (number, subject, duration, timeUnit) =>
                createDescription(`A group of scholars think ${subject} is a visitor from the future`, number, subject, duration, timeUnit),
            dice: null,
            hasDuration: false,
            isUndoable: true
        },
        {
            description: (number, subject, duration, timeUnit) =>
                createDescription(`A hen's egg tumbles out of each of ${subject}'s ears`, number, subject, duration, timeUnit),
            dice: null,
            hasDuration: true,
            isUndoable: true
        },
        {
            description: (number, subject, duration, timeUnit) =>
                createDescription(`A huge balloon shaped like ${subject} drifts past overhead`, number, subject, duration, timeUnit),
            dice: null,
            hasDuration: false,
            isUndoable: false 
        },
        {
            description: (number, subject, duration, timeUnit) =>
                createDescription(`A kill-on-sight order has been issued for ${subject} kingdom-wide`, number, subject, duration, timeUnit),
            dice: null,
            hasDuration: false,
            isUndoable: true
        },
        {
            description: (number, subject, duration, timeUnit) =>
                createDescription(`A large haystack falls from the sky onto ${subject}`, number, subject, duration, timeUnit),
            dice: null,
            hasDuration: false,
            isUndoable: false
        },
        {
            description: (number, subject, duration, timeUnit) =>
                createDescription(`A large oak sprouts from one of ${subject}'s pockets`, number, subject, duration, timeUnit),
            dice: null,
            hasDuration: false,
            isUndoable: false
        },
        {
            description: (number, subject, duration, timeUnit) =>
                createDescription(`A length of chain now runs completely through ${subject}'s torso, he has a disadvantage on stealth rolls`, number, subject, duration, timeUnit),
            dice: null,
            hasDuration: false,
            isUndoable: false
        },{
            description: (number, subject, duration, timeUnit) =>
                createDescription(`A life-sized statue of ${subject} appears nearby, made of ${material}`, number, subject, duration, timeUnit),
            dice: null,
            hasDuration: false,
            isUndoable: false
        },{
        description: (number, subject, duration, timeUnit) => {
            const savingThrowDC = getRandomArrayElement(savingThrowDCs);
            return createDescription(`A large haystack falls from the sky onto ${subject}. ${subject} must make a Dexterity saving throw DC ${savingThrowDC}.`, number, subject, duration, timeUnit);
        },
        dice: null,
        hasDuration: false,
        isUndoable: false
    },
 {
    description: (number, subject, duration, timeUnit) =>
        createDescription(`After each spell or attack, ${subject} shrinks by ${number}%, until the start of his next turn`, number, subject, duration, timeUnit),
    dice: "10d10",
    hasDuration: true,
    isUndoable: true
  },
  {
    description: (number, subject, duration, timeUnit) =>
        createDescription(`After each spell or attack, ${subject} clothes age ${number} years, until the start of his next turn`, number, subject, duration, timeUnit),
    dice: "1d100",
    hasDuration: true,
    isUndoable: true
  },

    // Add other effects as needed...
];

// Define repetitiveEffects and repetitiveMappedEffects
const repetitiveEffects = [
    { baseDesc: "%s appears to be decomposing", dice: null },
    { baseDesc: "%s appears to be made of pure ice", dice: null },
    { baseDesc: "%s appears to be utterly insane", dice: null },
    { baseDesc: "smoke hangs in the air about the %s", dice: null },
    { baseDesc: "stones near the %s glisten with slime", dice: null },
    { baseDesc: "sunlight is painful to %s", dice: null },
	 { baseDesc: "%s appears to be decomposing", dice: null },
    { baseDesc: "%s appears to be made of pure ice", dice: null },
      { baseDesc: "%s appears to be utterly insane", dice: null },
      { baseDesc: "smoke hangs in the air about the %s", dice: null },
      { baseDesc: "stones near the %s glisten with slime", dice: null },
      { baseDesc: "sunlight is painful to %s", dice: null },
      { baseDesc: "%s head turns invisible", dice: null },
    { baseDesc: " a lighted cigar appears in %s mouth", dice: null },
    { baseDesc: " a pebble falls from each of %s ears", dice: null },
    { baseDesc: " ants seem to course from the %s eyes", dice: null },
    { baseDesc: "%s accuses someone nearby of impropriety", dice: null },
    { baseDesc: "%s appears astonishingly ugly", dice: null },
    { baseDesc: "%s appears to be decomposing", dice: null },
    { baseDesc: "%s appears to be made of pure ice", dice: null },
    { baseDesc: "%s appears to be utterly insane", dice: null },
    { baseDesc: "%s applauds himself", dice: null },
    { baseDesc: "%s begs someone nearby not to kill him", dice: null },
    { baseDesc: "%s berates someone standing nearby", dice: null },
    { baseDesc: "%s briefly appears to be a rotting corpse", dice: null },
    { baseDesc: "%s briefly appears to be on fire", dice: null },
    { baseDesc: "%s briefly appears to bleed from his eyes", dice: null },
    { baseDesc: "%s briefly looks like a photo negative", dice: null },
    { baseDesc: "%s briefly seems to be of the opposite sex", dice: null },
    { baseDesc: "%s briefly sees fire all around him", dice: null },
    { baseDesc: "%s briefly thinks that heís choking", dice: null },
    { baseDesc: "%s can sense secret doors", dice: null },
    { baseDesc: "%s canít be magically healed", dice: null },
    { baseDesc: "%s canít traverse a doorway", dice: null },
    { baseDesc: "%s dances like a honeybee", dice: null },
    { baseDesc: "%s experiences a burning sensation", dice: null },
    { baseDesc: "%s feels ants crawling all over him", dice: null },
    { baseDesc: "%s feels compelled to wash his hands", dice: null },
    { baseDesc: "%s feels completely alone and isolated", dice: null },
    { baseDesc: "%s feels distractingly hungry", dice: null },
    { baseDesc: "%s feels overwhelmingly dizzy", dice: null },
    { baseDesc: "%s feels transcendent euphoria", dice: null },
    { baseDesc: "%s forgets everyoneís name", dice: null },
    { baseDesc: "%s forgets his name", dice: null },
    { baseDesc: "%s glows with infernal radiance", dice: null },
    { baseDesc: "%s growls like a rabid dog", dice: null },
    { baseDesc: "%s has a brief vision of some distant land", dice: null },
    { baseDesc: "%s has a strong craving for twigs and bark", dice: null },
    { baseDesc: "%s is 5% likely to be stricken mute", dice: null },
    { baseDesc: "%s is 25% likely to turn briefly invisible", dice: null },
    { baseDesc: "%s is 30% likely to lose his balance", dice: null },
    { baseDesc: "%s is 60% likely to flap his arms", dice: null },
    { baseDesc: "%s is afraid of his own name", dice: null },
    { baseDesc: "%s is as hairy as an ape", dice: null },
    { baseDesc: "%s is base AC zero", dice: null },
    { baseDesc: "%s is bathed in an otherworldly green light", dice: null },
    { baseDesc: "%s is blind in one eye", dice: null },
    { baseDesc: "%s is grief-stricken", dice: null },
    { baseDesc: "%s is hopelessly drunk", dice: null },
    { baseDesc: "%s is immune to bludgeons", dice: null },
    { baseDesc: "%s is immune to range attacs", dice: null },
    { baseDesc: "%s is intensely magnetic", dice: null },
    { baseDesc: "%s is matte black", dice: null },
    { baseDesc: "%s is suddenly facing True North", dice: null },
    { baseDesc: "%s is wracked by existential horror", dice: null },
    { baseDesc: "%s looks like a cadaver ", dice: null },
    { baseDesc: "%s makes short, barking cries", dice: null },
    { baseDesc: "%s oozes sweet-smelling oil", dice: null },
    { baseDesc: "%s polymorphs very briefly", dice: null },
    { baseDesc: "%s reeks of alcohol", dice: null },
    { baseDesc: "%s salivates copiously", dice: null },
    { baseDesc: "%s seems withdrawn and despondent", dice: null },
    { baseDesc: "%s shakes like a rag doll", dice: null },
    { baseDesc: "%s shivers uncontrollably", dice: null },
    { baseDesc: "%s shrinks by 50%", dice: null },
    { baseDesc: "%s smells strongly of turpentine", dice: null },
    { baseDesc: "%s suffers brief visions of carnage", dice: null },
    { baseDesc: "%s suffers disorienting vertigo", dice: null },
    { baseDesc: "%s thinks that heís drowning", dice: null },
    { baseDesc: "%s thinks that his clothes are on fire", dice: null },
    { baseDesc: "%s trumpets like an elephant", dice: null },
    { baseDesc: "%s vanishes very briefly vanishes", dice: null },
    { baseDesc: "%s clothes billow with green smoke", dice: null },
    { baseDesc: "%s eyes briefly double in size", dice: null },
    { baseDesc: "%s face looks 50 years older", dice: null },
    { baseDesc: "%s feet are covered with ash", dice: null },
    { baseDesc: "%s hair grows two inches", dice: null },
    { baseDesc: "%s hands display classic stigmata", dice: null },
    { baseDesc: "%s hands steam wildly", dice: null },
    { baseDesc: "%s head turns 360° at the neck, unharmed", dice: null },
    { baseDesc: "%s head turns invisible", dice: null },
    { baseDesc: "%s heart pounds audibly", dice: null },
    { baseDesc: "%s left arm turns to stone", dice: null },
    { baseDesc: "%s spellbook throbs with deep red light", dice: null },
    { baseDesc: "%s Strength is halved", dice: null },
    { baseDesc: "gravity briefly doubles", dice: null },
    { baseDesc: "%s giggles", dice: null },
    { baseDesc: "light shines from %s mouth", dice: null },
    { baseDesc: "small lumps of ice fall from %s nostrils", dice: null },
    { baseDesc: "smoke hangs in the air about the %s", dice: null },
    { baseDesc: "stones near the   %s glisten with slime", dice: null },
    { baseDesc: "sunlight is painful to %s", dice: null },
];

const repetitiveMappedEffects = repetitiveEffects.map(effect => {
    const mappedEffect = {
        description: (subject, number, duration = '', timeUnit = '') => {
            let desc = `After each spell or attack, ${createDescription(effect.baseDesc, number, subject, duration, timeUnit)}.`;
            return desc;
        },
        dice: effect.dice,
        hasDuration: true,
        isUndoable: true
    };

    // Add undoDescription only if isUndoable is true
    if (mappedEffect.isUndoable) {
        mappedEffect.undoDescription = getUndoDescription;
    }

    return mappedEffect;
});

// Combine baseEffectsList and repetitiveMappedEffects into effects
const effects = [...baseEffectsList, ...repetitiveMappedEffects];

module.exports = {
    baseEffectsList,
    repetitiveMappedEffects,
    effects
};