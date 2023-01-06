var enchantments = [
	[0, "Protection", 4, 1, 1],
	[1, "Fire Protection", 4, 2, 1],
	[2, "Feather Falling", 4, 2, 1],
	[3, "Blast Protection", 4, 4, 2],
	[4, "Projectile Protection", 4, 2, 1],
	[5, "Thorns", 3, 8, 4],
	[6, "Respiration", 3, 4, 2],
	[7, "Depth Strider", 3, 4, 2],
	[8, "Aqua Affinity", 1, 4, 2],
	[9, "Sharpness", 5, 1, 1],
	[10, "Smite", 5, 2, 1],
	[11, "Bane of Arthropods", 5, 2, 1],
	[12, "Knockback", 2, 2, 1],
	[13, "FireAspect", 2, 4, 1],
	[14, "Looting", 3, 4, 2],
	[15, "Efficiency", 5, 1, 1],
	[16, "Silk Touch", 1, 8, 4],
	[17, "Unbreaking", 3, 2, 1],
	[18, "Fortune", 3, 4, 2],
	[19, "Power", 5, 1, 1],
	[20, "Punch", 2, 4, 2],
	[21, "Flame", 1, 4, 2],
	[22, "Infinity", 1, 8, 4],
	[23, "", 4, 1, 1],
	[24, "", 4, 1, 1],
	[25, "Frost Walker", 2, 4, 2],
	[26, "Mending", 1, 4, 2],
	[27, "", 4, 1, 1],
	[28, "", 4, 1, 1],
	[29, "", 4, 1, 1],
	[30, "", 4, 1, 1],
	[31, "", 4, 1, 1],
	[32, "", 4, 1, 1],
	[33, "", 4, 1, 1],
	[34, "", 4, 1, 1],
	[35, "", 4, 1, 1],
	[36, "Soul Speed", 3, 8, 4],
	[37, "Swift Sneak", 3, 8, 4],
	[38, "Sweeping Edge", 3, 4, 2]
];

var ench_obj = {
    "0": {
        "name": "Protection",
        "max_level": 4,
        "multiplier_tool": 1,
        "multiplier_book": 1,
		"incompatible": 0
    },
    "1": {
        "name": "Fire Protection",
        "max_level": 4,
        "multiplier_tool": 2,
        "multiplier_book": 1,
		"incompatible": 0
    },
    "2": {
        "name": "Feather Falling",
        "max_level": 4,
        "multiplier_tool": 2,
        "multiplier_book": 1,
    },
    "3": {
        "name": "Blast Protection",
        "max_level": 4,
        "multiplier_tool": 4,
        "multiplier_book": 2,
		"incompatible": 0
    },
    "4": {
        "name": "Projectile Protection",
        "max_level": 4,
        "multiplier_tool": 2,
        "multiplier_book": 1,
		"incompatible": 0
    },
    "5": {
        "name": "Thorns",
        "max_level": 3,
        "multiplier_tool": 8,
        "multiplier_book": 4,
    },
    "6": {
        "name": "Respiration",
        "max_level": 3,
        "multiplier_tool": 4,
        "multiplier_book": 2,
    },
    "7": {
        "name": "Depth Strider",
        "max_level": 3,
        "multiplier_tool": 4,
        "multiplier_book": 2,
		"incompatible": 3
    },
    "8": {
        "name": "Aqua Affinity",
        "max_level": 1,
        "multiplier_tool": 4,
        "multiplier_book": 2,
    },
    "9": {
        "name": "Sharpness",
        "max_level": 5,
        "multiplier_tool": 1,
        "multiplier_book": 1,
		"incompatible": 1
    },
    "10": {
        "name": "Smite",
        "max_level": 5,
        "multiplier_tool": 2,
        "multiplier_book": 1,
		"incompatible": 1
    },
    "11": {
        "name": "Bane of Arthropods",
        "max_level": 5,
        "multiplier_tool": 2,
        "multiplier_book": 1,
		"incompatible": 1
    },
    "12": {
        "name": "Knockback",
        "max_level": 2,
        "multiplier_tool": 2,
        "multiplier_book": 1,
    },
    "13": {
        "name": "FireAspect",
        "max_level": 2,
        "multiplier_tool": 4,
        "multiplier_book": 2,
    },
    "14": {
        "name": "Looting",
        "max_level": 3,
        "multiplier_tool": 4,
        "multiplier_book": 2,
    },
    "15": {
        "name": "Efficiency",
        "max_level": 5,
        "multiplier_tool": 1,
        "multiplier_book": 1,
    },
    "16": {
        "name": "Silk Touch",
        "max_level": 1,
        "multiplier_tool": 8,
        "multiplier_book": 4,
		"incompatible": 2
    },
    "17": {
        "name": "Unbreaking",
        "max_level": 3,
        "multiplier_tool": 2,
        "multiplier_book": 1,
    },
    "18": {
        "name": "Fortune",
        "max_level": 3,
        "multiplier_tool": 4,
        "multiplier_book": 2,
		"incompatible": 2
    },
    "19": {
        "name": "Power",
        "max_level": 5,
        "multiplier_tool": 1,
        "multiplier_book": 1,
    },
    "20": {
        "name": "Punch",
        "max_level": 2,
        "multiplier_tool": 4,
        "multiplier_book": 2,
    },
    "21": {
        "name": "Flame",
        "max_level": 1,
        "multiplier_tool": 4,
        "multiplier_book": 2,
    },
    "22": {
        "name": "Infinity",
        "max_level": 1,
        "multiplier_tool": 8,
        "multiplier_book": 4,
		"incompatible": 4
    },
    "23": {
        "name": "Luck of the Sea",
        "max_level": 3,
        "multiplier_tool": 4,
        "multiplier_book": 2,
    },
    "24": {
        "name": "Lure",
        "max_level": 3,
        "multiplier_tool": 4,
        "multiplier_book": 2,
    },
    "25": {
        "name": "Frost Walker",
        "max_level": 2,
        "multiplier_tool": 4,
        "multiplier_book": 2,
		"incompatible": 3
    },
    "26": {
        "name": "Mending",
        "max_level": 1,
        "multiplier_tool": 4,
        "multiplier_book": 2,
		"incompatible": 4
    },
    "27": {
        "name": "Curse of Binding",
        "max_level": 1,
        "multiplier_tool": 8,
        "multiplier_book": 4,
    },
    "28": {
        "name": "Curse of Vanishing",
        "max_level": 1,
        "multiplier_tool": 8,
        "multiplier_book": 4,
    },
    "29": {
        "name": "Impaling",
        "max_level": 5,
        "multiplier_tool": 4,
        "multiplier_book": 2,
    },
    "30": {
        "name": "Riptide",
        "max_level": 3,
        "multiplier_tool": 4,
        "multiplier_book": 2,
    },
    "31": {
        "name": "Loyalty",
        "max_level": 3,
        "multiplier_tool": 1,
        "multiplier_book": 1,
    },
    "32": {
        "name": "Channeling",
        "max_level": 1,
        "multiplier_tool": 8,
        "multiplier_book": 4,
    },
    "33": {
        "name": "Multishot",
        "max_level": 1,
        "multiplier_tool": 4,
        "multiplier_book": 2,
		"incompatible": 5
    },
    "34": {
        "name": "Piercing",
        "max_level": 4,
        "multiplier_tool": 1,
        "multiplier_book": 1,
		"incompatible": 5
    },
    "35": {
        "name": "Quick Charge",
        "max_level": 3,
        "multiplier_tool": 2,
        "multiplier_book": 1,
    },
    "36": {
        "name": "Soul Speed",
        "max_level": 3,
        "multiplier_tool": 8,
        "multiplier_book": 4,
    },
    "37": {
        "name": "Swift Sneak",
        "max_level": 3,
        "multiplier_tool": 8,
        "multiplier_book": 4,
    },
    "38": {
        "name": "Sweeping Edge",
        "max_level": 3,
        "multiplier_tool": 4,
        "multiplier_book": 2,
    },
};