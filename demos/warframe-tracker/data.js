// Warframe Prime Tracker - Data Layer
// Base de datos completa de Warframes Prime y Armas Prime
// Fuente: https://wiki.warframe.com/w/Prime

const PRIME_DATA = {
    // =============================================
    // WARFRAMES PRIME (48 total)
    // Componentes estándar: Blueprint, Neuroptics, Chassis, Systems
    // =============================================
    warframes: [
        { id: "ash_prime", name: "Ash Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "atlas_prime", name: "Atlas Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "banshee_prime", name: "Banshee Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "baruuk_prime", name: "Baruuk Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "caliban_prime", name: "Caliban Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "chroma_prime", name: "Chroma Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "ember_prime", name: "Ember Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "equinox_prime", name: "Equinox Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "frost_prime", name: "Frost Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "gara_prime", name: "Gara Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "garuda_prime", name: "Garuda Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "gauss_prime", name: "Gauss Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "grendel_prime", name: "Grendel Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "gyre_prime", name: "Gyre Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "harrow_prime", name: "Harrow Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "hildryn_prime", name: "Hildryn Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "hydroid_prime", name: "Hydroid Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "inaros_prime", name: "Inaros Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "ivara_prime", name: "Ivara Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "khora_prime", name: "Khora Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "lavos_prime", name: "Lavos Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "limbo_prime", name: "Limbo Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "loki_prime", name: "Loki Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "mag_prime", name: "Mag Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "mesa_prime", name: "Mesa Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "mirage_prime", name: "Mirage Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "nekros_prime", name: "Nekros Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "nezha_prime", name: "Nezha Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "nidus_prime", name: "Nidus Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "nova_prime", name: "Nova Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "nyx_prime", name: "Nyx Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "oberon_prime", name: "Oberon Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "octavia_prime", name: "Octavia Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "protea_prime", name: "Protea Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "revenant_prime", name: "Revenant Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "rhino_prime", name: "Rhino Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "saryn_prime", name: "Saryn Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "sevagoth_prime", name: "Sevagoth Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "titania_prime", name: "Titania Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "trinity_prime", name: "Trinity Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "valkyr_prime", name: "Valkyr Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "vauban_prime", name: "Vauban Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "volt_prime", name: "Volt Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "wisp_prime", name: "Wisp Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "wukong_prime", name: "Wukong Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "xaku_prime", name: "Xaku Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "yareli_prime", name: "Yareli Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] },
        { id: "zephyr_prime", name: "Zephyr Prime", components: ["Blueprint", "Neuroptics", "Chassis", "Systems"] }
    ],

    // =============================================
    // ARMAS PRIME
    // =============================================
    weapons: [
        // =========================================
        // PRIMARY WEAPONS - RIFLES
        // =========================================
        { id: "acceltra_prime", name: "Acceltra Prime", category: "Primary", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "alternox_prime", name: "Alternox Prime", category: "Primary", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "baza_prime", name: "Baza Prime", category: "Primary", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "boltor_prime", name: "Boltor Prime", category: "Primary", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "braton_prime", name: "Braton Prime", category: "Primary", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "burston_prime", name: "Burston Prime", category: "Primary", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "latron_prime", name: "Latron Prime", category: "Primary", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "soma_prime", name: "Soma Prime", category: "Primary", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "stradavar_prime", name: "Stradavar Prime", category: "Primary", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "sybaris_prime", name: "Sybaris Prime", category: "Primary", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "tenora_prime", name: "Tenora Prime", category: "Primary", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "tiberon_prime", name: "Tiberon Prime", category: "Primary", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },

        // =========================================
        // PRIMARY WEAPONS - SHOTGUNS
        // =========================================
        { id: "astilla_prime", name: "Astilla Prime", category: "Primary", subtype: "Shotgun", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "boar_prime", name: "Boar Prime", category: "Primary", subtype: "Shotgun", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "corinth_prime", name: "Corinth Prime", category: "Primary", subtype: "Shotgun", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "phantasma_prime", name: "Phantasma Prime", category: "Primary", subtype: "Shotgun", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "strun_prime", name: "Strun Prime", category: "Primary", subtype: "Shotgun", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "tigris_prime", name: "Tigris Prime", category: "Primary", subtype: "Shotgun", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },

        // =========================================
        // PRIMARY WEAPONS - SNIPERS
        // =========================================
        { id: "rubico_prime", name: "Rubico Prime", category: "Primary", subtype: "Sniper", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "vectis_prime", name: "Vectis Prime", category: "Primary", subtype: "Sniper", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },

        // =========================================
        // PRIMARY WEAPONS - BOWS
        // =========================================
        { id: "cernos_prime", name: "Cernos Prime", category: "Primary", subtype: "Bow", components: ["Blueprint", "Grip", "Lower Limb", "Upper Limb", "String"] },
        { id: "daikyu_prime", name: "Daikyu Prime", category: "Primary", subtype: "Bow", components: ["Blueprint", "Grip", "Lower Limb", "Upper Limb", "String"] },
        { id: "paris_prime", name: "Paris Prime", category: "Primary", subtype: "Bow", components: ["Blueprint", "Grip", "Lower Limb", "Upper Limb", "String"] },

        // =========================================
        // PRIMARY WEAPONS - CROSSBOWS
        // =========================================
        { id: "nagantaka_prime", name: "Nagantaka Prime", category: "Primary", subtype: "Crossbow", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "zhuge_prime", name: "Zhuge Prime", category: "Primary", subtype: "Crossbow", components: ["Blueprint", "Barrel", "Receiver", "Stock", "String"] },

        // =========================================
        // PRIMARY WEAPONS - OTHERS
        // =========================================
        { id: "cedo_prime", name: "Cedo Prime", category: "Primary", subtype: "Shotgun", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "fulmin_prime", name: "Fulmin Prime", category: "Primary", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "gotva_prime", name: "Gotva Prime", category: "Primary", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "panthera_prime", name: "Panthera Prime", category: "Primary", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "scourge_prime", name: "Scourge Prime", category: "Primary", subtype: "Speargun", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "trumna_prime", name: "Trumna Prime", category: "Primary", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "vadarya_prime", name: "Vadarya Prime", category: "Primary", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },

        // =========================================
        // SECONDARY WEAPONS - SINGLE PISTOLS
        // =========================================
        { id: "bronco_prime", name: "Bronco Prime", category: "Secondary", subtype: "Pistol", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "euphona_prime", name: "Euphona Prime", category: "Secondary", subtype: "Pistol", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "knell_prime", name: "Knell Prime", category: "Secondary", subtype: "Pistol", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "lato_prime", name: "Lato Prime", category: "Secondary", subtype: "Pistol", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "lex_prime", name: "Lex Prime", category: "Secondary", subtype: "Pistol", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "magnus_prime", name: "Magnus Prime", category: "Secondary", subtype: "Pistol", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "pandero_prime", name: "Pandero Prime", category: "Secondary", subtype: "Pistol", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "pyrana_prime", name: "Pyrana Prime", category: "Secondary", subtype: "Pistol", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "sicarus_prime", name: "Sicarus Prime", category: "Secondary", subtype: "Pistol", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "vasto_prime", name: "Vasto Prime", category: "Secondary", subtype: "Pistol", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "zakti_prime", name: "Zakti Prime", category: "Secondary", subtype: "Pistol", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "zylok_prime", name: "Zylok Prime", category: "Secondary", subtype: "Pistol", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "sagek_prime", name: "Sagek Prime", category: "Secondary", subtype: "Pistol", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "kompressa_prime", name: "Kompressa Prime", category: "Secondary", subtype: "Pistol", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "velox_prime", name: "Velox Prime", category: "Secondary", subtype: "Pistol", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "epitaph_prime", name: "Epitaph Prime", category: "Secondary", subtype: "Pistol", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "hystrix_prime", name: "Hystrix Prime", category: "Secondary", subtype: "Pistol", components: ["Blueprint", "Barrel", "Receiver"] },

        // =========================================
        // SECONDARY WEAPONS - DUAL PISTOLS
        // =========================================
        // Note: For dual weapons, component counts follow standard Prime manufacturing requirements
        { id: "afuris_prime", name: "Afuris Prime", category: "Secondary", subtype: "Dual Pistol", components: ["Blueprint", "Barrel", "Barrel", "Receiver", "Receiver", "Link"] },
        { id: "akarius_prime", name: "Akarius Prime", category: "Secondary", subtype: "Dual Pistol", components: ["Blueprint", "Barrel", "Barrel", "Receiver", "Receiver", "Link"] },
        { id: "akbolto_prime", name: "Akbolto Prime", category: "Secondary", subtype: "Dual Pistol", components: ["Blueprint", "Barrel", "Barrel", "Receiver", "Receiver", "Link"] },
        { id: "akbronco_prime", name: "Akbronco Prime", category: "Secondary", subtype: "Dual Pistol", components: ["Blueprint", "Link"] }, // Requires 2x Bronco Prime crafted
        { id: "akjagara_prime", name: "Akjagara Prime", category: "Secondary", subtype: "Dual Pistol", components: ["Blueprint", "Barrel", "Barrel", "Receiver", "Receiver", "Link"] },
        { id: "aklex_prime", name: "Aklex Prime", category: "Secondary", subtype: "Dual Pistol", components: ["Blueprint", "Link"] }, // Requires 2x Lex Prime crafted
        { id: "akmagnus_prime", name: "Akmagnus Prime", category: "Secondary", subtype: "Dual Pistol", components: ["Blueprint", "Link"] }, // Requires 2x Magnus Prime crafted
        { id: "aksomati_prime", name: "Aksomati Prime", category: "Secondary", subtype: "Dual Pistol", components: ["Blueprint", "Barrel", "Barrel", "Receiver", "Receiver", "Link"] },
        { id: "akstiletto_prime", name: "Akstiletto Prime", category: "Secondary", subtype: "Dual Pistol", components: ["Blueprint", "Barrel", "Barrel", "Receiver", "Receiver", "Link"] },
        { id: "akvasto_prime", name: "Akvasto Prime", category: "Secondary", subtype: "Dual Pistol", components: ["Blueprint", "Link"] }, // Requires 2x Vasto Prime crafted

        // =========================================
        // SECONDARY WEAPONS - THROWING
        // =========================================
        { id: "hikou_prime", name: "Hikou Prime", category: "Secondary", subtype: "Throwing", components: ["Blueprint", "Pouch", "Pouch", "Stars", "Stars"] },
        { id: "spira_prime", name: "Spira Prime", category: "Secondary", subtype: "Throwing", components: ["Blueprint", "Blade", "Blade", "Pouch"] },

        // =========================================
        // SECONDARY WEAPONS - CROSSBOW
        // =========================================
        { id: "ballistica_prime", name: "Ballistica Prime", category: "Secondary", subtype: "Crossbow", components: ["Blueprint", "Lower Limb", "Upper Limb", "Receiver", "String"] },

        // =========================================
        // MELEE WEAPONS - SWORDS
        // =========================================
        { id: "dakra_prime", name: "Dakra Prime", category: "Melee", subtype: "Sword", components: ["Blueprint", "Blade", "Handle"] },
        { id: "pangolin_prime", name: "Pangolin Prime", category: "Melee", subtype: "Sword", components: ["Blueprint", "Blade", "Handle"] },
        { id: "skana_prime", name: "Skana Prime", category: "Melee", subtype: "Sword", components: ["Blueprint", "Blade", "Handle"] },

        // =========================================
        // MELEE WEAPONS - DUAL SWORDS
        // =========================================
        { id: "dual_kamas_prime", name: "Dual Kamas Prime", category: "Melee", subtype: "Dual Swords", components: ["Blueprint", "Blade", "Blade", "Handle", "Handle"] },
        { id: "dual_keres_prime", name: "Dual Keres Prime", category: "Melee", subtype: "Dual Swords", components: ["Blueprint", "Blade", "Blade", "Handle", "Handle"] },
        { id: "dual_zoren_prime", name: "Dual Zoren Prime", category: "Melee", subtype: "Dual Swords", components: ["Blueprint", "Blade", "Blade", "Handle", "Handle"] },
        { id: "nami_skyla_prime", name: "Nami Skyla Prime", category: "Melee", subtype: "Dual Swords", components: ["Blueprint", "Blade", "Blade", "Handle", "Handle"] },

        // =========================================
        // MELEE WEAPONS - DAGGERS
        // =========================================
        { id: "fang_prime", name: "Fang Prime", category: "Melee", subtype: "Dual Daggers", components: ["Blueprint", "Blade", "Blade", "Handle", "Handle"] },
        { id: "karyst_prime", name: "Karyst Prime", category: "Melee", subtype: "Dagger", components: ["Blueprint", "Blade", "Handle"] },
        { id: "okina_prime", name: "Okina Prime", category: "Melee", subtype: "Dual Daggers", components: ["Blueprint", "Blade", "Blade", "Handle", "Handle"] },

        // =========================================
        // MELEE WEAPONS - NIKANAS
        // =========================================
        { id: "nikana_prime", name: "Nikana Prime", category: "Melee", subtype: "Nikana", components: ["Blueprint", "Blade", "Hilt"] },
        { id: "tatsu_prime", name: "Tatsu Prime", category: "Melee", subtype: "Two-Handed Nikana", components: ["Blueprint", "Blade", "Handle"] },

        // =========================================
        // MELEE WEAPONS - POLEARMS
        // =========================================
        { id: "guandao_prime", name: "Guandao Prime", category: "Melee", subtype: "Polearm", components: ["Blueprint", "Blade", "Blade", "Handle"] },
        { id: "orthos_prime", name: "Orthos Prime", category: "Melee", subtype: "Polearm", components: ["Blueprint", "Blade", "Blade", "Handle"] },

        // =========================================
        // MELEE WEAPONS - STAVES
        // =========================================
        { id: "bo_prime", name: "Bo Prime", category: "Melee", subtype: "Staff", components: ["Blueprint", "Handle", "Ornament", "Ornament"] },
        { id: "tipedo_prime", name: "Tipedo Prime", category: "Melee", subtype: "Staff", components: ["Blueprint", "Handle", "Ornament", "Ornament"] },

        // =========================================
        // MELEE WEAPONS - HEAVY BLADES
        // =========================================
        { id: "galatine_prime", name: "Galatine Prime", category: "Melee", subtype: "Heavy Blade", components: ["Blueprint", "Blade", "Handle"] },
        { id: "gram_prime", name: "Gram Prime", category: "Melee", subtype: "Heavy Blade", components: ["Blueprint", "Blade", "Handle"] },
        { id: "scindo_prime", name: "Scindo Prime", category: "Melee", subtype: "Heavy Blade", components: ["Blueprint", "Blade", "Handle"] },

        // =========================================
        // MELEE WEAPONS - HAMMERS
        // =========================================
        { id: "fragor_prime", name: "Fragor Prime", category: "Melee", subtype: "Hammer", components: ["Blueprint", "Head", "Handle"] },
        { id: "volnus_prime", name: "Volnus Prime", category: "Melee", subtype: "Hammer", components: ["Blueprint", "Head", "Handle"] },

        // =========================================
        // MELEE WEAPONS - SCYTHES
        // =========================================
        { id: "reaper_prime", name: "Reaper Prime", category: "Melee", subtype: "Scythe", components: ["Blueprint", "Blade", "Handle"] },

        // =========================================
        // MELEE WEAPONS - FIST / SPARRING
        // =========================================
        { id: "ankyros_prime", name: "Ankyros Prime", category: "Melee", subtype: "Fist", components: ["Blueprint", "Blade", "Blade", "Gauntlet", "Gauntlet"] },
        { id: "kogake_prime", name: "Kogake Prime", category: "Melee", subtype: "Sparring", components: ["Blueprint", "Boot", "Boot", "Gauntlet", "Gauntlet"] },
        { id: "tekko_prime", name: "Tekko Prime", category: "Melee", subtype: "Fist", components: ["Blueprint", "Blade", "Blade", "Gauntlet", "Gauntlet"] },

        // =========================================
        // MELEE WEAPONS - CLAWS
        // =========================================
        { id: "venka_prime", name: "Venka Prime", category: "Melee", subtype: "Claws", components: ["Blueprint", "Blade", "Blade", "Gauntlet", "Gauntlet"] },

        // =========================================
        // MELEE WEAPONS - TONFAS
        // =========================================
        { id: "kronen_prime", name: "Kronen Prime", category: "Melee", subtype: "Tonfa", components: ["Blueprint", "Blade", "Blade", "Handle", "Handle"] },

        // =========================================
        // MELEE WEAPONS - WARFANS
        // =========================================
        { id: "gunsen_prime", name: "Gunsen Prime", category: "Melee", subtype: "Warfan", components: ["Blueprint", "Blade", "Blade", "Handle", "Handle"] },

        // =========================================
        // MELEE WEAPONS - GLAIVES
        // =========================================
        { id: "glaive_prime", name: "Glaive Prime", category: "Melee", subtype: "Glaive", components: ["Blueprint", "Blade", "Blade", "Disc"] },
        { id: "kestrel_prime", name: "Kestrel Prime", category: "Melee", subtype: "Glaive", components: ["Blueprint", "Blade", "Blade", "Disc"] },

        // =========================================
        // MELEE WEAPONS - RAPIERS
        // =========================================
        { id: "destreza_prime", name: "Destreza Prime", category: "Melee", subtype: "Rapier", components: ["Blueprint", "Blade", "Handle"] },

        // =========================================
        // MELEE WEAPONS - NUNCHAKU
        // =========================================
        { id: "ninkondi_prime", name: "Ninkondi Prime", category: "Melee", subtype: "Nunchaku", components: ["Blueprint", "Handle", "Handle", "Chain"] },

        // =========================================
        // MELEE WEAPONS - GUNBLADES
        // =========================================
        { id: "redeemer_prime", name: "Redeemer Prime", category: "Melee", subtype: "Gunblade", components: ["Blueprint", "Blade", "Handle"] },

        // =========================================
        // MELEE WEAPONS - SWORD & SHIELD
        // =========================================
        { id: "cobra_crane_prime", name: "Cobra & Crane Prime", category: "Melee", subtype: "Sword & Shield", components: ["Blueprint", "Blade", "Guard", "Hilt"] },
        { id: "silva_aegis_prime", name: "Silva & Aegis Prime", category: "Melee", subtype: "Sword & Shield", components: ["Blueprint", "Blade", "Guard", "Hilt"] },

        // =========================================
        // MELEE WEAPONS - WHIPS
        // =========================================
        { id: "masseter_prime", name: "Masseter Prime", category: "Melee", subtype: "Heavy Blade", components: ["Blueprint", "Blade", "Handle"] },
        { id: "venato_prime", name: "Venato Prime", category: "Melee", subtype: "Scythe", components: ["Blueprint", "Blade", "Handle"] },
        { id: "quassus_prime", name: "Quassus Prime", category: "Melee", subtype: "Warfan", components: ["Blueprint", "Blade", "Blade", "Handle"] },
        { id: "galariak_prime", name: "Galariak Prime", category: "Melee", subtype: "Glaive", components: ["Blueprint", "Blade", "Blade", "Disc"] },

        // =========================================
        // ARCH-GUNS
        // =========================================
        { id: "corvas_prime", name: "Corvas Prime", category: "Archgun", subtype: "Archgun", components: ["Blueprint", "Barrel", "Receiver", "Stock"] },
        { id: "larkspur_prime", name: "Larkspur Prime", category: "Archgun", subtype: "Archgun", components: ["Blueprint", "Barrel", "Receiver", "Stock"] }
    ],

    // =============================================
    // COMPANIONS PRIME (Sentinels)
    // =============================================
    sentinels: [
        { id: "carrier_prime", name: "Carrier Prime", type: "sentinel", components: ["Blueprint", "Cerebrum", "Carapace", "Systems"] },
        { id: "dethcube_prime", name: "Dethcube Prime", type: "sentinel", components: ["Blueprint", "Cerebrum", "Carapace", "Systems"] },
        { id: "helios_prime", name: "Helios Prime", type: "sentinel", components: ["Blueprint", "Cerebrum", "Carapace", "Systems"] },
        { id: "nautilus_prime", name: "Nautilus Prime", type: "sentinel", components: ["Blueprint", "Cerebrum", "Carapace", "Systems"] },
        { id: "shade_prime", name: "Shade Prime", type: "sentinel", components: ["Blueprint", "Cerebrum", "Carapace", "Systems"] },
        { id: "wyrm_prime", name: "Wyrm Prime", type: "sentinel", components: ["Blueprint", "Cerebrum", "Carapace", "Systems"] }
    ],

    // =============================================
    // SENTINEL WEAPONS PRIME
    // =============================================
    sentinelWeapons: [
        { id: "burst_laser_prime", name: "Burst Laser Prime", category: "Sentinel Weapon", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "deconstructor_prime", name: "Deconstructor Prime", category: "Sentinel Weapon", subtype: "Melee", components: ["Blueprint", "Blade", "Blade", "Handle"] },
        { id: "deth_machine_rifle_prime", name: "Deth Machine Rifle Prime", category: "Sentinel Weapon", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "prime_laser_rifle", name: "Prime Laser Rifle", category: "Sentinel Weapon", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "sweeper_prime", name: "Sweeper Prime", category: "Sentinel Weapon", subtype: "Shotgun", components: ["Blueprint", "Barrel", "Receiver"] },
        { id: "verglas_prime", name: "Verglas Prime", category: "Sentinel Weapon", subtype: "Rifle", components: ["Blueprint", "Barrel", "Receiver"] }
    ],

    // =============================================
    // ARCHWING PRIME
    // =============================================
    archwings: [
        { id: "odonata_prime", name: "Odonata Prime", type: "archwing", components: ["Blueprint", "Harness", "Systems", "Wings"] }
    ]
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PRIME_DATA;
}
