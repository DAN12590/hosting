// Lista de objetos Prime y las piezas que necesita cada uno.
// Sacado de https://wiki.warframe.com/w/Prime
//
// Ojo con los id: es la clave con la que se guarda el progreso en localStorage,
// si se cambia uno se pierde lo que tuviera marcado ese objeto.

// Muchos objetos usan las mismas piezas, así no las repito en cada uno
const PARTS = {
    warframe:       ['Blueprint', 'Neuroptics', 'Chassis', 'Systems'],
    sentinel:       ['Blueprint', 'Cerebrum', 'Carapace', 'Systems'],

    // Armas de fuego
    rifle:          ['Blueprint', 'Barrel', 'Receiver', 'Stock'],
    bow:            ['Blueprint', 'Grip', 'Lower Limb', 'Upper Limb', 'String'],
    pistol:         ['Blueprint', 'Barrel', 'Receiver'],
    dualPistol:     ['Blueprint', 'Barrel', 'Barrel', 'Receiver', 'Receiver', 'Link'],
    akimboOfSingle: ['Blueprint', 'Link'], // además pide 2 copias de la pistola simple ya fabricadas

    // Cuerpo a cuerpo
    melee:          ['Blueprint', 'Blade', 'Handle'],
    dualMelee:      ['Blueprint', 'Blade', 'Blade', 'Handle', 'Handle'],
    doubleBlade:    ['Blueprint', 'Blade', 'Blade', 'Handle'],
    gauntlets:      ['Blueprint', 'Blade', 'Blade', 'Gauntlet', 'Gauntlet'],
    glaive:         ['Blueprint', 'Blade', 'Blade', 'Disc'],
    staff:          ['Blueprint', 'Handle', 'Ornament', 'Ornament'],
    swordAndShield: ['Blueprint', 'Blade', 'Guard', 'Hilt']
};

const PRIME_DATA = {
    // Warframes
    warframes: [
        { id: 'ash_prime', name: 'Ash Prime', components: PARTS.warframe },
        { id: 'atlas_prime', name: 'Atlas Prime', components: PARTS.warframe },
        { id: 'banshee_prime', name: 'Banshee Prime', components: PARTS.warframe },
        { id: 'baruuk_prime', name: 'Baruuk Prime', components: PARTS.warframe },
        { id: 'caliban_prime', name: 'Caliban Prime', components: PARTS.warframe },
        { id: 'chroma_prime', name: 'Chroma Prime', components: PARTS.warframe },
        { id: 'ember_prime', name: 'Ember Prime', components: PARTS.warframe },
        { id: 'equinox_prime', name: 'Equinox Prime', components: PARTS.warframe },
        { id: 'frost_prime', name: 'Frost Prime', components: PARTS.warframe },
        { id: 'gara_prime', name: 'Gara Prime', components: PARTS.warframe },
        { id: 'garuda_prime', name: 'Garuda Prime', components: PARTS.warframe },
        { id: 'gauss_prime', name: 'Gauss Prime', components: PARTS.warframe },
        { id: 'grendel_prime', name: 'Grendel Prime', components: PARTS.warframe },
        { id: 'gyre_prime', name: 'Gyre Prime', components: PARTS.warframe },
        { id: 'harrow_prime', name: 'Harrow Prime', components: PARTS.warframe },
        { id: 'hildryn_prime', name: 'Hildryn Prime', components: PARTS.warframe },
        { id: 'hydroid_prime', name: 'Hydroid Prime', components: PARTS.warframe },
        { id: 'inaros_prime', name: 'Inaros Prime', components: PARTS.warframe },
        { id: 'ivara_prime', name: 'Ivara Prime', components: PARTS.warframe },
        { id: 'khora_prime', name: 'Khora Prime', components: PARTS.warframe },
        { id: 'lavos_prime', name: 'Lavos Prime', components: PARTS.warframe },
        { id: 'limbo_prime', name: 'Limbo Prime', components: PARTS.warframe },
        { id: 'loki_prime', name: 'Loki Prime', components: PARTS.warframe },
        { id: 'mag_prime', name: 'Mag Prime', components: PARTS.warframe },
        { id: 'mesa_prime', name: 'Mesa Prime', components: PARTS.warframe },
        { id: 'mirage_prime', name: 'Mirage Prime', components: PARTS.warframe },
        { id: 'nekros_prime', name: 'Nekros Prime', components: PARTS.warframe },
        { id: 'nezha_prime', name: 'Nezha Prime', components: PARTS.warframe },
        { id: 'nidus_prime', name: 'Nidus Prime', components: PARTS.warframe },
        { id: 'nova_prime', name: 'Nova Prime', components: PARTS.warframe },
        { id: 'nyx_prime', name: 'Nyx Prime', components: PARTS.warframe },
        { id: 'oberon_prime', name: 'Oberon Prime', components: PARTS.warframe },
        { id: 'octavia_prime', name: 'Octavia Prime', components: PARTS.warframe },
        { id: 'protea_prime', name: 'Protea Prime', components: PARTS.warframe },
        { id: 'revenant_prime', name: 'Revenant Prime', components: PARTS.warframe },
        { id: 'rhino_prime', name: 'Rhino Prime', components: PARTS.warframe },
        { id: 'saryn_prime', name: 'Saryn Prime', components: PARTS.warframe },
        { id: 'sevagoth_prime', name: 'Sevagoth Prime', components: PARTS.warframe },
        { id: 'titania_prime', name: 'Titania Prime', components: PARTS.warframe },
        { id: 'trinity_prime', name: 'Trinity Prime', components: PARTS.warframe },
        { id: 'valkyr_prime', name: 'Valkyr Prime', components: PARTS.warframe },
        { id: 'vauban_prime', name: 'Vauban Prime', components: PARTS.warframe },
        { id: 'volt_prime', name: 'Volt Prime', components: PARTS.warframe },
        { id: 'wisp_prime', name: 'Wisp Prime', components: PARTS.warframe },
        { id: 'wukong_prime', name: 'Wukong Prime', components: PARTS.warframe },
        { id: 'xaku_prime', name: 'Xaku Prime', components: PARTS.warframe },
        { id: 'yareli_prime', name: 'Yareli Prime', components: PARTS.warframe },
        { id: 'zephyr_prime', name: 'Zephyr Prime', components: PARTS.warframe }
    ],


    // Armas
    weapons: [
        // Primarias: rifles
        { id: 'acceltra_prime', name: 'Acceltra Prime', category: 'Primary', subtype: 'Rifle', components: PARTS.rifle },
        { id: 'alternox_prime', name: 'Alternox Prime', category: 'Primary', subtype: 'Rifle', components: PARTS.rifle },
        { id: 'baza_prime', name: 'Baza Prime', category: 'Primary', subtype: 'Rifle', components: PARTS.rifle },
        { id: 'boltor_prime', name: 'Boltor Prime', category: 'Primary', subtype: 'Rifle', components: PARTS.rifle },
        { id: 'braton_prime', name: 'Braton Prime', category: 'Primary', subtype: 'Rifle', components: PARTS.rifle },
        { id: 'burston_prime', name: 'Burston Prime', category: 'Primary', subtype: 'Rifle', components: PARTS.rifle },
        { id: 'fulmin_prime', name: 'Fulmin Prime', category: 'Primary', subtype: 'Rifle', components: PARTS.rifle },
        { id: 'gotva_prime', name: 'Gotva Prime', category: 'Primary', subtype: 'Rifle', components: PARTS.rifle },
        { id: 'latron_prime', name: 'Latron Prime', category: 'Primary', subtype: 'Rifle', components: PARTS.rifle },
        { id: 'panthera_prime', name: 'Panthera Prime', category: 'Primary', subtype: 'Rifle', components: PARTS.rifle },
        { id: 'soma_prime', name: 'Soma Prime', category: 'Primary', subtype: 'Rifle', components: PARTS.rifle },
        { id: 'stradavar_prime', name: 'Stradavar Prime', category: 'Primary', subtype: 'Rifle', components: PARTS.rifle },
        { id: 'sybaris_prime', name: 'Sybaris Prime', category: 'Primary', subtype: 'Rifle', components: PARTS.rifle },
        { id: 'tenora_prime', name: 'Tenora Prime', category: 'Primary', subtype: 'Rifle', components: PARTS.rifle },
        { id: 'tiberon_prime', name: 'Tiberon Prime', category: 'Primary', subtype: 'Rifle', components: PARTS.rifle },
        { id: 'trumna_prime', name: 'Trumna Prime', category: 'Primary', subtype: 'Rifle', components: PARTS.rifle },
        { id: 'vadarya_prime', name: 'Vadarya Prime', category: 'Primary', subtype: 'Rifle', components: PARTS.rifle },

        // Primarias: escopetas
        { id: 'astilla_prime', name: 'Astilla Prime', category: 'Primary', subtype: 'Shotgun', components: PARTS.rifle },
        { id: 'boar_prime', name: 'Boar Prime', category: 'Primary', subtype: 'Shotgun', components: PARTS.rifle },
        { id: 'cedo_prime', name: 'Cedo Prime', category: 'Primary', subtype: 'Shotgun', components: PARTS.rifle },
        { id: 'corinth_prime', name: 'Corinth Prime', category: 'Primary', subtype: 'Shotgun', components: PARTS.rifle },
        { id: 'phantasma_prime', name: 'Phantasma Prime', category: 'Primary', subtype: 'Shotgun', components: PARTS.rifle },
        { id: 'strun_prime', name: 'Strun Prime', category: 'Primary', subtype: 'Shotgun', components: PARTS.rifle },
        { id: 'tigris_prime', name: 'Tigris Prime', category: 'Primary', subtype: 'Shotgun', components: PARTS.rifle },

        // Primarias: francotirador, arcos, ballestas y arpón
        { id: 'rubico_prime', name: 'Rubico Prime', category: 'Primary', subtype: 'Sniper', components: PARTS.rifle },
        { id: 'vectis_prime', name: 'Vectis Prime', category: 'Primary', subtype: 'Sniper', components: PARTS.rifle },
        { id: 'cernos_prime', name: 'Cernos Prime', category: 'Primary', subtype: 'Bow', components: PARTS.bow },
        { id: 'daikyu_prime', name: 'Daikyu Prime', category: 'Primary', subtype: 'Bow', components: PARTS.bow },
        { id: 'paris_prime', name: 'Paris Prime', category: 'Primary', subtype: 'Bow', components: PARTS.bow },
        { id: 'nagantaka_prime', name: 'Nagantaka Prime', category: 'Primary', subtype: 'Crossbow', components: PARTS.rifle },
        { id: 'zhuge_prime', name: 'Zhuge Prime', category: 'Primary', subtype: 'Crossbow', components: ['Blueprint', 'Barrel', 'Receiver', 'Stock', 'String'] },
        { id: 'scourge_prime', name: 'Scourge Prime', category: 'Primary', subtype: 'Speargun', components: PARTS.rifle },

        // Secundarias: pistolas
        { id: 'bronco_prime', name: 'Bronco Prime', category: 'Secondary', subtype: 'Pistol', components: PARTS.pistol },
        { id: 'epitaph_prime', name: 'Epitaph Prime', category: 'Secondary', subtype: 'Pistol', components: PARTS.pistol },
        { id: 'euphona_prime', name: 'Euphona Prime', category: 'Secondary', subtype: 'Pistol', components: PARTS.pistol },
        { id: 'hystrix_prime', name: 'Hystrix Prime', category: 'Secondary', subtype: 'Pistol', components: PARTS.pistol },
        { id: 'knell_prime', name: 'Knell Prime', category: 'Secondary', subtype: 'Pistol', components: PARTS.pistol },
        { id: 'kompressa_prime', name: 'Kompressa Prime', category: 'Secondary', subtype: 'Pistol', components: PARTS.pistol },
        { id: 'lato_prime', name: 'Lato Prime', category: 'Secondary', subtype: 'Pistol', components: PARTS.pistol },
        { id: 'lex_prime', name: 'Lex Prime', category: 'Secondary', subtype: 'Pistol', components: PARTS.pistol },
        { id: 'magnus_prime', name: 'Magnus Prime', category: 'Secondary', subtype: 'Pistol', components: PARTS.pistol },
        { id: 'pandero_prime', name: 'Pandero Prime', category: 'Secondary', subtype: 'Pistol', components: PARTS.pistol },
        { id: 'pyrana_prime', name: 'Pyrana Prime', category: 'Secondary', subtype: 'Pistol', components: PARTS.pistol },
        { id: 'sagek_prime', name: 'Sagek Prime', category: 'Secondary', subtype: 'Pistol', components: PARTS.pistol },
        { id: 'sicarus_prime', name: 'Sicarus Prime', category: 'Secondary', subtype: 'Pistol', components: PARTS.pistol },
        { id: 'vasto_prime', name: 'Vasto Prime', category: 'Secondary', subtype: 'Pistol', components: PARTS.pistol },
        { id: 'velox_prime', name: 'Velox Prime', category: 'Secondary', subtype: 'Pistol', components: PARTS.pistol },
        { id: 'zakti_prime', name: 'Zakti Prime', category: 'Secondary', subtype: 'Pistol', components: PARTS.pistol },
        { id: 'zylok_prime', name: 'Zylok Prime', category: 'Secondary', subtype: 'Pistol', components: PARTS.pistol },

        // Secundarias: pistolas dobles
        { id: 'afuris_prime', name: 'Afuris Prime', category: 'Secondary', subtype: 'Dual Pistol', components: PARTS.dualPistol },
        { id: 'akarius_prime', name: 'Akarius Prime', category: 'Secondary', subtype: 'Dual Pistol', components: PARTS.dualPistol },
        { id: 'akbolto_prime', name: 'Akbolto Prime', category: 'Secondary', subtype: 'Dual Pistol', components: PARTS.dualPistol },
        { id: 'akbronco_prime', name: 'Akbronco Prime', category: 'Secondary', subtype: 'Dual Pistol', components: PARTS.akimboOfSingle },
        { id: 'akjagara_prime', name: 'Akjagara Prime', category: 'Secondary', subtype: 'Dual Pistol', components: PARTS.dualPistol },
        { id: 'aklex_prime', name: 'Aklex Prime', category: 'Secondary', subtype: 'Dual Pistol', components: PARTS.akimboOfSingle },
        { id: 'akmagnus_prime', name: 'Akmagnus Prime', category: 'Secondary', subtype: 'Dual Pistol', components: PARTS.akimboOfSingle },
        { id: 'aksomati_prime', name: 'Aksomati Prime', category: 'Secondary', subtype: 'Dual Pistol', components: PARTS.dualPistol },
        { id: 'akstiletto_prime', name: 'Akstiletto Prime', category: 'Secondary', subtype: 'Dual Pistol', components: PARTS.dualPistol },
        { id: 'akvasto_prime', name: 'Akvasto Prime', category: 'Secondary', subtype: 'Dual Pistol', components: PARTS.akimboOfSingle },

        // Secundarias: arrojadizas y ballesta
        { id: 'hikou_prime', name: 'Hikou Prime', category: 'Secondary', subtype: 'Throwing', components: ['Blueprint', 'Pouch', 'Pouch', 'Stars', 'Stars'] },
        { id: 'spira_prime', name: 'Spira Prime', category: 'Secondary', subtype: 'Throwing', components: ['Blueprint', 'Blade', 'Blade', 'Pouch'] },
        { id: 'ballistica_prime', name: 'Ballistica Prime', category: 'Secondary', subtype: 'Crossbow', components: ['Blueprint', 'Lower Limb', 'Upper Limb', 'Receiver', 'String'] },

        // Cuerpo a cuerpo: una hoja
        { id: 'dakra_prime', name: 'Dakra Prime', category: 'Melee', subtype: 'Sword', components: PARTS.melee },
        { id: 'pangolin_prime', name: 'Pangolin Prime', category: 'Melee', subtype: 'Sword', components: PARTS.melee },
        { id: 'skana_prime', name: 'Skana Prime', category: 'Melee', subtype: 'Sword', components: PARTS.melee },
        { id: 'karyst_prime', name: 'Karyst Prime', category: 'Melee', subtype: 'Dagger', components: PARTS.melee },
        { id: 'nikana_prime', name: 'Nikana Prime', category: 'Melee', subtype: 'Nikana', components: ['Blueprint', 'Blade', 'Hilt'] },
        { id: 'tatsu_prime', name: 'Tatsu Prime', category: 'Melee', subtype: 'Two-Handed Nikana', components: PARTS.melee },
        { id: 'galatine_prime', name: 'Galatine Prime', category: 'Melee', subtype: 'Heavy Blade', components: PARTS.melee },
        { id: 'gram_prime', name: 'Gram Prime', category: 'Melee', subtype: 'Heavy Blade', components: PARTS.melee },
        { id: 'masseter_prime', name: 'Masseter Prime', category: 'Melee', subtype: 'Heavy Blade', components: PARTS.melee },
        { id: 'scindo_prime', name: 'Scindo Prime', category: 'Melee', subtype: 'Heavy Blade', components: PARTS.melee },
        { id: 'reaper_prime', name: 'Reaper Prime', category: 'Melee', subtype: 'Scythe', components: PARTS.melee },
        { id: 'venato_prime', name: 'Venato Prime', category: 'Melee', subtype: 'Scythe', components: PARTS.melee },
        { id: 'destreza_prime', name: 'Destreza Prime', category: 'Melee', subtype: 'Rapier', components: PARTS.melee },
        { id: 'redeemer_prime', name: 'Redeemer Prime', category: 'Melee', subtype: 'Gunblade', components: PARTS.melee },
        { id: 'fragor_prime', name: 'Fragor Prime', category: 'Melee', subtype: 'Hammer', components: ['Blueprint', 'Head', 'Handle'] },
        { id: 'volnus_prime', name: 'Volnus Prime', category: 'Melee', subtype: 'Hammer', components: ['Blueprint', 'Head', 'Handle'] },

        // Cuerpo a cuerpo: armas dobles
        { id: 'dual_kamas_prime', name: 'Dual Kamas Prime', category: 'Melee', subtype: 'Dual Swords', components: PARTS.dualMelee },
        { id: 'dual_keres_prime', name: 'Dual Keres Prime', category: 'Melee', subtype: 'Dual Swords', components: PARTS.dualMelee },
        { id: 'dual_zoren_prime', name: 'Dual Zoren Prime', category: 'Melee', subtype: 'Dual Swords', components: PARTS.dualMelee },
        { id: 'nami_skyla_prime', name: 'Nami Skyla Prime', category: 'Melee', subtype: 'Dual Swords', components: PARTS.dualMelee },
        { id: 'fang_prime', name: 'Fang Prime', category: 'Melee', subtype: 'Dual Daggers', components: PARTS.dualMelee },
        { id: 'okina_prime', name: 'Okina Prime', category: 'Melee', subtype: 'Dual Daggers', components: PARTS.dualMelee },
        { id: 'kronen_prime', name: 'Kronen Prime', category: 'Melee', subtype: 'Tonfa', components: PARTS.dualMelee },
        { id: 'gunsen_prime', name: 'Gunsen Prime', category: 'Melee', subtype: 'Warfan', components: PARTS.dualMelee },
        { id: 'quassus_prime', name: 'Quassus Prime', category: 'Melee', subtype: 'Warfan', components: PARTS.doubleBlade },
        { id: 'guandao_prime', name: 'Guandao Prime', category: 'Melee', subtype: 'Polearm', components: PARTS.doubleBlade },
        { id: 'orthos_prime', name: 'Orthos Prime', category: 'Melee', subtype: 'Polearm', components: PARTS.doubleBlade },

        // Cuerpo a cuerpo: puños, garras, bastones, glaives y otros
        { id: 'ankyros_prime', name: 'Ankyros Prime', category: 'Melee', subtype: 'Fist', components: PARTS.gauntlets },
        { id: 'tekko_prime', name: 'Tekko Prime', category: 'Melee', subtype: 'Fist', components: PARTS.gauntlets },
        { id: 'venka_prime', name: 'Venka Prime', category: 'Melee', subtype: 'Claws', components: PARTS.gauntlets },
        { id: 'kogake_prime', name: 'Kogake Prime', category: 'Melee', subtype: 'Sparring', components: ['Blueprint', 'Boot', 'Boot', 'Gauntlet', 'Gauntlet'] },
        { id: 'bo_prime', name: 'Bo Prime', category: 'Melee', subtype: 'Staff', components: PARTS.staff },
        { id: 'tipedo_prime', name: 'Tipedo Prime', category: 'Melee', subtype: 'Staff', components: PARTS.staff },
        { id: 'glaive_prime', name: 'Glaive Prime', category: 'Melee', subtype: 'Glaive', components: PARTS.glaive },
        { id: 'galariak_prime', name: 'Galariak Prime', category: 'Melee', subtype: 'Glaive', components: PARTS.glaive },
        { id: 'kestrel_prime', name: 'Kestrel Prime', category: 'Melee', subtype: 'Glaive', components: PARTS.glaive },
        { id: 'ninkondi_prime', name: 'Ninkondi Prime', category: 'Melee', subtype: 'Nunchaku', components: ['Blueprint', 'Handle', 'Handle', 'Chain'] },
        { id: 'cobra_crane_prime', name: 'Cobra & Crane Prime', category: 'Melee', subtype: 'Sword & Shield', components: PARTS.swordAndShield },
        { id: 'silva_aegis_prime', name: 'Silva & Aegis Prime', category: 'Melee', subtype: 'Sword & Shield', components: PARTS.swordAndShield },

        // Arch-guns
        { id: 'corvas_prime', name: 'Corvas Prime', category: 'Archgun', subtype: 'Archgun', components: PARTS.rifle },
        { id: 'larkspur_prime', name: 'Larkspur Prime', category: 'Archgun', subtype: 'Archgun', components: PARTS.rifle }
    ],


    // Centinelas y sus armas (salen juntos en la misma pestaña)
    sentinels: [
        { id: 'carrier_prime', name: 'Carrier Prime', type: 'sentinel', components: PARTS.sentinel },
        { id: 'dethcube_prime', name: 'Dethcube Prime', type: 'sentinel', components: PARTS.sentinel },
        { id: 'helios_prime', name: 'Helios Prime', type: 'sentinel', components: PARTS.sentinel },
        { id: 'nautilus_prime', name: 'Nautilus Prime', type: 'sentinel', components: PARTS.sentinel },
        { id: 'shade_prime', name: 'Shade Prime', type: 'sentinel', components: PARTS.sentinel },
        { id: 'wyrm_prime', name: 'Wyrm Prime', type: 'sentinel', components: PARTS.sentinel }
    ],

    sentinelWeapons: [
        { id: 'burst_laser_prime', name: 'Burst Laser Prime', category: 'Sentinel Weapon', subtype: 'Rifle', components: PARTS.pistol },
        { id: 'deconstructor_prime', name: 'Deconstructor Prime', category: 'Sentinel Weapon', subtype: 'Melee', components: PARTS.doubleBlade },
        { id: 'deth_machine_rifle_prime', name: 'Deth Machine Rifle Prime', category: 'Sentinel Weapon', subtype: 'Rifle', components: PARTS.pistol },
        { id: 'prime_laser_rifle', name: 'Prime Laser Rifle', category: 'Sentinel Weapon', subtype: 'Rifle', components: PARTS.pistol },
        { id: 'sweeper_prime', name: 'Sweeper Prime', category: 'Sentinel Weapon', subtype: 'Shotgun', components: PARTS.pistol },
        { id: 'verglas_prime', name: 'Verglas Prime', category: 'Sentinel Weapon', subtype: 'Rifle', components: PARTS.pistol }
    ],


    // Archwings
    archwings: [
        { id: 'odonata_prime', name: 'Odonata Prime', type: 'archwing', components: ['Blueprint', 'Harness', 'Systems', 'Wings'] }
    ]
};
