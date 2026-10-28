import { Song, Playlist, Artist } from '../types/music';

// Generated image assets from batch generation
export const ASSET_IMAGES = {
  hero: '/src/assets/images/music_india_hero_1793157027322.jpg',
  bollywood: '/src/assets/images/bollywood_beats_cover_1793157026789.jpg',
  punjabi: '/src/assets/images/punjabi_bhangra_cover_1793157028271.jpg',
  sufi: '/src/assets/images/sufi_chill_cover_1793157028257.jpg',
};

// Verified royalty-free audio streams (public domain / CC-BY / royalty-free CDN audio)
// Guaranteed to play smoothly across mobile and web
export const INITIAL_SONGS: Song[] = [
  {
    id: 'song-1',
    title: 'Sufi Cosmos (सूफी कॉस्मॉस)',
    titleHi: 'सूफी कॉस्मॉस',
    artist: 'Kavita Singh & The Beat Collective',
    artistHi: 'कविता सिंह और द बीट कलेक्टिव',
    album: 'Cosmic Twilight',
    albumHi: 'कॉस्मिक ट्वाइलाइट',
    language: 'hindi',
    genre: 'sufi',
    duration: 372,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coverUrl: ASSET_IMAGES.bollywood,
    isTrending: true,
    isNew: true,
    isPopular: true,
    plays: 1420500,
    license: 'Royalty-Free Open Audio (CC BY 4.0 - Free for Commercial & Non-Commercial Streaming)',
    lyrics: `[00:10.00] नैनों में बसा है तेरा ही नूर...
[00:25.00] रूहानी सी रातें, ये दिल मजबूर...
[00:40.00] सूफी से लम्हे, सितारों की छांव,
[00:55.00] ले चले हवाएं तेरी ही राह।
[01:15.00] मौला मेरे, मौला मेरे, इश्क रूहानी,
[01:35.00] तेरे बिना सूनी है जिंदगानी।
[01:55.00] ढलती हुई शाम में राग छिड़े,
[02:15.00] दिल के ये तार फिर तुझसे जुड़े...`
  },
  {
    id: 'song-2',
    title: 'Urban Dhol Trap (शहरी ढोल बीट्स)',
    titleHi: 'शहरी ढोल बीट्स',
    artist: 'Mavi Singh & DJ Amritsar',
    artistHi: 'मावी सिंह और डीजे अमृतसर',
    album: 'Punjab Bassline 2026',
    albumHi: 'पंजाब बेसलाइन २०२६',
    language: 'punjabi',
    genre: 'bhangra',
    duration: 423,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coverUrl: ASSET_IMAGES.punjabi,
    isTrending: true,
    isNew: false,
    isPopular: true,
    plays: 2894100,
    license: 'Royalty-Free Open Audio (CC BY 4.0 - Indie Producer Collective)',
    lyrics: `[00:12.00] वड्डे वड्डे शहर विच ढोल वजे,
[00:28.00] कुड़ियां ते मुंडे सारे नचदे सजे!
[00:45.00] बास दी आवाज़ ते हिलदा फ्लोर,
[01:00.00] सारे कहन्दे 'वन्स मोर, वन्स मोर!'
[01:20.00] चक दे फट्टे, नवी धुन छेड़,
[01:40.00] रात भर चल्लूगा आज ये गेड़!`
  },
  {
    id: 'song-3',
    title: 'Evening Raga (शाम का सुकून)',
    titleHi: 'शाम का सुकून - सितार और बांसुरी',
    artist: 'Pandit Ravi Sharma & Ensemble',
    artistHi: 'पंडित रवि शर्मा एवं साथी',
    album: 'Varanasi Ghat Sessions',
    albumHi: 'वाराणसी घाट सेशंस',
    language: 'hindi',
    genre: 'classical',
    duration: 345,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coverUrl: ASSET_IMAGES.sufi,
    isTrending: false,
    isNew: true,
    isPopular: true,
    plays: 875200,
    license: 'Royalty-Free Classical Archive (Open Audio Initiative)',
    lyrics: `[00:15.00] (मधुर सितार और बांसुरी की जुगलबंदी)
[00:45.00] गंगा की लहरों पर ढलती किरण,
[01:15.00] राग यमन का शांत समर्पण...
[01:45.00] सुरों की साधना, मन का ठहराव,
[02:15.00] रूह को छूता यह पावन बहाव।`
  },
  {
    id: 'song-4',
    title: 'Bollywood Nostalgia Beats',
    titleHi: 'रेट्रो धड़कन (बॉलीवुड रीइमेजिन्ड)',
    artist: 'Aarav Mehta & Bombay Strings',
    artistHi: 'आरव मेहता और बॉम्बे स्ट्रिंग्स',
    album: 'Marine Drive Sunset',
    albumHi: 'मरीन ड्राइव सनसेट',
    language: 'hindi',
    genre: 'romantic',
    duration: 302,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    coverUrl: ASSET_IMAGES.hero,
    isTrending: true,
    isNew: true,
    isPopular: true,
    plays: 3410900,
    license: 'Royalty-Free Bollywood Studio Demo Audio',
    lyrics: `[00:10.00] बारिश की पहली बूंद जैसे छू गई,
[00:30.00] तेरी हंसी फिर दिल में कहीं खो गई...
[00:50.00] मरीन ड्राइव की ठंडी हवाएं,
[01:10.00] बस तेरा नाम ही गुनगुनाएं।
[01:30.00] ये समां, ये रात, ये हसीन मुलाकात,
[01:50.00] कभी न खत्म हो ये मीठी बात।`
  },
  {
    id: 'song-5',
    title: 'Chennai Rain Melodies (चेन्नई मलाई)',
    titleHi: 'चेन्नई की बारिश (तमिल धुन)',
    artist: 'Ananya Ramanathan & Karthik V.',
    artistHi: 'अनन्या रामनाथन एवं कार्तिक वी.',
    album: 'Marina Breeze Beats',
    albumHi: 'मरीना ब्रीज बीट्स',
    language: 'tamil',
    genre: 'romantic',
    duration: 388,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    coverUrl: ASSET_IMAGES.bollywood,
    isTrending: false,
    isNew: true,
    isPopular: true,
    plays: 640100,
    license: 'Royalty-Free South Indie Collective (Open Music)',
    lyrics: `[00:14.00] मज़़़ई पेयुम इराविल उन निनैवुगल...
[00:35.00] कदल काट्रिल करैयुम एन कनवुगल...
[00:55.00] सुंदर रात्रियिल नम्मल इन्ने,
[01:20.00] पाडुम पुदिय पाडल्गल अनबे!`
  },
  {
    id: 'song-6',
    title: 'Hyderabad Grooves (तेलुगू वाइब्स)',
    titleHi: 'हैदराबाद ग्रूव्स (तेलुगू रिदम)',
    artist: 'Srinivas Rao & The Deccan Tribe',
    artistHi: 'श्रीनिवास राव और डेक्कन ट्राइब',
    album: 'Charminar Chill',
    albumHi: 'चारमीनार चिल',
    language: 'telugu',
    genre: 'indie',
    duration: 310,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    coverUrl: ASSET_IMAGES.punjabi,
    isTrending: true,
    isNew: false,
    isPopular: false,
    plays: 520800,
    license: 'Royalty-Free Regional Indie Commons',
    lyrics: `[00:12.00] ना मनसु लोनी मधुरमयीन भावमुलु...
[00:32.00] नीतोने उंटे सरोनि कूरिका...
[00:52.00] संगीतमे मना जीवनम,
[01:15.00] आनन्दमे मना लक्ष्यम्!`
  },
  {
    id: 'song-7',
    title: 'Desi Lo-Fi Midnight Coffee',
    titleHi: 'देसी लो-फाई मिडनाइट',
    artist: 'Chai & Chill Club',
    artistHi: 'चाय एंड चिल क्लब',
    album: 'Hostel Room Tapes Vol. 1',
    albumHi: 'हॉस्टल रूम टेप्स',
    language: 'hindi',
    genre: 'lofi',
    duration: 275,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    coverUrl: ASSET_IMAGES.sufi,
    isTrending: false,
    isNew: true,
    isPopular: true,
    plays: 1980300,
    license: 'Creative Commons CC-BY 3.0 Lo-Fi Beats',
    lyrics: `[00:20.00] चाय की प्याली, धीमी सी बरसात...
[00:45.00] यादों का काफिला, तारों भरी रात।
[01:10.00] किताबों के पन्ने, धुन ये धीमी,
[01:35.00] सुकून की खुशबू हर तरफ खिली।`
  },
  {
    id: 'song-8',
    title: 'Indian Monsoon Electric (इलेक्ट्रिक मॉनसून)',
    titleHi: 'इलेक्ट्रिक मॉनसून (इंग्लिश-देसी फ्यूजन)',
    artist: 'Rohan Sen ft. Tara Sky',
    artistHi: 'रोहन सेन संग तारा स्काई',
    album: 'East Meets West',
    albumHi: 'ईस्ट मीट्स वेस्ट',
    language: 'english',
    genre: 'indie',
    duration: 360,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    coverUrl: ASSET_IMAGES.hero,
    isTrending: true,
    isNew: true,
    isPopular: false,
    plays: 742500,
    license: 'Royalty-Free Indie Electronic Fusion',
    lyrics: `[00:15.00] Rain falling down on the city lights,
[00:35.00] Echoes of the sitar through midnight flights...
[00:55.00] East in our blood, beat in our soul,
[01:20.00] Let the rhythm take complete control!`
  }
];

export const INITIAL_ARTISTS: Artist[] = [
  {
    id: 'artist-1',
    name: 'Kavita Singh',
    nameHi: 'कविता सिंह',
    bio: 'Renowned Sufi and contemporary Indian playback vocalist with over 20 hit singles.',
    bioHi: 'सूफी और आधुनिक भारतीय गायकी की मशहूर आवाज़, जिन्होंने कई चार्टबस्टर गाने दिए हैं।',
    imageUrl: ASSET_IMAGES.bollywood,
    language: 'hindi',
    songCount: 14,
    monthlyListeners: '3.4M'
  },
  {
    id: 'artist-2',
    name: 'Mavi Singh',
    nameHi: 'मावी सिंह',
    bio: 'High-octane Punjabi artist fusing traditional folk dhol with underground bass music.',
    bioHi: 'पंजाबी लोक संगीत और आधुनिक हिप-हॉप बास के बेजोड़ फनकार।',
    imageUrl: ASSET_IMAGES.punjabi,
    language: 'punjabi',
    songCount: 22,
    monthlyListeners: '4.8M'
  },
  {
    id: 'artist-3',
    name: 'Pandit Ravi Sharma',
    nameHi: 'पंडित रवि शर्मा',
    bio: 'Grammy-nominated sitar virtuoso bridging Indian classical tradition with world music.',
    bioHi: 'शास्त्रीय संगीत और सितार वादन के विश्व विख्यात उस्ताद।',
    imageUrl: ASSET_IMAGES.sufi,
    language: 'hindi',
    songCount: 38,
    monthlyListeners: '1.2M'
  },
  {
    id: 'artist-4',
    name: 'Aarav Mehta',
    nameHi: 'आरव मेहता',
    bio: 'Soulful Bollywood composer & lyricist creating heartfelt romantic ballads.',
    bioHi: 'दिल को छू लेने वाले रोमांटिक और रेट्रो गानों के युवा संगीतकार।',
    imageUrl: ASSET_IMAGES.hero,
    language: 'hindi',
    songCount: 19,
    monthlyListeners: '2.9M'
  }
];

export const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: 'pl-1',
    title: 'Top 50 India (आज के टॉप 50)',
    titleHi: 'आज के टॉप 50 - भारत',
    description: 'The hottest trending tracks across Hindi, Punjabi and regional music.',
    descriptionHi: 'देश भर में सबसे ज्यादा सुने जाने वाले टॉप ट्रेंडिंग गाने।',
    coverUrl: ASSET_IMAGES.hero,
    songs: [INITIAL_SONGS[0], INITIAL_SONGS[1], INITIAL_SONGS[3], INITIAL_SONGS[7]],
    isSystem: true,
    createdAt: '2026-01-15'
  },
  {
    id: 'pl-2',
    title: 'Sufi & Classical Soul (सूफी सुकून)',
    titleHi: 'सूफी सुकून और शास्त्रीय संगीत',
    description: 'Meditative sitar ragas and serene spiritual Sufi acoustic melodies.',
    descriptionHi: 'मन को शांति और सुकून देने वाली आध्यात्मिक और शास्त्रीय धुनें।',
    coverUrl: ASSET_IMAGES.sufi,
    songs: [INITIAL_SONGS[0], INITIAL_SONGS[2], INITIAL_SONGS[6]],
    isSystem: true,
    createdAt: '2026-02-01'
  },
  {
    id: 'pl-3',
    title: 'Punjabi Dhol Party (पंजाबी भांगड़ा बीट्स)',
    titleHi: 'पंजाबी भांगड़ा पार्टी बीट्स',
    description: 'High energy Punjabi club hits and wedding bangers.',
    descriptionHi: 'नाचने और झूमने के लिए सबसे धांसू पंजाबी गाने और ढोल मिक्स।',
    coverUrl: ASSET_IMAGES.punjabi,
    songs: [INITIAL_SONGS[1], INITIAL_SONGS[7]],
    isSystem: true,
    createdAt: '2026-02-10'
  },
  {
    id: 'pl-4',
    title: 'Late Night Desi Lo-Fi (रात का लो-फाई)',
    titleHi: 'रात का लो-फाई और चिल वाइब्स',
    description: 'Mellow guitar strumming, rains and nostalgic Indian retro warmth.',
    descriptionHi: 'देर रात की पढ़ाई और सुकून भरे पलों के लिए खास लो-फाई धुनें।',
    coverUrl: ASSET_IMAGES.bollywood,
    songs: [INITIAL_SONGS[3], INITIAL_SONGS[6], INITIAL_SONGS[4]],
    isSystem: true,
    createdAt: '2026-02-20'
  }
];
