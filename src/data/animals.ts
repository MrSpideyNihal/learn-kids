export interface MatchObjects {
  food: string;
  foodName: string;
  habitat: string;
  habitatName: string;
  object: string;
  objectName: string;
}

export interface Animal {
  id: string;
  displayName: string;
  imageUrl: string;
  audioUrl: string; // Pronunciation pronunciation text for Web Speech synthesis
  category: string;
  matchObjects: MatchObjects;
}

export const ANIMALS: Animal[] = [
  {
    id: 'lion',
    displayName: 'Lion',
    imageUrl: '/assets/animals/lion.svg',
    audioUrl: 'Lion',
    category: 'Wild Animals',
    matchObjects: {
      food: '/assets/items/meat.svg',
      foodName: 'Meat',
      habitat: '/assets/items/savanna.svg',
      habitatName: 'Savanna',
      object: '/assets/items/crown.svg',
      objectName: 'Crown',
    },
  },
  {
    id: 'cow',
    displayName: 'Cow',
    imageUrl: '/assets/animals/cow.svg',
    audioUrl: 'Cow',
    category: 'Farm Animals',
    matchObjects: {
      food: '/assets/items/grass.svg',
      foodName: 'Grass',
      habitat: '/assets/items/farm.svg',
      habitatName: 'Farm',
      object: '/assets/items/milk.svg',
      objectName: 'Milk Bottle',
    },
  },
  {
    id: 'monkey',
    displayName: 'Monkey',
    imageUrl: '/assets/animals/monkey.svg',
    audioUrl: 'Monkey',
    category: 'Wild Animals',
    matchObjects: {
      food: '/assets/items/banana.svg',
      foodName: 'Banana',
      habitat: '/assets/items/jungle.svg',
      habitatName: 'Jungle',
      object: '/assets/items/branch.svg',
      objectName: 'Tree Branch',
    },
  },
  {
    id: 'elephant',
    displayName: 'Elephant',
    imageUrl: '/assets/animals/elephant.svg',
    audioUrl: 'Elephant',
    category: 'Wild Animals',
    matchObjects: {
      food: '/assets/items/peanut.svg',
      foodName: 'Peanuts',
      habitat: '/assets/items/forest.svg',
      habitatName: 'Forest',
      object: '/assets/items/trunk.svg',
      objectName: 'Water Trunk',
    },
  },
  {
    id: 'rabbit',
    displayName: 'Rabbit',
    imageUrl: '/assets/animals/rabbit.svg',
    audioUrl: 'Rabbit',
    category: 'Farm Animals',
    matchObjects: {
      food: '/assets/items/carrot.svg',
      foodName: 'Carrot',
      habitat: '/assets/items/burrow.svg',
      habitatName: 'Burrow',
      object: '/assets/items/juice.svg',
      objectName: 'Carrot Juice',
    },
  },
  {
    id: 'frog',
    displayName: 'Frog',
    imageUrl: '/assets/animals/frog.svg',
    audioUrl: 'Frog',
    category: 'Pond Life',
    matchObjects: {
      food: '/assets/items/fly.svg',
      foodName: 'Fly',
      habitat: '/assets/items/pond.svg',
      habitatName: 'Pond',
      object: '/assets/items/lilypad.svg',
      objectName: 'Lily Pad',
    },
  },
  {
    id: 'panda',
    displayName: 'Panda',
    imageUrl: '/assets/animals/panda.svg',
    audioUrl: 'Panda',
    category: 'Wild Animals',
    matchObjects: {
      food: '/assets/items/bamboo.svg',
      foodName: 'Bamboo',
      habitat: '/assets/items/bamboo_forest.svg',
      habitatName: 'Bamboo Forest',
      object: '/assets/items/lantern.svg',
      objectName: 'Lantern',
    },
  },
  {
    id: 'bee',
    displayName: 'Bee',
    imageUrl: '/assets/animals/bee.svg',
    audioUrl: 'Bee',
    category: 'Insects',
    matchObjects: {
      food: '/assets/items/flower.svg',
      foodName: 'Flower',
      habitat: '/assets/items/hive.svg',
      habitatName: 'Beehive',
      object: '/assets/items/honey.svg',
      objectName: 'Honey Jar',
    },
  },
];
