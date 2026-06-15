// ===== Bilal — Athkar data =====
// Each thikr: { ar, en, count }
// Sources: Hisn al-Muslim (Fortress of the Muslim).

const ATHKAR = {
  morning: [
    {
      ar: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ. اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ، لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ، لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ... وَهُوَ الْعَلِيُّ الْعَظِيمُ. (آية الكرسي)",
      en: "I seek refuge in Allah from Satan the outcast. Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep… and He is the Most High, the Most Great. (Ayat al-Kursi)",
      count: 1
    },
    {
      ar: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ. قُلْ هُوَ اللَّهُ أَحَدٌ… (الإخلاص) ، قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ… (الفلق) ، قُلْ أَعُوذُ بِرَبِّ النَّاسِ… (الناس)",
      en: "Recite Surah Al-Ikhlas, Al-Falaq and An-Nas — three times each. Whoever says them three times in the morning and evening, they will suffice him against all things.",
      count: 3
    },
    {
      ar: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.",
      en: "We have entered the morning and the dominion belongs to Allah. Praise is to Allah. None has the right to be worshipped but Allah alone, without partner. His is the dominion and His is the praise, and He is over all things capable.",
      count: 1
    },
    {
      ar: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ.",
      en: "O Allah, by You we enter the morning, by You we enter the evening, by You we live and by You we die, and to You is the resurrection.",
      count: 1
    },
    {
      ar: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ... (سيد الاستغفار)",
      en: "O Allah, You are my Lord, none has the right to be worshipped but You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can… (The chief of seeking forgiveness)",
      count: 1
    },
    {
      ar: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا.",
      en: "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad ﷺ as my Prophet.",
      count: 3
    },
    {
      ar: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.",
      en: "Allah is sufficient for me. None has the right to be worshipped but Him. Upon Him I rely, and He is the Lord of the Mighty Throne.",
      count: 7
    },
    {
      ar: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.",
      en: "In the name of Allah, with whose name nothing on earth or in the heavens can cause harm, and He is the All-Hearing, the All-Knowing.",
      count: 3
    },
    {
      ar: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ.",
      en: "O Allah, grant my body health. O Allah, grant my hearing health. O Allah, grant my sight health. None has the right to be worshipped but You.",
      count: 3
    },
    {
      ar: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.",
      en: "Glory is to Allah and praise is to Him.",
      count: 100
    },
    {
      ar: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.",
      en: "None has the right to be worshipped but Allah alone, without partner. His is the dominion and His is the praise, and He is over all things capable.",
      count: 10
    },
    {
      ar: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ.",
      en: "O Allah, send prayers and peace upon our Prophet Muhammad.",
      count: 10
    }
  ],

  evening: [
    {
      ar: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ. اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ... وَهُوَ الْعَلِيُّ الْعَظِيمُ. (آية الكرسي)",
      en: "I seek refuge in Allah from Satan the outcast. Allah — there is no deity except Him, the Ever-Living, the Sustainer… and He is the Most High, the Most Great. (Ayat al-Kursi)",
      count: 1
    },
    {
      ar: "قُلْ هُوَ اللَّهُ أَحَدٌ… (الإخلاص) ، قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ… (الفلق) ، قُلْ أَعُوذُ بِرَبِّ النَّاسِ… (الناس)",
      en: "Recite Surah Al-Ikhlas, Al-Falaq and An-Nas — three times each.",
      count: 3
    },
    {
      ar: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.",
      en: "We have entered the evening and the dominion belongs to Allah. Praise is to Allah. None has the right to be worshipped but Allah alone, without partner. His is the dominion and His is the praise, and He is over all things capable.",
      count: 1
    },
    {
      ar: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ.",
      en: "O Allah, by You we enter the evening, by You we enter the morning, by You we live and by You we die, and to You is the final return.",
      count: 1
    },
    {
      ar: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ... (سيد الاستغفار)",
      en: "O Allah, You are my Lord, none has the right to be worshipped but You. You created me and I am Your servant… (The chief of seeking forgiveness)",
      count: 1
    },
    {
      ar: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا.",
      en: "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad ﷺ as my Prophet.",
      count: 3
    },
    {
      ar: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.",
      en: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
      count: 3
    },
    {
      ar: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.",
      en: "In the name of Allah, with whose name nothing on earth or in the heavens can cause harm, and He is the All-Hearing, the All-Knowing.",
      count: 3
    },
    {
      ar: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.",
      en: "Allah is sufficient for me. None has the right to be worshipped but Him. Upon Him I rely, and He is the Lord of the Mighty Throne.",
      count: 7
    },
    {
      ar: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.",
      en: "Glory is to Allah and praise is to Him.",
      count: 100
    },
    {
      ar: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ.",
      en: "O Allah, send prayers and peace upon our Prophet Muhammad.",
      count: 10
    }
  ],

  after: [
    {
      ar: "أَسْتَغْفِرُ اللَّهَ.",
      en: "I seek the forgiveness of Allah.",
      count: 3
    },
    {
      ar: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ.",
      en: "O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of majesty and honour.",
      count: 1
    },
    {
      ar: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ.",
      en: "None has the right to be worshipped but Allah alone, without partner. His is the dominion and the praise, and He is over all things capable. O Allah, none can withhold what You give, and none can give what You withhold, and the might of the mighty cannot benefit them against You.",
      count: 1
    },
    {
      ar: "سُبْحَانَ اللَّهِ.",
      en: "Glory is to Allah.",
      count: 33
    },
    {
      ar: "الْحَمْدُ لِلَّهِ.",
      en: "All praise is to Allah.",
      count: 33
    },
    {
      ar: "اللَّهُ أَكْبَرُ.",
      en: "Allah is the Greatest.",
      count: 33
    },
    {
      ar: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. (تمام المئة)",
      en: "None has the right to be worshipped but Allah alone, without partner. His is the dominion and the praise, and He is over all things capable. (Completing one hundred)",
      count: 1
    },
    {
      ar: "آيَةُ الْكُرْسِيِّ — تُقرأ دبر كل صلاة مكتوبة.",
      en: "Ayat al-Kursi — recited after every obligatory prayer.",
      count: 1
    },
    {
      ar: "قُلْ هُوَ اللَّهُ أَحَدٌ، وَالْمُعَوِّذَتَانِ (الفلق والناس) دبر كل صلاة.",
      en: "Surah Al-Ikhlas, Al-Falaq and An-Nas after each prayer.",
      count: 1
    },
    {
      ar: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ.",
      en: "O Allah, help me to remember You, to thank You, and to worship You in the best manner.",
      count: 1
    }
  ]
};
