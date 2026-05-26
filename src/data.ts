/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Landmark, Ordinance, Institution, CultureEvent } from './types.ts';

export const LANDMARKS: Landmark[] = [
  {
    id: 'mines-view',
    name: 'Mines View Park',
    description: "Experience breathtaking panoramic views of Baguio's gold and copper mines and the surrounding cordillera mountains. A must-visit for sunrise watchers and nature enthusiasts seeking the crisp mountain air.",
    category: 'Scenic',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGB747f0nHuYhJ3fu4VQBIQdUmRLXWQZNvjGQT0-_qx5MK6ORne1V7FjJ993epsZerjUdIOPcZTDwAmTjj99eu8drmTewmFLBVH8MZSDDBEUXrPjLO63QQTxwnlOxNsI-mTYbvxQKVbbggAKuosGWVTKx0VzFkVizU-up7vYfN39eUEYS4cwTe2-c5ShlzjFlRNsetuDLX90z23-Jh2S7gGiiZGo82R67EDDn6fp26kuC7iHMpPFxHB2WqWqIUkxlZMrbqYe1Gezj9',
    locationDetails: 'Gibraltar Road, Baguio City, Benguet',
    historyText: 'Initially served as a primary mining observation point during the early 20th century, Mines View Park overlooks the gold and copper mines of Itogon. Over decades, it has evolved into a key lookout point and tourist bazaar offering traditional Cordilleran clothes rentals, silver-smithing stalls, and native delicacies.',
    travelerTips: [
      'Arrive before 5:45 AM to witness a cinematic mountain sunrise breaking through the clouds.',
      'Grab a cup of warm local Strawberry Taho from vendors near the viewing deck.',
      'Rent traditional Cordilleran attire (such as bahag and tapis) for a small cultural experience fee.',
      'Do shop at the coordinate local handicraft stalls to directly support the native Benguet micro-entrepreneurs.'
    ],
    rating: 4.6,
    reviewCount: 3420,
    hours: '5:00 AM - 8:00 PM Daily',
    entranceFee: '₱10.00 for Adults, ₱5.00 for Children'
  },
  {
    id: 'burnham-park',
    name: 'Burnham Park',
    description: 'The heart of Baguio City. Enjoy a leisurely boat ride on the man-made lake, rent a bicycle, or simply stroll through the beautifully landscaped rose and orchid gardens.',
    category: 'Recreation',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXIWottJ9xZa15hyYbu060lsILmt27AdOMU4bnpta1rudoNgtJMTuUrrODlsNU2xN6E7pSJQGvr1UfA1H_pYL4LqgIGTQZsjKNW-jZNCjzCpnX7I9otaF1eC2O7oeOi3b9QJm4YrrOSeqFPeRr5sjTr0JTBQJxkJxjBZMFZUrBBtlfI7g5SC4l_2nu-qcxBHXmR-8NjZCMppCHeS2nu0iXIOOD1UkvbMId9pNZzyqS7Nt3-Jox_vRsaxgAERJYy2haVFnPD6pSOsar',
    locationDetails: 'Jose Abad Santos Dr, Baguio City, Benguet',
    historyText: 'Designed by the master architect Daniel Hudson Burnham in 1904, this central park is the focal urban anchor of Baguio City. Originally created as an green buffer space for the rest of his City Plan, it represents a classical Beaux-Arts park layout nested directly in high altitude.',
    travelerTips: [
      'Rent a hand-operated Swan boat on Burnham Lake for a peaceful afternoon activity.',
      'Go to the athletic side and rent a bicycle or side-car kart (ranging from ₱50-₱100/hr) to zip around the tracks.',
      'Visit the Melvin Jones Grandstand area during weekends to watch local community performances.',
      'Try the famous Baguio double-churned ice cream inside the Rose Garden.'
    ],
    rating: 4.8,
    reviewCount: 5210,
    hours: 'Open 24 Hours',
    entranceFee: 'Free Admission (Boats & bikes are rented separately)'
  },
  {
    id: 'the-mansion',
    name: 'The Mansion',
    description: 'The official summer residence of the President of the Philippines, known for its elegant architecture and beautiful landscaped gardens framed by tall, historic pine trees.',
    category: 'Heritage',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOyPAyl7YtudLQ-KKw8pDe4WLgeV5-WBqbLQ3cbyhV9TkdyPlsHPVrnu2yMjSH3zuvnbQq34zw4NpbWGo86HHfe9GAKRKOs3xpcaUmJOEIYBopUa48FNOUr9R3sP1B4Xt6ydCJk5yghMOO1Cs6xW3Z6IHQntA_ZBsiBkWcEh2jzaxcvuO1WsXO-Pi6Bm-V6mNCrroUKWjl_3sguxxr1xF3DK00sVqDlvzE1WWlxuUEHS81-tz-xziJj7aO3Zo4YouQ09hBz3QhJ4bM',
    locationDetails: 'C.P. Romulo Dr, Baguio City, Benguet',
    historyText: 'Constructed in 1908, The Mansion serves as the official residence and briefing venue for the Chief Executive of the Philippines during summer. Its magnificent gate is famously modeled after the Buckingham Palace gates in London, and its elegant high-contrast Spanish colonial-inspired facade has survived the challenges of World War II.',
    travelerTips: [
      'Snap elegant photos in front of the grandiose black-iron gates.',
      'Walk across to the Wright Park Pool of Pines situated directly opposite for the ideal visual axis shot.',
      'Remember that entering the residential palace itself is generally closed, but the outer manicured grounds and history museum are fully open to spectators.'
    ],
    rating: 4.7,
    reviewCount: 1980,
    hours: '8:00 AM - 5:00 PM Daily',
    entranceFee: 'Free Admission'
  },
  {
    id: 'strawberry-farm',
    name: 'Strawberry Farm',
    description: "Located in nearby La Trinidad, pick your own fresh strawberries straight from the fields. A delightful agriculture-tourism experience that connects visitors with the region's rich, fertile soils.",
    category: 'Agri-Tourism',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjeXHRyjzm4viRnSwwceI7IneJWoNztgHY_z9ZHBW6VdAdbn82esXkkdZ8zUhW--Wqkl_tN2t20ERJMW8HchAHefHnCus9dhHhwl20F2Jo6pBllN3N_cjqgXi90uVQinYSBq1hUuCMJn9gcrd4Lq7o5e_BIuW8P_N2d9AGLJ0pk3GY8jk9BGcjN_OvfvU9Wwou8T2McpUyRZk38QLpVukLvdR0DKnbTkcFfDaw3oWL-62pizrgAlVlpWmQ2C_SMvATIdwFu-_8AR9Z',
    locationDetails: 'Km. 5, La Trinidad, Benguet (15 mins from Baguio)',
    historyText: 'Operated by local cooperative Benguet farmers, this swamp land in La Trinidad was transformed into a flourishing strawberry oasis. It stands as one of the very few places in the tropical Philippines that can cultivate high-quality strawberries.',
    travelerTips: [
      'The prime harvesting season runs from November to April when strawberries are sweet and bright red.',
      'Always dress in comfortable boots as paths can be muddy after morning fog.',
      'Purchase home-cooked strawberry jam, strawberry wine, and unique strawberry-flavored crafts right at the farm gate.',
      'Try the strawberry-infused taho or fresh strawberry ice cream from the local cart sellers.'
    ],
    rating: 4.5,
    reviewCount: 4120,
    hours: '7:00 AM - 6:00 PM Daily',
    entranceFee: 'Free Entrance (Strawberry picking is charged per kilo, approx ₱400-₱500/kg)'
  },
  {
    id: 'camp-john-hay',
    name: 'Camp John Hay',
    description: 'Wander through acres of preserved pine forests. A premier destination for historic eco-trails, high-altitude golf courses, premium dining, and fresh mountain breezes.',
    category: 'Nature',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_eTtYiGsbRDGU2qaZaRcHpbJZsbchy7SMsaGan9GTjfkpA5S1VitrZMIkmOG1ZewvAqazy_TqwyA2fi1twaPI2_XLoTIKi3u_b6M1r8mMGhsA7daHf6g5IG8N4ikzK9yLylkeLqQ1baWqu15BbHq62VmJr8ZAuQO35eEfrMgnel9sNa5cfPxFgAQwbxf1bxGwNHlx6RduephDzDt3eOiFpE-mSykpQSv4Q4sCXJOXecEU5N0XQ4duowJgrkwmHGFck4eyaJ82OPXj',
    locationDetails: 'Loakan Road, Baguio City, Benguet',
    historyText: 'Established in October 1903 as a rest and recreation camp for the United States Armed Forces, Camp John Hay was named after US Secretary of State John Milton Hay. It was handed over to the Philippine government in 1991 and converted into a pristine public forest reserve and high-end tourism estate.',
    travelerTips: [
      'Walk alongside the Yellow Trail, a beautiful 4km trail wrapping under tall pine tree canopies.',
      'Visit the Bell House for deep insights into American historical military lifestyle.',
      'Relax at the Bell Amphitheater with its multi-tiered garden seating.',
      'Taste premium local hot chocolate de batirol nested inside the garden sanctuary.'
    ],
    rating: 4.9,
    reviewCount: 2890,
    hours: '6:00 AM - 10:00 PM Daily',
    entranceFee: 'Free entry to grounds (Minor fees for Bell House & Yellow Trail)'
  }
];

export const ORDINANCES: Ordinance[] = [
  {
    id: 'smoke-free',
    name: 'Smoke-Free City (Ordinance 8-2017)',
    category: 'Health',
    description: 'Smoking and vaping are strictly prohibited in all public places, including parks, sidewalks, and public utility vehicles. Designated smoking areas are heavily regulated.',
    bulletPoints: [
      'Prohibits smoking/vaping in schools, public playgrounds, medical centers, government buildings, and transport terminals.',
      'Sellers must not display tobacco products within 100 meters of academic centers.',
      'Designated smoking areas (DSAs) must operate at least 10 meters away from public walkways.'
    ],
    penalty: '₱1,000 for 1st offense, ₱2,000 for 2nd offense, up to ₱5,000 or license revocation for businesses.',
    iconType: 'smoke'
  },
  {
    id: 'number-coding',
    name: 'Unified Number Coding (Ordinance 01-2003)',
    category: 'Civic',
    description: 'Vehicle restriction applies from 6:00 AM to 7:00 PM within the Central Business District (CBD) based on the ending digit of your license plate. Check local advisories for zone boundaries.',
    bulletPoints: [
      'Mondays: Plate endings 1 and 2 are restricted.',
      'Tuesdays: Plate endings 3 and 4 are restricted.',
      'Wednesdays: Plate endings 5 and 6 are restricted.',
      'Thursdays: Plate endings 7 and 8 are restricted.',
      'Fridays: Plate endings 9 and 0 are restricted.',
      'Exemptions apply to authorized tourist transit with valid accommodation vouchers.'
    ],
    penalty: '₱500.00 fine plus immediate surrender of drivers license for validation.',
    iconType: 'car'
  },
  {
    id: 'anti-plastic',
    name: 'Anti-Plastic Ordinance (Ordinance 35-2017)',
    category: 'Environmental',
    description: 'Baguio enforces a strict ban on single-use plastics and polystyrene (Styrofoam) containers in all business establishments. Shoppers are required to bring eco-bags.',
    bulletPoints: [
      'Strictly bans single-use plastic grocery bags, food boxes, straws, and cutlery.',
      'Establishments must ask customers to provide reusable ecobags or opt for organic paper boxes.',
      'Violations are rigorously checked by local sanitarians and waste inspectors.'
    ],
    penalty: '₱1,000 fine for first offense, leading up to ₱5,000 and business permit suspension.',
    iconType: 'plastic'
  },
  {
    id: 'silent-night',
    name: 'Silent Night Ordinance (Ordinance 34-2018)',
    category: 'Safety',
    description: 'Excessive noise, loud music, and karaoke are prohibited after 10:00 PM to maintain peace in residential areas.',
    bulletPoints: [
      'Curfew on microphones, high-gain subwoofers, and street amplifiers kicks in at 10:00 PM.',
      'Bars and public music lounges must utilize modern acoustic panels to prevent sound bleeding.',
      'Ensures a high peaceful quality of life for residents and morning-seeking trekkers.'
    ],
    penalty: 'We computed ₱1,000 fine or community service for 1st offense, escalating to arrest.',
    iconType: 'sound'
  },
  {
    id: 'pet-ownership',
    name: 'Responsible Pet Stewardship (Ordinance 19-2021)',
    category: 'Safety',
    description: 'Pets must be leashed in public spaces at all times. Owners are strictly required to clean up after their pets immediately.',
    bulletPoints: [
      'Mandatory physical leashes (maximum 2 meters) when navigating public parks or downtown streets.',
      'Pet handlers must convey pet droppings bags to ensure sanitization of botanical flowerbeds.',
      'Encourages a clean, dog-friendly environment across Burnham botanical walking loops.'
    ],
    penalty: '₱500.00 base fine and mandatory orientation at the city health office.',
    iconType: 'pet'
  }
];

export const INSTITUTIONS: Institution[] = [
  {
    id: 'slu',
    name: 'Saint Louis University',
    established: '1911',
    category: 'University',
    studentCountText: '30,000+ Students',
    description: 'The largest university north of Manila, recognized as a Center of Excellence in various disciplines. Its sprawling campus in the heart of the city is a landmark of academic rigor.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnbBIfYIADi4mxEOk6NHFPs2p1IRui97SrNxnuSLzcrQZDfE9PbLhZxyxI5CbmT2T6LtBI9ary8AGIaZfZCyRkz0vDJwvawTVzd-SaLnvGGYS-BRQtOtvDjxF-bYt-W8buVFIkM4-OVMaZ0YNlHpHCeY7jG0QXPY9_X-JQt-5ZaGIokGZPA0d7y3D8qMOmwk1I2i5_LnNwRhJuMzXJqM5Y3mYQ5WKk4MbPwPxayDae79oYm0ppLfmGOcfQwXGubxqA4NZbz408s8kc',
    details: 'Saint Louis University is a private Catholic university founded in 1911 by Belgian missionaries of the CICM. It has grown from a simple elementary school into an academic powerhouse featuring massive campuses across Baguio City (Main Campus, Maryheights Campus, Bakakeng Campus, and Navy Base). It excels in Medicine, Engineering, Law, and Teacher Training.',
    keyMissions: [
      'Inculcating moral Christian values and academic excellence.',
      'Sustaining specialized research in mountain engineering and pharmaceutical science.',
      'Active community engagement across Cordilleran remote communities.'
    ]
  },
  {
    id: 'upb',
    name: 'University of the Philippines Baguio',
    established: '1921',
    category: 'University',
    studentCountText: '3,500+ Scholars',
    description: "The national university's hub for Cordillera studies, renowned for arts, sciences, and indigenous research.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeOuRwOR_3Wq0R6QsKa_POgV_Zn8TQdxveD1n5GL3pxVmWeUUFuVS3GOXeVrmbADQjiudvHmEZ2bxT7T0e-ovvTkwFeDlX_nN4CCjQ2DkfmrkfnJHmtMUv0yU-EmG4VZp7ovhbzhqHhJkEHTcKbwPA8IPvL0eNHbwMptdPfWMRAGDTIAvas3VZptQ2pZ6-7SjemAivcvGGCa_Ch5wj9CmS5EomcKy1_En0IBFWLta_tTqlrktKbj6bMWt6xew98WbNMMG5OkgcKfD7',
    details: 'As the pioneer regional unit of the UP system, UP Baguio stands as the leading institution for Cordillera studies. It houses the Museo Kordilyera, the first ethnographic museum dedicated strictly to mountain cultures. Known for extreme selective admissions, UP Baguio specializes in Environmental Biology, Fine Arts, Ethnomusicology, and Mathematics.',
    keyMissions: [
      'Preservation and critical documentation of Cordilleran heritage and languages.',
      'Scholarly analysis of regional mountain geohazards and environmental stability.',
      'Offering elite, progressive high-quality education to the northern provinces.'
    ]
  },
  {
    id: 'ub',
    name: 'University of Baguio',
    established: '1948',
    category: 'University',
    studentCountText: '18,200+ Students',
    description: 'A pioneer in holistic education, located steps away from the central business district.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_4R7B6YxRd0mODkuNW6PLAJBshu786NOq3oPqDwmWNCV_LEEbX1VukIg7OBNkTEScPqcXDi5jDYUXFaN3X6oLIVeoQVwBtQBjxVpuru1sxgiD70WJObo7xyu7EhO_uor22qkA9e_3gXui0CkrMAg5Ng7UHubDId9AKnahZD-w_FqAsHH2xKQnchQr2gMfN1vE_92ZPPWutO4QQwyoqW7a6_FdH7Xg2jAC9wzM_a8N7KTaxwFkM-pIt5LEUd-sRm8mjaukMYv7LO4c',
    details: 'Founded shortly after World War II in 1948 by spouses Fernando and Rosa Bautista, UB has generated generations of professionals. Strategically nested next to Session Road, UB features high-performance centers for Criminology, Dentistry, Hospitality Management, and Athletics, producing many Southeast Asian Games medalists.',
    keyMissions: [
      'Empowering students with vocational confidence and globally recognized licensing.',
      'Acclaimed university athletic development in mountain altitude training.',
      'Sponsoring accessible, high-performance community health missions.'
    ]
  },
  {
    id: 'uc',
    name: 'University of the Cordilleras',
    established: '1946',
    category: 'University',
    studentCountText: '16,000+ Students',
    description: 'Consistently producing topnotchers, this institution is a cornerstone of professional education.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC0rTfgRPQP1Ob-GIvi8F57Zoho0lu3MEjusvz7A0F3axDoGOKuPFJg-hDayfLIJZebesJCYI6JiLQ8D5FeTN2qu_0VxqmHP3Bia0CwGRNUWfi5evdPy-vB2a0NKJddWFPkf4N4Hzp9EQOujBQ_namxZulLkbkzqxSNO1FwlMIAht1R1qtHkUiI-XC2FjE802xuG4K45E1PL9YJW4l9Dx9WdhfVmhy2Gj_6fc71eBrAX0VgeDq8szts1Qc4BmDHTmR4Tr8Olvo-wkD',
    details: 'Formerly Baguio Colleges Foundation (BCF), UC is famous for setting national records in Bar examinations and Engineering licensures. Its iconic green-slatted campus adapts excellently to the hillside terrain. It is widely acclaimed for its advanced Information Technology programs and digital governance studies.',
    keyMissions: [
      'Engineering practical, high-value education aimed at industrial needs.',
      'Pioneering digital-classroom methodologies suitable for regional remote campuses.',
      'Delivering continuous, lifelong legal education and free legal aid.'
    ]
  },
  {
    id: 'teachers-camp',
    name: 'Teachers Camp',
    established: '1908',
    category: 'Heritage',
    studentCountText: 'Heritage & Conference Hub',
    description: "Teachers Camp serves as a living monument to the city's enduring commitment to academic heritage and intellectual growth.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4cz21QJbFtojGFxqc51FLPlQ2jHIWsZPhyaouo4wWiZZgu4PqRJBOvOsI62LD60VzNwK9OUJxmNS7wL5wdlgl3trSNh5tV3DRLQZHiP4-rlSPT7wNOLXx4oIt9rGISFtra8O0puoo3dFu3Z6ZTBX5cTgUtsizCOf6EBKgtIa3c77g5EjTprPKOlqlSjjhR42MRlebd4nA29SuUn0NWBzXEIkml19KXKLz5KhqKw5fwtnQTP0Pa8tNablTXlTwqdiBfM14_5XjvFjf',
    details: 'Teachers Camp was constructed in 1908 as an educational vacation resort for American Thomasite teachers who pioneered formal public classroom structures. Spreading through a pristine pine valley of several hectares, its iconic white and green timber framing captures the American-architectural heritage seamlessly and continues to host national webinars, sports camps, and civic trainings.',
    keyMissions: [
      'Maintaining the historic aesthetic values of early American-colonial architecture.',
      'Serving as the premium National Seminar hub for the Department of Education.',
      'Providing athletic complexes for altitude sports coaching and trials.'
    ]
  }
];

export const CULTURE_EVENTS: CultureEvent[] = [
  {
    id: 'panagbenga',
    title: 'Panagbenga Festival',
    subTitle: 'A Season of Blooming (February)',
    description: "Celebrated every February, the Flower Festival is a stunning tribute to the city's resilience and its abundance of flora. It is a sensory feast of color, music, and community spirit.",
    category: 'Festival',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1JZlAHT0vn9miH67xJjXteyMU9XOtk-8xNzdZoTduQM_rsEJe8x1VHY-6b0Y96OqMpXJSUxRhc5r-V9tYpBNknD-0UvxCM60PyGkNymzkT5xc4ra3vLVx1J18TUTS51Jkp_IxBafBiKC3KPggA8jDIk2pm60Y8EhCjocxR8M2d-TAuUqs9rqXFgVQWNpei_DlnkHFzHMSx4jMjoWvztMswhH1pK7nOb0vJMPqspgFuOeCqN1Bf10oJxEOJD1GqLKiTUjP60Jv8jqm',
    longText: 'Formulated in 1995 after the tragic 1990 Cordillera earthquake, the Panagbenga (Malayan for "season of blooming") was designed to celebrate the rebirth of the city. For four consecutive weeks, Session Road converts into a botanical gallery featuring floral installations, street dance performers executing Cordilleran gongs, and international crowds celebrating highland resilience.',
    highlights: [
      'Grand Floral Parade: Breathtaking towering floats made entirely out of real petals (roses, sunflowers, chrysanthemums).',
      'Street Dancing Extravaganza: High energy cultural dancers spinning in native Benguet woven regalia.',
      'Session Road in Bloom: Central avenue closes down for organic foods, local singer-songwriters, and micro-handicrafts.'
    ]
  },
  {
    id: 'floral-floats',
    title: 'Grand Floral Floats',
    subTitle: 'Local Masterpieces in Bloom',
    description: 'Masterpieces crafted entirely from natural blooms representing Cordilleran folklore and flight.',
    category: 'Artisanal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArq0q5odagqTmMxzenhh_2wf2_RiyEjavZ43TXzy0y1DQ_QWYiBXrvbRGr56zby9L1ROo_SSMaMv4FwhbvqwqOGtuTgTppvNNrappS-x44I41LWggHzpsZ-goRzOAdk_POQfzhYprKW-H7fyEgvOMC7cZ_CnTDU5SwA6EUpSqL_TYYFwkioAaM0NjTgAINQK_qzSPnZwGHdiRVp-ADwgtNbOxmdcIxqbmORjgc-LYrh66pvwoIStR9VlMFiulQUHqRxpbw1BeYvX0U'
  },
  {
    id: 'woven-generations',
    title: 'Traditional Backstrap Weaving',
    subTitle: 'Woven with Mathematical Pride',
    description: 'Cordilleran geometric maroon, black, and white threads hand-woven through historical backstrap looms.',
    category: 'Roots',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz-L2oHgXOQwBUJUnsDp1fKlWE6uZX9Tna7jXXtlgZOPw4aZ5OOcjcHtnvI4eR0A3KD6oOknQc5NWfxAjOYwghBy7xfmL24xvfMjpwmMZOl4KMZ1AKQvDLBPKErLjBCEetpOc3IJVQaqtL0qCIeGn2aI5oM4QaY7wHC3Z9Ldr-NXi7ywPP_na2JaqlRKvjVPatCsLtMAWGOQ5IjjJFyS-ewUjXMRBXWDROYLdpMpN-XkhRcb0eZ4rZZ9L1Wt0aJ080qSp5SHUtD4xS',
    longText: 'Traditional weaving is a highly sacred local science. Cordilleran patterns reflect tribal hierarchy, ancestry, and alignment with nature. Modern weavers in Saint Louis Filigree centers and Easter Weaving Room carry on this laborious art by relying strictly on manual timber backstrap looms, turning organic yarns into high-fashion clothing, blankets, and bags.'
  },
  {
    id: 'silverworks',
    title: 'Baguio Silverworks',
    subTitle: 'Filigree Engineering',
    description: "Detailed microscopic silver filigree and robust jewelry designed with generations of expertise.",
    category: 'Artisanal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqsIaamji5j3gRq1IdYEC9LljiuxO6TGtf999vLp3L_TNCzJUbiw_pT3LqUz-NdGZfIN_H-ZuOU_cyQ-N7V8KSKr9_Fv5OV1yDFgOHU1xzZcXPDSpZL-YM5u1kct2XFsoHamAGucOwzmV9fdLzKAe3wqKoTuVuNWjt_Mbl2AbyqQK44E-hh8-KSL-i_eeCVTshaLWpCLxtNqqSVpOBI2T1FO2hr-qwpXQUb9UKLofH3GU1HEB7LbpLEqwucv-chxcXPs7T3Au3nCbR',
    longText: 'Crafted with absolute accuracy and patience, Baguio silvermaking employs thin threadwise silver wires twisted into beautiful floral motifs ("filigree"). Handed down through generations of craft schools, it is highly reputable for unmatched design durability and premium styling, representing the high mineral heritage of Benguet.'
  },
  {
    id: 'woodcarving',
    title: 'Woodcarving Artistry',
    subTitle: 'The Storytelling Timber of Asin Road',
    description: 'Organically polished sculptures depicting Bulul guardians carved out of mahogany and pine logs.',
    category: 'Artisanal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0Ys2WveUKPiujTYtKWSGeQ0D40s5MkYEf095Nxu5KTCD85rqMls_cXTMo_x_4k2duNLjnQj9YZ6FFivQnMQKGNadIg_nGOPVOrpRd8UQRkS9-twaFDsj-NKhg4hLOaJcC8vsSryRs6mAwHDu8AXOC1-8RPsNIAuain1EBf18TtVXRXka-6CdJdeQcslhYBr5JbJV1hcLovfBIkXNsOuTiihiHTlF18-NMeASb5KXZ7j28XlUJFIaJP7hnsBdjH47P5DWj2eCXmzLK',
    longText: 'Asin Road stands as the woodcarving capitol of Baguio City. Native Ifugao artists utilize uprooted mahogany trunks and sustainable acacia woods to sculpt lifelike figures representing native highlanders, woodland fauna, and abstract nature concepts, demonstrating deep Cordilleran environmental stewardship.'
  }
];
