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
  audioUrl: string;
  category: string;
  matchObjects: MatchObjects;
}

export const ANIMALS: Animal[] = [
  {
    "id": "lion",
    "displayName": "Lion",
    "imageUrl": "/assets/animals/lion.svg",
    "audioUrl": "Lion",
    "category": "Wild Animals",
    "matchObjects": {
      "food": "/assets/items/meat.svg",
      "foodName": "Meat",
      "habitat": "/assets/items/savanna.svg",
      "habitatName": "Savanna",
      "object": "/assets/items/crown.svg",
      "objectName": "Crown"
    }
  },
  {
    "id": "cow",
    "displayName": "Cow",
    "imageUrl": "/assets/animals/cow.svg",
    "audioUrl": "Cow",
    "category": "Farm Animals",
    "matchObjects": {
      "food": "/assets/items/grass.svg",
      "foodName": "Grass",
      "habitat": "/assets/items/farm.svg",
      "habitatName": "Farm",
      "object": "/assets/items/milk.svg",
      "objectName": "Milk Bottle"
    }
  },
  {
    "id": "monkey",
    "displayName": "Monkey",
    "imageUrl": "/assets/animals/monkey.svg",
    "audioUrl": "Monkey",
    "category": "Wild Animals",
    "matchObjects": {
      "food": "/assets/items/banana.svg",
      "foodName": "Banana",
      "habitat": "/assets/items/jungle.svg",
      "habitatName": "Jungle",
      "object": "/assets/items/branch.svg",
      "objectName": "Tree Branch"
    }
  },
  {
    "id": "elephant",
    "displayName": "Elephant",
    "imageUrl": "/assets/animals/elephant.svg",
    "audioUrl": "Elephant",
    "category": "Wild Animals",
    "matchObjects": {
      "food": "/assets/items/peanut.svg",
      "foodName": "Peanuts",
      "habitat": "/assets/items/forest.svg",
      "habitatName": "Forest",
      "object": "/assets/items/trunk.svg",
      "objectName": "Water Trunk"
    }
  },
  {
    "id": "rabbit",
    "displayName": "Rabbit",
    "imageUrl": "/assets/animals/rabbit.svg",
    "audioUrl": "Rabbit",
    "category": "Farm Animals",
    "matchObjects": {
      "food": "/assets/items/carrot.svg",
      "foodName": "Carrot",
      "habitat": "/assets/items/burrow.svg",
      "habitatName": "Burrow",
      "object": "/assets/items/juice.svg",
      "objectName": "Carrot Juice"
    }
  },
  {
    "id": "frog",
    "displayName": "Frog",
    "imageUrl": "/assets/animals/frog.svg",
    "audioUrl": "Frog",
    "category": "Pond Life",
    "matchObjects": {
      "food": "/assets/items/fly.svg",
      "foodName": "Fly",
      "habitat": "/assets/items/pond.svg",
      "habitatName": "Pond",
      "object": "/assets/items/lilypad.svg",
      "objectName": "Lily Pad"
    }
  },
  {
    "id": "panda",
    "displayName": "Panda",
    "imageUrl": "/assets/animals/panda.svg",
    "audioUrl": "Panda",
    "category": "Wild Animals",
    "matchObjects": {
      "food": "/assets/items/bamboo.svg",
      "foodName": "Bamboo",
      "habitat": "/assets/items/bamboo_forest.svg",
      "habitatName": "Bamboo Forest",
      "object": "/assets/items/lantern.svg",
      "objectName": "Lantern"
    }
  },
  {
    "id": "bee",
    "displayName": "Bee",
    "imageUrl": "/assets/animals/bee.svg",
    "audioUrl": "Bee",
    "category": "Insects",
    "matchObjects": {
      "food": "/assets/items/flower.svg",
      "foodName": "Flower",
      "habitat": "/assets/items/hive.svg",
      "habitatName": "Beehive",
      "object": "/assets/items/honey.svg",
      "objectName": "Honey Jar"
    }
  },
  {
    "id": "tiger",
    "displayName": "Tiger",
    "imageUrl": "/assets/animals/tiger.svg",
    "audioUrl": "Tiger",
    "category": "Wild Animals",
    "matchObjects": {
      "food": "/assets/items/steak.svg",
      "foodName": "Steak",
      "habitat": "/assets/items/jungle_cave.svg",
      "habitatName": "Jungle Cave",
      "object": "/assets/items/claw.svg",
      "objectName": "Golden Claw"
    }
  },
  {
    "id": "zebra",
    "displayName": "Zebra",
    "imageUrl": "/assets/animals/zebra.svg",
    "audioUrl": "Zebra",
    "category": "Wild Animals",
    "matchObjects": {
      "food": "/assets/items/shrub.svg",
      "foodName": "Shrub",
      "habitat": "/assets/items/savanna_grass.svg",
      "habitatName": "Savanna Grass",
      "object": "/assets/items/stripe.svg",
      "objectName": "Zebra Pattern"
    }
  },
  {
    "id": "giraffe",
    "displayName": "Giraffe",
    "imageUrl": "/assets/animals/giraffe.svg",
    "audioUrl": "Giraffe",
    "category": "Wild Animals",
    "matchObjects": {
      "food": "/assets/items/acacia_leaves.svg",
      "foodName": "Acacia Leaves",
      "habitat": "/assets/items/savanna_trees.svg",
      "habitatName": "Savanna Trees",
      "object": "/assets/items/telescope.svg",
      "objectName": "Telescope"
    }
  },
  {
    "id": "kangaroo",
    "displayName": "Kangaroo",
    "imageUrl": "/assets/animals/kangaroo.svg",
    "audioUrl": "Kangaroo",
    "category": "Wild Animals",
    "matchObjects": {
      "food": "/assets/items/hay.svg",
      "foodName": "Dry Hay",
      "habitat": "/assets/items/outback.svg",
      "habitatName": "Outback",
      "object": "/assets/items/pouch.svg",
      "objectName": "Baby Pouch"
    }
  },
  {
    "id": "penguin",
    "displayName": "Penguin",
    "imageUrl": "/assets/animals/penguin.svg",
    "audioUrl": "Penguin",
    "category": "Polar Regions",
    "matchObjects": {
      "food": "/assets/items/anchovy.svg",
      "foodName": "Anchovy",
      "habitat": "/assets/items/iceberg.svg",
      "habitatName": "Iceberg",
      "object": "/assets/items/scarf.svg",
      "objectName": "Red Scarf"
    }
  },
  {
    "id": "koala",
    "displayName": "Koala",
    "imageUrl": "/assets/animals/koala.svg",
    "audioUrl": "Koala",
    "category": "Wild Animals",
    "matchObjects": {
      "food": "/assets/items/eucalyptus.svg",
      "foodName": "Eucalyptus",
      "habitat": "/assets/items/gum_tree.svg",
      "habitatName": "Gum Tree",
      "object": "/assets/items/pillow.svg",
      "objectName": "Soft Pillow"
    }
  },
  {
    "id": "bear",
    "displayName": "Bear",
    "imageUrl": "/assets/animals/bear.svg",
    "audioUrl": "Bear",
    "category": "Forest Friends",
    "matchObjects": {
      "food": "/assets/items/salmon.svg",
      "foodName": "Salmon",
      "habitat": "/assets/items/cave.svg",
      "habitatName": "Bear Cave",
      "object": "/assets/items/berry.svg",
      "objectName": "Blueberries"
    }
  },
  {
    "id": "fox",
    "displayName": "Fox",
    "imageUrl": "/assets/animals/fox.svg",
    "audioUrl": "Fox",
    "category": "Forest Friends",
    "matchObjects": {
      "food": "/assets/items/berries.svg",
      "foodName": "Forest Berries",
      "habitat": "/assets/items/den.svg",
      "habitatName": "Fox Den",
      "object": "/assets/items/tail.svg",
      "objectName": "Fluffy Tail"
    }
  },
  {
    "id": "pig",
    "displayName": "Pig",
    "imageUrl": "/assets/animals/pig.svg",
    "audioUrl": "Pig",
    "category": "Farm Animals",
    "matchObjects": {
      "food": "/assets/items/slop.svg",
      "foodName": "Vegetable Slop",
      "habitat": "/assets/items/pigpen.svg",
      "habitatName": "Pigpen",
      "object": "/assets/items/mud.svg",
      "objectName": "Mud Puddle"
    }
  },
  {
    "id": "sheep",
    "displayName": "Sheep",
    "imageUrl": "/assets/animals/sheep.svg",
    "audioUrl": "Sheep",
    "category": "Farm Animals",
    "matchObjects": {
      "food": "/assets/items/clover.svg",
      "foodName": "Sweet Clover",
      "habitat": "/assets/items/meadow.svg",
      "habitatName": "Meadow",
      "object": "/assets/items/wool.svg",
      "objectName": "Yarn Ball"
    }
  },
  {
    "id": "chicken",
    "displayName": "Chicken",
    "imageUrl": "/assets/animals/chicken.svg",
    "audioUrl": "Chicken",
    "category": "Farm Animals",
    "matchObjects": {
      "food": "/assets/items/grain.svg",
      "foodName": "Grain Mix",
      "habitat": "/assets/items/coop.svg",
      "habitatName": "Chicken Coop",
      "object": "/assets/items/egg.svg",
      "objectName": "Golden Egg"
    }
  },
  {
    "id": "duck",
    "displayName": "Duck",
    "imageUrl": "/assets/animals/duck.svg",
    "audioUrl": "Duck",
    "category": "Pond Life",
    "matchObjects": {
      "food": "/assets/items/duckweed.svg",
      "foodName": "Duckweed",
      "habitat": "/assets/items/lake.svg",
      "habitatName": "Lake",
      "object": "/assets/items/bubble.svg",
      "objectName": "Bath Bubble"
    }
  },
  {
    "id": "cat",
    "displayName": "Cat",
    "imageUrl": "/assets/animals/cat.svg",
    "audioUrl": "Cat",
    "category": "Pets",
    "matchObjects": {
      "food": "/assets/items/tuna.svg",
      "foodName": "Tuna Can",
      "habitat": "/assets/items/living_room.svg",
      "habitatName": "Living Room",
      "object": "/assets/items/toy_mouse.svg",
      "objectName": "Toy Mouse"
    }
  },
  {
    "id": "dog",
    "displayName": "Dog",
    "imageUrl": "/assets/animals/dog.svg",
    "audioUrl": "Dog",
    "category": "Pets",
    "matchObjects": {
      "food": "/assets/items/bone.svg",
      "foodName": "Chew Bone",
      "habitat": "/assets/items/doghouse.svg",
      "habitatName": "Doghouse",
      "object": "/assets/items/ball.svg",
      "objectName": "Tennis Ball"
    }
  },
  {
    "id": "horse",
    "displayName": "Horse",
    "imageUrl": "/assets/animals/horse.svg",
    "audioUrl": "Horse",
    "category": "Farm Animals",
    "matchObjects": {
      "food": "/assets/items/apple.svg",
      "foodName": "Red Apple",
      "habitat": "/assets/items/stable.svg",
      "habitatName": "Stable",
      "object": "/assets/items/horseshoe.svg",
      "objectName": "Horseshoe"
    }
  },
  {
    "id": "mouse",
    "displayName": "Mouse",
    "imageUrl": "/assets/animals/mouse.svg",
    "audioUrl": "Mouse",
    "category": "Forest Friends",
    "matchObjects": {
      "food": "/assets/items/cheese.svg",
      "foodName": "Cheese Block",
      "habitat": "/assets/items/wall_hole.svg",
      "habitatName": "Wall Hole",
      "object": "/assets/items/clock.svg",
      "objectName": "Pocket Watch"
    }
  },
  {
    "id": "squirrel",
    "displayName": "Squirrel",
    "imageUrl": "/assets/animals/squirrel.svg",
    "audioUrl": "Squirrel",
    "category": "Forest Friends",
    "matchObjects": {
      "food": "/assets/items/acorn.svg",
      "foodName": "Acorn",
      "habitat": "/assets/items/tree_hollow.svg",
      "habitatName": "Tree Hollow",
      "object": "/assets/items/nutcracker.svg",
      "objectName": "Nut Cracker"
    }
  },
  {
    "id": "deer",
    "displayName": "Deer",
    "imageUrl": "/assets/animals/deer.svg",
    "audioUrl": "Deer",
    "category": "Forest Friends",
    "matchObjects": {
      "food": "/assets/items/grass_buds.svg",
      "foodName": "Grass Buds",
      "habitat": "/assets/items/woodlands.svg",
      "habitatName": "Woodlands",
      "object": "/assets/items/antler.svg",
      "objectName": "Antler Crown"
    }
  },
  {
    "id": "owl",
    "displayName": "Owl",
    "imageUrl": "/assets/animals/owl.svg",
    "audioUrl": "Owl",
    "category": "Forest Friends",
    "matchObjects": {
      "food": "/assets/items/beetle.svg",
      "foodName": "Beetle",
      "habitat": "/assets/items/barn_rafter.svg",
      "habitatName": "Barn Rafter",
      "object": "/assets/items/glasses.svg",
      "objectName": "Round Glasses"
    }
  },
  {
    "id": "parrot",
    "displayName": "Parrot",
    "imageUrl": "/assets/animals/parrot.svg",
    "audioUrl": "Parrot",
    "category": "Jungle Birds",
    "matchObjects": {
      "food": "/assets/items/seeds.svg",
      "foodName": "Seeds",
      "habitat": "/assets/items/canopy.svg",
      "habitatName": "Jungle Canopy",
      "object": "/assets/items/feather.svg",
      "objectName": "Rainbow Feather"
    }
  },
  {
    "id": "dolphin",
    "displayName": "Dolphin",
    "imageUrl": "/assets/animals/dolphin.svg",
    "audioUrl": "Dolphin",
    "category": "Ocean Life",
    "matchObjects": {
      "food": "/assets/items/squid.svg",
      "foodName": "Squid",
      "habitat": "/assets/items/reef.svg",
      "habitatName": "Coral Reef",
      "object": "/assets/items/hoop.svg",
      "objectName": "Floating Hoop"
    }
  },
  {
    "id": "whale",
    "displayName": "Whale",
    "imageUrl": "/assets/animals/whale.svg",
    "audioUrl": "Whale",
    "category": "Ocean Life",
    "matchObjects": {
      "food": "/assets/items/krill.svg",
      "foodName": "Krill",
      "habitat": "/assets/items/deep_ocean.svg",
      "habitatName": "Deep Ocean",
      "object": "/assets/items/fountain.svg",
      "objectName": "Water Spout"
    }
  },
  {
    "id": "shark",
    "displayName": "Shark",
    "imageUrl": "/assets/animals/shark.svg",
    "audioUrl": "Shark",
    "category": "Ocean Life",
    "matchObjects": {
      "food": "/assets/items/mackerel.svg",
      "foodName": "Mackerel",
      "habitat": "/assets/items/open_sea.svg",
      "habitatName": "Open Sea",
      "object": "/assets/items/anchor.svg",
      "objectName": "Ship Anchor"
    }
  },
  {
    "id": "octopus",
    "displayName": "Octopus",
    "imageUrl": "/assets/animals/octopus.svg",
    "audioUrl": "Octopus",
    "category": "Ocean Life",
    "matchObjects": {
      "food": "/assets/items/crab_snack.svg",
      "foodName": "Crab Snack",
      "habitat": "/assets/items/sea_cave.svg",
      "habitatName": "Sea Cave",
      "object": "/assets/items/chest.svg",
      "objectName": "Treasure Chest"
    }
  },
  {
    "id": "turtle",
    "displayName": "Turtle",
    "imageUrl": "/assets/animals/turtle.svg",
    "audioUrl": "Turtle",
    "category": "Ocean Life",
    "matchObjects": {
      "food": "/assets/items/jellyfish.svg",
      "foodName": "Jellyfish",
      "habitat": "/assets/items/ocean_current.svg",
      "habitatName": "Ocean Current",
      "object": "/assets/items/shell.svg",
      "objectName": "Shield Shell"
    }
  },
  {
    "id": "crab",
    "displayName": "Crab",
    "imageUrl": "/assets/animals/crab.svg",
    "audioUrl": "Crab",
    "category": "Ocean Life",
    "matchObjects": {
      "food": "/assets/items/worm.svg",
      "foodName": "Marine Worm",
      "habitat": "/assets/items/beach.svg",
      "habitatName": "Sandy Beach",
      "object": "/assets/items/bucket.svg",
      "objectName": "Sand Bucket"
    }
  },
  {
    "id": "lobster",
    "displayName": "Lobster",
    "imageUrl": "/assets/animals/lobster.svg",
    "audioUrl": "Lobster",
    "category": "Ocean Life",
    "matchObjects": {
      "food": "/assets/items/clam.svg",
      "foodName": "Clam",
      "habitat": "/assets/items/sea_floor.svg",
      "habitatName": "Sea Floor",
      "object": "/assets/items/compass.svg",
      "objectName": "Compass"
    }
  },
  {
    "id": "starfish",
    "displayName": "Starfish",
    "imageUrl": "/assets/animals/starfish.svg",
    "audioUrl": "Starfish",
    "category": "Ocean Life",
    "matchObjects": {
      "food": "/assets/items/algae.svg",
      "foodName": "Green Algae",
      "habitat": "/assets/items/tide_pool.svg",
      "habitatName": "Tide Pool",
      "object": "/assets/items/star_badge.svg",
      "objectName": "Sheriff Star"
    }
  },
  {
    "id": "butterfly",
    "displayName": "Butterfly",
    "imageUrl": "/assets/animals/butterfly.svg",
    "audioUrl": "Butterfly",
    "category": "Insects",
    "matchObjects": {
      "food": "/assets/items/nectar.svg",
      "foodName": "Nectar",
      "habitat": "/assets/items/meadow_flowers.svg",
      "habitatName": "Meadow Flowers",
      "object": "/assets/items/magnifier.svg",
      "objectName": "Magnifying Glass"
    }
  },
  {
    "id": "ladybug",
    "displayName": "Ladybug",
    "imageUrl": "/assets/animals/ladybug.svg",
    "audioUrl": "Ladybug",
    "category": "Insects",
    "matchObjects": {
      "food": "/assets/items/aphid.svg",
      "foodName": "Aphid",
      "habitat": "/assets/items/leaf_underside.svg",
      "habitatName": "Leaf Underside",
      "object": "/assets/items/dots.svg",
      "objectName": "Spot Stamp"
    }
  },
  {
    "id": "ant",
    "displayName": "Ant",
    "imageUrl": "/assets/animals/ant.svg",
    "audioUrl": "Ant",
    "category": "Insects",
    "matchObjects": {
      "food": "/assets/items/sugar.svg",
      "foodName": "Sugar Cube",
      "habitat": "/assets/items/anthill.svg",
      "habitatName": "Anthill",
      "object": "/assets/items/leaf_umbrella.svg",
      "objectName": "Leaf Umbrella"
    }
  },
  {
    "id": "spider",
    "displayName": "Spider",
    "imageUrl": "/assets/animals/spider.svg",
    "audioUrl": "Spider",
    "category": "Insects",
    "matchObjects": {
      "food": "/assets/items/gnat.svg",
      "foodName": "Gnat",
      "habitat": "/assets/items/web.svg",
      "habitatName": "Spider Web",
      "object": "/assets/items/yarn.svg",
      "objectName": "Spider Silk Thread"
    }
  },
  {
    "id": "snail",
    "displayName": "Snail",
    "imageUrl": "/assets/animals/snail.svg",
    "audioUrl": "Snail",
    "category": "Pond Life",
    "matchObjects": {
      "food": "/assets/items/lettuce.svg",
      "foodName": "Lettuce Leaf",
      "habitat": "/assets/items/garden.svg",
      "habitatName": "Garden Path",
      "object": "/assets/items/shell_house.svg",
      "objectName": "Shell House"
    }
  },
  {
    "id": "caterpillar",
    "displayName": "Caterpillar",
    "imageUrl": "/assets/animals/caterpillar.svg",
    "audioUrl": "Caterpillar",
    "category": "Insects",
    "matchObjects": {
      "food": "/assets/items/leaf_veins.svg",
      "foodName": "Leaf Veins",
      "habitat": "/assets/items/shrubbery.svg",
      "habitatName": "Shrubbery",
      "object": "/assets/items/cocoon.svg",
      "objectName": "Silk Cocoon"
    }
  },
  {
    "id": "hippo",
    "displayName": "Hippo",
    "imageUrl": "/assets/animals/hippo.svg",
    "audioUrl": "Hippo",
    "category": "Wild Animals",
    "matchObjects": {
      "food": "/assets/items/water_grass.svg",
      "foodName": "Water Grass",
      "habitat": "/assets/items/riverbank.svg",
      "habitatName": "Riverbank",
      "object": "/assets/items/snorkel.svg",
      "objectName": "Snorkel Mask"
    }
  },
  {
    "id": "rhino",
    "displayName": "Rhino",
    "imageUrl": "/assets/animals/rhino.svg",
    "audioUrl": "Rhino",
    "category": "Wild Animals",
    "matchObjects": {
      "food": "/assets/items/twigs.svg",
      "foodName": "Woody Twigs",
      "habitat": "/assets/items/scrubland.svg",
      "habitatName": "Scrubland",
      "object": "/assets/items/horn.svg",
      "objectName": "Golden Horn"
    }
  },
  {
    "id": "cheetah",
    "displayName": "Cheetah",
    "imageUrl": "/assets/animals/cheetah.svg",
    "audioUrl": "Cheetah",
    "category": "Wild Animals",
    "matchObjects": {
      "food": "/assets/items/gazelle.svg",
      "foodName": "Gazelle Snack",
      "habitat": "/assets/items/grassy_plains.svg",
      "habitatName": "Grassy Plains",
      "object": "/assets/items/stopwatch.svg",
      "objectName": "Stopwatch"
    }
  },
  {
    "id": "wolf",
    "displayName": "Wolf",
    "imageUrl": "/assets/animals/wolf.svg",
    "audioUrl": "Wolf",
    "category": "Forest Friends",
    "matchObjects": {
      "food": "/assets/items/meat_rib.svg",
      "foodName": "Meat Rib",
      "habitat": "/assets/items/rocky_hills.svg",
      "habitatName": "Rocky Hills",
      "object": "/assets/items/moon.svg",
      "objectName": "Moon Crest"
    }
  },
  {
    "id": "beaver",
    "displayName": "Beaver",
    "imageUrl": "/assets/animals/beaver.svg",
    "audioUrl": "Beaver",
    "category": "Pond Life",
    "matchObjects": {
      "food": "/assets/items/bark.svg",
      "foodName": "Tree Bark",
      "habitat": "/assets/items/dam.svg",
      "habitatName": "Beaver Dam",
      "object": "/assets/items/log.svg",
      "objectName": "Wood Log"
    }
  },
  {
    "id": "otter",
    "displayName": "Otter",
    "imageUrl": "/assets/animals/otter.svg",
    "audioUrl": "Otter",
    "category": "Pond Life",
    "matchObjects": {
      "food": "/assets/items/sea_urchin.svg",
      "foodName": "Sea Urchin",
      "habitat": "/assets/items/river_bend.svg",
      "habitatName": "River Bend",
      "object": "/assets/items/stone.svg",
      "objectName": "Favorite Pebble"
    }
  },
  {
    "id": "sloth",
    "displayName": "Sloth",
    "imageUrl": "/assets/animals/sloth.svg",
    "audioUrl": "Sloth",
    "category": "Wild Animals",
    "matchObjects": {
      "food": "/assets/items/leaf_buds.svg",
      "foodName": "Leaf Buds",
      "habitat": "/assets/items/treetops.svg",
      "habitatName": "Treetops",
      "object": "/assets/items/hammock.svg",
      "objectName": "Mini Hammock"
    }
  },
  {
    "id": "flamingo",
    "displayName": "Flamingo",
    "imageUrl": "/assets/animals/flamingo.svg",
    "audioUrl": "Flamingo",
    "category": "Jungle Birds",
    "matchObjects": {
      "food": "/assets/items/shrimp.svg",
      "foodName": "Shrimp",
      "habitat": "/assets/items/salt_lake.svg",
      "habitatName": "Salt Lake",
      "object": "/assets/items/sunglasses.svg",
      "objectName": "Pink Sunglasses"
    }
  }
];
