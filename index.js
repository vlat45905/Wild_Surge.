const {
  rollDice,
  getRandomArrayElement,
  pluralize,
  getAdditionalCondition
} = require('./utils.js');

const {
  baseEffectsList,
  repetitiveMappedEffects
} = require('./effect.js');

const subjects = ["Caster", "Target", "Caster's Closest Ally", "Target's Closest Ally"];
const timeUnits = ["turn", "round", "minute", "hour", "day", "week", "month", "year"];

function getRandomEffect() {
  return Math.random() < 0.5
      ? getRandomArrayElement(baseEffectsList)
      : getRandomArrayElement(repetitiveMappedEffects);
}

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

function main() {
  const chosenEffect = getRandomEffect();
  const subject = getRandomArrayElement(subjects);
  const effectDescription = describeEffect(chosenEffect, subject);

  console.log(effectDescription);

  if (chosenEffect.isUndoable) {
      const { getUndoDescription } = require('./utils.js');
      console.log(getUndoDescription(effectDescription));
  }

  if (timeUnits.some(unit => effectDescription.includes(unit)) || effectDescription.includes('permanently')) {
      console.log(getAdditionalCondition());
  }
}

main();
